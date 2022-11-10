import {
  Icon,
  prefab,
  showIf,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { CheckboxInput } from './structures/CheckboxInput';
import { checkboxInputOptions } from './structures/CheckboxInput/options';

const attr = {
  icon: Icon.SwitcherIcon,
  category: 'FORM',
  keywords: ['Form', 'input', 'switch', 'toggle'],
};

export default prefab('Switch', attr, undefined, [
  CheckboxInput({
    options: {
      ...checkboxInputOptions,
      label: variable('Label', { value: ['Switch'] }),
      isSwitch: toggle('Is switch', {
        value: true,
        configuration: {
          condition: showIf('isSwitch', 'EQ', 'false'),
        },
      }),
    },
    label: 'Switch',
  }),
]);
