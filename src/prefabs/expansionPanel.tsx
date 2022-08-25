import { Icon, prefab } from '@betty-blocks/component-sdk';
import { ExpansionPanel } from './structures';

const attrs = {
  icon: Icon.AccordionItemIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'panel', 'expansion', 'expansionpanel', 'collapse'],
};

export default prefab('Expansion Panel', attrs, undefined, [
  ExpansionPanel({}, []),
]);
