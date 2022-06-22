import { showIfTrue, toggle, variable } from '@betty-blocks/component-sdk';

export const advanced = {
  advancedSettings: toggle('Advanced settings', { value: false }),
  preloadData: toggle('Preload data', {
    value: false,
    configuration: {
      condition: showIfTrue('advancedSettings'),
    },
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: [],
    configuration: {
      condition: showIfTrue('advancedSettings'),
    },
  }),
};
