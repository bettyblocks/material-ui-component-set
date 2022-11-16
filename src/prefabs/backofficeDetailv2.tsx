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
  hideIf,
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
  dataContainerOptions,
} from './structures';
import { ModelProps, ModelQuery, IdPropertyProps } from './types';
import { options as defaults } from './structures/ActionJSForm/options';

const interactions: PrefabInteraction[] = [
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#deleteButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#closeBtn',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#cancelButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#deleteForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#dataContainer',
      sourceComponentId: '#deleteForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#deleteFormSubmitButton',
      sourceComponentId: '#deleteForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#deleteFormSubmitButton',
      sourceComponentId: '#deleteForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#deleteFormSubmitButton',
      sourceComponentId: '#deleteForm',
    },
    type: InteractionType.Custom,
  },
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
  {
    name: 'Submit',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#updateForm',
      sourceComponentId: '#saveBottomButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Submit',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#updateForm',
      sourceComponentId: '#saveTopButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#updateAlertErrorId',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#saveTopButton',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#saveTopButton',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#saveTopButton',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#saveBottomButton',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#saveBottomButton',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#saveBottomButton',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#backofficeDetailview',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#updateRecord',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#dataContainer',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#tinyDrawer',
      sourceComponentId: '#openDrawer',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#openDrawer',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#tinyDrawer',
      sourceComponentId: '#closeButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#closeButton',
    },
    type: InteractionType.Custom,
  },
];

const attributes = {
  category: 'FORMV2',
  icon: Icon.UpdateFormIcon,
  type: 'page',
  description:
    'This page contains a detail view and all you need to update a record.',
  detail:
    'In this ready to use back office detail view, it is possible to display (read) and update a record.',
  previewUrl: 'https://preview-dev.app/back-office-details',
  previewImage:
    'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/f1a4017ab78f41f38d1882f6b6cef37a',
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
        label: 'Logobox',
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
                label: 'Logo',
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
          [],
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
                label: 'Selected Item',
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
                      ref: { id: '#menuButton' },
                      options: {
                        ...buttonOptions,
                        buttonText: variable('Button text', {
                          value: ['Model info'],
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
                padding: ['0rem', '0rem'],
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
    DataContainer(
      {
        ref: { id: '#dataContainer' },
        options: {
          ...dataContainerOptions,
          loadingType: option('CUSTOM', {
            value: 'showChildren',
            label: 'Show on load',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Message', value: 'default' },
                { name: 'Content', value: 'showChildren' },
              ],
            },
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
                options: {
                  ...boxOptions,
                  innerSpacing: sizes('Inner space', {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                  }),
                },
              },
              [
                Grid(
                  {
                    label: 'Tiny Drawer',
                    ref: { id: '#tinyDrawer' },
                    options: {
                      ...gridOptions,
                      visibility: toggle('Toggle visibility', {
                        value: false,
                        configuration: {
                          as: 'VISIBILITY',
                        },
                      }),
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
                      height: size('Height', {
                        value: '100%',
                        configuration: {
                          as: 'UNIT',
                        },
                      }),
                      justify: option('CUSTOM', {
                        value: 'flex-end',
                        label: 'Justify',
                        configuration: {
                          as: 'DROPDOWN',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Start', value: 'flex-start' },
                            { name: 'Center', value: 'center' },
                            { name: 'End', value: 'flex-end' },
                            { name: 'Space between', value: 'space-between' },
                            { name: 'Space around', value: 'space-around' },
                            { name: 'Space evenly', value: 'space-evenly' },
                          ],
                          condition: showIf('type', 'EQ', 'container'),
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
                            padding: ['0rem', '0rem'],
                            textDecoration: 'none',
                            textTransform: 'none',
                          },
                        },
                        label: 'Open drawer',
                        ref: { id: '#openDrawer' },
                        options: {
                          ...buttonOptions,
                          buttonText: variable('Button text', { value: [] }),

                          outerSpacing: sizes('Outer space', {
                            value: ['M', 'M', 'L', 'M'],
                          }),
                          icon: icon('Icon', { value: 'ArrowForwardIos' }),
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
                Box({}, [
                  Box(
                    {
                      options: {
                        ...boxOptions,
                        outerSpacing: sizes('Outer space', {
                          value: ['M', 'M', '0rem', 'M'],
                        }),
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
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
                                    icon: icon('Icon', {
                                      value: 'ArrowBackIos',
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', 'M', '0rem', '0rem'],
                                    }),
                                  },
                                  style: {
                                    name: 'text',
                                    overwrite: {
                                      padding: '0rem',
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
                                      padding: ['0.6875rem', '0.6875rem'],
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
                                      padding: ['0.6875rem', '0.6875rem'],
                                      textDecoration: 'none',
                                      textTransform: 'none',
                                    },
                                  },
                                },
                                [],
                              ),
                              Button(
                                {
                                  ref: { id: '#deleteButton' },
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
                      options: {
                        ...boxOptions,
                        outerSpacing: sizes('Outer space', {
                          value: ['M', 'M', '0rem', 'M'],
                        }),
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
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
                                  ref: { id: '#breadcrumbTitle' },
                                  options: {
                                    ...breadcrumbItemOptions,
                                    breadcrumbContent: variable('Content', {
                                      value: ['Models'],
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
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
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
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
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
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
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
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
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
                                  ref: { id: '#detailsBox' },
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
                                              ref: { id: '#detailsTitle' },
                                              options: {
                                                ...textOptions,
                                                content: variable('Content', {
                                                  value: ['Model'],
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
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                  Dialog(
                    {
                      ref: {
                        id: '#deleteDialog',
                      },
                    },
                    [
                      Paper({}, [
                        Row({}, [
                          Column({}, [
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
                                },
                              },
                              [
                                Text(
                                  {
                                    options: {
                                      ...textOptions,
                                      content: variable('Content', {
                                        value: ['Delete record'],
                                        configuration: {
                                          as: 'MULTILINE',
                                        },
                                      }),
                                      type: font('Font', {
                                        value: ['Title4'],
                                      }),
                                    },
                                  },
                                  [],
                                ),
                                Button({
                                  style: {
                                    overwrite: {
                                      backgroundColor: {
                                        type: 'STATIC',
                                        value: 'transparent',
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
                                    icon: icon('Icon', {
                                      value: 'Close',
                                    }),
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
                                          {
                                            name: 'Small',
                                            value: 'small',
                                          },
                                          {
                                            name: 'Medium',
                                            value: 'medium',
                                          },
                                          {
                                            name: 'Large',
                                            value: 'large',
                                          },
                                        ],
                                        condition: hideIf('icon', 'EQ', 'none'),
                                      },
                                    }),
                                  },
                                  ref: {
                                    id: '#closeBtn',
                                  },
                                }),
                              ],
                            ),
                            Row({}, [
                              Column({}, [
                                Text(
                                  {
                                    options: {
                                      ...textOptions,
                                      content: variable('Content', {
                                        value: [
                                          "Are you sure you want to delete this record? You can't undo this action.",
                                        ],
                                        configuration: {
                                          as: 'MULTILINE',
                                        },
                                      }),
                                      type: font('Font', {
                                        value: ['Body1'],
                                      }),
                                    },
                                  },
                                  [],
                                ),
                              ]),
                            ]),
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
                                },
                              },
                              [
                                Button(
                                  {
                                    ref: {
                                      id: '#cancelButton',
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
                                  },
                                  [],
                                ),
                                component(
                                  'Form',
                                  {
                                    label: 'Delete Form',
                                    options: defaults,
                                    ref: {
                                      id: '#deleteForm',
                                    },
                                  },
                                  [],
                                ),
                              ],
                            ),
                          ]),
                        ]),
                      ]),
                    ],
                  ),
                ]),
              ],
            ),
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
    makeBettyUpdateInput,
    BettyPrefabs,
  },
}: BeforeCreateArgs) => {
  const { useModelQuery, cloneStructure, setOption } = helpers;
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState<ModelProps>();
  const [modelValidation, setModelValidation] = React.useState(false);
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  useModelQuery({
    variables: { id: modelId },
    onCompleted: ({ model: dataModel }: ModelQuery) => {
      setModel(dataModel);
      setIdProperty(dataModel.properties.find(({ name }) => name === 'id'));
    },
    skip: !modelId,
  });

  const updateFormId = createUuid();
  const deleteButtonId = createUuid();

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
      <Header onClose={close} title="Configure back office details" />
      <BoxComp
        justify="center"
        margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
      >
        <TextComp size="medium" weight="bold">
          Step: 2/2
        </TextComp>
      </BoxComp>
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

          const enrichFileObj = (obj: any) => {
            const returnObject = {
              // componentId: obj,
              id: obj.id,
              name: '',
              type: 'PROPERTY',
              useKey: 'url',
            };
            if (model) {
              const property = model.properties.find(
                (prop: any) => prop.id === returnObject.id[0],
              );
              if (property) {
                returnObject.name = `{{ ${model.name}.${property.name} }}`;
              }
            }
            return returnObject;
          };

          const enrichVarObj = (obj: any) => {
            const returnObject = {
              id: [obj.id],
              kind: obj.kind,
              label: obj.label,
              name: '',
              type: 'PROPERTY',
            };
            if (model) {
              const property = model.properties.find(
                (prop: any) => prop.id === returnObject.id[0],
              );
              if (property) {
                returnObject.name = `{{ ${model.name}.${property.name} }}`;
              }
            }
            return returnObject;
          };

          const makeDetail = (prop: any) => {
            const RowColumnColumn = cloneStructure('2 Columns');
            const Text1 = cloneStructure('Text');
            const Text2 = cloneStructure('Text');

            if (
              RowColumnColumn.type !== 'COMPONENT' ||
              RowColumnColumn.descendants[0].type !== 'COMPONENT' ||
              RowColumnColumn.descendants[1].type !== 'COMPONENT'
            ) {
              throw new Error('RowColumnColumn is not a component');
            }

            if (Text1.type !== 'COMPONENT')
              throw new Error('Text1 is not a component');

            if (Text2.type !== 'COMPONENT')
              throw new Error('Text2 is not a component');
            setOption(
              RowColumnColumn,
              'maxRowWidth',
              (opt: PrefabComponentOption) => ({
                ...opt,
                value: 'Full',
              }),
            );

            // set column 1 options
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

            // set column 2 options
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

            RowColumnColumn.descendants[0].descendants = [Text1];

            const hasFileConditional = cloneStructure('Conditional');
            if (hasFileConditional.type !== 'COMPONENT')
              throw new Error(
                `The Conditional component type is not a COMPONENT, but a ${hasFileConditional.type}`,
              );

            if (hasFileConditional.type === 'COMPONENT') {
              setOption(hasFileConditional, 'left', (originalOption: any) => ({
                ...originalOption,
                value: [enrichVarObj({ ...prop })],
              }));
              setOption(
                hasFileConditional,
                'compare',
                (originalOption: PrefabComponentOption) => ({
                  ...originalOption,
                  value: 'neq',
                }),
              );
            }

            if (prop.kind === 'FILE') {
              const fileButton = cloneStructure('Open Page');

              if (fileButton.type === 'COMPONENT') {
                fileButton.style = {
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
                    padding: ['0.6875rem', '1.375rem'],
                    textDecoration: 'none',
                    textTransform: 'none',
                  },
                };
                setOption(
                  fileButton,
                  'buttonText',
                  (originalOption: PrefabComponentOption) => ({
                    ...originalOption,
                    value: ['View file'],
                  }),
                );
                setOption(
                  fileButton,
                  'linkToExternal',
                  (originalOption: any) => ({
                    ...originalOption,
                    value: [enrichFileObj({ ...prop })],
                  }),
                );
                setOption(
                  fileButton,
                  'linkType',
                  (originalOption: PrefabComponentOption) => ({
                    ...originalOption,
                    value: 'external',
                  }),
                );
                setOption(
                  fileButton,
                  'linkTarget',
                  (originalOption: PrefabComponentOption) => ({
                    ...originalOption,
                    value: '_blank',
                  }),
                );
              }

              RowColumnColumn.descendants[1].descendants = [fileButton];
              hasFileConditional.descendants = [RowColumnColumn];
              return hasFileConditional;
            }

            if (prop.kind === 'IMAGE') {
              const media = cloneStructure('Media');

              if (media.type === 'COMPONENT') {
                setOption(
                  media,
                  'height',
                  (originalOption: PrefabComponentOption) => ({
                    ...originalOption,
                    value: '100%',
                  }),
                );
                setOption(
                  media,
                  'type',
                  (originalOption: PrefabComponentOption) => ({
                    ...originalOption,
                    value: 'url',
                  }),
                );
                setOption(media, 'urlFileSource', (originalOption: any) => ({
                  ...originalOption,
                  value: [{ ...enrichVarObj({ ...prop }), useKey: 'url' }],
                }));
              }

              RowColumnColumn.descendants[1].descendants = [media];
              hasFileConditional.descendants = [RowColumnColumn];
              return hasFileConditional;
            }

            setOption(Text2, 'content', (opt: any) => ({
              ...opt,
              value: [enrichVarObj({ ...prop })],
              configuration: { as: 'MULTILINE' },
            }));
            setOption(Text2, 'type', (opt: PrefabComponentOption) => ({
              ...opt,
              value: ['Body1'],
            }));
            RowColumnColumn.descendants[1].descendants = [Text2];

            return RowColumnColumn;
          };

          const detailsBox = treeSearch('#detailsBox', newPrefab.structure);
          if (!detailsBox) throw new Error('detailsBox not found');

          model?.properties.forEach((property) => {
            detailsBox.descendants.push(makeDetail(property));
          });

          const deleteForm = treeSearch('#deleteForm', newPrefab.structure);
          if (!deleteForm) throw new Error('No delete form found');
          deleteForm.id = deleteButtonId;

          if (idProperty && model) {
            // set update form
            const updateForm = treeSearch('#updateForm', newPrefab.structure);
            if (!updateForm) throw new Error('No update form found');
            updateForm.id = updateFormId;

            const normalizeProperties = model.properties.map((prop): any => ({
              id: [prop.id],
              label: prop.label,
              type: 'PROPERTY',
              kind: prop.kind,
            }));

            const filteredproperties = normalizeProperties.filter(
              (prop) =>
                prop.label !== 'Created at' &&
                prop.label !== 'Updated at' &&
                prop.label !== 'Id',
            );

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

            const updateFormFooter = updateForm.descendants.pop();

            Object.values(result.variables).forEach(
              ([prop, inputVariable]): void => {
                const generateInputPrefabs = () => {
                  let fileUpload;
                  let fileUploadButton;
                  let imageUpload;
                  let imageUploadButton;
                  switch (prop.kind) {
                    case PropertyKind.INTEGER:
                      return formInputStructure(
                        prop.label,
                        makeBettyUpdateInput(
                          BettyPrefabs.INTEGER,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.EMAIL_ADDRESS:
                      return formInputStructure(
                        prop.label,
                        makeBettyUpdateInput(
                          BettyPrefabs.EMAIL_ADDRESS,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.DECIMAL:
                      return formInputStructure(
                        prop.label,
                        makeBettyUpdateInput(
                          BettyPrefabs.DECIMAL,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.TEXT:
                      return formInputStructure(
                        prop.label,
                        makeBettyUpdateInput(
                          BettyPrefabs.TEXT,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.PRICE:
                      return formInputStructure(
                        prop.label,
                        makeBettyUpdateInput(
                          BettyPrefabs.PRICE,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.PASSWORD:
                      return null;
                    case PropertyKind.DATE:
                      return formInputStructure(
                        prop.label,
                        makeBettyUpdateInput(
                          BettyPrefabs.DATE,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.DATE_TIME:
                      return formInputStructure(
                        prop.label,
                        makeBettyUpdateInput(
                          BettyPrefabs.DATE_TIME,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.TIME:
                      return formInputStructure(
                        prop.label,
                        makeBettyUpdateInput(
                          BettyPrefabs.TIME,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.FILE:
                      fileUpload = makeBettyUpdateInput(
                        BettyPrefabs.FILE,
                        model,
                        prop,
                        inputVariable,
                      );
                      if (fileUpload.type === 'COMPONENT') {
                        [fileUploadButton] = fileUpload.descendants;
                        if (fileUploadButton.type === 'COMPONENT') {
                          fileUploadButton.style = {
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
                              padding: ['0.6875rem', '1.375rem'],
                              textDecoration: 'none',
                              textTransform: 'none',
                            },
                          };
                        }
                      }
                      return formInputStructure(prop.label, fileUpload);
                    case PropertyKind.IMAGE:
                      imageUpload = makeBettyUpdateInput(
                        BettyPrefabs.IMAGE,
                        model,
                        prop,
                        inputVariable,
                      );
                      if (imageUpload.type === 'COMPONENT') {
                        [imageUploadButton] = imageUpload.descendants;
                        if (imageUploadButton.type === 'COMPONENT') {
                          imageUploadButton.style = {
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
                              padding: ['0.6875rem', '1.375rem'],
                              textDecoration: 'none',
                              textTransform: 'none',
                            },
                          };
                        }
                      }
                      return formInputStructure(prop.label, imageUpload);
                    case PropertyKind.BOOLEAN:
                      return formInputStructure(
                        prop.label,
                        makeBettyUpdateInput(
                          BettyPrefabs.BOOLEAN,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    case PropertyKind.LIST:
                      return formInputStructure(
                        prop.label,
                        makeBettyUpdateInput(
                          BettyPrefabs.LIST,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    default:
                      return formInputStructure(
                        prop.label,
                        makeBettyUpdateInput(
                          BettyPrefabs.STRING,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                  }
                };
                const updateFormInputs = generateInputPrefabs();
                if (!updateForm)
                  throw new Error('the updateForm could not be found');
                if (!updateFormInputs)
                  throw new Error('There were no updateFormInputs selected');
                updateForm.descendants.push(updateFormInputs);
              },
            );
            updateForm.descendants.push(
              makeBettyUpdateInput(
                BettyPrefabs.HIDDEN,
                model,
                idProperty,
                result.recordInputVariable,
              ),
            );
            if (updateFormFooter) updateForm.descendants.push(updateFormFooter);

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

            // set delete action
            const deleteResult = await prepareAction(
              deleteButtonId,
              idProperty,
              undefined,
              'delete',
              undefined,
            );
            setOption(
              deleteForm,
              'actionId',
              (opts: PrefabComponentOption) => ({
                ...opts,
                value: deleteResult.action.actionId,
                configuration: { disabled: true },
                ref: {
                  id: '#deleteFormAction',
                },
              }),
            );

            setOption(deleteForm, 'model', (opts: PrefabComponentOption) => ({
              ...opts,
              value: modelId,
              configuration: {
                disabled: true,
              },
            }));

            const deleteSubmitButton = cloneStructure('Submit Button');
            if (deleteSubmitButton.type === 'COMPONENT') {
              deleteSubmitButton.style = {
                overwrite: {
                  backgroundColor: {
                    type: 'STATIC',
                    value: 'red',
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
                  padding: ['0.6875rem', '1.375rem'],
                  textDecoration: 'none',
                  textTransform: 'none',
                },
              };
              deleteSubmitButton.ref = {
                id: '#deleteFormSubmitButton',
              };
              setOption(
                deleteSubmitButton,
                'buttonText',
                (opts: PrefabComponentOption) => ({
                  ...opts,
                  value: ['Delete'],
                }),
              );
            }
            deleteForm.descendants.push(deleteSubmitButton);

            deleteForm.descendants.push(
              makeBettyUpdateInput(
                BettyPrefabs.HIDDEN,
                model,
                idProperty,
                deleteResult.recordInputVariable,
              ),
            );

            if (idProperty && newPrefab.interactions) {
              newPrefab.interactions.push(
                {
                  name: 'setCurrentRecord',
                  sourceEvent: 'Click',
                  targetOptionName: 'currentRecord',
                  parameters: [
                    {
                      id: [idProperty.id],
                      parameter: 'argument',
                    },
                  ],
                  ref: {
                    sourceComponentId: '#deleteButton',
                    targetComponentId: '#deleteForm',
                  },
                  type: 'Global',
                } as PrefabInteraction,
                {
                  name: 'setCurrentRecord',
                  sourceEvent: 'Click',
                  targetOptionName: 'currentRecord',
                  parameters: [
                    {
                      id: [idProperty.id],
                      parameter: 'argument',
                    },
                  ],
                  ref: {
                    sourceComponentId: '#editFormButton',
                    targetComponentId: '#updateForm',
                  },
                  type: 'Global',
                } as PrefabInteraction,
              );
            }

            const menuButton = treeSearch('#menuButton', newPrefab.structure);
            if (!menuButton) throw new Error('No menu button found');
            setOption(
              menuButton,
              'buttonText',
              (opt: PrefabComponentOption) => ({
                ...opt,
                value: [`${model.label} info`],
              }),
            );

            const updateTitle = treeSearch('#updateTitle', newPrefab.structure);
            if (!updateTitle) throw new Error('No create title found');
            setOption(updateTitle, 'content', (opt: PrefabComponentOption) => ({
              ...opt,
              value: [`Update ${model.label} record`],
            }));

            const detailsTitle = treeSearch(
              '#detailsTitle',
              newPrefab.structure,
            );
            if (!detailsTitle) throw new Error('No details title found');
            setOption(
              detailsTitle,
              'content',
              (opt: PrefabComponentOption) => ({
                ...opt,
                value: [`${model.label}`],
              }),
            );

            const breadcrumbTitle = treeSearch(
              '#breadcrumbTitle',
              newPrefab.structure,
            );
            if (!breadcrumbTitle) throw new Error('No breadcrumb title found');
            setOption(
              breadcrumbTitle,
              'breadcrumbContent',
              (opt: PrefabComponentOption) => ({
                ...opt,
                value: [`${model.label}s`],
              }),
            );
          }

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
                            value: 'static',
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
                                      ref: { id: '#updateTitle' },
                                      options: {
                                        ...textOptions,
                                        content: variable('Content', {
                                          value: ['Create record'],
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
                                      id: '#updateAlertErrorId',
                                    },
                                  }),
                                ],
                              ),
                            ],
                          ),
                          component(
                            'Form',
                            {
                              label: 'Update Form',
                              options: defaults,
                              ref: { id: '#updateForm' },
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
];

export default makePrefab(
  'Backoffice - Detail page',
  attributes,
  beforeCreate,
  prefabStructure,
);
