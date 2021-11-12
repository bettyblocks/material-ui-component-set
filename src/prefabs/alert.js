(() => ({
  name: 'Alert',
  icon: 'AlertIcon',
  category: 'CONTENT',
  keywords: ['Content', 'alert', 'notification'],
  structure: [
    {
      name: 'Alert',
      options: [
        {
          value: true,
          label: 'Toggle visibility',
          key: 'visible',
          type: 'TOGGLE',
          configuration: {
            as: 'VISIBILITY',
          },
        },
        {
          type: 'VARIABLE',
          label: 'Body text',
          key: 'bodyText',
          value: ['Type your content here...'],
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          label: 'Allow to overwrite by the server response',
          key: 'allowTextServerResponse',
          value: false,
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Title text',
          key: 'titleText',
          value: [''],
        },
        {
          label: 'Allow to overwrite by the server response',
          key: 'allowTitleServerResponse',
          value: false,
          type: 'TOGGLE',
        },
        {
          value: 'Black',
          label: 'Text color',
          key: 'textColor',
          type: 'COLOR',
        },
        {
          value: 'Black',
          label: 'Icon color',
          key: 'iconColor',
          type: 'COLOR',
        },
        {
          value: 'Success',
          label: 'Background color',
          key: 'background',
          type: 'COLOR',
        },
        {
          value: 'Transparent',
          label: 'Border color',
          key: 'borderColor',
          type: 'COLOR',
        },
        {
          label: 'Icon',
          key: 'icon',
          value: 'None',
          type: 'ICON',
        },
        {
          value: false,
          label: 'Collapsable',
          key: 'collapsable',
          type: 'TOGGLE',
        },
        {
          type: 'CUSTOM',
          label: 'Horizontal Alignment',
          key: 'horizontalAlignment',
          value: 'flex-start',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Left', value: 'flex-start' },
              { name: 'Center', value: 'center' },
              { name: 'Right', value: 'flex-end' },
            ],
            condition: {
              type: 'HIDE',
              option: 'collapsable',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Vertical Alignment',
          key: 'verticalAlignment',
          value: 'stretch',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Top', value: 'flex-start' },
              { name: 'Center', value: 'center' },
              { name: 'Bottom', value: 'flex-end' },
              { name: 'Justified', value: 'stretch' },
            ],
          },
        },
        {
          value: ['0rem', '0rem', 'M', '0rem'],
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
          value: ['Alert'],
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
