(() => ({
  name: 'Page with Check',
  icon: 'NavbarIcon',
  type: 'page',
  description: 'Page with Checkbox',
  detail:
    'Start with a full height page containing a header, footer and body that will scale to the height of the content.',
  previewUrl: 'https://preview.betty.app/header-and-footer',
  previewImage: 'https://www.businessinsider.nl/fun-facts-shrek-movie-2019-2/',
  category: 'LAYOUT',
  beforeCreate: ({
    helpers: { useModelQuery },
    prefab,
    save,
    close,
    components: {
      Header,
      Content,
      Field,
      Footer,
      Text,
      Box,
      ModelSelector,
      PropertySelector,
      Button,
      PartialSelector,
    },
  }) => {
    const [stepNumber, setStepNumber] = React.useState(1);
    const [headerPartialId, setHeaderPartialId] = React.useState('');
    const [footerPartialId, setFooterPartialId] = React.useState('');
    const [showValidation, setShowValidation] = React.useState(false);
    const [modelId, setModelId] = React.useState('');
    const [titleProperty, setTitleProperty] = React.useState('');
    const [descriptionProperty, setDescriptionProperty] = React.useState('');
    const [checkboxProperty, setCheckboxProperty] = React.useState('');
    const [properties, setProperties] = React.useState([]);

    const { data } = useModelQuery({
      variables: { id: modelId },
      skip: !modelId,
    });

    const enrichVarObj = (obj) => {
      const returnObj = obj;
      if (data && data.model) {
        const property = data.model.properties.find(
          (prop) => prop.id === obj.id[0],
        );
        if (property) {
          returnObj.name = `{{ ${data.model.name}.${property.name} }}`;
        }
      }
      return returnObj;
    };

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

    React.useEffect(() => {
      setProperties([]);
    }, [modelId]);

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
                ref: {
                  id: '#Menu',
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
                            name: 'Text',
                            options: [
                              {
                                type: 'VARIABLE',
                                label: 'Content',
                                key: 'content',
                                value: ['Page title'],
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
                            name: 'Text',
                            options: [
                              {
                                type: 'VARIABLE',
                                label: 'Content',
                                key: 'content',
                                value: [
                                  'Please add a subline here or just delete it if you want.',
                                ],
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
                                value: ['M', '0rem', 'XL', '0rem'],
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
                            name: 'DataList',
                            ref: {
                              id: '#dataList',
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
                                  dependsOn: 'model',
                                  condition: {
                                    type: 'HIDE',
                                    option: 'orderBy',
                                    comparator: 'EQ',
                                    value: '',
                                  },
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
                                value: 'true',
                                label: 'Hide built-in search field',
                                key: 'hideSearch',
                                type: 'TOGGLE',
                                configuration: {
                                  dependsOn: 'model',
                                },
                              },
                              {
                                label: 'Pagination',
                                key: 'pagination',
                                value: 'whenNeeded',
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
                                value: '10',
                                label: 'Rows per page (max 50)',
                                key: 'take',
                                type: 'NUMBER',
                                configuration: {
                                  dependsOn: 'model',
                                },
                              },
                              {
                                value: '8',
                                label: 'Placeholder rows',
                                key: 'placeholderTake',
                                type: 'NUMBER',
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
                                value: '250px',
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
                                value: ['M', '0rem', 'M', '0rem'],
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
                                value: 'default',
                                label: 'Show on load',
                                key: 'loadingType',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  dependsOn: 'model',
                                  allowedInput: [
                                    {
                                      name: 'Message',
                                      value: 'default',
                                    },
                                    {
                                      name: 'Content',
                                      value: 'showChildren',
                                    },
                                    {
                                      name: 'Skeleton',
                                      value: 'skeleton',
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
                                  dependsOn: 'model',
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
                                        {
                                          name: 'Left',
                                          value: 'flex-start',
                                        },
                                        { name: 'Center', value: 'center' },
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
                                        { name: 'None', value: 'none' },
                                        {
                                          name: 'Top',
                                          value: 'flex-start',
                                        },
                                        { name: 'Center', value: 'center' },
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
                                    value: ['S', 'S', '0rem', 'S'],
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
                                        {
                                          name: 'Relative',
                                          value: 'relative',
                                        },
                                        {
                                          name: 'Absolute',
                                          value: 'absolute',
                                        },
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
                                    value: 'None',
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
                                        {
                                          name: 'Inherit',
                                          value: 'inherit',
                                        },
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
                                    value: '5px',
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
                                        value: 'space-between',
                                        label: 'Alignment',
                                        key: 'alignment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            { name: 'None', value: 'none' },
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
                                            { name: 'None', value: 'none' },
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
                                        value: '100%',
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
                                        value: ['S', 'S', 'S', 'M'],
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
                                            { name: 'None', value: 'none' },
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
                                        name: 'Checkbox',
                                        ref: { id: '#titleText' },
                                        options: [
                                          {
                                            value: {
                                              label: ['Title'],
                                              value: ['Title'],
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
                                                {
                                                  name: 'Start',
                                                  value: 'start',
                                                },
                                                {
                                                  name: 'End',
                                                  value: 'end',
                                                },
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
                                            value: false,
                                            label: 'Validation options',
                                            key: 'validationOptions',
                                            type: 'TOGGLE',
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
                                            value: true,
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
                                            value: '25%',
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
                                            value: true,
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
                                            value: 20,
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
                                            name: 'Button',
                                            ref: { id: '#DropdownButton' },
                                            style: {
                                              overwrite: {
                                                backgroundColor: {
                                                  type: 'STATIC',
                                                  value: 'transparent',
                                                },
                                                boxShadow: 'none',
                                                color: {
                                                  type: 'THEME_COLOR',
                                                  value: 'black',
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
                                                type: 'VARIABLE',
                                                label: 'Button text',
                                                key: 'buttonText',
                                                value: [''],
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
                                              },
                                              {
                                                label: 'Icon',
                                                key: 'icon',
                                                value: 'KeyboardArrowDown',
                                                type: 'ICON',
                                              },
                                              {
                                                value: 'large',
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
                                                key: 'dataComponentAttribute',
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
                                            ref: { id: '#UpButton' },
                                            style: {
                                              overwrite: {
                                                backgroundColor: {
                                                  type: 'STATIC',
                                                  value: 'transparent',
                                                },
                                                boxShadow: 'none',
                                                color: {
                                                  type: 'THEME_COLOR',
                                                  value: 'black',
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
                                                value: false,
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
                                              },
                                              {
                                                label: 'Icon',
                                                key: 'icon',
                                                value: 'KeyboardArrowUp',
                                                type: 'ICON',
                                              },
                                              {
                                                value: 'large',
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
                                                key: 'dataComponentAttribute',
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
                                        ref: { id: '#DropdownColumn' },
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
                                            ref: { id: '#descriptionText' },
                                            name: 'Text',
                                            options: [
                                              {
                                                type: 'VARIABLE',
                                                label: 'Content',
                                                key: 'content',
                                                value: ['Description'],
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
                    ],
                  },
                ],
              },
              {
                name: 'Box',
                ref: {
                  id: '#Footer',
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
                    type: 'PARTIAL',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    const defaultHeaderstructure = {
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
                  {
                    name: 'Relative',
                    value: 'relative',
                  },
                  {
                    name: 'Absolute',
                    value: 'absolute',
                  },
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
          ],
        },
      ],
    };

    const defaultFooterStructure = {
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
    };
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
                    By using a partial for the header and footer you can easily
                    reuse the same structure without having to go through every
                    page.
                  </Text>
                </Box>
                <Field label="HEADER PARTIAL">
                  <PartialSelector
                    label="Select a partial"
                    onChange={(headerId) => {
                      setHeaderPartialId(headerId);
                    }}
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
            <Box direction="row">
              <Box direction="column" basis="2/3">
                <Field
                  label="Select model"
                  error={
                    showValidation && (
                      <Text color="#e82600">Selecting a model is required</Text>
                    )
                  }
                >
                  <ModelSelector
                    onChange={(value) => {
                      setShowValidation(false);
                      setModelId(value);
                      setTitleProperty('');
                      setDescriptionProperty('');
                      setCheckboxProperty('');
                    }}
                    value={modelId}
                  />
                </Field>
                <Field label="Title property">
                  <PropertySelector
                    modelId={modelId}
                    onChange={(value) => {
                      setTitleProperty(value);
                    }}
                    value={titleProperty}
                    disabled={!modelId}
                  />
                </Field>
                <Field label="Description property">
                  <PropertySelector
                    modelId={modelId}
                    onChange={(value) => {
                      setDescriptionProperty(value);
                    }}
                    value={descriptionProperty}
                    disabled={!modelId}
                  />
                </Field>
                <Field label="Checkbox property">
                  <PropertySelector
                    modelId={modelId}
                    onChange={(value) => {
                      setCheckboxProperty(value);
                    }}
                    value={checkboxProperty}
                    disabled={!modelId}
                  />
                </Field>
              </Box>
            </Box>
          </>
        );
      },
      onSave: () => {
        if (!modelId) {
          setShowValidation(true);
          return;
        }
        const newPrefab = { ...prefab };
        if (modelId) {
          const dataList = getDescendantByRef('#dataList', prefabStructure);
          dataList.options[0].value = modelId;

          const titleText = getDescendantByRef('#titleText', prefabStructure);

          if (titleProperty.id) {
            titleText.options[0].value.value = [enrichVarObj(checkboxProperty)];
            titleText.options[0].value.label = [enrichVarObj(titleProperty)];
          }

          const descriptionText = getDescendantByRef(
            '#descriptionText',
            prefabStructure,
          );

          if (descriptionProperty.id) {
            descriptionText.options[0].value = [
              enrichVarObj(descriptionProperty),
            ];
          }

          // #region Partial Selection
          const partialHeader = getDescendantByRef('#Menu', prefabStructure);
          if (headerPartialId) {
            partialHeader.descendants[0].partialId = headerPartialId;
          } else {
            partialHeader.descendants[0] = defaultHeaderstructure;
          }
          const partialFooter = getDescendantByRef('#Footer', prefabStructure);
          if (footerPartialId) {
            partialFooter.descendants[0].partialId = footerPartialId;
          } else {
            partialFooter.descendants[0] = defaultFooterStructure;
          }
          newPrefab.structure[0].descendants = prefabStructure;
          newPrefab.variables[0].options.modelId = modelId;
          newPrefab.variables[1].options.modelId = modelId;
          newPrefab.actions[0].events[0].options.assign = properties.map(
            (property) => ({
              leftHandSide: property.id[0],
              ref: {
                path: [
                  '#customModelVariableId',
                  `#attribute_${property.id[0]}`,
                ],
              },
            }),
          );

          save(newPrefab);
        }
        // #endregion
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
              onSkip={() => {
                const newPrefab = { ...prefab };
                const partialHeader = getDescendantByRef(
                  '#Menu',
                  prefabStructure,
                );
                if (headerPartialId) {
                  partialHeader.descendants[0].partialId = headerPartialId;
                } else {
                  partialHeader.descendants[0] = defaultHeaderstructure;
                }
                const partialFooter = getDescendantByRef(
                  '#Footer',
                  prefabStructure,
                );
                if (footerPartialId) {
                  partialFooter.descendants[0].partialId = footerPartialId;
                } else {
                  partialFooter.descendants[0] = defaultFooterStructure;
                }
                newPrefab.structure[0].descendants = prefabStructure;
                save(newPrefab);
              }}
              onSave={stepNumber === stepper.stepAmount && stepper.onSave}
            />
          </Box>
        </Box>
      ),
      progressBar: (titles) => {
        const titlesArray = titles;
        return (
          <Box
            justify="center"
            margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
          >
            <Text size="medium" weight="bold">{`Step: ${stepNumber} / ${
              stepper.stepAmount
            } - ${titlesArray[stepNumber - 1]}`}</Text>
          </Box>
        );
      },
      stepAmount: 2,
    };
    return (
      <>
        <Header onClose={close} title="Configure component" />
        {stepper.progressBar([
          'Configure header and footer',
          'Configure your card and list view',
        ])}
        <Content>{stepper.setStep(stepNumber)}</Content>
        {stepper.buttons()}
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
      ref: {
        id: '#actionId',
        endpointId: '#endpointId',
      },
      useNewRuntime: false,
      events: [
        {
          kind: 'update',
          options: {
            ref: {
              object: '#objectVariableId',
            },
            assign: [],
          },
        },
      ],
    },
  ],
  interactions: [
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#DropdownColumn',
        sourceComponentId: '#DropdownButton',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#UpButton',
        sourceComponentId: '#DropdownButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#DropdownButton',
        sourceComponentId: '#DropdownButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#DropdownColumn',
        sourceComponentId: '#UpButton',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#DropdownButton',
        sourceComponentId: '#UpButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#UpButton',
        sourceComponentId: '#UpButton',
      },
      type: 'Custom',
    },
  ],
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
