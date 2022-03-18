import * as React from 'react';
import {
  component,
  option,
  prefab,
  BeforeCreateArgs,
  PrefabInteraction,
  InteractionType,
  Icon,
} from '@betty-blocks/component-sdk';

const beforeCreate = ({
  close,
  components: { CreateLoginFormWizard },
  prefab,
  prefabs,
  save,
}: BeforeCreateArgs) => {
  return (
    <CreateLoginFormWizard
      close={close}
      prefab={prefab}
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
};

export default prefab('Login Form v2', attributes, beforeCreate, [
  component('ActionJSForm', { options, ref: { id: '#formId' } }, []),
]);
