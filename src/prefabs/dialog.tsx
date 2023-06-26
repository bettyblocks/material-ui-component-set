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
              ...rowOptions.maxRowWidth('maxRowWidth'),
              value: 'Full',
            }),
          },
        },
        [
          Column(
            {
              options: {
                ...columnOptions,
                columnWidth: option('CUSTOM', {
                  ...columnOptions.columnWidth('columnWidth'),
                  value: 'flexible',
                }),
                columnWidthTabletLandscape: option('CUSTOM', {
                  ...columnOptions.columnWidthTabletLandscape(
                    'columnWidthTabletLandscape',
                  ),
                  value: 'flexible',
                }),
                columnWidthTabletPortrait: option('CUSTOM', {
                  ...columnOptions.columnWidthTabletPortrait(
                    'columnWidthTabletPortrait',
                  ),
                  value: 'flexible',
                }),
                columnWidthMobile: option('CUSTOM', {
                  ...columnOptions.columnWidthMobile('columnWidthMobile'),
                  value: 'flexible',
                }),
              },
            },
            [
              Box(
                {
                  options: {
                    ...boxOptions,
                    alignment: option('CUSTOM', {
                      ...boxOptions.alignment('alignment'),
                      value: 'space-between',
                    }),
                    innerSpacing: sizes('Inner space', {
                      ...boxOptions.innerSpacing('innerSpacing'),
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
                          ...textOptions.content('content'),
                          value: ['Dialog'],
                        }),
                        type: font('Type', {
                          ...textOptions.type('type'),
                          value: 'Title4',
                        }),
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
                          ...buttonOptions.buttonText('buttonText'),
                          value: [''],
                        }),
                        size: option('CUSTOM', {
                          ...buttonOptions.size('size'),
                          value: 'medium',
                        }),
                        icon: icon('Icon', {
                          ...buttonOptions.icon('icon'),
                          value: 'Close',
                        }),
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
                        ...textOptions.content('content'),
                        value: [
                          'To start using the dialog, please drag or remove components to your liking.',
                        ],
                        configuration: { as: 'MULTILINE' },
                      }),
                      type: font('Text style', {
                        ...textOptions.type('type'),
                        value: ['Body1'],
                      }),
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
                        ...buttonOptions.buttonText('buttonText'),
                        value: ['Cancel'],
                      }),
                      outerSpacing: sizes('Outer space', {
                        ...buttonOptions.outerSpacing('outerSpacing'),
                        value: ['0rem', 'M', '0rem', '0rem'],
                      }),
                    },
                  }),
                  Button({
                    options: {
                      ...buttonOptions,
                      buttonText: variable('Button text', {
                        ...buttonOptions.buttonText('buttonText'),
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
