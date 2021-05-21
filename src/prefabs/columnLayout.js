(() => ({
  name: 'Column Layout',
  icon: 'GridIcon',
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', 'multiple'],
  beforeCreate: ({
    close,
    components: {
      Box,
      Content,
      Field,
      Footer,
      Header,
      ButtonGroup,
      ButtonGroupButton,
      Button,
      Text,
      DeleteButton,
    },
    prefab,
    save,
  }) => {
    const [rows, setRows] = React.useState([{ index: 1, columns: 2 }]);

    const createElements = n => {
      const elements = [];
      for (let i = 0; i < n; i += 1) {
        elements.push(
          <Box
            border={{
              color: '#AFB5C8',
              size: 'xsmall',
              style: 'dashed',
              side: 'all',
            }}
            margin="2px"
            direction="column"
            width={`${100 / n}%`}
            background="#f0f1f5"
          />,
        );
      }
      return elements;
    };

    const maxRows = rows.length < 9;

    return (
      <>
        <Header onClose={close} title="Configure Layout" />
        <Content>
          <Box direction="row">
            <Box direction="column" basis="2/3">
              <Field
                info={
                  <Text size="small" color="grey700">
                    Click the <b>+ Add row</b> button to add a new row to the
                    page.
                    <br />
                    You can specify the amount of columns per row
                  </Text>
                }
              >
                <Button
                  label="+ Add row"
                  disabled={!maxRows}
                  onClick={() => {
                    if (maxRows) {
                      setRows([
                        ...rows,
                        { index: rows.length + 1, columns: 1 },
                      ]);
                    }
                  }}
                />
              </Field>
              {rows.map(row => (
                <Field>
                  <Box direction="row">
                    <Box
                      direction="column"
                      basis="auto"
                      alignSelf="center"
                      pad={{ right: '15px' }}
                    >
                      <Text>Row {row.index}</Text>
                    </Box>
                    <Box direction="column" basis="auto">
                      <ButtonGroup
                        onChange={({ target: { value } }) => {
                          const index = rows.findIndex(
                            currentRow => currentRow.index === row.index,
                          );
                          const updatedRows = rows;
                          updatedRows[index].columns = parseInt(value, 10);
                          setRows([...updatedRows]);
                        }}
                        value={row.columns.toString()}
                      >
                        <ButtonGroupButton
                          label="1"
                          value="1"
                          name={`options-${row.index}`}
                        />
                        <ButtonGroupButton
                          label="2"
                          value="2"
                          name={`options-${row.index}`}
                        />
                        <ButtonGroupButton
                          label="3"
                          value="3"
                          name={`options-${row.index}`}
                        />
                        <ButtonGroupButton
                          label="4"
                          value="4"
                          name={`options-${row.index}`}
                        />
                        <ButtonGroupButton
                          label="5"
                          value="5"
                          name={`options-${row.index}`}
                        />
                        <ButtonGroupButton
                          label="6"
                          value="6"
                          name={`options-${row.index}`}
                        />
                      </ButtonGroup>
                    </Box>
                    <Box direction="column" basis="auto" pad={{ left: '5px' }}>
                      <DeleteButton
                        label="X"
                        value={row.index}
                        disabled={!(rows.length > 1)}
                        onClick={event => {
                          const newRows = [...rows];
                          const index = newRows.findIndex(
                            currentRow =>
                              currentRow.index ===
                              parseInt(event.target.value, 10),
                          );
                          if (index !== -1) {
                            newRows.splice(index, 1);

                            newRows.map((correctRow, rowIndex) => {
                              const newRow = correctRow;
                              newRow.index = rowIndex + 1;
                              return { ...newRow };
                            });
                            setRows([...newRows]);
                          }
                        }}
                      />
                    </Box>
                  </Box>
                </Field>
              ))}
            </Box>
            <Box direction="column" basis="1/3" margin={{ top: '11%' }}>
              <Text color="#666d85">Preview:</Text>
              {rows.map(row => (
                <Box
                  border={{
                    color: '#AFB5C8',
                    size: 'xsmall',
                    style: 'dashed',
                    side: 'all',
                  }}
                  direction="row"
                  height="100%"
                  background="#FFFFFF"
                  justify="center"
                >
                  {createElements(row.columns)}
                </Box>
              ))}
            </Box>
          </Box>
          <Box pad={{ top: '2rem' }}>
            <Text color="#666d85" size="small">
              Note: On smaller screens the preview may differ from what you see
              on the canvas.
              <br />
              It should be the same when you build the page
            </Text>
          </Box>
        </Content>
        <Footer
          onClose={close}
          onSave={() => {
            const newPrefab = { ...prefab };
            rows.forEach(row => {
              const newRow = {
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
                descendants: [],
              };

              for (let index = 0; index < row.columns; index += 1) {
                let widthArray = [];
                switch (row.columns) {
                  case 2:
                    widthArray = ['6', '6', '12', '12'];
                    break;
                  case 3:
                    widthArray = ['4', '4', '12', '12'];
                    break;
                  case 4:
                    widthArray = ['3', '6', '6', '12'];
                    break;
                  case 5:
                    widthArray = ['flexible', 'flexible', '6', '12'];
                    break;
                  case 6:
                    widthArray = ['2', '2', '6', '6'];
                    break;
                  default:
                    widthArray = [
                      'flexible',
                      'flexible',
                      'flexible',
                      'flexible',
                    ];
                    break;
                }
                newRow.descendants.push({
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
                      value: widthArray[0],
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
                      value: widthArray[1],
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
                      value: widthArray[2],
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
                      value: widthArray[3],
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
                  descendants: [],
                });
              }
              newPrefab.structure[0].descendants[0].descendants.push(newRow);
            });
            save(newPrefab);
          }}
        />
      </>
    );
  },
  interactions: [],
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
          descendants: [],
        },
      ],
    },
  ],
}))();
