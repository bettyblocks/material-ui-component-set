import {
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
  linked,
  component,
  showIf,
  text as textType,
  displayLogic,
  property,
} from '@betty-blocks/component-sdk';
import { options as formOptions } from '../structures/ActionJSForm/options';
import {
  Box,
  boxOptions,
  Text as TextComp,
  textOptions,
  DateTimePicker,
  dateTimePickerOptions,
} from '../structures';

export default [
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
          configuration: {
            showOnDrop: true,
          },
          optionRef: {
            id: '#dateInputProperty',
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
              componentId: '#DateInput',
              optionId: '#DateInputRequired',
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
              ref: { id: '#DateWidgetForm' },
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
              TextComp(
                {
                  ref: { id: '#questionText' },
                  options: {
                    ...textOptions,
                    content: variable('Content', {
                      ref: { id: '#textContent' },
                      value: [],
                      configuration: { as: 'MULTILINE' },
                      optionRef: {
                        sourceId: '#dateInputProperty',
                        inherit: 'label',
                      },
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
              DateTimePicker(
                {
                  ref: { id: '#dateInput' },
                  options: {
                    ...dateTimePickerOptions,
                    property: property('Question', {
                      value: '',
                      configuration: {
                        allowedKinds: ['DATE', 'DATE_TIME'],
                        createProperty: {
                          type: 'DATE_TIME',
                        },
                      },
                      ref: {
                        id: '#dateInputProperty',
                      },
                    }),
                    hideLabel: toggle('Hide label', { value: true }),
                    placeholder: variable('Placeholder', {
                      ref: { id: '#dateInputPlaceholder' },
                      value: [''],
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
                    type: textType('Type', {
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
