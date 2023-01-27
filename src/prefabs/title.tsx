import { prefab, Icon, variable } from '@betty-blocks/component-sdk';
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

defaultOptions.dataComponentAttribute = variable('Test attribute', {
  value: ['Title'],
});

export default prefab('Title', attr, undefined, [
  Text({ label: 'Title', options: defaultOptions }, []),
]);
