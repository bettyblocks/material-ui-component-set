import {
  CreatePropertyKind,
  ThemeColor,
  color,
  component,
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
  RadioInput,
  Text,
  boxOptions,
  radioInputOptions,
  textOptions,
} from '../structures';
import { options as formOptions } from '../structures/ActionJSForm/options';

export const radioWidget = [
  wrapper(
    {
      label: 'Multiple choice question',
      optionCategories: [],
      options: {
        property: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#radioInput',
              optionId: '#questionProperty',
            },
          },
          configuration: {
            showOnDrop: true,
          },
          optionRef: {
            id: '#questionProperty',
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#radioInput',
              optionId: '#questionRequired',
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
          },
        },
        [
          component(
            'Form',
            {
              ref: { id: '#RadioWidgetForm' },
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
                    id: '#QuestionText',
                  },
                  options: {
                    ...textOptions,
                    content: variable('Content', {
                      value: [''],
                      configuration: {
                        as: 'MULTILINE',
                      },
                      ref: {
                        id: '#questionTitleContent',
                      },
                      optionRef: {
                        sourceId: '#questionProperty',
                        inherit: 'label',
                      },
                    }),
                    type: font('Font', { value: ['Body1'] }),
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
              RadioInput(
                {
                  ref: { id: '#radioInput' },
                  options: {
                    ...radioInputOptions,
                    property: property('Question', {
                      value: '',
                      configuration: {
                        allowedKinds: ['OBJECT'],
                        createProperty: {
                          type: CreatePropertyKind.OBJECT,
                        },
                        disabled: true,
                        manageObjectValues: {
                          value: [],
                        },
                      },
                      ref: {
                        id: '#questionProperty',
                      },
                    }),
                    label: variable('Label', {
                      value: [''],
                      configuration: {
                        allowPropertyName: true,
                      },
                    }),
                    required: toggle('Required', {
                      ref: {
                        id: '#questionRequired',
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
