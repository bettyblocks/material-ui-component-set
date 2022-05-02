import * as React from 'react';
import {
  component,
  option,
  prefab,
  BeforeCreateArgs,
  PrefabInteraction,
  InteractionType,
  Icon,
  model,
} from '@betty-blocks/component-sdk';

const beforeCreate = ({
  close,
  components: { CreateLoginFormWizard },
  prefab: originalPrefab,
  prefabs,
  save,
}: BeforeCreateArgs) => {
  return (
    <CreateLoginFormWizard
      close={close}
      prefab={originalPrefab}
      prefabs={prefabs}
      save={save}
    />
  );
};

const interactions: PrefabInteraction[] = [
  {
    name: 'login',
    sourceEvent: 'onActionSuccess',
    ref: {
      sourceComponentId: '#formId',
    },
    parameters: [],
    type: InteractionType.Global,
  },
];

const attributes = {
  category: 'FORMV2',
  icon: Icon.LoginFormIcon,
  interactions,
};

const options = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  modelId: model('Model'),
};

export default prefab('Login Form Beta', attributes, beforeCreate, [
  component('Action Form Beta', { options, ref: { id: '#formId' } }, []),
]);
