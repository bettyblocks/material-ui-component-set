import * as React from 'react';
import {
  Icon,
  BeforeCreateArgs,
  prefab as makePrefab,
  PrefabComponentOption,
} from '@betty-blocks/component-sdk';
import { Column, Row } from './structures';

const attr = {
  icon: Icon.GridIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', 'multiple'],
};

const beforeCreate = ({
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
  helpers: { cloneStructure, setOption },
  prefab,
  save,
}: BeforeCreateArgs) => {
  const [rows, setRows] = React.useState([{ index: 1, columns: 2 }]);

  const createElements = (n: number) => {
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
                    setRows([...rows, { index: rows.length + 1, columns: 1 }]);
                  }
                }}
              />
            </Field>
            {rows.map((row) => (
              <Field key={row.index}>
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
                      onChange={({
                        target: { value },
                      }: {
                        target: { value: string };
                      }) => {
                        const index = rows.findIndex(
                          (currentRow) => currentRow.index === row.index,
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
                      onClick={(event: any) => {
                        const newRows = [...rows];
                        const index = newRows.findIndex(
                          (currentRow) =>
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
            {rows.map((row) => (
              <Box
                key={row.index}
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
            Note: On smaller screens the preview may differ from what you see on
            the canvas.
            <br />
            It should be the same when you build the page
          </Text>
        </Box>
      </Content>
      <Footer
        onClose={close}
        onSave={() => {
          const newPrefab = { ...prefab };
          rows.forEach((row) => {
            const newRow = cloneStructure('1 Column');
            if (newRow.type !== 'COMPONENT') {
              throw new Error(
                `Expected a component, but instead got ${newRow.type}`,
              );
            }
            const newColumn = newRow.descendants[0];
            newRow.descendants = [];

            for (let index = 0; index < row.columns; index += 1) {
              let widthArray: any[] = [];
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
                  widthArray = ['flexible', 'flexible', 'flexible', 'flexible'];
                  break;
              }
              if (
                newRow.type === 'COMPONENT' &&
                newColumn.type === 'COMPONENT'
              ) {
                setOption(
                  newColumn,
                  'columnWidth',
                  (option: PrefabComponentOption) => ({
                    ...option,
                    value: widthArray[0],
                  }),
                );
                setOption(
                  newColumn,
                  'columnWidthTabletLandscape',
                  (option: PrefabComponentOption) => ({
                    ...option,
                    value: widthArray[1],
                  }),
                );
                setOption(
                  newColumn,
                  'columnWidthTabletPortrait',
                  (option: PrefabComponentOption) => ({
                    ...option,
                    value: widthArray[2],
                  }),
                );
                setOption(
                  newColumn,
                  'columnWidthMobile',
                  (option: PrefabComponentOption) => ({
                    ...option,
                    value: widthArray[3],
                  }),
                );
              }
              newRow.descendants.push(newColumn);
            }
            if (
              newPrefab.structure[0].type === 'COMPONENT' &&
              newPrefab.structure[0].descendants[0].type === 'COMPONENT'
            )
              newPrefab.structure[0].descendants[0].descendants.push(newRow);
          });
          save(newPrefab);
        }}
      />
    </>
  );
};

export default makePrefab('Column Layout', attr, beforeCreate, [
  Row({}, [Column({}, [])]),
]);
