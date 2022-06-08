import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Row } from './structures/Row';
import { Column } from './structures/Column';

const attrs = {
  icon: Icon.CardActionsIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', '1'],
};
export default prefab('2 Columns (TS)', attrs, undefined, [
  Row({}, [Column({}), Column({})]),
]);
