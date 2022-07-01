import { Icon, prefab } from '@betty-blocks/component-sdk';
import { DataList } from './structures/DataList';

const attrs = {
  icon: Icon.DataList,
  category: 'DATA',
  keywords: ['Data', 'list', 'datalist', 'collection'],
};

export default prefab('Datalist (TS)', attrs, undefined, [DataList({})]);
