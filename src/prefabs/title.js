(() => ({
  name: 'Title',
  icon: 'TitleIcon',
  category: 'CONTENT',
  keywords: [
    'Content',
    'title',
    'type',
    'typography',
    'heading',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'text',
  ],
  structure: [
    {
      name: 'Text',
      options: [
        {
          type: 'VARIABLE',
          label: 'Content',
          key: 'content',
          value: [],
          configuration: {
            as: 'MULTILINE',
          },
        },
        {
          value: 'Title2',
          label: 'Type',
          key: 'type',
          type: 'FONT',
        },
        {
          type: 'CUSTOM',
          label: 'Text Alignment',
          key: 'textAlignment',
          value: 'left',
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
          value: ['0rem', '0rem', '0rem', '0rem'],
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
          value: false,
          label: 'Styles',
          key: 'styles',
          type: 'TOGGLE',
        },
        {
          type: 'COLOR',
          label: 'Text color',
          key: 'textColor',
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
    },
  ],
}))();
