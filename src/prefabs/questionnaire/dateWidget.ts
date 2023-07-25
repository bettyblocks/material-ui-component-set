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
  text,
  toggle,
  variable,
  wrapper,
} from '@betty-blocks/component-sdk';
import { options as formOptions } from '../structures/ActionJSForm/options';
import {
  Box,
  DateTimePicker,
  boxOptions,
  dateTimePickerOptions,
} from '../structures';

export const dateWidget = [
  wrapper(
    {
      label: 'Date question',
      optionCategories: [],
      options: {
        question: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#dateInput',
              optionId: '#dateInputProperty',
            },
          },
          optionRef: {
            id: '#dateInputPropertyRef',
          },
          configuration: {
            showOnDrop: true,
          },
          showInReconfigure: true,
        }),
        label: linked({
          label: 'Label',
          value: {
            ref: { componentId: '#dateInput', optionId: '#dateInputLabel' },
          },
        }),
        placeholder: linked({
          label: 'Placeholder',
          value: {
            ref: {
              componentId: '#dateInput',
              optionId: '#dateInputPlaceholder',
            },
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#dateInput',
              optionId: '#dateInputRequired',
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
              ref: { id: '#dateQuestionForm' },
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
              DateTimePicker(
                {
                  ref: { id: '#dateInput' },
                  label: 'Date picker',
                  options: {
                    ...dateTimePickerOptions,
                    property: property('Question', {
                      value: '',
                      ref: {
                        id: '#dateInputProperty',
                      },
                      configuration: {
                        allowedKinds: ['DATE'],
                        createProperty: {
                          type: CreatePropertyKind.DATE,
                        },
                        disabled: true,
                        allowFormatting: false,
                      },
                      showInAddChild: true,
                    }),
                    label: variable('Label', {
                      value: [''],
                      ref: { id: '#dateInputLabel' },
                      optionRef: {
                        sourceId: '#dateInputPropertyRef',
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
                        sourceId: '#dateInputPropertyRef',
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
                      ref: { id: '#dateInputPlaceholder' },
                      value: [''],
                      configuration: {
                        allowPropertyName: true,
                      },
                    }),
                    required: toggle('Required', {
                      ref: { id: '#dateInputRequired' },
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
                    type: text('Type', {
                      value: 'date',
                      configuration: {
                        condition: showIf('type', 'EQ', false),
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
];
