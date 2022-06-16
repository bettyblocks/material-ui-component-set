import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Divider } from './structures/Divider';

const attr = {
  icon: Icon.HorizontalRuleIcon,
  category: 'CONTENT',
  keywords: ['Content', 'divider', 'hr', 'hairline'],
};

export default prefab('Divider', attr, undefined, [Divider({}, [])]);
