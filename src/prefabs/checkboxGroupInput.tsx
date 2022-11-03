import * as React from 'react';
import { BeforeCreateArgs, prefab, Icon } from '@betty-blocks/component-sdk';
import { CheckboxGroup } from './structures/CheckboxGroup';

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

  return (
    <CreateFormInputWizard
      supportedKinds={['LIST']}
      actionVariableOption={actionVariableOption?.key || null}
      labelOptionKey="label"
      nameOptionKey="actionVariableId"
      close={close}
      prefab={originalPrefab}
      save={save}
    />
  );
};

const attributes = {
  category: 'FORM',
  icon: Icon.CheckboxGroupIcon,
};

export default prefab('Checkbox Group', attributes, beforeCreate, [
  CheckboxGroup({ label: 'Checkbox Group' }),
]);
