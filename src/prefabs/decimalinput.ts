import { Icon, prefab } from '@betty-blocks/component-sdk';
import { TextInput } from './structures/TextInput';

const attributes = {
  category: 'FORM',
  icon: Icon.DecimalInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Decimal', attributes, undefined, [
  TextInput({
    label: 'Decimal field',
    inputLabel: { value: ['Decimal'] },
    type: 'decimal',
    inputType: 'decimal',
    pattern: '^\\d+(\\.\\d{1,2})?$',
  }),
]);
