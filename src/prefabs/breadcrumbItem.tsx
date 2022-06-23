import { Icon, prefab } from '@betty-blocks/component-sdk';
import { BreadcrumbItem } from './structures/BreadcrumbItem';

const attr = {
  icon: Icon.BreadcrumbIcon,
  category: 'NAVIGATION',
  keywords: ['Navigation', 'bread', 'crumb', 'item', 'breadcrumbitem'],
};

export default prefab('Breadcrumb Item', attr, undefined, [
  BreadcrumbItem({}, []),
]);
