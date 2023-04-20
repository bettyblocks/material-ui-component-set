import {
  prefab,
  Icon,
  PrefabInteraction,
  wrapper,
  sizes,
  ThemeColor,
  color,
  size,
  variable,
  option,
  toggle,
  buttongroup,
  linked,
  displayLogic,
  property,
  component,
  CreatePropertyKind,
} from '@betty-blocks/component-sdk';
import { options as formOptions } from './structures/ActionJSForm/options';
import { Box, TextInput, boxOptions, textInputOptions } from './structures';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.NumberInputIcon,
  interactions,
  variables: [],
};

export default prefab('Number Question', attributes, undefined, [
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
                          type: CreatePropertyKind.INTEGER,
                        },
                        allowedKinds: ['INTEGER', 'PRICE'],
                      },
                    }),
                    label: variable('Label', {
                      value: [''],
                      optionRef: {
                        sourceId: '#numerInputPropertyRef',
                        inherit: 'label',
                      },
                    }),
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
]);
