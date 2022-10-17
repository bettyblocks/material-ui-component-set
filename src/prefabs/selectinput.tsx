import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';
import { SelectInput } from './structures/SelectInput';

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
    (option: { type: string }) => option.type === 'ACTION_JS_VARIABLE',
  );

  return (
    <CreateFormInputWizard
      supportedKinds={['LIST', 'BELONGS_TO']}
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
  icon: Icon.SelectIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Select', attributes, beforeCreate, [
  SelectInput({
    label: 'Select',
    inputLabel: 'Select',
  }),
]);
