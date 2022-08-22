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
  PrefabReference,
  component,
} from '@betty-blocks/component-sdk';

import { Property } from '@betty-blocks/component-sdk/build/prefabs/types/property';
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
  DataTable,
  Drawer,
  DrawerBar,
  drawerBarOptions,
  DrawerContainer,
  drawerContainerOptions,
  drawerOptions,
  FormErrorAlert,
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
import { options as defaults } from './structures/ActionJSForm/options';

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
                                          styles: toggle('Styles', {
                                            value: true,
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
                                      stretch: toggle(
                                        'Stretch (when in flex container)',
                                        {
                                          value: true,
                                        },
                                      ),
                                    },
                                    ref: { id: '#createFormBox' },
                                  },
                                  [
                                    component(
                                      'Form Beta',
                                      {
                                        label: 'Create Form Beta',
                                        options: defaults,
                                        ref: { id: '#createForm' },
                                      },
                                      [
                                        FormErrorAlert({
                                          ref: { id: '#createAlertErrorId' },
                                        }),
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
                                          styles: toggle('Styles', {
                                            value: true,
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
                                      stretch: toggle(
                                        'Stretch (when in flex container)',
                                        {
                                          value: true,
                                        },
                                      ),
                                    },
                                    ref: { id: '#detailBox' },
                                  },
                                  [
                                    /* Detail Tab */
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
                                            value: ['Update'],
                                            configuration: { as: 'MULTILINE' },
                                          }),
                                          styles: toggle('Styles', {
                                            value: true,
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
                                      stretch: toggle(
                                        'Stretch (when in flex container)',
                                        {
                                          value: true,
                                        },
                                      ),
                                    },
                                  },
                                  [
                                    component(
                                      'Form Beta',
                                      {
                                        label: 'Update Form Beta',
                                        options: defaults,
                                        ref: { id: '#editForm' },
                                      },
                                      [
                                        FormErrorAlert({
                                          ref: { id: '#editAlertErrorId' },
                                        }),
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
                                                          innerSpacing: sizes(
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
                                                        },
                                                      },
                                                      [
                                                        Text(
                                                          {
                                                            options: {
                                                              ...textOptions,
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
                                                    DataTable(
                                                      {
                                                        ref: {
                                                          id: '#dataTable',
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
    // ModelSelector,
    Text: TextComp,
    Box: BoxComp,
    Button: Buttoncomp,
  },
  helpers: {
    useModelQuery,
    prepareAction,
    cloneStructure,
    setOption,
    createUuid,
    makeBettyInput,
    makeBettyUpdateInput,
    PropertyKind,
    BettyPrefabs,
  },
  prefab: originalPrefab,
  save,
  close,
}: any) => {
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState(null);
  const [properties, setProperties] = React.useState([]);
  const [modelValidation, setModelValidation] = React.useState(false);
  const [propertiesValidation, setPropertiesValidation] = React.useState(false);
  const [idProperty, setIdProperty] = React.useState<Property>();
  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });
  const [stepNumber, setStepNumber] = React.useState(1);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');

  const createFormId = createUuid();
  const editFormId = createUuid();

  const getDescendantByRef = (refValue: string, structure: any) =>
    structure.reduce((acc: string, comp: PrefabReference) => {
      if (acc) return acc;
      if (
        comp.type === 'COMPONENT' &&
        // eslint-disable-next-line no-prototype-builtins
        comp.ref
          ? Object.values(comp.ref).indexOf(refValue) > -1
          : undefined
      ) {
        return comp;
      }
      if (comp.type === 'PARTIAL') {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return getDescendantByRef(refValue, comp.descendants);
    }, null);

  const enrichVarObj = (obj) => {
    const returnObject = obj;
    if (data && data.model) {
      const property = data.model.properties.find(
        (prop) => prop.id === obj.id[0],
      );
      if (property) {
        returnObject.name = `{{ ${data.model.name}.${property.name} }}`;
      }
    }
    return returnObject;
  };

  const makeDetail = (prop) => {
    debugger;
    const mediaComponent = cloneStructure('Media');
    setOption(mediaComponent, 'imageSource', (opt: any) => ({
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
    }));

    const detailComponent = cloneStructure('Box');
    setOption(detailComponent, 'outerSpace', (opt: any) => ({
      ...opt,
      value: ['0rem', '0rem', 'M', '0rem'],
    }));
    setOption(detailComponent, 'backgroundColor', (opt: any) => ({
      ...opt,
      value: 'Accent1',
    }));
    setOption(detailComponent, 'backgroundColorAlpha', (opt: any) => ({
      ...opt,
      value: '20',
    }));
    const labelText = cloneStructure('Text');
    setOption(labelText, 'content', (opt: any) => ({
      ...opt,
      value: [`${[prop.label]}:`],
      configuration: { as: 'MULTILINE' },
    }));
    setOption(labelText, 'type', (opt: any) => ({
      ...opt,
      value: 'Body1',
    }));
    setOption(labelText, 'Styles', (opt: any) => ({
      ...opt,
      value: true,
    }));
    setOption(labelText, 'fontWeight', (opt: any) => ({
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

    const valueText = cloneStructure('Text');
    setOption(valueText, 'content', (opt: any) => ({
      ...opt,
      value: [enrichVarObj({ ...prop })],
      configuration: { as: 'MULTILINE' },
    }));

    detailComponent.descendants = [labelText, valueText];

    return prop.kind === 'IMAGE' ? mediaComponent : detailComponent;
  };

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
                <TextComp color="#e82600">
                  Selecting a model is required
                </TextComp>
              )
            }
          >
            <ModelRelationSelector
              onChange={(value: any) => {
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
                <TextComp color="#e82600">
                  Selecting a property is required
                </TextComp>
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
    onSave: async () => {
      const newPrefab = { ...originalPrefab };

      // set title prop
      const titleComponent = getDescendantByRef(
        '#titleText',
        newPrefab.structure,
      );
      titleComponent.options[0].value = [data?.model.label];

      // set datatable
      const dataTable = getDescendantByRef('#dataTable', newPrefab.structure);

      dataTable.options[1] = {
        value: modelId,
        label: 'Model',
        key: 'model',
        type: 'MODEL_AND_RELATION',
      };

      properties.forEach(
        (property: {
          defaultValue: null;
          id: string[];
          kind: string;
          labonSael: string;
          type: string;
          format: string;
        }) => {
          let newProperty = property;
          const inheritFormatKinds = [
            'DATE',
            'DATE_EXPRESSION',
            'DATE_TIME',
            'DATE_TIME_EXPRESSION',
            'DECIMAL',
            'DECIMAL_EXPRESSION',
            'INTEGER',
            'INTEGER_EXPRESSION',
            'PRICE',
            'PRICE_EXPRESSION',
            'TIME',
          ];
          if (inheritFormatKinds.includes(property.kind)) {
            newProperty = {
              ...property,
              format: 'INHERIT',
            };
          }

          const dataTableColumnStructure = cloneStructure('Datatable Column');
          if (dataTableColumnStructure.type !== 'COMPONENT') {
            throw new Error(
              `expected component prefab, found ${dataTableColumnStructure.type}`,
            );
          }

          setOption(
            dataTableColumnStructure,
            'property',
            (originalOption: any) => {
              return {
                ...originalOption,
                value: newProperty,
              };
            },
          );
          dataTable.descendants.push(dataTableColumnStructure);
        },
      );

      const buttonColumn = cloneStructure('Datatable Column');
      const detailButton = cloneStructure('Button');
      detailButton.style = {
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
      };

      detailButton.options = [
        {
          label: 'Toggle visibility',
          key: 'visible',
          value: true,
          type: 'TOGGLE',
          configuration: {
            as: 'VISIBILITY',
          },
        },
        {
          type: 'VARIABLE',
          label: 'Button text',
          key: 'buttonText',
          value: [''],
        },
        {
          value: false,
          label: 'Full width',
          key: 'fullWidth',
          type: 'TOGGLE',
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'variant',
              comparator: 'EQ',
              value: 'icon',
            },
          },
        },
        {
          label: 'Icon',
          key: 'icon',
          value: 'Info',
          type: 'ICON',
        },
        {
          value: 'small',
          label: 'Icon size',
          key: 'size',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Small', value: 'small' },
              { name: 'Medium', value: 'medium' },
              { name: 'Large', value: 'large' },
            ],
            condition: {
              type: 'HIDE',
              option: 'icon',
              comparator: 'EQ',
              value: 'None',
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Icon position',
          key: 'iconPosition',
          value: 'start',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            condition: {
              type: 'HIDE',
              option: 'icon',
              comparator: 'EQ',
              value: 'None',
            },
            allowedInput: [
              { name: 'Start', value: 'start' },
              { name: 'End', value: 'end' },
            ],
          },
        },
        {
          value: ['0rem', '0rem', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          label: 'Disabled',
          key: 'disabled',
          value: false,
          type: 'TOGGLE',
        },
        {
          label: 'Add Tooltip',
          key: 'addTooltip',
          value: false,
          type: 'TOGGLE',
        },
        {
          label: 'Toggle tooltip visibility',
          key: 'hasVisibleTooltip',
          value: true,
          type: 'TOGGLE',
          configuration: {
            as: 'VISIBILITY',
            condition: {
              type: 'SHOW',
              option: 'addTooltip',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Tooltip Content',
          key: 'tooltipContent',
          value: ['Tips'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'addTooltip',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          label: 'Tooltip Placement',
          key: 'tooltipPlacement',
          value: 'bottom',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Top Start',
                value: 'top-start',
              },
              {
                name: 'Top',
                value: 'top',
              },
              {
                name: 'Top End',
                value: 'top-end',
              },
              {
                name: 'Right',
                value: 'right',
              },
              {
                name: 'Left',
                value: 'left',
              },
              {
                name: 'Botttom Start',
                value: 'bottom-start',
              },
              {
                name: 'Bottom',
                value: 'bottom',
              },
              {
                name: 'Bottom End',
                value: 'bottom-end',
              },
            ],
            condition: {
              type: 'SHOW',
              option: 'addTooltip',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Tooltip Background',
          key: 'tooltipBackground',
          value: 'Medium',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'addTooltip',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Tooltip Text',
          key: 'tooltipText',
          value: 'Black',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'addTooltip',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['Button'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ];

      detailButton.ref = { id: '#detailButton' };

      const editButton = cloneStructure('Button');
      editButton.style = {
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
      };

      editButton.options = [
        {
          label: 'Toggle visibility',
          key: 'visible',
          value: true,
          type: 'TOGGLE',
          configuration: {
            as: 'VISIBILITY',
          },
        },
        {
          type: 'VARIABLE',
          label: 'Button text',
          key: 'buttonText',
          value: [''],
        },
        {
          value: false,
          label: 'Full width',
          key: 'fullWidth',
          type: 'TOGGLE',
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'variant',
              comparator: 'EQ',
              value: 'icon',
            },
          },
        },
        {
          label: 'Icon',
          key: 'icon',
          value: 'Edit',
          type: 'ICON',
        },
        {
          value: 'small',
          label: 'Icon size',
          key: 'size',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Small', value: 'small' },
              { name: 'Medium', value: 'medium' },
              { name: 'Large', value: 'large' },
            ],
            condition: {
              type: 'HIDE',
              option: 'icon',
              comparator: 'EQ',
              value: 'None',
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Icon position',
          key: 'iconPosition',
          value: 'start',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            condition: {
              type: 'HIDE',
              option: 'icon',
              comparator: 'EQ',
              value: 'None',
            },
            allowedInput: [
              { name: 'Start', value: 'start' },
              { name: 'End', value: 'end' },
            ],
          },
        },
        {
          value: ['0rem', '0rem', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          label: 'Disabled',
          key: 'disabled',
          value: false,
          type: 'TOGGLE',
        },
        {
          label: 'Add Tooltip',
          key: 'addTooltip',
          value: false,
          type: 'TOGGLE',
        },
        {
          label: 'Toggle tooltip visibility',
          key: 'hasVisibleTooltip',
          value: true,
          type: 'TOGGLE',
          configuration: {
            as: 'VISIBILITY',
            condition: {
              type: 'SHOW',
              option: 'addTooltip',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Tooltip Content',
          key: 'tooltipContent',
          value: ['Tips'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'addTooltip',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          label: 'Tooltip Placement',
          key: 'tooltipPlacement',
          value: 'bottom',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Top Start',
                value: 'top-start',
              },
              {
                name: 'Top',
                value: 'top',
              },
              {
                name: 'Top End',
                value: 'top-end',
              },
              {
                name: 'Right',
                value: 'right',
              },
              {
                name: 'Left',
                value: 'left',
              },
              {
                name: 'Botttom Start',
                value: 'bottom-start',
              },
              {
                name: 'Bottom',
                value: 'bottom',
              },
              {
                name: 'Bottom End',
                value: 'bottom-end',
              },
            ],
            condition: {
              type: 'SHOW',
              option: 'addTooltip',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Tooltip Background',
          key: 'tooltipBackground',
          value: 'Medium',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'addTooltip',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Tooltip Text',
          key: 'tooltipText',
          value: 'Black',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'addTooltip',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['Button'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ];

      editButton.ref = { id: '#editButton' };

      // buttonColumn.descendants = [];

      // set create form
      if (idProperty && model) {
        const createForm = getDescendantByRef(
          '#createForm',
          newPrefab.structure,
        );
        createForm.id = createFormId;

        const result = await prepareAction(
          createFormId,
          idProperty,
          properties,
          'create',
        );

        Object.values(result.variables).map(([property, propVariable]) => {
          const { kind } = property;

          switch (kind) {
            case PropertyKind.BELONGS_TO: {
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.AUTO_COMPLETE,
                  model,
                  property,
                  propVariable,
                  result.relatedIdProperties,
                ),
              );
              break;
            }
            case PropertyKind.HAS_MANY:
            case PropertyKind.HAS_AND_BELONGS_TO_MANY:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.MULTI_AUTO_COMPLETE,
                  model,
                  property,
                  propVariable,
                  result.relatedIdProperties,
                ),
              );
              break;
            case PropertyKind.DATE_TIME:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.DATE_TIME,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.DATE:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.DATE,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.TIME:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.TIME,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.DECIMAL:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.DECIMAL,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.EMAIL_ADDRESS:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.EMAIL_ADDRESS,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.IBAN:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.IBAN,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.LIST:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.LIST,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.PASSWORD:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.PASSWORD,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.PHONE_NUMBER:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.PHONE_NUMBER,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.PRICE:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.PRICE,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.URL:
              createForm.descendants.push(
                makeBettyInput(BettyPrefabs.URL, model, property, propVariable),
              );
              break;
            case PropertyKind.STRING:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.STRING,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.TEXT:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.TEXT,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.INTEGER:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.INTEGER,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            case PropertyKind.BOOLEAN:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.BOOLEAN,
                  model,
                  property,
                  propVariable,
                ),
              );
              break;
            default:
              createForm.descendants.push(
                makeBettyInput(
                  BettyPrefabs.STRING,
                  model,
                  property,
                  propVariable,
                ),
              );
          }
          // eslint-disable-next-line no-console
          return console.warn('PropertyKind not found');
        });

        setOption(createForm, 'actionId', (opts) => ({
          ...opts,
          value: result.action.actionId,
          configuration: { disabled: true },
        }));

        setOption(createForm, 'model', (opts) => ({
          ...opts,
          value: modelId,
          configuration: {
            disabled: true,
          },
        }));
      }

      // set detail tab
      const detailBox = getDescendantByRef('#detailBox', newPrefab.structure);
      properties.map((prop) => detailBox.descendants.push(makeDetail(prop)));

      // set edit form
      const editForm = getDescendantByRef('#editForm', newPrefab.structure);
      editForm.id = editFormId;
      if (idProperty && model) {
        const result = await prepareAction(
          editFormId,
          idProperty,
          properties,
          'update',
        );
        setOption(editForm, 'actionId', (opts) => ({
          ...opts,
          value: result.action.actionId,
          configuration: { disabled: true },
        }));
        setOption(editForm, 'model', (opts) => ({
          ...opts,
          value: modelId,
          configuration: {
            disabled: true,
          },
        }));

        Object.values(result.variables).map(([property, variable]) => {
          const { kind } = property;
          switch (kind) {
            case PropertyKind.BELONGS_TO: {
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.AUTO_COMPLETE,
                  model,
                  property,
                  variable,
                  result.relatedIdProperties,
                ),
              );
              break;
            }
            case PropertyKind.HAS_MANY:
            case PropertyKind.HAS_AND_BELONGS_TO_MANY:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.MULTI_AUTO_COMPLETE,
                  model,
                  property,
                  variable,
                  result.relatedIdProperties,
                ),
              );
              break;
            case PropertyKind.DATE_TIME:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.DATE_TIME,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.DATE:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.DATE,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.TIME:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.TIME,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.DECIMAL:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.DECIMAL,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.EMAIL_ADDRESS:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.EMAIL_ADDRESS,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.IBAN:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.IBAN,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.LIST:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.LIST,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.PASSWORD:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.PASSWORD,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.PHONE_NUMBER:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.PHONE_NUMBER,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.PRICE:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.PRICE,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.URL:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.URL,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.STRING:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.STRING,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.TEXT:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.TEXT,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.INTEGER:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.INTEGER,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            case PropertyKind.BOOLEAN:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.BOOLEAN,
                  model,
                  property,
                  variable,
                ),
              );
              break;
            default:
              editForm.descendants.push(
                makeBettyUpdateInput(
                  BettyPrefabs.STRING,
                  model,
                  property,
                  variable,
                ),
              );
          }
          // eslint-disable-next-line no-console
          return console.warn('PropertyKind not found');
        });
      }

      save(newPrefab);
    },
    buttons: () => (
      <BoxComp direction="row" justify="between">
        <BoxComp direction="row" margin="2rem">
          <Buttoncomp
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
          <Buttoncomp
            label="Next"
            size="large"
            disabled={stepNumber === stepper.stepAmount}
            onClick={() => {
              const newStepnumber = stepNumber + 1;
              setStepNumber(newStepnumber);
            }}
            primary
          />
        </BoxComp>
        <BoxComp>
          <Footer
            onClose={close}
            onSave={stepNumber === stepper.stepAmount && stepper.onSave}
          />
        </BoxComp>
      </BoxComp>
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

export default prefab(
  'Backoffice(TS)',
  attributes,
  beforeCreate,
  prefabStructure,
);
