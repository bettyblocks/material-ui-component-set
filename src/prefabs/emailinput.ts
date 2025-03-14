import { Icon, prefab } from '@betty-blocks/component-sdk';
import { TextInput } from './structures/TextInput';

const attributes = {
  category: 'FORM',
  icon: Icon.EmailInputIcon,
  keywords: ['Form', 'input'],
};

const pattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-z]{2,63}$';

export default prefab('Email', attributes, undefined, [
  TextInput({
    label: 'Email field',
    inputLabel: 'Email',
    type: 'email',
    inputType: 'email',
    pattern,
    adornmentIcon: 'Email',
  }),
]);
