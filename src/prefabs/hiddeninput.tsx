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
  prefab: originalPrefab,
  save,
}: BeforeCreateArgs) => {
  const actionVariableOption = originalPrefab.structure[0].options.find(
    (o) => o.type === 'ACTION_JS_VARIABLE',
  );

  if (!actionVariableOption) {
    return <div>Prefab is missing the actionVariable component option</div>;
  }

  return (
    <CreateFormInputWizard
      supportedKinds={[
        'BOOLEAN',
        'DECIMAL',
        'INTEGER',
        'PRICE',
        'SERIAL',
        'STRING',
        'TEXT',
      ]}
      actionVariableOption={actionVariableOption.key}
      labelOptionKey="label"
      nameOptionKey="actionVariableId"
      close={close}
      prefab={originalPrefab}
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

export default prefab('Hidden Beta', attributes, beforeCreate, [
  component('Hidden Input Beta', { options, ...hooks }, []),
]);
