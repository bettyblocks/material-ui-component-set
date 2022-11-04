import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { Subview } from './structures';
import { Properties } from './types';

const attr = {
  icon: Icon.OrderedListIcon,
  category: 'LIST',
  keywords: ['Subview'],
};

const beforeCreate = ({
  save,
  close,
  prefab,
  components: {
    Header,
    Content,
    PropertiesSelector,
    EndpointSelector,
    Footer,
    Field,
    Box,
  },
  helpers: { setOption, cloneStructure },
}: BeforeCreateArgs) => {
  const [properties, setProperties] = React.useState<Properties[]>([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [endpoint, setEndpoint] = React.useState('');

  return (
    <>
      <Header onClose={close} title="Configure header and footer" />

      <Content>
        <Box pad={{ bottom: '15px' }}>
          <Field label="Select property">
            <PropertiesSelector
              allowRelations
              onChange={(value: Properties[]) => {
                setProperties(value);
              }}
              value={properties}
            />
          </Field>
          <Field label="Select page">
            <EndpointSelector
              value={endpoint || ''}
              size="large"
              onChange={(value: any): void => {
                setEndpoint(value);
              }}
            />
          </Field>
        </Box>
      </Content>
      <Footer
        onClick={close}
        onSave={() => {
          const newPrefab = { ...prefab };

          if (newPrefab.structure[0].type !== 'COMPONENT') {
            setErrorMessage(
              `expected component prefab, found ${newPrefab.structure[0].type}`,
            );
            throw new Error(errorMessage);
          }

          properties.forEach((prop) => {
            const subviewItem = cloneStructure('Subview item');
            if (subviewItem.type === 'COMPONENT') {
              setOption(subviewItem, 'prop', (originalOption) => {
                return {
                  ...originalOption,
                  value: prop.id,
                };
              });
            }
            if (newPrefab.structure[0].type === 'COMPONENT')
              newPrefab.structure[0].descendants.push(subviewItem);
          });

          save(newPrefab);
        }}
        onSkip={() => {
          const newPrefab = { ...prefab };
          save(newPrefab);
        }}
      />
    </>
  );
};

export default makePrefab('Subview', attr, beforeCreate, [Subview({}, [])]);
