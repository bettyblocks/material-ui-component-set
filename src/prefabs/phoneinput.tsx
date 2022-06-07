import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';

import { TextInput } from './structures/TextInput';

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

  if (!actionVariableOption) {
    return <div>Prefab is missing the actionVariable component option</div>;
  }

  return (
    <CreateFormInputWizard
      supportedKinds={['PHONE_NUMBER']}
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
  icon: Icon.PhoneInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Phone Beta', attributes, beforeCreate, [
  TextInput({
    label: 'Phone input Beta',
    inputLabel: 'Phone',
    type: 'tel',
  }),
]);
