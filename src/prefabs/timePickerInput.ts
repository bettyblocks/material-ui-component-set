import { Icon, prefab as makePrefab } from '@betty-blocks/component-sdk';
import { DateTimePicker } from './structures/DateTimePicker';

const attributes = {
  category: 'FORM',
  icon: Icon.TimePickerIcon,
  keywords: ['Form', 'input'],
};

export default makePrefab('Time Picker', attributes, undefined, [
  DateTimePicker({
    label: 'Time picker',
    inputLabel: { value: ['Time'] },
    dataComponentAttribute: 'Time Input',
    inputType: 'time',
  }),
]);
