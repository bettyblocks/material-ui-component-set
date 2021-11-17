(() => ({
  name: 'Data table with create functionality',
  icon: 'DataTable',
  type: 'page',
  description: 'This page contains a datatable with create dialog',
  detail:
    'Connect your model to this ready to use Data Table. This also includes a modal to add records to your Data Table.',
  previewUrl: 'https://preview.betty.app/create-datatable',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Datatable_Create.jpg',
  category: 'DATA',
  beforeCreate: ({
    helpers: { useModelQuery, camelToSnakeCase },
    components: {
      Header,
      Content,
      Footer,
      Field,
      Text,
      CheckBox,
      ModelSelector,
      PropertiesSelector,
    },
    prefab,
    save,
    close,
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [properties, setProperties] = React.useState([]);
    const [modelValidation, setModelValidation] = React.useState(false);
    const [propertiesValidation, setPropertiesValidation] = React.useState(
      false,
    );
    const [
      createPropertiesValidation,
      setCreatePropertiesValidation,
    ] = React.useState(false);
    const [createFormProperties, setCreateFormProperties] = React.useState([]);
    const [
      createFormUseDataProperties,
      setCreateFormUseDataProperties,
    ] = React.useState(true);

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
        return getDescendantByRef(refValue, component.descendants);
      }, null);

    const interactions = [
      {
        name: 'Show',
        sourceEvent: 'Click',
        ref: {
          targetComponentId: '#createDialog',
          sourceComponentId: '#openCreateDialogBtn',
        },
        type: 'Custom',
      },
      {
        name: 'Hide',
        sourceEvent: 'Click',
        ref: {
          targetComponentId: '#createDialog',
          sourceComponentId: '#closeDialogBtn',
        },
        type: 'Custom',
      },
      {
        name: 'Hide',
        sourceEvent: 'Click',
        ref: {
          targetComponentId: '#createDialog',
          sourceComponentId: '#cancelDialogBtn',
        },
        type: 'Custom',
      },
      {
        name: 'Submit',
        sourceEvent: 'Click',
        ref: {
          targetComponentId: '#createForm',
          sourceComponentId: '#submitBtn',
        },
        type: 'Custom',
      },
      {
        name: 'Refetch',
        sourceEvent: 'onActionSuccess',
        ref: {
          targetComponentId: '#dataTable',
          sourceComponentId: '#createForm',
        },
        type: 'Custom',
      },
      {
        name: 'Hide',
        sourceEvent: 'onActionSuccess',
        ref: {
          targetComponentId: '#createDialog',
          sourceComponentId: '#createForm',
        },
        type: 'Custom',
      },
      {
        name: 'Toggle loading state',
        sourceEvent: 'onSubmit',
        ref: {
          targetComponentId: '#submitBtn',
          sourceComponentId: '#createForm',
        },
        type: 'Custom',
      },
      {
        name: 'Toggle loading state',
        sourceEvent: 'onActionSuccess',
        ref: {
          targetComponentId: '#submitBtn',
          sourceComponentId: '#createForm',
        },
        type: 'Custom',
      },
      {
        name: 'Toggle loading state',
        sourceEvent: 'onActionError',
        ref: {
          targetComponentId: '#submitBtn',
          sourceComponentId: '#createForm',
        },
        type: 'Custom',
      },
      {
        name: 'Show',
        sourceEvent: 'onActionSuccess',
        ref: {
          targetComponentId: '#successSnackbar',
          sourceComponentId: '#createForm',
        },
        type: 'Custom',
      },
    ];

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
            value: 'row',
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
            value: 'wrap',
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
                value: 'wrap',
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
                                  overwrite: {
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
                                    type: 'CUSTOM',
                                    label: 'variant',
                                    key: 'variant',
                                    value: 'text',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Text', value: 'text' },
                                        {
                                          name: 'Outlined',
                                          value: 'outlined',
                                        },
                                        {
                                          name: 'Contain',
                                          value: 'contained',
                                        },
                                        { name: 'Icon', value: 'icon' },
                                      ],
                                    },
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Button text',
                                    key: 'buttonText',
                                    value: ['Menu 1'],
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
                                    value: 'medium',
                                    label: 'Size',
                                    key: 'size',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Large', value: 'large' },
                                        {
                                          name: 'Medium',
                                          value: 'medium',
                                        },
                                        { name: 'Small', value: 'small' },
                                      ],
                                    },
                                  },
                                  {
                                    label: 'Icon',
                                    key: 'icon',
                                    value: 'None',
                                    type: 'ICON',
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
                                        option: 'variant',
                                        comparator: 'EQ',
                                        value: 'icon',
                                      },
                                      allowedInput: [
                                        { name: 'Start', value: 'start' },
                                        { name: 'End', value: 'end' },
                                      ],
                                    },
                                  },
                                  {
                                    type: 'COLOR',
                                    label: 'Text color',
                                    key: 'textColor',
                                    value: 'White',
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
                                    type: 'COLOR',
                                    label: 'Color',
                                    key: 'background',
                                    value: 'Primary',
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
                                  overwrite: {
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
                                    type: 'CUSTOM',
                                    label: 'variant',
                                    key: 'variant',
                                    value: 'text',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Text', value: 'text' },
                                        {
                                          name: 'Outlined',
                                          value: 'outlined',
                                        },
                                        {
                                          name: 'Contain',
                                          value: 'contained',
                                        },
                                        { name: 'Icon', value: 'icon' },
                                      ],
                                    },
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Button text',
                                    key: 'buttonText',
                                    value: ['Menu 2'],
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
                                    value: 'medium',
                                    label: 'Size',
                                    key: 'size',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Large', value: 'large' },
                                        {
                                          name: 'Medium',
                                          value: 'medium',
                                        },
                                        { name: 'Small', value: 'small' },
                                      ],
                                    },
                                  },
                                  {
                                    label: 'Icon',
                                    key: 'icon',
                                    value: 'None',
                                    type: 'ICON',
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
                                        option: 'variant',
                                        comparator: 'EQ',
                                        value: 'icon',
                                      },
                                      allowedInput: [
                                        { name: 'Start', value: 'start' },
                                        { name: 'End', value: 'end' },
                                      ],
                                    },
                                  },
                                  {
                                    type: 'COLOR',
                                    label: 'Text color',
                                    key: 'textColor',
                                    value: 'White',
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
                                    type: 'COLOR',
                                    label: 'Color',
                                    key: 'background',
                                    value: 'Primary',
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
                            value: ['L', 'L', 'L', 'L'],
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
                                value: ['M', '0rem', 'M', 'M'],
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
                                  id: '#openCreateDialogBtn',
                                },
                                style: {
                                  overwrite: {
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
                                    padding: ['0.6875rem', '1.375rem'],
                                    textDecoration: 'none',
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
                                    value: ['Create new'],
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
                                  allowedInput: [
                                    { name: 'Always', value: 'always' },
                                    {
                                      name: 'When needed',
                                      value: 'whenNeeded',
                                    },
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
                                value: 'White',
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
                          {
                            name: 'Dialog',
                            ref: {
                              id: '#createDialog',
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
                                        {
                                          name: 'Elevation',
                                          value: 'elevation',
                                        },
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
                                            value: 'flexible',
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
                                            value: 'flexible',
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
                                                  'M',
                                                  '0rem',
                                                  '0rem',
                                                  'M',
                                                ],
                                                label: 'Inner space',
                                                key: 'innerSpacing',
                                                type: 'SIZES',
                                              },
                                              {
                                                value: false,
                                                label:
                                                  'Show positioning options',
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
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
                                                    comparator: 'EQ',
                                                    value: true,
                                                  },
                                                },
                                              },
                                              {
                                                value: false,
                                                label:
                                                  'Show background options',
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
                                                label:
                                                  'Background color opacity',
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
                                                  id: '#createDialogTitle',
                                                },
                                                options: [
                                                  {
                                                    type: 'VARIABLE',
                                                    label: 'Content',
                                                    key: 'content',
                                                    value: ['Create Record'],
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
                                                    key:
                                                      'dataComponentAttribute',
                                                    value: ['Text'],
                                                    configuration: {
                                                      condition: {
                                                        type: 'SHOW',
                                                        option:
                                                          'advancedSettings',
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
                                                  id: '#closeDialogBtn',
                                                },
                                                style: {
                                                  overwrite: {
                                                    backgroundColor: {
                                                      type: 'STATIC',
                                                      value: 'transparent',
                                                    },
                                                    boxShadow: 'none',
                                                    color: {
                                                      type: 'THEME_COLOR',
                                                      value: 'light',
                                                    },
                                                    padding: [
                                                      '0rem',
                                                      '0.6875rem',
                                                      '0.6875rem',
                                                      '0.6875rem',
                                                    ],
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
                                                    value: [''],
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
                                                        {
                                                          name: 'Small',
                                                          value: 'small',
                                                        },
                                                        {
                                                          name: 'Medium',
                                                          value: 'medium',
                                                        },
                                                        {
                                                          name: 'Large',
                                                          value: 'large',
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
                                                      condition: {
                                                        type: 'HIDE',
                                                        option: 'icon',
                                                        comparator: 'EQ',
                                                        value: 'None',
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
                                                    key:
                                                      'dataComponentAttribute',
                                                    value: ['Button'],
                                                    configuration: {
                                                      condition: {
                                                        type: 'SHOW',
                                                        option:
                                                          'advancedSettings',
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
                                                    {
                                                      name: 'Full',
                                                      value: 'Full',
                                                    },
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
                                                        {
                                                          name: 'Flexible',
                                                          value: 'flexible',
                                                        },
                                                        {
                                                          name: 'Hidden',
                                                          value: 'hidden',
                                                        },
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
                                                      ],
                                                    },
                                                  },
                                                  {
                                                    value: 'flexible',
                                                    label:
                                                      'Column width (tablet landscape)',
                                                    key:
                                                      'columnWidthTabletLandscape',
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
                                                      ],
                                                    },
                                                  },
                                                  {
                                                    value: 'flexible',
                                                    label:
                                                      'Column width (tablet portrait)',
                                                    key:
                                                      'columnWidthTabletPortrait',
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
                                                      ],
                                                    },
                                                  },
                                                  {
                                                    value: 'flexible',
                                                    label:
                                                      'Column width (mobile)',
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
                                                    label:
                                                      'Horizontal Alignment',
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
                                                    key:
                                                      'dataComponentAttribute',
                                                    value: ['Column'],
                                                    configuration: {
                                                      condition: {
                                                        type: 'SHOW',
                                                        option:
                                                          'advancedSettings',
                                                        comparator: 'EQ',
                                                        value: true,
                                                      },
                                                    },
                                                  },
                                                ],
                                                descendants: [
                                                  {
                                                    name: 'Form',
                                                    ref: {
                                                      id: '#createForm',
                                                    },
                                                    options: [
                                                      {
                                                        value: {
                                                          modelId: null,
                                                          ref: {
                                                            customModelId:
                                                              '#customModelId',
                                                            actionId:
                                                              '#actionId',
                                                            variableId:
                                                              '#customModelVariableId',
                                                            objectVariableId:
                                                              '#objectVariableId',
                                                          },
                                                        },
                                                        label: 'Action',
                                                        key: 'formData',
                                                        type: 'FORM_DATA',
                                                        configuration: {
                                                          apiVersion: 'v1',
                                                        },
                                                      },
                                                      {
                                                        value: '',
                                                        label: 'Model',
                                                        key: 'model',
                                                        type: 'MODEL',
                                                        configuration: {
                                                          condition: {
                                                            type: 'SHOW',
                                                            option: 'formData',
                                                            comparator: 'EQ',
                                                            value: '',
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
                                                        label: 'Current Record',
                                                        key: 'currentRecord',
                                                        type: 'NUMBER',
                                                        configuration: {
                                                          condition: {
                                                            type: 'SHOW',
                                                            option:
                                                              'currentRecord',
                                                            comparator: 'EQ',
                                                            value: 'never',
                                                          },
                                                        },
                                                      },
                                                      {
                                                        value: 'interaction',
                                                        label:
                                                          'Success message',
                                                        key: 'showSuccess',
                                                        type: 'CUSTOM',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'Built in',
                                                              value: 'built-in',
                                                            },
                                                            {
                                                              name:
                                                                'Interaction',
                                                              value:
                                                                'interaction',
                                                            },
                                                          ],
                                                        },
                                                      },
                                                      {
                                                        value:
                                                          'Thanks for submitting the form!',
                                                        label:
                                                          'Success message',
                                                        key:
                                                          'formSuccessMessage',
                                                        type: 'TEXT',
                                                        configuration: {
                                                          condition: {
                                                            type: 'SHOW',
                                                            option:
                                                              'showSuccess',
                                                            comparator: 'EQ',
                                                            value: 'built-in',
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
                                                            {
                                                              name: 'Built in',
                                                              value: 'built-in',
                                                            },
                                                            {
                                                              name:
                                                                'Interaction',
                                                              value:
                                                                'interaction',
                                                            },
                                                          ],
                                                        },
                                                      },
                                                      {
                                                        value:
                                                          'Failed to submit the form!',
                                                        label: 'Error message',
                                                        key: 'formErrorMessage',
                                                        type: 'TEXT',
                                                        configuration: {
                                                          condition: {
                                                            type: 'SHOW',
                                                            option: 'showError',
                                                            comparator: 'EQ',
                                                            value: 'built-in',
                                                          },
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
                                                            {
                                                              name: 'Message',
                                                              value: 'default',
                                                            },
                                                            {
                                                              name: 'Content',
                                                              value:
                                                                'showChildren',
                                                            },
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
                                                            option:
                                                              'loadingType',
                                                            comparator: 'EQ',
                                                            value: 'default',
                                                          },
                                                        },
                                                      },
                                                      {
                                                        value: [
                                                          '0rem',
                                                          '0rem',
                                                          'M',
                                                          '0rem',
                                                        ],
                                                        label: 'Outer space',
                                                        key: 'outerSpacing',
                                                        type: 'SIZES',
                                                      },
                                                      {
                                                        value: '',
                                                        label:
                                                          'Redirect after succesful submit',
                                                        key: 'redirect',
                                                        type: 'ENDPOINT',
                                                      },
                                                      {
                                                        value: false,
                                                        label:
                                                          'Advanced settings',
                                                        key: 'advancedSettings',
                                                        type: 'TOGGLE',
                                                      },
                                                      {
                                                        type: 'VARIABLE',
                                                        label: 'Test attribute',
                                                        key:
                                                          'dataComponentAttribute',
                                                        value: ['Form'],
                                                        configuration: {
                                                          condition: {
                                                            type: 'SHOW',
                                                            option:
                                                              'advancedSettings',
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
                                                value: 'flex-start',
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
                                                value: ['M', 'M', 'M', 'M'],
                                                label: 'Inner space',
                                                key: 'innerSpacing',
                                                type: 'SIZES',
                                              },
                                              {
                                                value: false,
                                                label:
                                                  'Show positioning options',
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
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
                                                    comparator: 'EQ',
                                                    value: true,
                                                  },
                                                },
                                              },
                                              {
                                                value: false,
                                                label:
                                                  'Show background options',
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
                                                label:
                                                  'Background color opacity',
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
                                                name: 'Button',
                                                ref: {
                                                  id: '#cancelDialogBtn',
                                                },
                                                style: {
                                                  overwrite: {
                                                    backgroundColor: {
                                                      type: 'STATIC',
                                                      value: 'transparent',
                                                    },
                                                    borderColor: {
                                                      type: 'THEME_COLOR',
                                                      value: 'primary',
                                                    },
                                                    borderRadius: ['0.25rem'],
                                                    borderStyle: 'solid',
                                                    borderWidth: ['0.0625rem'],
                                                    boxShadow: 'none',
                                                    color: {
                                                      type: 'THEME_COLOR',
                                                      value: 'primary',
                                                    },
                                                    fontFamily: 'Roboto',
                                                    fontSize: '0.875rem',
                                                    fontStyle: 'none',
                                                    fontWeight: '400',
                                                    padding: [
                                                      '0.625rem',
                                                      '1.3125rem',
                                                    ],
                                                    textDecoration: 'none',
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
                                                      'M',
                                                      '0rem',
                                                      '0rem',
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
                                                    key:
                                                      'dataComponentAttribute',
                                                    value: ['Button'],
                                                    configuration: {
                                                      condition: {
                                                        type: 'SHOW',
                                                        option:
                                                          'advancedSettings',
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
                                                  id: '#submitBtn',
                                                },
                                                style: {
                                                  overwrite: {
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
                                                    value: ['Create'],
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
                                                      '0rem',
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
                                                    key:
                                                      'dataComponentAttribute',
                                                    value: ['Button'],
                                                    configuration: {
                                                      condition: {
                                                        type: 'SHOW',
                                                        option:
                                                          'advancedSettings',
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
                          {
                            name: 'Snackbar',
                            ref: {
                              id: '#successSnackbar',
                            },
                            options: [
                              {
                                label: 'Toggle visibility',
                                key: 'visible',
                                value: false,
                                type: 'TOGGLE',
                                configuration: {
                                  as: 'VISIBILITY',
                                },
                              },
                              {
                                type: 'VARIABLE',
                                label: 'Content',
                                key: 'content',
                                value: [
                                  'You can also drag an alert component here for example',
                                ],
                              },
                              {
                                label:
                                  'Allow to overwrite by the server response',
                                key: 'allowTextServerResponse',
                                value: false,
                                type: 'TOGGLE',
                              },
                              {
                                label: 'Vertical position',
                                key: 'anchorOriginVertical',
                                value: 'top',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'Top',
                                      value: 'top',
                                    },
                                    {
                                      name: 'Bottom',
                                      value: 'bottom',
                                    },
                                  ],
                                },
                              },
                              {
                                label: 'Horizontal position',
                                key: 'anchorOriginHorizontal',
                                value: 'center',
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
                                type: 'TOGGLE',
                                label: 'Auto hide',
                                key: 'autoHide',
                                value: true,
                              },

                              {
                                type: 'NUMBER',
                                label: 'Auto Hide Duration (ms)',
                                key: 'autoHideDuration',
                                value: 6000,
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'autoHide',
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
                                value: ['Snackbar'],
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
                                name: 'Alert',
                                ref: {
                                  id: '#successAlert',
                                },
                                options: [
                                  {
                                    value: true,
                                    label: 'Toggle visibility',
                                    key: 'visible',
                                    type: 'TOGGLE',
                                    configuration: {
                                      as: 'VISIBILITY',
                                    },
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Body text',
                                    key: 'bodyText',
                                    value: ['New model created successfully'],
                                    configuration: {
                                      dependsOn: 'model',
                                    },
                                  },
                                  {
                                    label:
                                      'Allow to overwrite by the server response',
                                    key: 'allowTextServerResponse',
                                    value: false,
                                    type: 'TOGGLE',
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Title text',
                                    key: 'titleText',
                                    value: [''],
                                  },
                                  {
                                    label:
                                      'Allow to overwrite by the server response',
                                    key: 'allowTitleServerResponse',
                                    value: false,
                                    type: 'TOGGLE',
                                  },
                                  {
                                    value: 'White',
                                    label: 'Text color',
                                    key: 'textColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'White',
                                    label: 'Icon color',
                                    key: 'iconColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'Success',
                                    label: 'Background color',
                                    key: 'background',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'Transparent',
                                    label: 'Border color',
                                    key: 'borderColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    label: 'Icon',
                                    key: 'icon',
                                    value: 'None',
                                    type: 'ICON',
                                  },
                                  {
                                    value: false,
                                    label: 'Collapsable',
                                    key: 'collapsable',
                                    type: 'TOGGLE',
                                  },
                                  {
                                    type: 'CUSTOM',
                                    label: 'Horizontal Alignment',
                                    key: 'horizontalAlignment',
                                    value: 'flex-start',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Left', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Right', value: 'flex-end' },
                                      ],
                                      condition: {
                                        type: 'HIDE',
                                        option: 'collapsable',
                                        comparator: 'EQ',
                                        value: true,
                                      },
                                    },
                                  },
                                  {
                                    type: 'CUSTOM',
                                    label: 'Vertical Alignment',
                                    key: 'verticalAlignment',
                                    value: 'stretch',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Top', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Bottom', value: 'flex-end' },
                                        { name: 'Justified', value: 'stretch' },
                                      ],
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
                                    value: ['Alert'],
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
                ],
              },
            ],
          },
        ],
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

    return (
      <>
        <Header title="Configure data table" onClose={close} />
        <Content>
          <Field
            label="Model"
            error={
              modelValidation && (
                <Text color="#e82600">Selecting a model is required</Text>
              )
            }
          >
            <ModelSelector
              onChange={value => {
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
              onChange={value => {
                setProperties(value);
              }}
            />
          </Field>
          <Field label="Create Form">
            <CheckBox
              label="Use the same properties as the data table in the create form"
              checked={createFormUseDataProperties}
              onChange={() => {
                setCreateFormUseDataProperties(!createFormUseDataProperties);
              }}
            />
            {!createFormUseDataProperties && (
              <Field
                label="Input fields in the create form"
                error={
                  createPropertiesValidation && (
                    <Text color="#e82600">
                      Selecting a property is required
                    </Text>
                  )
                }
              >
                <PropertiesSelector
                  modelId={modelId}
                  value={createFormProperties}
                  disabledNames={['created_at', 'updated_at', 'id']}
                  disabledKinds={disabledKinds}
                  onChange={value => {
                    setCreatePropertiesValidation(!value.length);
                    setCreateFormProperties(value);
                  }}
                />
              </Field>
            )}
          </Field>
        </Content>
        <Footer
          onSave={() => {
            if (
              !modelId ||
              (!createFormProperties.length && !createFormUseDataProperties) ||
              !properties.length
            ) {
              setModelValidation(!modelId);
              setCreatePropertiesValidation(
                !createFormProperties.length && !createFormUseDataProperties,
              );

              setPropertiesValidation(!properties.length);
              return;
            }
            const newPrefab = { ...prefab };
            if (data && data.model) {
              newPrefab.variables[1].name = camelToSnakeCase(data.model.label);
            }
            newPrefab.variables[0].options.modelId = modelId;
            const dataTable = getDescendantByRef('#dataTable', prefabStructure);
            dataTable.options[0].value = modelId;
            newPrefab.variables[1].options.modelId = modelId;
            properties.filter(property => property.kind !== 'SERIAL');
            properties.forEach(property => {
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
                    value:
                      property.kind === 'IMAGE' ? [`${property.label}`] : [''],
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
                              value: [property],
                              label: 'Source',
                              key: 'imageSource',
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
                              label: 'Source',
                              key: 'videoSource',
                              type: 'VARIABLE',
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
                              value: [],
                              label: 'Source',
                              key: 'iframeSource',
                              type: 'VARIABLE',
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

            function makeDescendantsArray(propertiesInput) {
              const filteredPropertiesInput = propertiesInput.filter(
                property =>
                  property.label !== 'Created at' &&
                  property.label !== 'Updated at',
              );

              const descendants = filteredPropertiesInput.map(property => {
                switch (property.kind) {
                  case 'INTEGER': {
                    return {
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
                          value: ['0rem', '0rem', 'M', '0rem'],
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
                              value: [property.label],
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
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['0rem', '0rem', 'S', '0rem'],
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
                          name: 'TextField',
                          ref: {
                            id: `#input_${property.id[0]}`,
                          },
                          options: [
                            {
                              value: {
                                label: [property.label],
                                value: [
                                  {
                                    id: property.id,
                                    type: property.type,
                                  },
                                ],
                                propertyIds: property.id,
                                ref: {
                                  id: `#attribute_${property.id[0]}`,
                                },
                              },
                              label: 'Label',
                              key: 'customModelAttribute',
                              type: 'CUSTOM_MODEL_ATTRIBUTE',
                              configuration: {
                                allowedTypes: ['integer'],
                              },
                            },
                            {
                              value: true,
                              label: 'Autocomplete',
                              key: 'autoComplete',
                              type: 'TOGGLE',
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
                                placeholder: '[0-9]{8,}',
                                condition: {
                                  type: 'SHOW',
                                  option: 'validationOptions',
                                  comparator: 'EQ',
                                  value: true,
                                },
                              },
                            },
                            {
                              label: 'Min value',
                              key: 'minvalue',
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
                              label: 'Max value',
                              key: 'maxvalue',
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
                              value: ['This field is required'],
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
                              label: 'Pattern mismatch message',
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
                              value: ['This value is below the set minimum'],
                              label: 'Value below minimum message',
                              key: 'validationBelowMinimum',
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
                              value: ['This value is above the set maximum'],
                              label: 'Value above maximun',
                              key: 'validationAboveMaximum',
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
                              type: 'TOGGLE',
                              label: 'Disabled',
                              key: 'disabled',
                              value: false,
                            },
                            {
                              value: [property.label],
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
                                  { name: 'Standard', value: 'standard' },
                                  { name: 'Outlined', value: 'outlined' },
                                  { name: 'Filled', value: 'filled' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Full width',
                              key: 'fullWidth',
                              value: true,
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
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Small', value: 'small' },
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Dense', value: 'dense' },
                                  { name: 'Normal', value: 'normal' },
                                ],
                              },
                            },
                            {
                              label: 'Adornment',
                              key: 'adornment',
                              value: '',
                              type: 'TEXT',
                            },
                            {
                              type: 'CUSTOM',
                              label: 'Position',
                              key: 'adornmentPosition',
                              value: 'start',
                              configuration: {
                                condition: {
                                  type: 'HIDE',
                                  option: 'adornment',
                                  comparator: 'EQ',
                                  value: '',
                                },
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Start', value: 'start' },
                                  { name: 'End', value: 'end' },
                                ],
                              },
                            },
                            {
                              label: 'Type',
                              key: 'type',
                              value: 'number',
                              type: 'TEXT',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'adornment',
                                  comparator: 'EQ',
                                  value: 0,
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
                              value: 'Light',
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
                      ],
                    };
                  }
                  case 'EMAIL_ADDRESS': {
                    return {
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
                          value: ['0rem', '0rem', 'M', '0rem'],
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
                              value: [property.label],
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
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['0rem', '0rem', 'S', '0rem'],
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
                          name: 'TextField',
                          ref: {
                            id: `#input_${property.id[0]}`,
                          },
                          options: [
                            {
                              value: {
                                label: [property.label],
                                value: [
                                  {
                                    id: property.id,
                                    type: property.type,
                                  },
                                ],
                                propertyIds: property.id,
                                ref: {
                                  id: `#attribute_${property.id[0]}`,
                                },
                              },
                              label: 'Label',
                              key: 'customModelAttribute',
                              type: 'CUSTOM_MODEL_ATTRIBUTE',
                              configuration: {
                                allowedTypes: ['string'],
                              },
                            },
                            {
                              value: true,
                              label: 'Autocomplete',
                              key: 'autoComplete',
                              type: 'TOGGLE',
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
                                  '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
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
                              value: ['This field is required'],
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
                              label: 'Pattern mismatch message',
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
                              value: ['This value is too short'],
                              label: 'Value too short message',
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
                              value: ['This value is too long'],
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
                              value: ['No valid value provided'],
                              label: 'Email mismatch message',
                              key: 'validationTypeMismatch',
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
                              type: 'TOGGLE',
                              label: 'Disabled',
                              key: 'disabled',
                              value: false,
                            },
                            {
                              value: ['example@email.com'],
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
                                  { name: 'Standard', value: 'standard' },
                                  { name: 'Outlined', value: 'outlined' },
                                  { name: 'Filled', value: 'filled' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Full width',
                              key: 'fullWidth',
                              value: true,
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
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Small', value: 'small' },
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Dense', value: 'dense' },
                                  { name: 'Normal', value: 'normal' },
                                ],
                              },
                            },
                            {
                              label: 'Adornment',
                              key: 'adornmentIcon',
                              value: 'None',
                              type: 'ICON',
                            },
                            {
                              type: 'CUSTOM',
                              label: 'Position',
                              key: 'adornmentPosition',
                              value: 'end',
                              configuration: {
                                condition: {
                                  type: 'HIDE',
                                  option: 'adornmentIcon',
                                  comparator: 'EQ',
                                  value: 'none',
                                },
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Start', value: 'start' },
                                  { name: 'End', value: 'end' },
                                ],
                              },
                            },
                            {
                              label: 'Type',
                              key: 'type',
                              value: 'email',
                              type: 'TEXT',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'adornmentIcon',
                                  comparator: 'EQ',
                                  value: 0,
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
                              value: 'Light',
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
                      ],
                    };
                  }
                  case 'DECIMAL': {
                    return {
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
                          value: ['0rem', '0rem', 'M', '0rem'],
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
                              value: [property.label],
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
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['0rem', '0rem', 'S', '0rem'],
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
                          name: 'TextField',
                          ref: {
                            id: `#input_${property.id[0]}`,
                          },
                          options: [
                            {
                              value: {
                                label: [property.label],
                                value: [
                                  {
                                    id: property.id,
                                    type: property.type,
                                  },
                                ],
                                propertyIds: property.id,
                                ref: {
                                  id: `#attribute_${property.id[0]}`,
                                },
                              },
                              label: 'Label',
                              key: 'customModelAttribute',
                              type: 'CUSTOM_MODEL_ATTRIBUTE',
                              configuration: {
                                allowedTypes: ['decimal'],
                              },
                            },
                            {
                              value: true,
                              label: 'Autocomplete',
                              key: 'autoComplete',
                              type: 'TOGGLE',
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
                                placeholder: '[0-9]{8,}',
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
                              value: ['This field is required'],
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
                              label: 'Pattern mismatch message',
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
                              value: ['This value is too short'],
                              label: 'Value too short message',
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
                              value: ['This value is too long'],
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
                              type: 'TOGGLE',
                              label: 'Disabled',
                              key: 'disabled',
                              value: false,
                            },
                            {
                              value: [property.label],
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
                                  { name: 'Standard', value: 'standard' },
                                  { name: 'Outlined', value: 'outlined' },
                                  { name: 'Filled', value: 'filled' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Full width',
                              key: 'fullWidth',
                              value: true,
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
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Small', value: 'small' },
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Dense', value: 'dense' },
                                  { name: 'Normal', value: 'normal' },
                                ],
                              },
                            },
                            {
                              label: 'Adornment',
                              key: 'adornment',
                              value: '',
                              type: 'TEXT',
                            },
                            {
                              type: 'CUSTOM',
                              label: 'Position',
                              key: 'adornmentPosition',
                              value: 'start',
                              configuration: {
                                condition: {
                                  type: 'HIDE',
                                  option: 'adornment',
                                  comparator: 'EQ',
                                  value: '',
                                },
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Start', value: 'start' },
                                  { name: 'End', value: 'end' },
                                ],
                              },
                            },
                            {
                              label: 'Type',
                              key: 'type',
                              value: 'decimal',
                              type: 'TEXT',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'adornment',
                                  comparator: 'EQ',
                                  value: 0,
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
                              value: 'Light',
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
                      ],
                    };
                  }
                  case 'TEXT': {
                    return {
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
                          value: ['0rem', '0rem', 'M', '0rem'],
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
                              value: [property.label],
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
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['0rem', '0rem', 'S', '0rem'],
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
                          name: 'TextField',
                          ref: {
                            id: `#input_${property.id[0]}`,
                          },
                          options: [
                            {
                              value: {
                                label: [property.label],
                                value: [
                                  {
                                    id: property.id,
                                    type: property.type,
                                  },
                                ],
                                propertyIds: property.id,
                                ref: {
                                  id: `#attribute_${property.id[0]}`,
                                },
                              },
                              label: 'Label',
                              key: 'customModelAttribute',
                              type: 'CUSTOM_MODEL_ATTRIBUTE',
                              configuration: {
                                allowedTypes: ['string'],
                              },
                            },
                            {
                              value: true,
                              label: 'Autocomplete',
                              key: 'autoComplete',
                              type: 'TOGGLE',
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
                              value: ['This field is required'],
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
                              label: 'Pattern mismatch message',
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
                              value: ['This value is too short'],
                              label: 'Value too short message',
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
                              value: ['This value is too long'],
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
                              value: false,
                              label: 'Disabled',
                              key: 'disabled',
                              type: 'TOGGLE',
                            },
                            {
                              value: [property.label],
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
                                  { name: 'Standard', value: 'standard' },
                                  { name: 'Outlined', value: 'outlined' },
                                  { name: 'Filled', value: 'filled' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Full width',
                              key: 'fullWidth',
                              value: true,
                            },
                            {
                              value: true,
                              label: 'Multiline',
                              key: 'multiline',
                              type: 'TOGGLE',
                            },
                            {
                              value: 4,
                              label: 'Rows',
                              key: 'rows',
                              type: 'NUMBER',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'multiline',
                                  comparator: 'EQ',
                                  value: true,
                                },
                              },
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
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Small', value: 'small' },
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Dense', value: 'dense' },
                                  { name: 'Normal', value: 'normal' },
                                ],
                              },
                            },
                            {
                              label: 'Adornment',
                              key: 'adornmentIcon',
                              value: 'Email',
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
                                  { name: 'Start', value: 'start' },
                                  { name: 'End', value: 'end' },
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
                              value: 'Light',
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
                      ],
                    };
                  }
                  case 'PRICE': {
                    return {
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
                          value: ['0rem', '0rem', 'M', '0rem'],
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
                              value: [property.label],
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
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['0rem', '0rem', 'S', '0rem'],
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
                          name: 'TextField',
                          ref: {
                            id: `#input_${property.id[0]}`,
                          },
                          options: [
                            {
                              value: {
                                label: [property.label],
                                value: [
                                  {
                                    id: property.id,
                                    type: property.type,
                                  },
                                ],
                                propertyIds: property.id,
                                ref: {
                                  id: `#attribute_${property.id[0]}`,
                                },
                              },
                              label: 'Label',
                              key: 'customModelAttribute',
                              type: 'CUSTOM_MODEL_ATTRIBUTE',
                              configuration: {
                                allowedTypes: ['decimal'],
                              },
                            },
                            {
                              value: true,
                              label: 'Autocomplete',
                              key: 'autoComplete',
                              type: 'TOGGLE',
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
                                placeholder: '[0-9]+(\\.[0-9][0-9]?)?',
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
                              value: ['This field is required'],
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
                              label: 'Pattern mismatch message',
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
                              value: ['This value is too short'],
                              label: 'Value too short message',
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
                              value: ['This value is too long'],
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
                              type: 'TOGGLE',
                              label: 'Disabled',
                              key: 'disabled',
                              value: false,
                            },
                            {
                              value: [property.label],
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
                                  { name: 'Standard', value: 'standard' },
                                  { name: 'Outlined', value: 'outlined' },
                                  { name: 'Filled', value: 'filled' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Full width',
                              key: 'fullWidth',
                              value: true,
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
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Small', value: 'small' },
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Dense', value: 'dense' },
                                  { name: 'Normal', value: 'normal' },
                                ],
                              },
                            },
                            {
                              label: 'Currency',
                              key: 'adornment',
                              value: '€',
                              type: 'TEXT',
                            },
                            {
                              type: 'CUSTOM',
                              label: 'Position',
                              key: 'adornmentPosition',
                              value: 'start',
                              configuration: {
                                condition: {
                                  type: 'HIDE',
                                  option: 'adornment',
                                  comparator: 'EQ',
                                  value: '',
                                },
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Start', value: 'start' },
                                  { name: 'End', value: 'end' },
                                ],
                              },
                            },
                            {
                              label: 'Type',
                              key: 'type',
                              value: 'decimal',
                              type: 'TEXT',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'adornment',
                                  comparator: 'EQ',
                                  value: 0,
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
                              value: 'Light',
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
                      ],
                    };
                  }
                  case 'PASSWORD': {
                    return {
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
                          value: ['0rem', '0rem', 'M', '0rem'],
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
                              value: [property.label],
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
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['0rem', '0rem', 'S', '0rem'],
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
                          name: 'TextField',
                          ref: {
                            id: `#input_${property.id[0]}`,
                          },
                          options: [
                            {
                              value: {
                                label: [property.label],
                                value: [
                                  {
                                    id: property.id,
                                    type: property.type,
                                  },
                                ],
                                propertyIds: property.id,
                                ref: {
                                  id: `#attribute_${property.id[0]}`,
                                },
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
                              value: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
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
                              value: ['This field is required'],
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
                              value: [
                                'Password must contain 8 characters, 1 lowercase character, 1 upper case character and 1 digit',
                              ],
                              label: 'Pattern mismatch message',
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
                              value: ['This value is too short'],
                              label: 'Value too short message',
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
                              value: ['This value is too long'],
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
                              type: 'TOGGLE',
                              label: 'Disabled',
                              key: 'disabled',
                              value: false,
                            },
                            {
                              value: ['Your password'],
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
                                  { name: 'Standard', value: 'standard' },
                                  { name: 'Outlined', value: 'outlined' },
                                  { name: 'Filled', value: 'filled' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Full width',
                              key: 'fullWidth',
                              value: true,
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
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Small', value: 'small' },
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Dense', value: 'dense' },
                                  { name: 'Normal', value: 'normal' },
                                ],
                              },
                            },
                            {
                              label: 'Show password toggle',
                              key: 'adornment',
                              value: true,
                              type: 'TOGGLE',
                            },
                            {
                              type: 'CUSTOM',
                              label: 'Position',
                              key: 'adornmentPosition',
                              value: 'end',
                              configuration: {
                                condition: {
                                  type: 'HIDE',
                                  option: 'adornment',
                                  comparator: 'EQ',
                                  value: false,
                                },
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Start', value: 'start' },
                                  { name: 'End', value: 'end' },
                                ],
                              },
                            },
                            {
                              label: 'Type',
                              key: 'type',
                              value: 'password',
                              type: 'TEXT',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'adornmentPosition',
                                  comparator: 'EQ',
                                  value: 0,
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
                              value: 'Light',
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
                      ],
                    };
                  }
                  case 'DATE': {
                    return {
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
                          value: ['0rem', '0rem', 'M', '0rem'],
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
                              value: [property.label],
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
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['0rem', '0rem', 'S', '0rem'],
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
                          name: 'DateTimePicker',
                          ref: {
                            id: `#input_${property.id[0]}`,
                          },
                          options: [
                            {
                              value: {
                                label: [property.label],
                                value: [
                                  {
                                    id: property.id,
                                    type: property.type,
                                  },
                                ],
                                propertyIds: property.id,
                                ref: {
                                  id: `#attribute_${property.id[0]}`,
                                },
                              },
                              label: 'Label',
                              key: 'customModelAttribute',
                              type: 'CUSTOM_MODEL_ATTRIBUTE',
                              configuration: {
                                allowedTypes: ['date'],
                              },
                            },
                            {
                              label: 'Type',
                              key: 'type',
                              value: 'date',
                              type: 'TEXT',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'customModelAttribute',
                                  comparator: 'EQ',
                                  value: false,
                                },
                              },
                            },
                            {
                              value: true,
                              label: 'Autocomplete',
                              key: 'autoComplete',
                              type: 'TOGGLE',
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Disable Toolbar',
                              key: 'disableToolbar',
                              value: false,
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Disable past dates',
                              key: 'disablePastDates',
                              value: false,
                            },
                            {
                              label: 'Language',
                              key: 'locale',
                              value: 'en',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'English', value: 'en' },
                                  { name: 'Dutch', value: 'nl' },
                                ],
                              },
                            },
                            {
                              value: 'MM/dd/yyyy',
                              label: 'Format',
                              key: 'dateFormat',
                              type: 'TEXT',
                            },
                            {
                              value: false,
                              label: 'Error',
                              key: 'error',
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
                              value: 'inline',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Dialog', value: 'dialog' },
                                  { name: 'Inline', value: 'inline' },
                                  { name: 'Static', value: 'static' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Clearable',
                              key: 'clearable',
                              value: false,
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'variant',
                                  comparator: 'EQ',
                                  value: 'dialog',
                                },
                              },
                            },
                            {
                              label: 'Input Variant',
                              key: 'inputvariant',
                              value: 'outlined',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Standard', value: 'standard' },
                                  { name: 'Outlined', value: 'outlined' },
                                  { name: 'Filled', value: 'filled' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Full width',
                              key: 'fullWidth',
                              value: true,
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
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Small', value: 'small' },
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Dense', value: 'dense' },
                                  { name: 'Normal', value: 'normal' },
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
                              label: 'Background color popup',
                              key: 'backgroundColorPopup',
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
                              value: 'Light',
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
                              value: ['DateTimePicker'],
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
                    };
                  }
                  case 'DATE_TIME': {
                    return {
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
                          value: ['0rem', '0rem', 'M', '0rem'],
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
                              value: [property.label],
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
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['0rem', '0rem', 'S', '0rem'],
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
                          name: 'DateTimePicker',
                          ref: {
                            id: `#input_${property.id[0]}`,
                          },
                          options: [
                            {
                              value: {
                                label: [property.label],
                                value: [
                                  {
                                    id: property.id,
                                    type: property.type,
                                  },
                                ],
                                propertyIds: property.id,
                                ref: {
                                  id: `#attribute_${property.id[0]}`,
                                },
                              },
                              label: 'Label',
                              key: 'customModelAttribute',
                              type: 'CUSTOM_MODEL_ATTRIBUTE',
                              configuration: {
                                allowedTypes: ['date_time'],
                              },
                            },
                            {
                              label: 'Type',
                              key: 'type',
                              value: 'datetime',
                              type: 'TEXT',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'customModelAttribute',
                                  comparator: 'EQ',
                                  value: false,
                                },
                              },
                            },
                            {
                              value: true,
                              label: 'Autocomplete',
                              key: 'autoComplete',
                              type: 'TOGGLE',
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Disable Toolbar',
                              key: 'disableToolbar',
                              value: false,
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Disable past dates',
                              key: 'disablePastDates',
                              value: false,
                            },
                            {
                              label: 'Language',
                              key: 'locale',
                              value: 'en',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'English', value: 'en' },
                                  { name: 'Dutch', value: 'nl' },
                                ],
                              },
                            },
                            {
                              value: 'MM/dd/yyyy HH:mm:ss',
                              label: 'Format',
                              key: 'dateTimeFormat',
                              type: 'TEXT',
                              configuration: {
                                placeholder: 'dd/MM/yyyy HH:mm:ss',
                                condition: {
                                  type: 'SHOW',
                                  option: 'type',
                                  comparator: 'EQ',
                                  value: 'datetime',
                                },
                              },
                            },
                            {
                              value: true,
                              label: 'Use 24-hour format',
                              key: 'use24HourClockTime',
                              type: 'TOGGLE',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'type',
                                  comparator: 'EQ',
                                  value: 'time',
                                },
                              },
                            },
                            {
                              value: true,
                              label: 'Use 24-hour format',
                              key: 'use24HourClockDateTime',
                              type: 'TOGGLE',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'type',
                                  comparator: 'EQ',
                                  value: 'datetime',
                                },
                              },
                            },
                            {
                              value: false,
                              label: 'Error',
                              key: 'error',
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
                              value: 'inline',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Dialog', value: 'dialog' },
                                  { name: 'Inline', value: 'inline' },
                                  { name: 'Static', value: 'static' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Clearable',
                              key: 'clearable',
                              value: false,
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'variant',
                                  comparator: 'EQ',
                                  value: 'dialog',
                                },
                              },
                            },
                            {
                              label: 'Input Variant',
                              key: 'inputvariant',
                              value: 'outlined',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Standard', value: 'standard' },
                                  { name: 'Outlined', value: 'outlined' },
                                  { name: 'Filled', value: 'filled' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Full width',
                              key: 'fullWidth',
                              value: true,
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
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Small', value: 'small' },
                                ],
                              },
                            },
                            {
                              label: 'Margin',
                              key: 'margin',
                              value: 'normal',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'None', value: 'none' },
                                  { name: 'Dense', value: 'dense' },
                                  { name: 'Normal', value: 'normal' },
                                ],
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
                              label: 'Background color popup',
                              key: 'backgroundColorPopup',
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
                              value: false,
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
                              value: 'Light',
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
                              value: ['DateTimePicker'],
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
                    };
                  }
                  case 'TIME': {
                    return {
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
                          value: ['0rem', '0rem', 'M', '0rem'],
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
                              value: [property.label],
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
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['0rem', '0rem', 'S', '0rem'],
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
                          name: 'DateTimePicker',
                          ref: {
                            id: `#input_${property.id[0]}`,
                          },
                          options: [
                            {
                              value: {
                                label: [property.label],
                                value: [
                                  {
                                    id: property.id,
                                    type: property.type,
                                  },
                                ],
                                propertyIds: property.id,
                                ref: {
                                  id: `#attribute_${property.id[0]}`,
                                },
                              },
                              label: 'Label',
                              key: 'customModelAttribute',
                              type: 'CUSTOM_MODEL_ATTRIBUTE',
                              configuration: {
                                allowedTypes: ['string'],
                              },
                            },
                            {
                              label: 'Type',
                              key: 'type',
                              value: 'time',
                              type: 'TEXT',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'customModelAttribute',
                                  comparator: 'EQ',
                                  value: false,
                                },
                              },
                            },
                            {
                              value: true,
                              label: 'Autocomplete',
                              key: 'autoComplete',
                              type: 'TOGGLE',
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Disable Toolbar',
                              key: 'disableToolbar',
                              value: false,
                            },
                            {
                              value: 'HH:mm:ss',
                              label: 'Format',
                              key: 'timeFormat',
                              type: 'TEXT',
                            },
                            {
                              value: true,
                              label: 'Use 24-hour format',
                              key: 'use24HourClockTime',
                              type: 'TOGGLE',
                            },
                            {
                              value: false,
                              label: 'Error',
                              key: 'error',
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
                              value: 'inline',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Dialog', value: 'dialog' },
                                  { name: 'Inline', value: 'inline' },
                                  { name: 'Static', value: 'static' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Clearable',
                              key: 'clearable',
                              value: false,
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'variant',
                                  comparator: 'EQ',
                                  value: 'dialog',
                                },
                              },
                            },
                            {
                              label: 'Input Variant',
                              key: 'inputvariant',
                              value: 'outlined',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Standard', value: 'standard' },
                                  { name: 'Outlined', value: 'outlined' },
                                  { name: 'Filled', value: 'filled' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Full width',
                              key: 'fullWidth',
                              value: true,
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
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Small', value: 'small' },
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Dense', value: 'dense' },
                                  { name: 'Normal', value: 'normal' },
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
                              label: 'Background color popup',
                              key: 'backgroundColorPopup',
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
                              value: 'Light',
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
                              value: ['DateTimePicker'],
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
                    };
                  }
                  case 'FILE': {
                    return {
                      name: 'FileUpload',
                      ref: {
                        id: `#input_${property.id[0]}`,
                      },
                      options: [
                        {
                          value: {
                            label: [property.label],
                            value: [
                              {
                                id: property.id,
                                type: property.type,
                              },
                            ],
                            propertyIds: property.id,
                            ref: {
                              id: `#attribute_${property.id[0]}`,
                            },
                          },
                          label: 'Label',
                          key: 'customModelAttribute',
                          type: 'CUSTOM_MODEL_ATTRIBUTE',
                          configuration: {
                            allowedTypes: ['file'],
                          },
                        },
                        {
                          value: false,
                          label: 'Hide default error',
                          key: 'hideDefaultError',
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
                          label: 'Helper text',
                          key: 'helperText',
                          type: 'VARIABLE',
                        },
                        {
                          type: 'TOGGLE',
                          label: 'Full width',
                          key: 'fullWidth',
                          value: true,
                        },
                        {
                          value: ['image/*'],
                          label: 'Accept files',
                          key: 'accept',
                          type: 'VARIABLE',
                        },
                        {
                          type: 'TOGGLE',
                          label: 'Allow multiple',
                          key: 'multiple',
                          value: false,
                        },
                        {
                          label: 'Margin',
                          key: 'margin',
                          value: 'normal',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Dense', value: 'dense' },
                              { name: 'Normal', value: 'normal' },
                            ],
                          },
                        },
                        {
                          value: false,
                          label: 'Styles',
                          key: 'styles',
                          type: 'TOGGLE',
                        },
                        {
                          value: false,
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
                          value: ['FileUpload'],
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
                              padding: ['0.6875rem', '1.375rem'],
                              textDecoration: 'none',
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
                              value: ['Browse'],
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
                              value: 'FileCopy',
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
                              value: ['S', '0rem', '0rem', '0rem'],
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
                    };
                  }
                  case 'IMAGE': {
                    return {
                      name: 'FileUpload',
                      ref: {
                        id: `#input_${property.id[0]}`,
                      },
                      options: [
                        {
                          value: {
                            label: [property.label],
                            value: [
                              {
                                id: property.id,
                                type: property.type,
                              },
                            ],
                            propertyIds: property.id,
                            ref: {
                              id: `#attribute_${property.id[0]}`,
                            },
                          },
                          label: 'Label',
                          key: 'customModelAttribute',
                          type: 'CUSTOM_MODEL_ATTRIBUTE',
                          configuration: {
                            allowedTypes: ['file'],
                          },
                        },
                        {
                          type: 'CUSTOM',
                          label: 'Type',
                          key: 'type',
                          value: 'list',
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
                            ],
                          },
                        },
                        {
                          type: 'TOGGLE',
                          label: 'Show Image preview',
                          value: true,
                          key: 'showImagePreview',
                        },
                        {
                          type: 'SIZE',
                          label: 'Image preview width',
                          key: 'imagePreviewWidth',
                          value: '200px',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'showImagePreview',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Image preview height',
                          key: 'imagePreviewHeight',
                          value: '112px',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'showImagePreview',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: false,
                          label: 'Hide default error',
                          key: 'hideDefaultError',
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
                          label: 'Helper text',
                          key: 'helperText',
                          type: 'VARIABLE',
                        },
                        {
                          type: 'TOGGLE',
                          label: 'Full width',
                          key: 'fullWidth',
                          value: true,
                        },
                        {
                          value: ['image/*'],
                          label: 'Accept files',
                          key: 'accept',
                          type: 'VARIABLE',
                        },
                        {
                          type: 'TOGGLE',
                          label: 'Allow multiple',
                          key: 'multiple',
                          value: false,
                        },
                        {
                          label: 'Margin',
                          key: 'margin',
                          value: 'normal',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Dense', value: 'dense' },
                              { name: 'Normal', value: 'normal' },
                            ],
                          },
                        },
                        {
                          value: false,
                          label: 'Styles',
                          key: 'styles',
                          type: 'TOGGLE',
                        },
                        {
                          value: false,
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
                          value: ['FileUpload'],
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
                              padding: ['0.6875rem', '1.375rem'],
                              textDecoration: 'none',
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
                              value: ['Browse'],
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
                              value: ['S', '0rem', '0rem', '0rem'],
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
                    };
                  }
                  case 'BOOLEAN': {
                    return {
                      name: 'Checkbox',
                      ref: {
                        id: `#input_${property.id[0]}`,
                      },
                      options: [
                        {
                          value: {
                            label: [property.label],
                            value: [
                              {
                                id: property.id,
                                type: property.type,
                              },
                            ],
                            propertyIds: property.id,
                            ref: {
                              id: `#attribute_${property.id[0]}`,
                            },
                          },
                          label: 'Label',
                          key: 'customModelAttribute',
                          type: 'CUSTOM_MODEL_ATTRIBUTE',
                          configuration: {
                            allowedTypes: ['boolean'],
                          },
                        },
                        {
                          label: 'Label Position',
                          key: 'position',
                          value: 'end',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Start', value: 'start' },
                              { name: 'End', value: 'end' },
                              { name: 'Top', value: 'top' },
                              { name: 'Bottom', value: 'bottom' },
                            ],
                          },
                        },
                        {
                          value: false,
                          label: 'Validation options',
                          key: 'validationOptions',
                          type: 'TOGGLE',
                        },
                        {
                          value: ['This field is required'],
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
                          type: 'TOGGLE',
                          label: 'Disabled',
                          key: 'disabled',
                          value: false,
                        },
                        {
                          value: [],
                          label: 'Helper text',
                          key: 'helperText',
                          type: 'VARIABLE',
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
                              { name: 'Medium', value: 'medium' },
                              { name: 'Small', value: 'small' },
                            ],
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
                          label: 'Checkbox color',
                          key: 'checkboxColor',
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
                          label: 'Checkbox color checked',
                          key: 'checkboxColorChecked',
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
                          value: ['Checkbox'],
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
                    };
                  }
                  case 'LIST': {
                    return {
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
                          value: ['0rem', '0rem', 'M', '0rem'],
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
                              value: [property.label],
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
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['0rem', '0rem', 'S', '0rem'],
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
                          name: 'Select',
                          ref: {
                            id: `#input_${property.id[0]}`,
                          },
                          options: [
                            {
                              value: {
                                label: [property.label],
                                value: [
                                  {
                                    id: property.id,
                                    type: property.type,
                                  },
                                ],
                                propertyIds: property.id,
                                ref: {
                                  id: `#attribute_${property.id[0]}`,
                                },
                              },
                              label: 'Label',
                              key: 'customModelAttribute',
                              type: 'CUSTOM_MODEL_ATTRIBUTE',
                              configuration: {
                                allowedTypes: ['string'],
                              },
                            },
                            {
                              value: [''],
                              label: 'Blank option',
                              key: 'blanco',
                              type: 'VARIABLE',
                            },
                            {
                              label: 'Option type',
                              key: 'optionType',
                              value: 'static',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Static', value: 'static' },
                                  { name: 'Model', value: 'model' },
                                  { name: 'Property', value: 'property' },
                                ],
                              },
                            },
                            {
                              value: property.id,
                              label: 'Property',
                              key: 'property',
                              type: 'PROPERTY',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'optionType',
                                  comparator: 'EQ',
                                  value: 'property',
                                },
                              },
                            },
                            {
                              type: 'MODEL',
                              label: 'Model',
                              key: 'model',
                              value: '',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'optionType',
                                  comparator: 'EQ',
                                  value: 'model',
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
                                condition: {
                                  type: 'SHOW',
                                  option: 'optionType',
                                  comparator: 'EQ',
                                  value: 'model',
                                },
                              },
                            },
                            {
                              type: 'PROPERTY',
                              label: 'Order by',
                              key: 'orderBy',
                              value: '',
                              configuration: {
                                dependsOn: 'model',
                                condition: {
                                  type: 'SHOW',
                                  option: 'optionType',
                                  comparator: 'EQ',
                                  value: 'model',
                                },
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
                              type: 'PROPERTY',
                              label: 'Property',
                              key: 'labelProperty',
                              value: '',
                              configuration: {
                                dependsOn: 'model',
                                condition: {
                                  type: 'SHOW',
                                  option: 'optionType',
                                  comparator: 'EQ',
                                  value: 'model',
                                },
                              },
                            },
                            {
                              value: '',
                              label: 'Value property',
                              key: 'valueProperty',
                              type: 'PROPERTY',
                              configuration: {
                                dependsOn: 'model',
                                condition: {
                                  type: 'SHOW',
                                  option: 'optionType',
                                  comparator: 'EQ',
                                  value: 'model',
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
                                condition: {
                                  type: 'SHOW',
                                  option: 'optionType',
                                  comparator: 'EQ',
                                  value: 'model',
                                },
                              },
                            },
                            {
                              type: 'TEXT',
                              label: 'Options',
                              key: 'selectOptions',
                              value: 'a\nb\nc',
                              configuration: {
                                as: 'MULTILINE',
                                condition: {
                                  type: 'SHOW',
                                  option: 'optionType',
                                  comparator: 'EQ',
                                  value: 'static',
                                },
                              },
                            },
                            {
                              value: false,
                              label: 'Validation options',
                              key: 'validationOptions',
                              type: 'TOGGLE',
                            },
                            {
                              value: ['This field is required'],
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
                              type: 'TOGGLE',
                              label: 'Disabled',
                              key: 'disabled',
                              value: false,
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
                                  { name: 'Standard', value: 'standard' },
                                  { name: 'Outlined', value: 'outlined' },
                                  { name: 'Filled', value: 'filled' },
                                ],
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Full width',
                              key: 'fullWidth',
                              value: true,
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
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Small', value: 'small' },
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Dense', value: 'dense' },
                                  { name: 'Normal', value: 'normal' },
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
                              value: ['Select'],
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
                    };
                  }
                  case 'SERIAL': {
                    return undefined;
                  }
                  default:
                    return {
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
                          value: ['0rem', '0rem', 'M', '0rem'],
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
                              value: [property.label],
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
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['0rem', '0rem', 'S', '0rem'],
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
                          name: 'TextField',
                          ref: {
                            id: `#input_${property.id[0]}`,
                          },
                          options: [
                            {
                              value: {
                                label: [property.label],
                                value: [
                                  {
                                    id: property.id,
                                    type: property.type,
                                  },
                                ],
                                propertyIds: property.id,
                                ref: {
                                  id: `#attribute_${property.id[0]}`,
                                },
                              },
                              label: 'Label',
                              key: 'customModelAttribute',
                              type: 'CUSTOM_MODEL_ATTRIBUTE',
                              configuration: {
                                allowedTypes: ['string'],
                              },
                            },
                            {
                              value: true,
                              label: 'Autocomplete',
                              key: 'autoComplete',
                              type: 'TOGGLE',
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
                              value: ['This field is required'],
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
                              label: 'Pattern mismatch message',
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
                              value: ['This value is too short'],
                              label: 'Value too short message',
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
                              value: ['This value is too long'],
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
                              type: 'TOGGLE',
                              label: 'Disabled',
                              key: 'disabled',
                              value: false,
                            },
                            {
                              value: [property.label],
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
                              value: true,
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
                                  { name: 'Small', value: 'small' },
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
                                  { name: 'None', value: 'none' },
                                  { name: 'Dense', value: 'dense' },
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
                              value: 'Email',
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
                                  { name: 'Start', value: 'start' },
                                  { name: 'End', value: 'end' },
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
                              value: 'Light',
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
                      ],
                    };
                }
              });
              return descendants;
            }

            newPrefab.actions[0].events[0].options.modelId = modelId;

            const createForm = getDescendantByRef(
              '#createForm',
              prefabStructure,
            );

            const createFormInputsArray = makeDescendantsArray(
              createFormUseDataProperties ? properties : createFormProperties,
            ).filter(item => item !== undefined);
            createForm.descendants = [...createFormInputsArray];
            newPrefab.actions[0].events[0].options.assign = (createFormUseDataProperties
              ? properties
              : createFormProperties
            ).map(property => ({
              leftHandSide: property.id[0],
              ref: {
                path: [
                  '#customModelVariableId',
                  `#attribute_${property.id[0]}`,
                ],
              },
            }));

            newPrefab.interactions = interactions;

            createForm.options[0].value.modelId = modelId;
            createForm.options[1].value = modelId;

            getDescendantByRef(
              '#createDialogTitle',
              prefabStructure,
            ).options[0].value = [`Create new ${data.model.label}`];
            getDescendantByRef(
              '#openCreateDialogBtn',
              prefabStructure,
            ).options[1].value = [`New ${data.model.label}`];
            getDescendantByRef(
              '#successAlert',
              prefabStructure,
            ).options[1].value = [
              `New ${data.model.label} created successfully`,
            ];

            newPrefab.structure[0].descendants[0].descendants = prefabStructure;
            save(newPrefab);
          }}
          onClose={close}
        />
      </>
    );
  },
  variables: [
    {
      kind: 'construct',
      name: 'form_data',
      ref: {
        id: '#customModelVariableId',
        endpointId: '#endpointId',
      },
      options: {
        modelId: '',
        ref: {
          customModelId: '#customModelId',
        },
      },
    },
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
      name: 'Create form action',
      ref: {
        id: '#actionId',
        endpointId: '#endpointId',
      },
      useNewRuntime: false,
      events: [
        {
          kind: 'create',
          options: {
            modelId: '',
            assign: [],
          },
        },
      ],
    },
  ],
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
          descendants: [],
        },
      ],
    },
  ],
}))();
