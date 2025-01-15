import { Icon, prefab } from '@betty-blocks/component-sdk';
import { TextInput } from './structures/TextInput';

const attributes = {
  category: 'FORM',
  icon: Icon.PasswordInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Password', attributes, undefined, [
  TextInput({
    label: 'Password field',
    inputLabel: { value: ['Password'] },
    type: 'password',
    inputType: 'password',
    adornmentIcon: 'VisibilityOff',
  }),
]);
