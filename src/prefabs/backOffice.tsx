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
} from '@betty-blocks/component-sdk';
import {
  Alert,
  Box,
  boxOptions,
  Button,
  Drawer,
  DrawerBar,
  drawerBarOptions,
  DrawerContainer,
  drawerOptions,
  Grid,
  List,
  ListItem,
  listItemOptions,
  listOptions,
  Media,
  mediaOptions,
  SubmitButton,
  Tab,
  Tabs,
  tabsOptions,
  Text,
} from './structures';

const attributes = {
  category: 'FORMV2',
  icon: Icon.UpdateFormIcon,
  type: 'page',
  //   interactions,
  //   variables: [],
};

const sideMenu = Box(
  {
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
        Box(
          {
            options: {
              ...boxOptions,
              innerSpacing: sizes('Inner space', {
                value: ['L', 'L', '0rem', 'L'],
              }),
            },
          },
          [
            Media(
              {
                options: {
                  ...mediaOptions,
                  imageSource: variable('Source', {
                    value: [
                      'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                    ],
                    configuration: {
                      as: 'MULTILINE',
                      condition: showIf('type', 'EQ', 'img'),
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
              stretch: toggle('Stretch (when in flex container)', {
                value: true,
              }),
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
            },
          },
          [
            List(
              {
                options: {
                  ...listOptions,
                  disablePadding: toggle('Disable padding', { value: false }),
                },
              },
              [
                ListItem(
                  {
                    options: {
                      ...listItemOptions,
                      primaryText: variable('Primary text', {
                        value: ['First list item'],
                      }),
                      avatarOrIcon: option('CUSTOM', {
                        label: 'Visual',
                        value: 'icon',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Icon', value: 'icon' },
                            { name: 'Avatar', value: 'avatar' },
                          ],
                        },
                      }),
                      icon: icon('Icon', {
                        value: 'Apartment',
                        configuration: {
                          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
                        },
                      }),
                      selected: toggle('Selected', { value: true }),
                      titleColor: color('Title color', {
                        value: ThemeColor.WHITE,
                      }),
                      iconColor: color('Icon color', {
                        value: ThemeColor.WHITE,
                        configuration: {
                          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
                        },
                      }),
                      dense: toggle('Dense', { value: true }),
                    },
                  },
                  [],
                ),
                ListItem(
                  {
                    options: {
                      ...listItemOptions,
                      primaryText: variable('Primary text', {
                        value: ['Second list item'],
                      }),
                      avatarOrIcon: option('CUSTOM', {
                        label: 'Visual',
                        value: 'icon',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Icon', value: 'icon' },
                            { name: 'Avatar', value: 'avatar' },
                          ],
                        },
                      }),
                      titleColor: color('Title color', {
                        value: ThemeColor.WHITE,
                      }),
                      iconColor: color('Icon color', {
                        value: ThemeColor.WHITE,
                        configuration: {
                          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
                        },
                      }),
                      dense: toggle('Dense', { value: true }),
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
);

const drawerContainer = DrawerContainer({}, [
  Drawer({}, [
    DrawerBar({}, [
      Box({}, [
        Tabs(
          {
            options: {
              ...tabsOptions,
              height: size('Height', {
                value: '100%',
                configuration: {
                  as: 'UNIT',
                },
              }),
            },
          },
          [
            Tab({}, [
              Grid({}, [
                Grid({}, [
                  Box({}, [Text({}, []), Button({}, [])]),
                  Box({}, [Alert({}, []) /* Create Form */]),
                  Box({}, [Button({}, []), SubmitButton({}, [])]),
                ]),
              ]),
            ]),
            Tab({}, [
              Grid({}, [
                Grid({}, [
                  Box({}, [Text({}, []), Button({}, [])]),
                  Box({}, [Alert({}, []) /* Detail Tab */]),
                  Box({}, [Button({}, []), SubmitButton({}, [])]),
                ]),
              ]),
            ]),
            Tab({}, [
              Grid({}, [
                Grid({}, [
                  Box({}, [Text({}, []), Button({}, [])]),
                  Box({}, [Alert({}, []) /* Update Form */]),
                  Box({}, [Button({}, []), SubmitButton({}, [])]),
                ]),
              ]),
            ]),
          ],
        ),
      ]),
    ]),
    DrawerContainer({}, []),
  ]),
]);

const prefabStructure = [
  Drawer(
    {
      options: {
        ...drawerOptions,
        drawerWidth: size('Drawer Width', {
          value: '240px',
          configuration: {
            as: 'UNIT',
          },
        }),
      },
    },
    [
      DrawerBar(
        {
          options: {
            ...drawerBarOptions,
            innerSpacing: sizes('Inner space', {
              value: ['0rem', '0rem', '0rem', '0rem'],
            }),
          },
          ref: { id: '#DrawerBar' },
        },
        [sideMenu],
      ),
      drawerContainer,
    ],
  ),
];

export default prefab('Backoffice(TS)', attributes, undefined, prefabStructure);
