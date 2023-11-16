import {
  CreatePropertyKind,
  ThemeColor,
  color,
  component,
  displayLogic,
  font,
  linked,
  option,
  property,
  size,
  sizes,
  toggle,
  variable,
  wrapper,
} from '@betty-blocks/component-sdk';
import {
  Box,
  CheckboxInput,
  Text,
  boxOptions,
  checkboxInputOptions,
  textOptions,
} from '../structures';
import { options as formOptions } from '../structures/ActionJSForm/options';

export const checkboxWidget = [
  wrapper(
    {
      label: 'Checkbox question',
      optionCategories: [],
      options: {
        property: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#checkboxInput',
              optionId: '#checkboxInputProperty',
            },
          },
          optionRef: {
            id: '#checkboxInputPropertyRef',
          },
          configuration: {
            showOnDrop: true,
          },
          showInReconfigure: true,
        }),
        questionText: linked({
          label: 'Question text',
          value: {
            ref: {
              componentId: '#questionText',
              optionId: '#questionTextContent',
            },
          },
        }),
        questionContent: linked({
          label: 'Checkbox label',
          value: {
            ref: {
              componentId: '#checkboxInput',
              optionId: '#checkboxInputLabel',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#checkboxInput',
              optionId: '#checkboxInputRequired',
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
              ref: { id: '#checkboxQuestionForm' },
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
              Text(
                {
                  ref: {
                    id: '#questionText',
                  },
                  options: {
                    ...textOptions,
                    content: variable('Question text', {
                      value: [''],
                      configuration: {
                        as: 'MULTILINE',
                        allowPropertyName: true,
                      },
                      ref: {
                        id: '#questionTextContent',
                      },
                      optionRef: {
                        sourceId: '#checkboxInputPropertyRef',
                        inherit: [
                          { name: '$name', id: '$id', type: 'PROPERTY_LABEL' },
                        ],
                      },
                    }),
                    type: font('Font', { value: ['Body1'] }),
                  },
                },
                [],
              ),
              CheckboxInput(
                {
                  ref: { id: '#checkboxInput' },
                  options: {
                    ...checkboxInputOptions,
                    property: property('Question', {
                      value: '',
                      ref: {
                        id: '#checkboxInputProperty',
                      },
                      configuration: {
                        allowedKinds: ['BOOLEAN', 'BOOLEAN_EXPRESSION'],
                        createProperty: {
                          type: CreatePropertyKind.BOOLEAN,
                        },
                        disabled: true,
                      },
                      showInAddChild: true,
                    }),
                    label: variable('Checkbox label', {
                      value: [''],
                      ref: { id: '#checkboxInputLabel' },
                      configuration: {
                        allowPropertyName: true,
                      },
                      showInAddChild: true,
                    }),
                    value: variable('Value', {
                      value: [],
                      optionRef: {
                        sourceId: '#checkboxInputPropertyRef',
                        inherit: [
                          { name: '$name', id: '$id', type: 'PROPERTY' },
                        ],
                      },
                    }),
                    labelColor: color('Label color', {
                      value: ThemeColor.BLACK,
                    }),
                    required: toggle('Required', {
                      ref: {
                        id: '#checkboxInputRequired',
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
