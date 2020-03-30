(() => ({
  name: 'Card',
  icon: 'ContainerIcon',
  category: 'CARDS',
  structure: [
    {
      name: 'Card',
      options: [
        {
          type: 'VARIABLE',
          label: 'Title',
          key: 'title',
          value: ['Title'],
        },
        {
          type: 'VARIABLE',
          label: 'Subtitle',
          key: 'subTitle',
          value: ['Subtitle'],
        },
        {
          label: 'Raised',
          key: 'raised',
          value: false,
          type: 'TOGGLE',
        },
        {
          label: 'Variant',
          key: 'variant',
          value: 'elevation',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Elevation', value: 'elevation' },
              { name: 'Outlined', value: 'outlined' },
            ],
          },
        },
      ],
      descendants: [
        {
          name: 'CardMedia',
          options: [
            {
              value:
                'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
              label: 'Image',
              key: 'image',
              type: 'TEXT',
            },
          ],
          descendants: [],
        },
        {
          name: 'CardContent',
          options: [],
          descendants: [
            {
              name: 'Text',
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Content',
                  key: 'content',
                  value: ['Lizard'],
                  configuration: {
                    as: 'MULTILINE',
                  },
                },
                {
                  value: 'Title5',
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
              ],
              descendants: [],
            },
            {
              name: 'Text',
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Content',
                  key: 'content',
                  value: [
                    'Lizards are a widespread group of squamate reptiles  ',
                  ],
                  configuration: {
                    as: 'MULTILINE',
                  },
                },
                {
                  value: 'Body2',
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
              ],
              descendants: [],
            },
          ],
        },
        {
          name: 'CardActions',
          options: [
            {
              value: 'flex-start',
              label: 'Alignment',
              key: 'alignment',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Left', value: 'flex-start' },
                  { name: 'Center', value: 'center' },
                  { name: 'Right', value: 'flex-end' },
                  { name: 'Justified', value: 'space-between' },
                ],
              },
            },
          ],
          descendants: [
            {
              name: 'Button',
              options: [
                {
                  label: 'Visible',
                  key: 'visible',
                  value: true,
                  type: 'TOGGLE',
                },
                {
                  type: 'VARIABLE',
                  label: 'Button text',
                  key: 'buttonText',
                  value: ['Button'],
                },
                {
                  type: 'CUSTOM',
                  label: 'Link to',
                  key: 'linkType',
                  value: 'Internal',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Internal page', value: 'Internal' },
                      { name: 'External page', value: 'External' },
                      { name: 'Action', value: 'Action' },
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
                      value: 'Internal',
                    },
                  },
                },
                {
                  value: '',
                  label: 'URL',
                  key: 'linkToExternal',
                  type: 'TEXT',
                  configuration: {
                    placeholder: 'Starts with https:// or http://',
                    condition: {
                      type: 'SHOW',
                      option: 'linkType',
                      comparator: 'EQ',
                      value: 'External',
                    },
                  },
                },
                {
                  value: '',
                  label: 'Action',
                  key: 'ActionId',
                  type: 'ACTION',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'linkType',
                      comparator: 'EQ',
                      value: 'Action',
                    },
                  },
                },
                {
                  type: 'CUSTOM',
                  label: 'variant',
                  key: 'variant',
                  value: 'text',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Text', value: 'text' },
                      { name: 'Outlined', value: 'outlined' },
                      { name: 'Contained', value: 'contained' },
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
                  value: 'medium',
                  label: 'Size',
                  key: 'size',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Medium', value: 'medium' },
                      { name: 'Small', value: 'small' },
                    ],
                  },
                },
                {
                  label: 'StartIcon',
                  key: 'startIcon',
                  value: 'None',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: '',
                        value: 'None',
                      },
                      {
                        name: 'ExpandMore',
                        value: 'ExpandMore',
                      },
                      {
                        name: 'FilterList',
                        value: 'FilterList',
                      },
                      {
                        name: 'Search',
                        value: 'Search',
                      },
                      {
                        name: 'FileCopy',
                        value: 'FileCopy',
                      },
                      {
                        name: 'GetApp',
                        value: 'GetApp',
                      },
                      {
                        name: 'Email',
                        value: 'Email',
                      },
                    ],
                  },
                },
                {
                  type: 'COLOR',
                  label: 'Text color',
                  key: 'textColor',
                  value: 'Black',
                },
                {
                  type: 'COLOR',
                  label: 'Background color',
                  key: 'background',
                  value: 'Success',
                },
                {
                  value: ['0rem', 'M', '0rem', '0rem'],
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
              ],
              descendants: [],
            },
          ],
        },
      ],
    },
  ],
}))();
