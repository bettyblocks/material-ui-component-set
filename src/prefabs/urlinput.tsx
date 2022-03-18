import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';

import { TextInput } from './structures/TextInput';

const beforeCreate = ({
  close,
  components: { CreateFormInputWizard },
  prefab,
  save,
}: BeforeCreateArgs) => {

  // TODO: remove this code
  const actionVariableOption = prefab.structure[0].options.find(
    (option: { type: string }) => option.type === 'ACTION_JS_VARIABLE',
  );

  // TODO: remove this code
  if (!actionVariableOption) {
    return <div>Prefab is missing the actionVariable component option</div>;
  }

  return (
    <CreateFormInputWizard
      supportedKinds={['URL']}
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
  icon: Icon.UrlInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Url v2', attributes, beforeCreate, [
  TextInput({ label: 'url', type: 'url' }),
]);
