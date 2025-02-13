import { prefab, Icon } from '@betty-blocks/component-sdk';
import { CheckboxGroup } from './structures/CheckboxGroup';

const attributes = {
  category: 'FORM',
  icon: Icon.CheckboxGroupIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Checkbox Group', attributes, undefined, [
  CheckboxGroup({ label: 'Checkbox Group' }),
]);
