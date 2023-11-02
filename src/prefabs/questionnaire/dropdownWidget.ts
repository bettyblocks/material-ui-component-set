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
          showInReconfigure: true,
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
        optionLabel: linked({
          label: 'Label for options',
          value: {
            ref: {
              componentId: '#dropdownInput',
              optionId: '#dropdownInputLabelProperty',
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
              ref: { id: '#dropdownQuestionForm' },
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
                      allowedKinds: ['OBJECT'],
                      createProperty: {
                        type: CreatePropertyKind.OBJECT,
                      },
                      disabled: true,
                      manageObjectValues: {
                        selectableObjectKey: false,
                        buttonLabel: 'Manage answer options',
                        label: 'Manage answer options',
                        value: [],
                      },
                    },
                    showInAddChild: true,
                  }),
                  label: variable('Label', {
                    value: [''],
                    ref: { id: '#dropdownInputLabel' },
                    optionRef: {
                      sourceId: '#dropdownInputPropertyRef',
                      inherit: [
                        { name: '$name', id: '$id', type: 'PROPERTY_LABEL' },
                      ],
                    },
                    configuration: {
                      allowPropertyName: true,
                    },
                  }),
                  labelProperty: property('Label for options', {
                    value: '',
                    ref: { id: '#dropdownInputLabelProperty' },
                    optionRef: {
                      sourceId: '#dropdownInputPropertyRef',
                      inherit: {
                        id: '$id',
                        type: 'PROPERTY',
                        useKey: 'answer',
                      },
                    },
                    configuration: {
                      allowedKinds: ['OBJECT'],
                    },
                  }),
                  value: variable('Value', {
                    value: [''],
                    optionRef: {
                      sourceId: '#dropdownInputPropertyRef',
                      inherit: [
                        { id: '$id', type: 'PROPERTY', useKey: 'uuid' },
                      ],
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
