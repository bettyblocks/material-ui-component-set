(() => ({
  name: 'Delete Record',
  icon: 'DeleteRecordIcon',
  category: 'BUTTON',
  keywords: ['Button', 'delete', 'deleterecord'],
  beforeCreate: ({
    prefab,
    save,
    close,
    components: { ModelSelector, Header, Content, Field, Footer, Text },
    helpers: { useModelQuery },
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [showValidation, setShowValidation] = React.useState(false);

    const { data } = useModelQuery({
      variables: { id: modelId },
      skip: !modelId,
    });

    React.useEffect(() => {
      setShowValidation(false);
    }, [modelId]);

    return (
      <>
        <Header onClose={close} title="Configure delete record" />
        <Content>
          <Field
            label="Select model"
            error={
              showValidation && <Text color="#e82600">Model is required</Text>
            }
            info="Small note: If you can't select any models try to place the button inside a component where an object is available."
          >
            <ModelSelector
              onChange={id => {
                setModelId(id);
              }}
              value={modelId}
              margin
              scopedModels
            />
          </Field>
        </Content>
        <Footer
          onClose={close}
          onSave={() => {
            const camelToSnakeCase = str =>
              str[0].toLowerCase() +
              str
                .slice(1, str.length)
                .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

            if (!modelId || !data || !data.model) {
              setShowValidation(true);
              return;
            }
            const newPrefab = { ...prefab };
            if (data && data.model) {
              newPrefab.variables[0].name = camelToSnakeCase(data.model.name);
            }
            newPrefab.structure[0].descendants[1].descendants[0].descendants[0].descendants[0].descendants[2].descendants[1].options[6].value = [
              modelId,
            ];
            newPrefab.variables[0].options.modelId = modelId;

            save(newPrefab);
          }}
        />
      </>
    );
  },
  interactions: [
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#dialog',
        sourceComponentId: '#deleteButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#dialog',
        sourceComponentId: '#closeBtn',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#dialog',
        sourceComponentId: '#cancelBtn',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onActionSuccess',
      ref: {
        targetComponentId: '#dialog',
        sourceComponentId: '#submitButton',
      },
      type: 'Custom',
    },
  ],
  variables: [
    {
      kind: 'object',
      name: 'form_object',
      ref: {
        id: '#objectVariableId',
        endpointId: '#endpointId',
      },
      options: {
        modelId: '',
      },
    },
  ],
  actions: [
    {
      name: 'Delete record action',
      ref: {
        id: '#actionId',
        endpointId: '#endpointId',
      },
      useNewRuntime: false,
      events: [
        {
          kind: 'delete',
          options: {
            ref: {
              object: '#objectVariableId',
            },
          },
        },
      ],
    },
  ],
  structure: [
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
          ref: {
            id: '#deleteButton',
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
              value: ['Delete'],
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
              label: 'Full width',
              key: 'fullWidth',
              type: 'TOGGLE',
            },
            {
              label: 'Icon',
              key: 'icon',
              value: 'Delete',
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
              label: 'Add Tooltip',
              key: 'addTooltip',
              value: false,
              type: 'TOGGLE',
              configuration: {
                as: 'VISIBILITY',
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
          name: 'Dialog',
          ref: {
            id: '#dialog',
          },
          options: [
            {
              label: 'Toggle visibility',
              key: 'isVisible',
              value: false,
              type: 'TOGGLE',
              configuration: {
                as: 'VISIBILITY',
              },
            },
            {
              type: 'TOGGLE',
              label: 'Fullscreen',
              key: 'isFullscreen',
              value: false,
            },
            {
              type: 'TOGGLE',
              label: 'Disable backdrop click',
              key: 'disableClick',
              value: false,
            },
            {
              value: 'sm',
              label: 'Width',
              key: 'width',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Extra-small', value: 'xs' },
                  { name: 'Small', value: 'sm' },
                  { name: 'Medium', value: 'md' },
                  { name: 'Large', value: 'lg' },
                  { name: 'Extra-large', value: 'xl' },
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
              value: ['Dialog'],
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
              name: 'Paper',
              options: [
                {
                  label: 'Square',
                  key: 'square',
                  value: false,
                  type: 'TOGGLE',
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
                      { name: 'Flat', value: 'flat' },
                      { name: 'Elevation', value: 'elevation' },
                      { name: 'Outlined', value: 'outlined' },
                    ],
                  },
                },
                {
                  label: 'Elevation',
                  key: 'elevation',
                  value: '0',
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
                  value: ['Paper'],
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Left', value: 'flex-start' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'flex-end' },
                                  { name: 'Justified', value: 'space-between' },
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
                              value: ['M', 'M', '0rem', 'M'],
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
                                  value: ['Delete record'],
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
                              name: 'Button',
                              ref: {
                                id: '#closeBtn',
                              },
                              style: {
                                overwrite: {
                                  backgroundColor: {
                                    type: 'STATIC',
                                    value: 'Transparent',
                                  },
                                  boxShadow: 'none',
                                  color: {
                                    type: 'THEME_COLOR',
                                    value: 'light',
                                  },
                                  padding: ['0rem'],
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
                                  value: [],
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
                                  value: 'Close',
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
                                      { name: 'Small', value: 'small' },
                                      { name: 'Medium', value: 'medium' },
                                      { name: 'Large', value: 'large' },
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
                                    allowedInput: [
                                      { name: 'Start', value: 'start' },
                                      { name: 'End', value: 'end' },
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
                                {
                                  name: 'Text',
                                  options: [
                                    {
                                      type: 'VARIABLE',
                                      label: 'Content',
                                      key: 'content',
                                      value: [
                                        'Are you sure you want to delete this record? You can’t undo this action.',
                                      ],
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Left', value: 'flex-start' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'flex-end' },
                                  { name: 'Justified', value: 'space-between' },
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
                              ref: {
                                id: '#cancelBtn',
                              },
                              style: {
                                name: 'outliine',
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
                                  value: ['Cancel'],
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
                                  label: 'Add Tooltip',
                                  key: 'addTooltip',
                                  value: false,
                                  type: 'TOGGLE',
                                  configuration: {
                                    as: 'VISIBILITY',
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
                                  type: 'ICON',
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
                              ref: {
                                id: '#submitButton',
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
                                  value: ['Delete'],
                                },
                                {
                                  type: 'CUSTOM',
                                  label: 'Link to',
                                  key: 'linkType',
                                  value: 'action',
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
                                      { name: 'Action', value: 'action' },
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
                                  ref: {
                                    value: '#actionId',
                                  },
                                  label: 'Action',
                                  key: 'actionId',
                                  type: 'ACTION',
                                  configuration: {
                                    apiVersion: 'v1',
                                    condition: {
                                      type: 'SHOW',
                                      option: 'linkType',
                                      comparator: 'EQ',
                                      value: 'action',
                                    },
                                  },
                                },
                                {
                                  value: [],
                                  label: 'Objects to pass to action',
                                  key: 'actionModels',
                                  type: 'ACTION_INPUT_OBJECTS',
                                  configuration: {
                                    apiVersion: 'v1',
                                    condition: {
                                      type: 'SHOW',
                                      option: 'linkType',
                                      comparator: 'EQ',
                                      value: 'action',
                                    },
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
                                  configuration: {
                                    as: 'VISIBILITY',
                                  },
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
                                  type: 'ICON',
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
              ],
            },
          ],
        },
      ],
    },
  ],
}))();
