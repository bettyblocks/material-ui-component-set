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
  category: 'FORM',
  icon: Icon.DateTimePickerIcon,
  keywords: ['Form', 'input'],
};

export default makePrefab('Date Time Picker', attributes, beforeCreate, [
  DateTimePicker({
    label: 'Datetime picker',
    inputLabel: 'Datetime',
    dataComponentAttribute: 'DateTime Input',
    inputType: 'datetime',
  }),
]);
