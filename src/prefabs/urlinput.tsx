import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';

import { TextInput } from './structures/TextInput';

const beforeCreate = ({
  close,
  components: { CreateFormInputWizard },
  prefab: originalPrefab,
  save,
}: BeforeCreateArgs) => {
  // TODO: remove this code
  const structure = originalPrefab.structure[0];
  if (structure.type !== 'COMPONENT')
    return <div>expected component prefab, found {structure.type}</div>;
  const actionVariableOption = structure.options.find(
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
      prefab={originalPrefab}
      save={save}
    />
  );
};

const attributes = {
  category: 'FORM',
  icon: Icon.UrlInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Url', attributes, beforeCreate, [
  TextInput({
    label: 'Url input',
    inputLabel: 'url',
    type: 'url',
  }),
]);
