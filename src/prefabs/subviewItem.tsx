import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';

import { SubviewItem } from './structures';

const attr = {
  icon: Icon.SubViewItemIcon,
  category: 'LIST',
  keywords: ['List', 'item', 'listitem'],
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
  },
  helpers: { setOption },
}: BeforeCreateArgs) => {
  const [propertyId, setPropertyId] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [endpoint, setEndpoint] = React.useState('');

  return (
    <>
      <Header onClose={close} title="Configure subview item" />

      <Content>
        <Box pad={{ bottom: '15px' }}>
          <Field label="Select property">
            <PropertySelector
              allowRelations
              onChange={(value: string) => {
                setPropertyId(value);
              }}
              value={propertyId}
              disabledKinds={[
                'AUTO_INCREMENT',
                'BOOLEAN_EXPRESSION',
                'COUNT',
                'DATE',
                'DATE_EXPRESSION',
                'DATE_TIME',
                'DATE_TIME_EXPRESSION',
                'DECIMAL',
                'DECIMAL_EXPRESSION',
                'EMAIL',
                'EMAIL_ADDRESS',
                'ENUM',
                'FILE',
                'FLOAT',
                'IBAN',
                'IMAGE',
                'INTEGER',
                'INTEGER_EXPRESSION',
                'LIST',
                'MINUTES',
                'MINUTES_EXPRESSION',
                'MULTI_FILE',
                'MULTI_IMAGE',
                'PASSWORD',
                'PDF',
                'PERIODIC_COUNT',
                'PHONE_NUMBER',
                'PRICE',
                'PRICE_EXPRESSION',
                'RICH_TEXT',
                'SERIAL',
                'SIGNED_PDF',
                'STRING',
                'STRING_EXPRESSION',
                'SUM',
                'TEXT',
                'TEXT_EXPRESSION',
                'TIME',
                'URL',
                'ZIPCODE',
                'BOOLEAN',
              ]}
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
          const structure = newPrefab.structure[0];

          if (structure.type !== 'COMPONENT') {
            setErrorMessage(
              `expected component prefab, found ${structure.type}`,
            );
            throw new Error(errorMessage);
          }

          setOption(structure, 'prop', (originalOption) => {
            return {
              ...originalOption,
              value: propertyId,
            };
          });

          setOption(structure, 'linkTo', (originalOption) => {
            return {
              ...originalOption,
              value: endpoint,
            };
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

export default makePrefab('Subview item', attr, beforeCreate, [
  SubviewItem({}, []),
]);
