import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Column } from './structures/Column';
import { Panel } from './structures/Panel';
import { Row } from './structures/Row';

const attr = {
  icon: Icon.PanelIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'panel'],
};

export default prefab('Panel', attr, undefined, [
  Panel({}, [Row({}, [Column({}, [])])]),
]);
