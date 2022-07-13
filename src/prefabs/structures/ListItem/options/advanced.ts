import { showIfTrue, toggle, variable } from '@betty-blocks/component-sdk';

export const advanced = {
  advancedSettings: toggle('Advanced settings', { value: false }),
  dataComponentAttribute: variable('Test attribute', {
    value: [],
    configuration: {
      condition: showIfTrue('advancedSettings'),
    },
  }),
};
