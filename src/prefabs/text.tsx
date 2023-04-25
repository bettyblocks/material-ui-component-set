import { prefab, Icon, font } from '@betty-blocks/component-sdk';
import { Text } from './structures/Text';
import { textOptions } from './structures/Text/options';

const attr = {
  icon: Icon.ParagraphIcon,
  category: 'CONTENT',
  keywords: ['Content', 'text', 'type', 'typography', 'body', 'paragraph'],
};

const options = { ...textOptions };
options.type = font('Text style', { value: ['Body1'] });

export default prefab('Text', attr, undefined, [Text({ options }, [])]);
