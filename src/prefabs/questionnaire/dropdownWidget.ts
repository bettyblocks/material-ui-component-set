import {
  CreatePropertyKind,
  ThemeColor,
  buttongroup,
  color,
  component,
  displayLogic,
  linked,
  option,
  property,
  showIf,
  size,
  sizes,
  toggle,
  variable,
  wrapper,
} from '@betty-blocks/component-sdk';
import {
  Box,
  SelectInput,
  boxOptions,
  selectInputOptions,
} from '../structures';
import { options as formOptions } from '../structures/ActionJSForm/options';

export const dropdownWidget = [
  wrapper(
    {
      label: 'Dropdown question',
      optionCategories: [],
      options: {
        property: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#dropdownInput',
              optionId: '#dropdownInputProperty',
            },
          },
          optionRef: {
            id: '#dropdownInputPropertyRef',
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        label: linked({
          label: 'Label',
          value: {
            ref: {
              componentId: '#dropdownInput',
              optionId: '#dropdownInputLabel',
            },
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#dropdownInput',
              optionId: '#dropdownInputRequired',
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
        displayLogic: linked({
          label: 'Display logic',
          value: {
            ref: {
              componentId: '#questionBox',
              optionId: '#questionBoxDisplayLogic',
            },
          },
        }),
      },
    },
    [
      Box(
        {
          ref: { id: '#questionBox' },
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
              ref: { id: '#questionBoxOuterSpacing' },
            }),
            displayLogic: displayLogic('Display logic', {
              value: {},
              ref: {
                id: '#questionBoxDisplayLogic',
              },
            }),
          },
        },
        [
          component(
            'Form',
            {
              ref: { id: '#dropdownWidgetForm' },
              options: {
                ...formOptions,
                actionId: option('ACTION_JS', {
                  label: 'Action',
                  value: '',
                  configuration: {
                    createAction: {
                      template: 'update',
                      permissions: 'inherit',
                    },
                  },
                }),
              },
            },
            [
              SelectInput({
                ref: { id: '#dropdownInput' },
                options: {
                  ...selectInputOptions,
                  property: property('Question', {
                    value: '',
                    ref: {
                      id: '#dropdownInputProperty',
                    },
                    configuration: {
                      allowRelations: true,
                      allowedKinds: ['LIST'],
                      createProperty: {
                        type: CreatePropertyKind.LIST,
                      },
                      disabled: true,
                    },
                    showInAddChild: true,
                  }),
                  label: variable('Label', {
                    value: [''],
                    ref: { id: '#dropdownInputLabel' },
                    optionRef: {
                      sourceId: '#dropdownInputPropertyRef',
                      inherit: 'label',
                    },
                    configuration: {
                      allowPropertyName: true,
                    },
                  }),
                  floatLabel: toggle('Place label above input', {
                    value: true,
                  }),
                  labelColor: color('Label color', {
                    value: ThemeColor.BLACK,
                  }),
                  optionType: buttongroup(
                    'Option type',
                    [
                      ['Model', 'model'],
                      ['Property', 'property'],
                      ['Variable', 'variable'],
                    ],
                    {
                      value: 'property',
                      configuration: {
                        condition: showIf('optionType', 'EQ', 'never'),
                      },
                    },
                  ),
                  required: toggle('Required', {
                    ref: {
                      id: '#dropdownInputRequired',
                    },
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
              }),
            ],
          ),
        ],
      ),
    ],
  ),
];
