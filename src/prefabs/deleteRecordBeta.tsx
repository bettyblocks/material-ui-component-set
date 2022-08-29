import * as React from 'react';
import {
  buttongroup,
  font,
  hideIf,
  icon,
  Icon,
  InteractionType,
  option,
  prefab,
  PrefabAction,
  PrefabInteraction,
  PrefabReference,
  PrefabVariable,
  sizes,
  variable,
} from '@betty-blocks/component-sdk';
import {
  ActionJSButton,
  actionJSButtonOptions,
  Box,
  boxOptions,
  Button,
  buttonOptions,
  Column,
  columnOptions,
  Dialog,
  Paper,
  Row,
  rowOptions,
  Text as TextPrefab,
  textOptions,
} from './structures';

const beforeCreate = ({
  close,
  components: { ModelSelector, Header, Content, Field, Footer, Text },
  prefab: originalPrefab,
  save,
  helpers,
}: any) => {
  const {
    createUuid,
    prepareAction,
    useModelQuery,
    BettyPrefabs,
    cloneStructure,
    setOption,
  } = helpers;

  const [modelId, setModelId] = React.useState('');
  const [modelIdProperty, setModelIdProperty] = React.useState(null);
  const [showValidation, setShowValidation] = React.useState(false);
  const componentId = createUuid();

  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
    onCompleted: (result) => {
      setModelIdProperty(
        result.model.properties.find(({ name }) => name === 'id'),
      );
    },
  });

  const getDescendantByRef = (refValue: string, structure: any) =>
    structure.reduce((acc: string, component: PrefabReference) => {
      if (acc) return acc;
      if (
        component.type === 'COMPONENT' &&
        // eslint-disable-next-line no-prototype-builtins
        component.ref
          ? Object.values(component.ref).indexOf(refValue) > -1
          : undefined
      ) {
        return component;
      }
      if (component.type === 'PARTIAL') {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return getDescendantByRef(refValue, component.descendants);
    }, null);

  React.useEffect(() => {
    setShowValidation(false);
  }, [modelId]);

  return (
    <>
      <Header onClose={close} title="Configure delete record" />
      <Content>
        <Field
          label="Select model"
          error={
            showValidation && <Text color="#e82600">Model is required</Text>
          }
          info="Small note: If you can't select any models try to place the button inside a component where an object is available."
        >
          <ModelSelector
            onChange={(id: string) => {
              setModelId(id);
            }}
            value={modelId}
            margin
            scopedModels
          />
        </Field>
      </Content>
      <Footer
        onClose={close}
        onSave={async (): Promise<void> => {
          // eslint-disable-next-line no-param-reassign
          originalPrefab.structure[0].id = componentId;

          const result = await prepareAction(
            componentId,
            modelIdProperty,
            null,
            'delete',
          );

          const camelToSnakeCase = (str: string) =>
            str[0].toLowerCase() +
            str
              .slice(1, str.length)
              .replace(
                /[A-Z]/g,
                (letter: string) => `_${letter.toLowerCase()}`,
              );

          if (!modelId || !data || !data.model) {
            setShowValidation(true);
            return;
          }
          const newPrefab = { ...originalPrefab };
          const structure = newPrefab.structure[0];
          if (data && data.model && newPrefab.variables) {
            newPrefab.variables[0].name = camelToSnakeCase(data.model.name);
          }
          if (structure.type !== 'COMPONENT') {
            throw new Error(`Expected a component, but got ${structure.type}`);
          }

          structure.descendants.push(cloneStructure('Action Button Beta'));

          setOption(structure.descendants[2], 'actionId', (options) => ({
            ...options,
            value: result.action.actionId,
            configuration: { disabled: true },
          }));

          console.log('result', result);

          setOption(
            structure.descendants[2],
            'actionVariableId',
            (options) => ({
              ...options,
              value: result.recordInputVariable.id,
              configuration: { disabled: true },
            }),
          );

          // TODO: add record id as input
          setOption(structure.descendants[2], 'property', (options) => ({
            ...options,
            value: {
              id: [modelIdProperty.id],
              type: 'PROPERTY',
            },
            configuration: { disabled: true },
          }));

          setOption(structure.descendants[2], 'buttonText', (options) => ({
            ...options,
            value: ['Delete'],
          }));

          setOption(structure.descendants[2], 'icon', (options) => ({
            ...options,
            value: 'Delete',
          }));

          if (!newPrefab.variables) {
            throw new Error(
              'the prefab does not have any variables available.',
            );
          }
          newPrefab.variables[0].options = { modelId };

          save(newPrefab);
        }}
      />
    </>
  );
};

const interactions = [
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#dialog',
      sourceComponentId: '#deleteButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#dialog',
      sourceComponentId: '#closeBtn',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#dialog',
      sourceComponentId: '#cancelBtn',
    },
    type: InteractionType.Custom,
  },
  // {
  //   name: 'Hide',
  //   sourceEvent: 'onActionSuccess',
  //   ref: {
  //     targetComponentId: '#dialog',
  //     sourceComponentId: '#submitBtn',
  //   },
  //   type: InteractionType.Custom,
  // },
] as PrefabInteraction[];

const variables = [
  {
    kind: 'object',
    name: 'form_object',
    ref: {
      id: '#objectVariableId',
      endpointId: '#endpointId',
    },
    options: {
      modelId: '',
    },
  },
] as PrefabVariable[];

const actions = [
  {
    name: 'Delete record action',
    ref: {
      id: '#actionId',
      endpointId: '#endpointId',
    },
    useNewRuntime: false,
    events: [
      {
        kind: 'delete',
        options: {
          ref: {
            object: '#objectVariableId',
          },
        },
      },
    ],
  },
] as PrefabAction[];

const attributes = {
  icon: Icon.DeleteRecordIcon,
  category: 'FORMV2',
  keywords: ['Button', 'delete', 'deleterecord'],
  variables,
  interactions,
  actions,
};

export default prefab('Delete Record Beta', attributes, beforeCreate, [
  Box(
    {
      options: {
        ...boxOptions,
        innerSpacing: sizes('Inner space', {
          value: ['0rem', '0rem', '0rem', '0rem'],
        }),
      },
    },
    [
      Button(
        {
          ref: { id: '#deleteButton' },
          options: {
            ...buttonOptions,
            buttonText: variable('Button text', { value: ['Delete'] }),
            icon: icon('Icon', { value: 'Delete' }),
          },
        },
        [],
      ),
      Dialog({ ref: { id: '#dialog' } }, [
        Paper({}, [
          Row(
            {
              options: {
                ...rowOptions,
                maxRowWidth: option('CUSTOM', {
                  label: 'Width',
                  value: 'Full',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'S', value: 'S' },
                      { name: 'M', value: 'M' },
                      { name: 'L', value: 'L' },
                      { name: 'XL', value: 'XL' },
                      { name: 'Full', value: 'Full' },
                    ],
                  },
                }),
              },
            },
            [
              Column(
                {
                  options: {
                    ...columnOptions,
                    columnWidth: option('CUSTOM', {
                      label: 'Column width',
                      value: 'flexible',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Fit content', value: 'fitContent' },
                          { name: 'Flexible', value: 'flexible' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                      },
                    }),
                    columnWidthTabletLandscape: option('CUSTOM', {
                      label: 'Column width (tablet landscape)',
                      value: 'flexible',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Fit content', value: 'fitContent' },
                          { name: 'Flexible', value: 'flexible' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                      },
                    }),
                    columnWidthTabletPortrait: option('CUSTOM', {
                      value: 'flexible',
                      label: 'Column width (tablet portrait)',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Fit content', value: 'fitContent' },
                          { name: 'Flexible', value: 'flexible' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                      },
                    }),
                    columnWidthMobile: option('CUSTOM', {
                      value: 'flexible',
                      label: 'Column width (mobile)',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Fit content', value: 'fitContent' },
                          { name: 'Flexible', value: 'flexible' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                      },
                    }),
                  },
                },
                [
                  Box(
                    {
                      options: {
                        ...boxOptions,
                        alignment: buttongroup(
                          'Alignment',
                          [
                            ['None', 'none'],
                            ['Left', 'flex-start'],
                            ['Center', 'center'],
                            ['Right', 'flex-end'],
                            ['Justified', 'space-between'],
                          ],
                          {
                            value: 'space-between',
                            configuration: {
                              dataType: 'string',
                            },
                          },
                        ),
                        innerSpacing: sizes('Inner space', {
                          value: ['M', 'M', '0rem', 'M'],
                        }),
                      },
                    },
                    [
                      TextPrefab(
                        {
                          options: {
                            ...textOptions,
                            content: variable('Content', {
                              value: ['Delete record'],
                              configuration: { as: 'MULTILINE' },
                            }),
                            type: font('Font', { value: ['Title4'] }),
                          },
                        },
                        [],
                      ),
                      Button(
                        {
                          ref: { id: '#closeBtn' },
                          style: {
                            overwrite: {
                              backgroundColor: {
                                type: 'STATIC',
                                value: 'Transparent',
                              },
                              boxShadow: 'none',
                              color: {
                                type: 'THEME_COLOR',
                                value: 'light',
                              },
                              padding: ['0rem'],
                            },
                          },
                          options: {
                            ...buttonOptions,
                            buttonText: variable('Button text', {
                              value: [''],
                            }),
                            icon: icon('Icon', { value: 'Close' }),
                            size: option('CUSTOM', {
                              value: 'medium',
                              label: 'Icon size',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Small', value: 'small' },
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Large', value: 'large' },
                                ],
                                condition: hideIf('icon', 'EQ', 'none'),
                              },
                            }),
                          },
                        },
                        [],
                      ),
                    ],
                  ),
                  Box({ options: { ...boxOptions } }, [
                    TextPrefab({
                      options: {
                        ...textOptions,
                        content: variable('Content', {
                          value: [
                            'Are you sure you want to delete this record? You can’t undo this action.',
                          ],
                          configuration: { as: 'MULTILINE' },
                        }),
                        type: font('Font', { value: ['Body1'] }),
                      },
                    }),
                  ]),
                  Box(
                    {
                      options: {
                        ...boxOptions,
                        alignment: buttongroup(
                          'Alignment',
                          [
                            ['None', 'none'],
                            ['Left', 'flex-start'],
                            ['Center', 'center'],
                            ['Right', 'flex-end'],
                            ['Justified', 'space-between'],
                          ],
                          {
                            value: 'flex-end',
                            configuration: {
                              dataType: 'string',
                            },
                          },
                        ),
                      },
                    },
                    [
                      Button(
                        {
                          ref: { id: '#cancelBtn' },
                          style: {
                            name: 'outline',
                          },
                          options: {
                            ...buttonOptions,
                            buttonText: variable('Button text', {
                              value: ['Cancel'],
                            }),
                            outerSpacing: sizes('Outer space', {
                              value: ['0rem', 'M', '0rem', '0rem'],
                            }),
                          },
                        },
                        [],
                      ),
                      // ActionJSButton(
                      //   {
                      //     ref: { id: '#submitBtn' },
                      //     options: {
                      //       ...actionJSButtonOptions,
                      //     },
                      //   },
                      //   [],
                      // ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ]),
      ]),
    ],
  ),
]);
