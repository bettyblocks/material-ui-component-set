import { Icon, prefab } from '@betty-blocks/component-sdk';
import { DetailViewChild } from './structures/DetailViewChild';

const attrs = {
  icon: Icon.DetailViewIcon,
  keywords: ['detail', 'view', 'data', 'collection'],
  category: 'DATA',
};

export default prefab('Detail view child (TS)', attrs, undefined, [
  DetailViewChild({}, []),
]);
