import * as React from 'react';

import {
  prefab as makePrefab,
  Icon,
  sizes,
  variable,
  option,
  icon,
  ThemeColor,
  color,
  font,
  hideIf,
  PrefabReference,
  component,
} from '@betty-blocks/component-sdk';

import {
  Box,
  boxOptions,
  Button,
  buttonOptions,
  Column,
  columnOptions,
  DataList,
  Row,
  rowOptions,
  Text,
  textOptions,
} from './structures';
import { options as defaults } from './structures/ActionJSForm/options';
import { CheckboxInput } from './structures/CheckboxInput';

const attrs = {
  name: 'Checklist page test',
  icon: Icon.DataList,
  type: 'page',
  description:
    'Toggle the view of your content between a card view or a list view.',
  detail:
    'Display your data in different views such as a list or a card view via a toggle. This page template also contains a custom search functionality to filter your data.',
  previewUrl: 'https://preview.betty.app/card-and-list-view',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Card_And_List_View.jpg',
  category: 'LAYOUT',
};

const prefabStructure = [
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
            [],
          ),
          Text(
            {
              options: {
                ...textOptions,
                type: font('Font', {
                  value: ['Title4'],
                }),
                textColor: color('Text color', {
                  value: ThemeColor.DARK,
                }),
              },
            },
            [],
          ),
          Text(
            {
              options: {
                ...textOptions,
                type: font('Font', {
                  value: ['Title4'],
                }),
                textColor: color('Text color', {
                  value: ThemeColor.DARK,
                }),
              },
            },
            [],
          ),
          DataList({ ref: { id: '#dataList' } }, [
            component(
              'Form Beta',
              {
                label: 'Delete Form Beta',
                options: defaults,
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
                        CheckboxInput({ ref: { id: '#titleText' } }, []),
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
                                      condition: hideIf('icon', 'EQ', 'none'),
                                    },
                                  }),
                                },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'STATIC',
                                      value: 'Transparent',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    padding: ['0rem'],
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
                                      condition: hideIf('icon', 'EQ', 'none'),
                                    },
                                  }),
                                },
                                style: {
                                  overwrite: {
                                    backgroundColor: {
                                      type: 'STATIC',
                                      value: 'Transparent',
                                    },
                                    boxShadow: 'none',
                                    color: {
                                      type: 'THEME_COLOR',
                                      value: 'white',
                                    },
                                    padding: ['0rem'],
                                  },
                                },
                              },
                              [],
                            ),
                          ],
                        ),
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
                              }),
                            },
                          },
                          [
                            Column({}, [
                              Text(
                                {
                                  ref: { id: '#descriptionText' },
                                  options: {
                                    ...textOptions,
                                    type: font('Font', {
                                      value: ['Title4'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.DARK,
                                    }),
                                  },
                                },
                                [],
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
    ],
  ),
];

const defaultHeaderstructure = {
  name: 'Column',
  options: [
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
      value: 'flexible',
      label: 'Column width',
      key: 'columnWidth',
      type: 'CUSTOM',
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
    },
    {
      value: 'flexible',
      label: 'Column width (tablet landscape)',
      key: 'columnWidthTabletLandscape',
      type: 'CUSTOM',
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
    },
    {
      value: 'flexible',
      label: 'Column width (tablet portrait)',
      key: 'columnWidthTabletPortrait',
      type: 'CUSTOM',
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
    },
    {
      value: 'flexible',
      label: 'Column width (mobile)',
      key: 'columnWidthMobile',
      type: 'CUSTOM',
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
    },
    {
      value: '',
      label: 'Height',
      key: 'columnHeight',
      type: 'TEXT',
      configuration: {
        as: 'UNIT',
      },
    },
    {
      value: 'transparent',
      label: 'Background color',
      key: 'backgroundColor',
      type: 'COLOR',
    },
    {
      type: 'CUSTOM',
      label: 'Horizontal Alignment',
      key: 'horizontalAlignment',
      value: 'inherit',
      configuration: {
        as: 'BUTTONGROUP',
        dataType: 'string',
        allowedInput: [
          { name: 'None', value: 'inherit' },
          { name: 'Left', value: 'flex-start' },
          { name: 'Center', value: 'center' },
          { name: 'Right', value: 'flex-end' },
        ],
      },
    },
    {
      type: 'CUSTOM',
      label: 'Vertical Alignment',
      key: 'verticalAlignment',
      value: 'inherit',
      configuration: {
        as: 'BUTTONGROUP',
        dataType: 'string',
        allowedInput: [
          { name: 'None', value: 'inherit' },
          { name: 'Top', value: 'flex-start' },
          { name: 'Center', value: 'center' },
          { name: 'Bottom', value: 'flex-end' },
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
      value: ['0rem', '0rem', '0rem', '0rem'],
      label: 'Inner space',
      key: 'innerSpacing',
      type: 'SIZES',
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
      value: ['Column'],
      configuration: {
        condition: {
          type: 'SHOW',
          option: 'advancedSettings',
          comparator: 'EQ',
          value: true,
        },
      },
    },
  ],
  descendants: [
    {
      name: 'Box',
      options: [
        {
          value: 'none',
          label: 'Alignment',
          key: 'alignment',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'None', value: 'none' },
              { name: 'Left', value: 'flex-start' },
              { name: 'Center', value: 'center' },
              { name: 'Right', value: 'flex-end' },
              {
                name: 'Justified',
                value: 'space-between',
              },
            ],
          },
        },
        {
          value: 'none',
          label: 'Vertical alignment',
          key: 'valignment',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'None', value: 'none' },
              { name: 'Top', value: 'flex-start' },
              { name: 'Center', value: 'center' },
              { name: 'Bottom', value: 'flex-end' },
            ],
          },
        },
        {
          value: false,
          label: 'Stretch (when in flex container)',
          key: 'stretch',
          type: 'TOGGLE',
        },
        {
          value: false,
          label: 'Transparent',
          key: 'transparent',
          type: 'TOGGLE',
        },
        {
          type: 'SIZE',
          label: 'Height',
          key: 'height',
          value: '',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          type: 'SIZE',
          label: 'Width',
          key: 'width',
          value: '',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          value: ['0rem', '0rem', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          value: ['0rem', '0rem', '0rem', '0rem'],
          label: 'Inner space',
          key: 'innerSpacing',
          type: 'SIZES',
        },
        {
          value: false,
          label: 'Show positioning options',
          key: 'positioningOptions',
          type: 'TOGGLE',
        },
        {
          value: 'static',
          label: 'Position',
          key: 'position',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Static', value: 'static' },
              {
                name: 'Relative',
                value: 'relative',
              },
              {
                name: 'Absolute',
                value: 'absolute',
              },
              { name: 'Fixed', value: 'fixed' },
              { name: 'Sticky', value: 'sticky' },
            ],
            condition: {
              type: 'SHOW',
              option: 'positioningOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'SIZE',
          label: 'Top position',
          key: 'top',
          value: '',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'positioningOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'SIZE',
          label: 'Right position',
          key: 'right',
          value: '',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'positioningOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'SIZE',
          label: 'Bottom position',
          key: 'bottom',
          value: '',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'positioningOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'SIZE',
          label: 'Left position',
          key: 'left',
          value: '',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'positioningOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: true,
          label: 'Show background options',
          key: 'backgroundOptions',
          type: 'TOGGLE',
        },
        {
          value: 'Primary',
          label: 'Background color',
          key: 'backgroundColor',
          type: 'COLOR',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'backgroundOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: 100,
          label: 'Background color opacity',
          key: 'backgroundColorAlpha',
          type: 'NUMBER',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'backgroundOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: [''],
          label: 'Background url',
          key: 'backgroundUrl',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'backgroundOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: 'initial',
          label: 'Background size',
          key: 'backgroundSize',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Initial', value: 'initial' },
              { name: 'Contain', value: 'contain' },
              { name: 'Cover', value: 'cover' },
            ],
            condition: {
              type: 'SHOW',
              option: 'backgroundOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: 'center center',
          label: 'Background position',
          key: 'backgroundPosition',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Left top',
                value: 'left top',
              },
              {
                name: 'Left center',
                value: 'left center',
              },
              {
                name: 'Left bottom',
                value: 'left bottom',
              },
              {
                name: 'Center top',
                value: 'center top',
              },
              {
                name: 'Center center',
                value: 'center center',
              },
              {
                name: 'Center bottom',
                value: 'center bottom',
              },
              {
                name: 'Right top',
                value: 'right top',
              },
              {
                name: 'Right center',
                value: 'right center',
              },
              {
                name: 'Right bottom',
                value: 'right bottom',
              },
            ],
            condition: {
              type: 'SHOW',
              option: 'backgroundOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: 'no-repeat',
          label: 'Background repeat',
          key: 'backgroundRepeat',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'None', value: 'no-repeat' },
              { name: 'X', value: 'repeat-x' },
              { name: 'Y', value: 'repeat-y' },
              { name: 'All', value: 'repeat' },
            ],
            condition: {
              type: 'SHOW',
              option: 'backgroundOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: 'inherit',
          label: 'Background attachment',
          key: 'backgroundAttachment',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Inherit', value: 'inherit' },
              { name: 'Scroll', value: 'scroll' },
              { name: 'Fixed', value: 'fixed' },
            ],
            condition: {
              type: 'SHOW',
              option: 'backgroundOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: 'Transparent',
          label: 'Border color',
          key: 'borderColor',
          type: 'COLOR',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'backgroundOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'SIZE',
          label: 'Border thickness',
          key: 'borderWidth',
          value: '',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'backgroundOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: 'solid',
          label: 'Border style',
          key: 'borderStyle',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'None', value: 'none' },
              { name: 'Solid', value: 'solid' },
              { name: 'Dashed', value: 'dashed' },
              { name: 'Dotted', value: 'dotted' },
            ],
            condition: {
              type: 'SHOW',
              option: 'backgroundOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'SIZE',
          label: 'Border radius',
          key: 'borderRadius',
          value: '',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'backgroundOptions',
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
          value: ['Box'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [
        {
          name: 'Row',
          options: [
            {
              type: 'CUSTOM',
              label: 'Width',
              key: 'maxRowWidth',
              value: 'XL',
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
            },
            {
              value: '',
              label: 'Height',
              key: 'rowHeight',
              type: 'TEXT',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              value: 'transparent',
              label: 'Background color',
              key: 'backgroundColor',
              type: 'COLOR',
            },
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Outer space',
              key: 'outerSpacing',
              type: 'SIZES',
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
              value: ['Row'],
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'advancedSettings',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
          ],
          descendants: [
            {
              name: 'Column',
              options: [
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
                  value: 'flexible',
                  label: 'Column width',
                  key: 'columnWidth',
                  type: 'CUSTOM',
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
                {
                  value: 'flexible',
                  label: 'Column width (tablet landscape)',
                  key: 'columnWidthTabletLandscape',
                  type: 'CUSTOM',
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
                {
                  value: 'flexible',
                  label: 'Column width (tablet portrait)',
                  key: 'columnWidthTabletPortrait',
                  type: 'CUSTOM',
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
                {
                  value: 'flexible',
                  label: 'Column width (mobile)',
                  key: 'columnWidthMobile',
                  type: 'CUSTOM',
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
                {
                  value: '',
                  label: 'Height',
                  key: 'columnHeight',
                  type: 'TEXT',
                  configuration: {
                    as: 'UNIT',
                  },
                },
                {
                  value: 'transparent',
                  label: 'Background color',
                  key: 'backgroundColor',
                  type: 'COLOR',
                },
                {
                  type: 'CUSTOM',
                  label: 'Horizontal Alignment',
                  key: 'horizontalAlignment',
                  value: 'inherit',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'None',
                        value: 'inherit',
                      },
                      {
                        name: 'Left',
                        value: 'flex-start',
                      },
                      {
                        name: 'Center',
                        value: 'center',
                      },
                      {
                        name: 'Right',
                        value: 'flex-end',
                      },
                    ],
                  },
                },
                {
                  type: 'CUSTOM',
                  label: 'Vertical Alignment',
                  key: 'verticalAlignment',
                  value: 'inherit',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'None',
                        value: 'inherit',
                      },
                      {
                        name: 'Top',
                        value: 'flex-start',
                      },
                      {
                        name: 'Center',
                        value: 'center',
                      },
                      {
                        name: 'Bottom',
                        value: 'flex-end',
                      },
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
                  value: ['0rem', '0rem', '0rem', '0rem'],
                  label: 'Inner space',
                  key: 'innerSpacing',
                  type: 'SIZES',
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
                  value: ['Column'],
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'advancedSettings',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
              ],
              descendants: [
                {
                  name: 'AppBar',
                  options: [
                    {
                      label: 'Background color',
                      key: 'backgroundColor',
                      value: 'Primary',
                      type: 'COLOR',
                    },
                    {
                      label: 'Text color',
                      key: 'color',
                      value: 'White',
                      type: 'COLOR',
                    },
                    {
                      type: 'SIZE',
                      label: 'Height',
                      key: 'height',
                      value: '',
                      configuration: {
                        as: 'UNIT',
                      },
                    },
                    {
                      label: 'Position',
                      key: 'position',
                      value: 'static',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Fixed',
                            value: 'fixed',
                          },
                          {
                            name: 'Absolute',
                            value: 'absolute',
                          },
                          {
                            name: 'Sticky',
                            value: 'sticky',
                          },

                          {
                            name: 'Static',
                            value: 'static',
                          },
                          {
                            name: 'Relative',
                            value: 'relative',
                          },
                        ],
                      },
                    },
                    {
                      label: 'Title',
                      key: 'title',
                      value: [''],
                      type: 'VARIABLE',
                    },
                    {
                      label: 'Logo',
                      key: 'logoSource',
                      value: [
                        'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                      ],
                      type: 'VARIABLE',
                    },
                    {
                      type: 'SIZE',
                      label: 'Logo Width',
                      key: 'logoWidth',
                      value: '150px',
                      configuration: {
                        as: 'UNIT',
                      },
                    },
                    {
                      label: 'Align items',
                      key: 'alignItems',
                      value: 'right',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Left',
                            value: 'left',
                          },
                          {
                            name: 'Right',
                            value: 'right',
                          },
                        ],
                      },
                    },
                    {
                      label: 'Page',
                      key: 'endpoint',
                      value: '',
                      type: 'ENDPOINT',
                    },
                    {
                      label: 'Variant',
                      key: 'appBarVariant',
                      value: 'flat',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Flat',
                            value: 'flat',
                          },
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
                    },
                    {
                      label: 'Elevation',
                      key: 'elevation',
                      value: '1',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
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
                          {
                            name: '13',
                            value: '13',
                          },
                          {
                            name: '14',
                            value: '14',
                          },
                          {
                            name: '15',
                            value: '15',
                          },
                          {
                            name: '16',
                            value: '16',
                          },
                          {
                            name: '17',
                            value: '17',
                          },
                          {
                            name: '18',
                            value: '18',
                          },
                          {
                            name: '19',
                            value: '19',
                          },
                          {
                            name: '20',
                            value: '20',
                          },
                          {
                            name: '21',
                            value: '21',
                          },
                          {
                            name: '22',
                            value: '22',
                          },
                          {
                            name: '23',
                            value: '23',
                          },
                          {
                            name: '24',
                            value: '24',
                          },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'appBarVariant',
                          comparator: 'EQ',
                          value: 'elevation',
                        },
                      },
                    },
                    {
                      label: 'Square',
                      key: 'square',
                      value: true,
                      type: 'TOGGLE',
                    },
                    {
                      label: 'Size',
                      key: 'toolbarVariant',
                      value: 'regular',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Regular',
                            value: 'regular',
                          },
                          {
                            name: 'Dense',
                            value: 'dense',
                          },
                        ],
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
                      value: ['AppBar'],
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'advancedSettings',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                  ],
                  descendants: [
                    {
                      name: 'Button',
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
                      options: [
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
                          value: ['Menu 1'],
                        },
                        {
                          type: 'CUSTOM',
                          label: 'Link to',
                          key: 'linkType',
                          value: 'internal',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              {
                                name: 'Internal page',
                                value: 'internal',
                              },
                              {
                                name: 'External page',
                                value: 'external',
                              },
                            ],
                          },
                        },
                        {
                          value: '',
                          label: 'Page',
                          key: 'linkTo',
                          type: 'ENDPOINT',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'linkType',
                              comparator: 'EQ',
                              value: 'internal',
                            },
                          },
                        },
                        {
                          value: [''],
                          label: 'URL',
                          key: 'linkToExternal',
                          type: 'VARIABLE',
                          configuration: {
                            placeholder: 'Starts with https:// or http://',
                            condition: {
                              type: 'SHOW',
                              option: 'linkType',
                              comparator: 'EQ',
                              value: 'external',
                            },
                          },
                        },
                        {
                          value: '_self',
                          label: 'Open in',
                          key: 'openLinkToExternal',
                          type: 'CUSTOM',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'linkType',
                              comparator: 'EQ',
                              value: 'external',
                            },
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              {
                                name: 'Current Tab',
                                value: '_self',
                              },
                              {
                                name: 'New Tab',
                                value: '_blank',
                              },
                            ],
                          },
                        },
                        {
                          value: false,
                          label: 'Full width',
                          key: 'fullWidth',
                          type: 'TOGGLE',
                        },
                        {
                          label: 'Icon',
                          key: 'icon',
                          value: 'None',
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
                              {
                                name: 'Large',
                                value: 'large',
                              },
                              {
                                name: 'Medium',
                                value: 'medium',
                              },
                              {
                                name: 'Small',
                                value: 'small',
                              },
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
                              {
                                name: 'Start',
                                value: 'start',
                              },
                              {
                                name: 'End',
                                value: 'end',
                              },
                            ],
                          },
                        },
                        {
                          value: ['0rem', 'M', '0rem', 'M'],
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
                      ],
                      descendants: [],
                    },
                    {
                      name: 'Button',
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
                      options: [
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
                          value: ['Menu 2'],
                        },
                        {
                          type: 'CUSTOM',
                          label: 'Link to',
                          key: 'linkType',
                          value: 'internal',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              {
                                name: 'Internal page',
                                value: 'internal',
                              },
                              {
                                name: 'External page',
                                value: 'external',
                              },
                            ],
                          },
                        },
                        {
                          value: '',
                          label: 'Page',
                          key: 'linkTo',
                          type: 'ENDPOINT',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'linkType',
                              comparator: 'EQ',
                              value: 'internal',
                            },
                          },
                        },
                        {
                          value: [''],
                          label: 'URL',
                          key: 'linkToExternal',
                          type: 'VARIABLE',
                          configuration: {
                            placeholder: 'Starts with https:// or http://',
                            condition: {
                              type: 'SHOW',
                              option: 'linkType',
                              comparator: 'EQ',
                              value: 'external',
                            },
                          },
                        },
                        {
                          value: '_self',
                          label: 'Open in',
                          key: 'openLinkToExternal',
                          type: 'CUSTOM',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'linkType',
                              comparator: 'EQ',
                              value: 'external',
                            },
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              {
                                name: 'Current Tab',
                                value: '_self',
                              },
                              {
                                name: 'New Tab',
                                value: '_blank',
                              },
                            ],
                          },
                        },
                        {
                          value: false,
                          label: 'Full width',
                          key: 'fullWidth',
                          type: 'TOGGLE',
                        },
                        {
                          label: 'Icon',
                          key: 'icon',
                          value: 'None',
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
                              {
                                name: 'Large',
                                value: 'large',
                              },
                              {
                                name: 'Medium',
                                value: 'medium',
                              },
                              {
                                name: 'Small',
                                value: 'small',
                              },
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
                              {
                                name: 'Start',
                                value: 'start',
                              },
                              {
                                name: 'End',
                                value: 'end',
                              },
                            ],
                          },
                        },
                        {
                          value: ['0rem', '0rem', '0rem', 'M'],
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
                      ],
                      descendants: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const defaultFooterStructure = {
  name: 'Text',
  options: [
    {
      type: 'VARIABLE',
      label: 'Content',
      key: 'content',
      value: ['Powered by Betty Blocks'],
      configuration: {
        as: 'MULTILINE',
      },
    },
    {
      type: 'TOGGLE',
      label: 'Display Rich Text',
      key: 'useInnerHtml',
      value: false,
    },
    {
      value: 'Body1',
      label: 'Type',
      key: 'type',
      type: 'FONT',
    },
    {
      type: 'CUSTOM',
      label: 'Text Alignment',
      key: 'textAlignment',
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
    },
    {
      value: ['L', 'L', 'L', 'L'],
      label: 'Outer space',
      key: 'outerSpacing',
      type: 'SIZES',
    },
    {
      type: 'CUSTOM',
      label: 'Link to',
      key: 'linkType',
      value: 'internal',
      configuration: {
        as: 'BUTTONGROUP',
        dataType: 'string',
        allowedInput: [
          { name: 'Internal page', value: 'internal' },
          { name: 'External page', value: 'external' },
        ],
      },
    },
    {
      value: '_self',
      label: 'Open in',
      key: 'linkTarget',
      type: 'CUSTOM',
      configuration: {
        as: 'BUTTONGROUP',
        dataType: 'string',
        allowedInput: [
          { name: 'Current Tab', value: '_self' },
          { name: 'New Tab', value: '_blank' },
        ],
      },
    },
    {
      value: '',
      label: 'Page',
      key: 'linkTo',
      type: 'ENDPOINT',
      configuration: {
        condition: {
          type: 'SHOW',
          option: 'linkType',
          comparator: 'EQ',
          value: 'internal',
        },
      },
    },
    {
      value: [''],
      label: 'URL',
      key: 'linkToExternal',
      type: 'VARIABLE',
      configuration: {
        placeholder: 'Starts with https:// or http://',
        condition: {
          type: 'SHOW',
          option: 'linkType',
          comparator: 'EQ',
          value: 'external',
        },
      },
    },
    {
      value: true,
      label: 'Styles',
      key: 'styles',
      type: 'TOGGLE',
    },
    {
      type: 'COLOR',
      label: 'Text color',
      key: 'textColor',
      value: 'Medium',
      configuration: {
        condition: {
          type: 'SHOW',
          option: 'styles',
          comparator: 'EQ',
          value: true,
        },
      },
    },
    {
      type: 'CUSTOM',
      label: 'Font weight',
      key: 'fontWeight',
      value: '400',
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
        condition: {
          type: 'SHOW',
          option: 'styles',
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
      value: ['Text'],
      configuration: {
        condition: {
          type: 'SHOW',
          option: 'advancedSettings',
          comparator: 'EQ',
          value: true,
        },
      },
    },
  ],
  descendants: [],
};

const beforeCreate = ({
  save,
  close,
  prefab: originalPrefab,
  components: {
    Header,
    Content,
    Field,
    Footer,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Text,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Box,
    ModelSelector,
    PropertySelector,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Button,
    PartialSelector,
  },
  helpers: { useModelQuery },
}: any) => {
  const [showValidation, setShowValidation] = React.useState(false);
  const [modelId, setModelId] = React.useState('');
  const [titleProperty, setTitleProperty] = React.useState<any>('');
  const [descriptionProperty, setDescriptionProperty] = React.useState<any>('');
  const [checkboxProperty, setCheckboxProperty] = React.useState('');

  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });

  const [stepNumber, setStepNumber] = React.useState(1);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');

  const getDescendantByRef = (refValue: string, structure: any) =>
    // eslint-disable-next-line @typescript-eslint/no-shadow
    structure.reduce((acc: string, component: PrefabReference) => {
      if (acc) return acc;
      if (
        component.type === 'COMPONENT' &&
        // eslint-disable-next-line no-prototype-builtins
        component.ref
          ? Object.values(component.ref).indexOf(refValue) > -1
          : undefined
      ) {
        return component;
      }
      if (component.type === 'PARTIAL') {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return getDescendantByRef(refValue, component.descendants);
    }, null);

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
      return (
        <Box direction="row">
          <Box direction="column" basis="2/3">
            <Field
              label="Select model"
              error={
                showValidation && (
                  <Text color="#e82600">Selecting a model is required</Text>
                )
              }
            >
              <ModelSelector
                onChange={(value: any) => {
                  setShowValidation(false);
                  setModelId(value);
                  setTitleProperty('');
                  setDescriptionProperty('');
                  setCheckboxProperty('');
                }}
                value={modelId}
              />
            </Field>
            <Field label="Title property">
              <PropertySelector
                modelId={modelId}
                onChange={(value: 'STRING') => {
                  setTitleProperty(value);
                }}
                value={titleProperty}
                disabled={!modelId}
              />
            </Field>
            <Field label="Description property">
              <PropertySelector
                modelId={modelId}
                onChange={(value: 'STRING') => {
                  setDescriptionProperty(value);
                }}
                value={descriptionProperty}
                disabled={!modelId}
              />
            </Field>
            <Field label="Checkbox property">
              <PropertySelector
                modelId={modelId}
                onChange={(value: 'BOOLEAN') => {
                  setCheckboxProperty(value);
                }}
                value={checkboxProperty}
                disabled={!modelId}
              />
            </Field>
          </Box>
        </Box>
      );
    },
    onSave: async () => {
      if (!modelId) {
        setShowValidation(true);
        return;
      }
      const newPrefab = { ...originalPrefab };
      console.log(newPrefab.structure);
      if (modelId) {
        const dataList = getDescendantByRef('#dataList', newPrefab.structure);
        dataList.options[0].value = modelId;

        const titleText = getDescendantByRef('#titleText', newPrefab.structure);

        if (titleProperty.id) {
          titleText.options[0].value.value = [enrichVarObj(checkboxProperty)];
          titleText.options[0].value.label = [enrichVarObj(titleProperty)];
        }

        const descriptionText = getDescendantByRef(
          '#descriptionText',
          newPrefab.structure,
        );

        if (descriptionProperty.id) {
          descriptionText.options[0].value = [
            enrichVarObj(descriptionProperty),
          ];
        }

        // #region Partial Selection
        const partialHeader = getDescendantByRef('#Menu', newPrefab.structure);
        if (headerPartialId) {
          partialHeader.descendants[0].partialId = headerPartialId;
        } else {
          partialHeader.descendants[0] = defaultHeaderstructure;
        }
        const partialFooter = getDescendantByRef(
          '#Footer',
          newPrefab.structure,
        );
        if (footerPartialId) {
          partialFooter.descendants[0].partialId = footerPartialId;
        } else {
          partialFooter.descendants[0] = defaultFooterStructure;
        }
        // newPrefab.structure[0].descendants = prefabStructure;
        save(newPrefab);
      }
      // #endregion
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
            onSave={stepper.onSave}
            canSave={stepNumber === stepper.stepAmount}
          />
        </Box>
      </Box>
    ),
    progressBar: () => {
      return (
        <Box
          justify="center"
          margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
        >
          <Text size="medium" weight="bold">{`Step: ${stepNumber + 1} / ${
            stepper.stepAmount + 1
          }`}</Text>
        </Box>
      );
    },
    stepAmount: 2,
  };
  return (
    <>
      <Header onClose={close} title="Configure list view" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default makePrefab(
  'Checklistpage',
  attrs,
  beforeCreate,
  prefabStructure,
);
