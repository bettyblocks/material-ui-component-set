import * as React from 'react';
import {
  component,
  option,
  prefab,
  model,
  filter,
} from '@betty-blocks/component-sdk';

const beforeCreate = ({
  close,
  components: { CreateFormWizard },
  prefab,
  prefabs,
  save,
}) => {
  return (
    <CreateFormWizard
      close={close}
      prefab={prefab}
      prefabs={prefabs}
      save={save}
    />
  );
};

const attributes = {
  category: 'FORM',
  icon: 'CreateFormIcon',
};

const options = {
  actionId: option('CUSTOM', { label: 'Action', value: '' }),
  modelId: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'modelId' } }),
};

export default prefab('Form', attributes, beforeCreate, [
  component('Form', { options }, []),
]);
