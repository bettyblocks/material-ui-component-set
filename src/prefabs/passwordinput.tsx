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
      supportedKinds={['PASSWORD']}
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
  icon: Icon.PasswordInputIcon,
  keywords: ['Form', 'input'],
};

const pattern = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}';

export default prefab('Password Beta', attributes, beforeCreate, [
  TextInput({
    label: 'Password field Beta',
    inputLabel: 'Password',
    type: 'password',
    pattern,
    adornmentIcon: 'VisibilityOff',
    dataComponentAttribute: 'PasswordInput',
  }),
]);
