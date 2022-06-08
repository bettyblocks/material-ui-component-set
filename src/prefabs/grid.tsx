import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Grid } from './structures/Grid';

const attrs = {
  icon: Icon.GridIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'grid'],
};

export default prefab('Grid (TS)', attrs, undefined, [Grid({})]);
