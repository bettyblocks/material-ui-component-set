import { Icon, prefab } from '@betty-blocks/component-sdk';

import { SubmitButton } from './structures/SubmitButton';

const attributes = {
  category: 'FORM',
  icon: Icon.SubmitButtonIcon,
  keywords: ['Form', 'input', 'submit', 'button', 'submitbutton'],
};

export default prefab('Submit Button', attributes, undefined, [
  SubmitButton({}),
]);
