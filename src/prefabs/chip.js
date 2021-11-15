(() => ({
  name: 'Chip',
  icon: 'ChipIcon',
  category: 'CONTENT',
  keywords: ['Content', 'chip'],
  structure: [
    {
      name: 'Chip',
      options: [
        {
          type: 'VARIABLE',
          label: 'Label',
          key: 'label',
          value: ['Label'],
        },
        {
          type: 'TOGGLE',
          label: 'Disabled',
          key: 'disabled',
          value: false,
        },
        {
          label: 'Variant',
          key: 'variant',
          value: 'default',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Default', value: 'default' },
              { name: 'Outlined', value: 'outlined' },
            ],
          },
        },
        {
          label: 'Size',
          key: 'size',
          value: 'medium',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Small', value: 'small' },
              { name: 'Medium', value: 'medium' },
            ],
          },
        },
        {
          type: 'COLOR',
          label: 'Color',
          key: 'color',
          value: 'Primary',
        },
        {
          type: 'COLOR',
          label: 'Text Color',
          key: 'textColor',
          value: 'White',
        },
        {
          label: 'Avatar type',
          key: 'avatartype',
          value: 'icon',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Icon', value: 'icon' },
              { name: 'Text', value: 'text' },
              { name: 'Image', value: 'image' },
            ],
          },
        },
        {
          label: 'StartIcon',
          key: 'startIcon',
          value: 'None',
          type: 'ICON',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'avatartype',
              comparator: 'EQ',
              value: 'icon',
            },
          },
        },
        {
          type: 'TEXT',
          label: 'Avatar text',
          key: 'avatar',
          value: '',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'avatartype',
              comparator: 'EQ',
              value: 'text',
            },
          },
        },
        {
          value: [],
          label: 'Image url',
          key: 'imgUrl',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'avatartype',
              comparator: 'EQ',
              value: 'image',
            },
          },
        },
        {
          type: 'SIZES',
          label: 'Outer Space',
          key: 'margin',
          value: ['M', 'M', 'M', 'M'],
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
          value: ['Chip'],
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
}))();
