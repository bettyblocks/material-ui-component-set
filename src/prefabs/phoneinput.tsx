import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';

import { TextInput } from './structures/TextInput';

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
      supportedKinds={['PHONE_NUMBER']}
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
  icon: Icon.PhoneInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Phone v2', attributes, beforeCreate, [
  TextInput({ label: 'Phone', type: 'tel' }),
]);

