import { Icon, prefab } from '@betty-blocks/component-sdk';
import { TextInput } from './structures/TextInput';

const attributes = {
  category: 'FORM',
  icon: Icon.TextInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Text Field', attributes, undefined, [
  TextInput({
    label: 'Text field',
    inputLabel: 'Text field',
    inputType: 'text',
    type: 'text',
    dataComponentAttribute: 'TextInput',
  }),
]);
