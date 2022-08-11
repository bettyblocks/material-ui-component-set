import { showIfTrue, toggle, variable } from '@betty-blocks/component-sdk';

export const advanced = {
  advancedSettings: toggle('Advanced settings', { value: false }),

  dataComponentAttribute: variable('Test attribute', {
    value: ['DateTimePicker'],
    configuration: { condition: showIfTrue('advancedSettings') },
  }),
};
