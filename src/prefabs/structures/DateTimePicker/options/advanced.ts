import { showIfTrue, variable } from '@betty-blocks/component-sdk';

export const advanced = {
  dataComponentAttribute: variable('Test attribute', {
    value: ['DateTimePicker'],
    configuration: { condition: showIfTrue('advancedSettings') },
  }),
};
