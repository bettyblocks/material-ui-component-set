import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';

import { TextArea } from './structures/TextArea';

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
      supportedKinds={['TEXT', 'URL', 'IBAN', 'STRING']}
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
  icon: Icon.TextareaIcon,
  keywords: ['Form', 'input'],
};

const pattern = '[A-Za-z0-9\\.,;:!?()%&-\'\"\/ ]+$';

export default prefab('Text Area Beta', attributes, beforeCreate, [
  TextArea({ label: 'Textarea', type: 'text', pattern }),
]);
