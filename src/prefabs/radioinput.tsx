import * as React from 'react';
// @typescript-eslint/no-shadow
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';
import { RadioInput } from './structures/RadioInput';

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
      supportedKinds={['LIST']}
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
  icon: Icon.RadioButtonIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Radio Beta', attributes, beforeCreate, [
  RadioInput({
    label: 'Radio',
  }),
]);
