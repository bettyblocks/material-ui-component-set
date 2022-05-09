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
  prefab: originalPrefab,
  save,
}: BeforeCreateArgs) => {
  // TODO: remove this code
  const actionVariableOption = originalPrefab.structure[0].options.find(
    (option: { type: string }) => option.type === 'ACTION_JS_VARIABLE',
  );

  // TODO: remove this code
  if (!actionVariableOption) {
    return <div>Prefab is missing the actionVariable component option</div>;
  }

  return (
    <CreateFormInputWizard
      supportedKinds={['TIME']}
      actionVariableType="STRING"
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
  category: 'FORMV2',
  icon: Icon.TimePickerIcon,
  keywords: ['Form', 'input'],
};

export default makePrefab('TimePicker Beta', attributes, beforeCreate, [
  DateTimePicker({ dataComponentAttribute: 'Time Input', inputType: 'time' }),
]);
