(() => ({
  name: 'Slider Input',
  icon: 'ProgressBarIcon',
  category: 'FORM',
  structure: [
    {
      name: 'sliderInput',
      options: [
        {
          value: { label: ['slider'], value: [] },
          label: 'Label',
          key: 'customModelAttribute',
          type: 'CUSTOM_MODEL_ATTRIBUTE',
          configuration: {
            allowedTypes: ['integer'],
          },
        },
        {
          type: 'TOGGLE',
          label: 'Disable',
          key: 'disable',
          value: false,
        },
        {
          type: 'NUMBER',
          label: 'Start',
          key: 'startNumber',
          value: 0,
        },
        {
          type: 'NUMBER',
          label: 'End',
          key: 'endNumber',
          value: 100,
        },
        {
          type: 'NUMBER',
          label: 'Step',
          key: 'stepNumber',
          value: 1,
        },
        {
          value: ['M', '0rem', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          type: 'CUSTOM',
          label: 'Border',
          key: 'border',
          value: 'withBorder',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'With Border',
                value: 'withBorder',
              },
              {
                name: 'Without Border',
                value: 'withoutBorder',
              },
            ],
          },
        },
        {
          value: false,
          label: 'Marks',
          key: 'marks',
          type: 'TOGGLE',
        },
        {
          value: false,
          label: 'Styles',
          key: 'styles',
          type: 'TOGGLE',
        },
        {
          type: 'COLOR',
          label: 'Slider color',
          key: 'sliderColor',
          value: 'Primary',
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
          type: 'COLOR',
          label: 'Border color',
          key: 'borderColor',
          value: 'Accent1',
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
          type: 'COLOR',
          label: 'Border color (hover)',
          key: 'borderHoverColor',
          value: 'Black',
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
          type: 'COLOR',
          label: 'Border color (focus)',
          key: 'borderFocusColor',
          value: 'Primary',
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
          type: 'COLOR',
          label: 'Label color',
          key: 'labelColor',
          value: 'Accent3',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
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
