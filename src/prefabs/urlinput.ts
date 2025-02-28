import { Icon, prefab } from '@betty-blocks/component-sdk';

import { TextInput } from './structures/TextInput';

const attributes = {
  category: 'FORM',
  icon: Icon.UrlInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Url', attributes, undefined, [
  TextInput({
    label: 'Url input',
    inputLabel: 'URL',
    inputType: 'url',
    type: 'url',
  }),
]);
