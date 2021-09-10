(() => ({
  name: 'Data Table',
  icon: 'DataTable',
  category: 'DATA',
  keywords: ['Data', 'table', 'datatable', 'collection'],
  beforeCreate: ({
    components: {
      Content,
      Header,
      Field,
      Footer,
      ModelSelector,
      PropertiesSelector,
    },
    prefab,
    save,
    close,
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [properties, setProperties] = React.useState([]);

    return (
      <>
        <Header title="Configure data table" onClose={close} />
        <Content>
          <Field label="Model">
            <ModelSelector
              onChange={value => {
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
          <Field label="Columns">
            <PropertiesSelector
              modelId={modelId}
              value={properties}
              onChange={value => {
                setProperties(value);
              }}
            />
          </Field>
        </Content>
        <Footer
          onSave={() => {
            const newPrefab = { ...prefab };

            newPrefab.structure[0].options[0].value = modelId;
            properties.forEach(property => {
              // Remove this filter when working on PAGE-534
              let newProperty = property;
              const inheritFormatKinds = [
                'DATE',
                'DATE_EXPRESSION',
                'DATE_TIME',
                'DATE_TIME_EXPRESSION',
                'DECIMAL',
                'DECIMAL_EXPRESSION',
                'INTEGER',
                'INTEGER_EXPRESSION',
                'PRICE',
                'PRICE_EXPRESSION',
                'TIME',
              ];
              if (inheritFormatKinds.includes(property.kind)) {
                newProperty = {
                  ...property,
                  format: 'INHERIT',
                };
              }

              newPrefab.structure[0].descendants.push({
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
                    value: newProperty,
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
                    value: [''],
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
                descendants: [],
              });
            });

            save(newPrefab);
          }}
          onClose={close}
        />
      </>
    );
  },
  structure: [
    {
      name: 'DataTable',
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
            allowedInput: [
              { name: 'Ascending', value: 'asc' },
              { name: 'Descending', value: 'desc' },
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
        },
        {
          value: '',
          label: 'Hide text-overflow',
          key: 'hideTextOverflow',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Search on text',
          key: 'labelSearchOn',
          value: ['Search on'],
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'hideSearch',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: '',
          label: 'Authentication Profile',
          key: 'authProfile',
          type: 'AUTHENTICATION_PROFILE',
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
            allowedInput: [
              { name: 'Always', value: 'always' },
              { name: 'When needed', value: 'whenNeeded' },
              { name: 'Never', value: 'never' },
            ],
          },
        },
        {
          value: false,
          label: 'Auto load on scroll',
          key: 'autoLoadOnScroll',
          type: 'TOGGLE',
          configuration: {
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
          label: 'Number of records to auto load',
          key: 'autoLoadTakeAmount',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: '5', value: '5' },
              { name: '10', value: '10' },
              { name: '25', value: '25' },
              { name: '50', value: '50' },
              { name: '100', value: '100' },
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
            allowedInput: [
              { name: '5', value: '5' },
              { name: '10', value: '10' },
              { name: '25', value: '25' },
              { name: '50', value: '50' },
              { name: '100', value: '100' },
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
          label: "Pagination label (x 'of' y)",
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
              { name: 'Small', value: 'small' },
              { name: 'Medium', value: 'medium' },
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
          value: false,
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
          value: 'elevation',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Flat', value: 'flat' },
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
}))();
