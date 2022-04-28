/**
 * A Row prefab, but with three Rows, two of them are descendants
 */

import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Row } from './structures/Row';

const attrs = {
  icon: Icon.CardActionsIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', '1'],
};

export default prefab('My Column', attrs, undefined, [Row([Row(), Row()])]);
