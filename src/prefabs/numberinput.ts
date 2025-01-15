import { Icon, prefab } from '@betty-blocks/component-sdk';
import { TextInput } from './structures/TextInput';

const attributes = {
  category: 'FORM',
  icon: Icon.NumberInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Number', attributes, undefined, [
  TextInput({
    label: 'Number field',
    inputLabel: {
      value: ['Number'],
    },
    inputType: 'number',
    type: 'number',
    pattern: '^[0-9]*$',
  }),
]);
