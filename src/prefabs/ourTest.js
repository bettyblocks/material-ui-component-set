(() => ({
  name: 'Global Test',
  icon: 'RowColumnIcon',
  category: 'LAYOUT',
  interactions: [
    {
      name: 'setCurrentRecord',
      sourceEvent: 'OnRowClick',
      parameters: [
        {
          parameter: 'argument',
          id: [],
        },
      ],
      ref: {
        targetComponentId: '#dataContainer',
        sourceComponentId: '#dataTable',
      },
      targetOptionName: 'currentRecord',
      type: 'Global',
    },
  ],
  beforeCreate: ({
    components: {
      Content,
      Header,
      Field,
      Footer,
      ModelSelector,
      PropertiesSelector,
    },
    helpers: { useModelQuery },
    prefab,
    save,
    close,
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [prop, setProp] = React.useState([]);
    const [properties, setProperties] = React.useState([]);

    useModelQuery({
      variables: { id: modelId },
      skip: !modelId,
      onCompleted: data => {
        setProp(data.model.properties.find(p => p.name === 'id'));
      },
    });

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

            newPrefab.interactions[0].parameters[0].id = [prop.id];

            newPrefab.structure[0].descendants[0].descendants[0].descendants[0].descendants[0].options[0].value = modelId;
            newPrefab.structure[0].descendants[0].descendants[1].descendants[0].descendants[0].options[0].value = modelId;

            properties.forEach(property => {
              newPrefab.structure[0].descendants[0].descendants[1].descendants[0].descendants[0].descendants[0].options[0].value.push(
                {
                  id: property.id,
                  name: `{{ ${property.label.toLowerCase()} }}`,
                  type: 'PROPERTY',
                },
              );
              newPrefab.structure[0].descendants[0].descendants[0].descendants[0].descendants[0].descendants.push(
                {
                  name: 'DataTableColumn',
                  options: [
                    {
                      value: property,
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
                  ],
                  descendants: [],
                },
              );
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
              value: 'flexible',
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
              value: 'flexible',
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
              value: 'flexible',
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
              value: ['M', 'M', 'M', 'M'],
              label: 'Inner space',
              key: 'innerSpacing',
              type: 'SIZES',
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
                      value: 'flexible',
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
                      value: 'flexible',
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
                      value: 'flexible',
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
                      value: ['M', 'M', 'M', 'M'],
                      label: 'Inner space',
                      key: 'innerSpacing',
                      type: 'SIZES',
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
                      ],
                      descendants: [],
                    },
                  ],
                },
              ],
            },
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
                      value: 'flexible',
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
                      value: 'flexible',
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
                      value: 'flexible',
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
                      value: ['M', 'M', 'M', 'M'],
                      label: 'Inner space',
                      key: 'innerSpacing',
                      type: 'SIZES',
                    },
                  ],
                  descendants: [
                    {
                      name: 'DataContainer',
                      ref: {
                        id: '#dataContainer',
                      },
                      options: [
                        {
                          value: '',
                          label: 'Model',
                          key: 'model',
                          type: 'MODEL',
                        },
                        {
                          value: '',
                          label: 'Current Record',
                          key: 'currentRecord',
                          type: 'NUMBER',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'currentRecord',
                              comparator: 'EQ',
                              value: 'never',
                            },
                          },
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
                          label: 'Authentication Profile',
                          key: 'authProfile',
                          type: 'AUTHENTICATION_PROFILE',
                        },
                        {
                          value: '',
                          label: 'Redirect when no result',
                          key: 'redirectWithoutResult',
                          type: 'ENDPOINT',
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
                      ],
                      descendants: [
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
}))();
