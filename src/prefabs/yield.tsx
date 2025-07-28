import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Yield } from './structures';

const attributes = {
  category: 'LAYOUT',
  icon: Icon.ContainerIcon,
  keywords: ['Layout', 'box'],
};

export default prefab('Yield', attributes, undefined, [Yield({})]);
