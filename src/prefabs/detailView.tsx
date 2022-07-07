import * as React from 'react';
import {
  Icon,
  prefab as makePrefab,
  BeforeCreateArgs,
  ValueDefault,
  sizes,
  color,
  ThemeColor,
  showIf,
  PrefabReference,
} from '@betty-blocks/component-sdk';
import { Box } from './structures/Box';
import { options as boxOptions } from './structures/Box/options';
import { Column } from './structures/Column';
import { options as columnOptions } from './structures/Column/options';
import { DataContainer } from './structures/DataContainer';
import { DetailViewChild } from './structures/DetailViewChild';
import { Row } from './structures/Row';
import { options as rowOptions } from './structures/Row/options';

const beforeCreate = ({
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
  helpers: { camelToSnakeCase, useModelQuery },
  prefab,
  save,
  close,
}: BeforeCreateArgs) => {
  const [modelId, setModelId] = React.useState('');
  const [properties, setProperties] = React.useState([]);
  const [numberOfColumns, setNumberOfColumns] = React.useState('6');
  const sideBySide = false;

  const { data } = useModelQuery({
    variables: { id: modelId },
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  // const enrichVarObj = (obj: any) => {
  //   const returnObj = obj;
  //   if (data && data.model) {
  //     const property = data.model.properties.find(
  //       (prop: any) => prop.id === returnObj.id[0],
  //     );
  //     if (property) {
  //       returnObj.name = `{{ ${data.model.name}.${property.name} }}`;
  //     }
  //   }
  //   return returnObj;
  // };

  const getDescendantByRef = (refValue: string, structure: any) =>
    structure.reduce((acc: string, component: PrefabReference) => {
      if (acc) return acc;
      if (
        component.type === 'COMPONENT' &&
        // eslint-disable-next-line no-prototype-builtins
        component.ref
          ? Object.values(component.ref).indexOf(refValue) > -1
          : undefined
      ) {
        return component;
      }
      if (component.type === 'PARTIAL') {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return getDescendantByRef(refValue, component.descendants);
    }, null);

  return (
    <>
      <Header title="Configure detail view" onClose={close} />
      <Content>
        <Field label="Model">
          <ModelSelector
            onChange={(value: string) => {
              setModelId(value);
            }}
            value={modelId}
          />
        </Field>
        {sideBySide === false && (
          <Field label="Number of columns">
            <ButtonGroup
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => {
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
            onChange={(value: any) => {
              setProperties(value);
            }}
          />
        </Field>
      </Content>
      <Footer
        onSave={() => {
          const newPrefab = { ...prefab };
          const structure = newPrefab.structure[0];
          if (structure.type !== 'COMPONENT') {
            setErrorMessage(
              `expected component prefab, found ${structure.type}`,
            );
            throw new Error(errorMessage);
          }
          if (!data) {
            setErrorMessage(`There is no data available.`);
            throw new Error(errorMessage);
          }
          const variableName = `${camelToSnakeCase(data.model.label)}_id`;
          newPrefab.variables = [];
          newPrefab.variables.push({
            kind: 'integer',
            name: variableName,
            // pageId: pageUuid,
            ref: {
              id: '#idVariable',
            },
          });
          const modelOption = structure.options.find(
            (o) => o.key === 'model',
          ) as ValueDefault;
          modelOption.value = modelId;

          // TODO: for each modelProperty --> Column + DetailViewChild with said property
          if (!sideBySide) {
            // const boxStructure = getDescendantByRef(
            //   '#box',
            //   structure.descendants,
            // );
            // const detailViewStructure = getDescendantByRef(
            //   '#detailViewChild',
            //   structure.descendants,
            // );
            // const insertedData = boxStructure.descendants.pop();
            // insertedData.descendants[0].options[1].value = numberOfColumns;
            // insertedData.descendants[0].options[2].value = numberOfColumns;
            // debugger;
            // insertedData.descendants[0].descendants = [];
            // properties.forEach((property) => {
            //   // descendants.push(Column({}, [DetailViewChild({})])), but that doesn't work yet
            //   detailViewStructure.options[0].value =
            //     property.kind === 'IMAGE' ? '' : enrichVarObj(property);
            //   detailViewStructure.options[1].value =
            //     property.kind === 'IMAGE' ? [`${property.label}`] : [];

            //   insertedData.descendants[0].descendants.push(detailViewStructure);
            // });
            if (structure.descendants[0].type === 'COMPONENT') {
              // structure.descendants[0].descendants.push(insertedData);
              save(newPrefab);
            }
          }
        }}
        onClose={close}
      />
    </>
  );
};

const attrs = {
  icon: Icon.DetailViewIcon,
  category: 'DATA',
  keywords: ['detail', 'view', 'data', 'collection'],
  interactions: [],
  variables: [],
};

export default makePrefab('Detail view (TS)', attrs, beforeCreate, [
  DataContainer({}, [
    Box(
      {
        ref: { id: '#box' },
        options: {
          ...boxOptions,
          innerSpacing: sizes('Inner space', {
            value: ['0rem', '0rem', '0rem', '0rem'],
          }),
          backgroundColor: color('Background color', {
            value: ThemeColor.LIGHT,
            configuration: {
              condition: showIf('backgroundOptions', 'EQ', true),
            },
          }),
        },
      },
      [
        Row(
          {
            options: {
              ...rowOptions,
              backgroundColor: color('Background color', {
                value: ThemeColor.ACCENT_1,
              }),
            },
          },
          [
            Column(
              {
                options: {
                  ...columnOptions,
                  outerSpacing: sizes('Outer space', {
                    value: ['S', 'S', 'S', 'S'],
                  }),
                  backgroundColor: color('Background color', {
                    value: ThemeColor.WHITE,
                  }),
                },
              },
              [
                DetailViewChild(
                  {
                    ref: { id: '#detailViewChild' },
                  },
                  [],
                ),
              ],
            ),
          ],
        ),
      ],
    ),
  ]),
]);
