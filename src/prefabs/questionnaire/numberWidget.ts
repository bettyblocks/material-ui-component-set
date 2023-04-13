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
  displayLogic,
  property,
  component,
} from '@betty-blocks/component-sdk';
import { options as formOptions } from '../structures/ActionJSForm/options';
import {
  Box,
  Text,
  TextInput,
  boxOptions,
  textInputOptions,
  textOptions,
} from '../structures';

export const numberWidget = [
  wrapper(
    {
      label: 'Number question',
      optionCategories: [],
      options: {
        property: linked({
          label: 'Property',
          value: {
            ref: {
              componentId: '#numerInput',
              optionId: '#numerInputProperty',
            },
          },
          configuration: {
            showOnDrop: true,
          },
          optionRef: {
            id: '#numerInputPropertyRef',
          },
        }),
        placeholder: linked({
          label: 'Placeholder',
          value: {
            ref: {
              componentId: '#numerInput',
              optionId: '#numerInputPlaceholder',
            },
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#numerInput',
              optionId: '#numerInputRequired',
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
              ref: { id: '#textQuestionForm' },
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
                  ref: { id: '#questionText' },
                  options: {
                    ...textOptions,
                    content: variable('Content', {
                      ref: { id: '#textContent' },
                      value: [],
                      configuration: {
                        as: 'MULTILINE',
                      },
                      optionRef: {
                        sourceId: '#numerInputPropertyRef',
                        inherit: 'label',
                      },
                    }),
                    type: font('Font', {
                      ref: { id: '#questionTextType' },
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
              TextInput(
                {
                  label: 'Number field',
                  inputLabel: 'Number',
                  type: 'number',
                  pattern: '^[0-9]*$',
                  ref: { id: '#numerInput' },
                  options: {
                    ...textInputOptions,
                    property: property('Property', {
                      value: '',
                      ref: { id: '#numerInputProperty' },
                      configuration: {
                        createProperty: {
                          type: 'INTEGER',
                        },
                        allowedKinds: ['INTEGER', 'PRICE'],
                      },
                    }),
                    hideLabel: toggle('Hide label', { value: true }),
                    placeholder: variable('Placeholder', {
                      ref: { id: '#numerInputPlaceholder' },
                      value: [''],
                    }),
                    required: toggle('Required', {
                      ref: { id: '#numerInputRequired' },
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
