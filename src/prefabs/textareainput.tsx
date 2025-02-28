import { Icon, prefab } from '@betty-blocks/component-sdk';

import { TextArea } from './structures/TextArea';

const attributes = {
  category: 'FORM',
  icon: Icon.TextareaIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Text Area', attributes, undefined, [
  TextArea({
    label: 'Multiline text field',
    inputLabel: 'Text area',
    type: 'text',
  }),
]);
