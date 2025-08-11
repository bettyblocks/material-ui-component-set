import { Icon, prefab as makePrefab } from '@betty-blocks/component-sdk';
import { DateTimePicker } from './structures/DateTimePicker';

const attributes = {
  category: 'FORM',
  icon: Icon.DateTimePickerIcon,
  keywords: ['Form', 'input'],
};

export default makePrefab('Date Time Picker', attributes, undefined, [
  DateTimePicker({
    label: 'Datetime picker',
    inputLabel: 'Date and time',
    dataComponentAttribute: 'DateTime Input',
    inputType: 'datetime',
  }),
]);
