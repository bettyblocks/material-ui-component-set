(() => ({
  name: 'List With Data',
  icon: 'ListWithDataIcon',
  category: 'DATA',
  keywords: ['Data', 'list', 'listwithdata', 'collection'],
  beforeCreate: ({
    components: {
      Content,
      Header,
      Field,
      Footer,
      ModelSelector,
      PropertySelector,
    },
    prefab,
    save,
    close,
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [property, setProperty] = React.useState('');
    const reduceStructure = (refValue, structure) =>
      structure.reduce((acc, component) => {
        if (acc) return acc;
        if (
          component.ref &&
          Object.values(component.ref).indexOf(refValue) > -1
        ) {
          return component;
        }
        return reduceStructure(refValue, component.descendants);
      }, null);

    return (
      <>
        <Header title="Configure a list with data" onClose={close} />
        <Content>
          <Field label="Model">
            <ModelSelector
              onChange={value => {
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
          <Field label="Property">
            <PropertySelector
              onChange={value => {
                setProperty(value);
              }}
              modelId={modelId}
              value={property}
            />
          </Field>
        </Content>
        <Footer
          onSave={() => {
            const newPrefab = { ...prefab };

            const dataList = reduceStructure('#dataList', newPrefab.structure);
            dataList.options[0].value = modelId;

            const listItem = reduceStructure('#listItem', newPrefab.structure);
            listItem.options[0].value = [property];

            save(newPrefab);
          }}
          onClose={close}
        />
      </>
    );
  },
  structure: [
    {
      name: 'List',
      options: [
        {
          type: 'COLOR',
          label: 'Background color',
          key: 'backgroundColor',
          value: 'Transparent',
        },
        {
          type: 'TOGGLE',
          label: 'Disable padding',
          key: 'disablePadding',
          value: false,
        },
        {
          value: ['0rem', '0rem', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          type: 'TOGGLE',
          label: 'Dense',
          key: 'dense',
          value: false,
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
          value: ['List'],
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
          name: 'DataList',
          ref: {
            id: '#dataList',
          },
          options: [
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
              type: 'PROPERTY',
              label: 'Order by',
              key: 'orderBy',
              value: '',
              configuration: {
                dependsOn: 'model',
              },
            },
            {
              type: 'CUSTOM',
              label: 'Sort order',
              key: 'order',
              value: 'asc',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                condition: {
                  type: 'HIDE',
                  option: 'orderBy',
                  comparator: 'EQ',
                  value: '',
                },
                allowedInput: [
                  { name: 'Ascending', value: 'asc' },
                  { name: 'Descending', value: 'desc' },
                ],
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
            },
            {
              label: 'Pagination',
              key: 'pagination',
              value: 'never',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Always', value: 'always' },
                  { name: 'When needed', value: 'whenNeeded' },
                  { name: 'Never', value: 'never' },
                ],
              },
            },
            {
              value: '5',
              label: 'Rows per page (max 50)',
              key: 'take',
              type: 'NUMBER',
            },
            {
              value: '',
              label: 'Placeholder rows',
              key: 'placeholderTake',
              type: 'NUMBER',
            },
            {
              type: 'CUSTOM',
              label: 'Type',
              key: 'type',
              value: 'inline',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'List',
                    value: 'list',
                  },
                  {
                    name: 'Grid',
                    value: 'grid',
                  },
                  {
                    name: 'Inline',
                    value: 'inline',
                  },
                ],
              },
            },
            {
              type: 'SIZE',
              label: 'Min Width',
              key: 'width',
              value: '200px',
              configuration: {
                as: 'UNIT',
                condition: {
                  type: 'SHOW',
                  option: 'type',
                  comparator: 'EQ',
                  value: 'grid',
                },
              },
            },
            {
              type: 'SIZE',
              label: 'Gap',
              key: 'gap',
              value: '1rem',
              configuration: {
                as: 'UNIT',
                condition: {
                  type: 'SHOW',
                  option: 'type',
                  comparator: 'EQ',
                  value: 'grid',
                },
              },
            },
            {
              value: ['0rem', '0rem', 'M', '0rem'],
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
                allowedInput: [
                  { name: 'Built in', value: 'built-in' },
                  { name: 'Interaction', value: 'interaction' },
                ],
              },
            },
            {
              value: 'default',
              label: 'Show on load',
              key: 'loadingType',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Message', value: 'default' },
                  { name: 'Content', value: 'showChildren' },
                  { name: 'Skeleton', value: 'skeleton' },
                ],
              },
            },
            {
              value: ['Loading...'],
              label: 'Loading text',
              key: 'loadingText',
              type: 'VARIABLE',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'loadingType',
                  comparator: 'EQ',
                  value: 'default',
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
              value: ['DataList'],
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
              name: 'ListItem',
              ref: {
                id: '#listItem',
              },
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Primary text',
                  key: 'primaryText',
                  value: ['Title'],
                },
                {
                  type: 'VARIABLE',
                  label: 'Secondary text',
                  key: 'secondaryText',
                  value: ['Secondary text'],
                },
                {
                  type: 'COLOR',
                  label: 'Background color',
                  key: 'backgroundColor',
                  value: 'Transparent',
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
                  type: 'CUSTOM',
                  label: 'Align items',
                  key: 'alignItems',
                  value: 'center',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Start', value: 'flex-start' },
                      { name: 'Center', value: 'center' },
                    ],
                  },
                },
                {
                  type: 'CUSTOM',
                  label: 'Visual',
                  key: 'avatarOrIcon',
                  value: 'none',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'None', value: 'none' },
                      { name: 'Icon', value: 'icon' },
                      { name: 'Avatar', value: 'avatar' },
                    ],
                  },
                },
                {
                  label: 'Icon',
                  key: 'icon',
                  value: 'None',
                  type: 'ICON',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'avatarOrIcon',
                      comparator: 'EQ',
                      value: 'icon',
                    },
                  },
                },
                {
                  type: 'COLOR',
                  label: 'Icon color',
                  key: 'iconColor',
                  value: 'Black',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'avatarOrIcon',
                      comparator: 'EQ',
                      value: 'icon',
                    },
                  },
                },
                {
                  value: false,
                  label: 'Show icon as avatar',
                  key: 'avatar',
                  type: 'TOGGLE',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'avatarOrIcon',
                      comparator: 'EQ',
                      value: 'icon',
                    },
                  },
                },
                {
                  type: 'VARIABLE',
                  label: 'Avatar URL',
                  key: 'avatarUrl',
                  value: [''],
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'avatarOrIcon',
                      comparator: 'EQ',
                      value: 'avatar',
                    },
                  },
                },
                {
                  type: 'TOGGLE',
                  label: 'Disabled',
                  key: 'disabled',
                  value: false,
                },
                {
                  type: 'TOGGLE',
                  label: 'Disable gutters',
                  key: 'disableGutters',
                  value: false,
                },
                {
                  type: 'TOGGLE',
                  label: 'Dense',
                  key: 'dense',
                  value: false,
                },
                {
                  type: 'TOGGLE',
                  label: 'Divider',
                  key: 'divider',
                  value: false,
                },
                {
                  type: 'TOGGLE',
                  label: 'Selected',
                  key: 'selected',
                  value: false,
                },
                {
                  value: false,
                  label: 'Styles',
                  key: 'styles',
                  type: 'TOGGLE',
                },
                {
                  value: '1rem',
                  label: 'Title Font Size',
                  key: 'titleSize',
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
                  label: 'Title color',
                  key: 'titleColor',
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
                  label: 'Title Font weight',
                  key: 'titleWeight',
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
                  value: '0.875rem',
                  label: 'Subtitle Font Size',
                  key: 'subtitleSize',
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
                  label: 'Subtitle color',
                  key: 'subtitleColor',
                  value: 'Secondary',
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
                  label: 'Subtitle Font weight',
                  key: 'subtitleWeight',
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
                  value: ['ListItem'],
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
