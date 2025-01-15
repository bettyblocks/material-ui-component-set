import { Icon, prefab as makePrefab } from '@betty-blocks/component-sdk';
import { DateTimePicker } from './structures/DateTimePicker';

const attributes = {
  category: 'FORM',
  icon: Icon.DatePickerIcon,
  keywords: ['Form', 'input'],
};

export default makePrefab('Date Picker', attributes, undefined, [
  DateTimePicker({
    label: 'Date picker',
    inputLabel: { value: ['Date'] },
    dataComponentAttribute: 'Date Input',
    inputType: 'date',
  }),
]);
