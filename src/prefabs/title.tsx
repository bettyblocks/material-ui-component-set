import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Text } from './structures/Text';

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

export default prefab('Title (TS)', attr, undefined, [Text({}, [])]);
