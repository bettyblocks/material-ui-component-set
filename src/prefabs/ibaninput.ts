import { Icon, prefab } from '@betty-blocks/component-sdk';
import { TextInput } from './structures/TextInput';

const attributes = {
  category: 'FORM',
  icon: Icon.IbanInputIcon,
  keywords: ['Form', 'input'],
};

const pattern =
  '^([A-Z]{2}[ \\-]?[0-9]{2})(?=(?:[ \\-]?[A-Z0-9]){9,30}$)((?:[ \\-]?[A-Z0-9]{3,5}){2,7})([ \\-]?[A-Z0-9]{1,3})?$';

export default prefab('IBAN', attributes, undefined, [
  TextInput({
    label: 'IBAN input',
    inputLabel: { value: ['IBAN'] },
    type: 'text',
    inputType: 'iban',
    pattern,
  }),
]);
