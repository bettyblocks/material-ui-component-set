import * as React from 'react';

import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';

import { ActionJSButton } from './structures';

const attributes = {
  category: 'BUTTON',
  icon: Icon.ButtonIcon,
  keywords: ['Button', 'Action', 'input'],
};

const beforeCreate = ({
  close,
  components: {
    ActionJSSelector,
    Content,
    Field,
    Footer,
    Header,
    PropertySelector,
  },
  prefab: originalPrefab,
  save,
  helpers,
}: BeforeCreateArgs) => {
  const [actionId, setActionId] = React.useState('');
  const [propertyId, setPropertyId] = React.useState('');
  const { setOption } = helpers;

  const structure = originalPrefab.structure[0];
  if (structure.type !== 'COMPONENT')
    return <div>expected component prefab, found {structure.type}</div>;

  const handleActionChange = (actionId: string): void => {
    setActionId(actionId);
  };

  const handlePropertyChange = (propertyId: string): void => {
    setPropertyId(propertyId);
  };

  return (
    <>
      <Header onClose={close} title="Configure action button" />
      <Content>
        <Field label="Action">
          <ActionJSSelector
            label="Select Action"
            newActionHandler={handleActionChange}
            onChange={handleActionChange}
            size="large"
            value={actionId}
          />
        </Field>
        <Field label="Property">
          <PropertySelector
            label="Select Property"
            onChange={handlePropertyChange}
            size="large"
            value={propertyId}
          />
        </Field>
      </Content>
      <Footer
        onClose={close}
        canSave={actionId}
        onSave={async (): Promise<void> => {
          const newPrefab = { ...originalPrefab };
          if (newPrefab.structure[0].type !== 'COMPONENT') {
            throw new Error('expected Component');
          }

          setOption(newPrefab.structure[0], 'actionId', (options) => ({
            ...options,
            value: actionId,
            configuration: { disabled: false },
          }));

          setOption(newPrefab.structure[0], 'property', (options) => ({
            ...options,
            value: propertyId,
            configuration: { disabled: false },
          }));

          save({ ...originalPrefab, structure: [newPrefab.structure[0]] });
        }}
      />
    </>
  );
};

export default prefab('Action Button', attributes, beforeCreate, [
  ActionJSButton({}),
]);
