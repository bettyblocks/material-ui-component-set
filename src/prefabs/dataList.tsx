import { Icon, prefab } from '@betty-blocks/component-sdk';
import { DataList } from './structures';

const attrs = {
  icon: Icon.DataList,
  category: 'DATA',
  keywords: ['Data', 'list', 'datalist', 'collection'],
};

export default prefab('Data list', attrs, undefined, [DataList({})]);
