import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Conditional } from './structures/Conditional';

const attr = {
  icon: Icon.ConditionalIcon,
  category: 'LOGIC',
  keywords: ['Logic', 'conditional'],
};

export default prefab('Conditional', attr, undefined, [Conditional({}, [])]);
