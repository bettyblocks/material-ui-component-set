import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Column, Panel, Row } from './structures';

const attr = {
  icon: Icon.PanelIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'panel'],
};

export default prefab('Panel', attr, undefined, [
  Panel({}, [Row({}, [Column({}, [])])]),
]);
