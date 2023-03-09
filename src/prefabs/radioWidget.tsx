import * as React from 'react';
import {
  Icon,
  PrefabInteraction,
  wrapper,
  ThemeColor,
  color,
  size,
  font,
  variable,
  sizes,
  option,
  linked,
  BeforeCreateArgs,
  prefab as makePrefab,
  PrefabComponent,
  PrefabComponentOption,
  component as makeComponent,
  toggle,
  InteractionType,
} from '@betty-blocks/component-sdk';
import {
  Box,
  boxOptions,
  Conditional,
  conditionalOptions,
  RadioInput,
  radioInputOptions,
  Text as TextPrefab,
  textOptions,
} from './structures';
import { IdPropertyProps, ModelProps, ModelQuery } from './types';
import { options as formOptions } from './structures/ActionJSForm/options';

const beforeCreate = ({
  components: { Content, Header, Field, Footer, PropertySelector, Text },
  prefab,
  save,
  close,
  helpers: {
    useModelQuery,
    useModelIdSelector,
    createBlacklist,
    createUuid,
    prepareAction,
    getPageName,
    setOption,
    BettyPrefabs,
    makeBettyUpdateInput,
  },
}: BeforeCreateArgs) => {
  const [primaryProperty, setPrimaryProperty] = React.useState('');
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  const [validationMessage, setValidationMessage] = React.useState('');
  const [model, setModel] = React.useState<ModelProps>();

  const modelId = useModelIdSelector();
  const componentId = createUuid();
  const pageName = getPageName();
  const unsupportedKinds = createBlacklist(['LIST']);
  const { data } = useModelQuery({
    variables: { id: modelId },
    onCompleted: (result: ModelQuery) => {
      setModel(result.model);
      setIdProperty(result.model.properties.find(({ name }) => name === 'id'));
    },
  });

  const enrichVarObj = (obj: any) => {
    const returnObject = obj;
    if (data && data.model) {
      const property = data.model.properties.find(
        (prop: any) => prop.id === obj.id[0],
      );
      if (property) {
        returnObject.name = `{{ ${data.model.name}.${property.name} }}`;
      }
    }
    return returnObject;
  };

  const transformProperty = (obj: any) => {
    const outputProp = { ...obj };
    if (!obj) {
      setValidationMessage('No property is selected.');
    }
    if (data && data.model) {
      const property = data.model.properties.find(
        (prop: any) => prop.id === obj.id[0],
      );
      if (property) {
        outputProp.label = property.label;
        outputProp.kind = property.kind;
      }
    }
    return outputProp;
  };

  if (modelId === null && validationMessage === '') {
    setValidationMessage(
      'The radio widget needs to be inside a parent with a model',
    );
  }

  const treeSearch = (refValue: string, structure: any) =>
    structure.reduce((acc: string, component: PrefabComponent) => {
      if (acc) return acc;
      if (
        component.ref &&
        Object.values(component.ref).indexOf(refValue) > -1
      ) {
        return component;
      }
      return treeSearch(refValue, component.descendants);
    }, null);

  return (
    <>
      <Header title="Configure your multiple choice widget" onClose={close} />
      <Content>
        <Field
          label="Where would you like to store your answer?"
          error={
            validationMessage && (
              <Text color="#e82600">{validationMessage}</Text>
            )
          }
        >
          <PropertySelector
            onChange={(value: string) => {
              setPrimaryProperty(value);
            }}
            modelId={modelId}
            value={primaryProperty}
            disabledKinds={unsupportedKinds}
            disabled={modelId === null}
          />
        </Field>
      </Content>
      <Footer
        onSave={async (): Promise<void> => {
          const newPrefab = { ...prefab };

          const text = treeSearch('#QuestionText', newPrefab.structure);
          const radioInput = treeSearch('#RadioInput', newPrefab.structure);
          const radioWidgetForm = treeSearch(
            '#RadioWidgetForm',
            newPrefab.structure,
          );
          const propertyObj = transformProperty(primaryProperty);
          setOption(text, 'content', (opt: PrefabComponentOption) => ({
            ...opt,
            value: [propertyObj.label],
          }));

          if (!idProperty) {
            throw new Error('We could not find an idProperty.');
          }
          radioWidgetForm.id = componentId;
          const result = await prepareAction(
            componentId,
            idProperty,
            [transformProperty(primaryProperty)],
            'update',
            undefined,
            `${pageName} - update ${propertyObj.label}`,
            'public',
          );

          setOption(
            radioWidgetForm,
            'actionId',
            (opts: PrefabComponentOption) => ({
              ...opts,
              value: result.action.actionId,
              configuration: { disabled: true },
            }),
          );
          if (!modelId) {
            // eslint-disable-next-line no-console
            console.error('unable to set model option, no model selected');
            return;
          }
          setOption(
            radioWidgetForm,
            'model',
            (opts: PrefabComponentOption) => ({
              ...opts,
              value: modelId,
              configuration: {
                disabled: true,
              },
            }),
          );
          setOption(
            radioInput,
            'actionProperty',
            (opt: PrefabComponentOption) => ({
              ...opt,
              value: {
                modelProperty: enrichVarObj(primaryProperty),
              },
            }),
          );

          setOption(radioInput, 'value', (opt: PrefabComponentOption) => ({
            ...opt,
            value: [enrichVarObj(primaryProperty)],
          }));

          let actionVarId: string;
          Object.keys(result.variables).forEach((key) => {
            actionVarId = key;
          });

          setOption(
            radioInput,
            'actionVariableId',
            (opt: PrefabComponentOption) => ({
              ...opt,
              value: result.variables[actionVarId][1].id,
              configuration: {
                condition: {
                  type: 'HIDE',
                  option: 'actionVariableId',
                  comparator: 'EQ',
                  value: result.variables[actionVarId][1].id,
                },
              },
            }),
          );

          const interaction = {
            name: 'Submit',
            sourceEvent: 'onChange',
            parameters: [],
            ref: {
              targetComponentId: '#RadioWidgetForm',
              sourceComponentId: '#RadioInput',
            },
            type: 'Custom' as InteractionType,
          };

          newPrefab.interactions?.push(interaction);
          setValidationMessage('');
          save(newPrefab);
        }}
        canSave={!validationMessage}
        onClose={close}
      />
    </>
  );
};

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.RadioButtonIcon,
  interactions,
  variables: [],
};

export default makePrefab('Multiple Choice Widget', attributes, beforeCreate, [
  wrapper(
    {
      label: 'Multiple choice widget',
      optionCategories: [
        {
          label: 'Conditional options',
          expanded: true,
          members: ['left', 'compare', 'right'],
          condition: {
            type: 'SHOW',
            option: 'visibility',
            comparator: 'EQ',
            value: false,
          },
        },
      ],
      options: {
        questionTitle: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#QuestionText',
              optionId: '#questionTitleContent',
            },
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#RadioInput',
              optionId: '#questionRequired',
            },
          },
        }),
        questionSpacing: linked({
          label: 'Question spacing',
          value: {
            ref: {
              componentId: '#questionBox',
              optionId: '#questionBoxOuterSpacing',
            },
          },
        }),
        left: linked({
          label: 'Left condition',
          value: {
            ref: {
              componentId: '#questionCondition',
              optionId: '#conditionLeft',
            },
          },
        }),
        compare: linked({
          label: 'equals',
          value: {
            ref: {
              componentId: '#questionCondition',
              optionId: '#conditionCompare',
            },
          },
        }),
        right: linked({
          label: 'Right condition',
          value: {
            ref: {
              componentId: '#questionCondition',
              optionId: '#conditionRight',
            },
          },
        }),
      },
    },
    [
      Conditional(
        {
          ref: {
            id: '#questionCondition',
          },
          options: {
            ...conditionalOptions,
            left: variable('Left', {
              value: [],
              ref: {
                id: '#conditionLeft',
              },
            }),
            compare: option('CUSTOM', {
              label: 'Compare',
              value: 'eq',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Equals',
                    value: 'eq',
                  },
                  {
                    name: 'Not equal',
                    value: 'neq',
                  },
                  {
                    name: 'Contains',
                    value: 'contains',
                  },
                  {
                    name: 'Does not contain',
                    value: 'notcontains',
                  },
                  {
                    name: 'Greater than',
                    value: 'gt',
                  },
                  {
                    name: 'Less than',
                    value: 'lt',
                  },
                  {
                    name: 'Greater than or equal to',
                    value: 'gteq',
                  },
                  {
                    name: 'Less than or equal to',
                    value: 'lteq',
                  },
                ],
              },
              ref: {
                id: '#conditionCompare',
              },
            }),
            right: variable('Right', {
              value: [],
              ref: {
                id: '#conditionRight',
              },
            }),
          },
        },
        [
          Box(
            {
              ref: {
                id: '#questionBox',
              },
              options: {
                ...boxOptions,
                backgroundColor: color('Background color', {
                  value: ThemeColor.WHITE,
                }),
                borderColor: color('Border color', {
                  value: ThemeColor.MEDIUM,
                }),
                borderWidth: size('Border thickness', {
                  value: '1px',
                  configuration: {
                    as: 'UNIT',
                  },
                }),
                borderRadius: size('Border radius', {
                  value: '5px',
                  configuration: {
                    as: 'UNIT',
                  },
                }),
                outerSpacing: sizes('Outer space', {
                  value: ['0rem', '0rem', 'M', '0rem'],
                  ref: {
                    id: '#questionBoxOuterSpacing',
                  },
                }),
              },
            },
            [
              makeComponent(
                'Form',
                {
                  ref: { id: '#RadioWidgetForm' },
                  options: { ...formOptions },
                },
                [
                  TextPrefab(
                    {
                      ref: {
                        id: '#QuestionText',
                      },
                      options: {
                        ...textOptions,
                        content: variable('Content', {
                          value: [''],
                          configuration: {
                            as: 'MULTILINE',
                          },
                          ref: {
                            id: '#questionTitleContent',
                          },
                        }),
                        type: font('Font', { value: ['Body1'] }),
                        outerSpacing: sizes('Outer space', {
                          value: ['0rem', '0rem', 'S', '0rem'],
                        }),
                        fontWeight: option('CUSTOM', {
                          label: 'Font weight',
                          value: '500',
                          configuration: {
                            as: 'DROPDOWN',
                            dataType: 'string',
                            allowedInput: [
                              { name: '100', value: '100' },
                              { name: '200', value: '200' },
                              { name: '300', value: '300' },
                              { name: '400', value: '400' },
                              { name: '500', value: '500' },
                              { name: '600', value: '600' },
                              { name: '700', value: '700' },
                              { name: '800', value: '800' },
                              { name: '900', value: '900' },
                            ],
                          },
                        }),
                      },
                    },
                    [],
                  ),
                  RadioInput(
                    {
                      ref: { id: '#RadioInput' },
                      options: {
                        ...radioInputOptions,
                        label: variable('Label', { value: [''] }),
                        required: toggle('Required', {
                          ref: {
                            id: '#questionRequired',
                          },
                        }),
                      },
                    },
                    [],
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  ),
]);
