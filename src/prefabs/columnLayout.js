(() => ({
  name: 'Column Layout',
  icon: 'GridIcon',
  description:
    'With this component you can select the amount of rows and the number of columns for each row',
  category: 'LAYOUT',
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
    const [rows, setRows] = React.useState([{ row: 1, columns: '2' }]);

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

    return (
      <>
        <Header onClose={close} title="Configure Layout" />
        <Content>
          <Box direction="row">
            <Box direction="column" basis="2/3">
              <Field
                info={
                  <Text size="small" color="grey700">
                    Click the 'add rows' button to add a new row to the page.
                    You can specify the amount of columns per row
                  </Text>
                }
              >
                <Button
                  label="+ Add Row"
                  disabled={!(rows.length < 9)}
                  onClick={() => {
                    if (rows.length < 9) {
                      setRows([
                        ...rows,
                        { row: rows.length + 1, columns: '1' },
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
                      <Text>Row {row.row}</Text>
                    </Box>
                    <Box direction="column" basis="auto">
                      <ButtonGroup
                        onChange={({ target: { value } }) => {
                          const index = rows.findIndex(
                            currentRow => currentRow.row === row.row,
                          );
                          const updatedRows = rows;
                          updatedRows[index].columns = value;
                          setRows([...updatedRows]);
                        }}
                        value={row.columns.toString()}
                      >
                        <ButtonGroupButton
                          label="1"
                          value="1"
                          name={`options-${row.row}`}
                        />
                        <ButtonGroupButton
                          label="2"
                          value="2"
                          name={`options-${row.row}`}
                        />
                        <ButtonGroupButton
                          label="3"
                          value="3"
                          name={`options-${row.row}`}
                        />
                        <ButtonGroupButton
                          label="4"
                          value="4"
                          name={`options-${row.row}`}
                        />
                        <ButtonGroupButton
                          label="5"
                          value="5"
                          name={`options-${row.row}`}
                        />
                        <ButtonGroupButton
                          label="6"
                          value="6"
                          name={`options-${row.row}`}
                        />
                      </ButtonGroup>
                    </Box>
                    <Box direction="column" basis="auto" pad={{ left: '5px' }}>
                      <DeleteButton
                        label="X"
                        value={row.row}
                        disabled={!(rows.length > 1)}
                        onClick={event => {
                          const newRows = [...rows];
                          const index = newRows.findIndex(
                            currentRow =>
                              currentRow.row ===
                              parseInt(event.target.value, 10),
                          );
                          if (index !== -1) {
                            newRows.splice(index, 1);

                            newRows.map((correctRow, rowIndex) => {
                              const newRow = correctRow;
                              newRow.row = rowIndex + 1;
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
        </Content>
        <Footer
          onClose={close}
          onSave={() => {
            const newPrefab = { ...prefab };
            rows.map(row => {
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
                });
              }
              newPrefab.structure[0].descendants.push(newRow);
            });
            save(newPrefab);
          }}
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
      descendants: [],
    },
  ],
}))();
