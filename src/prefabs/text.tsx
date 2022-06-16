import { prefab, Icon, toggle, font } from '@betty-blocks/component-sdk';
import { Text } from './structures/Text';
import { options as baseOptions } from './structures/Text/options';

const attr = {
  icon: Icon.TitleIcon,
  category: 'CONTENT',
  keywords: ['Content', 'text', 'type', 'typography', 'body', 'paragraph'],
};

const options = { ...baseOptions };
options.type = font('Font', { value: ['Body1'] });
options.useInnerHtml = toggle('Display Rich Text', {
  value: false,
});

export default prefab('Text', attr, undefined, [Text({ options }, [])]);
