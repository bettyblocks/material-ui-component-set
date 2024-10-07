import {
  prefab as makePrefab,
  Icon,
  wrapper,
} from '@betty-blocks/component-sdk';

const attrs = {
  icon: Icon.ContainerIcon,
  keywords: ['Empty', 'widget'],
  category: 'LAYOUT',
};

export default makePrefab('Empty Widget', attrs, undefined, [
  wrapper(
    {
      label: 'Empty widget',
      options: {},
    },
    [],
  ),
]);
