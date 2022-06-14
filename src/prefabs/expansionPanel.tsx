import { Icon, prefab } from '@betty-blocks/component-sdk';
import { expansionPanel } from './structures/expansionPanel';

const attrs = {
  icon: Icon.AccordionItemIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'panel', 'expansion', 'expansionpanel', 'collapse'],
};

export default prefab('Expansion Panel', attrs, undefined, [
  expansionPanel({}, []),
]);
