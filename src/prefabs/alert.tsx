import { prefab, Icon } from '@betty-blocks/component-sdk';

import { Alert } from './structures/Alert';

const attributes = {
  category: 'CONTENT',
  icon: Icon.AlertIcon,
  keywords: ['Content', 'alert', 'notification'],
};

export default prefab('Alert', attributes, undefined, [Alert({})]);
