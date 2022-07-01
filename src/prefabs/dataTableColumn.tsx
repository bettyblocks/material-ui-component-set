import * as React from 'react';
import {
  Icon,
  prefab as makePrefab,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { DataTableColumn } from './structures/DataTableColumn';

const beforeCreate = ({
  components: { Content, Header, Field, Footer, PropertySelector },
  prefab,
  save,
  close,
}: BeforeCreateArgs) => {
  const [property, setProperty] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <>
      <Header
        onClose={close}
        title="New column"
        subtitle="You can choose a property for your datatable here or choose to add it later by clicking 'add without configuration'"
      />
      <Content>
        <Field label="Property">
          <PropertySelector
            onChange={(value: string) => {
              setProperty(value);
            }}
            value={property}
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

          structure.options[1] = {
            value: property,
            label: 'Property',
            key: 'property',
            type: 'PROPERTY',
          };
          save(newPrefab);
        }}
        onSkip={() => {
          const newPrefab = { ...prefab };
          save(newPrefab);
        }}
        onClose={close}
      />
    </>
  );
};
const attrs = {
  icon: Icon.DataTableColumn,
  category: 'DATA',
  keywords: ['Data', 'table', 'column', 'datatablecolumn'],
};

export default makePrefab('DataTable Column (TS)', attrs, beforeCreate, [
  DataTableColumn({}),
]);
