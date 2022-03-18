import * as React from 'react';
import {
  prefab,
  component,
  option,
  property,
  Icon,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';

import { deleteActionVariable } from './hooks/deleteActionVariable';

const beforeCreate = ({
  close,
  components: { CreateFormInputWizard },
  prefab,
  save,
}: BeforeCreateArgs) => {
  const actionVariableOption = prefab.structure[0].options.find(
    (option: { type: string }) => option.type === 'ACTION_JS_VARIABLE',
  );

  if (!actionVariableOption) {
    return <div>Prefab is missing the actionVariable component option</div>;
  }

  return (
    <CreateFormInputWizard
      actionVariableOption={actionVariableOption.key}
      labelOptionKey="label"
      nameOptionKey="actionVariableId"
      close={close}
      prefab={prefab}
      save={save}
    />
  );
};

const attributes = {
  category: 'FORMV2',
  icon: Icon.HiddenInputIcon,
};

const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', { label: 'Name', value: '' }),
  value: property('Value'),
};

const hooks = {
  $afterDelete: [deleteActionVariable],
};

export default prefab('Hidden v2', attributes, beforeCreate, [
  component('HiddenInput', { options, ...hooks }, []),
]);
