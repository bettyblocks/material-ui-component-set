import { prefab, Icon, option } from '@betty-blocks/component-sdk';
import { Text, textOptions } from './structures';

const attr = {
  icon: Icon.TitleIcon,
  category: 'CONTENT',
  keywords: [
    'Content',
    'title',
    'type',
    'typography',
    'heading',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'text',
  ],
};

const defaultOptions = { ...textOptions };

defaultOptions.fontWeight = option('CUSTOM', {
  label: 'Font weight',
  value: '300',
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

export default prefab('Title', attr, undefined, [
  Text({ options: defaultOptions }, []),
]);
