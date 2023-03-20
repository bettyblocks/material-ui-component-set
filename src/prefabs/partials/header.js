(() => ({
  name: 'Top menu',
  icon: 'ContainerIcon',
  description: 'This is a top menu partial.',
  detail:
    'This partial is used to display the header of the page. It has a logo and a menu.',
  previewImage:
    'https://assets.bettyblocks.com/bea59bf27f2a414a9ca069afa6524a2b_assets/files/Header',
  category: 'LAYOUT',

  structure: [
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
              { name: 'Justified', value: 'space-between' },
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
          value: {},
          label: 'Display logic',
          key: 'displayLogic',
          type: 'DISPLAY_LOGIC',
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
          value: '100%',
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
              { name: 'Relative', value: 'relative' },
              { name: 'Absolute', value: 'absolute' },
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
          value: false,
          label: 'Show background options',
          key: 'backgroundOptions',
          type: 'TOGGLE',
        },
        {
          value: 'Transparent',
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
              { name: 'Left top', value: 'left top' },
              { name: 'Left center', value: 'left center' },
              { name: 'Left bottom', value: 'left bottom' },
              { name: 'Center top', value: 'center top' },
              { name: 'Center center', value: 'center center' },
              { name: 'Center bottom', value: 'center bottom' },
              { name: 'Right top', value: 'right top' },
              { name: 'Right center', value: 'right center' },
              { name: 'Right bottom', value: 'right bottom' },
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
                      value: {},
                      label: 'Display logic',
                      key: 'displayLogic',
                      type: 'DISPLAY_LOGIC',
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
                                  label: 'Media type',
                                  value: 'url',
                                  key: 'type',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Image',
                                        value: 'img',
                                      },
                                      {
                                        name: 'URL',
                                        value: 'url',
                                      },
                                    ],
                                  },
                                },
                                {
                                  value: '',
                                  type: 'PUBLIC_FILE',
                                  label: 'Logo',
                                  key: 'logoSource',
                                  configuration: {
                                    condition: {
                                      type: 'SHOW',
                                      option: 'type',
                                      comparator: 'EQ',
                                      value: 'img',
                                    },
                                  },
                                },
                                {
                                  value: [
                                    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                                  ],
                                  label: 'URL source',
                                  key: 'urlFileSource',
                                  type: 'VARIABLE',
                                  configuration: {
                                    placeholder:
                                      'Starts with https:// or http://',
                                    as: 'MULTILINE',
                                    condition: {
                                      type: 'SHOW',
                                      option: 'type',
                                      comparator: 'EQ',
                                      value: 'url',
                                    },
                                  },
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
                                        placeholder:
                                          'Starts with https:// or http://',
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
                                        placeholder:
                                          'Starts with https:// or http://',
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
            },
          ],
        },
      ],
    },
  ],
}))();
