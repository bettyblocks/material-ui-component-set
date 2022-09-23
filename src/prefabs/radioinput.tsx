import * as React from 'react';
// @typescript-eslint/no-shadow
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';
import { RadioInput } from './structures/RadioInput';

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
  category: 'FORMV2',
  icon: Icon.RadioButtonIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Radio Beta', attributes, beforeCreate, [
  RadioInput({
    label: 'Radio',
  }),
]);
