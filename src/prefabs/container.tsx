import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Container } from './structures/Container';

const attributes = {
  category: 'LAYOUT',
  icon: Icon.ContainerIcon,
  keywords: ['Layout', 'container'],
};

export default prefab('Container', attributes, undefined, [Container({})]);
