(() => ({
  name: 'Error page: 404',
  icon: 'NavbarIcon',
  type: 'page',
  description:
    'If a certain page cannot be found. You can use this page template to communicate a 404 error in your application.',
  detail:
    'If a certain page cannot be found. You can use this page template to communicate a 404 error in your application.',
  previewUrl: 'https://preview.betty.app/404-styled',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/404_Styled.jpg',
  category: 'LAYOUT',
  beforeCreate: ({
    prefab,
    save,
    close,
    components: {
      EndpointSelector,
      Header,
      Content,
      Field,
      Footer,
      ButtonGroup,
      ButtonGroupButton,
      Box,
      Text,
    },
  }) => {
    const [varient, setVarient] = React.useState('404-styled');
    const [endpoint, setEndpoint] = React.useState({
      id: '',
      pageId: '',
      params: {},
    });

    const structure404 = {
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
      ],
      descendants: [
        {
          name: 'Text',
          options: [
            {
              type: 'VARIABLE',
              label: 'Content',
              key: 'content',
              value: ['404'],
              configuration: {
                as: 'MULTILINE',
              },
            },
            {
              value: 'Title1',
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
              value: ['S', '0rem', '0rem', '0rem'],
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
              value: ['Page not found.'],
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
              value: ['0rem', '0rem', 'L', '0rem'],
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
              value: ['You might want to try a different page ...'],
              configuration: {
                as: 'MULTILINE',
              },
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
              value: ['S', '0rem', 'M', '0rem'],
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
              value: true,
              label: 'Styles',
              key: 'styles',
              type: 'TOGGLE',
            },
            {
              type: 'COLOR',
              label: 'Text color',
              key: 'textColor',
              value: 'Dark',
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
          ],
          descendants: [],
        },
        {
          name: 'Box',
          options: [
            {
              value: 'center',
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
          ],
          descendants: [
            {
              name: 'Button',
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
                  value: ['Go back'],
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
                      { name: 'Current Tab', value: '_self' },
                      { name: 'New Tab', value: '_blank' },
                    ],
                  },
                },
                {
                  value: false,
                  label: 'Full width',
                  key: 'fullWidth',
                  type: 'TOGGLE',
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'variant',
                      comparator: 'EQ',
                      value: 'icon',
                    },
                  },
                },
                {
                  label: 'Icon',
                  key: 'icon',
                  value: 'None',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'None',
                        value: 'None',
                      },
                      {
                        name: 'AcUnit',
                        value: 'AcUnit',
                      },
                      {
                        name: 'AccessTime',
                        value: 'AccessTime',
                      },
                      {
                        name: 'AccessibilityNew',
                        value: 'AccessibilityNew',
                      },
                      {
                        name: 'Accessible',
                        value: 'Accessible',
                      },
                      {
                        name: 'AccountBalance',
                        value: 'AccountBalance',
                      },
                      {
                        name: 'AccountBalanceWallet',
                        value: 'AccountBalanceWallet',
                      },
                      {
                        name: 'AccountCircle',
                        value: 'AccountCircle',
                      },
                      {
                        name: 'AccountTree',
                        value: 'AccountTree',
                      },
                      {
                        name: 'Add',
                        value: 'Add',
                      },
                      {
                        name: 'AddAPhoto',
                        value: 'AddAPhoto',
                      },
                      {
                        name: 'AddBox',
                        value: 'AddBox',
                      },
                      {
                        name: 'AddCircle',
                        value: 'AddCircle',
                      },
                      {
                        name: 'AddCircleOutline',
                        value: 'AddCircleOutline',
                      },
                      {
                        name: 'AddComment',
                        value: 'AddComment',
                      },
                      {
                        name: 'Adjust',
                        value: 'Adjust',
                      },
                      {
                        name: 'AirplanemodeActive',
                        value: 'AirplanemodeActive',
                      },
                      {
                        name: 'AirplanemodeInactive',
                        value: 'AirplanemodeInactive',
                      },
                      {
                        name: 'Airplay',
                        value: 'Airplay',
                      },
                      {
                        name: 'AirportShuttle',
                        value: 'AirportShuttle',
                      },
                      {
                        name: 'Alarm',
                        value: 'Alarm',
                      },
                      {
                        name: 'Album',
                        value: 'Album',
                      },
                      {
                        name: 'AllInbox',
                        value: 'AllInbox',
                      },
                      {
                        name: 'AllInclusive',
                        value: 'AllInclusive',
                      },
                      {
                        name: 'AlternateEmail',
                        value: 'AlternateEmail',
                      },
                      {
                        name: 'Announcement',
                        value: 'Announcement',
                      },
                      {
                        name: 'Apartment',
                        value: 'Apartment',
                      },
                      {
                        name: 'Apps',
                        value: 'Apps',
                      },
                      {
                        name: 'Archive',
                        value: 'Archive',
                      },
                      {
                        name: 'ArrowBack',
                        value: 'ArrowBack',
                      },
                      {
                        name: 'ArrowBackIos',
                        value: 'ArrowBackIos',
                      },
                      {
                        name: 'ArrowDownward',
                        value: 'ArrowDownward',
                      },
                      {
                        name: 'ArrowDropDown',
                        value: 'ArrowDropDown',
                      },
                      {
                        name: 'ArrowDropDownCircle',
                        value: 'ArrowDropDownCircle',
                      },
                      {
                        name: 'ArrowDropUp',
                        value: 'ArrowDropUp',
                      },
                      {
                        name: 'ArrowForward',
                        value: 'ArrowForward',
                      },
                      {
                        name: 'ArrowForwardIos',
                        value: 'ArrowForwardIos',
                      },
                      {
                        name: 'ArrowLeft',
                        value: 'ArrowLeft',
                      },
                      {
                        name: 'ArrowRight',
                        value: 'ArrowRight',
                      },
                      {
                        name: 'ArrowRightAlt',
                        value: 'ArrowRightAlt',
                      },
                      {
                        name: 'ArrowUpward',
                        value: 'ArrowUpward',
                      },
                      {
                        name: 'Assessment',
                        value: 'Assessment',
                      },
                      {
                        name: 'Assignment',
                        value: 'Assignment',
                      },
                      {
                        name: 'AssignmentInd',
                        value: 'AssignmentInd',
                      },
                      {
                        name: 'AssignmentLate',
                        value: 'AssignmentLate',
                      },
                      {
                        name: 'AssignmentReturn',
                        value: 'AssignmentReturn',
                      },
                      {
                        name: 'AssignmentReturned',
                        value: 'AssignmentReturned',
                      },
                      {
                        name: 'AssignmentTurnedIn',
                        value: 'AssignmentTurnedIn',
                      },
                      {
                        name: 'Assistant',
                        value: 'Assistant',
                      },
                      {
                        name: 'AssistantPhoto',
                        value: 'AssistantPhoto',
                      },
                      {
                        name: 'AttachFile',
                        value: 'AttachFile',
                      },
                      {
                        name: 'AttachMoney',
                        value: 'AttachMoney',
                      },
                      {
                        name: 'Attachment',
                        value: 'Attachment',
                      },
                      {
                        name: 'Audiotrack',
                        value: 'Audiotrack',
                      },
                      {
                        name: 'Autorenew',
                        value: 'Autorenew',
                      },
                      {
                        name: 'AvTimer',
                        value: 'AvTimer',
                      },
                      {
                        name: 'Backspace',
                        value: 'Backspace',
                      },
                      {
                        name: 'Backup',
                        value: 'Backup',
                      },
                      {
                        name: 'BarChart',
                        value: 'BarChart',
                      },
                      {
                        name: 'Battery20',
                        value: 'Battery20',
                      },
                      {
                        name: 'Beenhere',
                        value: 'Beenhere',
                      },
                      {
                        name: 'Block',
                        value: 'Block',
                      },
                      {
                        name: 'Bluetooth',
                        value: 'Bluetooth',
                      },
                      {
                        name: 'Book',
                        value: 'Book',
                      },
                      {
                        name: 'Bookmark',
                        value: 'Bookmark',
                      },
                      {
                        name: 'BookmarkBorder',
                        value: 'BookmarkBorder',
                      },
                      {
                        name: 'Bookmarks',
                        value: 'Bookmarks',
                      },
                      {
                        name: 'Brush',
                        value: 'Brush',
                      },
                      {
                        name: 'BubbleChart',
                        value: 'BubbleChart',
                      },
                      {
                        name: 'BugReport',
                        value: 'BugReport',
                      },
                      {
                        name: 'Build',
                        value: 'Build',
                      },
                      {
                        name: 'Cached',
                        value: 'Cached',
                      },
                      {
                        name: 'Cake',
                        value: 'Cake',
                      },
                      {
                        name: 'CalendarToday',
                        value: 'CalendarToday',
                      },
                      {
                        name: 'Call',
                        value: 'Call',
                      },
                      {
                        name: 'CameraAlt',
                        value: 'CameraAlt',
                      },
                      {
                        name: 'CameraRoll',
                        value: 'CameraRoll',
                      },
                      {
                        name: 'Cancel',
                        value: 'Cancel',
                      },
                      {
                        name: 'CardTravel',
                        value: 'CardTravel',
                      },
                      {
                        name: 'Cast',
                        value: 'Cast',
                      },
                      {
                        name: 'Category',
                        value: 'Category',
                      },
                      {
                        name: 'Chat',
                        value: 'Chat',
                      },
                      {
                        name: 'Check',
                        value: 'Check',
                      },
                      {
                        name: 'CheckBox',
                        value: 'CheckBox',
                      },
                      {
                        name: 'CheckCircle',
                        value: 'CheckCircle',
                      },
                      {
                        name: 'CheckCircleOutline',
                        value: 'CheckCircleOutline',
                      },
                      {
                        name: 'ChevronLeft',
                        value: 'ChevronLeft',
                      },
                      {
                        name: 'ChevronRight',
                        value: 'ChevronRight',
                      },
                      {
                        name: 'ChildCare',
                        value: 'ChildCare',
                      },
                      {
                        name: 'Clear',
                        value: 'Clear',
                      },
                      {
                        name: 'Close',
                        value: 'Close',
                      },
                      {
                        name: 'Cloud',
                        value: 'Cloud',
                      },
                      {
                        name: 'CloudDownload',
                        value: 'CloudDownload',
                      },
                      {
                        name: 'CloudUpload',
                        value: 'CloudUpload',
                      },
                      {
                        name: 'Code',
                        value: 'Code',
                      },
                      {
                        name: 'Collections',
                        value: 'Collections',
                      },
                      {
                        name: 'ColorLens',
                        value: 'ColorLens',
                      },
                      {
                        name: 'Colorize',
                        value: 'Colorize',
                      },
                      {
                        name: 'Commute',
                        value: 'Commute',
                      },
                      {
                        name: 'Computer',
                        value: 'Computer',
                      },
                      {
                        name: 'CreditCard',
                        value: 'CreditCard',
                      },
                      {
                        name: 'Dashboard',
                        value: 'Dashboard',
                      },
                      {
                        name: 'DataUsage',
                        value: 'DataUsage',
                      },
                      {
                        name: 'Deck',
                        value: 'Deck',
                      },
                      {
                        name: 'Dehaze',
                        value: 'Dehaze',
                      },
                      {
                        name: 'Delete',
                        value: 'Delete',
                      },
                      {
                        name: 'DeleteForever',
                        value: 'DeleteForever',
                      },
                      {
                        name: 'DesktopMac',
                        value: 'DesktopMac',
                      },
                      {
                        name: 'DeveloperMode',
                        value: 'DeveloperMode',
                      },
                      {
                        name: 'Devices',
                        value: 'Devices',
                      },
                      {
                        name: 'Dialpad',
                        value: 'Dialpad',
                      },
                      {
                        name: 'Directions',
                        value: 'Directions',
                      },
                      {
                        name: 'DirectionsBike',
                        value: 'DirectionsBike',
                      },
                      {
                        name: 'DirectionsBoat',
                        value: 'DirectionsBoat',
                      },
                      {
                        name: 'DirectionsBus',
                        value: 'DirectionsBus',
                      },
                      {
                        name: 'DirectionsCar',
                        value: 'DirectionsCar',
                      },
                      {
                        name: 'DirectionsRailway',
                        value: 'DirectionsRailway',
                      },
                      {
                        name: 'DirectionsRun',
                        value: 'DirectionsRun',
                      },
                      {
                        name: 'DirectionsSubway',
                        value: 'DirectionsSubway',
                      },
                      {
                        name: 'DirectionsTransit',
                        value: 'DirectionsTransit',
                      },
                      {
                        name: 'DirectionsWalk',
                        value: 'DirectionsWalk',
                      },
                      {
                        name: 'DiscFull',
                        value: 'DiscFull',
                      },
                      {
                        name: 'Dns',
                        value: 'Dns',
                      },
                      {
                        name: 'Done',
                        value: 'Done',
                      },
                      {
                        name: 'DoneAll',
                        value: 'DoneAll',
                      },
                      {
                        name: 'DoubleArrow',
                        value: 'DoubleArrow',
                      },
                      {
                        name: 'Drafts',
                        value: 'Drafts',
                      },
                      {
                        name: 'Eco',
                        value: 'Eco',
                      },
                      {
                        name: 'Edit',
                        value: 'Edit',
                      },
                      {
                        name: 'Email',
                        value: 'Email',
                      },
                      {
                        name: 'Equalizer',
                        value: 'Equalizer',
                      },
                      {
                        name: 'Error',
                        value: 'Error',
                      },
                      {
                        name: 'Euro',
                        value: 'Euro',
                      },
                      {
                        name: 'Event',
                        value: 'Event',
                      },
                      {
                        name: 'ExpandLess',
                        value: 'ExpandLess',
                      },
                      {
                        name: 'ExpandMore',
                        value: 'ExpandMore',
                      },
                      {
                        name: 'Explore',
                        value: 'Explore',
                      },
                      {
                        name: 'Extension',
                        value: 'Extension',
                      },
                      {
                        name: 'Face',
                        value: 'Face',
                      },
                      {
                        name: 'Facebook',
                        value: 'Facebook',
                      },
                      {
                        name: 'FastForward',
                        value: 'FastForward',
                      },
                      {
                        name: 'FastRewind',
                        value: 'FastRewind',
                      },
                      {
                        name: 'Favorite',
                        value: 'Favorite',
                      },
                      {
                        name: 'FavoriteBorder',
                        value: 'FavoriteBorder',
                      },
                      {
                        name: 'FileCopy',
                        value: 'FileCopy',
                      },
                      {
                        name: 'FilterList',
                        value: 'FilterList',
                      },
                      {
                        name: 'Flag',
                        value: 'Flag',
                      },
                      {
                        name: 'Flare',
                        value: 'Flare',
                      },
                      {
                        name: 'Flight',
                        value: 'Flight',
                      },
                      {
                        name: 'Folder',
                        value: 'Folder',
                      },
                      {
                        name: 'Forum',
                        value: 'Forum',
                      },
                      {
                        name: 'Forward',
                        value: 'Forward',
                      },
                      {
                        name: 'FreeBreakfast',
                        value: 'FreeBreakfast',
                      },
                      {
                        name: 'Fullscreen',
                        value: 'Fullscreen',
                      },
                      {
                        name: 'Functions',
                        value: 'Functions',
                      },
                      {
                        name: 'Games',
                        value: 'Games',
                      },
                      {
                        name: 'Gavel',
                        value: 'Gavel',
                      },
                      {
                        name: 'Gesture',
                        value: 'Gesture',
                      },
                      {
                        name: 'GetApp',
                        value: 'GetApp',
                      },
                      {
                        name: 'Gif',
                        value: 'Gif',
                      },
                      {
                        name: 'GpsFixed',
                        value: 'GpsFixed',
                      },
                      {
                        name: 'Grade',
                        value: 'Grade',
                      },
                      {
                        name: 'Group',
                        value: 'Group',
                      },
                      {
                        name: 'Headset',
                        value: 'Headset',
                      },
                      {
                        name: 'Hearing',
                        value: 'Hearing',
                      },
                      {
                        name: 'Height',
                        value: 'Height',
                      },
                      {
                        name: 'Help',
                        value: 'Help',
                      },
                      {
                        name: 'HelpOutline',
                        value: 'HelpOutline',
                      },
                      {
                        name: 'Highlight',
                        value: 'Highlight',
                      },
                      {
                        name: 'History',
                        value: 'History',
                      },
                      {
                        name: 'Home',
                        value: 'Home',
                      },
                      {
                        name: 'Hotel',
                        value: 'Hotel',
                      },
                      {
                        name: 'HourglassEmpty',
                        value: 'HourglassEmpty',
                      },
                      {
                        name: 'Http',
                        value: 'Http',
                      },
                      {
                        name: 'Https',
                        value: 'Https',
                      },
                      {
                        name: 'Image',
                        value: 'Image',
                      },
                      {
                        name: 'ImportExport',
                        value: 'ImportExport',
                      },
                      {
                        name: 'Inbox',
                        value: 'Inbox',
                      },
                      {
                        name: 'Info',
                        value: 'Info',
                      },
                      {
                        name: 'Input',
                        value: 'Input',
                      },
                      {
                        name: 'Keyboard',
                        value: 'Keyboard',
                      },
                      {
                        name: 'KeyboardArrowDown',
                        value: 'KeyboardArrowDown',
                      },
                      {
                        name: 'KeyboardArrowLeft',
                        value: 'KeyboardArrowLeft',
                      },
                      {
                        name: 'KeyboardArrowRight',
                        value: 'KeyboardArrowRight',
                      },
                      {
                        name: 'KeyboardArrowUp',
                        value: 'KeyboardArrowUp',
                      },
                      {
                        name: 'KeyboardVoice',
                        value: 'KeyboardVoice',
                      },
                      {
                        name: 'Label',
                        value: 'Label',
                      },
                      {
                        name: 'Landscape',
                        value: 'Landscape',
                      },
                      {
                        name: 'Language',
                        value: 'Language',
                      },
                      {
                        name: 'Laptop',
                        value: 'Laptop',
                      },
                      {
                        name: 'LastPage',
                        value: 'LastPage',
                      },
                      {
                        name: 'Launch',
                        value: 'Launch',
                      },
                      {
                        name: 'Layers',
                        value: 'Layers',
                      },
                      {
                        name: 'Link',
                        value: 'Link',
                      },
                      {
                        name: 'List',
                        value: 'List',
                      },
                      {
                        name: 'LocalBar',
                        value: 'LocalBar',
                      },
                      {
                        name: 'Lock',
                        value: 'Lock',
                      },
                      {
                        name: 'LockOpen',
                        value: 'LockOpen',
                      },
                      {
                        name: 'Loop',
                        value: 'Loop',
                      },
                      {
                        name: 'Mail',
                        value: 'Mail',
                      },
                      {
                        name: 'Map',
                        value: 'Map',
                      },
                      {
                        name: 'Menu',
                        value: 'Menu',
                      },
                      {
                        name: 'Message',
                        value: 'Message',
                      },
                      {
                        name: 'Mic',
                        value: 'Mic',
                      },
                      {
                        name: 'Mms',
                        value: 'Mms',
                      },
                      {
                        name: 'Money',
                        value: 'Money',
                      },
                      {
                        name: 'Mood',
                        value: 'Mood',
                      },
                      {
                        name: 'MoodBad',
                        value: 'MoodBad',
                      },
                      {
                        name: 'More',
                        value: 'More',
                      },
                      {
                        name: 'MoreHoriz',
                        value: 'MoreHoriz',
                      },
                      {
                        name: 'MoreVert',
                        value: 'MoreVert',
                      },
                      {
                        name: 'Motorcycle',
                        value: 'Motorcycle',
                      },
                      {
                        name: 'Movie',
                        value: 'Movie',
                      },
                      {
                        name: 'MusicNote',
                        value: 'MusicNote',
                      },
                      {
                        name: 'MyLocation',
                        value: 'MyLocation',
                      },
                      {
                        name: 'Nature',
                        value: 'Nature',
                      },
                      {
                        name: 'Navigation',
                        value: 'Navigation',
                      },
                      {
                        name: 'NewReleases',
                        value: 'NewReleases',
                      },
                      {
                        name: 'NotInterested',
                        value: 'NotInterested',
                      },
                      {
                        name: 'Note',
                        value: 'Note',
                      },
                      {
                        name: 'NotificationImportant',
                        value: 'NotificationImportant',
                      },
                      {
                        name: 'Notifications',
                        value: 'Notifications',
                      },
                      {
                        name: 'NotificationsActive',
                        value: 'NotificationsActive',
                      },
                      {
                        name: 'Opacity',
                        value: 'Opacity',
                      },
                      {
                        name: 'Palette',
                        value: 'Palette',
                      },
                      {
                        name: 'Pause',
                        value: 'Pause',
                      },
                      {
                        name: 'Payment',
                        value: 'Payment',
                      },
                      {
                        name: 'People',
                        value: 'People',
                      },
                      {
                        name: 'Person',
                        value: 'Person',
                      },
                      {
                        name: 'PersonAdd',
                        value: 'PersonAdd',
                      },
                      {
                        name: 'Pets',
                        value: 'Pets',
                      },
                      {
                        name: 'Phone',
                        value: 'Phone',
                      },
                      {
                        name: 'Photo',
                        value: 'Photo',
                      },
                      {
                        name: 'PhotoCamera',
                        value: 'PhotoCamera',
                      },
                      {
                        name: 'PieChart',
                        value: 'PieChart',
                      },
                      {
                        name: 'Place',
                        value: 'Place',
                      },
                      {
                        name: 'PlayArrow',
                        value: 'PlayArrow',
                      },
                      {
                        name: 'PlayCircleFilled',
                        value: 'PlayCircleFilled',
                      },
                      {
                        name: 'PlayCircleFilledWhite',
                        value: 'PlayCircleFilledWhite',
                      },
                      {
                        name: 'PlayCircleOutline',
                        value: 'PlayCircleOutline',
                      },
                      {
                        name: 'Power',
                        value: 'Power',
                      },
                      {
                        name: 'Public',
                        value: 'Public',
                      },
                      {
                        name: 'Radio',
                        value: 'Radio',
                      },
                      {
                        name: 'Redo',
                        value: 'Redo',
                      },
                      {
                        name: 'Refresh',
                        value: 'Refresh',
                      },
                      {
                        name: 'Remove',
                        value: 'Remove',
                      },
                      {
                        name: 'RemoveCircle',
                        value: 'RemoveCircle',
                      },
                      {
                        name: 'RemoveCircleOutline',
                        value: 'RemoveCircleOutline',
                      },
                      {
                        name: 'Replay',
                        value: 'Replay',
                      },
                      {
                        name: 'Reply',
                        value: 'Reply',
                      },
                      {
                        name: 'Report',
                        value: 'Report',
                      },
                      {
                        name: 'ReportProblem',
                        value: 'ReportProblem',
                      },
                      {
                        name: 'Restaurant',
                        value: 'Restaurant',
                      },
                      {
                        name: 'RssFeed',
                        value: 'RssFeed',
                      },
                      {
                        name: 'Save',
                        value: 'Save',
                      },
                      {
                        name: 'SaveAlt',
                        value: 'SaveAlt',
                      },
                      {
                        name: 'School',
                        value: 'School',
                      },
                      {
                        name: 'Search',
                        value: 'Search',
                      },
                      {
                        name: 'Security',
                        value: 'Security',
                      },
                      {
                        name: 'Send',
                        value: 'Send',
                      },
                      {
                        name: 'Settings',
                        value: 'Settings',
                      },
                      {
                        name: 'ShoppingCart',
                        value: 'ShoppingCart',
                      },
                      {
                        name: 'ShowChart',
                        value: 'ShowChart',
                      },
                      {
                        name: 'Smartphone',
                        value: 'Smartphone',
                      },
                      {
                        name: 'SmokeFree',
                        value: 'SmokeFree',
                      },
                      {
                        name: 'SmokingRooms',
                        value: 'SmokingRooms',
                      },
                      {
                        name: 'Speaker',
                        value: 'Speaker',
                      },
                      {
                        name: 'Speed',
                        value: 'Speed',
                      },
                      {
                        name: 'Spellcheck',
                        value: 'Spellcheck',
                      },
                      {
                        name: 'SquareFoot',
                        value: 'SquareFoot',
                      },
                      {
                        name: 'Star',
                        value: 'Star',
                      },
                      {
                        name: 'StarBorder',
                        value: 'StarBorder',
                      },
                      {
                        name: 'StarHalf',
                        value: 'StarHalf',
                      },
                      {
                        name: 'StarOutline',
                        value: 'StarOutline',
                      },
                      {
                        name: 'StarRate',
                        value: 'StarRate',
                      },
                      {
                        name: 'Stars',
                        value: 'Stars',
                      },
                      {
                        name: 'Stop',
                        value: 'Stop',
                      },
                      {
                        name: 'Storefront',
                        value: 'Storefront',
                      },
                      {
                        name: 'Sync',
                        value: 'Sync',
                      },
                      {
                        name: 'Tab',
                        value: 'Tab',
                      },
                      {
                        name: 'TextFields',
                        value: 'TextFields',
                      },
                      {
                        name: 'ThumbDown',
                        value: 'ThumbDown',
                      },
                      {
                        name: 'ThumbDownAlt',
                        value: 'ThumbDownAlt',
                      },
                      {
                        name: 'ThumbUp',
                        value: 'ThumbUp',
                      },
                      {
                        name: 'ThumbUpAlt',
                        value: 'ThumbUpAlt',
                      },
                      {
                        name: 'ThumbsUpDown',
                        value: 'ThumbsUpDown',
                      },
                      {
                        name: 'Title',
                        value: 'Title',
                      },
                      {
                        name: 'TouchApp',
                        value: 'TouchApp',
                      },
                      {
                        name: 'Traffic',
                        value: 'Traffic',
                      },
                      {
                        name: 'Train',
                        value: 'Train',
                      },
                      {
                        name: 'Tram',
                        value: 'Tram',
                      },
                      {
                        name: 'Translate',
                        value: 'Translate',
                      },
                      {
                        name: 'TrendingDown',
                        value: 'TrendingDown',
                      },
                      {
                        name: 'TrendingFlat',
                        value: 'TrendingFlat',
                      },
                      {
                        name: 'TrendingUp',
                        value: 'TrendingUp',
                      },
                      {
                        name: 'Undo',
                        value: 'Undo',
                      },
                      {
                        name: 'Update',
                        value: 'Update',
                      },
                      {
                        name: 'Usb',
                        value: 'Usb',
                      },
                      {
                        name: 'VerifiedUser',
                        value: 'VerifiedUser',
                      },
                      {
                        name: 'VideoCall',
                        value: 'VideoCall',
                      },
                      {
                        name: 'Visibility',
                        value: 'Visibility',
                      },
                      {
                        name: 'VisibilityOff',
                        value: 'VisibilityOff',
                      },
                      {
                        name: 'Voicemail',
                        value: 'Voicemail',
                      },
                      {
                        name: 'VolumeDown',
                        value: 'VolumeDown',
                      },
                      {
                        name: 'VolumeMute',
                        value: 'VolumeMute',
                      },
                      {
                        name: 'VolumeOff',
                        value: 'VolumeOff',
                      },
                      {
                        name: 'VolumeUp',
                        value: 'VolumeUp',
                      },
                      {
                        name: 'Warning',
                        value: 'Warning',
                      },
                      {
                        name: 'Watch',
                        value: 'Watch',
                      },
                      {
                        name: 'WatchLater',
                        value: 'WatchLater',
                      },
                      {
                        name: 'Wc',
                        value: 'Wc',
                      },
                      {
                        name: 'Widgets',
                        value: 'Widgets',
                      },
                      {
                        name: 'Wifi',
                        value: 'Wifi',
                      },
                      {
                        name: 'Work',
                        value: 'Work',
                      },
                    ],
                  },
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
                      { name: 'Large', value: 'large' },
                      { name: 'Medium', value: 'medium' },
                      { name: 'Small', value: 'small' },
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
                      { name: 'Start', value: 'start' },
                      { name: 'End', value: 'end' },
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
              ],
              descendants: [],
            },
          ],
        },
      ],
    };

    const structure404Styled = {
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
              value: '30vh',
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
              value: ['0rem', '0rem', 'M', '0rem'],
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
              value: true,
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
              value: [
                'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/404.svg',
              ],
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
              value: 'contain',
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
          ],
          descendants: [],
        },
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
                  {
                    name: 'Center center',
                    value: 'center center',
                  },
                  {
                    name: 'Center bottom',
                    value: 'center bottom',
                  },
                  { name: 'Right top', value: 'right top' },
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
          ],
          descendants: [
            {
              name: 'Text',
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Content',
                  key: 'content',
                  value: ['Page not found.'],
                  configuration: {
                    as: 'MULTILINE',
                  },
                },
                {
                  value: 'Title4',
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
                  value: ["We can't seem to find that one."],
                  configuration: {
                    as: 'MULTILINE',
                  },
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
                  value: ['S', '0rem', '0rem', '0rem'],
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
              ],
              descendants: [],
            },
            {
              name: 'Box',
              options: [
                {
                  value: 'center',
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
                  value: ['M', '0rem', '0rem', '0rem'],
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
                      { name: 'Right top', value: 'right top' },
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
              ],
              descendants: [
                {
                  name: 'Button',
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
                      value: ['Go back'],
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
                          { name: 'New Tab', value: '_blank' },
                        ],
                      },
                    },
                    {
                      value: false,
                      label: 'Full width',
                      key: 'fullWidth',
                      type: 'TOGGLE',
                      configuration: {
                        condition: {
                          type: 'HIDE',
                          option: 'variant',
                          comparator: 'EQ',
                          value: 'icon',
                        },
                      },
                    },
                    {
                      label: 'Icon',
                      key: 'icon',
                      value: 'None',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'None',
                            value: 'None',
                          },
                          {
                            name: 'AcUnit',
                            value: 'AcUnit',
                          },
                          {
                            name: 'AccessTime',
                            value: 'AccessTime',
                          },
                          {
                            name: 'AccessibilityNew',
                            value: 'AccessibilityNew',
                          },
                          {
                            name: 'Accessible',
                            value: 'Accessible',
                          },
                          {
                            name: 'AccountBalance',
                            value: 'AccountBalance',
                          },
                          {
                            name: 'AccountBalanceWallet',
                            value: 'AccountBalanceWallet',
                          },
                          {
                            name: 'AccountCircle',
                            value: 'AccountCircle',
                          },
                          {
                            name: 'AccountTree',
                            value: 'AccountTree',
                          },
                          {
                            name: 'Add',
                            value: 'Add',
                          },
                          {
                            name: 'AddAPhoto',
                            value: 'AddAPhoto',
                          },
                          {
                            name: 'AddBox',
                            value: 'AddBox',
                          },
                          {
                            name: 'AddCircle',
                            value: 'AddCircle',
                          },
                          {
                            name: 'AddCircleOutline',
                            value: 'AddCircleOutline',
                          },
                          {
                            name: 'AddComment',
                            value: 'AddComment',
                          },
                          {
                            name: 'Adjust',
                            value: 'Adjust',
                          },
                          {
                            name: 'AirplanemodeActive',
                            value: 'AirplanemodeActive',
                          },
                          {
                            name: 'AirplanemodeInactive',
                            value: 'AirplanemodeInactive',
                          },
                          {
                            name: 'Airplay',
                            value: 'Airplay',
                          },
                          {
                            name: 'AirportShuttle',
                            value: 'AirportShuttle',
                          },
                          {
                            name: 'Alarm',
                            value: 'Alarm',
                          },
                          {
                            name: 'Album',
                            value: 'Album',
                          },
                          {
                            name: 'AllInbox',
                            value: 'AllInbox',
                          },
                          {
                            name: 'AllInclusive',
                            value: 'AllInclusive',
                          },
                          {
                            name: 'AlternateEmail',
                            value: 'AlternateEmail',
                          },
                          {
                            name: 'Announcement',
                            value: 'Announcement',
                          },
                          {
                            name: 'Apartment',
                            value: 'Apartment',
                          },
                          {
                            name: 'Apps',
                            value: 'Apps',
                          },
                          {
                            name: 'Archive',
                            value: 'Archive',
                          },
                          {
                            name: 'ArrowBack',
                            value: 'ArrowBack',
                          },
                          {
                            name: 'ArrowBackIos',
                            value: 'ArrowBackIos',
                          },
                          {
                            name: 'ArrowDownward',
                            value: 'ArrowDownward',
                          },
                          {
                            name: 'ArrowDropDown',
                            value: 'ArrowDropDown',
                          },
                          {
                            name: 'ArrowDropDownCircle',
                            value: 'ArrowDropDownCircle',
                          },
                          {
                            name: 'ArrowDropUp',
                            value: 'ArrowDropUp',
                          },
                          {
                            name: 'ArrowForward',
                            value: 'ArrowForward',
                          },
                          {
                            name: 'ArrowForwardIos',
                            value: 'ArrowForwardIos',
                          },
                          {
                            name: 'ArrowLeft',
                            value: 'ArrowLeft',
                          },
                          {
                            name: 'ArrowRight',
                            value: 'ArrowRight',
                          },
                          {
                            name: 'ArrowRightAlt',
                            value: 'ArrowRightAlt',
                          },
                          {
                            name: 'ArrowUpward',
                            value: 'ArrowUpward',
                          },
                          {
                            name: 'Assessment',
                            value: 'Assessment',
                          },
                          {
                            name: 'Assignment',
                            value: 'Assignment',
                          },
                          {
                            name: 'AssignmentInd',
                            value: 'AssignmentInd',
                          },
                          {
                            name: 'AssignmentLate',
                            value: 'AssignmentLate',
                          },
                          {
                            name: 'AssignmentReturn',
                            value: 'AssignmentReturn',
                          },
                          {
                            name: 'AssignmentReturned',
                            value: 'AssignmentReturned',
                          },
                          {
                            name: 'AssignmentTurnedIn',
                            value: 'AssignmentTurnedIn',
                          },
                          {
                            name: 'Assistant',
                            value: 'Assistant',
                          },
                          {
                            name: 'AssistantPhoto',
                            value: 'AssistantPhoto',
                          },
                          {
                            name: 'AttachFile',
                            value: 'AttachFile',
                          },
                          {
                            name: 'AttachMoney',
                            value: 'AttachMoney',
                          },
                          {
                            name: 'Attachment',
                            value: 'Attachment',
                          },
                          {
                            name: 'Audiotrack',
                            value: 'Audiotrack',
                          },
                          {
                            name: 'Autorenew',
                            value: 'Autorenew',
                          },
                          {
                            name: 'AvTimer',
                            value: 'AvTimer',
                          },
                          {
                            name: 'Backspace',
                            value: 'Backspace',
                          },
                          {
                            name: 'Backup',
                            value: 'Backup',
                          },
                          {
                            name: 'BarChart',
                            value: 'BarChart',
                          },
                          {
                            name: 'Battery20',
                            value: 'Battery20',
                          },
                          {
                            name: 'Beenhere',
                            value: 'Beenhere',
                          },
                          {
                            name: 'Block',
                            value: 'Block',
                          },
                          {
                            name: 'Bluetooth',
                            value: 'Bluetooth',
                          },
                          {
                            name: 'Book',
                            value: 'Book',
                          },
                          {
                            name: 'Bookmark',
                            value: 'Bookmark',
                          },
                          {
                            name: 'BookmarkBorder',
                            value: 'BookmarkBorder',
                          },
                          {
                            name: 'Bookmarks',
                            value: 'Bookmarks',
                          },
                          {
                            name: 'Brush',
                            value: 'Brush',
                          },
                          {
                            name: 'BubbleChart',
                            value: 'BubbleChart',
                          },
                          {
                            name: 'BugReport',
                            value: 'BugReport',
                          },
                          {
                            name: 'Build',
                            value: 'Build',
                          },
                          {
                            name: 'Cached',
                            value: 'Cached',
                          },
                          {
                            name: 'Cake',
                            value: 'Cake',
                          },
                          {
                            name: 'CalendarToday',
                            value: 'CalendarToday',
                          },
                          {
                            name: 'Call',
                            value: 'Call',
                          },
                          {
                            name: 'CameraAlt',
                            value: 'CameraAlt',
                          },
                          {
                            name: 'CameraRoll',
                            value: 'CameraRoll',
                          },
                          {
                            name: 'Cancel',
                            value: 'Cancel',
                          },
                          {
                            name: 'CardTravel',
                            value: 'CardTravel',
                          },
                          {
                            name: 'Cast',
                            value: 'Cast',
                          },
                          {
                            name: 'Category',
                            value: 'Category',
                          },
                          {
                            name: 'Chat',
                            value: 'Chat',
                          },
                          {
                            name: 'Check',
                            value: 'Check',
                          },
                          {
                            name: 'CheckBox',
                            value: 'CheckBox',
                          },
                          {
                            name: 'CheckCircle',
                            value: 'CheckCircle',
                          },
                          {
                            name: 'CheckCircleOutline',
                            value: 'CheckCircleOutline',
                          },
                          {
                            name: 'ChevronLeft',
                            value: 'ChevronLeft',
                          },
                          {
                            name: 'ChevronRight',
                            value: 'ChevronRight',
                          },
                          {
                            name: 'ChildCare',
                            value: 'ChildCare',
                          },
                          {
                            name: 'Clear',
                            value: 'Clear',
                          },
                          {
                            name: 'Close',
                            value: 'Close',
                          },
                          {
                            name: 'Cloud',
                            value: 'Cloud',
                          },
                          {
                            name: 'CloudDownload',
                            value: 'CloudDownload',
                          },
                          {
                            name: 'CloudUpload',
                            value: 'CloudUpload',
                          },
                          {
                            name: 'Code',
                            value: 'Code',
                          },
                          {
                            name: 'Collections',
                            value: 'Collections',
                          },
                          {
                            name: 'ColorLens',
                            value: 'ColorLens',
                          },
                          {
                            name: 'Colorize',
                            value: 'Colorize',
                          },
                          {
                            name: 'Commute',
                            value: 'Commute',
                          },
                          {
                            name: 'Computer',
                            value: 'Computer',
                          },
                          {
                            name: 'CreditCard',
                            value: 'CreditCard',
                          },
                          {
                            name: 'Dashboard',
                            value: 'Dashboard',
                          },
                          {
                            name: 'DataUsage',
                            value: 'DataUsage',
                          },
                          {
                            name: 'Deck',
                            value: 'Deck',
                          },
                          {
                            name: 'Dehaze',
                            value: 'Dehaze',
                          },
                          {
                            name: 'Delete',
                            value: 'Delete',
                          },
                          {
                            name: 'DeleteForever',
                            value: 'DeleteForever',
                          },
                          {
                            name: 'DesktopMac',
                            value: 'DesktopMac',
                          },
                          {
                            name: 'DeveloperMode',
                            value: 'DeveloperMode',
                          },
                          {
                            name: 'Devices',
                            value: 'Devices',
                          },
                          {
                            name: 'Dialpad',
                            value: 'Dialpad',
                          },
                          {
                            name: 'Directions',
                            value: 'Directions',
                          },
                          {
                            name: 'DirectionsBike',
                            value: 'DirectionsBike',
                          },
                          {
                            name: 'DirectionsBoat',
                            value: 'DirectionsBoat',
                          },
                          {
                            name: 'DirectionsBus',
                            value: 'DirectionsBus',
                          },
                          {
                            name: 'DirectionsCar',
                            value: 'DirectionsCar',
                          },
                          {
                            name: 'DirectionsRailway',
                            value: 'DirectionsRailway',
                          },
                          {
                            name: 'DirectionsRun',
                            value: 'DirectionsRun',
                          },
                          {
                            name: 'DirectionsSubway',
                            value: 'DirectionsSubway',
                          },
                          {
                            name: 'DirectionsTransit',
                            value: 'DirectionsTransit',
                          },
                          {
                            name: 'DirectionsWalk',
                            value: 'DirectionsWalk',
                          },
                          {
                            name: 'DiscFull',
                            value: 'DiscFull',
                          },
                          {
                            name: 'Dns',
                            value: 'Dns',
                          },
                          {
                            name: 'Done',
                            value: 'Done',
                          },
                          {
                            name: 'DoneAll',
                            value: 'DoneAll',
                          },
                          {
                            name: 'DoubleArrow',
                            value: 'DoubleArrow',
                          },
                          {
                            name: 'Drafts',
                            value: 'Drafts',
                          },
                          {
                            name: 'Eco',
                            value: 'Eco',
                          },
                          {
                            name: 'Edit',
                            value: 'Edit',
                          },
                          {
                            name: 'Email',
                            value: 'Email',
                          },
                          {
                            name: 'Equalizer',
                            value: 'Equalizer',
                          },
                          {
                            name: 'Error',
                            value: 'Error',
                          },
                          {
                            name: 'Euro',
                            value: 'Euro',
                          },
                          {
                            name: 'Event',
                            value: 'Event',
                          },
                          {
                            name: 'ExpandLess',
                            value: 'ExpandLess',
                          },
                          {
                            name: 'ExpandMore',
                            value: 'ExpandMore',
                          },
                          {
                            name: 'Explore',
                            value: 'Explore',
                          },
                          {
                            name: 'Extension',
                            value: 'Extension',
                          },
                          {
                            name: 'Face',
                            value: 'Face',
                          },
                          {
                            name: 'Facebook',
                            value: 'Facebook',
                          },
                          {
                            name: 'FastForward',
                            value: 'FastForward',
                          },
                          {
                            name: 'FastRewind',
                            value: 'FastRewind',
                          },
                          {
                            name: 'Favorite',
                            value: 'Favorite',
                          },
                          {
                            name: 'FavoriteBorder',
                            value: 'FavoriteBorder',
                          },
                          {
                            name: 'FileCopy',
                            value: 'FileCopy',
                          },
                          {
                            name: 'FilterList',
                            value: 'FilterList',
                          },
                          {
                            name: 'Flag',
                            value: 'Flag',
                          },
                          {
                            name: 'Flare',
                            value: 'Flare',
                          },
                          {
                            name: 'Flight',
                            value: 'Flight',
                          },
                          {
                            name: 'Folder',
                            value: 'Folder',
                          },
                          {
                            name: 'Forum',
                            value: 'Forum',
                          },
                          {
                            name: 'Forward',
                            value: 'Forward',
                          },
                          {
                            name: 'FreeBreakfast',
                            value: 'FreeBreakfast',
                          },
                          {
                            name: 'Fullscreen',
                            value: 'Fullscreen',
                          },
                          {
                            name: 'Functions',
                            value: 'Functions',
                          },
                          {
                            name: 'Games',
                            value: 'Games',
                          },
                          {
                            name: 'Gavel',
                            value: 'Gavel',
                          },
                          {
                            name: 'Gesture',
                            value: 'Gesture',
                          },
                          {
                            name: 'GetApp',
                            value: 'GetApp',
                          },
                          {
                            name: 'Gif',
                            value: 'Gif',
                          },
                          {
                            name: 'GpsFixed',
                            value: 'GpsFixed',
                          },
                          {
                            name: 'Grade',
                            value: 'Grade',
                          },
                          {
                            name: 'Group',
                            value: 'Group',
                          },
                          {
                            name: 'Headset',
                            value: 'Headset',
                          },
                          {
                            name: 'Hearing',
                            value: 'Hearing',
                          },
                          {
                            name: 'Height',
                            value: 'Height',
                          },
                          {
                            name: 'Help',
                            value: 'Help',
                          },
                          {
                            name: 'HelpOutline',
                            value: 'HelpOutline',
                          },
                          {
                            name: 'Highlight',
                            value: 'Highlight',
                          },
                          {
                            name: 'History',
                            value: 'History',
                          },
                          {
                            name: 'Home',
                            value: 'Home',
                          },
                          {
                            name: 'Hotel',
                            value: 'Hotel',
                          },
                          {
                            name: 'HourglassEmpty',
                            value: 'HourglassEmpty',
                          },
                          {
                            name: 'Http',
                            value: 'Http',
                          },
                          {
                            name: 'Https',
                            value: 'Https',
                          },
                          {
                            name: 'Image',
                            value: 'Image',
                          },
                          {
                            name: 'ImportExport',
                            value: 'ImportExport',
                          },
                          {
                            name: 'Inbox',
                            value: 'Inbox',
                          },
                          {
                            name: 'Info',
                            value: 'Info',
                          },
                          {
                            name: 'Input',
                            value: 'Input',
                          },
                          {
                            name: 'Keyboard',
                            value: 'Keyboard',
                          },
                          {
                            name: 'KeyboardArrowDown',
                            value: 'KeyboardArrowDown',
                          },
                          {
                            name: 'KeyboardArrowLeft',
                            value: 'KeyboardArrowLeft',
                          },
                          {
                            name: 'KeyboardArrowRight',
                            value: 'KeyboardArrowRight',
                          },
                          {
                            name: 'KeyboardArrowUp',
                            value: 'KeyboardArrowUp',
                          },
                          {
                            name: 'KeyboardVoice',
                            value: 'KeyboardVoice',
                          },
                          {
                            name: 'Label',
                            value: 'Label',
                          },
                          {
                            name: 'Landscape',
                            value: 'Landscape',
                          },
                          {
                            name: 'Language',
                            value: 'Language',
                          },
                          {
                            name: 'Laptop',
                            value: 'Laptop',
                          },
                          {
                            name: 'LastPage',
                            value: 'LastPage',
                          },
                          {
                            name: 'Launch',
                            value: 'Launch',
                          },
                          {
                            name: 'Layers',
                            value: 'Layers',
                          },
                          {
                            name: 'Link',
                            value: 'Link',
                          },
                          {
                            name: 'List',
                            value: 'List',
                          },
                          {
                            name: 'LocalBar',
                            value: 'LocalBar',
                          },
                          {
                            name: 'Lock',
                            value: 'Lock',
                          },
                          {
                            name: 'LockOpen',
                            value: 'LockOpen',
                          },
                          {
                            name: 'Loop',
                            value: 'Loop',
                          },
                          {
                            name: 'Mail',
                            value: 'Mail',
                          },
                          {
                            name: 'Map',
                            value: 'Map',
                          },
                          {
                            name: 'Menu',
                            value: 'Menu',
                          },
                          {
                            name: 'Message',
                            value: 'Message',
                          },
                          {
                            name: 'Mic',
                            value: 'Mic',
                          },
                          {
                            name: 'Mms',
                            value: 'Mms',
                          },
                          {
                            name: 'Money',
                            value: 'Money',
                          },
                          {
                            name: 'Mood',
                            value: 'Mood',
                          },
                          {
                            name: 'MoodBad',
                            value: 'MoodBad',
                          },
                          {
                            name: 'More',
                            value: 'More',
                          },
                          {
                            name: 'MoreHoriz',
                            value: 'MoreHoriz',
                          },
                          {
                            name: 'MoreVert',
                            value: 'MoreVert',
                          },
                          {
                            name: 'Motorcycle',
                            value: 'Motorcycle',
                          },
                          {
                            name: 'Movie',
                            value: 'Movie',
                          },
                          {
                            name: 'MusicNote',
                            value: 'MusicNote',
                          },
                          {
                            name: 'MyLocation',
                            value: 'MyLocation',
                          },
                          {
                            name: 'Nature',
                            value: 'Nature',
                          },
                          {
                            name: 'Navigation',
                            value: 'Navigation',
                          },
                          {
                            name: 'NewReleases',
                            value: 'NewReleases',
                          },
                          {
                            name: 'NotInterested',
                            value: 'NotInterested',
                          },
                          {
                            name: 'Note',
                            value: 'Note',
                          },
                          {
                            name: 'NotificationImportant',
                            value: 'NotificationImportant',
                          },
                          {
                            name: 'Notifications',
                            value: 'Notifications',
                          },
                          {
                            name: 'NotificationsActive',
                            value: 'NotificationsActive',
                          },
                          {
                            name: 'Opacity',
                            value: 'Opacity',
                          },
                          {
                            name: 'Palette',
                            value: 'Palette',
                          },
                          {
                            name: 'Pause',
                            value: 'Pause',
                          },
                          {
                            name: 'Payment',
                            value: 'Payment',
                          },
                          {
                            name: 'People',
                            value: 'People',
                          },
                          {
                            name: 'Person',
                            value: 'Person',
                          },
                          {
                            name: 'PersonAdd',
                            value: 'PersonAdd',
                          },
                          {
                            name: 'Pets',
                            value: 'Pets',
                          },
                          {
                            name: 'Phone',
                            value: 'Phone',
                          },
                          {
                            name: 'Photo',
                            value: 'Photo',
                          },
                          {
                            name: 'PhotoCamera',
                            value: 'PhotoCamera',
                          },
                          {
                            name: 'PieChart',
                            value: 'PieChart',
                          },
                          {
                            name: 'Place',
                            value: 'Place',
                          },
                          {
                            name: 'PlayArrow',
                            value: 'PlayArrow',
                          },
                          {
                            name: 'PlayCircleFilled',
                            value: 'PlayCircleFilled',
                          },
                          {
                            name: 'PlayCircleFilledWhite',
                            value: 'PlayCircleFilledWhite',
                          },
                          {
                            name: 'PlayCircleOutline',
                            value: 'PlayCircleOutline',
                          },
                          {
                            name: 'Power',
                            value: 'Power',
                          },
                          {
                            name: 'Public',
                            value: 'Public',
                          },
                          {
                            name: 'Radio',
                            value: 'Radio',
                          },
                          {
                            name: 'Redo',
                            value: 'Redo',
                          },
                          {
                            name: 'Refresh',
                            value: 'Refresh',
                          },
                          {
                            name: 'Remove',
                            value: 'Remove',
                          },
                          {
                            name: 'RemoveCircle',
                            value: 'RemoveCircle',
                          },
                          {
                            name: 'RemoveCircleOutline',
                            value: 'RemoveCircleOutline',
                          },
                          {
                            name: 'Replay',
                            value: 'Replay',
                          },
                          {
                            name: 'Reply',
                            value: 'Reply',
                          },
                          {
                            name: 'Report',
                            value: 'Report',
                          },
                          {
                            name: 'ReportProblem',
                            value: 'ReportProblem',
                          },
                          {
                            name: 'Restaurant',
                            value: 'Restaurant',
                          },
                          {
                            name: 'RssFeed',
                            value: 'RssFeed',
                          },
                          {
                            name: 'Save',
                            value: 'Save',
                          },
                          {
                            name: 'SaveAlt',
                            value: 'SaveAlt',
                          },
                          {
                            name: 'School',
                            value: 'School',
                          },
                          {
                            name: 'Search',
                            value: 'Search',
                          },
                          {
                            name: 'Security',
                            value: 'Security',
                          },
                          {
                            name: 'Send',
                            value: 'Send',
                          },
                          {
                            name: 'Settings',
                            value: 'Settings',
                          },
                          {
                            name: 'ShoppingCart',
                            value: 'ShoppingCart',
                          },
                          {
                            name: 'ShowChart',
                            value: 'ShowChart',
                          },
                          {
                            name: 'Smartphone',
                            value: 'Smartphone',
                          },
                          {
                            name: 'SmokeFree',
                            value: 'SmokeFree',
                          },
                          {
                            name: 'SmokingRooms',
                            value: 'SmokingRooms',
                          },
                          {
                            name: 'Speaker',
                            value: 'Speaker',
                          },
                          {
                            name: 'Speed',
                            value: 'Speed',
                          },
                          {
                            name: 'Spellcheck',
                            value: 'Spellcheck',
                          },
                          {
                            name: 'SquareFoot',
                            value: 'SquareFoot',
                          },
                          {
                            name: 'Star',
                            value: 'Star',
                          },
                          {
                            name: 'StarBorder',
                            value: 'StarBorder',
                          },
                          {
                            name: 'StarHalf',
                            value: 'StarHalf',
                          },
                          {
                            name: 'StarOutline',
                            value: 'StarOutline',
                          },
                          {
                            name: 'StarRate',
                            value: 'StarRate',
                          },
                          {
                            name: 'Stars',
                            value: 'Stars',
                          },
                          {
                            name: 'Stop',
                            value: 'Stop',
                          },
                          {
                            name: 'Storefront',
                            value: 'Storefront',
                          },
                          {
                            name: 'Sync',
                            value: 'Sync',
                          },
                          {
                            name: 'Tab',
                            value: 'Tab',
                          },
                          {
                            name: 'TextFields',
                            value: 'TextFields',
                          },
                          {
                            name: 'ThumbDown',
                            value: 'ThumbDown',
                          },
                          {
                            name: 'ThumbDownAlt',
                            value: 'ThumbDownAlt',
                          },
                          {
                            name: 'ThumbUp',
                            value: 'ThumbUp',
                          },
                          {
                            name: 'ThumbUpAlt',
                            value: 'ThumbUpAlt',
                          },
                          {
                            name: 'ThumbsUpDown',
                            value: 'ThumbsUpDown',
                          },
                          {
                            name: 'Title',
                            value: 'Title',
                          },
                          {
                            name: 'TouchApp',
                            value: 'TouchApp',
                          },
                          {
                            name: 'Traffic',
                            value: 'Traffic',
                          },
                          {
                            name: 'Train',
                            value: 'Train',
                          },
                          {
                            name: 'Tram',
                            value: 'Tram',
                          },
                          {
                            name: 'Translate',
                            value: 'Translate',
                          },
                          {
                            name: 'TrendingDown',
                            value: 'TrendingDown',
                          },
                          {
                            name: 'TrendingFlat',
                            value: 'TrendingFlat',
                          },
                          {
                            name: 'TrendingUp',
                            value: 'TrendingUp',
                          },
                          {
                            name: 'Undo',
                            value: 'Undo',
                          },
                          {
                            name: 'Update',
                            value: 'Update',
                          },
                          {
                            name: 'Usb',
                            value: 'Usb',
                          },
                          {
                            name: 'VerifiedUser',
                            value: 'VerifiedUser',
                          },
                          {
                            name: 'VideoCall',
                            value: 'VideoCall',
                          },
                          {
                            name: 'Visibility',
                            value: 'Visibility',
                          },
                          {
                            name: 'VisibilityOff',
                            value: 'VisibilityOff',
                          },
                          {
                            name: 'Voicemail',
                            value: 'Voicemail',
                          },
                          {
                            name: 'VolumeDown',
                            value: 'VolumeDown',
                          },
                          {
                            name: 'VolumeMute',
                            value: 'VolumeMute',
                          },
                          {
                            name: 'VolumeOff',
                            value: 'VolumeOff',
                          },
                          {
                            name: 'VolumeUp',
                            value: 'VolumeUp',
                          },
                          {
                            name: 'Warning',
                            value: 'Warning',
                          },
                          {
                            name: 'Watch',
                            value: 'Watch',
                          },
                          {
                            name: 'WatchLater',
                            value: 'WatchLater',
                          },
                          {
                            name: 'Wc',
                            value: 'Wc',
                          },
                          {
                            name: 'Widgets',
                            value: 'Widgets',
                          },
                          {
                            name: 'Wifi',
                            value: 'Wifi',
                          },
                          {
                            name: 'Work',
                            value: 'Work',
                          },
                        ],
                      },
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
                          { name: 'Large', value: 'large' },
                          { name: 'Medium', value: 'medium' },
                          { name: 'Small', value: 'small' },
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
                          { name: 'Start', value: 'start' },
                          { name: 'End', value: 'end' },
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
                  ],
                  descendants: [],
                },
              ],
            },
          ],
        },
      ],
    };

    const onSaveHandler = () => {
      const newPrefab = { ...prefab };
      switch (varient) {
        case '404':
          structure404.descendants[3].descendants[0].options[3].value = endpoint
            .id.length
            ? endpoint
            : '';
          newPrefab.structure[0].descendants[0].descendants[0].descendants = [
            structure404,
          ];
          break;
        case '404-styled':
        default:
          structure404Styled.descendants[1].descendants[2].descendants[0].options[3].value = endpoint
            .id.length
            ? endpoint
            : '';
          newPrefab.structure[0].descendants[0].descendants[0].descendants = [
            structure404Styled,
          ];
          break;
      }
      save(newPrefab);
    };

    const renderPreview = () => {
      switch (varient) {
        case '404':
          return (
            <Box
              pad="medium"
              background="url(https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/404.jpg)"
              height="300px"
              justify="center"
              align="center"
            />
          );
        case '404-styled':
        default:
          return (
            <Box
              pad="medium"
              background="url(https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/404_Styled.jpg)"
              height="300px"
              justify="center"
              align="center"
            />
          );
      }
    };

    return (
      <>
        <Header onClose={close} title="Configure 404 error page" />
        <Content>
          <Field label="Select template version">
            <ButtonGroup
              onChange={({ target: { value } }) => {
                setVarient(value);
              }}
              value={varient}
            >
              <ButtonGroupButton
                label="Styled"
                value="404-styled"
                name="varients"
              />
              <ButtonGroupButton label="Simple" value="404" name="varients" />
            </ButtonGroup>
          </Field>
          <Box direction="column">
            <Field
              info={
                <Text size="small" color="grey700">
                  This is what the page will look like on the canvas
                </Text>
              }
            >
              <Text>Preview:</Text>
            </Field>
            <Box
              fill="true"
              round="4px"
              overflow="hidden"
              border={{
                color: '#E0E0E0',
                size: 'xsmall',
                style: 'solid',
                side: 'all',
              }}
            >
              {renderPreview()}
            </Box>
            <Box margin={{ top: '20px' }}>
              <Field label="Link to page (optional)">
                <EndpointSelector
                  value={endpoint}
                  onChange={value => setEndpoint(value)}
                />
              </Field>
            </Box>
          </Box>
        </Content>
        <Footer onClose={close} onSave={onSaveHandler} />
      </>
    );
  },
  structure: [
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
          value: '100%',
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
              value: '12',
              label: 'Column width',
              key: 'columnWidth',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
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
              value: '12',
              label: 'Column width (tablet landscape)',
              key: 'columnWidthTabletLandscape',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
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
              value: '12',
              label: 'Column width (tablet portrait)',
              key: 'columnWidthTabletPortrait',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
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
              value: '12',
              label: 'Column width (mobile)',
              key: 'columnWidthMobile',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
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
              value: '100%',
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
              value: 'center',
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
          ],
          descendants: [
            {
              name: 'Box',
              options: [
                {
                  value: 'center',
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
                  value: 'center',
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
                  value: '100%',
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
                  value: true,
                  label: 'Show background options',
                  key: 'backgroundOptions',
                  type: 'TOGGLE',
                },
                {
                  value: 'Light',
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
                  value: 10,
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
              ],
              descendants: [],
            },
          ],
        },
      ],
    },
  ],
}))();
