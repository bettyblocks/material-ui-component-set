import { prefab, Icon } from '@betty-blocks/component-sdk';

import { PieChart } from './structures/PieChart';

const attributes = {
  category: 'CHARTS',
  icon: Icon.TimePickerIcon,
  keywords: ['Pie, Chart'],
};

export default prefab('Pie chart', attributes, undefined, [PieChart({})]);
