import * as React from 'react';

import {
  prefab as makePrefab,
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
  hideIf,
  PrefabComponentOption,
  PrefabComponent,
  PrefabReference,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';

import {
  Box,
  boxOptions,
  BreadcrumbItem,
  breadcrumbItemOptions,
  Breadcrumbs,
  breadcrumbsOptions,
  Button,
  buttonOptions,
  Column,
  columnOptions,
  DataContainer,
  Dialog,
  Drawer,
  DrawerBar,
  drawerBarOptions,
  DrawerContainer,
  drawerContainerOptions,
  drawerOptions,
  Media,
  mediaOptions,
  Paper,
  Row,
  rowOptions,
  Text,
  textOptions,
} from './structures';
import { ModelProps, ModelQuery } from './types';

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
                        value: ['S', 'S', 'S', 'S'],
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
                        label: 'Icon',
                        options: {
                          ...boxOptions,
                          innerSpacing: sizes('Inner space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                        },
                      },
                      [
                        Button(
                          {
                            options: {
                              ...buttonOptions,
                              buttonText: variable('Button text', {
                                value: [''],
                              }),
                              icon: icon('Icon', { value: 'List' }),
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
                                  condition: hideIf('icon', 'EQ', 'None'),
                                },
                              }),
                              outerSpacing: sizes('Outer space', {
                                value: ['M', 'M', 'M', 'M'],
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
                        }),
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
  ],
);

const drawerContainer = DrawerContainer(
  {
    options: {
      ...drawerContainerOptions,

      innerSpacing: sizes('Inner space', {
        value: ['0rem', '0rem', '0rem', '0rem'],
      }),

      themeBgColor: color('Theme background color', {
        value: ThemeColor.WHITE,
      }),
    },
  },
  [
    Box(
      {
        label: 'Box1',
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
          innerSpacing: sizes('Inner space', {
            value: ['0rem', '0rem', '0rem', '0rem'],
          }),
        },
      },
      [
        Box(
          {
            label: 'Box3',
            options: {
              ...boxOptions,
              stretch: toggle('Stretch (when in flex container)', {
                value: true,
              }),
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
              height: size('Height', {
                value: '100vh',
                configuration: {
                  as: 'UNIT',
                },
              }),
              backgroundColor: color('Background color', {
                value: ThemeColor.LIGHT,
              }),
              backgroundColorAlpha: option('NUMBER', {
                label: 'Background color opacity',
                value: 20,
              }),
            },
          },
          [
            Box({ label: 'Box4' }, [
              Box(
                {
                  label: 'Box5',
                  options: {
                    ...boxOptions,
                    outerSpacing: sizes('Outer space', {
                      value: ['M', 'M', 'M', '0rem'],
                    }),
                    innerSpacing: sizes('Inner space', {
                      value: ['0rem', '0rem', '0rem', '0rem'],
                    }),
                  },
                },
                [
                  Box(
                    {
                      label: 'Box6',
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
                            value: 'space-between',
                            configuration: {
                              dataType: 'string',
                            },
                          },
                        ),
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                      },
                    },
                    [
                      Box(
                        {
                          label: 'Box7',
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              value: ['M', 'M', 'M', 'M'],
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
                          },
                        },
                        [
                          Button(
                            {
                              options: {
                                ...buttonOptions,
                                buttonText: variable('Button text', {
                                  value: [''],
                                }),
                                icon: icon('Icon', { value: 'ArrowBackIos' }),
                                outerSpacing: sizes('Outer space', {
                                  value: ['0rem', 'M', '0rem', '0rem'],
                                }),
                              },
                              style: {
                                overwrite: {
                                  color: {
                                    type: 'THEME_COLOR',
                                    value: 'primary',
                                  },
                                },
                              },
                            },
                            [],
                          ),
                          Text(
                            {
                              options: {
                                ...textOptions,
                                content: variable('Content', {
                                  value: ['Details'],
                                  configuration: { as: 'MULTILINE' },
                                }),
                                outerSpacing: sizes('Outer space', {
                                  value: ['0rem', 'L', '0rem', '0rem'],
                                }),
                                textColor: color('Text color', {
                                  value: ThemeColor.PRIMARY,
                                }),
                                type: font('Font', { value: ['Title5'] }),
                              },
                            },
                            [],
                          ),
                        ],
                      ),
                      Box(
                        {
                          label: 'Box8',
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
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                            }),
                          },
                        },
                        [
                          Button(
                            {
                              options: {
                                ...buttonOptions,
                                buttonText: variable('Button text', {
                                  value: ['Refresh'],
                                }),
                                icon: icon('Icon', { value: 'Refresh' }),
                                outerSpacing: sizes('Outer space', {
                                  value: ['0rem', 'L', '0rem', '0rem'],
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
                                    value: 'white',
                                  },
                                  fontFamily: 'Roboto',
                                  fontSize: '0.875rem',
                                  fontStyle: 'none',
                                  fontWeight: '400',
                                  padding: ['0.6875rem', '0.6875rem'], // 1 zo'n dingetje is 0.0625rem
                                  textDecoration: 'none',
                                  textTransform: 'none',
                                },
                              },
                            },
                            [],
                          ),
                          Button(
                            {
                              options: {
                                ...buttonOptions,
                                buttonText: variable('Button text', {
                                  value: ['Edit'],
                                }),
                                icon: icon('Icon', { value: 'Edit' }),
                                outerSpacing: sizes('Outer space', {
                                  value: ['0rem', 'L', '0rem', '0rem'],
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
                                    value: 'white',
                                  },
                                  fontFamily: 'Roboto',
                                  fontSize: '0.875rem',
                                  fontStyle: 'none',
                                  fontWeight: '400',
                                  padding: ['0.6875rem', '0.6875rem'], // 1 zo'n dingetje is 0.0625rem
                                  textDecoration: 'none',
                                  textTransform: 'none',
                                },
                              },
                            },
                            [],
                          ),
                          Button(
                            {
                              options: {
                                ...buttonOptions,
                                buttonText: variable('Button text', {
                                  value: ['Delete'],
                                }),
                                icon: icon('Icon', { value: 'Delete' }),
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
                                    value: 'white',
                                  },
                                  fontFamily: 'Roboto',
                                  fontSize: '0.875rem',
                                  fontStyle: 'none',
                                  fontWeight: '400',
                                  padding: ['0.6875rem', '0.6875rem'], // 1 zo'n dingetje is 0.0625rem
                                  textDecoration: 'none',
                                  textTransform: 'none',
                                },
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
              Box(
                {
                  label: 'Box9',
                  options: {
                    ...boxOptions,
                    outerSpacing: sizes('Outer space', {
                      value: ['M', 'M', 'M', '0rem'],
                    }),
                    innerSpacing: sizes('Inner space', {
                      value: ['0rem', '0rem', '0rem', '0rem'],
                    }),
                  },
                },
                [
                  Box(
                    {
                      label: 'Box10',
                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                      },
                    },
                    [
                      Breadcrumbs(
                        {
                          options: {
                            ...breadcrumbsOptions,
                            separatorType: option('CUSTOM', {
                              label: 'Separator Type',
                              value: 'icon',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Text', value: 'text' },
                                  { name: 'Icon', value: 'icon' },
                                ],
                              },
                            }),
                          },
                        },
                        [
                          BreadcrumbItem(
                            {
                              options: {
                                ...breadcrumbItemOptions,
                                breadcrumbContent: variable('Content', {
                                  value: ['Clients'],
                                }),
                                textColor: color('Text Color', {
                                  value: ThemeColor.MEDIUM,
                                }),
                              },
                            },
                            [],
                          ),
                          BreadcrumbItem(
                            {
                              options: {
                                ...breadcrumbItemOptions,
                                breadcrumbContent: variable('Content', {
                                  value: ['details'],
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
              Box(
                {
                  label: 'Box11',
                  options: {
                    ...boxOptions,
                    innerSpacing: sizes('Inner space', {
                      value: ['0rem', '0rem', '0rem', '0rem'],
                    }),
                    outerSpacing: sizes('Outer space', {
                      value: ['0rem', 'S', '0rem', '0rem'],
                    }),
                  },
                },
                [
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
                              label: 'Column width',
                              value: '8',
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
                              value: '8',
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
                              value: '12',
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
                              value: '12',
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
                          },
                        },
                        [
                          Box(
                            {
                              options: {
                                ...boxOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                                backgroundColor: color('Background color', {
                                  value: ThemeColor.WHITE,
                                }),
                                borderColor: color('Border color', {
                                  value: ThemeColor.LIGHT,
                                }),
                                borderWidth: size('Border thickness', {
                                  value: '1px',
                                  configuration: {
                                    as: 'UNIT',
                                  },
                                }),
                                borderRadius: size('Border radius', {
                                  value: '4px',
                                  configuration: {
                                    as: 'UNIT',
                                  },
                                }),
                              },
                            },
                            [
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
                                        innerSpacing: sizes('Inner space', {
                                          value: ['L', 'L', 'L', 'L'],
                                        }),
                                      },
                                    },
                                    [
                                      Text(
                                        {
                                          options: {
                                            ...textOptions,
                                            content: variable('Content', {
                                              value: ['Client'],
                                              configuration: {
                                                as: 'MULTILINE',
                                              },
                                            }),
                                            type: font('Font', {
                                              value: ['Title5'],
                                            }),
                                          },
                                        },
                                        [],
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              DataContainer(
                                { ref: { id: '#dataContainer' } },
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
              Dialog({ label: 'Dialog' }, [
                Paper({}, [
                  Row({}, [
                    Column({}, [
                      Box({}, [Text({}, []), Button({}, [])]),
                      Box({}, [Text({}, [])]),
                      Box({}, [Button({}, []), Button({}, [])]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ],
        ),
      ],
    ),
  ],
);

const beforeCreate = ({
  save,
  close,
  helpers,
  prefab,
  components: {
    Header,
    Content,
    ModelRelationSelector,
    Footer,
    Field,
    Box: BoxComp,
    Text: TextComp,
  },
}: BeforeCreateArgs) => {
  const { useModelQuery, cloneStructure, setOption } = helpers;
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState<ModelProps>();
  const [modelValidation, setModelValidation] = React.useState(false);
  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });

  useModelQuery({
    variables: { id: modelId },
    onCompleted: ({ model: dataModel }: ModelQuery) => {
      setModel(dataModel);
    },
  });

  function treeSearch(
    dirName: string,
    array: PrefabReference[],
  ): PrefabComponent | undefined {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < array.length; i++) {
      const q = array[i];
      if (q.type === 'COMPONENT') {
        if (q.ref && q.ref.id === dirName) {
          return q;
        }
      }
      if (q.type !== 'PARTIAL' && q.descendants && q.descendants.length) {
        const result = treeSearch(dirName, q.descendants);
        if (result) return result;
      }
    }
    return undefined;
  }

  return (
    <>
      <Header onClose={close} title="Configure header and footer" />
      <Content>
        <BoxComp pad={{ bottom: '15px' }}>
          <Field
            label="Model"
            error={
              modelValidation && (
                <TextComp color="#e82600">
                  Selecting a model is required
                </TextComp>
              )
            }
          >
            <ModelRelationSelector
              onChange={(value: string) => {
                setModelValidation(false);
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
        </BoxComp>
      </Content>
      <Footer
        onClick={close}
        onSave={() => {
          const newPrefab = { ...prefab };
          if (!modelId) {
            setModelValidation(true);
            return;
          }

          const detailContainer = treeSearch(
            '#dataContainer',
            newPrefab.structure,
          );

          const enrichVarObj = (obj: any) => {
            const returnObject = obj;
            if (data && data.model) {
              const property = data.model.properties.find(
                (prop: any) => prop.id === obj.id[0],
              );
              if (property) {
                returnObject.name = `{{ ${data.model.name}.${property.name} }}`;
              }
            }
            return returnObject;
          };

          const makeDetail = (prop: any) => {
            const mediaComponent = cloneStructure('Media');
            if (mediaComponent.type === 'COMPONENT') {
              setOption(
                mediaComponent,
                'imageSource',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: [{ ...prop }],
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Image', value: 'img' },
                      { name: 'Video', value: 'video' },
                      { name: 'I-frame', value: 'iframe' },
                    ],
                  },
                }),
              );
            }

            const detailComponent = cloneStructure('Box');
            if (detailComponent.type === 'COMPONENT') {
              setOption(
                detailComponent,
                'outerSpacing',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: ['0rem', '0rem', 'M', '0rem'],
                }),
              );
              setOption(
                detailComponent,
                'backgroundColor',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: 'Accent1',
                }),
              );
              setOption(
                detailComponent,
                'backgroundColorAlpha',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: '20',
                }),
              );

              const labelText = cloneStructure('Text');
              if (labelText.type === 'COMPONENT') {
                setOption(
                  labelText,
                  'content',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: [`${[prop.label]}:`],
                    configuration: { as: 'MULTILINE' },
                  }),
                );
                setOption(labelText, 'type', (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: 'Body1',
                }));
                setOption(
                  labelText,
                  'fontWeight',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
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
                );
              }
              const valueText = cloneStructure('Text');
              if (valueText.type === 'COMPONENT') {
                setOption(
                  valueText,
                  'content',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: [enrichVarObj({ ...prop })],
                    configuration: { as: 'MULTILINE' },
                  }),
                );
              }
              detailComponent.descendants = [labelText, valueText];
            }
            return prop.kind === 'IMAGE' ? mediaComponent : detailComponent;
          };

          const detailFactory = (name: string, prop: any) => {
            debugger;
            if (detailContainer && detailContainer.descendants) {
              const RowColumnColumn = cloneStructure('2 Columns');
              const Text1 = cloneStructure('Text');
              const Text2 = cloneStructure('Text');

              if (RowColumnColumn.type === 'COMPONENT') {
                setOption(
                  RowColumnColumn,
                  'maxRowWidth',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: 'Full',
                  }),
                );
              }
              if (
                RowColumnColumn.type === 'COMPONENT' &&
                RowColumnColumn.descendants[0].type === 'COMPONENT'
              ) {
                setOption(
                  RowColumnColumn.descendants[0],
                  'columnWidth',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: '4',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Fit content',
                          value: 'fitContent',
                        },
                        {
                          name: 'Flexible',
                          value: 'flexible',
                        },
                        {
                          name: 'Hidden',
                          value: 'hidden',
                        },
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
                );
                setOption(
                  RowColumnColumn.descendants[0],
                  'columnWidthTabletLandscape',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: '6',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Fit content',
                          value: 'fitContent',
                        },
                        {
                          name: 'Flexible',
                          value: 'flexible',
                        },
                        {
                          name: 'Hidden',
                          value: 'hidden',
                        },
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
                );
                setOption(
                  RowColumnColumn.descendants[0],
                  'columnWidthTabletPortrait',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: '12',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Fit content',
                          value: 'fitContent',
                        },
                        {
                          name: 'Flexible',
                          value: 'flexible',
                        },
                        {
                          name: 'Hidden',
                          value: 'hidden',
                        },
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
                );
                setOption(
                  RowColumnColumn.descendants[0],
                  'columnWidthMobile',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: '12',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Fit content',
                          value: 'fitContent',
                        },
                        {
                          name: 'Flexible',
                          value: 'flexible',
                        },
                        {
                          name: 'Hidden',
                          value: 'hidden',
                        },
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
                );
                setOption(
                  RowColumnColumn.descendants[0],
                  'innerSpacing',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: ['0rem', 'L', 'L', 'L'],
                  }),
                );
              }
              if (Text1.type === 'COMPONENT') {
                setOption(Text1, 'content', (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: [name],
                }));
                setOption(Text1, 'type', (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: ['Body2'],
                }));
                setOption(
                  Text1,
                  'fontWeight',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
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
                );
              }
              if (
                RowColumnColumn.type === 'COMPONENT' &&
                RowColumnColumn.descendants[1].type === 'COMPONENT'
              ) {
                setOption(
                  RowColumnColumn.descendants[1],
                  'columnWidth',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: '8',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Fit content',
                          value: 'fitContent',
                        },
                        {
                          name: 'Flexible',
                          value: 'flexible',
                        },
                        {
                          name: 'Hidden',
                          value: 'hidden',
                        },
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
                );
                setOption(
                  RowColumnColumn.descendants[1],
                  'columnWidthTabletLandscape',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: '6',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Fit content',
                          value: 'fitContent',
                        },
                        {
                          name: 'Flexible',
                          value: 'flexible',
                        },
                        {
                          name: 'Hidden',
                          value: 'hidden',
                        },
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
                );
                setOption(
                  RowColumnColumn.descendants[1],
                  'columnWidthTabletPortrait',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: '12',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Fit content',
                          value: 'fitContent',
                        },
                        {
                          name: 'Flexible',
                          value: 'flexible',
                        },
                        {
                          name: 'Hidden',
                          value: 'hidden',
                        },
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
                );
                setOption(
                  RowColumnColumn.descendants[1],
                  'columnWidthMobile',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: '12',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Fit content',
                          value: 'fitContent',
                        },
                        {
                          name: 'Flexible',
                          value: 'flexible',
                        },
                        {
                          name: 'Hidden',
                          value: 'hidden',
                        },
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
                );
                setOption(
                  RowColumnColumn.descendants[1],
                  'innerSpacing',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: ['0rem', 'L', 'L', 'L'],
                  }),
                );
              }
              if (Text2.type === 'COMPONENT') {
                setOption(Text2, 'content', (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: [{ ...prop }],
                  configuration: { as: 'MULTILINE' },
                }));
                setOption(Text2, 'type', (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: ['Body1'],
                }));
              }

              if (
                Text2.type === 'COMPONENT' &&
                Text1.type === 'COMPONENT' &&
                RowColumnColumn.type === 'COMPONENT' &&
                RowColumnColumn.descendants[0].type === 'COMPONENT' &&
                RowColumnColumn.descendants[1].type === 'COMPONENT'
              ) {
                RowColumnColumn.descendants[0].descendants = [Text1];
                RowColumnColumn.descendants[1].descendants = [Text2];

                detailContainer.descendants.push(RowColumnColumn);
              }
            }
          };
          // // console.log(model?.properties);
          const transformProperty = (prop) => {
            const outputProp = prop;
            delete outputProp.modelId;
            delete outputProp.name;
            delete outputProp.unique;
            // eslint-disable-next-line no-underscore-dangle
            outputProp.type = 'PROPERTY';
            // eslint-disable-next-line no-underscore-dangle
            delete outputProp.__typename;
            outputProp.defaultValue = null;

            return outputProp;
          };
          // console.log(model?.properties);
          model?.properties.forEach((property: any) => {
            console.log(transformProperty(property));
            if (detailContainer)
              detailContainer.descendants.push(
                makeDetail(transformProperty(property)),
              );
          });

          // console.log(model);

          save(newPrefab);
        }}
        onSkip={() => {
          const newPrefab = { ...prefab };
          save(newPrefab);
        }}
      />
    </>
  );
};

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

export default makePrefab(
  'Backoffice - Detail page',
  attributes,
  beforeCreate,
  prefabStructure,
);
