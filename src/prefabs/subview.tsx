import {
  prefab as makePrefab,
  Icon,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { Subview } from './structures';

const attr = {
  icon: Icon.OrderedListIcon,
  category: 'LIST',
  keywords: ['Subview'],
};

export default makePrefab('Subview', attr, undefined, [Subview({}, [])]);
