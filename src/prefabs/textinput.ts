import { Icon, prefab } from '@betty-blocks/component-sdk';
import { TextInput } from './structures/TextInput';

const attributes = {
  category: 'FORM',
  icon: Icon.TextInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Text Field', attributes, undefined, [
  TextInput({
    inputLabel: 'Text field',
    inputType: 'text',
    type: 'text',
  }),
]);
