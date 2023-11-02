import {
  CreatePropertyKind,
  ThemeColor,
  color,
  component,
  linked,
  option,
  property,
  size,
  sizes,
  toggle,
  variable,
  wrapper,
  displayLogic,
  buttongroup,
  showIf,
} from '@betty-blocks/component-sdk';
import { Box, RadioInput, boxOptions, radioInputOptions } from '../structures';
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
              optionId: '#radioInputProperty',
            },
          },
          optionRef: {
            id: '#radioInputPropertyRef',
          },
          configuration: {
            showOnDrop: true,
          },
          showInReconfigure: true,
        }),
        label: linked({
          label: 'Label',
          value: {
            ref: { componentId: '#radioInput', optionId: '#radioInputLabel' },
          },
        }),
        optionLabel: linked({
          label: 'Label for options',
          value: {
            ref: {
              componentId: '#radioInput',
              optionId: '#radioInputLabelProperty',
            },
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#radioInput',
              optionId: '#radioInputRequired',
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
              ref: { id: '#radioQuestionForm' },
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
              RadioInput(
                {
                  ref: { id: '#radioInput' },
                  options: {
                    ...radioInputOptions,
                    property: property('Question', {
                      value: '',
                      ref: {
                        id: '#radioInputProperty',
                      },
                      configuration: {
                        allowedKinds: ['OBJECT'],
                        createProperty: {
                          type: CreatePropertyKind.OBJECT,
                        },
                        disabled: true,
                        manageObjectValues: {
                          selectableObjectKey: false,
                          buttonLabel: 'Manage answer options',
                          label: 'Manage answer options',
                          value: [],
                        },
                      },
                      showInAddChild: true,
                    }),
                    label: variable('Label', {
                      value: [''],
                      ref: { id: '#radioInputLabel' },
                      optionRef: {
                        sourceId: '#radioInputPropertyRef',
                        inherit: [
                          { name: '$name', id: '$id', type: 'PROPERTY_LABEL' },
                        ],
                      },
                      configuration: {
                        allowPropertyName: true,
                      },
                    }),
                    labelProperty: property('Label for options', {
                      value: '',
                      ref: { id: '#radioInputLabelProperty' },
                      optionRef: {
                        sourceId: '#radioInputPropertyRef',
                        inherit: {
                          id: '$id',
                          type: 'PROPERTY',
                          useKey: 'answer',
                        },
                      },
                      configuration: {
                        allowedKinds: ['OBJECT'],
                      },
                    }),
                    value: variable('Value', {
                      value: [''],
                      optionRef: {
                        sourceId: '#radioInputPropertyRef',
                        inherit: [
                          {
                            id: '$id',
                            type: 'PROPERTY',
                            useKey: 'uuid',
                          },
                        ],
                      },
                    }),
                    labelColor: color('Label color', {
                      value: ThemeColor.BLACK,
                    }),
                    required: toggle('Required', {
                      ref: {
                        id: '#questionRequired',
                      },
                    }),
                    optionType: buttongroup(
                      'Option type',
                      [
                        ['Model', 'model'],
                        ['Property', 'property'],
                        ['Variable', 'variable'],
                      ],
                      {
                        value: 'property',
                        configuration: {
                          condition: showIf('optionType', 'EQ', 'never'),
                        },
                      },
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
