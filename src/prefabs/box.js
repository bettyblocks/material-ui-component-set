(() => ({
  name: 'Box',
  icon: 'ContainerIcon',
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
          value: 'visible',
          label: 'Overflow',
          key: 'overflow',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Visible', value: 'visible' },
              { name: 'Hidden', value: 'hidden' },
              { name: 'Scroll', value: 'scroll' },
              { name: 'Auto', value: 'auto' },
              { name: 'Initial', value: 'initial' },
              { name: 'Inherit', value: 'inherit' },
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
          value: ['M', 'M', 'M', 'M'],
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
          value: 'relative',
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
      ],
      descendants: [],
    },
  ],
}))();
