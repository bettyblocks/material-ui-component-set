import {
  prefab,
  Icon,
  option,
  sizes,
  variable,
  font,
  icon,
  PrefabInteraction,
  InteractionType,
  hideIf,
} from '@betty-blocks/component-sdk';

import {
  Box,
  Column,
  Dialog,
  Paper,
  Row,
  Text,
  rowOptions,
  columnOptions,
  boxOptions,
  textOptions,
  buttonOptions,
  Button,
} from './structures';

const interactions: PrefabInteraction[] = [
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#dialog',
      sourceComponentId: '#closeBtn',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#dialog',
      sourceComponentId: '#cancelBtn',
    },
    type: InteractionType.Custom,
  },
];

const attr = {
  icon: Icon.DialogIcon,
  category: 'CONTENT',
  keywords: [
    'Content',
    'dialog',
    'popup',
    'modal',
    'pop-up',
    'popover',
    'pop-over',
  ],
  interactions,
};

export default prefab('Dialog', attr, undefined, [
  Dialog({ ref: { id: '#dialog' } }, [
    Paper({}, [
      Row(
        {
          options: {
            ...rowOptions,
            maxRowWidth: option('CUSTOM', {
              label: 'Width',
              value: 'Full',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'S', value: 'S' },
                  { name: 'M', value: 'M' },
                  { name: 'L', value: 'L' },
                  { name: 'XL', value: 'XL' },
                  { name: 'Full', value: 'Full' },
                ],
              },
            }),
          },
        },
        [
          Column(
            {
              options: {
                ...columnOptions,
                columnWidth: option('CUSTOM', {
                  value: 'flexible',
                  label: 'Column width',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Fit content', value: 'fitContent' },
                      { name: 'Flexible', value: 'flexible' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                  },
                }),
                columnWidthTabletLandscape: option('CUSTOM', {
                  value: 'flexible',
                  label: 'Column width',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Fit content', value: 'fitContent' },
                      { name: 'Flexible', value: 'flexible' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                  },
                }),
                columnWidthTabletPortrait: option('CUSTOM', {
                  value: 'flexible',
                  label: 'Column width',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Fit content', value: 'fitContent' },
                      { name: 'Flexible', value: 'flexible' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                  },
                }),
                columnWidthMobile: option('CUSTOM', {
                  value: 'flexible',
                  label: 'Column width',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Fit content', value: 'fitContent' },
                      { name: 'Flexible', value: 'flexible' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                  },
                }),
              },
            },
            [
              Box(
                {
                  options: {
                    ...boxOptions,
                    alignment: option('CUSTOM', {
                      value: 'space-between',
                      label: 'Alignment',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'None', value: 'none' },
                          { name: 'Left', value: 'flex-start' },
                          { name: 'Center', value: 'center' },
                          { name: 'Right', value: 'flex-end' },
                          { name: 'Justified', value: 'space-between' },
                        ],
                      },
                    }),
                    innerSpacing: sizes('Inner space', {
                      value: ['M', 'M', '0rem', 'M'],
                    }),
                  },
                },
                [
                  Text(
                    {
                      options: {
                        ...textOptions,
                        content: variable('Content', {
                          value: ['Dialog'],
                          configuration: {
                            as: 'MULTILINE',
                          },
                        }),
                        type: font('Type', { value: 'Title4' }),
                      },
                    },
                    [],
                  ),
                  Button(
                    {
                      ref: { id: '#closeBtn' },
                      style: {
                        overwrite: {
                          backgroundColor: {
                            type: 'STATIC',
                            value: 'Transparent',
                          },
                          boxShadow: 'none',
                          color: {
                            type: 'THEME_COLOR',
                            value: 'light',
                          },
                          padding: ['0rem'],
                        },
                      },
                      options: {
                        ...buttonOptions,
                        buttonText: variable('Button text', {
                          value: [''],
                        }),
                        size: option('CUSTOM', {
                          value: 'medium',
                          label: 'Icon size',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Small', value: 'small' },
                              { name: 'Medium', value: 'medium' },
                              { name: 'Large', value: 'large' },
                            ],
                            condition: hideIf('icon', 'EQ', 'none'),
                          },
                        }),
                        icon: icon('Icon', { value: 'Close' }),
                      },
                    },
                    [],
                  ),
                ],
              ),
              Box({}, [
                Text(
                  {
                    options: {
                      ...textOptions,
                      content: variable('Content', {
                        value: [
                          'To start using the dialog, please drag or remove components to your liking.',
                        ],
                        configuration: { as: 'MULTILINE' },
                      }),
                      type: font('Text style', { value: ['Body1'] }),
                    },
                  },
                  [],
                ),
              ]),
              Box(
                {
                  options: {
                    ...boxOptions,
                    alignment: option('CUSTOM', {
                      value: 'flex-end',
                      label: 'Alignment',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'None', value: 'none' },
                          { name: 'Left', value: 'flex-start' },
                          { name: 'Center', value: 'center' },
                          { name: 'Right', value: 'flex-end' },
                          { name: 'Justified', value: 'space-between' },
                        ],
                      },
                    }),
                  },
                },
                [
                  Button({
                    ref: { id: '#cancelBtn' },
                    style: {
                      name: 'outline',
                    },
                    options: {
                      ...buttonOptions,
                      buttonText: variable('Button text', {
                        value: ['Cancel'],
                      }),
                      outerSpacing: sizes('Outer space', {
                        value: ['0rem', 'M', '0rem', '0rem'],
                      }),
                    },
                  }),
                  Button({
                    options: {
                      ...buttonOptions,
                      buttonText: variable('Button text', {
                        value: ['Submit'],
                      }),
                    },
                  }),
                ],
              ),
            ],
          ),
        ],
      ),
    ]),
  ]),
]);
