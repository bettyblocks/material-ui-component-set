import { Icon, prefab } from '@betty-blocks/component-sdk';
import { BreadcrumbItem } from './structures/BreadcrumbItem';
import { Breadcrumbs } from './structures/Breadcrumbs';

const attr = {
  icon: Icon.BreadcrumbIcon,
  category: 'NAVIGATION',
  keywords: ['Navigation', 'bread', 'crumb', 'item', 'breadcrumbitem'],
};

export default prefab('Breadcrumbs', attr, undefined, [
  Breadcrumbs({}, [BreadcrumbItem({}, []), BreadcrumbItem({}, [])]),
]);
