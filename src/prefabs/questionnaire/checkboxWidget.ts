import {
  wrapper,
  ThemeColor,
  color,
  size,
  variable,
  sizes,
  option,
  linked,
  component,
  toggle,
  property,
  displayLogic,
} from '@betty-blocks/component-sdk';
import {
  Box,
  boxOptions,
  CheckboxInput,
  checkboxInputOptions,
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
        }),
        questionContent: linked({
          label: 'Checkbox label',
          value: {
            ref: {
              componentId: '#checkboxInput',
              optionId: '#checkboxInputLabel',
            },
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
                          type: 'BOOLEAN',
                        },
                      },
                      showInAddChild: true,
                    }),
                    label: variable('Label', {
                      value: [''],
                      ref: { id: '#checkboxInputLabel' },
                      optionRef: {
                        sourceId: '#checkboxInputPropertyRef',
                        inherit: 'label',
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
