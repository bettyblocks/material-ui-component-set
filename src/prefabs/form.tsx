import * as React from 'react';
import {
  component,
  option,
  prefab,
  model,
  filter,
  BeforeCreateArgs,
  Icon,
  InteractionType,
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

const interactions = [
  {
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#alertErrorId',
      sourceComponentId: '#formId',
    },
    type: InteractionType.Custom,
    parameters: [],
  },
  {
    name: 'Show',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#alertSuccessId',
      sourceComponentId: '#formId',
    },
    type: InteractionType.Custom,
    parameters: [],
  },
  {
    name: 'Hide',
    sourceEvent: 'onSubmit',
    ref: {
      targetComponentId: '#alertErrorId',
      sourceComponentId: '#formId',
    },
    type: InteractionType.Custom,
    parameters: [],
  },
];

const attributes = {
  category: 'FORMV2',
  icon: Icon.FormIcon,
  interactions,
};

const successAlertOptions = {
  ...alertOptions,
  allowTextServerResponse: option('TOGGLE', {
    label: 'Allow to overwrite by the server response',
    value: true,
  }),
};

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
};

const options = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  modelId: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'modelId' } }),
};

export default prefab('Form Beta', attributes, beforeCreate, [
  component('Box', { options: boxOptions }, [
    component(
      'Alert',
      { ref: { id: '#alertSuccessId' }, options: successAlertOptions },
      [],
    ),
    component(
      'Alert',
      { ref: { id: '#alertErrorId' }, options: errorAlertOptions },
      [],
    ),
    component('Action Form Beta', { ref: { id: '#formId' }, options }, []),
  ]),
]);
