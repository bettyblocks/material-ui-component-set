(() => ({
  name: 'Simple dashboard',
  icon: 'DataTable',
  type: 'page',
  description:
    'View your content in a data table with cards containing counters.',
  detail:
    'This dashboard has a configurable data table and some cards containing static data. This to spark your interest and show what things are possible with the Page builder.',
  previewUrl: 'https://preview.betty.app/simple-dashboard',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Simple_Dashboard.jpg',
  category: 'DATA',
  beforeCreate: ({
    helpers: { useModelQuery },
    components: {
      Header,
      Content,
      Footer,
      Field,
      Text,
      Box,
      Button,
      ModelSelector,
      PropertiesSelector,
      PropertySelector,
      PartialSelector,
    },
    prefab,
    save,
    close,
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [properties, setProperties] = React.useState([]);
    const [searchProperty, setSearchProperty] = React.useState('');
    const [modelValidation, setModelValidation] = React.useState(false);
    const [propertiesValidation, setPropertiesValidation] =
      React.useState(false);

    const [stepNumber, setStepNumber] = React.useState(1);
    const [headerPartialId, setHeaderPartialId] = React.useState('');
    const [footerPartialId, setFooterPartialId] = React.useState('');

    const { data } = useModelQuery({
      variables: { id: modelId },
      skip: !modelId,
    });

    const getDescendantByRef = (refValue, structure) =>
      structure.reduce((acc, component) => {
        if (acc) return acc;
        if (
          // eslint-disable-next-line no-prototype-builtins
          component.hasOwnProperty('ref') &&
          Object.values(component.ref).indexOf(refValue) > -1
        ) {
          return component;
        }
        if (component.type === 'PARTIAL') {
          return acc;
        }
        return getDescendantByRef(refValue, component.descendants);
      }, null);

    const statusBox = (
      identifier,
      statusIcon,
      statusColor,
      statusNumber,
      statusTitle,
    ) => ({
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
              {
                name: 'None',
                value: 'none',
              },
              {
                name: 'Left',
                value: 'flex-start',
              },
              {
                name: 'Center',
                value: 'center',
              },
              {
                name: 'Right',
                value: 'flex-end',
              },
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
              {
                name: 'None',
                value: 'none',
              },
              {
                name: 'Top',
                value: 'flex-start',
              },
              {
                name: 'Center',
                value: 'center',
              },
              {
                name: 'Bottom',
                value: 'flex-end',
              },
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
          value: ['L', 'L', 'L', 'L'],
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
              {
                name: 'Static',
                value: 'static',
              },
              {
                name: 'Relative',
                value: 'relative',
              },
              {
                name: 'Absolute',
                value: 'absolute',
              },
              {
                name: 'Fixed',
                value: 'fixed',
              },
              {
                name: 'Sticky',
                value: 'sticky',
              },
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
          value: 'White',
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
              {
                name: 'Initial',
                value: 'initial',
              },
              {
                name: 'Contain',
                value: 'contain',
              },
              {
                name: 'Cover',
                value: 'cover',
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
          value: 'center center',
          label: 'Background position',
          key: 'backgroundPosition',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Left top',
                value: 'left top',
              },
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
              {
                name: 'Right top',
                value: 'right top',
              },
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
              {
                name: 'None',
                value: 'no-repeat',
              },
              {
                name: 'X',
                value: 'repeat-x',
              },
              {
                name: 'Y',
                value: 'repeat-y',
              },
              {
                name: 'All',
                value: 'repeat',
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
          value: 'inherit',
          label: 'Background attachment',
          key: 'backgroundAttachment',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Inherit',
                value: 'inherit',
              },
              {
                name: 'Scroll',
                value: 'scroll',
              },
              {
                name: 'Fixed',
                value: 'fixed',
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
              {
                name: 'None',
                value: 'none',
              },
              {
                name: 'Solid',
                value: 'solid',
              },
              {
                name: 'Dashed',
                value: 'dashed',
              },
              {
                name: 'Dotted',
                value: 'dotted',
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
              value: 'center',
              label: 'Alignment',
              key: 'alignment',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'None',
                    value: 'none',
                  },
                  {
                    name: 'Left',
                    value: 'flex-start',
                  },
                  {
                    name: 'Center',
                    value: 'center',
                  },
                  {
                    name: 'Right',
                    value: 'flex-end',
                  },
                  {
                    name: 'Justified',
                    value: 'space-between',
                  },
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
                  {
                    name: 'None',
                    value: 'none',
                  },
                  {
                    name: 'Top',
                    value: 'flex-start',
                  },
                  {
                    name: 'Center',
                    value: 'center',
                  },
                  {
                    name: 'Bottom',
                    value: 'flex-end',
                  },
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
              value: ['S', '0rem', '0rem', '0rem'],
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
                  {
                    name: 'Static',
                    value: 'static',
                  },
                  {
                    name: 'Relative',
                    value: 'relative',
                  },
                  {
                    name: 'Absolute',
                    value: 'absolute',
                  },
                  {
                    name: 'Fixed',
                    value: 'fixed',
                  },
                  {
                    name: 'Sticky',
                    value: 'sticky',
                  },
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
                  {
                    name: 'Initial',
                    value: 'initial',
                  },
                  {
                    name: 'Contain',
                    value: 'contain',
                  },
                  {
                    name: 'Cover',
                    value: 'cover',
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
              value: 'center center',
              label: 'Background position',
              key: 'backgroundPosition',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Left top',
                    value: 'left top',
                  },
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
                  {
                    name: 'Right top',
                    value: 'right top',
                  },
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
                  {
                    name: 'None',
                    value: 'no-repeat',
                  },
                  {
                    name: 'X',
                    value: 'repeat-x',
                  },
                  {
                    name: 'Y',
                    value: 'repeat-y',
                  },
                  {
                    name: 'All',
                    value: 'repeat',
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
              value: 'inherit',
              label: 'Background attachment',
              key: 'backgroundAttachment',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Inherit',
                    value: 'inherit',
                  },
                  {
                    name: 'Scroll',
                    value: 'scroll',
                  },
                  {
                    name: 'Fixed',
                    value: 'fixed',
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
                  {
                    name: 'None',
                    value: 'none',
                  },
                  {
                    name: 'Solid',
                    value: 'solid',
                  },
                  {
                    name: 'Dashed',
                    value: 'dashed',
                  },
                  {
                    name: 'Dotted',
                    value: 'dotted',
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
                      {
                        name: 'None',
                        value: 'none',
                      },
                      {
                        name: 'Left',
                        value: 'flex-start',
                      },
                      {
                        name: 'Center',
                        value: 'center',
                      },
                      {
                        name: 'Right',
                        value: 'flex-end',
                      },
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
                      {
                        name: 'None',
                        value: 'none',
                      },
                      {
                        name: 'Top',
                        value: 'flex-start',
                      },
                      {
                        name: 'Center',
                        value: 'center',
                      },
                      {
                        name: 'Bottom',
                        value: 'flex-end',
                      },
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
                  value: '64px',
                  configuration: {
                    as: 'UNIT',
                  },
                },
                {
                  type: 'SIZE',
                  label: 'Width',
                  key: 'width',
                  value: '64px',
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
                  value: ['0rem', '0rem', '0rem', '0rem'],
                  label: 'Inner space',
                  key: 'innerSpacing',
                  type: 'SIZES',
                },
                {
                  value: true,
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
                      {
                        name: 'Static',
                        value: 'static',
                      },
                      {
                        name: 'Relative',
                        value: 'relative',
                      },
                      {
                        name: 'Absolute',
                        value: 'absolute',
                      },
                      {
                        name: 'Fixed',
                        value: 'fixed',
                      },
                      {
                        name: 'Sticky',
                        value: 'sticky',
                      },
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
                  value: statusColor,
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
                  value: 25,
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
                      {
                        name: 'Initial',
                        value: 'initial',
                      },
                      {
                        name: 'Contain',
                        value: 'contain',
                      },
                      {
                        name: 'Cover',
                        value: 'cover',
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
                  value: 'center center',
                  label: 'Background position',
                  key: 'backgroundPosition',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'Left top',
                        value: 'left top',
                      },
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
                      {
                        name: 'Right top',
                        value: 'right top',
                      },
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
                      {
                        name: 'None',
                        value: 'no-repeat',
                      },
                      {
                        name: 'X',
                        value: 'repeat-x',
                      },
                      {
                        name: 'Y',
                        value: 'repeat-y',
                      },
                      {
                        name: 'All',
                        value: 'repeat',
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
                  value: 'inherit',
                  label: 'Background attachment',
                  key: 'backgroundAttachment',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'Inherit',
                        value: 'inherit',
                      },
                      {
                        name: 'Scroll',
                        value: 'scroll',
                      },
                      {
                        name: 'Fixed',
                        value: 'fixed',
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
                      {
                        name: 'None',
                        value: 'none',
                      },
                      {
                        name: 'Solid',
                        value: 'solid',
                      },
                      {
                        name: 'Dashed',
                        value: 'dashed',
                      },
                      {
                        name: 'Dotted',
                        value: 'dotted',
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
                  type: 'SIZE',
                  label: 'Border radius',
                  key: 'borderRadius',
                  value: '50%',
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
                  name: 'Avatar',
                  options: [
                    {
                      type: 'CUSTOM',
                      label: 'Type',
                      key: 'type',
                      value: 'icon',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Image',
                            value: 'img',
                          },
                          {
                            name: 'Letter',
                            value: 'letter',
                          },
                          {
                            name: 'Icon',
                            value: 'icon',
                          },
                        ],
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
                          option: 'type',
                          comparator: 'EQ',
                          value: 'img',
                        },
                      },
                    },
                    {
                      value: [],
                      label: 'Image alternative text',
                      key: 'imgAlt',
                      type: 'VARIABLE',
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
                      value: [],
                      label: 'Letter',
                      key: 'letter',
                      type: 'VARIABLE',
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'letter',
                        },
                      },
                    },
                    {
                      label: 'Icon',
                      key: 'icon',
                      value: statusIcon,
                      type: 'ICON',
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'icon',
                        },
                      },
                    },
                    {
                      type: 'CUSTOM',
                      label: 'Variant',
                      key: 'variant',
                      value: 'circle',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Circle',
                            value: 'circle',
                          },
                          {
                            name: 'Rounded',
                            value: 'rounded',
                          },
                          {
                            name: 'Square',
                            value: 'square',
                          },
                        ],
                      },
                    },
                    {
                      type: 'COLOR',
                      label: 'Background color',
                      key: 'backgroundColor',
                      value: 'Transparent',
                      configuration: {
                        condition: {
                          type: 'HIDE',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'img',
                        },
                      },
                    },
                    {
                      type: 'SIZE',
                      label: 'Width',
                      key: 'width',
                      value: '48px',
                      configuration: {
                        as: 'UNIT',
                      },
                    },
                    {
                      type: 'SIZE',
                      label: 'Height',
                      key: 'height',
                      value: '48px',
                      configuration: {
                        as: 'UNIT',
                      },
                    },
                    {
                      type: 'SIZES',
                      label: 'Outer Space',
                      key: 'margin',
                      value: ['M', 'M', 'M', 'M'],
                    },
                    {
                      value: true,
                      label: 'Styles',
                      key: 'styles',
                      type: 'TOGGLE',
                    },
                    {
                      value: '1.25rem',
                      label: 'Font Size',
                      key: 'fontSize',
                      type: 'TEXT',
                      configuration: {
                        as: 'UNIT',
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
                      label: 'Text color',
                      key: 'textColor',
                      value: statusColor,
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
                          {
                            name: '100',
                            value: '100',
                          },
                          {
                            name: '200',
                            value: '200',
                          },
                          {
                            name: '300',
                            value: '300',
                          },
                          {
                            name: '400',
                            value: '400',
                          },
                          {
                            name: '500',
                            value: '500',
                          },
                          {
                            name: '600',
                            value: '600',
                          },
                          {
                            name: '700',
                            value: '700',
                          },
                          {
                            name: '800',
                            value: '800',
                          },
                          {
                            name: '900',
                            value: '900',
                          },
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
                      value: ['Avatar'],
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
        {
          name: 'Text',
          options: [
            {
              type: 'VARIABLE',
              label: 'Content',
              key: 'content',
              value: [statusNumber],
              configuration: {
                as: 'MULTILINE',
              },
            },
            {
              type: 'TOGGLE',
              label: 'Display Rich Text',
              key: 'useInnerHtml',
              value: false,
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
                  {
                    name: 'Left',
                    value: 'left',
                  },
                  {
                    name: 'Center',
                    value: 'center',
                  },
                  {
                    name: 'Right',
                    value: 'right',
                  },
                ],
              },
            },
            {
              value: ['M', '0rem', '0rem', '0rem'],
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
              value: '_self',
              label: 'Open in',
              key: 'linkTarget',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Current Tab',
                    value: '_self',
                  },
                  {
                    name: 'New Tab',
                    value: '_blank',
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
                  {
                    name: '100',
                    value: '100',
                  },
                  {
                    name: '200',
                    value: '200',
                  },
                  {
                    name: '300',
                    value: '300',
                  },
                  {
                    name: '400',
                    value: '400',
                  },
                  {
                    name: '500',
                    value: '500',
                  },
                  {
                    name: '600',
                    value: '600',
                  },
                  {
                    name: '700',
                    value: '700',
                  },
                  {
                    name: '800',
                    value: '800',
                  },
                  {
                    name: '900',
                    value: '900',
                  },
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
          ref: {
            id: identifier,
          },
          options: [
            {
              type: 'VARIABLE',
              label: 'Content',
              key: 'content',
              value: [statusTitle],
              configuration: {
                as: 'MULTILINE',
              },
            },
            {
              type: 'TOGGLE',
              label: 'Display Rich Text',
              key: 'useInnerHtml',
              value: false,
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
                  {
                    name: 'Left',
                    value: 'left',
                  },
                  {
                    name: 'Center',
                    value: 'center',
                  },
                  {
                    name: 'Right',
                    value: 'right',
                  },
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
              value: '_self',
              label: 'Open in',
              key: 'linkTarget',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Current Tab',
                    value: '_self',
                  },
                  {
                    name: 'New Tab',
                    value: '_blank',
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
                  {
                    name: '100',
                    value: '100',
                  },
                  {
                    name: '200',
                    value: '200',
                  },
                  {
                    name: '300',
                    value: '300',
                  },
                  {
                    name: '400',
                    value: '400',
                  },
                  {
                    name: '500',
                    value: '500',
                  },
                  {
                    name: '600',
                    value: '600',
                  },
                  {
                    name: '700',
                    value: '700',
                  },
                  {
                    name: '800',
                    value: '800',
                  },
                  {
                    name: '900',
                    value: '900',
                  },
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
    });

    const prefabStructure = [
      {
        name: 'Grid',
        options: [
          {
            value: true,
            label: 'Toggle visibility',
            key: 'visibility',
            type: 'TOGGLE',
            configuration: {
              as: 'VISIBILITY',
            },
          },
          {
            value: '',
            label: 'Model',
            key: 'model',
            type: 'MODEL',
          },
          {
            value: {},
            label: 'Filter',
            key: 'filter',
            type: 'FILTER',
            configuration: {
              dependsOn: 'model',
            },
          },
          {
            value: '5',
            label: 'Repeated items (preview)',
            key: 'repeatedItems',
            type: 'NUMBER',
            configuration: {
              condition: {
                type: 'HIDE',
                option: 'model',
                comparator: 'EQ',
                value: '',
              },
            },
          },
          {
            value: 'container',
            label: 'Type',
            key: 'type',
            type: 'CUSTOM',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Container', value: 'container' },
                { name: 'Item', value: 'item' },
              ],
            },
          },
          {
            value: 'column',
            label: 'Direction',
            key: 'direction',
            type: 'CUSTOM',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Horizontal', value: 'row' },
                { name: 'Vertical', value: 'column' },
              ],
              condition: {
                type: 'SHOW',
                option: 'type',
                comparator: 'EQ',
                value: 'container',
              },
            },
          },
          {
            value: false,
            label: 'Reverse',
            key: 'reverse',
            type: 'TOGGLE',
            configuration: {
              condition: {
                type: 'SHOW',
                option: 'type',
                comparator: 'EQ',
                value: 'container',
              },
            },
          },
          {
            value: 'stretch',
            label: 'Align items',
            key: 'alignItems',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                { name: 'Start', value: 'flex-start' },
                { name: 'Center', value: 'center' },
                { name: 'End', value: 'flex-end' },
                { name: 'Stretch', value: 'stretch' },
                { name: 'Baseline', value: 'baseline' },
              ],
              condition: {
                type: 'SHOW',
                option: 'type',
                comparator: 'EQ',
                value: 'container',
              },
            },
          },
          {
            value: 'stretch',
            label: 'Align content',
            key: 'alignContent',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                { name: 'Stretch', value: 'stretch' },
                { name: 'Center', value: 'center' },
                { name: 'Start', value: 'flex-start' },
                { name: 'End', value: 'flex-end' },
                { name: 'Space around', value: 'space-around' },
                { name: 'Space between', value: 'space-between' },
              ],
              condition: {
                type: 'SHOW',
                option: 'type',
                comparator: 'EQ',
                value: 'container',
              },
            },
          },
          {
            value: 'flex-start',
            label: 'Justify',
            key: 'justify',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                { name: 'Start', value: 'flex-start' },
                { name: 'Center', value: 'center' },
                { name: 'End', value: 'flex-end' },
                { name: 'Space between', value: 'space-between' },
                { name: 'Space around', value: 'space-around' },
                { name: 'Space evenly', value: 'space-evenly' },
              ],
              condition: {
                type: 'SHOW',
                option: 'type',
                comparator: 'EQ',
                value: 'container',
              },
            },
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
            value: 'Transparent',
            label: 'Background color',
            key: 'backgroundColor',
            type: 'COLOR',
          },
          {
            value: '0',
            label: 'Spacing',
            key: 'spacing',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                { name: '0', value: '0' },
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
              ],
            },
          },
          {
            value: 'nowrap',
            label: 'Wrap',
            key: 'wrap',
            type: 'CUSTOM',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'No wrap', value: 'nowrap' },
                { name: 'Wrap', value: 'wrap' },
                { name: 'Wrap reverse', value: 'wrap-reverse' },
              ],
            },
          },
          {
            value: false,
            label: 'Zero min width',
            key: 'zeroMinWidth',
            type: 'TOGGLE',
          },
          {
            value: false,
            label: 'Show responsive options',
            key: 'responsiveOptions',
            type: 'TOGGLE',
          },
          {
            value: 'true',
            label: 'XS width',
            key: 'xsWidth',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                { name: 'Not set', value: 'false' },
                { name: 'Flexible', value: 'true' },
                { name: 'Fit content', value: 'auto' },
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
              condition: {
                type: 'SHOW',
                option: 'responsiveOptions',
                comparator: 'EQ',
                value: true,
              },
            },
          },
          {
            value: 'false',
            label: 'SM width',
            key: 'smWidth',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                { name: 'Not set', value: 'false' },
                { name: 'Flexible', value: 'true' },
                { name: 'Fit content', value: 'auto' },
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
              condition: {
                type: 'SHOW',
                option: 'responsiveOptions',
                comparator: 'EQ',
                value: true,
              },
            },
          },
          {
            value: 'false',
            label: 'MD width',
            key: 'mdWidth',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                { name: 'Not set', value: 'false' },
                { name: 'Flexible', value: 'true' },
                { name: 'Fit content', value: 'auto' },
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
              condition: {
                type: 'SHOW',
                option: 'responsiveOptions',
                comparator: 'EQ',
                value: true,
              },
            },
          },
          {
            value: 'false',
            label: 'LG width',
            key: 'lgWidth',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                { name: 'Not set', value: 'false' },
                { name: 'Flexible', value: 'true' },
                { name: 'Fit content', value: 'auto' },
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
              condition: {
                type: 'SHOW',
                option: 'responsiveOptions',
                comparator: 'EQ',
                value: true,
              },
            },
          },
          {
            value: 'false',
            label: 'XL width',
            key: 'xlWidth',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                { name: 'Not set', value: 'false' },
                { name: 'Flexible', value: 'true' },
                { name: 'Fit content', value: 'auto' },
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
              condition: {
                type: 'SHOW',
                option: 'responsiveOptions',
                comparator: 'EQ',
                value: true,
              },
            },
          },
          {
            value: 'built-in',
            label: 'Error message',
            key: 'showError',
            type: 'CUSTOM',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Built in', value: 'built-in' },
                { name: 'Interaction', value: 'interaction' },
              ],
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
            value: ['Grid'],
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
            name: 'Grid',
            options: [
              {
                value: true,
                label: 'Toggle visibility',
                key: 'visibility',
                type: 'TOGGLE',
                configuration: {
                  as: 'VISIBILITY',
                },
              },
              {
                value: '',
                label: 'Model',
                key: 'model',
                type: 'MODEL',
              },
              {
                value: {},
                label: 'Filter',
                key: 'filter',
                type: 'FILTER',
                configuration: {
                  dependsOn: 'model',
                },
              },
              {
                value: '5',
                label: 'Repeated items (preview)',
                key: 'repeatedItems',
                type: 'NUMBER',
                configuration: {
                  condition: {
                    type: 'HIDE',
                    option: 'model',
                    comparator: 'EQ',
                    value: '',
                  },
                },
              },
              {
                value: 'container',
                label: 'Type',
                key: 'type',
                type: 'CUSTOM',
                configuration: {
                  as: 'BUTTONGROUP',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Container', value: 'container' },
                    { name: 'Item', value: 'item' },
                  ],
                },
              },
              {
                value: 'column',
                label: 'Direction',
                key: 'direction',
                type: 'CUSTOM',
                configuration: {
                  as: 'BUTTONGROUP',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Horizontal', value: 'row' },
                    { name: 'Vertical', value: 'column' },
                  ],
                  condition: {
                    type: 'SHOW',
                    option: 'type',
                    comparator: 'EQ',
                    value: 'container',
                  },
                },
              },
              {
                value: false,
                label: 'Reverse',
                key: 'reverse',
                type: 'TOGGLE',
                configuration: {
                  condition: {
                    type: 'SHOW',
                    option: 'type',
                    comparator: 'EQ',
                    value: 'container',
                  },
                },
              },
              {
                value: 'stretch',
                label: 'Align items',
                key: 'alignItems',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Start', value: 'flex-start' },
                    { name: 'Center', value: 'center' },
                    { name: 'End', value: 'flex-end' },
                    { name: 'Stretch', value: 'stretch' },
                    { name: 'Baseline', value: 'baseline' },
                  ],
                  condition: {
                    type: 'SHOW',
                    option: 'type',
                    comparator: 'EQ',
                    value: 'container',
                  },
                },
              },
              {
                value: 'stretch',
                label: 'Align content',
                key: 'alignContent',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Stretch', value: 'stretch' },
                    { name: 'Center', value: 'center' },
                    { name: 'Start', value: 'flex-start' },
                    { name: 'End', value: 'flex-end' },
                    { name: 'Space around', value: 'space-around' },
                    { name: 'Space between', value: 'space-between' },
                  ],
                  condition: {
                    type: 'SHOW',
                    option: 'type',
                    comparator: 'EQ',
                    value: 'container',
                  },
                },
              },
              {
                value: 'flex-start',
                label: 'Justify',
                key: 'justify',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Start', value: 'flex-start' },
                    { name: 'Center', value: 'center' },
                    { name: 'End', value: 'flex-end' },
                    { name: 'Space between', value: 'space-between' },
                    { name: 'Space around', value: 'space-around' },
                    { name: 'Space evenly', value: 'space-evenly' },
                  ],
                  condition: {
                    type: 'SHOW',
                    option: 'type',
                    comparator: 'EQ',
                    value: 'container',
                  },
                },
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
                value: 'Transparent',
                label: 'Background color',
                key: 'backgroundColor',
                type: 'COLOR',
              },
              {
                value: '0',
                label: 'Spacing',
                key: 'spacing',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    { name: '0', value: '0' },
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
                  ],
                },
              },
              {
                value: 'nowrap',
                label: 'Wrap',
                key: 'wrap',
                type: 'CUSTOM',
                configuration: {
                  as: 'BUTTONGROUP',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'No wrap', value: 'nowrap' },
                    { name: 'Wrap', value: 'wrap' },
                    { name: 'Wrap reverse', value: 'wrap-reverse' },
                  ],
                },
              },
              {
                value: false,
                label: 'Zero min width',
                key: 'zeroMinWidth',
                type: 'TOGGLE',
              },
              {
                value: false,
                label: 'Show responsive options',
                key: 'responsiveOptions',
                type: 'TOGGLE',
              },
              {
                value: 'true',
                label: 'XS width',
                key: 'xsWidth',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Not set', value: 'false' },
                    { name: 'Flexible', value: 'true' },
                    { name: 'Fit content', value: 'auto' },
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
                  condition: {
                    type: 'SHOW',
                    option: 'responsiveOptions',
                    comparator: 'EQ',
                    value: true,
                  },
                },
              },
              {
                value: 'false',
                label: 'SM width',
                key: 'smWidth',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Not set', value: 'false' },
                    { name: 'Flexible', value: 'true' },
                    { name: 'Fit content', value: 'auto' },
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
                  condition: {
                    type: 'SHOW',
                    option: 'responsiveOptions',
                    comparator: 'EQ',
                    value: true,
                  },
                },
              },
              {
                value: 'false',
                label: 'MD width',
                key: 'mdWidth',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Not set', value: 'false' },
                    { name: 'Flexible', value: 'true' },
                    { name: 'Fit content', value: 'auto' },
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
                  condition: {
                    type: 'SHOW',
                    option: 'responsiveOptions',
                    comparator: 'EQ',
                    value: true,
                  },
                },
              },
              {
                value: 'false',
                label: 'LG width',
                key: 'lgWidth',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Not set', value: 'false' },
                    { name: 'Flexible', value: 'true' },
                    { name: 'Fit content', value: 'auto' },
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
                  condition: {
                    type: 'SHOW',
                    option: 'responsiveOptions',
                    comparator: 'EQ',
                    value: true,
                  },
                },
              },
              {
                value: 'false',
                label: 'XL width',
                key: 'xlWidth',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Not set', value: 'false' },
                    { name: 'Flexible', value: 'true' },
                    { name: 'Fit content', value: 'auto' },
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
                  condition: {
                    type: 'SHOW',
                    option: 'responsiveOptions',
                    comparator: 'EQ',
                    value: true,
                  },
                },
              },
              {
                value: 'built-in',
                label: 'Error message',
                key: 'showError',
                type: 'CUSTOM',
                configuration: {
                  as: 'BUTTONGROUP',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Built in', value: 'built-in' },
                    { name: 'Interaction', value: 'interaction' },
                  ],
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
                value: ['Grid'],
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
                ref: {
                  id: '#headerBox',
                },
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
                    value: ['0rem', '0rem', '0rem', '0rem'],
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
                    value: 'Primary',
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
                    type: 'PARTIAL',
                  },
                ],
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
                    value: true,
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
                    value: ['0rem', '0rem', '0rem', '0rem'],
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
                    value: 20,
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
                    name: 'Row',
                    options: [
                      {
                        type: 'CUSTOM',
                        label: 'Width',
                        key: 'maxRowWidth',
                        value: 'XL',
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
                        value: '',
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
                            value: '',
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
                            value: 'inherit',
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
                            value: ['0rem', 'S', 'S', 'S'],
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
                            name: 'Row',
                            options: [
                              {
                                type: 'CUSTOM',
                                label: 'Width',
                                key: 'maxRowWidth',
                                value: 'XL',
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
                                value: '',
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                    value: '',
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
                                    value: 'inherit',
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
                                    value: ['L', 'M', '0rem', 'M'],
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
                                    name: 'Text',
                                    ref: {
                                      id: '#titleText',
                                    },
                                    options: [
                                      {
                                        type: 'VARIABLE',
                                        label: 'Content',
                                        key: 'content',
                                        value: ['Dashboard'],
                                        configuration: {
                                          as: 'MULTILINE',
                                        },
                                      },
                                      {
                                        type: 'TOGGLE',
                                        label: 'Display Rich Text',
                                        key: 'useInnerHtml',
                                        value: false,
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
                                        value: '_self',
                                        label: 'Open in',
                                        key: 'linkTarget',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Current Tab',
                                              value: '_self',
                                            },
                                            {
                                              name: 'New Tab',
                                              value: '_blank',
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
                                          placeholder:
                                            'Starts with https:// or http://',
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
                              },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                    value: '',
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
                                    value: 'inherit',
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
                                    value: ['L', 'M', '0rem', 'M'],
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
                                        value: 'space-between',
                                        label: 'Alignment',
                                        key: 'alignment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'None',
                                              value: 'none',
                                            },
                                            {
                                              name: 'Left',
                                              value: 'flex-start',
                                            },
                                            {
                                              name: 'Center',
                                              value: 'center',
                                            },
                                            {
                                              name: 'Right',
                                              value: 'flex-end',
                                            },
                                            {
                                              name: 'Justified',
                                              value: 'space-between',
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        value: 'flex-end',
                                        label: 'Vertical alignment',
                                        key: 'valignment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'None',
                                              value: 'none',
                                            },
                                            {
                                              name: 'Top',
                                              value: 'flex-start',
                                            },
                                            {
                                              name: 'Center',
                                              value: 'center',
                                            },
                                            {
                                              name: 'Bottom',
                                              value: 'flex-end',
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        value: false,
                                        label:
                                          'Stretch (when in flex container)',
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
                                        value: ['0rem', '0rem', '0rem', '0rem'],
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
                                            {
                                              name: 'Static',
                                              value: 'static',
                                            },
                                            {
                                              name: 'Relative',
                                              value: 'relative',
                                            },
                                            {
                                              name: 'Absolute',
                                              value: 'absolute',
                                            },
                                            {
                                              name: 'Fixed',
                                              value: 'fixed',
                                            },
                                            {
                                              name: 'Sticky',
                                              value: 'sticky',
                                            },
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
                                            {
                                              name: 'Initial',
                                              value: 'initial',
                                            },
                                            {
                                              name: 'Contain',
                                              value: 'contain',
                                            },
                                            {
                                              name: 'Cover',
                                              value: 'cover',
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
                                        value: 'center center',
                                        label: 'Background position',
                                        key: 'backgroundPosition',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'DROPDOWN',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Left top',
                                              value: 'left top',
                                            },
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
                                            {
                                              name: 'Right top',
                                              value: 'right top',
                                            },
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
                                            {
                                              name: 'None',
                                              value: 'no-repeat',
                                            },
                                            {
                                              name: 'X',
                                              value: 'repeat-x',
                                            },
                                            {
                                              name: 'Y',
                                              value: 'repeat-y',
                                            },
                                            {
                                              name: 'All',
                                              value: 'repeat',
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
                                        value: 'inherit',
                                        label: 'Background attachment',
                                        key: 'backgroundAttachment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Inherit',
                                              value: 'inherit',
                                            },
                                            {
                                              name: 'Scroll',
                                              value: 'scroll',
                                            },
                                            {
                                              name: 'Fixed',
                                              value: 'fixed',
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
                                            {
                                              name: 'None',
                                              value: 'none',
                                            },
                                            {
                                              name: 'Solid',
                                              value: 'solid',
                                            },
                                            {
                                              name: 'Dashed',
                                              value: 'dashed',
                                            },
                                            {
                                              name: 'Dotted',
                                              value: 'dotted',
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
                                        ref: {
                                          id: '#modelText',
                                        },
                                        options: [
                                          {
                                            type: 'VARIABLE',
                                            label: 'Content',
                                            key: 'content',
                                            value: ['Tasks'],
                                            configuration: {
                                              as: 'MULTILINE',
                                            },
                                          },
                                          {
                                            type: 'TOGGLE',
                                            label: 'Display Rich Text',
                                            key: 'useInnerHtml',
                                            value: false,
                                          },
                                          {
                                            value: 'Title6',
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
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'right',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                            value: '_self',
                                            label: 'Open in',
                                            key: 'linkTarget',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Current Tab',
                                                  value: '_self',
                                                },
                                                {
                                                  name: 'New Tab',
                                                  value: '_blank',
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
                                              placeholder:
                                                'Starts with https:// or http://',
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
                                        name: 'Box',
                                        options: [
                                          {
                                            value: 'flex-end',
                                            label: 'Alignment',
                                            key: 'alignment',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'None',
                                                  value: 'none',
                                                },
                                                {
                                                  name: 'Left',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'flex-end',
                                                },
                                                {
                                                  name: 'Justified',
                                                  value: 'space-between',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: 'flex-end',
                                            label: 'Vertical alignment',
                                            key: 'valignment',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'None',
                                                  value: 'none',
                                                },
                                                {
                                                  name: 'Top',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Bottom',
                                                  value: 'flex-end',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: false,
                                            label:
                                              'Stretch (when in flex container)',
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
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                            label: 'Outer space',
                                            key: 'outerSpacing',
                                            type: 'SIZES',
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                                {
                                                  name: 'Static',
                                                  value: 'static',
                                                },
                                                {
                                                  name: 'Relative',
                                                  value: 'relative',
                                                },
                                                {
                                                  name: 'Absolute',
                                                  value: 'absolute',
                                                },
                                                {
                                                  name: 'Fixed',
                                                  value: 'fixed',
                                                },
                                                {
                                                  name: 'Sticky',
                                                  value: 'sticky',
                                                },
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
                                                {
                                                  name: 'Initial',
                                                  value: 'initial',
                                                },
                                                {
                                                  name: 'Contain',
                                                  value: 'contain',
                                                },
                                                {
                                                  name: 'Cover',
                                                  value: 'cover',
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
                                            value: 'center center',
                                            label: 'Background position',
                                            key: 'backgroundPosition',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Left top',
                                                  value: 'left top',
                                                },
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
                                                {
                                                  name: 'Right top',
                                                  value: 'right top',
                                                },
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
                                                {
                                                  name: 'None',
                                                  value: 'no-repeat',
                                                },
                                                {
                                                  name: 'X',
                                                  value: 'repeat-x',
                                                },
                                                {
                                                  name: 'Y',
                                                  value: 'repeat-y',
                                                },
                                                {
                                                  name: 'All',
                                                  value: 'repeat',
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
                                            value: 'inherit',
                                            label: 'Background attachment',
                                            key: 'backgroundAttachment',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Inherit',
                                                  value: 'inherit',
                                                },
                                                {
                                                  name: 'Scroll',
                                                  value: 'scroll',
                                                },
                                                {
                                                  name: 'Fixed',
                                                  value: 'fixed',
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
                                                {
                                                  name: 'None',
                                                  value: 'none',
                                                },
                                                {
                                                  name: 'Solid',
                                                  value: 'solid',
                                                },
                                                {
                                                  name: 'Dashed',
                                                  value: 'dashed',
                                                },
                                                {
                                                  name: 'Dotted',
                                                  value: 'dotted',
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
                                                value: ['1345'],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              },
                                              {
                                                type: 'TOGGLE',
                                                label: 'Display Rich Text',
                                                key: 'useInnerHtml',
                                                value: false,
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
                                                value: 'left',
                                                configuration: {
                                                  as: 'BUTTONGROUP',
                                                  dataType: 'string',
                                                  allowedInput: [
                                                    {
                                                      name: 'Left',
                                                      value: 'left',
                                                    },
                                                    {
                                                      name: 'Center',
                                                      value: 'center',
                                                    },
                                                    {
                                                      name: 'Right',
                                                      value: 'right',
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                value: [
                                                  '0rem',
                                                  'S',
                                                  '0rem',
                                                  '0rem',
                                                ],
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
                                                value: '_self',
                                                label: 'Open in',
                                                key: 'linkTarget',
                                                type: 'CUSTOM',
                                                configuration: {
                                                  as: 'BUTTONGROUP',
                                                  dataType: 'string',
                                                  allowedInput: [
                                                    {
                                                      name: 'Current Tab',
                                                      value: '_self',
                                                    },
                                                    {
                                                      name: 'New Tab',
                                                      value: '_blank',
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
                                                  placeholder:
                                                    'Starts with https:// or http://',
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
                                                value: '600',
                                                configuration: {
                                                  as: 'DROPDOWN',
                                                  dataType: 'string',
                                                  allowedInput: [
                                                    {
                                                      name: '100',
                                                      value: '100',
                                                    },
                                                    {
                                                      name: '200',
                                                      value: '200',
                                                    },
                                                    {
                                                      name: '300',
                                                      value: '300',
                                                    },
                                                    {
                                                      name: '400',
                                                      value: '400',
                                                    },
                                                    {
                                                      name: '500',
                                                      value: '500',
                                                    },
                                                    {
                                                      name: '600',
                                                      value: '600',
                                                    },
                                                    {
                                                      name: '700',
                                                      value: '700',
                                                    },
                                                    {
                                                      name: '800',
                                                      value: '800',
                                                    },
                                                    {
                                                      name: '900',
                                                      value: '900',
                                                    },
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
                                            ref: {
                                              id: '#totalText',
                                            },
                                            options: [
                                              {
                                                type: 'VARIABLE',
                                                label: 'Content',
                                                key: 'content',
                                                value: ['Tasks in total'],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              },
                                              {
                                                type: 'TOGGLE',
                                                label: 'Display Rich Text',
                                                key: 'useInnerHtml',
                                                value: false,
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
                                                value: 'left',
                                                configuration: {
                                                  as: 'BUTTONGROUP',
                                                  dataType: 'string',
                                                  allowedInput: [
                                                    {
                                                      name: 'Left',
                                                      value: 'left',
                                                    },
                                                    {
                                                      name: 'Center',
                                                      value: 'center',
                                                    },
                                                    {
                                                      name: 'Right',
                                                      value: 'right',
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                value: [
                                                  '0rem',
                                                  '0rem',
                                                  '0rem',
                                                  '0rem',
                                                ],
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
                                                value: '_self',
                                                label: 'Open in',
                                                key: 'linkTarget',
                                                type: 'CUSTOM',
                                                configuration: {
                                                  as: 'BUTTONGROUP',
                                                  dataType: 'string',
                                                  allowedInput: [
                                                    {
                                                      name: 'Current Tab',
                                                      value: '_self',
                                                    },
                                                    {
                                                      name: 'New Tab',
                                                      value: '_blank',
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
                                                  placeholder:
                                                    'Starts with https:// or http://',
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
                                                    {
                                                      name: '100',
                                                      value: '100',
                                                    },
                                                    {
                                                      name: '200',
                                                      value: '200',
                                                    },
                                                    {
                                                      name: '300',
                                                      value: '300',
                                                    },
                                                    {
                                                      name: '400',
                                                      value: '400',
                                                    },
                                                    {
                                                      name: '500',
                                                      value: '500',
                                                    },
                                                    {
                                                      name: '600',
                                                      value: '600',
                                                    },
                                                    {
                                                      name: '700',
                                                      value: '700',
                                                    },
                                                    {
                                                      name: '800',
                                                      value: '800',
                                                    },
                                                    {
                                                      name: '900',
                                                      value: '900',
                                                    },
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
                                      },
                                    ],
                                  },
                                ],
                              },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
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
                                    value: '',
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
                                    value: 'inherit',
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
                                    name: 'Row',
                                    options: [
                                      {
                                        type: 'CUSTOM',
                                        label: 'Width',
                                        key: 'maxRowWidth',
                                        value: 'Xl',
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
                                        value: '',
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
                                            value: '3',
                                            label: 'Column width',
                                            key: 'columnWidth',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '6',
                                            label:
                                              'Column width (tablet landscape)',
                                            key: 'columnWidthTabletLandscape',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '6',
                                            label:
                                              'Column width (tablet portrait)',
                                            key: 'columnWidthTabletPortrait',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '',
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
                                                {
                                                  name: 'None',
                                                  value: 'inherit',
                                                },
                                                {
                                                  name: 'Left',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'flex-end',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            type: 'CUSTOM',
                                            label: 'Vertical Alignment',
                                            key: 'verticalAlignment',
                                            value: 'inherit',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'None',
                                                  value: 'inherit',
                                                },
                                                {
                                                  name: 'Top',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Bottom',
                                                  value: 'flex-end',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                          statusBox(
                                            '#openText',
                                            'Assignment',
                                            'Primary',
                                            '890',
                                            'Tasks open',
                                          ),
                                        ],
                                      },
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
                                            value: '3',
                                            label: 'Column width',
                                            key: 'columnWidth',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '6',
                                            label:
                                              'Column width (tablet landscape)',
                                            key: 'columnWidthTabletLandscape',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '6',
                                            label:
                                              'Column width (tablet portrait)',
                                            key: 'columnWidthTabletPortrait',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '',
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
                                                {
                                                  name: 'None',
                                                  value: 'inherit',
                                                },
                                                {
                                                  name: 'Left',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'flex-end',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            type: 'CUSTOM',
                                            label: 'Vertical Alignment',
                                            key: 'verticalAlignment',
                                            value: 'inherit',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'None',
                                                  value: 'inherit',
                                                },
                                                {
                                                  name: 'Top',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Bottom',
                                                  value: 'flex-end',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                          statusBox(
                                            '#doneText',
                                            'Check',
                                            'Success',
                                            '410',
                                            'Tasks done',
                                          ),
                                        ],
                                      },
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
                                            value: '3',
                                            label: 'Column width',
                                            key: 'columnWidth',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '6',
                                            label:
                                              'Column width (tablet landscape)',
                                            key: 'columnWidthTabletLandscape',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '6',
                                            label:
                                              'Column width (tablet portrait)',
                                            key: 'columnWidthTabletPortrait',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '',
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
                                                {
                                                  name: 'None',
                                                  value: 'inherit',
                                                },
                                                {
                                                  name: 'Left',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'flex-end',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            type: 'CUSTOM',
                                            label: 'Vertical Alignment',
                                            key: 'verticalAlignment',
                                            value: 'inherit',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'None',
                                                  value: 'inherit',
                                                },
                                                {
                                                  name: 'Top',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Bottom',
                                                  value: 'flex-end',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                          statusBox(
                                            '#inProgressText',
                                            'AccessTime',
                                            'Warning',
                                            '34',
                                            'Tasks in progress',
                                          ),
                                        ],
                                      },
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
                                            value: '3',
                                            label: 'Column width',
                                            key: 'columnWidth',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '6',
                                            label:
                                              'Column width (tablet landscape)',
                                            key: 'columnWidthTabletLandscape',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '6',
                                            label:
                                              'Column width (tablet portrait)',
                                            key: 'columnWidthTabletPortrait',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                                {
                                                  name: 'Fit content',
                                                  value: 'fitContent',
                                                },
                                                {
                                                  name: 'Flexible',
                                                  value: 'flexible',
                                                },
                                                {
                                                  name: 'Hidden',
                                                  value: 'hidden',
                                                },
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
                                            value: '',
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
                                                {
                                                  name: 'None',
                                                  value: 'inherit',
                                                },
                                                {
                                                  name: 'Left',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'flex-end',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            type: 'CUSTOM',
                                            label: 'Vertical Alignment',
                                            key: 'verticalAlignment',
                                            value: 'inherit',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'None',
                                                  value: 'inherit',
                                                },
                                                {
                                                  name: 'Top',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Bottom',
                                                  value: 'flex-end',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                          statusBox(
                                            '#blockedText',
                                            'NotInterested',
                                            'Danger',
                                            '11',
                                            'Tasks blocked',
                                          ),
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          // another row
                          {
                            name: 'Row',
                            options: [
                              {
                                type: 'CUSTOM',
                                label: 'Width',
                                key: 'maxRowWidth',
                                value: 'XL',
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
                                value: '',
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
                                ref: {
                                  id: '#largeColumn',
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
                                    value: '12',
                                    label: 'Column width',
                                    key: 'columnWidth',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'flexible',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'flexible',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'flexible',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
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
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        {
                                          name: 'Flexible',
                                          value: 'flexible',
                                        },
                                        {
                                          name: 'Hidden',
                                          value: 'hidden',
                                        },
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
                                    value: '',
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
                                        {
                                          name: 'None',
                                          value: 'inherit',
                                        },
                                        {
                                          name: 'Left',
                                          value: 'flex-start',
                                        },
                                        {
                                          name: 'Center',
                                          value: 'center',
                                        },
                                        {
                                          name: 'Right',
                                          value: 'flex-end',
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    type: 'CUSTOM',
                                    label: 'Vertical Alignment',
                                    key: 'verticalAlignment',
                                    value: 'inherit',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'None',
                                          value: 'inherit',
                                        },
                                        {
                                          name: 'Top',
                                          value: 'flex-start',
                                        },
                                        {
                                          name: 'Center',
                                          value: 'center',
                                        },
                                        {
                                          name: 'Bottom',
                                          value: 'flex-end',
                                        },
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
                                    value: ['M', 'M', 'XL', 'M'],
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
                                        value: 'space-between',
                                        label: 'Alignment',
                                        key: 'alignment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'None',
                                              value: 'none',
                                            },
                                            {
                                              name: 'Left',
                                              value: 'flex-start',
                                            },
                                            {
                                              name: 'Center',
                                              value: 'center',
                                            },
                                            {
                                              name: 'Right',
                                              value: 'flex-end',
                                            },
                                            {
                                              name: 'Justified',
                                              value: 'space-between',
                                            },
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
                                            {
                                              name: 'None',
                                              value: 'none',
                                            },
                                            {
                                              name: 'Top',
                                              value: 'flex-start',
                                            },
                                            {
                                              name: 'Center',
                                              value: 'center',
                                            },
                                            {
                                              name: 'Bottom',
                                              value: 'flex-end',
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        value: false,
                                        label:
                                          'Stretch (when in flex container)',
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
                                        value: ['0rem', '0rem', 'M', '0rem'],
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
                                            {
                                              name: 'Static',
                                              value: 'static',
                                            },
                                            {
                                              name: 'Relative',
                                              value: 'relative',
                                            },
                                            {
                                              name: 'Absolute',
                                              value: 'absolute',
                                            },
                                            {
                                              name: 'Fixed',
                                              value: 'fixed',
                                            },
                                            {
                                              name: 'Sticky',
                                              value: 'sticky',
                                            },
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
                                            {
                                              name: 'Initial',
                                              value: 'initial',
                                            },
                                            {
                                              name: 'Contain',
                                              value: 'contain',
                                            },
                                            {
                                              name: 'Cover',
                                              value: 'cover',
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
                                        value: 'center center',
                                        label: 'Background position',
                                        key: 'backgroundPosition',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'DROPDOWN',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Left top',
                                              value: 'left top',
                                            },
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
                                            {
                                              name: 'Right top',
                                              value: 'right top',
                                            },
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
                                            {
                                              name: 'None',
                                              value: 'no-repeat',
                                            },
                                            {
                                              name: 'X',
                                              value: 'repeat-x',
                                            },
                                            {
                                              name: 'Y',
                                              value: 'repeat-y',
                                            },
                                            {
                                              name: 'All',
                                              value: 'repeat',
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
                                        value: 'inherit',
                                        label: 'Background attachment',
                                        key: 'backgroundAttachment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Inherit',
                                              value: 'inherit',
                                            },
                                            {
                                              name: 'Scroll',
                                              value: 'scroll',
                                            },
                                            {
                                              name: 'Fixed',
                                              value: 'fixed',
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
                                            {
                                              name: 'None',
                                              value: 'none',
                                            },
                                            {
                                              name: 'Solid',
                                              value: 'solid',
                                            },
                                            {
                                              name: 'Dashed',
                                              value: 'dashed',
                                            },
                                            {
                                              name: 'Dotted',
                                              value: 'dotted',
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
                                        ref: {
                                          id: '#listText',
                                        },
                                        options: [
                                          {
                                            type: 'VARIABLE',
                                            label: 'Content',
                                            key: 'content',
                                            value: ['Task list'],
                                            configuration: {
                                              as: 'MULTILINE',
                                            },
                                          },
                                          {
                                            type: 'TOGGLE',
                                            label: 'Display Rich Text',
                                            key: 'useInnerHtml',
                                            value: false,
                                          },
                                          {
                                            value: 'Title6',
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
                                                {
                                                  name: 'Left',
                                                  value: 'left',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'right',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                            value: '_self',
                                            label: 'Open in',
                                            key: 'linkTarget',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Current Tab',
                                                  value: '_self',
                                                },
                                                {
                                                  name: 'New Tab',
                                                  value: '_blank',
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
                                              placeholder:
                                                'Starts with https:// or http://',
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
                                                {
                                                  name: '100',
                                                  value: '100',
                                                },
                                                {
                                                  name: '200',
                                                  value: '200',
                                                },
                                                {
                                                  name: '300',
                                                  value: '300',
                                                },
                                                {
                                                  name: '400',
                                                  value: '400',
                                                },
                                                {
                                                  name: '500',
                                                  value: '500',
                                                },
                                                {
                                                  name: '600',
                                                  value: '600',
                                                },
                                                {
                                                  name: '700',
                                                  value: '700',
                                                },
                                                {
                                                  name: '800',
                                                  value: '800',
                                                },
                                                {
                                                  name: '900',
                                                  value: '900',
                                                },
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
                                            value: 'none',
                                            label: 'Alignment',
                                            key: 'alignment',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'None',
                                                  value: 'none',
                                                },
                                                {
                                                  name: 'Left',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'flex-end',
                                                },
                                                {
                                                  name: 'Justified',
                                                  value: 'space-between',
                                                },
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
                                                {
                                                  name: 'None',
                                                  value: 'none',
                                                },
                                                {
                                                  name: 'Top',
                                                  value: 'flex-start',
                                                },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Bottom',
                                                  value: 'flex-end',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: false,
                                            label:
                                              'Stretch (when in flex container)',
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
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                            label: 'Outer space',
                                            key: 'outerSpacing',
                                            type: 'SIZES',
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
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
                                                {
                                                  name: 'Static',
                                                  value: 'static',
                                                },
                                                {
                                                  name: 'Relative',
                                                  value: 'relative',
                                                },
                                                {
                                                  name: 'Absolute',
                                                  value: 'absolute',
                                                },
                                                {
                                                  name: 'Fixed',
                                                  value: 'fixed',
                                                },
                                                {
                                                  name: 'Sticky',
                                                  value: 'sticky',
                                                },
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
                                                {
                                                  name: 'Initial',
                                                  value: 'initial',
                                                },
                                                {
                                                  name: 'Contain',
                                                  value: 'contain',
                                                },
                                                {
                                                  name: 'Cover',
                                                  value: 'cover',
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
                                            value: 'center center',
                                            label: 'Background position',
                                            key: 'backgroundPosition',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Left top',
                                                  value: 'left top',
                                                },
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
                                                {
                                                  name: 'Right top',
                                                  value: 'right top',
                                                },
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
                                                {
                                                  name: 'None',
                                                  value: 'no-repeat',
                                                },
                                                {
                                                  name: 'X',
                                                  value: 'repeat-x',
                                                },
                                                {
                                                  name: 'Y',
                                                  value: 'repeat-y',
                                                },
                                                {
                                                  name: 'All',
                                                  value: 'repeat',
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
                                            value: 'inherit',
                                            label: 'Background attachment',
                                            key: 'backgroundAttachment',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Inherit',
                                                  value: 'inherit',
                                                },
                                                {
                                                  name: 'Scroll',
                                                  value: 'scroll',
                                                },
                                                {
                                                  name: 'Fixed',
                                                  value: 'fixed',
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
                                                {
                                                  name: 'None',
                                                  value: 'none',
                                                },
                                                {
                                                  name: 'Solid',
                                                  value: 'solid',
                                                },
                                                {
                                                  name: 'Dashed',
                                                  value: 'dashed',
                                                },
                                                {
                                                  name: 'Dotted',
                                                  value: 'dotted',
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
                                            name: 'TextField',
                                            ref: {
                                              id: '#searchField',
                                            },
                                            options: [
                                              {
                                                value: {
                                                  label: ['Search'],
                                                  value: [],
                                                },
                                                label: 'Label',
                                                key: 'customModelAttribute',
                                                type: 'CUSTOM_MODEL_ATTRIBUTE',
                                                configuration: {
                                                  allowedTypes: ['string'],
                                                },
                                              },
                                              {
                                                value: false,
                                                label: 'Validation options',
                                                key: 'validationOptions',
                                                type: 'TOGGLE',
                                              },
                                              {
                                                label: 'Validation pattern',
                                                key: 'pattern',
                                                value: '',
                                                type: 'TEXT',
                                                configuration: {
                                                  placeholder:
                                                    '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                                                  condition: {
                                                    type: 'SHOW',
                                                    option: 'validationOptions',
                                                    comparator: 'EQ',
                                                    value: true,
                                                  },
                                                },
                                              },
                                              {
                                                label: 'Min length',
                                                key: 'minlength',
                                                value: '',
                                                type: 'NUMBER',
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
                                                label: 'Max length',
                                                key: 'maxlength',
                                                value: '',
                                                type: 'NUMBER',
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
                                                value: [
                                                  'This field is required',
                                                ],
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
                                                value: ['Invalid value'],
                                                label:
                                                  'Pattern mismatch message',
                                                key: 'validationPatternMismatch',
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
                                                value: [
                                                  'This value is too short',
                                                ],
                                                label:
                                                  'Value too short message',
                                                key: 'validationTooShort',
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
                                                value: [
                                                  'This value is too long',
                                                ],
                                                label: 'Value too long message',
                                                key: 'validationTooLong',
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
                                                value: true,
                                                label: 'Spellcheck',
                                                key: 'spellCheck',
                                                type: 'TOGGLE',
                                              },
                                              {
                                                value: true,
                                                label: 'Autocomplete',
                                                key: 'autoComplete',
                                                type: 'TOGGLE',
                                              },
                                              {
                                                type: 'TOGGLE',
                                                label: 'Disabled',
                                                key: 'disabled',
                                                value: false,
                                              },
                                              {
                                                value: [],
                                                label: 'Placeholder',
                                                key: 'placeholder',
                                                type: 'VARIABLE',
                                              },
                                              {
                                                value: [],
                                                label: 'Helper text',
                                                key: 'helperText',
                                                type: 'VARIABLE',
                                              },
                                              {
                                                label: 'Variant',
                                                key: 'variant',
                                                value: 'outlined',
                                                type: 'CUSTOM',
                                                configuration: {
                                                  as: 'BUTTONGROUP',
                                                  dataType: 'string',
                                                  allowedInput: [
                                                    {
                                                      name: 'Standard',
                                                      value: 'standard',
                                                    },
                                                    {
                                                      name: 'Outlined',
                                                      value: 'outlined',
                                                    },
                                                    {
                                                      name: 'Filled',
                                                      value: 'filled',
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                type: 'TOGGLE',
                                                label: 'Full width',
                                                key: 'fullWidth',
                                                value: false,
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
                                                    {
                                                      name: 'Medium',
                                                      value: 'medium',
                                                    },
                                                    {
                                                      name: 'Small',
                                                      value: 'small',
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                label: 'Margin',
                                                key: 'margin',
                                                value: 'none',
                                                type: 'CUSTOM',
                                                configuration: {
                                                  as: 'BUTTONGROUP',
                                                  dataType: 'string',
                                                  allowedInput: [
                                                    {
                                                      name: 'None',
                                                      value: 'none',
                                                    },
                                                    {
                                                      name: 'Dense',
                                                      value: 'dense',
                                                    },
                                                    {
                                                      name: 'Normal',
                                                      value: 'normal',
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                label: 'Adornment',
                                                key: 'adornmentIcon',
                                                value: 'Search',
                                                type: 'ICON',
                                              },
                                              {
                                                type: 'CUSTOM',
                                                label: 'Position',
                                                key: 'adornmentPosition',
                                                value: 'start',
                                                configuration: {
                                                  condition: {
                                                    type: 'HIDE',
                                                    option: 'adornmentIcon',
                                                    comparator: 'EQ',
                                                    value: '',
                                                  },
                                                  as: 'BUTTONGROUP',
                                                  dataType: 'string',
                                                  allowedInput: [
                                                    {
                                                      name: 'Start',
                                                      value: 'start',
                                                    },
                                                    {
                                                      name: 'End',
                                                      value: 'end',
                                                    },
                                                  ],
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
                                                label: 'Background color',
                                                key: 'backgroundColor',
                                                value: 'White',
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
                                                value: true,
                                                label: 'Hide label',
                                                key: 'hideLabel',
                                                type: 'TOGGLE',
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
                                                type: 'COLOR',
                                                label: 'Placeholder color',
                                                key: 'placeholderColor',
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
                                              {
                                                value: false,
                                                label: 'Advanced settings',
                                                key: 'advancedSettings',
                                                type: 'TOGGLE',
                                              },
                                              {
                                                type: 'VARIABLE',
                                                label: 'name attribute',
                                                key: 'nameAttribute',
                                                value: [],
                                                configuration: {
                                                  condition: {
                                                    type: 'SHOW',
                                                    option: 'advancedSettings',
                                                    comparator: 'EQ',
                                                    value: true,
                                                  },
                                                },
                                              },
                                              {
                                                type: 'VARIABLE',
                                                label: 'Test attribute',
                                                key: 'dataComponentAttribute',
                                                value: ['TextField'],
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
                                            name: 'Button',
                                            ref: {
                                              id: '#openCreateBtn',
                                            },
                                            style: {
                                              name: 'Filled',
                                              overwrite: [
                                                {
                                                  name: 'basis',
                                                  content: {
                                                    backgroundColor: {
                                                      type: 'THEME_COLOR',
                                                      value: 'primary',
                                                    },
                                                    boxShadow: 'none',
                                                    color: {
                                                      type: 'THEME_COLOR',
                                                      value: 'white',
                                                    },
                                                    fontFamily: 'Roboto',
                                                    fontSize: '0.875rem',
                                                    fontStyle: 'none',
                                                    fontWeight: '400',
                                                    padding: [
                                                      '0.6875rem',
                                                      '1.375rem',
                                                    ],
                                                    textDecoration: 'none',
                                                    textTransform: 'none',
                                                  },
                                                },
                                              ],
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
                                                value: ['New Task'],
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
                                                value: 'Add',
                                                type: 'ICON',
                                              },
                                              {
                                                value: 'medium',
                                                label: 'Icon size',
                                                key: 'size',
                                                type: 'CUSTOM',
                                                configuration: {
                                                  as: 'BUTTONGROUP',
                                                  dataType: 'string',
                                                  allowedInput: [
                                                    {
                                                      name: 'Large',
                                                      value: 'large',
                                                    },
                                                    {
                                                      name: 'Medium',
                                                      value: 'medium',
                                                    },
                                                    {
                                                      name: 'Small',
                                                      value: 'small',
                                                    },
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
                                                    {
                                                      name: 'Start',
                                                      value: 'start',
                                                    },
                                                    {
                                                      name: 'End',
                                                      value: 'end',
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                value: [
                                                  '0rem',
                                                  '0rem',
                                                  '0rem',
                                                  'M',
                                                ],
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
                                                label:
                                                  'Toggle tooltip visibility',
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
                                            {
                                              name: 'None',
                                              value: 'none',
                                            },
                                            {
                                              name: 'Left',
                                              value: 'flex-start',
                                            },
                                            {
                                              name: 'Center',
                                              value: 'center',
                                            },
                                            {
                                              name: 'Right',
                                              value: 'flex-end',
                                            },
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
                                            {
                                              name: 'None',
                                              value: 'none',
                                            },
                                            {
                                              name: 'Top',
                                              value: 'flex-start',
                                            },
                                            {
                                              name: 'Center',
                                              value: 'center',
                                            },
                                            {
                                              name: 'Bottom',
                                              value: 'flex-end',
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        value: false,
                                        label:
                                          'Stretch (when in flex container)',
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
                                        value: ['0rem', '0rem', '0rem', '0rem'],
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
                                            {
                                              name: 'Static',
                                              value: 'static',
                                            },
                                            {
                                              name: 'Relative',
                                              value: 'relative',
                                            },
                                            {
                                              name: 'Absolute',
                                              value: 'absolute',
                                            },
                                            {
                                              name: 'Fixed',
                                              value: 'fixed',
                                            },
                                            {
                                              name: 'Sticky',
                                              value: 'sticky',
                                            },
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
                                        value: 'White',
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
                                            {
                                              name: 'Initial',
                                              value: 'initial',
                                            },
                                            {
                                              name: 'Contain',
                                              value: 'contain',
                                            },
                                            {
                                              name: 'Cover',
                                              value: 'cover',
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
                                        value: 'center center',
                                        label: 'Background position',
                                        key: 'backgroundPosition',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'DROPDOWN',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Left top',
                                              value: 'left top',
                                            },
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
                                            {
                                              name: 'Right top',
                                              value: 'right top',
                                            },
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
                                            {
                                              name: 'None',
                                              value: 'no-repeat',
                                            },
                                            {
                                              name: 'X',
                                              value: 'repeat-x',
                                            },
                                            {
                                              name: 'Y',
                                              value: 'repeat-y',
                                            },
                                            {
                                              name: 'All',
                                              value: 'repeat',
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
                                        value: 'inherit',
                                        label: 'Background attachment',
                                        key: 'backgroundAttachment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Inherit',
                                              value: 'inherit',
                                            },
                                            {
                                              name: 'Scroll',
                                              value: 'scroll',
                                            },
                                            {
                                              name: 'Fixed',
                                              value: 'fixed',
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
                                        value: 'Light',
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
                                        value: '1px',
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
                                            {
                                              name: 'None',
                                              value: 'none',
                                            },
                                            {
                                              name: 'Solid',
                                              value: 'solid',
                                            },
                                            {
                                              name: 'Dashed',
                                              value: 'dashed',
                                            },
                                            {
                                              name: 'Dotted',
                                              value: 'dotted',
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
                                        type: 'SIZE',
                                        label: 'Border radius',
                                        key: 'borderRadius',
                                        value: '4px',
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
                                        name: 'DataTable',
                                        ref: {
                                          id: '#dataTable',
                                        },
                                        options: [
                                          {
                                            value: '',
                                            label: 'Model',
                                            key: 'model',
                                            type: 'MODEL_AND_RELATION',
                                          },
                                          {
                                            value: {},
                                            label: 'Filter',
                                            key: 'filter',
                                            type: 'FILTER',
                                            configuration: {
                                              dependsOn: 'model',
                                            },
                                          },
                                          {
                                            value: '',
                                            label: 'Order by',
                                            key: 'orderProperty',
                                            type: 'PROPERTY',
                                            configuration: {
                                              dependsOn: 'model',
                                            },
                                          },
                                          {
                                            value: 'asc',
                                            label: 'Sort order',
                                            key: 'sortOrder',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              dependsOn: 'model',
                                              allowedInput: [
                                                {
                                                  name: 'Ascending',
                                                  value: 'asc',
                                                },
                                                {
                                                  name: 'Descending',
                                                  value: 'desc',
                                                },
                                              ],
                                              condition: {
                                                type: 'HIDE',
                                                option: 'orderProperty',
                                                comparator: 'EQ',
                                                value: '',
                                              },
                                            },
                                          },
                                          {
                                            value: '',
                                            label: 'Search on property',
                                            key: 'searchProperty',
                                            type: 'PROPERTY',
                                            configuration: {
                                              dependsOn: 'model',
                                            },
                                          },
                                          {
                                            value: '',
                                            label: 'Hide built-in search field',
                                            key: 'hideSearch',
                                            type: 'TOGGLE',
                                            configuration: {
                                              dependsOn: 'model',
                                            },
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label: 'Search on text',
                                            key: 'labelSearchOn',
                                            value: ['Search on'],
                                            configuration: {
                                              dependsOn: 'model',
                                              condition: {
                                                type: 'HIDE',
                                                option: 'hideSearch',
                                                comparator: 'EQ',
                                                value: true,
                                              },
                                            },
                                          },
                                          {
                                            value: true,
                                            label: 'Hide text-overflow',
                                            key: 'hideTextOverflow',
                                            type: 'TOGGLE',
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label: 'Title',
                                            key: 'title',
                                            value: [''],
                                          },
                                          {
                                            value: 'Title4',
                                            label: 'Title type',
                                            key: 'titleType',
                                            type: 'FONT',
                                          },
                                          {
                                            label: 'Pagination',
                                            key: 'pagination',
                                            value: 'always',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              dependsOn: 'model',
                                              allowedInput: [
                                                {
                                                  name: 'Always',
                                                  value: 'always',
                                                },
                                                {
                                                  name: 'When needed',
                                                  value: 'whenNeeded',
                                                },
                                                {
                                                  name: 'Never',
                                                  value: 'never',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            value: false,
                                            label: 'Auto load on scroll',
                                            key: 'autoLoadOnScroll',
                                            type: 'TOGGLE',
                                            configuration: {
                                              dependsOn: 'model',
                                              condition: {
                                                type: 'SHOW',
                                                option: 'pagination',
                                                comparator: 'EQ',
                                                value: 'never',
                                              },
                                            },
                                          },
                                          {
                                            value: '50',
                                            label:
                                              'Number of records to auto load',
                                            key: 'autoLoadTakeAmount',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              dependsOn: 'model',
                                              allowedInput: [
                                                {
                                                  name: '5',
                                                  value: '5',
                                                },
                                                {
                                                  name: '10',
                                                  value: '10',
                                                },
                                                {
                                                  name: '25',
                                                  value: '25',
                                                },
                                                {
                                                  name: '50',
                                                  value: '50',
                                                },
                                                {
                                                  name: '100',
                                                  value: '100',
                                                },
                                              ],
                                              condition: {
                                                type: 'SHOW',
                                                option: 'autoLoadOnScroll',
                                                comparator: 'EQ',
                                                value: true,
                                              },
                                            },
                                          },
                                          {
                                            value: '5',
                                            label: 'Rows per page',
                                            key: 'take',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              dependsOn: 'model',
                                              allowedInput: [
                                                {
                                                  name: '5',
                                                  value: '5',
                                                },
                                                {
                                                  name: '10',
                                                  value: '10',
                                                },
                                                {
                                                  name: '25',
                                                  value: '25',
                                                },
                                                {
                                                  name: '50',
                                                  value: '50',
                                                },
                                                {
                                                  name: '100',
                                                  value: '100',
                                                },
                                              ],
                                              condition: {
                                                type: 'HIDE',
                                                option: 'autoLoadOnScroll',
                                                comparator: 'EQ',
                                                value: true,
                                              },
                                            },
                                          },
                                          {
                                            value: '',
                                            label: 'Placeholder rows',
                                            key: 'placeholderTake',
                                            type: 'NUMBER',
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label: 'Rows per page text',
                                            key: 'labelRowsPerPage',
                                            value: ['Rows per page'],
                                            configuration: {
                                              condition: {
                                                type: 'HIDE',
                                                option: 'pagination',
                                                comparator: 'EQ',
                                                value: 'never',
                                              },
                                            },
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label:
                                              "Pagination label (x 'of' y)",
                                            key: 'labelNumberOfPages',
                                            value: ['of'],
                                            configuration: {
                                              condition: {
                                                type: 'HIDE',
                                                option: 'pagination',
                                                comparator: 'EQ',
                                                value: 'never',
                                              },
                                            },
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
                                            type: 'TOGGLE',
                                            label: 'Sticky header',
                                            key: 'stickyHeader',
                                            value: false,
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
                                                {
                                                  name: 'Small',
                                                  value: 'small',
                                                },
                                                {
                                                  name: 'Medium',
                                                  value: 'medium',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            type: 'COLOR',
                                            label: 'Background',
                                            key: 'background',
                                            value: 'Transparent',
                                          },
                                          {
                                            type: 'COLOR',
                                            label: 'Background header',
                                            key: 'backgroundHeader',
                                            value: 'Transparent',
                                          },
                                          {
                                            label: 'Square',
                                            key: 'square',
                                            value: true,
                                            type: 'TOGGLE',
                                          },
                                          {
                                            label: 'Striped',
                                            key: 'striped',
                                            value: false,
                                            type: 'TOGGLE',
                                          },
                                          {
                                            type: 'COLOR',
                                            label: 'Stripe color',
                                            key: 'stripeColor',
                                            value: 'Light',
                                            configuration: {
                                              condition: {
                                                type: 'SHOW',
                                                option: 'striped',
                                                comparator: 'EQ',
                                                value: true,
                                              },
                                            },
                                          },
                                          {
                                            label: 'Variant',
                                            key: 'variant',
                                            value: 'flat',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Flat',
                                                  value: 'flat',
                                                },
                                                {
                                                  name: 'Elevation',
                                                  value: 'elevation',
                                                },
                                                {
                                                  name: 'Outlined',
                                                  value: 'outlined',
                                                },
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
                                                {
                                                  name: '1',
                                                  value: '1',
                                                },
                                                {
                                                  name: '2',
                                                  value: '2',
                                                },
                                                {
                                                  name: '3',
                                                  value: '3',
                                                },
                                                {
                                                  name: '4',
                                                  value: '4',
                                                },
                                                {
                                                  name: '5',
                                                  value: '5',
                                                },
                                                {
                                                  name: '6',
                                                  value: '6',
                                                },
                                                {
                                                  name: '7',
                                                  value: '7',
                                                },
                                                {
                                                  name: '8',
                                                  value: '8',
                                                },
                                                {
                                                  name: '9',
                                                  value: '9',
                                                },
                                                {
                                                  name: '10',
                                                  value: '10',
                                                },
                                                {
                                                  name: '11',
                                                  value: '11',
                                                },
                                                {
                                                  name: '12',
                                                  value: '12',
                                                },
                                                {
                                                  name: '13',
                                                  value: '13',
                                                },
                                                {
                                                  name: '14',
                                                  value: '14',
                                                },
                                                {
                                                  name: '15',
                                                  value: '15',
                                                },
                                                {
                                                  name: '16',
                                                  value: '16',
                                                },
                                                {
                                                  name: '17',
                                                  value: '17',
                                                },
                                                {
                                                  name: '18',
                                                  value: '18',
                                                },
                                                {
                                                  name: '19',
                                                  value: '19',
                                                },
                                                {
                                                  name: '20',
                                                  value: '20',
                                                },
                                                {
                                                  name: '21',
                                                  value: '21',
                                                },
                                                {
                                                  name: '22',
                                                  value: '22',
                                                },
                                                {
                                                  name: '23',
                                                  value: '23',
                                                },
                                                {
                                                  name: '24',
                                                  value: '24',
                                                },
                                              ],
                                              condition: {
                                                type: 'SHOW',
                                                option: 'variant',
                                                comparator: 'EQ',
                                                value: 'elevation',
                                              },
                                            },
                                          },
                                          {
                                            value: '',
                                            label: 'Row click',
                                            key: 'linkTo',
                                            type: 'ENDPOINT',
                                          },
                                          {
                                            type: 'COLOR',
                                            label: 'Row hover color',
                                            key: 'backgroundRowHover',
                                            value: 'Transparent',
                                            configuration: {
                                              condition: {
                                                type: 'HIDE',
                                                option: 'linkTo',
                                                comparator: 'EQ',
                                                value: '',
                                              },
                                            },
                                          },
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                            label: 'Outer space',
                                            key: 'outerSpacing',
                                            type: 'SIZES',
                                          },
                                          {
                                            value: 'built-in',
                                            label: 'Error message',
                                            key: 'showError',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              dependsOn: 'model',
                                              allowedInput: [
                                                {
                                                  name: 'Built in',
                                                  value: 'built-in',
                                                },
                                                {
                                                  name: 'Interaction',
                                                  value: 'interaction',
                                                },
                                              ],
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
                                            value: ['DataTable'],
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
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Box',
                ref: {
                  id: '#footerBox',
                },
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
                    value: ['0rem', '0rem', '0rem', '0rem'],
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
                    value: 20,
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
                    type: 'PARTIAL',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const defaultHeaderstructure = [
      {
        name: 'Row',
        options: [
          {
            type: 'CUSTOM',
            label: 'Width',
            key: 'maxRowWidth',
            value: 'XL',
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
            value: '',
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
                value: 'flexible',
                label: 'Column width',
                key: 'columnWidth',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Fit content',
                      value: 'fitContent',
                    },
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
                value: 'flexible',
                label: 'Column width (tablet landscape)',
                key: 'columnWidthTabletLandscape',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Fit content',
                      value: 'fitContent',
                    },
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
                value: 'flexible',
                label: 'Column width (tablet portrait)',
                key: 'columnWidthTabletPortrait',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Fit content',
                      value: 'fitContent',
                    },
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
                value: 'flexible',
                label: 'Column width (mobile)',
                key: 'columnWidthMobile',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Fit content',
                      value: 'fitContent',
                    },
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
                value: '',
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
                value: 'inherit',
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
                name: 'AppBar',
                options: [
                  {
                    label: 'Background color',
                    key: 'backgroundColor',
                    value: 'Primary',
                    type: 'COLOR',
                  },
                  {
                    label: 'Text color',
                    key: 'color',
                    value: 'White',
                    type: 'COLOR',
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
                    label: 'Position',
                    key: 'position',
                    value: 'static',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Fixed',
                          value: 'fixed',
                        },
                        {
                          name: 'Absolute',
                          value: 'absolute',
                        },
                        {
                          name: 'Sticky',
                          value: 'sticky',
                        },
                        {
                          name: 'Static',
                          value: 'static',
                        },
                        {
                          name: 'Relative',
                          value: 'relative',
                        },
                      ],
                    },
                  },
                  {
                    label: 'Title',
                    key: 'title',
                    value: [''],
                    type: 'VARIABLE',
                  },
                  {
                    label: 'Logo',
                    key: 'logoSource',
                    value: [
                      'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                    ],
                    type: 'VARIABLE',
                  },
                  {
                    type: 'SIZE',
                    label: 'Logo Width',
                    key: 'logoWidth',
                    value: '150px',
                    configuration: {
                      as: 'UNIT',
                    },
                  },
                  {
                    label: 'Align items',
                    key: 'alignItems',
                    value: 'right',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Left',
                          value: 'left',
                        },
                        {
                          name: 'Right',
                          value: 'right',
                        },
                      ],
                    },
                  },
                  {
                    label: 'Page',
                    key: 'endpoint',
                    value: '',
                    type: 'ENDPOINT',
                  },
                  {
                    label: 'Variant',
                    key: 'appBarVariant',
                    value: 'flat',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Flat',
                          value: 'flat',
                        },
                        {
                          name: 'Elevation',
                          value: 'elevation',
                        },
                        {
                          name: 'Outlined',
                          value: 'outlined',
                        },
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
                        option: 'appBarVariant',
                        comparator: 'EQ',
                        value: 'elevation',
                      },
                    },
                  },
                  {
                    label: 'Square',
                    key: 'square',
                    value: true,
                    type: 'TOGGLE',
                  },
                  {
                    label: 'Size',
                    key: 'toolbarVariant',
                    value: 'regular',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        {
                          name: 'Regular',
                          value: 'regular',
                        },
                        {
                          name: 'Dense',
                          value: 'dense',
                        },
                      ],
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
                    value: ['AppBar'],
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
                      name: 'Filled',
                      overwrite: [
                        {
                          name: 'basis',
                          content: {
                            backgroundColor: {
                              type: 'STATIC',
                              value: 'transparent',
                            },
                            boxShadow: 'none',
                            color: {
                              type: 'THEME_COLOR',
                              value: 'white',
                            },
                            fontFamily: 'Roboto',
                            fontSize: '0.875rem',
                            fontStyle: 'none',
                            fontWeight: '400',
                            padding: ['0rem', '0rem'],
                            textDecoration: 'none',
                            textTransform: 'none',
                          },
                        },
                      ],
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
                        value: ['Menu 1'],
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
                            {
                              name: 'New Tab',
                              value: '_blank',
                            },
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
                            {
                              name: 'Large',
                              value: 'large',
                            },
                            {
                              name: 'Medium',
                              value: 'medium',
                            },
                            {
                              name: 'Small',
                              value: 'small',
                            },
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
                            {
                              name: 'Start',
                              value: 'start',
                            },
                            {
                              name: 'End',
                              value: 'end',
                            },
                          ],
                        },
                      },
                      {
                        value: ['0rem', 'M', '0rem', 'M'],
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
                  {
                    name: 'Button',
                    style: {
                      name: 'Filled',
                      overwrite: [
                        {
                          name: 'basis',
                          content: {
                            backgroundColor: {
                              type: 'STATIC',
                              value: 'transparent',
                            },
                            boxShadow: 'none',
                            color: {
                              type: 'THEME_COLOR',
                              value: 'white',
                            },
                            fontFamily: 'Roboto',
                            fontSize: '0.875rem',
                            fontStyle: 'none',
                            fontWeight: '400',
                            padding: ['0rem', '0rem'],
                            textDecoration: 'none',
                            textTransform: 'none',
                          },
                        },
                      ],
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
                        value: ['Menu 2'],
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
                            {
                              name: 'New Tab',
                              value: '_blank',
                            },
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
                            {
                              name: 'Large',
                              value: 'large',
                            },
                            {
                              name: 'Medium',
                              value: 'medium',
                            },
                            {
                              name: 'Small',
                              value: 'small',
                            },
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
                            {
                              name: 'Start',
                              value: 'start',
                            },
                            {
                              name: 'End',
                              value: 'end',
                            },
                          ],
                        },
                      },
                      {
                        value: ['0rem', '0rem', '0rem', 'M'],
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
      },
    ];

    const defaultFooterStructure = [
      {
        name: 'Text',
        options: [
          {
            type: 'VARIABLE',
            label: 'Content',
            key: 'content',
            value: ['Powered by Betty Blocks'],
            configuration: {
              as: 'MULTILINE',
            },
          },
          {
            type: 'TOGGLE',
            label: 'Display Rich Text',
            key: 'useInnerHtml',
            value: false,
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
            value: ['L', 'L', 'L', 'L'],
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
            value: '_self',
            label: 'Open in',
            key: 'linkTarget',
            type: 'CUSTOM',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Current Tab', value: '_self' },
                { name: 'New Tab', value: '_blank' },
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
    ];

    const disabledKinds = [
      'BELONGS_TO',
      'HAS_AND_BELONGS_TO_MANY',
      'HAS_MANY',
      'MULTI_FILE',
      'AUTO_INCREMENT',
      'COUNT',
      'MULTI_IMAGE',
      'PDF',
      'RICH_TEXT',
      'SIGNED_PDF',
      'SUM',
      'BOOLEAN_EXPRESSION',
      'DATE_EXPRESSION',
      'DATE_TIME_EXPRESSION',
      'DECIMAL_EXPRESSION',
      'INTEGER_EXPRESSION',
      'MINUTES_EXPRESSION',
      'PRICE_EXPRESSION',
      'STRING_EXPRESSION',
      'TEXT_EXPRESSION',
      'MINUTES',
      'ZIPCODE',
    ];

    const stepper = {
      setStep: (step) => {
        if (step === 1) {
          return (
            <>
              <Box pad={{ bottom: '15px' }}>
                <Box pad={{ bottom: '15px' }}>
                  <Text size="medium" weight="bolder">
                    Select partials
                  </Text>
                </Box>
                <Box pad={{ bottom: '15px' }}>
                  <Text color="grey700">
                    By using a partial for the top menu and footer you can
                    easily reuse the same structure without having to go through
                    every page.
                  </Text>
                </Box>
                <Field label="HEADER PARTIAL">
                  <PartialSelector
                    label="Select a partial"
                    onChange={(headerId) => {
                      setHeaderPartialId(headerId);
                    }}
                    preSelected="Top menu"
                    value={headerPartialId}
                    allowedTypes={[
                      'BODY_COMPONENT',
                      'CONTAINER_COMPONENT',
                      'CONTENT_COMPONENT',
                    ]}
                  />
                </Field>
              </Box>
              <Box pad={{ bottom: '15px' }}>
                <Field label="FOOTER PARTIAL">
                  <PartialSelector
                    label="Select a partial"
                    onChange={(footerId) => {
                      setFooterPartialId(footerId);
                    }}
                    preSelected="Footer"
                    value={footerPartialId}
                    allowedTypes={[
                      'BODY_COMPONENT',
                      'CONTAINER_COMPONENT',
                      'CONTENT_COMPONENT',
                    ]}
                  />
                </Field>
              </Box>
            </>
          );
        }
        return (
          <>
            <Field
              label="Model"
              error={
                modelValidation && (
                  <Text color="#e82600">Selecting a model is required</Text>
                )
              }
            >
              <ModelSelector
                onChange={(value) => {
                  setModelValidation(false);
                  setModelId(value);
                }}
                value={modelId}
              />
            </Field>
            <Field
              label="Columns in the data table"
              error={
                propertiesValidation && (
                  <Text color="#e82600">Selecting a property is required</Text>
                )
              }
            >
              <PropertiesSelector
                modelId={modelId}
                value={properties}
                disabledKinds={disabledKinds}
                onChange={(value) => {
                  setProperties(value);
                  setPropertiesValidation(false);
                }}
              />
            </Field>
            <Field label="Select search property for data table">
              <PropertySelector
                modelId={modelId}
                onChange={(value) => {
                  setSearchProperty(value);
                }}
                value={searchProperty}
                disabled={!modelId}
              />
            </Field>
          </>
        );
      },
      onSave: () => {
        if (!modelId || !properties.length) {
          setModelValidation(!modelId);

          setPropertiesValidation(!properties.length);
          return;
        }
        const newPrefab = { ...prefab };

        const dataTable = getDescendantByRef('#dataTable', prefabStructure);
        dataTable.options[0].value = modelId;
        properties.filter((property) => property.kind !== 'SERIAL');
        properties.forEach((property) => {
          dataTable.descendants.push({
            name: 'DataTableColumn',
            options: [
              {
                value: true,
                label: 'Initial visibility',
                key: 'visible',
                type: 'TOGGLE',
                configuration: {
                  as: 'VISIBILITY',
                },
              },
              {
                value: property.kind === 'IMAGE' ? '' : property,
                label: 'Property',
                key: 'property',
                type: 'PROPERTY',
              },
              {
                type: 'TOGGLE',
                label: 'Sortable',
                key: 'sortable',
                value: false,
              },
              {
                type: 'VARIABLE',
                label: 'Header text',
                key: 'headerText',
                value: property.kind === 'IMAGE' ? [`${property.label}`] : [''],
              },
              {
                value: 'Body1',
                label: 'Header Type',
                key: 'type',
                type: 'FONT',
              },
              {
                type: 'VARIABLE',
                label: 'Content',
                key: 'content',
                value: [''],
                configuration: {
                  as: 'MULTILINE',
                },
              },
              {
                value: 'Body1',
                label: 'Body type',
                key: 'bodyType',
                type: 'FONT',
              },
              {
                type: 'CUSTOM',
                label: 'Column Alignment',
                key: 'horizontalAlignment',
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
                type: 'SIZE',
                label: 'Width',
                key: 'width',
                value: '',
                configuration: {
                  as: 'UNIT',
                },
              },
              {
                type: 'COLOR',
                label: 'Background',
                key: 'background',
                value: 'Transparent',
              },
              {
                type: 'COLOR',
                label: 'Border color',
                key: 'borderColor',
                value: 'Light',
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
                value: ['DataTableColumn'],
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
            descendants:
              property.kind === 'IMAGE'
                ? [
                    {
                      name: 'Media',
                      options: [
                        {
                          key: 'type',
                          label: 'Media type',
                          value: 'data',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Image', value: 'img' },
                              { name: 'Data/URL', value: 'url' },
                              { name: 'Video', value: 'video' },
                              { name: 'I-frame', value: 'iframe' },
                            ],
                          },
                        },
                        {
                          key: 'imageFileSource',
                          label: 'Select image',
                          value: '',
                          type: 'PUBLIC_FILE',
                          configuration: {
                            mediaType: 'IMAGE',
                            allowedExtensions: ['image/*'],
                            condition: {
                              type: 'SHOW',
                              option: 'type',
                              comparator: 'EQ',
                              value: 'img',
                            },
                          },
                        },
                        {
                          key: 'videoFileSource',
                          label: 'Select video',
                          value: '',
                          type: 'PUBLIC_FILE',
                          configuration: {
                            mediaType: 'Video',
                            allowedExtensions: ['video/*'],
                            condition: {
                              type: 'SHOW',
                              option: 'type',
                              comparator: 'EQ',
                              value: 'video',
                            },
                          },
                        },
                        {
                          value: property,
                          type: 'PROPERTY',
                          label: 'Property',
                          key: 'propertyFileSource',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'type',
                              comparator: 'EQ',
                              value: 'data',
                            },
                          },
                        },
                        {
                          value: [''],
                          label: 'URL source',
                          key: 'urlFileSource',
                          type: 'VARIABLE',
                          configuration: {
                            placeholder: 'Starts with https:// or http://',
                            as: 'MULTILINE',
                            condition: {
                              type: 'SHOW',
                              option: 'type',
                              comparator: 'EQ',
                              value: 'url',
                            },
                          },
                        },
                        {
                          value: 'image',
                          label: 'Type',
                          type: 'CUSTOM',
                          key: 'urlSourceType',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Image', value: 'image' },
                              { name: 'Video', value: 'video' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'type',
                              comparator: 'EQ',
                              value: 'url',
                            },
                          },
                        },
                        {
                          value: [],
                          label: 'I-frame source',
                          key: 'iframeSource',
                          type: 'VARIABLE',
                          configuration: {
                            as: 'MULTILINE',
                            condition: {
                              type: 'SHOW',
                              option: 'type',
                              comparator: 'EQ',
                              value: 'iframe',
                            },
                          },
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
                          value: [],
                          label: 'Image Alternative Text',
                          key: 'imgAlt',
                          type: 'VARIABLE',
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
                          value: [],
                          label: 'Title',
                          key: 'title',
                          type: 'VARIABLE',
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
                          type: 'SIZE',
                          label: 'Height',
                          key: 'height',
                          value: '',
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
                          value: false,
                          label: 'Advanced settings',
                          key: 'advancedSettings',
                          type: 'TOGGLE',
                        },
                        {
                          type: 'VARIABLE',
                          label: 'Test attribute',
                          key: 'dataComponentAttribute',
                          value: ['Media'],
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
                  ]
                : [],
          });
        });

        getDescendantByRef('#modelText', prefabStructure).options[0].value = [
          `${data.model.label}s`,
        ];
        getDescendantByRef('#totalText', prefabStructure).options[0].value = [
          `${data.model.label}s in total`,
        ];
        getDescendantByRef('#openText', prefabStructure).options[0].value = [
          `${data.model.label}s open`,
        ];
        getDescendantByRef('#doneText', prefabStructure).options[0].value = [
          `${data.model.label}s done`,
        ];
        getDescendantByRef(
          '#inProgressText',
          prefabStructure,
        ).options[0].value = [`${data.model.label}s in progress`];
        getDescendantByRef('#blockedText', prefabStructure).options[0].value = [
          `${data.model.label}s blocked`,
        ];
        getDescendantByRef('#titleText', prefabStructure).options[0].value = [
          `${data.model.label}s Dashboard`,
        ];
        getDescendantByRef('#listText', prefabStructure).options[0].value = [
          `${data.model.label}s list`,
        ];
        getDescendantByRef('#openCreateBtn', prefabStructure).options[1].value =
          [`New ${data.model.label}`];
        if (searchProperty) {
          const searchPropertyLabel = data.model.properties.find(
            (prop) => prop.id === searchProperty.id[0],
          ).name;
          getDescendantByRef(
            '#searchField',
            prefabStructure,
          ).options[12].value = [`Search on ${searchPropertyLabel}`];
          newPrefab.interactions.push({
            name: 'Filter',
            sourceEvent: 'onChange',
            parameters: [
              {
                parameter: 'property',
                operator: 'matches',
                resolveValue: false,
                id: [...searchProperty.id],
              },
            ],
            ref: {
              targetComponentId: '#dataTable',
              sourceComponentId: '#searchField',
            },
            type: 'Custom',
          });
        }

        const partialHeader = getDescendantByRef('#headerBox', prefabStructure);
        if (headerPartialId) {
          partialHeader.descendants[0].partialId = headerPartialId;
        } else {
          partialHeader.descendants = defaultHeaderstructure;
        }
        const partialFooter = getDescendantByRef('#footerBox', prefabStructure);
        if (footerPartialId) {
          partialFooter.descendants[0].partialId = footerPartialId;
        } else {
          partialFooter.descendants = defaultFooterStructure;
        }

        newPrefab.structure[0].descendants[0].descendants = prefabStructure;
        save(newPrefab);
      },
      buttons: () => (
        <Box direction="row" justify="between">
          <Box direction="row" margin="2rem">
            <Button
              label="Previous"
              size="large"
              background={{ color: '#f0f1f5' }}
              onClick={() => {
                if (stepNumber === 1) {
                  return;
                }
                const newStepnumber = stepNumber - 1;
                setStepNumber(newStepnumber);
              }}
              margin={{ right: '5px' }}
              disabled={stepNumber === 1}
            />
            <Button
              label="Next"
              size="large"
              disabled={stepNumber === stepper.stepAmount}
              onClick={() => {
                const newStepnumber = stepNumber + 1;
                setStepNumber(newStepnumber);
              }}
              primary
            />
          </Box>
          <Box>
            <Footer
              onClose={close}
              onSave={stepNumber === stepper.stepAmount && stepper.onSave}
            />
          </Box>
        </Box>
      ),
      progressBar: () => {
        return (
          <Box
            justify="center"
            margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
          >
            <Text size="medium" weight="bold">{`Step: ${stepNumber + 1} / ${
              stepper.stepAmount + 1
            }`}</Text>
          </Box>
        );
      },
      stepAmount: 2,
    };

    return (
      <>
        <Header onClose={close} title="Configure simple dashboard" />
        {stepper.progressBar()}
        <Content>
          <Field>{stepper.setStep(stepNumber)}</Field>
        </Content>
        {stepper.buttons()}
      </>
    );
  },
  variables: [],
  actions: [],
  interactions: [],
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
              value: 'Transparent',
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
              value: 'inherit',
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
          descendants: [],
        },
      ],
    },
  ],
}))();
