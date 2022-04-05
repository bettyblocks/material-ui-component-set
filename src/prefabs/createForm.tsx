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
  components: { CreateFormCreateWizard },
  prefab,
  prefabs,
  save,
}: BeforeCreateArgs) => {
  return (
    <CreateFormCreateWizard
      close={close}
      prefab={prefab}
      prefabs={prefabs}
      save={save}
    />
  );
};

const attributes = {
  category: 'FORMV2',
  icon: Icon.CreateFormIcon,
};

const options = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  modelId: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'modelId' } }),
};

export default prefab('Create Form v2', attributes, beforeCreate, [
  component('ActionJSForm', { options }, []),
]);
