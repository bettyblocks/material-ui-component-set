(() => ({
  name: 'Card',
  icon: 'ContainerIcon',
  category: 'CARDS',
  structure: [
    {
      name: 'Card',
      options: [
        {
          label: 'Raised',
          key: 'raised',
          value: false,
          type: 'TOGGLE',
        },
        {
          label: 'Square',
          key: 'square',
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
              { name: '10', value: '10' },
              { name: '11', value: '11' },
              { name: '12', value: '12' },
              { name: '13', value: '13' },
              { name: '14', value: '14' },
              { name: '15', value: '15' },
              { name: '16', value: '16' },
              { name: '17', value: '17' },
              { name: '18', value: '18' },
              { name: '19', value: '19' },
              { name: '20', value: '20' },
              { name: '21', value: '21' },
              { name: '22', value: '22' },
              { name: '23', value: '23' },
              { name: '24', value: '24' },
            ],
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'elevation',
            },
          },
        },
      ],
      descendants: [
        {
          name: 'CardHeader',
          options: [
            {
              value: '',
              label: 'Avatar',
              key: 'avatar',
              type: 'TEXT',
            },
            {
              label: 'Avatar type',
              key: 'avatarType',
              value: 'text',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Text', value: 'text' },
                  { name: 'Image', value: 'image' },
                ],
                condition: {
                  type: 'HIDE',
                  option: 'avatar',
                  comparator: 'EQ',
                  value: '',
                },
              },
            },
            {
              value: ['Title'],
              label: 'Title',
              key: 'title',
              type: 'VARIABLE',
            },
            {
              value: [],
              label: 'Sub header',
              key: 'subheader',
              type: 'VARIABLE',
            },
          ],
          descendants: [],
        },
        {
          name: 'CardMedia',
          options: [
            {
              label: 'Media type',
              key: 'type',
              value: 'img',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Image', value: 'img' },
                  { name: 'Video', value: 'video' },
                  { name: 'I-frame', value: 'iframe' },
                ],
              },
            },
            {
              value: 'https://picsum.photos/300/200',
              label: 'Source',
              key: 'imageSource',
              type: 'TEXT',
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
              value: '',
              label: 'Source',
              key: 'videoSource',
              type: 'TEXT',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'type',
                  comparator: 'EQ',
                  value: 'video',
                },
              },
            },
            {
              value: '',
              label: 'Source',
              key: 'iframeSource',
              type: 'TEXT',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'type',
                  comparator: 'EQ',
                  value: 'iframe',
                },
              },
            },
            {
              value: [],
              label: 'Title',
              key: 'title',
              type: 'VARIABLE',
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
                  value: ['Title'],
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
                  value: ['Type your content here...'],
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
              type: 'CUSTOM',
              label: 'Alignment',
              key: 'alignment',
              value: 'flex-start',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Start',
                    value: 'flex-start',
                  },
                  {
                    name: 'Center',
                    value: 'center',
                  },
                  {
                    name: 'End',
                    value: 'flex-end',
                  },
                ],
              },
            },
            {
              type: 'TOGGLE',
              label: 'Disable spacing',
              key: 'disableSpacing',
              value: false,
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
                  key: 'text',
                  value: 'contained',
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
                  value: ['0rem', '0rem', '0rem', '0rem'],
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
