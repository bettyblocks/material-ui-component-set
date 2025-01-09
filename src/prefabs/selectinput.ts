import { Icon, prefab } from '@betty-blocks/component-sdk';
import { SelectInput } from './structures/SelectInput';

const attributes = {
  category: 'FORM',
  icon: Icon.SelectIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Select', attributes, undefined, [
  SelectInput({
    inputLabel: 'Select option',
  }),
]);
