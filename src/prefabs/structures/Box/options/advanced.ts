import { toggle, variable } from '@betty-blocks/component-sdk';

export const advanced = {
  advancedSettings: toggle('Advanced settings', {
    value: false,
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: ['Box'],
    configuration: {
      condition: {
        type: 'SHOW',
        option: 'advancedSettings',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
};
