import * as React from 'react';
import {
  prefab,
  Icon,
  option,
  text,
  sizes,
  size,
  showIf,
  toggle,
  color,
  ThemeColor,
  PrefabReference,
  variable,
  font,
  showIfTrue,
  PrefabComponent,
  PrefabInteraction,
  PrefabComponentOption,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import {
  Box as prefabBox,
  Column,
  boxOptions,
  columnOptions,
  Grid,
  gridOptions,
  Row,
  rowOptions,
  Text as TextPrefab,
  textOptions,
  AppBar,
  appBarOptions,
  OpenPageButton,
  openPageButtonOptions,
  DataTable,
  dataTableOptions,
  DataContainer,
  Paper,
  paperOptions,
} from './structures';
import { IdPropertyProps, ModelQuery, Properties } from './types';

const interactions = [
  {
    name: 'Show',
    sourceEvent: 'OnRowClick',
    ref: {
      targetComponentId: '#detailsColumn',
      sourceComponentId: '#dataTable',
    },
    type: 'Custom',
  },
] as PrefabInteraction[];

const attrs = {
  icon: Icon.DataList,
  type: 'page',
  description:
    'This page contains a data table with detail view, vertically oriented',
  detail:
    'Display your data in a Data Table by connecting a model. The details of this data is shown on the same page via a detail view (vertically oriented). This page template also contains an App Bar on top of the page.',
  previewUrl: 'https://preview.betty.app/overview-and-detail-view',
  previewImage:
    'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/Page_Template_Overview_And_Detail_View.jpg',
  category: 'LAYOUT',
  interactions,
};

const prefabStructure: PrefabComponent[] = [
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
                  prefabBox(
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
                          prefabBox(
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
                                          logoSource: variable('Logo', {
                                            value: [
                                              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                                            ],
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
                                                { value: ['Menu 1'] },
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
                                                { value: ['Menu 2'] },
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
                  prefabBox(
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
                      Row({}, [
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
                              innerSpacing: sizes('Inner space', {
                                value: ['L', 'L', 'L', 'L'],
                              }),
                            },
                          },
                          [
                            DataTable(
                              {
                                ref: { id: '#dataTable' },
                                options: {
                                  ...dataTableOptions,
                                  background: color('Background', {
                                    value: ThemeColor.WHITE,
                                  }),
                                  variant: option('CUSTOM', {
                                    label: 'Variant',
                                    value: 'outlined',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Flat', value: 'flat' },
                                        {
                                          name: 'Elevation',
                                          value: 'elevation',
                                        },
                                        { name: 'Outlined', value: 'outlined' },
                                      ],
                                    },
                                  }),
                                  square: toggle('Square', { value: true }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                },
                              },
                              [],
                            ),
                          ],
                        ),
                      ]),
                      Row({}, [
                        Column(
                          {
                            ref: { id: '#detailsColumn' },
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
                              innerSpacing: sizes('Inner space', {
                                value: ['L', 'L', 'L', 'L'],
                              }),
                              visible: toggle('Toggle visibility', {
                                value: false,
                                configuration: {
                                  as: 'VISIBILITY',
                                },
                              }),
                            },
                          },
                          [
                            DataContainer(
                              {
                                ref: { id: '#dataContainer' },
                              },
                              [
                                Paper(
                                  {
                                    options: {
                                      ...paperOptions,
                                      square: toggle('Square', { value: true }),
                                      variant: option('CUSTOM', {
                                        label: 'Variant',
                                        value: 'outlined',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            { name: 'Flat', value: 'flat' },
                                            {
                                              name: 'Elevation',
                                              value: 'elevation',
                                            },
                                            {
                                              name: 'Outlined',
                                              value: 'outlined',
                                            },
                                          ],
                                        },
                                      }),
                                    },
                                  },
                                  [
                                    Row(
                                      {
                                        ref: { id: '#detailRow' },
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
                                              innerSpacing: sizes(
                                                'Inner space',
                                                {
                                                  value: [
                                                    'M',
                                                    'M',
                                                    '0rem',
                                                    'M',
                                                  ],
                                                },
                                              ),
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
                                              columnWidthTabletLandscape:
                                                option('CUSTOM', {
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                }),
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                },
                                              ),
                                              columnWidthMobile: option(
                                                'CUSTOM',
                                                {
                                                  value: '12',
                                                  label:
                                                    'Column width (mobile)',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            TextPrefab(
                                              {
                                                options: {
                                                  ...textOptions,
                                                  content: variable('Content', {
                                                    value: ['Details'],
                                                    configuration: {
                                                      as: 'MULTILINE',
                                                    },
                                                  }),
                                                  type: font('Text style', {
                                                    value: ['Title4'],
                                                  }),
                                                },
                                              },
                                              [],
                                            ),
                                          ],
                                        ),
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
                                              columnWidth: option('CUSTOM', {
                                                label: 'Column width',
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
                                              columnWidthTabletLandscape:
                                                option('CUSTOM', {
                                                  label:
                                                    'Column width (tablet landscape)',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                }),
                                              columnWidthTabletPortrait: option(
                                                'CUSTOM',
                                                {
                                                  value: '6',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                },
                                              ),
                                              columnWidthMobile: option(
                                                'CUSTOM',
                                                {
                                                  value: '12',
                                                  label:
                                                    'Column width (mobile)',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                },
                                              ),
                                            },
                                            ref: {
                                              id: '#oddDetailColumn',
                                            },
                                          },
                                          [],
                                        ),
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
                                              columnWidth: option('CUSTOM', {
                                                label: 'Column width',
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
                                              columnWidthTabletLandscape:
                                                option('CUSTOM', {
                                                  label:
                                                    'Column width (tablet landscape)',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                }),
                                              columnWidthTabletPortrait: option(
                                                'CUSTOM',
                                                {
                                                  value: '6',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                },
                                              ),
                                              columnWidthMobile: option(
                                                'CUSTOM',
                                                {
                                                  value: '12',
                                                  label:
                                                    'Column width (mobile)',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                },
                                              ),
                                            },
                                            ref: {
                                              id: '#evenDetailColumn',
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
                      ]),
                    ],
                  ),
                  prefabBox(
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
                          ref: { id: '#footerBoxInnerSpacing' },
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
                      prefabBox(
                        {
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              ref: { id: '#footerBoxInnerSpacing' },
                              value: ['L', 'L', 'L', 'L'],
                            }),
                          },
                        },
                        [
                          TextPrefab(
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
                                useInnerHtml: toggle('Display Rich Text', {
                                  value: false,
                                }),
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
    Content,
    Header,
    Field,
    Footer,
    ModelSelector,
    PropertiesSelector,
    Text,
    Box,
    Button,
    PartialSelector,
  },
  helpers: { useModelQuery, setOption, cloneStructure, createBlacklist },
}: BeforeCreateArgs) => {
  const [modelId, setModelId] = React.useState('');
  const [properties, setProperties] = React.useState<Properties[]>([]);
  const [detailProperties, setDetailProperties] = React.useState<Properties[]>(
    [],
  );
  const [modelValidation, setModelValidation] = React.useState(false);
  const [propertiesValidation, setPropertiesValidation] = React.useState(false);
  const [detailsValidation, setDetailsValidation] = React.useState(false);
  const [stepNumber, setStepNumber] = React.useState(1);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();

  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
    onCompleted: ({ model: dataModel }: ModelQuery) => {
      setIdProperty(
        dataModel.properties.find(
          ({ name }: { name: string }) => name === 'id',
        ),
      );
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

  const disabledKinds = createBlacklist([
    'BELONGS_TO',
    'BOOLEAN',
    'BOOLEAN_EXPRESSION',
    'DATE',
    'DATE_EXPRESSION',
    'DATE_TIME',
    'DATE_TIME_EXPRESSION',
    'DECIMAL',
    'DECIMAL_EXPRESSION',
    'EMAIL',
    'EMAIL_ADDRESS',
    'ENUM',
    'FILE',
    'FLOAT',
    'GOOGLE_DOCUMENT',
    'HAS_ONE',
    'IBAN',
    'IMAGE',
    'INTEGER',
    'INTEGER_EXPRESSION',
    'LIST',
    'MINUTES',
    'MINUTES_EXPRESSION',
    'PERIODIC_COUNT',
    'PHONE_NUMBER',
    'PRICE',
    'PRICE_EXPRESSION',
    'RICH_TEXT',
    'SERIAL',
    'STRING',
    'STRING_EXPRESSION',
    'TEXT',
    'TEXT_EXPRESSION',
    'TIME',
    'URL',
    'ZIPCODE',
  ]);

  const stepper = {
    setStep: (step: number) => {
      if (step === 1) {
        return (
          <>
            <Box pad={{ bottom: '15px' }}>
              <Box pad={{ bottom: '15px' }}>
                <Text size="medium" weight="bolder">
                  Select partials
                </Text>
              </Box>
              <Box pad={{ bottom: '15px' }}>
                <Text color="grey700">
                  By using a partial for the top menu and footer you can easily
                  reuse the same structure without having to go through every
                  page.
                </Text>
              </Box>
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
            </Box>
            <Box pad={{ bottom: '15px' }}>
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
            </Box>
          </>
        );
      }
      if (step === 2) {
        return (
          <>
            <Field
              label="Model for data table"
              error={
                modelValidation && (
                  <Text color="#e82600">Selecting a model is required</Text>
                )
              }
            >
              <ModelSelector
                onChange={(value: string) => {
                  setModelValidation(false);
                  setModelId(value);
                  setPropertiesValidation(false);
                  setDetailsValidation(false);
                }}
                value={modelId}
              />
            </Field>
            <Field
              label="Columns in data table"
              error={
                propertiesValidation && (
                  <Text color="#e82600">Selecting a property is required</Text>
                )
              }
            >
              <PropertiesSelector
                modelId={modelId}
                value={properties}
                disabledKinds={disabledKinds}
                onChange={(value: Properties[]) => {
                  setPropertiesValidation(!value.length);
                  setProperties(value);
                }}
              />
            </Field>
          </>
        );
      }
      return (
        <Field
          label="Details"
          error={
            detailsValidation && (
              <Text color="#e82600">Selecting a property is required</Text>
            )
          }
        >
          <Text color="#666D85">
            These properties will be visible in the detail section
          </Text>
          <PropertiesSelector
            modelId={modelId}
            value={detailProperties}
            onChange={(value: Properties[]) => {
              setDetailsValidation(!value.length);
              setDetailProperties(value);
            }}
          />
        </Field>
      );
    },
    onSave: () => {
      if (!modelId || !properties.length || !detailProperties.length) {
        setModelValidation(!modelId);
        setPropertiesValidation(!properties.length);
        setDetailsValidation(!detailProperties.length);
        return;
      }
      const newPrefab = { ...originalPrefab };

      const dataTable = treeSearch('#dataTable', newPrefab.structure);
      if (!dataTable) throw new Error('No datatable component found');
      setOption(
        dataTable,
        'title',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: [`${data?.model.name}s`],
        }),
      );
      setOption(dataTable, 'model', (originalOption: PrefabComponentOption) => {
        return {
          ...originalOption,
          value: modelId,
        };
      });

      const dataContainer = treeSearch('#dataContainer', newPrefab.structure);
      if (!dataContainer) throw new Error('No datacontainer component found');
      setOption(
        dataContainer,
        'model',
        (originalOption: PrefabComponentOption) => {
          return {
            ...originalOption,
            value: modelId,
          };
        },
      );

      properties.forEach((property) => {
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
          (originalOption: PrefabComponentOption) => {
            return {
              ...originalOption,
              value: newProperty as any,
            };
          },
        );
        setOption(
          dataTableColumnStructure,
          'type',
          (originalOption: PrefabComponentOption) => {
            return {
              ...originalOption,
              value: 'Title6',
            };
          },
        );
        setOption(
          dataTableColumnStructure,
          'sortable',
          (originalOption: PrefabComponentOption) => {
            return {
              ...originalOption,
              value: true,
            };
          },
        );
        if (property.kind === 'IMAGE') {
          const media = cloneStructure('Media');
          if (media.type !== 'COMPONENT') {
            throw new Error(`expected component prefab, found ${media.type}`);
          }
          setOption(media, 'type', (originalOption: PrefabComponentOption) => ({
            ...originalOption,
            value: 'data',
          }));
          setOption(
            media,
            'propertyFileSource',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: property.id,
            }),
          );
          dataTableColumnStructure.descendants.push(media);
        }
        dataTable.descendants.push(dataTableColumnStructure);
      });

      const detailRow = treeSearch('#detailRow', newPrefab.structure);
      if (!detailRow) throw new Error('No detail row component found');
      const newDetail = (isOddColumn: boolean, detail: Properties) => {
        const column = cloneStructure('1 Column');
        if (column.type !== 'COMPONENT') {
          throw new Error(`expected component prefab, found ${column.type}`);
        }
        setOption(
          column,
          'maxRowWidth',
          (originalOption: PrefabComponentOption) => {
            return {
              ...originalOption,
              value: 'XL',
            };
          },
        );

        const label = cloneStructure('Text');
        if (label.type !== 'COMPONENT') {
          throw new Error(`expected component prefab, found ${label.type}`);
        }
        setOption(label, 'content', (originalOption: PrefabComponentOption) => {
          return {
            ...originalOption,
            value: [`${detail.label}`],
          };
        });
        setOption(label, 'type', (originalOption: PrefabComponentOption) => {
          return {
            ...originalOption,
            value: ['Title6'],
          };
        });
        setOption(
          label,
          'fontWeight',
          (originalOption: PrefabComponentOption) => {
            return {
              ...originalOption,
              value: '500',
            };
          },
        );
        if (column.descendants[0].type !== 'COMPONENT') {
          throw new Error(`expected component prefab, found ${column.type}`);
        }
        column.descendants[0].descendants.push(label);

        if (detail.kind === 'IMAGE') {
          const media = cloneStructure('Media');
          if (media.type !== 'COMPONENT') {
            throw new Error(`expected component prefab, found ${media.type}`);
          }
          setOption(media, 'type', (originalOption: PrefabComponentOption) => ({
            ...originalOption,
            value: 'data',
          }));
          setOption(
            media,
            'propertyFileSource',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: detail.id,
            }),
          );
          column.descendants[0].descendants.push(media);
        } else {
          const valueText = cloneStructure('Text');
          if (valueText.type !== 'COMPONENT') {
            throw new Error(
              `expected component prefab, found ${valueText.type}`,
            );
          }
          setOption(
            valueText,
            'content',
            (originalOption: PrefabComponentOption) => {
              return {
                ...originalOption,
                value: [enrichVarObj(detail)],
              };
            },
          );
          column.descendants[0].descendants.push(valueText);
        }

        const detailColumn = isOddColumn
          ? treeSearch('#oddDetailColumn', newPrefab.structure)
          : treeSearch('#evenDetailColumn', newPrefab.structure);
        if (!detailColumn) throw new Error('No detail column component found');

        return detailColumn.descendants.push(column);
      };

      detailProperties.forEach((detail, index) => {
        const isEven = (num: number) => num % 2 === 0;
        newDetail(isEven(index), detail);
      });

      if (idProperty && newPrefab.interactions) {
        newPrefab.interactions.push({
          name: 'setCurrentRecord',
          sourceEvent: 'OnRowClick',
          targetOptionName: 'currentRecord',
          parameters: [
            {
              id: [idProperty.id],
              parameter: 'argument',
            },
          ],
          ref: {
            sourceComponentId: '#dataTable',
            targetComponentId: '#dataContainer',
          },
          type: 'Global',
        } as PrefabInteraction);
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
              if (stepNumber === 2 || stepNumber === 3) {
                if (!modelId) {
                  setModelValidation(true);
                  return;
                }
                if (!properties.length) {
                  setPropertiesValidation(true);
                  return;
                }
              }
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
            canSave={stepNumber === stepper.stepAmount}
          />
        </Box>
      </Box>
    ),
    progressBar: () => {
      return (
        <Box
          justify="center"
          margin={{ bottom: '2rem', left: '2rem', top: '-1rem' }}
        >
          <Text size="medium" weight="bold">{`Step: ${stepNumber + 1} / ${
            stepper.stepAmount + 1
          }`}</Text>
        </Box>
      );
    },
    stepAmount: 3,
  };

  return (
    <>
      <Header onClose={close} title="Configure overview and detail view" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default prefab(
  'Overview, with inline details',
  attrs,
  beforeCreate,
  prefabStructure,
);
