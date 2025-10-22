import { Icon, prefab } from '@betty-blocks/component-sdk';
import { DecimalInput } from './structures/DecimalInput';

const attributes = {
  category: 'FORM',
  icon: Icon.DecimalInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('DecimalInput', attributes, undefined, [
  DecimalInput({
    label: 'Decimal field',
    inputLabel: 'Decimal',
    type: 'decimal',
    inputType: 'decimal',
  }),
]);
