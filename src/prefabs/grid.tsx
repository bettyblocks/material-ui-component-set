import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Grid } from './structures';

const attrs = {
  icon: Icon.GridIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'grid'],
};

export default prefab('Grid', attrs, undefined, [Grid({})]);
