import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  PrefabInteraction,
  BeforeCreateArgs,
  wrapper,
  sizes,
  ThemeColor,
  color,
  size,
  variable,
  option,
  toggle,
  buttongroup,
  font,
  PrefabComponent,
  linked,
  PrefabComponentOption,
  component as makeComponent,
  InteractionType,
} from '@betty-blocks/component-sdk';
import { options as formOptions } from './structures/ActionJSForm/options';
import {
  Box,
  boxOptions,
  Text as TextComp,
  TextInput,
  textOptions,
  textInputOptions,
  Conditional,
  conditionalOptions,
} from './structures';
import { IdPropertyProps, ModelQuery } from './types';

const interactions: PrefabInteraction[] = [];

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

  const modelId = useModelIdSelector();
  const componentId = createUuid();
  const pageName = getPageName();
  const unsupportedKinds = createBlacklist(['TEXT', 'URL', 'IBAN', 'STRING']);
  const { data } = useModelQuery({
    variables: { id: modelId },
    onCompleted: (result: ModelQuery) => {
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
      <Header title="Configure your text widget" onClose={close} />
      <Content>
        <Field label="Property">
          <PropertySelector
            onChange={(value: string) => {
              setPrimaryProperty(value);
            }}
            modelId={modelId}
            value={primaryProperty}
            disabledKinds={unsupportedKinds}
            error={
              validationMessage && (
                <Text color="#e82600">{validationMessage}</Text>
              )
            }
          />
        </Field>
      </Content>
      <Footer
        onSave={async (): Promise<void> => {
          const newPrefab = { ...prefab };

          const text = treeSearch('#questionText', newPrefab.structure);
          const textInput = treeSearch('#TextInput', newPrefab.structure);
          const textWidgetForm = treeSearch(
            '#TextWidgetForm',
            newPrefab.structure,
          );
          const propertyObj = transformProperty(primaryProperty);
          setOption(text, 'content', (opt: PrefabComponentOption) => ({
            ...opt,
            value: [propertyObj.label],
          }));
          setOption(textInput, 'placeholder', (opt: PrefabComponentOption) => ({
            ...opt,
            value: [],
          }));

          if (!idProperty) {
            throw new Error('We could not find an idProperty.');
          }
          textWidgetForm.id = componentId;
          const result = await prepareAction(
            componentId,
            idProperty,
            [transformProperty(primaryProperty)],
            'create',
            undefined,
            `${pageName} - create ${propertyObj.label}`,
            'public',
          );

          setOption(
            textWidgetForm,
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
          setOption(textWidgetForm, 'model', (opts: PrefabComponentOption) => ({
            ...opts,
            value: modelId,
            configuration: {
              disabled: true,
            },
          }));
          setOption(
            textInput,
            'actionProperty',
            (opt: PrefabComponentOption) => ({
              ...opt,
              value: {
                modelProperty: enrichVarObj(primaryProperty),
              },
            }),
          );
          setOption(
            textInput,
            'actionVariableId',
            (opt: PrefabComponentOption) => ({
              ...opt,
              value: '',
              configuration: {
                condition: {
                  type: 'HIDE',
                  option: 'actionVariableId',
                  comparator: 'EQ',
                  value: '',
                },
              },
            }),
          );

          const interaction = {
            name: 'Submit',
            sourceEvent: 'onBlur',
            parameters: [],
            ref: {
              targetComponentId: '#TextWidgetForm',
              sourceComponentId: '#TextInput',
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

const attributes = {
  category: 'LAYOUT',
  icon: Icon.UpdateFormIcon,
  interactions,
  variables: [],
};

export default makePrefab('Text Widget', attributes, beforeCreate, [
  wrapper(
    {
      label: 'Text widget',
      optionCategories: [
        {
          label: 'Conditional options',
          expanded: true,
          members: ['conditionLeft', 'conditionComparison', 'conditionRight'],
        },
      ],
      options: {
        pappel: linked({
          label: '#textCompType',
          value: {
            ref: {
              componentId: '#questionText',
              optionId: '##textCompType',
            },
          },
        }),
        question: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#questionText',
              optionId: '#textContent',
            },
          },
        }),
        placeholder: linked({
          label: 'Placeholder',
          value: {
            ref: {
              componentId: '#TextInput',
              optionId: '#textInputPlaceholder',
            },
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#TextInput',
              optionId: '#textInputRequired',
            },
          },
        }),
        conditionLeft: linked({
          label: 'Left condition',
          value: {
            ref: {
              componentId: '#conditional',
              optionId: '#conditionOptionLeft',
            },
          },
        }),
        conditionComparison: linked({
          label: 'equals',
          value: {
            ref: {
              componentId: '#conditional',
              optionId: '#conditionOptionCompare',
            },
          },
        }),
        conditionRight: linked({
          label: 'Right condition',
          value: {
            ref: {
              componentId: '#conditional',
              optionId: '#conditionOptionRight',
            },
          },
        }),
      },
    },
    [
      Box(
        {
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
          },
        },
        [
          Conditional(
            {
              ref: { id: '#conditional' },
              options: {
                ...conditionalOptions,
                left: variable('Left', {
                  ref: { id: '#conditionOptionLeft' },
                  value: [],
                }),
                compare: option('CUSTOM', {
                  label: 'Compare',
                  ref: { id: '#conditionOptionCompare' },
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
                }),
                right: variable('Right', {
                  ref: { id: '#conditionOptionRight' },
                  value: [],
                }),
              },
            },
            [
              makeComponent(
                'Form',
                { ref: { id: '#TextWidgetForm' }, options: { ...formOptions } },
                [
                  TextComp(
                    {
                      ref: { id: '#questionText' },
                      options: {
                        ...textOptions,
                        content: variable('Content', {
                          ref: { id: '#textContent' },
                          value: [],
                          configuration: { as: 'MULTILINE' },
                        }),
                        type: font('Font', {
                          ref: { id: '#textCompType' },
                          value: ['Body1'],
                        }),
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
                  TextInput(
                    {
                      label: 'Text field',
                      ref: { id: '#TextInput' },
                      options: {
                        ...textInputOptions,
                        hideLabel: toggle('Hide label', { value: true }),
                        placeholder: variable('Placeholder', {
                          ref: { id: '#textInputPlaceholder' },
                          value: [''],
                        }),
                        required: toggle('Required', {
                          ref: { id: '#textInputRequired' },
                        }),
                        margin: buttongroup(
                          'Margin',
                          [
                            ['None', 'none'],
                            ['Dense', 'dense'],
                            ['Normal', 'normal'],
                          ],
                          { value: 'none' },
                        ),
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
