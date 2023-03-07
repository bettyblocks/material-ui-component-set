import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { Subview } from './structures';

const attr = {
  icon: Icon.SubViewIcon,
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
    PropertySelector,
    EndpointSelector,
    Footer,
    Field,
    Box,
    Text,
  },
  helpers: { setOption, cloneStructure, createBlacklist },
}: BeforeCreateArgs) => {
  const [property, setProperty] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [endpoint, setEndpoint] = React.useState('');

  return (
    <>
      <Header onClose={close} title="Configure subview" />
      <Content>
        <Box pad={{ bottom: '15px' }}>
          <Box pad={{ bottom: '15px' }}>
            <Text color="grey700">
              You can add more items by adding the subview item component to the
              subview
            </Text>
          </Box>
          <Field label="Select relation">
            <PropertySelector
              allowRelations
              onChange={(value: string) => {
                setProperty(value);
              }}
              value={property}
              disabledKinds={createBlacklist([
                'BELONGS_TO',
                'HAS_AND_BELONGS_TO_MANY',
                'HAS_MANY',
                'HAS_ONE',
              ])}
            />
          </Field>
          <Field label="Select subview page">
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

          const subviewItem = cloneStructure('Subview item');
          if (subviewItem.type === 'COMPONENT' && property) {
            setOption(subviewItem, 'prop', (originalOption) => {
              return {
                ...originalOption,
                value: property,
              };
            });
            setOption(subviewItem, 'linkTo', (originalOption) => {
              return {
                ...originalOption,
                value: endpoint,
              };
            });
          }
          if (newPrefab.structure[0].type === 'COMPONENT')
            newPrefab.structure[0].descendants.push(subviewItem);

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
