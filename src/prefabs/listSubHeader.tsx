import { prefab, Icon } from '@betty-blocks/component-sdk';
import { ListSubHeader } from './structures';

const attr = {
  icon: Icon.OrderedListIcon,
  category: 'LIST',
  keywords: ['List', 'sub', 'header', 'subheader', 'listsubheader'],
};

export default prefab('List subheader', attr, undefined, [
  ListSubHeader({}, []),
]);
