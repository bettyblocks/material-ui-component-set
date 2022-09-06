import * as React from 'react';
import {
  prefab,
  component,
  option,
  variable,
  Icon,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';

const beforeCreate = ({
  close,
  components: { CreateFormInputWizard },
  prefab: originalPrefab,
  save,
}: BeforeCreateArgs) => {
  const structure = originalPrefab.structure[0];

  if (structure.type !== 'COMPONENT')
    return <div>expected component prefab, found {structure.type}</div>;

  const actionVariableOption = structure.options.find(
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
  value: variable('Value'),
};

const hooks = { };

export default prefab('Hidden Beta', attributes, beforeCreate, [
  component('Hidden Input Beta', { options, ...hooks }, []),
]);
