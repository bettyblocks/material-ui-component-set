import { Icon, prefab } from '@betty-blocks/component-sdk';
import { DecimalInput } from './structures/DecimalInput';

const attributes = {
  category: 'FORM',
  icon: Icon.DecimalInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Decimal', attributes, undefined, [
  DecimalInput({
    label: 'Decimal field',
    inputLabel: { value: ['Decimal'] },
    type: 'decimal',
    inputType: 'decimal',
  }),
]);
