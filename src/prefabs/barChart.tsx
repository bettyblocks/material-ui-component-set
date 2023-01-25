import { prefab, Icon } from '@betty-blocks/component-sdk';

import { BarChart } from './structures/BarChart';

const attributes = {
  category: 'CHARTS',
  icon: Icon.Column3Icon,
  keywords: ['Chart, Bar'],
};

export default prefab('Bar chart', attributes, undefined, [BarChart({})]);
