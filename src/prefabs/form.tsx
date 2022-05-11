import * as React from 'react';
import {
  component,
  option,
  prefab,
  model,
  filter,
  BeforeCreateArgs,
  Icon,
} from '@betty-blocks/component-sdk';
import { alertOptions } from './alert';
import { boxOptions } from './box';

const beforeCreate = ({
  close,
  components: { CreateFormWizard },
  prefab: originalPrefab,
  prefabs,
  save,
}: BeforeCreateArgs) => {
  return (
    <CreateFormWizard
      close={close}
      prefab={originalPrefab}
      prefabs={prefabs}
      save={save}
    />
  );
};

const attributes = {
  category: 'FORMV2',
  icon: Icon.FormIcon,
};

const successAlertOptions = {
  ...alertOptions,
  allowTextServerResponse: option('TOGGLE', {
    label: 'Allow to overwrite by the server response',
    value: true,
  }),
}

const errorAlertOptions = {
  ...alertOptions,
  allowTextServerResponse: option('TOGGLE', {
    label: 'Allow to overwrite by the server response',
    value: true,
  }),
  background: option('COLOR', {
    label: 'Background color',
    value: 'Danger',
  }),
}

const options = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  modelId: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'modelId' } }),
};

export default prefab('Form Beta', attributes, beforeCreate, [
  component('Box', { options: boxOptions }, [
    component('Alert', { options: successAlertOptions}, []),
    component('Alert', { options: errorAlertOptions}, []),
    component('Action Form Beta', { options }, []),
  ]),
]);
