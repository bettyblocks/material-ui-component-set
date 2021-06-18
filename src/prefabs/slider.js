(() => ({
  name: 'Slider Input',
  icon: 'SliderComponentIcon',
  category: 'FORM',
  keywords: ['Form', 'slider', 'input', 'range'],
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
          label: 'Disabled',
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
          label: 'Increments',
          key: 'stepNumber',
          value: 1,
        },
        {
          value: [],
          label: 'Helper text',
          key: 'helperText',
          type: 'VARIABLE',
        },
        {
          value: false,
          label: 'Validation options',
          key: 'validationOptions',
          type: 'TOGGLE',
        },
        {
          value: ['This field is required'],
          label: 'Value required message',
          key: 'validationValueMissing',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validationOptions',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: ['M', '0rem', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
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
        {
          type: 'COLOR',
          label: 'Helper color',
          key: 'helperColor',
          value: 'Accent2',
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
          label: 'Error color',
          key: 'errorColor',
          value: 'Danger',
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
