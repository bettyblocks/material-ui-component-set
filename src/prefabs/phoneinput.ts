import { Icon, prefab } from '@betty-blocks/component-sdk';

import { TextInput } from './structures/TextInput';

const attributes = {
  category: 'FORM',
  icon: Icon.PhoneInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Phone', attributes, undefined, [
  TextInput({
    label: 'Phone field',
    inputLabel: { value: ['Phone number'] },
    inputType: 'phone',
    type: 'tel',
  }),
]);
