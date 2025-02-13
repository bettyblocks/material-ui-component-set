import { Icon, prefab } from '@betty-blocks/component-sdk';
import { RichTextInput } from './structures/RichTextInput';

const attributes = {
  category: 'FORM',
  icon: Icon.RichTextEditorIcon,
  keywords: ['Form', 'input', 'rich text', 'rich', 'text', 'editor'],
};

export default prefab('Rich Text Editor', attributes, undefined, [
  RichTextInput({
    inputLabel: 'Rich text editor',
    inputType: 'richText',
    type: 'text',
  }),
]);
