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
  PrefabComponentOption,
  PrefabComponent,
  PrefabReference,
  BeforeCreateArgs,
  component,
  text,
  InteractionType,
  PrefabInteraction,
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
  Grid,
  gridOptions,
  mediaOptions,
  Paper,
  Row,
  rowOptions,
  Text,
  textOptions,
  FormErrorAlert,
  Divider,
} from './structures';
import { ModelProps, ModelQuery, IdPropertyProps, Properties } from './types';
import { options as defaults } from './structures/ActionJSForm/options';

const interactions: PrefabInteraction[] = [
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#updateRecord',
      sourceComponentId: '#editFormButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#dataContainer',
      sourceComponentId: '#refreshButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#backofficeDetailview',
      sourceComponentId: '#editFormButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#backofficeDetailview',
      sourceComponentId: '#cancelTopButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#updateRecord',
      sourceComponentId: '#cancelTopButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#backofficeDetailview',
      sourceComponentId: '#cancelBottomButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#updateRecord',
      sourceComponentId: '#cancelBottomButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#backofficeDetailview',
      sourceComponentId: '#backToOverview',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#updateRecord',
      sourceComponentId: '#backToOverview',
    },
    type: InteractionType.Custom,
  },
];

const attributes = {
  category: 'FORMV2',
  icon: Icon.UpdateFormIcon,
  type: 'page',
  description: 'Discription',
  detail: 'detail',
  previewUrl: 'https://preview.betty.app/back-office',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Back_Office.jpg',
  interactions,
};

const drawerSidebar = DrawerBar(
  {
    ref: { id: '#drawerSidebar' },
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
                ref: { id: '#MediaImage' },

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
                                value: 'white',
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
          innerSpacing: sizes('Inner space', {
            value: ['0rem', '0rem', '0rem', '0rem'],
          }),
          backgroundColor: color('Background color', {
            value: ThemeColor.PRIMARY,
          }),
        },
      },
      [
        Button(
          {
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
                padding: ['0.6875rem', '0.6875rem'],
                textDecoration: 'none',
                textTransform: 'none',
              },
            },
            ref: { id: '#closeButton' },
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
                                name: 'text',
                                overwrite: {
                                  color: {
                                    type: 'THEME_COLOR',
                                    value: 'primary',
                                  },
                                  backgroundColor: {
                                    type: 'STATIC',
                                    value: 'transparent',
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
                              ref: { id: '#refreshButton' },
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
                                name: 'outline',
                                overwrite: {
                                  backgroundColor: {
                                    type: 'STATIC',
                                    value: 'transparent',
                                  },

                                  boxShadow: 'none',
                                  color: {
                                    type: 'THEME_COLOR',
                                    value: 'primary',
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
                              ref: { id: '#editFormButton' },
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
                                name: 'filled',
                                overwrite: {
                                  backgroundColor: {
                                    type: 'THEME_COLOR',
                                    value: 'primary',
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
                                name: 'filled',
                                overwrite: {
                                  backgroundColor: {
                                    type: 'THEME_COLOR',
                                    value: 'danger',
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
                                  padding: ['0.6875rem', '0.6875rem'],
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
  helpers: {
    prepareAction,
    createUuid,
    PropertyKind,
    makeBettyInput,
    BettyPrefabs,
  },
}: BeforeCreateArgs) => {
  const { useModelQuery, cloneStructure, setOption } = helpers;
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState<ModelProps>();
  const [properties] = React.useState<Properties[]>([]);
  const [modelValidation, setModelValidation] = React.useState(false);
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });

  const updateFormId = createUuid();

  useModelQuery({
    variables: { id: modelId },
    onCompleted: ({ model: dataModel }: ModelQuery) => {
      setModel(dataModel);
      setIdProperty(dataModel.properties.find(({ name }) => name === 'id'));
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
        onSave={async () => {
          const newPrefab = { ...prefab };
          if (!modelId) {
            setModelValidation(true);
            return;
          }

          const detailContainer = treeSearch(
            '#dataContainer',
            newPrefab.structure,
          );

          if (!detailContainer) throw new Error('No Datacontainer found');

          setOption(detailContainer, 'model', (opt: PrefabComponentOption) => ({
            ...opt,
            value: modelId,
            configuration: {
              disabled: true,
            },
          }));

          const enrichVarObj = (obj: any) => {
            const returnObject = {
              id: [obj.id],
              kind: obj.kind,
              label: obj.label,
              name: '',
              type: 'PROPERTY',
            };
            if (data && data.model) {
              const property = data.model.properties.find(
                (prop: any) => prop.id === returnObject.id[0],
              );
              if (property) {
                returnObject.name = `{{ ${data.model.name}.${property.name} }}`;
              }
            }
            return returnObject;
          };

          const makeDetail = (prop: any) => {
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
                value: [`${[prop.label]}:`],
              }));
              setOption(Text1, 'type', (opt: PrefabComponentOption) => ({
                ...opt,
                value: ['Body1'],
              }));
              setOption(Text1, 'fontWeight', (opt: PrefabComponentOption) => ({
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
              }));
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
              setOption(Text2, 'content', (opt: any) => ({
                ...opt,
                value: [enrichVarObj({ ...prop })],
                configuration: { as: 'MULTILINE' },
              }));
              setOption(Text2, 'type', (opt: PrefabComponentOption) => ({
                ...opt,
                value: ['Body1'],
              }));
            }

            if (
              RowColumnColumn.type !== 'COMPONENT' ||
              RowColumnColumn.descendants[0].type !== 'COMPONENT' ||
              RowColumnColumn.descendants[1].type !== 'COMPONENT'
            ) {
              throw new Error('Test');
            }
            RowColumnColumn.descendants[0].descendants = [Text1];
            RowColumnColumn.descendants[1].descendants = [Text2];
            return RowColumnColumn;
          };

          const filteredproperties = properties.filter(
            (prop: Properties) =>
              prop.label !== 'Created at' &&
              prop.label !== 'Updated at' &&
              prop.label !== 'Id',
          );

          if (idProperty && model) {
            const updateForm = treeSearch('#createForm', newPrefab.structure);
            if (!updateForm) throw new Error('No create form found');
            updateForm.id = updateFormId;

            const result = await prepareAction(
              updateFormId,
              idProperty,
              filteredproperties,
              'update',
            );

            const formInputStructure = (
              textValue: string,
              BetaInputField: PrefabReference,
            ): PrefabReference => {
              const rowColumnStructure = cloneStructure('2 Columns');
              const textStructure = cloneStructure('Text');

              const capitalizeFirstLetter = (string: string) => {
                return string.charAt(0).toUpperCase() + string.slice(1);
              };

              if (textStructure.type !== 'COMPONENT')
                throw new Error(
                  `The Text component type is not a COMPONENT, but a ${textStructure.type}`,
                );
              setOption(
                textStructure,
                'content',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: [capitalizeFirstLetter(textValue)],
                }),
              );

              if (rowColumnStructure.type !== 'COMPONENT')
                throw new Error(
                  `The Row component type is not a COMPONENT, but a ${rowColumnStructure.type}`,
                );
              if (rowColumnStructure.descendants[0].type !== 'COMPONENT')
                throw new Error(
                  `there was an error with the Column component. Its type is not a COMPONENT, but a ${rowColumnStructure.descendants[0].type}`,
                );
              if (rowColumnStructure.descendants[1].type !== 'COMPONENT')
                throw new Error(
                  `there was an error with the Column component. Its type is not a COMPONENT, but a ${rowColumnStructure.descendants[0].type}`,
                );

              setOption(
                rowColumnStructure,
                'maxRowWidth',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: 'Full',
                }),
              );
              // #region first column
              setOption(
                rowColumnStructure.descendants[0],
                'columnWidth',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: '3',
                }),
              );
              setOption(
                rowColumnStructure.descendants[0],
                'columnWidthTabletLandscape',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: '3',
                }),
              );
              setOption(
                rowColumnStructure.descendants[0],
                'columnWidthTabletPortrait',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: '12',
                }),
              );
              setOption(
                rowColumnStructure.descendants[0],
                'columnWidthMobile',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: '12',
                }),
              );
              setOption(
                rowColumnStructure.descendants[0],
                'verticalAlignment',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: 'center',
                }),
              );
              setOption(
                rowColumnStructure.descendants[0],
                'innerSpacing',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: ['0rem', 'M', '0rem', 'M'],
                }),
              );
              // #endregion
              // #region second column
              setOption(
                rowColumnStructure.descendants[1],
                'columnWidth',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: '9',
                }),
              );
              setOption(
                rowColumnStructure.descendants[1],
                'columnWidthTabletLandscape',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: '9',
                }),
              );
              setOption(
                rowColumnStructure.descendants[1],
                'columnWidthTabletPortrait',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: '12',
                }),
              );
              setOption(
                rowColumnStructure.descendants[1],
                'columnWidthMobile',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: '12',
                }),
              );
              setOption(
                rowColumnStructure.descendants[1],
                'innerSpacing',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: ['S', 'M', 'S', 'M'],
                }),
              );
              // #endregion

              if (BetaInputField.type !== 'COMPONENT')
                throw new Error(
                  `The BetaInputField component type is not a COMPONENT, but a ${BetaInputField.type}`,
                );
              setOption(
                BetaInputField,
                'margin',
                (options: PrefabComponentOption) => ({
                  ...options,
                  value: 'none',
                }),
              );
              setOption(
                BetaInputField,
                'hideLabel',
                (opts: PrefabComponentOption) => ({
                  ...opts,
                  value: true,
                }),
              );
              const returnStructure = rowColumnStructure;
              if (
                returnStructure.descendants[0].type === 'COMPONENT' &&
                returnStructure.descendants[1].type === 'COMPONENT'
              ) {
                returnStructure.descendants[0].descendants.push(textStructure);
                returnStructure.descendants[1].descendants.push(BetaInputField);
              }
              return returnStructure;
            };

            Object.values(result.variables).forEach(
              ([prop, inputVariable]): void => {
                const generateInputPrefabs = () => {
                  switch (prop.kind) {
                    case PropertyKind.INTEGER:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.INTEGER,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.EMAIL_ADDRESS:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.EMAIL_ADDRESS,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.DECIMAL:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.DECIMAL,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.TEXT:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.TEXT,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.PRICE:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.PRICE,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.PASSWORD:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.PASSWORD,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.DATE:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.DATE,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.DATE_TIME:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.DATE_TIME,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.TIME:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.TIME,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.FILE:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.FILE,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.BOOLEAN:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.BOOLEAN,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.LIST:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.LIST,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    default:
                      return formInputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.STRING,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                  }
                };
                const updateFormInputs = generateInputPrefabs();

                const updateFormFooter = updateForm.descendants.pop();
                updateForm.descendants.push(updateFormInputs);
                if (updateFormFooter)
                  updateForm.descendants.push(updateFormInputs);
              },
            );
            setOption(updateForm, 'actionId', (opt: PrefabComponentOption) => ({
              ...opt,
              value: result.action.actionId,
              configuration: { disabled: true },
            }));
            setOption(updateForm, 'model', (opt: PrefabComponentOption) => ({
              ...opt,
              value: modelId,
              configuration: {
                disabled: true,
              },
            }));
          }

          model?.properties.forEach((property) => {
            if (detailContainer)
              detailContainer.descendants.push(makeDetail(property));
          });

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
        rowHeight: text('Height', {
          value: '100vh',
          configuration: {
            as: 'UNIT',
          },
        }),
      },
    },
    [
      Column(
        {
          ref: { id: '#backofficeDetailview' },
          label: 'Backoffice  detailview',
          options: {
            ...columnOptions,
            innerSpacing: sizes('Inner space', {
              value: ['0rem', '0rem', '0rem', '0rem'],
            }),
          },
        },
        [
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
        ],
      ),
      Column(
        {
          label: 'Update record',
          ref: { id: '#updateRecord' },
          options: {
            ...columnOptions,
            visible: toggle('Toggle visibility', {
              value: false,
              configuration: {
                as: 'VISIBILITY',
              },
            }),
            columnWidth: option('CUSTOM', {
              label: 'Column width',
              value: '12',
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
              value: '12',
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
            columnHeight: text('Height', {
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
          Grid(
            {
              options: {
                ...gridOptions,
                direction: option('CUSTOM', {
                  value: 'row',
                  label: 'Direction',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Horizontal', value: 'row' },
                      { name: 'Vertical', value: 'column' },
                    ],
                    condition: showIf('type', 'EQ', 'container'),
                  },
                }),
                height: size('Height', {
                  value: '100%',
                  configuration: {
                    as: 'UNIT',
                  },
                }),
              },
            },
            [
              Grid(
                {
                  options: {
                    ...gridOptions,
                    direction: option('CUSTOM', {
                      value: 'column',
                      label: 'Direction',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Horizontal', value: 'row' },
                          { name: 'Vertical', value: 'column' },
                        ],
                        condition: showIf('type', 'EQ', 'container'),
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
                            value: 'sticky',
                            configuration: {
                              dataType: 'string',
                            },
                          },
                        ),
                        top: size('Top position', {
                          value: '0px',
                          configuration: {
                            as: 'UNIT',
                          },
                        }),
                        right: size('Right position', {
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
                          value: ThemeColor.WHITE,
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
                            height: size('Height', {
                              value: '4px',
                              configuration: {
                                as: 'UNIT',
                              },
                            }),
                            backgroundColor: color('Background color', {
                              value: ThemeColor.PRIMARY,
                            }),
                          },
                        },
                        [],
                      ),
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
                                value: 'space-between',
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
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                              },
                            },
                            [
                              Button(
                                {
                                  ref: {
                                    id: '#backToOverview',
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
                                        value: 'primary',
                                      },
                                      fontFamily: 'Roboto',
                                      fontSize: '0.875rem',
                                      fontStyle: 'none',
                                      fontWeight: '400',
                                      padding: ['0.3125rem', '0rem'],
                                      textDecoration: 'none',
                                      textTransform: 'none',
                                    },
                                  },
                                  options: {
                                    ...buttonOptions,
                                    buttonText: variable('Button text', {
                                      value: ['Back to overview'],
                                    }),
                                    icon: icon('Icon', {
                                      value: 'ChevronLeft',
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
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                              },
                            },
                            [
                              Button(
                                {
                                  ref: { id: '#cancelTopButton' },
                                  style: {
                                    overwrite: {
                                      backgroundColor: {
                                        type: 'STATIC',
                                        value: 'transparent',
                                      },
                                      borderColor: {
                                        type: 'THEME_COLOR',
                                        value: 'primary',
                                      },
                                      borderRadius: ['0.25rem'],
                                      borderStyle: 'solid',
                                      borderWidth: ['0.0625rem'],
                                      boxShadow: 'none',
                                      color: {
                                        type: 'THEME_COLOR',
                                        value: 'primary',
                                      },
                                      fontFamily: 'Roboto',
                                      fontSize: '0.875rem',
                                      fontStyle: 'none',
                                      fontWeight: '400',
                                      padding: ['0.625rem', '1.3125rem'],
                                      textDecoration: 'none',
                                      textTransform: 'none',
                                    },
                                  },
                                  options: {
                                    ...buttonOptions,
                                    buttonText: variable('Button text', {
                                      value: ['Cancel'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              Button(
                                {
                                  ref: { id: '#saveTopButton' },
                                  style: {
                                    overwrite: {
                                      boxShadow: 'none',
                                      color: {
                                        type: 'THEME_COLOR',
                                        value: 'white',
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
                                  options: {
                                    ...buttonOptions,
                                    buttonText: variable('Button text', {
                                      value: ['Save and update'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', '0rem', '0rem', 'M'],
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
                      options: {
                        ...boxOptions,
                        stretch: toggle('Stretch (when in flex container)', {
                          value: true,
                        }),
                        backgroundColor: color('Background color', {
                          value: ThemeColor.WHITE,
                        }),
                      },
                    },
                    [
                      Row({}, [
                        Column({}, [
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
                                          value: ['Create client record'],
                                          configuration: { as: 'MULTILINE' },
                                        }),
                                        type: font('Font', {
                                          value: ['Title4'],
                                        }),
                                        outerSpacing: sizes('Outer space', {
                                          value: ['0rem', '0rem', 'M', '0rem'],
                                        }),
                                        textColor: color('Text color', {
                                          value: ThemeColor.PRIMARY,
                                        }),
                                        fontWeight: option('CUSTOM', {
                                          label: 'Font weight',
                                          value: '300',
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
                                  FormErrorAlert({
                                    ref: {
                                      id: '#createAlertErrorId',
                                    },
                                  }),
                                ],
                              ),
                            ],
                          ),
                          component(
                            'Form',
                            {
                              label: 'Create Form',
                              options: defaults,
                              ref: { id: '#createForm' },
                            },
                            [
                              Box({}, [
                                Divider({}),
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
                                    Button(
                                      {
                                        ref: { id: '#cancelBottomButton' },
                                        style: {
                                          overwrite: {
                                            backgroundColor: {
                                              type: 'STATIC',
                                              value: 'transparent',
                                            },
                                            borderColor: {
                                              type: 'THEME_COLOR',
                                              value: 'primary',
                                            },
                                            borderRadius: ['0.25rem'],
                                            borderStyle: 'solid',
                                            borderWidth: ['0.0625rem'],
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'primary',
                                            },
                                            fontFamily: 'Roboto',
                                            fontSize: '0.875rem',
                                            fontStyle: 'none',
                                            fontWeight: '400',
                                            padding: ['0.625rem', '1.3125rem'],
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                          },
                                        },
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Cancel'],
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    Button(
                                      {
                                        ref: { id: '#saveBottomButton' },
                                        style: {
                                          overwrite: {
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'white',
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
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Save and update'],
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                              ]),
                            ],
                          ),
                        ]),
                      ]),
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
