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
  showIfTrue,
  hideIf,
  text,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';

import {
  Alert,
  alertOptions,
  Box,
  boxOptions,
  Button,
  buttonOptions,
  Column,
  columnOptions,
  Conditional,
  conditionalOptions,
  Drawer,
  DrawerBar,
  drawerBarOptions,
  DrawerContainer,
  drawerContainerOptions,
  drawerOptions,
  Grid,
  gridOptions,
  List,
  ListItem,
  listItemOptions,
  listOptions,
  Media,
  mediaOptions,
  Row,
  rowOptions,
  SubmitButton,
  submitButtonOptions,
  Tab,
  tabOptions,
  Tabs,
  tabsOptions,
  Text,
  textOptions,
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

const drawerContainer = DrawerContainer(
  {
    options: {
      ...drawerContainerOptions,
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
          visibility: toggle('Toggle visibility', {
            value: false,
            configuration: {
              as: 'VISIBILITY',
            },
          }),
          drawerType: option('CUSTOM', {
            value: 'temporary',
            label: 'Drawer type',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Persistent', value: 'persistent' },
                { name: 'Temporary', value: 'temporary' },
              ],
            },
          }),
          temporaryAnchor: option('CUSTOM', {
            value: 'right',
            label: 'Alignment',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Left', value: 'left' },
                { name: 'Top', value: 'top' },
                { name: 'Right', value: 'right' },
                { name: 'Bottom', value: 'bottom' },
              ],
              condition: showIf('drawerType', 'EQ', 'temporary'),
            },
          }),
          drawerWidth: size('Drawer Width', {
            value: '480px',
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
          },
          [
            Box(
              {
                options: {
                  ...boxOptions,
                  height: size('Height', {
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
                      hideTabs: toggle('Hide visual tabs', { value: true }),
                    },
                  },
                  [
                    Tab(
                      {
                        options: {
                          ...tabOptions,
                          label: variable('Tab label', {
                            value: ['CreateTab'],
                          }),
                          height: size('Height', {
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                        },
                        ref: { id: '#createTab' },
                      },
                      [
                        Grid(
                          {
                            options: {
                              ...gridOptions,
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
                                      condition: showIf(
                                        'type',
                                        'EQ',
                                        'container',
                                      ),
                                    },
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
                                      backgroundColor: color(
                                        'Background color',
                                        {
                                          value: ThemeColor.PRIMARY,
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
                                            value: ['Create'],
                                            configuration: { as: 'MULTILINE' },
                                          }),
                                          type: font('Font', {
                                            value: ['Title5'],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.WHITE,
                                            configuration: {
                                              condition: showIfTrue('styles'),
                                            },
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    Button(
                                      {
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: [''],
                                          }),
                                          icon: icon('Icon', {
                                            value: 'Close',
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
                                              condition: hideIf(
                                                'icon',
                                                'EQ',
                                                'none',
                                              ),
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
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', '0rem', '0rem', 'M'],
                                      }),
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                    ref: { id: '#createFormBox' },
                                  },
                                  [
                                    Alert(
                                      {
                                        options: {
                                          ...alertOptions,
                                          bodyText: variable('Body text', {
                                            value: [
                                              'Something went wrong while creating your record',
                                            ],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                          iconColor: color('Icon color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                          background: color(
                                            'Background color',
                                            {
                                              value: ThemeColor.DANGER,
                                            },
                                          ),
                                          icon: icon('Icon', {
                                            value: 'Warning',
                                          }),
                                        },
                                      },
                                      [],
                                    ) /* Create Form */,
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
                                          value: 'space-between',
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
                                            value: ['Cancel'],
                                          }),
                                          outerSpacing: sizes('Outer space', {
                                            value: [
                                              '0rem',
                                              'S',
                                              '0rem',
                                              '0rem',
                                            ],
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    SubmitButton(
                                      {
                                        options: {
                                          ...submitButtonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Save'],
                                          }),
                                          icon: icon('Icon', { value: 'Save' }),
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
                    Tab(
                      {
                        options: {
                          ...tabOptions,
                          label: variable('Tab label', {
                            value: ['DetailTab'],
                          }),
                          height: size('Height', {
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                        },
                        ref: { id: '#detailTab' },
                      },
                      [
                        Grid(
                          {
                            options: {
                              ...gridOptions,
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
                                      condition: showIf(
                                        'type',
                                        'EQ',
                                        'container',
                                      ),
                                    },
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
                                      backgroundColor: color(
                                        'Background color',
                                        {
                                          value: ThemeColor.PRIMARY,
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
                                            value: ['Details'],
                                            configuration: { as: 'MULTILINE' },
                                          }),
                                          type: font('Font', {
                                            value: ['Title5'],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.WHITE,
                                            configuration: {
                                              condition: showIfTrue('styles'),
                                            },
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    Button(
                                      {
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: [''],
                                          }),
                                          icon: icon('Icon', {
                                            value: 'Close',
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
                                              condition: hideIf(
                                                'icon',
                                                'EQ',
                                                'none',
                                              ),
                                            },
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                                Box({}, [Alert({}, []) /* Detail Tab */]),
                                Box({}, [Button({}, []), SubmitButton({}, [])]),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                    Tab(
                      {
                        options: {
                          ...tabOptions,
                          label: variable('Tab label', { value: ['EditTab'] }),
                          height: size('Height', {
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                        },
                        ref: { id: '#editTab' },
                      },
                      [
                        Grid(
                          {
                            options: {
                              ...gridOptions,
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
                                      condition: showIf(
                                        'type',
                                        'EQ',
                                        'container',
                                      ),
                                    },
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
                                      backgroundColor: color(
                                        'Background color',
                                        {
                                          value: ThemeColor.PRIMARY,
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
                                            value: ['Create'],
                                            configuration: { as: 'MULTILINE' },
                                          }),
                                          type: font('Font', {
                                            value: ['Title5'],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.WHITE,
                                            configuration: {
                                              condition: showIfTrue('styles'),
                                            },
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    Button(
                                      {
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: [''],
                                          }),
                                          icon: icon('Icon', {
                                            value: 'Close',
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
                                              condition: hideIf(
                                                'icon',
                                                'EQ',
                                                'none',
                                              ),
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
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', '0rem', '0rem', 'M'],
                                      }),
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                    ref: { id: '#editFormBox' },
                                  },
                                  [
                                    Alert(
                                      {
                                        options: {
                                          ...alertOptions,
                                          bodyText: variable('Body text', {
                                            value: [
                                              'Something went wrong while updating your record',
                                            ],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                          iconColor: color('Icon color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                          background: color(
                                            'Background color',
                                            {
                                              value: ThemeColor.DANGER,
                                            },
                                          ),
                                          icon: icon('Icon', {
                                            value: 'Warning',
                                          }),
                                        },
                                      },
                                      [],
                                    ) /* Update Form */,
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
                                          value: 'space-between',
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
                                            value: ['Cancel'],
                                          }),
                                          outerSpacing: sizes('Outer space', {
                                            value: [
                                              '0rem',
                                              'S',
                                              '0rem',
                                              '0rem',
                                            ],
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    SubmitButton(
                                      {
                                        options: {
                                          ...submitButtonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Save'],
                                          }),
                                          icon: icon('Icon', { value: 'Save' }),
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
          ],
        ),
        DrawerContainer(
          {
            options: {
              ...drawerContainerOptions,
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
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
                    options: {
                      ...columnOptions,
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
                                  stretch: toggle(
                                    'Stretch (when in flex container)',
                                    {
                                      value: true,
                                    },
                                  ),
                                  innerSpacing: sizes('Inner space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
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
                                        value: '100%',
                                        configuration: {
                                          as: 'UNIT',
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
                                          columnWidthTabletLandscape: option(
                                            'CUSTOM',
                                            {
                                              label:
                                                'Column width (tablet landscape)',
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
                                            },
                                          ),
                                          columnWidthTabletPortrait: option(
                                            'CUSTOM',
                                            {
                                              value: '12',
                                              label:
                                                'Column width (tablet portrait)',
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
                                            },
                                          ),
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
                                          columnHeight: text('Height', {
                                            value: '100%',
                                            configuration: {
                                              as: 'UNIT',
                                            },
                                          }),
                                          outerSpacing: sizes('Outer space', {
                                            value: ['L', 'L', 'L', 'L'],
                                          }),
                                          innerSpacing: sizes('Inner space', {
                                            value: ['L', 'L', 'L', 'L'],
                                          }),
                                        },
                                      },
                                      [
                                        Box(
                                          {
                                            options: {
                                              ...boxOptions,
                                              innerSpacing: sizes(
                                                'Inner space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            Row(
                                              {
                                                options: {
                                                  ...rowOptions,
                                                  maxRowWidth: option(
                                                    'CUSTOM',
                                                    {
                                                      label: 'Width',
                                                      value: 'Full',
                                                      configuration: {
                                                        as: 'BUTTONGROUP',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'S',
                                                            value: 'S',
                                                          },
                                                          {
                                                            name: 'M',
                                                            value: 'M',
                                                          },
                                                          {
                                                            name: 'L',
                                                            value: 'L',
                                                          },
                                                          {
                                                            name: 'XL',
                                                            value: 'XL',
                                                          },
                                                          {
                                                            name: 'Full',
                                                            value: 'Full',
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                Column(
                                                  {
                                                    options: {
                                                      ...columnOptions,
                                                      innerSpacing: sizes(
                                                        'Inner space',
                                                        {
                                                          value: [
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                          ],
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    Conditional(
                                                      {
                                                        options: {
                                                          ...conditionalOptions,
                                                          visible: toggle(
                                                            'Initial visibility',
                                                            {
                                                              value: false,
                                                              configuration: {
                                                                as: 'VISIBILITY',
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
                                                              outerSpacing:
                                                                sizes(
                                                                  'Outer space',
                                                                  {
                                                                    value: [
                                                                      '0rem',
                                                                      '0rem',
                                                                      'XL',
                                                                      '0rem',
                                                                    ],
                                                                  },
                                                                ),
                                                              backgroundColor:
                                                                color(
                                                                  'Background color',
                                                                  {
                                                                    value:
                                                                      ThemeColor.INFO,
                                                                  },
                                                                ),
                                                              borderRadius:
                                                                size(
                                                                  'Border radius',
                                                                  {
                                                                    value:
                                                                      '5px',
                                                                  },
                                                                ),
                                                            },
                                                          },
                                                          [
                                                            Text(
                                                              {
                                                                options: {
                                                                  ...textOptions,
                                                                  content:
                                                                    variable(
                                                                      'Content',
                                                                      {
                                                                        value: [
                                                                          'To toggle the sidebar you have to navigate to the second drawer component and click on Toggle visibility. In this sidebar you find the "add record", "edit record" forms and details of the selected record.',
                                                                        ],
                                                                        configuration:
                                                                          {
                                                                            as: 'MULTILINE',
                                                                          },
                                                                      },
                                                                    ),
                                                                  type: font(
                                                                    'Font',
                                                                    {
                                                                      value: [
                                                                        'Body1',
                                                                      ],
                                                                    },
                                                                  ),
                                                                  outerSpacing:
                                                                    sizes(
                                                                      'Outer space',
                                                                      {
                                                                        value: [
                                                                          '0rem',
                                                                          '0rem',
                                                                          '0rem',
                                                                          'S',
                                                                        ],
                                                                      },
                                                                    ),
                                                                  styles:
                                                                    toggle(
                                                                      'Styles',
                                                                      {
                                                                        value:
                                                                          true,
                                                                      },
                                                                    ),
                                                                  textColor:
                                                                    color(
                                                                      'Text color',
                                                                      {
                                                                        value:
                                                                          ThemeColor.WHITE,
                                                                        configuration:
                                                                          {
                                                                            condition:
                                                                              showIfTrue(
                                                                                'styles',
                                                                              ),
                                                                          },
                                                                      },
                                                                    ),
                                                                  fontWeight:
                                                                    option(
                                                                      'CUSTOM',
                                                                      {
                                                                        label:
                                                                          'Font weight',
                                                                        value:
                                                                          '500',
                                                                        configuration:
                                                                          {
                                                                            as: 'DROPDOWN',
                                                                            dataType:
                                                                              'string',
                                                                            allowedInput:
                                                                              [
                                                                                {
                                                                                  name: '100',
                                                                                  value:
                                                                                    '100',
                                                                                },
                                                                                {
                                                                                  name: '200',
                                                                                  value:
                                                                                    '200',
                                                                                },
                                                                                {
                                                                                  name: '300',
                                                                                  value:
                                                                                    '300',
                                                                                },
                                                                                {
                                                                                  name: '400',
                                                                                  value:
                                                                                    '400',
                                                                                },
                                                                                {
                                                                                  name: '500',
                                                                                  value:
                                                                                    '500',
                                                                                },
                                                                                {
                                                                                  name: '600',
                                                                                  value:
                                                                                    '600',
                                                                                },
                                                                                {
                                                                                  name: '700',
                                                                                  value:
                                                                                    '700',
                                                                                },
                                                                                {
                                                                                  name: '800',
                                                                                  value:
                                                                                    '800',
                                                                                },
                                                                                {
                                                                                  name: '900',
                                                                                  value:
                                                                                    '900',
                                                                                },
                                                                              ],
                                                                            condition:
                                                                              showIfTrue(
                                                                                'styles',
                                                                              ),
                                                                          },
                                                                      },
                                                                    ),
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                            Text(
                                                              {
                                                                options: {
                                                                  ...textOptions,
                                                                  content:
                                                                    variable(
                                                                      'Content',
                                                                      {
                                                                        value: [
                                                                          'This message is not visible in your app',
                                                                        ],
                                                                        configuration:
                                                                          {
                                                                            as: 'MULTILINE',
                                                                          },
                                                                      },
                                                                    ),
                                                                  type: font(
                                                                    'Font',
                                                                    {
                                                                      value: [
                                                                        'Body1',
                                                                      ],
                                                                    },
                                                                  ),
                                                                  outerSpacing:
                                                                    sizes(
                                                                      'Outer space',
                                                                      {
                                                                        value: [
                                                                          '0rem',
                                                                          '0rem',
                                                                          '0rem',
                                                                          'S',
                                                                        ],
                                                                      },
                                                                    ),
                                                                  styles:
                                                                    toggle(
                                                                      'Styles',
                                                                      {
                                                                        value:
                                                                          true,
                                                                      },
                                                                    ),
                                                                  textColor:
                                                                    color(
                                                                      'Text color',
                                                                      {
                                                                        value:
                                                                          ThemeColor.WHITE,
                                                                        configuration:
                                                                          {
                                                                            condition:
                                                                              showIfTrue(
                                                                                'styles',
                                                                              ),
                                                                          },
                                                                      },
                                                                    ),
                                                                  fontWeight:
                                                                    option(
                                                                      'CUSTOM',
                                                                      {
                                                                        label:
                                                                          'Font weight',
                                                                        value:
                                                                          '500',
                                                                        configuration:
                                                                          {
                                                                            as: 'DROPDOWN',
                                                                            dataType:
                                                                              'string',
                                                                            allowedInput:
                                                                              [
                                                                                {
                                                                                  name: '100',
                                                                                  value:
                                                                                    '100',
                                                                                },
                                                                                {
                                                                                  name: '200',
                                                                                  value:
                                                                                    '200',
                                                                                },
                                                                                {
                                                                                  name: '300',
                                                                                  value:
                                                                                    '300',
                                                                                },
                                                                                {
                                                                                  name: '400',
                                                                                  value:
                                                                                    '400',
                                                                                },
                                                                                {
                                                                                  name: '500',
                                                                                  value:
                                                                                    '500',
                                                                                },
                                                                                {
                                                                                  name: '600',
                                                                                  value:
                                                                                    '600',
                                                                                },
                                                                                {
                                                                                  name: '700',
                                                                                  value:
                                                                                    '700',
                                                                                },
                                                                                {
                                                                                  name: '800',
                                                                                  value:
                                                                                    '800',
                                                                                },
                                                                                {
                                                                                  name: '900',
                                                                                  value:
                                                                                    '900',
                                                                                },
                                                                              ],
                                                                            condition:
                                                                              showIfTrue(
                                                                                'styles',
                                                                              ),
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
                                                Column(
                                                  {
                                                    options: {
                                                      ...columnOptions,
                                                      innerSpacing: sizes(
                                                        'Inner space',
                                                        {
                                                          value: [
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                          ],
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    Box(
                                                      {
                                                        options: {
                                                          ...boxOptions,
                                                          alignment:
                                                            buttongroup(
                                                              'Alignment',
                                                              [
                                                                [
                                                                  'None',
                                                                  'none',
                                                                ],
                                                                [
                                                                  'Left',
                                                                  'flex-start',
                                                                ],
                                                                [
                                                                  'Center',
                                                                  'center',
                                                                ],
                                                                [
                                                                  'Right',
                                                                  'flex-end',
                                                                ],
                                                                [
                                                                  'Justified',
                                                                  'space-between',
                                                                ],
                                                              ],
                                                              {
                                                                value:
                                                                  'space-between',
                                                                configuration: {
                                                                  dataType:
                                                                    'string',
                                                                },
                                                              },
                                                            ),
                                                          outerSpacing: sizes(
                                                            'Outer space',
                                                            {
                                                              value: [
                                                                '0rem',
                                                                '0rem',
                                                                '0rem',
                                                                'XL',
                                                              ],
                                                            },
                                                          ),
                                                        },
                                                      },
                                                      [
                                                        Text(
                                                          {
                                                            options: {
                                                              ...textOptions,
                                                              content: variable(
                                                                'Content',
                                                                {
                                                                  value: [],
                                                                  configuration:
                                                                    {
                                                                      as: 'MULTILINE',
                                                                    },
                                                                },
                                                              ),
                                                              type: font(
                                                                'Font',
                                                                {
                                                                  value: [
                                                                    'Title4',
                                                                  ],
                                                                },
                                                              ),
                                                            },
                                                            ref: {
                                                              id: '#titleText',
                                                            },
                                                          },
                                                          [],
                                                        ),
                                                        Button(
                                                          {
                                                            options: {
                                                              ...buttonOptions,
                                                              buttonText:
                                                                variable(
                                                                  'Button text',
                                                                  {
                                                                    value: [
                                                                      'New',
                                                                    ],
                                                                  },
                                                                ),
                                                              icon: icon(
                                                                'Icon',
                                                                {
                                                                  value: 'Add',
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
                                  width: size('Width', {
                                    value: '100%',
                                    configuration: {
                                      as: 'UNIT',
                                    },
                                  }),
                                  innerSpacing: sizes('Inner space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
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
  ],
);

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

const beforeCreate = ({
  components: {
    Content,
    Header,
    Field,
    Footer,
    ModelRelationSelector,
    PropertiesSelector,
    PartialSelector,
    ModelSelector,
    Text: TextComp
    Box: BoxComp,
  },
  helpers: { cloneStructure, setOption, useModelQuery, prepareAction },
  prefab: originalPrefab,
  save,
  close,
}: BeforeCreateArgs) => {
  const [modelId, setModelId] = React.useState('');
  const [properties, setProperties] = React.useState([]);
  const [modelValidation, setModelValidation] = React.useState(false);
  const [propertiesValidation, setPropertiesValidation] = React.useState(false);
  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });
  const [stepNumber, setStepNumber] = React.useState(1);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');

  const modelRequest = useModelQuery({
    variables: { id: modelId },
    onCompleted: (result) => {
      setModel(result.model);
      setIdProperty(result.model.properties.find(({ name }) => name === 'id'));
    },
  });


  const stepper = {
    setStep: (step: any) => {
      if (step === 1) {
        return (
          <>
            <BoxComp pad={{ bottom: '15px' }}>
              <BoxComp pad={{ bottom: '15px' }}>
                <TextComp size="medium" weight="bolder">
                  Select partials
                </TextComp>
              </BoxComp>
              <BoxComp pad={{ bottom: '15px' }}>
                <TextComp color="grey700">
                  By using a partial for the side menu and footer you can easily
                  reuse the same structure without having to go through every
                  page.
                </TextComp>
              </BoxComp>
              <Field label="SIDEMENU PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(headerId: string) => {
                    setHeaderPartialId(headerId);
                  }}
                  preSelected="side menu"
                  value={headerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </BoxComp>
            <BoxComp pad={{ bottom: '15px' }}>
              <Field label="FOOTER PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(footerId: string) => {
                    setFooterPartialId(footerId);
                  }}
                  preSelected="footer"
                  value={footerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </BoxComp>
          </>
        );
      }

      return (
        <>
          <Field
            label="Model"
            error={
              modelValidation && (
                <TextComp color="#e82600">Selecting a model is required</TextComp>
              )
            }
          >
            <ModelSelector
              onChange={(value) => {
                setModelValidation(false);
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
          <Field
            label="Properties used in Backoffice"
            error={
              propertiesValidation && (
                <TextComp color="#e82600">Selecting a property is required</TextComp>
              )
            }
          >
            <PropertiesSelector
              modelId={modelId}
              value={properties}
              disabledKinds={[
                'BELONGS_TO',
                'HAS_AND_BELONGS_TO_MANY',
                'HAS_MANY',
                'MULTI_FILE',
                'AUTO_INCREMENT',
                'COUNT',
                'MULTI_IMAGE',
                'PDF',
                'RICH_TEXT',
                'SIGNED_PDF',
                'SUM',
                'BOOLEAN_EXPRESSION',
                'DATE_EXPRESSION',
                'DATE_TIME_EXPRESSION',
                'DECIMAL_EXPRESSION',
                'INTEGER_EXPRESSION',
                'MINUTES_EXPRESSION',
                'PRICE_EXPRESSION',
                'STRING_EXPRESSION',
                'TEXT_EXPRESSION',
                'MINUTES',
                'ZIPCODE',
              ]}
              onChange={(value: any) => {
                setProperties(value);
              }}
            />
          </Field>
        </>
      );
    },
    onSave: () => {
        const newPrefab = { ...originalPrefab };

        const result = await prepareAction(
            componentId,
            idProperty,
            properties,
            'create',
          );

        save(newPrefab);
    },
    buttons: () => (
      <Box direction="row" justify="between">
        <Box direction="row" margin="2rem">
          <Button
            label="Previous"
            size="large"
            background={{ color: '#f0f1f5' }}
            onClick={() => {
              if (stepNumber === 1) {
                return;
              }
              const newStepnumber = stepNumber - 1;
              setStepNumber(newStepnumber);
            }}
            margin={{ right: '5px' }}
            disabled={stepNumber === 1}
          />
          <Button
            label="Next"
            size="large"
            disabled={stepNumber === stepper.stepAmount}
            onClick={() => {
              const newStepnumber = stepNumber + 1;
              setStepNumber(newStepnumber);
            }}
            primary
          />
        </Box>
        <Box>
          <Footer
            onClose={close}
            onSave={stepNumber === stepper.stepAmount && stepper.onSave}
          />
        </Box>
      </Box>
    ),
    progressBar: () => {
      return (
        <BoxComp
          justify="center"
          margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
        >
          <TextComp size="medium" weight="bold">{`Step: ${stepNumber + 1} / ${
            stepper.stepAmount + 1
          }`}</TextComp>
        </BoxComp>
      );
    },
    stepAmount: 2,
  };
  return (
    <>
      <Header onClose={close} title="Configure back office" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default prefab('Backoffice(TS)', attributes, undefined, prefabStructure);