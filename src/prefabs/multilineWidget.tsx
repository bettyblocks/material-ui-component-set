import {
  Icon,
  PrefabInteraction,
  ThemeColor,
  buttongroup,
  color,
  component,
  displayLogic,
  font,
  linked,
  number,
  option,
  prefab,
  property,
  size,
  sizes,
  toggle,
  variable,
  wrapper,
} from '@betty-blocks/component-sdk';
import { options as formOptions } from './structures/ActionJSForm/options';
import {
  Box,
  Conditional,
  Text as TextComp,
  TextArea,
  boxOptions,
  conditionalOptions,
  textAreaOptions,
  textOptions,
} from './structures';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.TextareaIcon,
  interactions,
  variables: [],
};

export default prefab('Multiline question', attributes, undefined, [
  wrapper(
    {
      label: 'Multi question',
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
          configuration: {
            showOnDrop: true,
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
      Conditional(
        {
          ref: { id: '#conditional' },
          options: {
            ...conditionalOptions,
            left: variable('Left', {
              ref: { id: '#conditionOptionLeft' },
              value: [],
            }),
            compare: option('CUSTOM', {
              label: 'Compare',
              ref: { id: '#conditionOptionCompare' },
              value: 'eq',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Equals',
                    value: 'eq',
                  },
                  {
                    name: 'Not equal',
                    value: 'neq',
                  },
                  {
                    name: 'Contains',
                    value: 'contains',
                  },
                  {
                    name: 'Does not contain',
                    value: 'notcontains',
                  },
                  {
                    name: 'Greater than',
                    value: 'gt',
                  },
                  {
                    name: 'Less than',
                    value: 'lt',
                  },
                  {
                    name: 'Greater than or equal to',
                    value: 'gteq',
                  },
                  {
                    name: 'Less than or equal to',
                    value: 'lteq',
                  },
                ],
              },
            }),
            right: variable('Right', {
              ref: { id: '#conditionOptionRight' },
              value: [],
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
                  ref: { id: '#MultilineWidgetForm' },
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
                  TextArea(
                    {
                      label: 'Text area',
                      ref: { id: '#textInput' },
                      options: {
                        ...textAreaOptions,
                        property: property('Property', {
                          value: '',
                          ref: { id: '#textInputProperty' },
                          configuration: {
                            createProperty: {
                              type: 'string',
                            },
                          },
                        }),
                        hideLabel: toggle('Hide label', { value: true }),
                        placeholder: variable('Placeholder', {
                          ref: { id: '#textInputPlaceholder' },
                          value: [''],
                        }),
                        required: toggle('Required', {
                          ref: { id: '#textInputRequired' },
                        }),
                        rows: number('Rows', {
                          ref: { id: '#textInputRows' },
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
    ],
  ),
]);
