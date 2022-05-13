import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Box } from './structures/Box';

const attributes = {
  category: 'LAYOUT',
  icon: Icon.ContainerIcon,
  keywords: ['Layout', 'box'],
};

export default prefab('Box', attributes, undefined, [Box({})]);
