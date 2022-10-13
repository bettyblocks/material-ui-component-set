import * as React from 'react';
import { BeforeCreateArgs, prefab, Icon } from '@betty-blocks/component-sdk';
import { CheckboxInput } from './structures/CheckboxInput';

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
      supportedKinds={['BOOLEAN']}
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
  category: 'FORMV2',
  icon: Icon.CheckboxIcon,
};

export default prefab('Checkbox Beta', attributes, beforeCreate, [
  CheckboxInput({ label: 'Checkbox input Beta' }),
]);
