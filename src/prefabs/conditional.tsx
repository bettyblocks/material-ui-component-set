import * as React from 'react';
import {
  Icon,
  prefab as makePrefab,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { Conditional } from './structures';

const attr = {
  icon: Icon.ConditionalIcon,
  category: 'LOGIC',
  keywords: ['Logic', 'conditional'],
};

const beforeCreate = ({
  components: {
    Content,
    Header,
    Field,
    Footer,
    PropertySelector,
    ModelSelector,
    Box,
  },
  helpers: { setOption, useModelQuery },
  prefab,
  save,
  close,
}: BeforeCreateArgs) => {
  const [propertySelector, setPropertySelector] = React.useState('');
  const [modelId, setModelId] = React.useState('');
  const [compare, setCompare] = React.useState('');
  const [right, setRight] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });

  const enrichVarObj = (obj: any) => {
    const returnObject = obj;
    if (data && data.model) {
      const property = data.model.properties.find(
        (prop: any) => prop.id === obj.id[0],
      );
      if (property) {
        returnObject.name = `{{ ${data.model.name}.${property.name} }}`;
      }
    }
    return returnObject;
  };

  return (
    <>
      <Header
        onClose={close}
        title="New column"
        subtitle="You can choose a property for your datatable here or choose to add it later by clicking 'add without configuration'"
      />
      <Content>
        <Field label="Select model">
          <ModelSelector
            onChange={(value: string) => {
              setModelId(value);
            }}
            value={modelId}
          />
        </Field>
        <Box justify="between" direction="row">
          <Field label="Property">
            <PropertySelector
              modelId={modelId}
              onChange={(value: string) => {
                setPropertySelector(value);
              }}
              value={propertySelector}
            />
          </Field>
          <Field label="Property">
            <select
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setCompare(event.target.value);
              }}
            >
              <option value="eq">Equals</option>
              <option value="neq">Not Equals</option>
              <option value="contains">Contains</option>
              <option value="notcontains">Does Not Contain</option>
              <option value="gt">Greater Than</option>
              <option value="gteq">Greater Than or Equal</option>
              <option value="lt">Less Than</option>
              <option value="lteq">Less Than or Equal</option>
            </select>
            {/* <input
              value={compare}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCompare(event.target.value);
              }}
            /> */}
          </Field>
          <Field label="Value">
            <input
              value={right}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setRight(event.target.value);
              }}
            />
          </Field>
        </Box>
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

          setOption(structure, 'left', (originalOption) => {
            return {
              ...originalOption,
              value: [enrichVarObj(propertySelector)],
            };
          });
          setOption(structure, 'compare', (originalOption) => {
            return {
              ...originalOption,
              value: compare,
            };
          });
          setOption(structure, 'right', (originalOption) => {
            return {
              ...originalOption,
              value: [right],
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

export default makePrefab('Conditional', attr, beforeCreate, [
  Conditional({}, []),
]);
