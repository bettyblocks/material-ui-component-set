import { Icon, prefab } from '@betty-blocks/component-sdk';
import { RadioInput } from './structures/RadioInput';

const attributes = {
  category: 'FORM',
  icon: Icon.RadioButtonIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Radio', attributes, undefined, [
  RadioInput({
    label: 'Radio',
  }),
]);
