import { Icon, prefab } from '@betty-blocks/component-sdk';
import { expansionPanel } from './structures/expansionPanel';

const attrs = {
  icon: Icon.AccordionIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'panel', 'expansion', 'expansionpanel', 'collapse'],
};

export default prefab('Expansion Panel (TS)', attrs, undefined, [
  expansionPanel({}, []),
]);
