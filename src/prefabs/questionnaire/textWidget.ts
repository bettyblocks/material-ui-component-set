// OLD
// import {
//   wrapper,
//   sizes,
//   ThemeColor,
//   color,
//   size,
//   variable,
//   option,
//   toggle,
//   buttongroup,
//   linked,
//   displayLogic,
//   property,
//   component,
// } from '@betty-blocks/component-sdk';
// import { options as formOptions } from '../structures/ActionJSForm/options';
// import { Box, TextInput, boxOptions, textInputOptions } from '../structures';

// export const textWidget = [
//   wrapper(
//     {
//       label: 'Text question',
//       optionCategories: [],
//       options: {
//         property: linked({
//           label: 'Question',
//           value: {
//             ref: {
//               componentId: '#textInput',
//               optionId: '#textInputProperty',
//             },
//           },
//           configuration: {
//             showOnDrop: true,
//           },
//           optionRef: {
//             id: '#textInputPropertyRef',
//           },
//         }),
//         label: linked({
//           label: 'Label',
//           value: {
//             ref: { componentId: '#textInput', optionId: '#textInputLabel' },
//           },
//           optionRef: {
//             sourceId: '#textInputPropertyRef',
//             inherit: 'label',
//           },
//         }),
//         placeholder: linked({
//           label: 'Placeholder',
//           value: {
//             ref: {
//               componentId: '#textInput',
//               optionId: '#textInputPlaceholder',
//             },
//           },
//         }),
//         required: linked({
//           label: 'Required to answer',
//           value: {
//             ref: {
//               componentId: '#textInput',
//               optionId: '#textInputRequired',
//             },
//           },
//         }),
//         questionSpacing: linked({
//           label: 'Question spacing',
//           value: {
//             ref: {
//               componentId: '#questionBox',
//               optionId: '#questionBoxOuterSpacing',
//             },
//           },
//         }),
//         displayLogic: linked({
//           label: 'Display logic',
//           value: {
//             ref: {
//               componentId: '#questionBox',
//               optionId: '#questionBoxDisplayLogic',
//             },
//           },
//         }),
//       },
//     },
//     [
//       Box(
//         {
//           ref: {
//             id: '#questionBox',
//           },
//           options: {
//             ...boxOptions,
//             backgroundColor: color('Background color', {
//               value: ThemeColor.WHITE,
//             }),
//             borderColor: color('Border color', {
//               value: ThemeColor.MEDIUM,
//             }),
//             borderWidth: size('Border thickness', {
//               value: '1px',
//               configuration: {
//                 as: 'UNIT',
//               },
//             }),
//             borderRadius: size('Border radius', {
//               value: '5px',
//               configuration: {
//                 as: 'UNIT',
//               },
//             }),
//             outerSpacing: sizes('Outer space', {
//               value: ['0rem', '0rem', 'M', '0rem'],
//               ref: {
//                 id: '#questionBoxOuterSpacing',
//               },
//             }),
//             displayLogic: displayLogic('Display logic', {
//               value: {},
//               ref: {
//                 id: '#questionBoxDisplayLogic',
//               },
//             }),
//           },
//         },
//         [
//           component(
//             'Form',
//             {
//               ref: { id: '#textQuestionForm' },
//               options: {
//                 ...formOptions,
//                 actionId: option('ACTION_JS', {
//                   label: 'Action',
//                   value: '',
//                   configuration: {
//                     createAction: {
//                       template: 'update',
//                       permissions: 'inherit',
//                     },
//                   },
//                 }),
//               },
//             },
//             [
//               TextInput(
//                 {
//                   label: 'Text field',
//                   ref: { id: '#textInput' },
//                   options: {
//                     ...textInputOptions,
//                     property: property('Property', {
//                       value: '',
//                       ref: { id: '#textInputProperty' },
//                       configuration: {
//                         createProperty: {
//                           type: 'STRING',
//                         },
//                         allowedKinds: ['TEXT', 'URL', 'IBAN', 'STRING'],
//                         showOnDrop: true,
//                       },
//                       showInAddChild: true,
//                     }),
//                     label: variable('Label', {
//                       value: [''],
//                       ref: { id: '#textInputLabel' },
//                     }),
//                     floatLabel: toggle('Place label above input', {
//                       value: true,
//                     }),
//                     labelColor: color('Label color', {
//                       value: ThemeColor.BLACK,
//                     }),
//                     placeholder: variable('Placeholder', {
//                       ref: { id: '#textInputPlaceholder' },
//                       value: [''],
//                     }),
//                     required: toggle('Required', {
//                       ref: { id: '#textInputRequired' },
//                     }),
//                     margin: buttongroup(
//                       'Margin',
//                       [
//                         ['None', 'none'],
//                         ['Dense', 'dense'],
//                         ['Normal', 'normal'],
//                       ],
//                       { value: 'none' },
//                     ),
//                   },
//                 },
//                 [],
//               ),
//             ],
//           ),
//         ],
//       ),
//     ],
//   ),
// ];

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

export default [
  wrapper(
    {
      label: 'Text question',
      optionCategories: [],
      options: {
        property: linked({
          label: 'Property',
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
                  label: 'Text field',
                  ref: { id: '#textInput' },
                  options: {
                    ...textInputOptions,
                    property: property('Property', {
                      value: '',
                      ref: { id: '#textInputProperty' },
                      configuration: {
                        createProperty: {
                          type: 'STRING',
                        },
                        allowedKinds: ['TEXT', 'URL', 'IBAN', 'STRING'],
                      },
                      showInAddChild: true,
                      optionRef: {
                        id: '#textInputPropertyRef',
                      },
                    }),
                    label: variable('Label', {
                      value: [''],
                      optionRef: {
                        sourceId: '#textInputPropertyRef',
                        inherit: 'label',
                      },
                    }),
                    placeholder: variable('Placeholder', {
                      ref: { id: '#textInputPlaceholder' },
                      value: [''],
                    }),
                    required: toggle('Required', {
                      ref: { id: '#textInputRequired' },
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
