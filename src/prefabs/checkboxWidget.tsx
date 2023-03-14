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
  InteractionType,
  toggle,
} from '@betty-blocks/component-sdk';
import {
  Box,
  boxOptions,
  Conditional,
  conditionalOptions,
  Text as TextPrefab,
  textOptions,
} from './structures';
import { IdPropertyProps, ModelProps, ModelQuery } from './types';
import { options as formOptions } from './structures/ActionJSForm/options';
import { CheckboxInput } from './structures/CheckboxInput';
import { checkboxInputOptions } from './structures/CheckboxInput/options';

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
  },
}: BeforeCreateArgs) => {
  const [primaryProperty, setPrimaryProperty] = React.useState('');
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  const [validationMessage, setValidationMessage] = React.useState('');
  const [, setModel] = React.useState<ModelProps>();

  const modelId = useModelIdSelector();
  const componentId = createUuid();
  const pageName = getPageName();
  const unsupportedKinds = [
    'MINUTES',
    'RICH_TEXT',
    ...createBlacklist(['BOOLEAN']),
  ];
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
      const propertObj = data.model.properties.find(
        (prop: any) => prop.id === obj.id[0],
      );
      if (propertObj) {
        returnObject.name = `{{ ${data.model.name}.${propertObj.name} }}`;
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
      const transformProp = data.model.properties.find(
        (prop: any) => prop.id === obj.id[0],
      );
      if (transformProp) {
        outputProp.label = transformProp.label;
        outputProp.kind = transformProp.kind;
      }
    }
    return outputProp;
  };

  if (modelId === null && validationMessage === '') {
    setValidationMessage(
      'The Checkbox widget needs to be inside a parent with a model',
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
      <Header title="Configure your checkbox widget" onClose={close} />
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
          const label = treeSearch('#CheckboxInput', newPrefab.structure);
          const checkboxInput = treeSearch(
            '#CheckboxInput',
            newPrefab.structure,
          );
          const checkboxWidgetForm = treeSearch(
            '#CheckboxWidgetForm',
            newPrefab.structure,
          );
          const propertyObj = transformProperty(primaryProperty);
          setOption(text, 'content', (opt: PrefabComponentOption) => ({
            ...opt,
            value: [propertyObj.label],
          }));
          setOption(label, 'label', (opt: PrefabComponentOption) => ({
            ...opt,
            value: [propertyObj.label],
          }));

          if (!idProperty) {
            throw new Error('We could not find an idProperty.');
          }
          checkboxWidgetForm.id = componentId;
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
            checkboxWidgetForm,
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
            checkboxWidgetForm,
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
            checkboxInput,
            'actionProperty',
            (opt: PrefabComponentOption) => ({
              ...opt,
              value: {
                modelProperty: enrichVarObj(primaryProperty),
              },
            }),
          );

          setOption(checkboxInput, 'value', (opt: PrefabComponentOption) => ({
            ...opt,
            value: [enrichVarObj(primaryProperty)],
          }));

          let actionVarId: string;
          Object.keys(result.variables).forEach((key) => {
            actionVarId = key;
          });

          setOption(
            checkboxInput,
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
              targetComponentId: '#CheckboxWidgetForm',
              sourceComponentId: '#CheckboxInput',
            },
            type: 'Custom' as InteractionType,
          };

          newPrefab.interactions?.push(interaction);
          setValidationMessage('');
          save(newPrefab);
        }}
        onClose={close}
      />
    </>
  );
};

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.CheckboxIcon,
  interactions,
  variables: [],
};

export default makePrefab('Checkbox Widget', attributes, beforeCreate, [
  wrapper(
    {
      label: 'Checkbox widget',
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
        questionContent: linked({
          label: 'Checkbox label',
          value: {
            ref: {
              componentId: '#CheckboxInput',
              optionId: '#questionLabel',
            },
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#CheckboxInput',
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
                  ref: { id: '#CheckboxWidgetForm' },
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
                  CheckboxInput(
                    {
                      ref: { id: '#CheckboxInput' },
                      options: {
                        ...checkboxInputOptions,
                        label: variable('Label', {
                          value: [''],
                          ref: {
                            id: '#questionLabel',
                          },
                        }),
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
