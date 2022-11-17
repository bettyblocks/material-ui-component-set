import * as React from 'react';
import {
  Icon,
  prefab as makePrefab,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { DataTableColumn } from './structures';

const beforeCreate = ({
  components: { Content, Header, Field, Footer, PropertySelector },
  helpers: { setOption },
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

          setOption(structure, 'property', (originalOption) => {
            return {
              ...originalOption,
              value: property,
            };
          });

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

export default makePrefab('Datatable Column', attrs, beforeCreate, [
  DataTableColumn({}),
]);
