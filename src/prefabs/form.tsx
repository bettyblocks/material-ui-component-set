import * as React from 'react';
import {
  component,
  option,
  prefab,
  model,
  filter,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { Icon } from '@betty-blocks/component-sdk';

const beforeCreate = ({
  close,
  components: { CreateFormWizard },
  prefab,
  prefabs,
  save,
}: BeforeCreateArgs) => {
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
  icon: Icon.CreateFormIcon,
};

const options = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  modelId: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'modelId' } }),
};

export default prefab('CreateForm', attributes, beforeCreate, [
  component('Form', { options }, []),
]);
