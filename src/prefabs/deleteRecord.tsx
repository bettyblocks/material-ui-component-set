import * as React from 'react';
import {
  BeforeCreateArgs,
  buttongroup,
  font,
  hideIf,
  icon,
  Icon,
  InteractionType,
  option,
  prefab as makePrefab,
  PrefabAction,
  PrefabInteraction,
  PrefabReference,
  PrefabVariable,
  sizes,
  variable,
} from '@betty-blocks/component-sdk';
import { ActionButton } from './structures/ActionButton';
import { options as actionButtonOptions } from './structures/ActionButton/options';
import { Box } from './structures/Box';
import { options as boxOptions } from './structures/Box/options';
import { Button } from './structures/Button';
import { options as buttonOptions } from './structures/Button/options';
import { Column } from './structures/Column';
import { options as columnOptions } from './structures/Column/options';
import { Dialog } from './structures/Dialog';
import { OpenPageButton } from './structures/OpenPage';
import { options as openPageButtonOptions } from './structures/OpenPage/options';
import { Paper } from './structures/Paper';
import { Row } from './structures/Row';
import { options as rowOptions } from './structures/Row/options';
import { Text as TextPrefab } from './structures/Text';
import { options as textOptions } from './structures/Text/options';

const beforeCreate = ({
  prefab,
  save,
  close,
  components: { ModelSelector, Header, Content, Field, Footer, Text },
  helpers: { useModelQuery }, // There are no 'helpers' existing in the sdk yet.
}: BeforeCreateArgs) => {
  const [modelId, setModelId] = React.useState('');
  const [showValidation, setShowValidation] = React.useState(false);
  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
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
        onSave={() => {
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
          const newPrefab = { ...prefab };
          const structure = newPrefab.structure[0];
          if (data && data.model && newPrefab.variables) {
            newPrefab.variables[0].name = camelToSnakeCase(data.model.name);
          }
          if (structure.type !== 'COMPONENT') {
            throw new Error(`Expected a component, but got ${structure.type}`);
          }
          const mySubtmitButton = getDescendantByRef(
            '#submitBtn',
            structure.descendants,
          );
          console.log(mySubtmitButton);
          mySubtmitButton.options[3] = {
            value: [modelId],
            label: 'Objects to pass to action',
            key: 'actionModels',
            type: 'ACTION_INPUT_OBJECTS',
            configuration: {
              apiVersion: 'v1',
              condition: {
                type: 'SHOW',
                option: 'linkType',
                comparator: 'EQ',
                value: 'action',
              },
            },
          };
          if (!newPrefab.variables) {
            throw new Error(
              'the prefab does not have any variables available!',
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
  {
    name: 'Hide',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#dialog',
      sourceComponentId: '#submitBtn',
    },
    type: InteractionType.Custom,
  },
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
  } as PrefabVariable,
];

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
const attr = {
  icon: Icon.DeleteRecordIcon,
  category: 'BUTTON',
  keywords: ['Button', 'delete', 'deleterecord'],
  variables,
  interactions,
  actions,
};

export default makePrefab('Delete Record (TS)', attr, beforeCreate, [
  Box(
    {
      options: {
        ...boxOptions,
        innerWidth: sizes('Inner space', {
          value: ['0rem', '0rem', '0rem', '0rem'],
        }),
      },
    },
    [
      OpenPageButton(
        {
          ref: { id: '#deleteButton' },
          options: {
            ...openPageButtonOptions,
            buttonText: variable('Button text', { value: ['Delete'] }),
            icon: icon('Icon', { value: 'Delete' }),
            outerSpacing: sizes('Outer space', {
              value: ['0rem', 'M', '0rem', '0rem'],
            }),
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
                      OpenPageButton(
                        {
                          ref: { id: '#cancelBtn' },
                          style: {
                            name: 'outliine',
                          },
                          options: {
                            ...openPageButtonOptions,
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
                      ActionButton(
                        {
                          ref: { id: '#submitBtn' },
                          options: {
                            ...actionButtonOptions,
                            buttonText: variable('Button text', {
                              value: ['Delete'],
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
        ]),
      ]),
    ],
  ),
]);
