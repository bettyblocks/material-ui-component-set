import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Column, Row } from './structures';

const attrs = {
  icon: Icon.RowColumnIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', '1'],
};

export default prefab('1 Column', attrs, undefined, [Row({}, [Column({})])]);
