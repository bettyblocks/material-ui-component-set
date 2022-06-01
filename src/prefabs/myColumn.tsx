/**
 * A Row prefab, but with three Rows, two of them are descendants
*/

import { Icon, option, prefab, variable } from '@betty-blocks/component-sdk';
import { Row } from './structures/Row';

const attrs = {
  icon: Icon.CardActionsIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', '1'],
};
export default prefab('TypeScript Row', attrs, undefined, [Row({}, [Row({})])]);

