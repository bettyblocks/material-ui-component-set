import { prefab, Icon, font } from '@betty-blocks/component-sdk';
import { Text } from './structures/Text';
import { textOptions } from './structures/Text/options';

const attr = {
  icon: Icon.ParagraphIcon,
  category: 'CONTENT',
  keywords: ['Content', 'text', 'type', 'typography', 'body', 'paragraph'],
};

export default prefab('Text', attr, undefined, [
  Text(
    {
      options: {
        ...textOptions,
        type: font('Text style', {
          ...textOptions.type('type'),
          value: ['Body1'],
        }),
      },
    },
    [],
  ),
]);
