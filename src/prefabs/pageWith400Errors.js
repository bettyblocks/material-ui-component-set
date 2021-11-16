(() => ({
  name: 'Error pages: 403/404',
  icon: 'NavbarIcon',
  type: 'page',
  description: 'Configure a 403 or 404 error page for your application.',
  detail:
    'You can choose between a 403 page for unauthorized access or a 404 page for when a page could not be found.',
  previewUrl: 'https://preview.betty.app/404-styled',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_400_Pages.png',
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
    const [errorType, setErrorType] = React.useState('403');
    const [varient, setVarient] = React.useState('styled');
    const [endpoint, setEndpoint] = React.useState({
      id: '',
      pageId: '',
      params: {},
    });
    const [renderValues, setRenderValues] = React.useState({
      image:
        'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/404.svg',
      errorCode: '404',
      errorMessage: 'Page not found.',
      subMessage: "We can't seem to find that one.",
    });

    React.useEffect(() => {
      switch (errorType) {
        case '403':
          setRenderValues({
            image:
              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/403.svg',
            errorCode: '403',
            errorMessage: 'Unauthorized.',
            subMessage: 'You do not have access to this page.',
            defaultPreviewImage:
              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_403.jpg',
            styledPreviewImage:
              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_403_Styled.jpg',
          });
          break;
        case '404':
        default:
          setRenderValues({
            image:
              'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/404.svg',
            errorCode: '404',
            errorMessage: 'Page not found.',
            subMessage: "We can't seem to find that one.",
            defaultPreviewImage:
              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_404_.jpg',
            styledPreviewImage:
              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_404_Styled_.jpg',
          });
          break;
      }
    }, [errorType]);

    const structureDefault = {
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
          name: 'Text',
          options: [
            {
              type: 'VARIABLE',
              label: 'Content',
              key: 'content',
              value: [`${renderValues.errorCode}`],
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
              value: true,
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
        {
          name: 'Text',
          options: [
            {
              type: 'VARIABLE',
              label: 'Content',
              key: 'content',
              value: [`${renderValues.errorMessage}`],
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
        {
          name: 'Text',
          options: [
            {
              type: 'VARIABLE',
              label: 'Content',
              key: 'content',
              value: [`${renderValues.subMessage}`],
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
              name: 'Button',
              style: {
                overwrite: {
                  boxShadow: 'none',
                  padding: ['0.6875rem', '1.375rem'],
                  fontWeight: '400',
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
    };

    const structureStyled = {
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
              value: [`${renderValues.image}`],
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
              name: 'Text',
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Content',
                  key: 'content',
                  value: [`${renderValues.errorMessage}`],
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
            {
              name: 'Text',
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Content',
                  key: 'content',
                  value: [`${renderValues.subMessage}`],
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
                  name: 'Button',
                  style: {
                    overwrite: {
                      boxShadow: 'none',
                      padding: ['0.6875rem', '1.375rem'],
                      fontWeight: '400',
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
    };

    const onSaveHandler = () => {
      const newPrefab = { ...prefab };
      switch (varient) {
        case 'default':
          structureDefault.descendants[3].descendants[0].options[3].value = endpoint
            .id.length
            ? endpoint
            : '';
          newPrefab.structure[0].descendants[0].descendants[0].descendants = [
            structureDefault,
          ];
          break;
        case 'styled':
        default:
          structureStyled.descendants[1].descendants[2].descendants[0].options[3].value = endpoint
            .id.length
            ? endpoint
            : '';
          newPrefab.structure[0].descendants[0].descendants[0].descendants = [
            structureStyled,
          ];
          break;
      }
      save(newPrefab);
    };

    const renderPreview = () => {
      switch (varient) {
        case 'default':
          return (
            <Box
              pad="medium"
              background={`url(${renderValues.defaultPreviewImage})`}
              height="300px"
              justify="center"
              align="center"
            />
          );
        case 'styled':
        default:
          return (
            <Box
              pad="medium"
              background={`url(${renderValues.styledPreviewImage})`}
              height="300px"
              justify="center"
              align="center"
            />
          );
      }
    };

    return (
      <>
        <Header onClose={close} title="Configure 400 error page" />
        <Content>
          <Box direction="row" gap="small">
            <Field label="Select error type">
              <ButtonGroup
                onChange={({ target: { value } }) => {
                  setErrorType(value);
                }}
                value={errorType}
              >
                <ButtonGroupButton label="403" value="403" name="types" />
                <ButtonGroupButton label="404" value="404" name="types" />
              </ButtonGroup>
            </Field>
            <Field label="Select template version">
              <ButtonGroup
                onChange={({ target: { value } }) => {
                  setVarient(value);
                }}
                value={varient}
              >
                <ButtonGroupButton
                  label="Styled"
                  value="styled"
                  name="varients"
                />
                <ButtonGroupButton
                  label="Simple"
                  value="default"
                  name="varients"
                />
              </ButtonGroup>
            </Field>
          </Box>

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
              descendants: [],
            },
          ],
        },
      ],
    },
  ],
}))();
