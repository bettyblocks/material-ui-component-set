import { prefab, Icon } from '@betty-blocks/component-sdk';
import { FilterComponent } from './structures';

const attributes = {
  category: 'LAYOUT',
  icon: Icon.ContainerIcon,
  keywords: ['Layout', 'box'],
};

export default prefab('Filter Component', attributes, undefined, [
  FilterComponent({}),
]);
