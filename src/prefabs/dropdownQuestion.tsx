import {
  Icon,
  PrefabInteraction,
  wrapper,
  ThemeColor,
  color,
  size,
  variable,
  sizes,
  linked,
  prefab,
  component,
  buttongroup,
  displayLogic,
  property,
  option,
  toggle,
} from '@betty-blocks/component-sdk';
import { Box, boxOptions, SelectInput, selectInputOptions } from './structures';
import { options as formOptions } from './structures/ActionJSForm/options';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.SelectIcon,
  interactions,
  variables: [],
};

export default prefab('Dropdown question', attributes, undefined, [
  wrapper(
    {
      label: 'Dropdown question',
      optionCategories: [],
      options: {
        property: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#dropdownInput',
              optionId: '#dropdownInputProperty',
            },
          },
          configuration: {
            showOnDrop: true,
          },
          optionRef: {
            id: '#dropdownInputProperty',
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#dropdownInput',
              optionId: '#dropdownInputRequired',
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
          ref: { id: '#questionBox' },
          options: {
            ...boxOptions,
            displayLogic: displayLogic('Display logic', {
              value: {},
              ref: {
                id: '#questionBoxDisplayLogic',
              },
            }),
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
              ref: { id: '#questionBoxOuterSpacing' },
            }),
          },
        },
        [
          component(
            'Form',
            {
              ref: { id: '#dropdownWidgetForm' },
              options: {
                ...formOptions,
                actionId: option('ACTION_JS', {
                  label: 'Action',
                  value: '',
                  configuration: {
                    createAction: {
                      template: 'update',
                    },
                  },
                }),
              },
            },
            [
              SelectInput({
                ref: { id: '#dropdownInput' },
                options: {
                  ...selectInputOptions,
                  property: property('Property', {
                    value: '',
                    ref: {
                      id: '#dropdownInputProperty',
                    },
                    configuration: {
                      allowRelations: true,
                      allowedKinds: ['LIST'],
                      createProperty: {
                        type: 'ARRAY',
                      },
                    },
                  }),
                  label: variable('Label', {
                    value: [''],
                    optionRef: {
                      sourceId: '#dropdownInputProperty',
                      inherit: 'label',
                    },
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
                  required: toggle('Required', {
                    ref: {
                      id: '#dropdownInputRequired',
                    },
                  }),
                },
              }),
            ],
          ),
        ],
      ),
    ],
  ),
]);
