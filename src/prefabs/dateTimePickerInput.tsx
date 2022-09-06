import * as React from 'react';
import {
  BeforeCreateArgs,
  Icon,
  prefab as makePrefab,
} from '@betty-blocks/component-sdk';
import { DateTimePicker } from './structures/DateTimePicker';

const beforeCreate = ({
  close,
  components: { CreateFormInputWizard },
  prefab,
  save,
}: BeforeCreateArgs) => {
  const structure = prefab.structure[0];

  if (structure.type !== 'COMPONENT')
    return <div>expected component prefab, found {structure.type}</div>;

  // TODO: remove this code
  const actionVariableOption = structure.options.find(
    (option: { type: string }) => option.type === 'ACTION_JS_VARIABLE',
  );

  return (
    <CreateFormInputWizard
      supportedKinds={['DATE_TIME']}
      actionVariableType="STRING"
      actionVariableOption={actionVariableOption?.key || null}
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
  icon: Icon.DateTimePickerIcon,
  keywords: ['Form', 'input'],
};

export default makePrefab('DateTimePicker Beta', attributes, beforeCreate, [
  DateTimePicker({
    label: 'Datetime picker Beta',
    dataComponentAttribute: 'DateTime Input',
    inputType: 'datetime',
  }),
]);
