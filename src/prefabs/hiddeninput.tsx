import * as React from 'react';
import {
  prefab,
  component,
  option,
  variable,
  Icon,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { deleteActionVariable } from './hooks/deleteActionVariable';

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
    (o) => o.type === 'ACTION_JS_VARIABLE',
  );

  return (
    <CreateFormInputWizard
      supportedKinds={[
        'BOOLEAN',
        'DECIMAL',
        'INTEGER',
        'PRICE',
        'SERIAL',
        'STRING',
        'TEXT',
      ]}
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
  icon: Icon.HiddenInputIcon,
  keywords: ['Form', 'input', 'hidden'],
};

const options = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
  }),
  value: variable('Value'),
};

const hooks = {
  $afterDelete: [deleteActionVariable],
};

export default prefab('Hidden', attributes, beforeCreate, [
  component('Hidden Input', { options, ...hooks }, []),
]);
