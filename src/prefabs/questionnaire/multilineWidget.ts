import {
  CreatePropertyKind,
  ThemeColor,
  buttongroup,
  color,
  component,
  displayLogic,
  linked,
  number,
  option,
  property,
  size,
  sizes,
  toggle,
  variable,
  wrapper,
} from '@betty-blocks/component-sdk';
import { options as formOptions } from '../structures/ActionJSForm/options';
import { Box, TextArea, boxOptions, textAreaOptions } from '../structures';

export const multilineWidget = [
  wrapper(
    {
      label: 'Multiline question',
      optionCategories: [],
      options: {
        property: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#textInput',
              optionId: '#textInputProperty',
            },
          },
          optionRef: {
            id: '#textInputPropertyRef',
          },
          configuration: {
            showOnDrop: true,
          },
          showInReconfigure: true,
        }),
        label: linked({
          label: 'Label',
          value: {
            ref: { componentId: '#textInput', optionId: '#textInputLabel' },
          },
        }),
        placeholder: linked({
          label: 'Placeholder',
          value: {
            ref: {
              componentId: '#textInput',
              optionId: '#textInputPlaceholder',
            },
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#textInput',
              optionId: '#textInputRequired',
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
              ref: { id: '#multilineQuestionForm' },
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
              TextArea(
                {
                  label: 'Text area',
                  ref: { id: '#textInput' },
                  options: {
                    ...textAreaOptions,
                    property: property('Question', {
                      value: '',
                      ref: { id: '#textInputProperty' },
                      configuration: {
                        createProperty: {
                          type: CreatePropertyKind.TEXT,
                        },
                        allowedKinds: ['TEXT'],
                        disabled: true,
                      },
                      showInAddChild: true,
                    }),
                    label: variable('Label', {
                      value: [''],
                      ref: { id: '#textInputLabel' },
                      optionRef: {
                        sourceId: '#textInputPropertyRef',
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
                        sourceId: '#textInputPropertyRef',
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
                      ref: { id: '#textInputPlaceholder' },
                      value: [''],
                      configuration: {
                        allowPropertyName: true,
                      },
                    }),
                    required: toggle('Required', {
                      ref: { id: '#textInputRequired' },
                    }),
                    rows: number('Rows', {
                      value: 4,
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
