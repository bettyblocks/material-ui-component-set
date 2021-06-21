(() => ({
  name: 'Detail View',
  icon: 'DetailViewIcon',
  keywords: ['detail', 'view', 'data', 'collection'],
  category: 'DATA',
  beforeCreate: ({
    components: {
      Content,
      Header,
      Field,
      Footer,
      ModelSelector,
      PropertiesSelector,
      ButtonGroup,
      ButtonGroupButton,
    },
    helpers: { useCurrentPageId, camelToSnakeCase, useModelQuery },
    prefab,
    save,
    close,
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [properties, setProperties] = React.useState([]);
    const [numberOfColumns, setNumberOfColumns] = React.useState('6');
    const sideBySide = false;

    const pageUuid = useCurrentPageId();

    const { data } = useModelQuery({
      variables: { id: modelId },
    });

    const enrichVarObj = obj => {
      const returnObj = obj;
      if (data && data.model) {
        const property = data.model.properties.find(
          prop => prop.id === returnObj.id[0],
        );
        if (property) {
          returnObj.name = `{{ ${data.model.name}.${property.name} }}`;
        }
      }
      return returnObj;
    };

    return (
      <>
        <Header title="Configure detail view" onClose={close} />
        <Content>
          <Field label="Model">
            <ModelSelector
              onChange={value => {
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
          {sideBySide === false && (
            <Field label="Number of columns">
              <ButtonGroup
                onChange={({ target: { value } }) => {
                  setNumberOfColumns(value);
                }}
                value={numberOfColumns}
              >
                <ButtonGroupButton label="1 column" value="12" name="options" />
                <ButtonGroupButton label="2 columns" value="6" name="options" />
                <ButtonGroupButton label="3 columns" value="4" name="options" />
              </ButtonGroup>
            </Field>
          )}
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

            const variableName = `${camelToSnakeCase(data.model.label)}_id`;
            newPrefab.variables.push({
              kind: 'integer',
              name: variableName,
              pageId: pageUuid,
              ref: {
                id: '#idVariable',
              },
            });
            newPrefab.structure[0].options[0].value = modelId;

            if (!sideBySide) {
              newPrefab.structure[0].descendants[0].descendants.push({
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
                    value: 'Accent1',
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
                descendants: [],
              });

              properties.forEach(property => {
                newPrefab.structure[0].descendants[0].descendants[0].descendants.push(
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
                        value: numberOfColumns,
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
                        value: numberOfColumns,
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
                        value: 'White',
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
                        value: ['S', 'S', 'S', 'S'],
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
                        name: 'DetailViewChild',
                        options: [
                          {
                            value:
                              property.kind === 'IMAGE'
                                ? ''
                                : enrichVarObj(property),
                            label: 'Property',
                            key: 'property',
                            type: 'PROPERTY',
                          },
                          {
                            type: 'VARIABLE',
                            label: 'Label Text',
                            key: 'labelText',
                            value:
                              property.kind === 'IMAGE'
                                ? [`${property.label}`]
                                : [],
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
                            label: 'Side by Side',
                            key: 'sideBySide',
                            type: 'TOGGLE',
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
                            value: '800',
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
                                  ],
                                  descendants: [],
                                },
                              ]
                            : [],
                      },
                    ],
                  },
                );
              });
            } else {
              properties.forEach((property, index) => {
                newPrefab.structure[0].descendants[0].descendants.push({
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
                      value: 'Accent1',
                      label: 'Background color',
                      key: 'backgroundColor',
                      type: 'COLOR',
                    },
                    {
                      value: [
                        '0rem',
                        '0rem',
                        `${properties.length - 1 === index ? '0rem' : 'M'}`,
                        '0rem',
                      ],
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
                          value: '3',
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
                          value: '3',
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
                          value: 'White',
                          label: 'Background color',
                          key: 'backgroundColor',
                          type: 'COLOR',
                        },
                        {
                          type: 'CUSTOM',
                          label: 'Horizontal Alignment',
                          key: 'horizontalAlignment',
                          value: 'flex-end',
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
                      ],
                      descendants: [
                        {
                          name: 'Text',
                          options: [
                            {
                              type: 'VARIABLE',
                              label: 'Content',
                              key: 'content',
                              value: [`${property.label}: `],
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
                              value: ['0rem', 'S', '0rem', '0rem'],
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
                          value: '9',
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
                          value: '9',
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
                          value: 'White',
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
                      ],
                      descendants: [
                        {
                          name: 'Text',
                          options: [
                            {
                              type: 'VARIABLE',
                              label: 'Content',
                              key: 'content',
                              value: [enrichVarObj(property)],
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
                      ],
                    },
                  ],
                });
              });
            }
            save(newPrefab);
          }}
          onClose={close}
        />
      </>
    );
  },
  interactions: [],
  variables: [],
  structure: [
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
          value: '0',
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
              value: false,
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
          descendants: [],
        },
      ],
    },
  ],
}))();
