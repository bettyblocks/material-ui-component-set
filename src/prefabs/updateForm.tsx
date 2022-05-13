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
  PrefabInteraction,
} from '@betty-blocks/component-sdk';
import { alertOptions } from './alert';

const beforeCreate = ({
  close,
  components: { CreateFormUpdateWizard },
  prefab: originalPrefab,
  prefabs,
  save,
}: BeforeCreateArgs) => {
  return (
    <CreateFormUpdateWizard
      close={close}
      prefab={originalPrefab}
      prefabs={prefabs}
      save={save}
    />
  );
};

const interactions: PrefabInteraction[] = [
  {
    type: InteractionType.Custom,
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#alertErrorId',
      sourceComponentId: '#formId',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Show',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#alertSuccessId',
      sourceComponentId: '#formId',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#alertSuccessId',
      sourceComponentId: '#formId',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#alertErrorId',
      sourceComponentId: '#formId',
    },
  },
];

const successAlertOptions = {
  ...alertOptions,
  visible: option('TOGGLE', {
    label: 'Toggle visibility',
    value: false,
    configuration: { as: 'VISIBILITY' },
  }),
  allowTitleServerResponse: option('TOGGLE', {
    label: 'Allow to overwrite by the server response',
    value: true,
  }),
  allowTextServerResponse: option('TOGGLE', {
    label: 'Allow to overwrite by the server response',
    value: true,
  }),
};

const errorAlertOptions = {
  ...alertOptions,
  visible: option('TOGGLE', {
    label: 'Toggle visibility',
    value: false,
    configuration: { as: 'VISIBILITY' },
  }),
  allowTitleServerResponse: option('TOGGLE', {
    label: 'Allow to overwrite by the server response',
    value: true,
  }),
  allowTextServerResponse: option('TOGGLE', {
    label: 'Allow to overwrite by the server response',
    value: true,
  }),
  background: option('COLOR', {
    label: 'Background color',
    value: 'Danger',
  }),
};

const attributes = {
  category: 'FORMV2',
  icon: Icon.UpdateFormIcon,
  interactions,
};

const options = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  modelId: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'modelId' } }),
};

export default prefab('Update Form Beta', attributes, beforeCreate, [
  component('Action Form Beta', { options }, [
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
  ]),
]);
