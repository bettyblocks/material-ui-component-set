import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { Subview } from './structures';

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
    PropertySelector,
    EndpointSelector,
    Footer,
    Field,
    Box,
    Text,
  },
  helpers: { setOption, cloneStructure },
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
