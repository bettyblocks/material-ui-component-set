import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';

import { PriceInput } from './structures/PriceInput';

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
      supportedKinds={['NUMBER', 'PRICE']}
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
  icon: Icon.PriceInputIcon,
  keywords: ['Form', 'input'],
};

const pattern = '[0-9]+(\\.[0-9][0-9]?)?';

export default prefab('Price Beta', attributes, beforeCreate, [
  PriceInput({ label: 'Price', type: 'decimal', pattern }),
]);
