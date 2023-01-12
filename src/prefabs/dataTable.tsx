import * as React from 'react';
import {
  Icon,
  prefab as makePrefab,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { DataTable } from './structures';

const attrs = {
  icon: Icon.DataTable,
  category: 'DATA',
  keywords: ['Data', 'table', 'datatable', 'collection', 'Data table'],
};

const beforeCreate = ({
  components: {
    Content,
    Header,
    Field,
    Footer,
    ModelRelationSelector,
    PropertiesSelector,
  },
  helpers: { cloneStructure, setOption },
  prefab,
  save,
  close,
}: BeforeCreateArgs) => {
  const [modelId, setModelId] = React.useState('');
  const [properties, setProperties] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <>
      <Header title="Configure data table" onClose={close} />
      <Content>
        <Field label="Model">
          <ModelRelationSelector
            onChange={(value: string) => {
              setModelId(value);
            }}
            value={modelId}
          />
        </Field>
        <Field label="Columns">
          <PropertiesSelector
            modelId={modelId}
            value={properties}
            onChange={(value: []) => {
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
          structure.options[2] = {
            value: modelId,
            label: 'Model',
            key: 'model',
            type: 'MODEL_AND_RELATION',
          };
          properties.forEach(
            (propertyObject: {
              defaultValue: null;
              id: string[];
              kind: string;
              label: string;
              type: string;
              format: string;
            }) => {
              let newProperty = propertyObject;
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
              if (inheritFormatKinds.includes(propertyObject.kind)) {
                newProperty = {
                  ...propertyObject,
                  format: 'INHERIT',
                };
              }

              const dataTableColumnStructure =
                cloneStructure('Datatable Column');
              if (dataTableColumnStructure.type !== 'COMPONENT') {
                setErrorMessage(
                  `expected component prefab, found ${dataTableColumnStructure.type}`,
                );
                throw new Error(errorMessage);
              }

              setOption(
                dataTableColumnStructure,
                'property',
                (originalOption) => {
                  return {
                    ...originalOption,
                    value: newProperty,
                  };
                },
              );
              structure.descendants.push(dataTableColumnStructure);
            },
          );
          save(newPrefab);
        }}
        onClose={close}
      />
    </>
  );
};

export default makePrefab('Datatable', attrs, beforeCreate, [DataTable({})]);
