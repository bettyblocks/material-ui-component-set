import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';

import { TextArea } from './structures/TextArea';

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
      supportedKinds={['TEXT', 'URL', 'IBAN', 'STRING']}
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
  icon: Icon.TextareaIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Text Area', attributes, beforeCreate, [
  TextArea({
    label: 'Multiline text field',
    inputLabel: 'Textarea',
    type: 'text',
  }),
]);
