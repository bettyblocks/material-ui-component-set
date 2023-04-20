import {
  Icon,
  PrefabInteraction,
  wrapper,
  ThemeColor,
  color,
  size,
  font,
  variable,
  sizes,
  option,
  linked,
  prefab,
  component,
  toggle,
  property,
  displayLogic,
  CreatePropertyKind,
} from '@betty-blocks/component-sdk';
import { Box, boxOptions, Text, textOptions } from './structures';
import { options as formOptions } from './structures/ActionJSForm/options';
import { CheckboxInput } from './structures/CheckboxInput';
import { checkboxInputOptions } from './structures/CheckboxInput/options';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.CheckboxIcon,
  interactions,
  variables: [],
};

export default prefab('Checkbox question', attributes, undefined, [
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
                      },
                      ref: {
                        id: '#questionTextContent',
                      },
                      optionRef: {
                        sourceId: '#checkboxInputPropertyRef',
                        inherit: 'label',
                      },
                      showInAddChild: true,
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
                      },
                      showInAddChild: true,
                    }),
                    label: variable('Checkbox label', {
                      value: [''],
                      ref: { id: '#checkboxInputLabel' },
                      showInAddChild: true,
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
]);
