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
  size,
  sizes,
  toggle,
  variable,
  wrapper,
} from '@betty-blocks/component-sdk';
import { options as formOptions } from '../structures/ActionJSForm/options';
import { Box, TextInput, boxOptions, textInputOptions } from '../structures';

export const numberWidget = [
  wrapper(
    {
      label: 'Number question',
      optionCategories: [],
      options: {
        property: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#numberInput',
              optionId: '#numberInputProperty',
            },
          },
          optionRef: {
            id: '#numberInputPropertyRef',
          },
          configuration: {
            showOnDrop: true,
          },
          showInReconfigure: true,
        }),
        label: linked({
          label: 'Label',
          value: {
            ref: { componentId: '#numberInput', optionId: '#numberInputLabel' },
          },
        }),
        placeholder: linked({
          label: 'Placeholder',
          value: {
            ref: {
              componentId: '#numberInput',
              optionId: '#numberInputPlaceholder',
            },
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#numberInput',
              optionId: '#numberInputRequired',
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
              ref: { id: '#numberQuestionForm' },
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
              TextInput(
                {
                  label: 'Number field',
                  inputLabel: 'Number',
                  type: 'number',
                  pattern: '^[0-9]*$',
                  ref: { id: '#numberInput' },
                  options: {
                    ...textInputOptions,
                    property: property('Question', {
                      value: '',
                      ref: { id: '#numberInputProperty' },
                      configuration: {
                        createProperty: {
                          type: CreatePropertyKind.INTEGER,
                        },
                        allowedKinds: ['INTEGER', 'PRICE'],
                        disabled: true,
                        allowFormatting: false,
                      },
                      showInAddChild: true,
                    }),
                    label: variable('Label', {
                      value: [''],
                      ref: { id: '#numberInputLabel' },
                      optionRef: {
                        sourceId: '#numberInputPropertyRef',
                        inherit: [
                          { name: '$name', id: '$id', type: 'PROPERTY_LABEL' },
                        ],
                      },
                      configuration: {
                        allowPropertyName: true,
                      },
                    }),
                    value: variable('Value', {
                      value: [''],
                      optionRef: {
                        sourceId: '#numberInputPropertyRef',
                        inherit: [
                          { name: '$name', id: '$id', type: 'PROPERTY' },
                        ],
                      },
                    }),
                    floatLabel: toggle('Place label above input', {
                      value: true,
                    }),
                    labelColor: color('Label color', {
                      value: ThemeColor.BLACK,
                    }),
                    placeholder: variable('Placeholder', {
                      ref: { id: '#numberInputPlaceholder' },
                      value: [''],
                      configuration: {
                        allowPropertyName: true,
                      },
                    }),
                    required: toggle('Required', {
                      ref: { id: '#numberInputRequired' },
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
];
