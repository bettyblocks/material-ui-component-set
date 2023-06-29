import * as React from 'react';

import {
  prefab as makePrefab,
  Icon,
  sizes,
  variable,
  option,
  ThemeColor,
  color,
  font,
  PrefabReference,
  size,
  showIf,
  toggle,
  showIfTrue,
  component,
  buttongroup,
  PrefabInteraction,
  icon,
  hideIf,
  BeforeCreateArgs,
  PrefabComponent,
  PrefabComponentOption,
  text,
} from '@betty-blocks/component-sdk';

import {
  AppBar,
  appBarOptions,
  Box,
  boxOptions,
  Button,
  buttonOptions,
  Column,
  columnOptions,
  DataList,
  dataListOptions,
  Grid,
  gridOptions,
  OpenPageButton,
  openPageButtonOptions,
  Row,
  rowOptions,
  Text,
  textOptions,
} from './structures';
import { options as defaults } from './structures/ActionJSForm/options';
import {
  IdPropertyProps,
  ModelProps,
  ModelQuery,
  PropertyStateProps,
} from './types';
import { PermissionType } from './types/types';

const interactions = [
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#DropdownColumn',
      sourceComponentId: '#DropdownButton',
    },
    type: 'Custom',
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#UpButton',
      sourceComponentId: '#DropdownButton',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#DropdownButton',
      sourceComponentId: '#DropdownButton',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#DropdownColumn',
      sourceComponentId: '#UpButton',
    },
    type: 'Custom',
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#DropdownButton',
      sourceComponentId: '#UpButton',
    },
    type: 'Custom',
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#UpButton',
      sourceComponentId: '#UpButton',
    },
    type: 'Custom',
  },
  {
    name: 'Submit',
    sourceEvent: 'onChange',
    ref: {
      targetComponentId: '#formId',
      sourceComponentId: '#checkBox',
    },
    type: 'Custom',
  },
] as PrefabInteraction[];

const attrs = {
  icon: Icon.DataList,
  type: 'page',
  description: 'This page contains a checklist based on your model',
  detail:
    'This page has a checklist for your model so you can check and uncheck items. Their status is being updated directly',
  previewUrl: 'https://preview.betty.app/checklist',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Checklist',
  category: 'LAYOUT',
  interactions,
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
              value: 'flexible',
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
            columnHeight: text('Height', {
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
                    height: size('Height', {
                      value: '',
                      configuration: {
                        as: 'UNIT',
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
                  },
                },
                [
                  Box(
                    {
                      ref: { id: '#Header' },

                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                      },
                    },
                    [
                      Column(
                        {
                          options: {
                            ...columnOptions,
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
                                backgroundOptions: toggle(
                                  'Show background options',
                                  {
                                    value: true,
                                  },
                                ),
                                backgroundColor: color('Background color', {
                                  value: ThemeColor.PRIMARY,
                                  configuration: {
                                    condition: showIf(
                                      'backgroundOptions',
                                      'EQ',
                                      true,
                                    ),
                                  },
                                }),
                              },
                            },
                            [
                              Row({}, [
                                Column(
                                  {
                                    options: {
                                      ...columnOptions,
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                  },
                                  [
                                    AppBar(
                                      {
                                        options: {
                                          ...appBarOptions,
                                          urlFileSource: variable('Source', {
                                            value: [
                                              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                                            ],
                                            configuration: {
                                              placeholder:
                                                'Starts with https:// or http://',
                                              as: 'MULTILINE',
                                              condition: showIf(
                                                'type',
                                                'EQ',
                                                'url',
                                              ),
                                            },
                                          }),
                                          title: variable('Title', {
                                            value: [],
                                          }),
                                        },
                                      },
                                      [
                                        OpenPageButton(
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
                                            options: {
                                              ...openPageButtonOptions,
                                              buttonText: variable(
                                                'Button text',
                                                {
                                                  value: ['Menu 1'],
                                                },
                                              ),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                    'M',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [],
                                        ),
                                        OpenPageButton(
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
                                            options: {
                                              ...openPageButtonOptions,
                                              buttonText: variable(
                                                'Button text',
                                                {
                                                  value: ['Menu 2'],
                                                },
                                              ),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                    '0rem',
                                                  ],
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
                              ]),
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
                    [
                      Row({}, [
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
                                    value: ['Page title'],
                                    configuration: { as: 'MULTILINE' },
                                  }),
                                  type: font('Text style', {
                                    value: ['Title5'],
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['M', '0rem', '0rem', '0rem'],
                                  }),
                                },
                              },
                              [],
                            ),
                            Text(
                              {
                                options: {
                                  ...textOptions,
                                  content: variable('Content', {
                                    value: [
                                      'Please add a subline here or just delete it if you want.',
                                    ],
                                    configuration: { as: 'MULTILINE' },
                                  }),
                                  type: font('Text style', {
                                    value: ['Body1'],
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['M', '0rem', 'XL', '0rem'],
                                  }),
                                },
                              },
                              [],
                            ),
                            DataList(
                              {
                                options: {
                                  ...dataListOptions,
                                  pagination: option('CUSTOM', {
                                    label: 'Pagination',
                                    value: 'whenNeeded',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      dependsOn: 'model',
                                      allowedInput: [
                                        { name: 'Always', value: 'always' },
                                        {
                                          name: 'When needed',
                                          value: 'whenNeeded',
                                        },
                                        { name: 'Never', value: 'never' },
                                      ],
                                    },
                                  }),
                                },
                                ref: {
                                  id: '#dataList',
                                },
                              },
                              [
                                component(
                                  'Form',
                                  {
                                    label: 'Update Form',
                                    options: defaults,
                                    ref: { id: '#formId' },
                                  },
                                  [
                                    Box(
                                      {
                                        options: {
                                          ...boxOptions,
                                          outerSpacing: sizes('Outer space', {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              'M',
                                              '0rem',
                                            ],
                                          }),
                                          innerSpacing: sizes('Inner space', {
                                            value: ['0rem', 'M', '0rem', 'M'],
                                          }),
                                          backgroundColor: color(
                                            'Background color',
                                            {
                                              value: ThemeColor.WHITE,
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
                                                  [
                                                    'Justified',
                                                    'space-between',
                                                  ],
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
                                              width: size('Width', {
                                                value: '100%',
                                                configuration: {
                                                  as: 'UNIT',
                                                },
                                              }),
                                              innerSpacing: sizes(
                                                'Inner space',
                                                {
                                                  value: ['S', 'S', 'S', 'S'],
                                                },
                                              ),
                                            },
                                            ref: { id: '#formBox' },
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
                                                      [
                                                        'Justified',
                                                        'space-between',
                                                      ],
                                                    ],
                                                    {
                                                      value: 'flex-end',
                                                      configuration: {
                                                        dataType: 'string',
                                                      },
                                                    },
                                                  ),
                                                  width: size('Width', {
                                                    value: '25%',
                                                    configuration: {
                                                      as: 'UNIT',
                                                    },
                                                  }),
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
                                                Button(
                                                  {
                                                    ref: {
                                                      id: '#DropdownButton',
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
                                                          value: 'black',
                                                        },
                                                        fontFamily: 'Roboto',
                                                        fontSize: '0.875rem',
                                                        fontStyle: 'none',
                                                        fontWeight: '400',
                                                        padding: [
                                                          '0rem',
                                                          '0rem',
                                                        ],
                                                        textDecoration: 'none',
                                                        textTransform: 'none',
                                                      },
                                                    },
                                                    options: {
                                                      ...buttonOptions,
                                                      buttonText: variable(
                                                        'Button text',
                                                        { value: [''] },
                                                      ),
                                                      icon: icon('Icon', {
                                                        value:
                                                          'KeyboardArrowDown',
                                                      }),
                                                      size: option('CUSTOM', {
                                                        value: 'small',
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
                                                Button(
                                                  {
                                                    ref: { id: '#UpButton' },
                                                    style: {
                                                      overwrite: {
                                                        backgroundColor: {
                                                          type: 'STATIC',
                                                          value: 'transparent',
                                                        },
                                                        boxShadow: 'none',
                                                        color: {
                                                          type: 'THEME_COLOR',
                                                          value: 'black',
                                                        },
                                                        fontFamily: 'Roboto',
                                                        fontSize: '0.875rem',
                                                        fontStyle: 'none',
                                                        fontWeight: '400',
                                                        padding: [
                                                          '0rem',
                                                          '0rem',
                                                        ],
                                                        textDecoration: 'none',
                                                        textTransform: 'none',
                                                      },
                                                    },
                                                    options: {
                                                      ...buttonOptions,
                                                      visible: toggle(
                                                        'Toggle visibility',
                                                        {
                                                          value: false,
                                                          configuration: {
                                                            as: 'VISIBILITY',
                                                          },
                                                        },
                                                      ),
                                                      buttonText: variable(
                                                        'Button text',
                                                        { value: [''] },
                                                      ),
                                                      icon: icon('Icon', {
                                                        value:
                                                          'KeyboardArrowUp',
                                                      }),
                                                      size: option('CUSTOM', {
                                                        value: 'small',
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
                                          ],
                                        ),
                                        Row({}, [
                                          Column(
                                            {
                                              ref: { id: '#DropdownColumn' },
                                              options: {
                                                ...columnOptions,
                                                visible: toggle(
                                                  'Toggle visibility',
                                                  {
                                                    value: false,
                                                    configuration: {
                                                      as: 'VISIBILITY',
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
                                                      'L',
                                                    ],
                                                  },
                                                ),
                                              },
                                            },
                                            [
                                              Text(
                                                {
                                                  ref: {
                                                    id: '#descriptionText',
                                                  },
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        value: ['Description'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Text style', {
                                                      value: ['Body1'],
                                                    }),
                                                    textColor: color(
                                                      'Text color',
                                                      {
                                                        value: ThemeColor.DARK,
                                                      },
                                                    ),
                                                  },
                                                },
                                                [],
                                              ),
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
                        ),
                      ]),
                    ],
                  ),
                  Box(
                    {
                      ref: { id: '#Footer' },
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
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
                          },
                        }),
                        backgroundColorAlpha: option('NUMBER', {
                          label: 'Background color opacity',
                          value: 20,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
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
                                  value: ['Powered by Bettyblocks'],
                                  configuration: { as: 'MULTILINE' },
                                }),
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
                                type: font('Text style', { value: ['Body1'] }),
                                styles: toggle('Styles', { value: true }),
                                textColor: color('Text color', {
                                  value: ThemeColor.MEDIUM,
                                  configuration: {
                                    condition: showIfTrue('styles'),
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
          ),
        ],
      ),
    ],
  ),
];

const beforeCreate = ({
  save,
  close,
  prefab: originalPrefab,
  components: {
    Header,
    Content,
    Field,
    Footer,
    Text: TextComp,
    Box: BoxComp,
    ModelSelector,
    PropertySelector,
    Button: ButtonComp,
    PartialSelector,
  },
  helpers: {
    useModelQuery,
    prepareAction,
    getPageAuthenticationProfileId,
    setOption,
    makeBettyUpdateInput,
    createBlacklist,
    createUuid,
    BettyPrefabs,
  },
}: BeforeCreateArgs) => {
  const [showValidation, setShowValidation] = React.useState(false);
  const [titleValidation, setTitleValidation] = React.useState(false);
  const [descriptionValidation, setDescriptionValidation] =
    React.useState(false);
  const [checkBoxValidation, setCheckBoxValidation] = React.useState(false);
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState<ModelProps>();
  const [titleProperty, setTitleProperty] = React.useState<PropertyStateProps>({
    id: '',
  });
  const [descriptionProperty, setDescriptionProperty] =
    React.useState<PropertyStateProps>({
      id: '',
    });
  const [checkboxProperty, setCheckboxProperty] =
    React.useState<PropertyStateProps>({
      id: '',
    });
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  const [stepNumber, setStepNumber] = React.useState(1);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');
  const formId = createUuid();
  const datalistId = createUuid();
  const permissions: PermissionType = 'private';

  const pageAuthenticationProfileId = getPageAuthenticationProfileId();

  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
    onCompleted: (result: ModelQuery) => {
      setModel(result.model);
      setIdProperty(result.model.properties.find(({ name }) => name === 'id'));
    },
  });

  const treeSearch = (
    dirName: string,
    array: PrefabReference[],
  ): PrefabComponent | undefined => {
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
  };

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

  const disabledKinds = createBlacklist(['BELONGS_TO', 'BOOLEAN', 'HAS_ONE']);

  const stepper = {
    setStep: (step: number) => {
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
                  By using a partial for the top menu and footer you can easily
                  reuse the same structure without having to go through every
                  page.
                </TextComp>
              </BoxComp>
              <Field label="TOP MENU PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(headerId: string) => {
                    setHeaderPartialId(headerId);
                  }}
                  preSelected="Top menu"
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
                  preSelected="Footer"
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
        <BoxComp direction="row">
          <BoxComp direction="column" basis="2/3">
            <Field
              label="Select model"
              error={
                showValidation && (
                  <TextComp color="#e82600">
                    Selecting a model is required
                  </TextComp>
                )
              }
            >
              <ModelSelector
                onChange={(value: string) => {
                  setShowValidation(false);
                  setModelId(value);
                  setTitleProperty({ id: '' });
                  setDescriptionProperty({ id: '' });
                  setCheckboxProperty({ id: '' });
                }}
                value={modelId}
              />
            </Field>
            <hr />
            {model && (
              <>
                <Field label="Title" info="Shows the title of Expansion Panel">
                  <PropertySelector
                    modelId={modelId}
                    onChange={(value: PropertyStateProps) => {
                      setTitleProperty(value);
                    }}
                    value={titleProperty}
                    disabled={!modelId}
                    error={
                      titleValidation && (
                        <TextComp color="#e82600">
                          Selecting a title property is required
                        </TextComp>
                      )
                    }
                  />
                </Field>
                <Field
                  label="Description"
                  info="Shows the text within the Expansion Panel"
                >
                  <PropertySelector
                    modelId={modelId}
                    onChange={(value: PropertyStateProps) => {
                      setDescriptionProperty(value);
                    }}
                    value={descriptionProperty}
                    disabled={!modelId}
                    error={
                      descriptionValidation && (
                        <TextComp color="#e82600">
                          Selecting a description property is required
                        </TextComp>
                      )
                    }
                  />
                </Field>
                <Field
                  label="Checklist checked"
                  info="Checks if the value is true or false"
                >
                  <PropertySelector
                    modelId={modelId}
                    onChange={(value: PropertyStateProps) => {
                      setCheckboxProperty(value);
                    }}
                    value={checkboxProperty}
                    disabled={!modelId}
                    error={
                      checkBoxValidation && (
                        <TextComp color="#e82600">
                          Selecting a description property is required
                        </TextComp>
                      )
                    }
                    disabledKinds={disabledKinds}
                  />
                </Field>
              </>
            )}
          </BoxComp>
        </BoxComp>
      );
    },
    onSave: async () => {
      // validation
      if (!modelId) {
        setShowValidation(true);
        return;
      }
      if (!titleProperty.id) {
        setTitleValidation(true);
        return;
      }
      if (!descriptionProperty.id) {
        setDescriptionValidation(true);
        return;
      }
      if (!checkboxProperty.id) {
        setCheckBoxValidation(true);
        return;
      }
      const newPrefab = { ...originalPrefab };

      // set datalist
      const dataList = treeSearch('#dataList', newPrefab.structure);
      if (!dataList) throw new Error('No dataList component found');

      dataList.id = datalistId;
      setOption(dataList, 'model', (opts) => ({
        ...opts,
        value: modelId,
      }));

      // set edit action
      const transformProp = (obj: any) => {
        const outputProp = obj;
        outputProp.kind = 'BOOLEAN';
        outputProp.defaultValue = {
          __typename: 'DefaultValueType',
          type: 'VALUE',
          value: 'false',
          expressionInfo: null,
        };
        if (data && data.model) {
          const property = data.model.properties.find(
            (prop: any) => prop.id === obj.id[0],
          );
          if (property) {
            outputProp.label = property.label;
          }
        }
        return outputProp;
      };

      if (model && idProperty && checkboxProperty) {
        const editForm = treeSearch('#formId', newPrefab.structure);
        if (!editForm) throw new Error('No editForm component found');

        editForm.id = formId;
        const result = await prepareAction(
          formId,
          idProperty,
          [...transformProp(checkboxProperty)],
          'update',
          undefined,
          undefined,
          permissions,
          pageAuthenticationProfileId,
        );
        setOption(editForm, 'actionId', (opts: PrefabComponentOption) => ({
          ...opts,
          value: result.action.actionId,
          configuration: { disabled: true },
        }));
        setOption(
          editForm,
          'recordVariable',
          (opts: PrefabComponentOption) => ({
            ...opts,
            value: result.recordInputVariable.id,
          }),
        );
        setOption(editForm, 'model', (opts: PrefabComponentOption) => ({
          ...opts,
          value: modelId,
          configuration: {
            disabled: true,
          },
        }));

        Object.values(result.variables).forEach(([property, vari]) => {
          const checkBoxInput = makeBettyUpdateInput(
            BettyPrefabs.BOOLEAN,
            model,
            property,
            vari,
          );

          if (checkBoxInput.type === 'COMPONENT') {
            checkBoxInput.ref = { id: '#checkBox' };
            setOption(
              checkBoxInput,
              'label',
              (opts: PrefabComponentOption) => ({
                ...opts,
                value: [enrichVarObj(titleProperty)],
              }),
            );
            setOption(
              checkBoxInput,
              'textColor',
              (opts: PrefabComponentOption) => ({
                ...opts,
                value: 'Primary',
              }),
            );
          }

          setOption(editForm, 'filter', (opts: PrefabComponentOption) => ({
            ...opts,
            value: {
              [idProperty.id]: {
                eq: {
                  id: [idProperty.id],
                  type: 'PROPERTY',
                  componentId: datalistId,
                },
              },
            },
          }));

          const formBox = treeSearch('#formBox', newPrefab.structure);
          if (!formBox) throw new Error('No form box component found');

          formBox.descendants = [checkBoxInput, ...formBox.descendants];
        });
      }

      const descriptionText = treeSearch(
        '#descriptionText',
        newPrefab.structure,
      );

      if (descriptionText && descriptionProperty.id) {
        setOption(
          descriptionText,
          'content',
          (opts: PrefabComponentOption) => ({
            ...opts,
            value: [enrichVarObj(descriptionProperty)],
          }),
        );
      }
      const prefabFooter = treeSearch('#Footer', newPrefab.structure);
      const prefabHeader = treeSearch('#Header', newPrefab.structure);
      if (headerPartialId && prefabHeader) {
        prefabHeader.descendants = [
          { type: 'PARTIAL', partialId: headerPartialId },
        ];
      }

      if (footerPartialId && prefabFooter) {
        prefabFooter.descendants = [
          { type: 'PARTIAL', partialId: footerPartialId },
        ];
      }

      save(newPrefab);
    },
    buttons: () => (
      <BoxComp direction="row" justify="between">
        <BoxComp direction="row" margin="2rem">
          <ButtonComp
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
          <ButtonComp
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
            onSave={stepper.onSave}
            canSave={stepNumber === stepper.stepAmount}
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
      <Header onClose={close} title="Configure checklist page" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default makePrefab(
  'Form checklist',
  attrs,
  beforeCreate,
  prefabStructure,
);
