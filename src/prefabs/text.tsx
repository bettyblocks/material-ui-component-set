import {
  prefab,
  Icon,
  toggle,
  font,
  option,
} from '@betty-blocks/component-sdk';
import { Text } from './structures/Text';
import { textOptions } from './structures/Text/options';

const attr = {
  icon: Icon.ParagraphIcon,
  category: 'CONTENT',
  keywords: ['Content', 'text', 'type', 'typography', 'body', 'paragraph'],
};

const options = { ...textOptions };
options.type = font('Font', { value: ['Body1'] });
options.fontWeight = option('CUSTOM', {
  label: 'Font weight',
  value: '400',
  configuration: {
    as: 'DROPDOWN',
    dataType: 'string',
    allowedInput: [
      { name: '100', value: '100' },
      { name: '200', value: '200' },
      { name: '300', value: '300' },
      { name: '400', value: '400' },
      { name: '500', value: '500' },
      { name: '600', value: '600' },
      { name: '700', value: '700' },
      { name: '800', value: '800' },
      { name: '900', value: '900' },
    ],
  },
});
options.useInnerHtml = toggle('Display Rich Text', {
  value: false,
});

export default prefab('Text', attr, undefined, [Text({ options }, [])]);
