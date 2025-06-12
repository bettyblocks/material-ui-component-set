import { Icon, prefab } from '@betty-blocks/component-sdk';
import { DecimalInput } from './structures';

const attributes = {
  category: 'FORM',
  icon: Icon.NumberInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Number', attributes, undefined, [
  DecimalInput({
    label: 'Number field',
    inputLabel: 'Number',
    inputType: 'number',
    type: 'number',
  }),
]);
