import { Icon, prefab } from '@betty-blocks/component-sdk';
import { CheckboxInput } from './structures/CheckboxInput';

const attributes = {
  category: 'FORM',
  icon: Icon.CheckboxIcon,
};

export default prefab('Checkbox', attributes, undefined, [
  CheckboxInput({ label: 'Checkbox input' }),
]);
