import * as React from 'react';

import {
  prefab,
  Icon,
  toggle,
  sizes,
  showIf,
  variable,
  option,
  icon,
  ThemeColor,
  color,
  size,
  buttongroup,
  font,
} from '@betty-blocks/component-sdk';

import {
  Box,
  boxOptions,
  Button,
  buttonOptions,
  Column,
  columnOptions,
  Drawer,
  DrawerBar,
  drawerBarOptions,
  DrawerContainer,
  drawerContainerOptions,
  drawerOptions,
  Grid,
  gridOptions,
  Media,
  mediaOptions,
  Row,
  Text,
  textOptions,
} from './structures';
import { options as defaults } from './structures/ActionJSForm/options';
import { Properties, IdPropertyProps, ModelProps, ModelQuery } from './types';

const attributes = {
  category: 'FORMV2',
  icon: Icon.UpdateFormIcon,
  type: 'page',
  description: 'Discription',
  detail: 'detail',
  previewUrl: 'https://preview.betty.app/back-office',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Back_Office.jpg',
};

const drawerSidebar = DrawerBar(
  {
    options: {
      ...drawerBarOptions,
      innerSpacing: sizes('Inner space', {
        value: ['0rem', '0rem', '0rem', '0rem'],
      }),
    },
  },
  [
    Box(
      {
        label: 'Logo',
        options: {
          ...boxOptions,
          position: buttongroup(
            'Position',
            [
              ['Static', 'static'],
              ['Relative', 'relative'],
              ['Absolute', 'absolute'],
              ['Fixed', 'fixed'],
              ['Sticky', 'sticky'],
            ],
            {
              value: 'relative',
              configuration: {
                dataType: 'string',
              },
            },
          ),
          backgroundColor: color('Background color', {
            value: ThemeColor.WHITE,
          }),
        },
      },
      [
        Box(
          {
            options: {
              ...boxOptions,
              position: buttongroup(
                'Position',
                [
                  ['Static', 'static'],
                  ['Relative', 'relative'],
                  ['Absolute', 'absolute'],
                  ['Fixed', 'fixed'],
                  ['Sticky', 'sticky'],
                ],
                {
                  value: 'relative',
                  configuration: {
                    dataType: 'string',
                  },
                },
              ),
              backgroundColor: color('Background color', {
                value: ThemeColor.WHITE,
              }),
              height: size('Height', {
                value: '100%',
                configuration: {
                  as: 'UNIT',
                },
              }),
              width: size('Width', {
                value: '100%',
                configuration: {
                  as: 'UNIT',
                },
              }),
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
            },
          },
          [
            Media(
              {
                options: {
                  ...mediaOptions,
                  type: option('CUSTOM', {
                    label: 'Media type',
                    value: 'url',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Image', value: 'img' },
                        { name: 'Data/URL', value: 'url' },
                        { name: 'Video', value: 'video' },
                        { name: 'I-frame', value: 'iframe' },
                      ],
                    },
                  }),
                  outerSpacing: sizes('Outer space', {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                  }),
                  urlFileSource: variable('Source', {
                    value: [
                      'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_B.svg',
                    ],
                    configuration: {
                      placeholder: 'Starts with https:// or http://',
                      as: 'MULTILINE',
                      condition: showIf('type', 'EQ', 'url'),
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

    Box(
      {
        label: 'Items wrap',
        options: {
          ...boxOptions,
          stretch: toggle('Stretch (when in flex container)', {
            value: true,
          }),
          innerSpacing: sizes('Inner space', {
            value: ['0rem', '0rem', '0rem', '0rem'],
          }),
          backgroundColor: color('Background color', {
            value: ThemeColor.PRIMARY,
          }),
          position: buttongroup(
            'Position',
            [
              ['Static', 'static'],
              ['Relative', 'relative'],
              ['Absolute', 'absolute'],
              ['Fixed', 'fixed'],
              ['Sticky', 'sticky'],
            ],
            {
              value: 'relative',
              configuration: {
                dataType: 'string',
              },
            },
          ),
        },
      },
      [
        Box(
          {
            label: 'My account',
            options: {
              ...boxOptions,
              alignment: buttongroup(
                'Alignment',
                [
                  ['None', 'none'],
                  ['Left', 'flex-start'],
                  ['Center', 'center'],
                  ['Right', 'flex-end'],
                  ['Justified', 'space-between'],
                ],
                {
                  value: 'flex-start',
                  configuration: {
                    dataType: 'string',
                  },
                },
              ),
              valignment: buttongroup(
                'Vertical alignment',
                [
                  ['None', 'none'],
                  ['Top', 'flex-start'],
                  ['Center', 'center'],
                  ['Bottom', 'flex-end'],
                ],
                {
                  value: 'center',
                  configuration: {
                    dataType: 'string',
                  },
                },
              ),
            },
          },
          [
            Box(
              {
                options: {
                  ...boxOptions,
                  alignment: buttongroup(
                    'Alignment',
                    [
                      ['None', 'none'],
                      ['Left', 'flex-start'],
                      ['Center', 'center'],
                      ['Right', 'flex-end'],
                      ['Justified', 'space-between'],
                    ],
                    {
                      value: 'center',
                      configuration: {
                        dataType: 'string',
                      },
                    },
                  ),
                  valignment: buttongroup(
                    'Vertical alignment',
                    [
                      ['None', 'none'],
                      ['Top', 'flex-start'],
                      ['Center', 'center'],
                      ['Bottom', 'flex-end'],
                    ],
                    {
                      value: 'center',
                      configuration: {
                        dataType: 'string',
                      },
                    },
                  ),
                  innerSpacing: sizes('Inner space', {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                  }),
                  height: size('Height', {
                    value: '40px',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                  width: size('Width', {
                    value: '40px',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                  backgroundColor: color('Background color', {
                    value: ThemeColor.WHITE,
                  }),
                  borderRadius: size('Border radius', {
                    value: '40px',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                },
              },
              [
                Text(
                  {
                    options: {
                      ...textOptions,
                      content: variable('Content', {
                        value: ['AB'],
                        configuration: { as: 'MULTILINE' },
                      }),
                      type: font('Font', { value: ['Body2'] }),
                      textAlignment: option('CUSTOM', {
                        label: 'Text Alignment',
                        value: 'center',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Left', value: 'left' },
                            { name: 'Center', value: 'center' },
                            { name: 'Right', value: 'right' },
                          ],
                        },
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
              ],
            ),
            Box(
              {
                options: {
                  ...boxOptions,
                  valignment: buttongroup(
                    'Vertical alignment',
                    [
                      ['None', 'none'],
                      ['Top', 'flex-start'],
                      ['Center', 'center'],
                      ['Bottom', 'flex-end'],
                    ],
                    {
                      value: 'center',
                      configuration: {
                        dataType: 'string',
                      },
                    },
                  ),
                  innerSpacing: sizes('Inner space', {
                    value: ['0rem', '0rem', '0rem', 'M'],
                  }),
                },
              },
              [
                Text(
                  {
                    options: {
                      ...textOptions,
                      content: variable('Content', {
                        value: ['My account'],
                        configuration: { as: 'MULTILINE' },
                      }),
                      textColor: color('Text color', {
                        value: ThemeColor.WHITE,
                      }),
                      type: font('Font', { value: ['Body2'] }),
                      textAlignment: option('CUSTOM', {
                        label: 'Text Alignment',
                        value: 'center',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Left', value: 'left' },
                            { name: 'Center', value: 'center' },
                            { name: 'Right', value: 'right' },
                          ],
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

        Box(
          {
            options: {
              ...boxOptions,
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
              height: size('Height', {
                value: '1px',
                configuration: {
                  as: 'UNIT',
                },
              }),
              backgroundColor: color('Background color', {
                value: ThemeColor.BLACK,
              }),
              backgroundColorAlpha: option('NUMBER', {
                label: 'Background color opacity',
                value: 20,
              }),
            },
          },
          [
            Row({}, [
              Column(
                {
                  options: {
                    ...columnOptions,
                    columnWidth: option('CUSTOM', {
                      label: 'Column width',
                      value: 'hidden',
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
                      label: 'Column width (tablet landscape)',
                      value: 'hidden',
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
                      value: 'hidden',
                      label: 'Column width (tablet portrait)',
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
                      value: 'hidden',
                      label: 'Column width (mobile)',
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
                    innerSpacing: sizes('Inner space', {
                      value: ['0rem', '0rem', '0rem', '0rem'],
                    }),
                  },
                },
                [],
              ),
            ]),
          ],
        ),

        Box(
          {
            label: 'Menu Items',
            options: {
              ...boxOptions,
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
            },
          },
          [
            Box(
              {
                label: 'Full Item',
                options: {
                  ...boxOptions,
                  innerSpacing: sizes('Inner space', {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                  }),
                },
              },
              [
                Box(
                  {
                    label: 'Main Items',
                    options: {
                      ...boxOptions,
                      innerSpacing: sizes('Inner space', {
                        value: ['0rem', '0rem', '0rem', '0rem'],
                      }),
                      alignment: buttongroup(
                        'Alignment',
                        [
                          ['None', 'none'],
                          ['Left', 'flex-start'],
                          ['Center', 'center'],
                          ['Right', 'flex-end'],
                          ['Justified', 'space-between'],
                        ],
                        {
                          value: 'flex-start',
                          configuration: {
                            dataType: 'string',
                          },
                        },
                      ),
                      valignment: buttongroup(
                        'Vertical alignment',
                        [
                          ['None', 'none'],
                          ['Top', 'flex-start'],
                          ['Center', 'center'],
                          ['Bottom', 'flex-end'],
                        ],
                        {
                          value: 'center',
                          configuration: {
                            dataType: 'string',
                          },
                        },
                      ),
                      width: size('Width', {
                        value: '100%',
                        configuration: {
                          as: 'UNIT',
                        },
                      }),
                      backgroundColor: color('Background color', {
                        value: ThemeColor.BLACK,
                      }),
                      backgroundColorAlpha: option('NUMBER', {
                        label: 'Background color opacity',
                        value: 20,
                      }),
                    },
                  },
                  [
                    Box(
                      {
                        label: 'Number',
                        options: {
                          ...boxOptions,
                          innerSpacing: sizes('Inner space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                        },
                      },
                      [
                        Text({
                          options: {
                            ...textOptions,
                            outerSpacing: sizes('Outer space', {
                              value: ['M', 'M', 'M', 'M'],
                            }),
                            textColor: color('Text color', {
                              value: ThemeColor.WHITE,
                            }),
                            content: variable('Content', {
                              value: ['1'],
                              configuration: { as: 'MULTILINE' },
                            }),
                            type: font('Font', { value: ['Body2'] }),
                          },
                        }),
                      ],
                    ),
                    Box(
                      {
                        label: 'Item text',
                        options: {
                          ...boxOptions,
                          stretch: toggle('Stretch (when in flex container)', {
                            value: true,
                          }),
                          innerSpacing: sizes('Inner space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                        },
                      },
                      [
                        Button({
                          options: {
                            ...buttonOptions,
                            buttonText: variable('Button text', {
                              value: ['Client info'],
                            }),
                          },
                          style: {
                            overwrite: {
                              backgroundColor: {
                                type: 'STATIC',
                                value: 'transparent',
                              },
                              boxShadow: 'none',
                              color: {
                                type: 'THEME_COLOR',
                                value: 'accent2',
                              },
                              fontFamily: 'Roboto',
                              fontSize: '0.875rem',
                              fontStyle: 'none',
                              fontWeight: '400',
                              padding: ['0.6875rem', '0.6875rem'],
                              textDecoration: 'none',
                              textTransform: 'none',
                            },
                          },
                        }),
                      ],
                    ),
                    Box(
                      {
                        label: 'Collapse',
                        options: {
                          ...boxOptions,
                          innerSpacing: sizes('Inner space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                        },
                      },
                      [
                        Button({
                          label: 'Close',
                          options: {
                            ...buttonOptions,
                            buttonText: variable('Button text', {
                              value: [''],
                            }),
                            icon: icon('Icon', { value: 'KeyboardArrowUp' }),
                            outerSpacing: sizes('Outer space', {
                              value: ['M', 'M', 'M', 'M'],
                            }),
                          },
                        }),
                        Button({
                          label: 'Open',
                          options: {
                            ...buttonOptions,
                            buttonText: variable('Button text', {
                              value: [''],
                            }),
                            icon: icon('Icon', { value: 'KeyboardArrowDown' }),
                            outerSpacing: sizes('Outer space', {
                              value: ['M', 'M', 'M', 'M'],
                            }),
                          },
                        }),
                      ],
                    ),
                  ],
                ),

                Grid(
                  {
                    label: 'Sub Items',
                    options: {
                      ...gridOptions,
                      type: option('CUSTOM', {
                        label: 'Type',
                        value: 'item',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Container', value: 'container' },
                            { name: 'Item', value: 'item' },
                          ],
                        },
                      }),
                      wrap: option('CUSTOM', {
                        value: 'nowrap',
                        label: 'Wrap',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'No wrap', value: 'nowrap' },
                            { name: 'Wrap', value: 'wrap' },
                            { name: 'Wrap reverse', value: 'wrap-reverse' },
                          ],
                        },
                      }),
                    },
                  },
                  [
                    Box(
                      {
                        label: 'Sub item',
                        options: {
                          ...boxOptions,
                          alignment: buttongroup(
                            'Alignment',
                            [
                              ['None', 'none'],
                              ['Left', 'flex-start'],
                              ['Center', 'center'],
                              ['Right', 'flex-end'],
                              ['Justified', 'space-between'],
                            ],
                            {
                              value: 'flex-start',
                              configuration: {
                                dataType: 'string',
                              },
                            },
                          ),
                          valignment: buttongroup(
                            'Vertical alignment',
                            [
                              ['None', 'none'],
                              ['Top', 'flex-start'],
                              ['Center', 'center'],
                              ['Bottom', 'flex-end'],
                            ],
                            {
                              value: 'center',
                              configuration: {
                                dataType: 'string',
                              },
                            },
                          ),
                          width: size('Width', {
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                          innerSpacing: sizes('Inner space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                          backgroundColorAlpha: option('NUMBER', {
                            label: 'Background color opacity',
                            value: 10,
                          }),
                        },
                      },
                      [
                        Box(
                          {
                            label: 'Barframe',
                            options: {
                              ...boxOptions,
                              innerSpacing: sizes('Inner space', {
                                value: ['0rem', '0rem', '0rem', 'M'],
                              }),
                              width: size('Width', {
                                value: '40px',
                                configuration: {
                                  as: 'UNIT',
                                },
                              }),
                            },
                          },
                          [
                            Box(
                              {
                                label: 'Bar',
                                options: {
                                  ...boxOptions,
                                  innerSpacing: sizes('Inner space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                  width: size('Width', {
                                    value: '2px',
                                    configuration: {
                                      as: 'UNIT',
                                    },
                                  }),
                                  height: size('Height', {
                                    value: '40px',
                                    configuration: {
                                      as: 'UNIT',
                                    },
                                  }),
                                  backgroundColor: color('Background color', {
                                    value: ThemeColor.WHITE,
                                  }),
                                },
                              },
                              [],
                            ),
                          ],
                        ),
                        Box(
                          {
                            label: 'Item text',
                            options: {
                              ...boxOptions,
                              innerSpacing: sizes('Inner space', {
                                value: ['0rem', '0rem', '0rem', '0rem'],
                              }),
                              stretch: toggle(
                                'Stretch (when in flex container)',
                                {
                                  value: true,
                                },
                              ),
                            },
                          },
                          [Button({})],
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ],
    ),

    Box(
      {
        options: {
          ...boxOptions,
          innerSpacing: sizes('Inner space', {
            value: ['0rem', '0rem', '0rem', '0rem'],
          }),
          alignment: buttongroup(
            'Alignment',
            [
              ['None', 'none'],
              ['Left', 'flex-start'],
              ['Center', 'center'],
              ['Right', 'flex-end'],
              ['Justified', 'space-between'],
            ],
            {
              value: 'flex-end',
              configuration: {
                dataType: 'string',
              },
            },
          ),
          right: size('Right position', {
            value: '0px',
            configuration: {
              as: 'UNIT',
            },
          }),
          bottom: size('Bottom position', {
            value: '0px',
            configuration: {
              as: 'UNIT',
            },
          }),
          left: size('Left position', {
            value: '0px',
            configuration: {
              as: 'UNIT',
            },
          }),
          backgroundColor: color('Background color', {
            value: ThemeColor.PRIMARY,
          }),
        },
      },
      [
        Button(
          {
            options: {
              ...buttonOptions,
              outerSpacing: sizes('Outer space', {
                value: ['M', 'M', 'L', 'M'],
              }),
              icon: icon('Icon', { value: 'ArrowBackIos' }),
              buttonText: variable('Button text', { value: [''] }),
            },
          },
          [],
        ),
      ],
    ),
  ],
);

const drawerContainer = DrawerContainer({}, []);

const prefabStructure = [
  Drawer(
    {
      options: {
        ...drawerOptions,
        drawerWidth: size('Drawer Width', {
          value: '236px',
          configuration: {
            as: 'UNIT',
          },
        }),
      },
    },
    [drawerSidebar, drawerContainer],
  ),
];

export default prefab('Backoffice v2', attributes, undefined, prefabStructure);
