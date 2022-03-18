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
      supportedKinds={['IBAN']}
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
  icon: Icon.IbanInputIcon,
  keywords: ['Form', 'input'],
};

const pattern =
  '^([A-Z]{2}[ \\-]?[0-9]{2})(?=(?:[ \\-]?[A-Z0-9]){9,30}$)((?:[ \\-]?[A-Z0-9]{3,5}){2,7})([ \\-]?[A-Z0-9]{1,3})?$';

export default prefab('IBAN v2', attributes, beforeCreate, [
  TextInput({ label: 'IBAN', type: 'text', pattern }),
]);
