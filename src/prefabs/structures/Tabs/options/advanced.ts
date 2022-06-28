import {
  showIf,
  showIfTrue,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';

export const advanced = {
  advancedSettings: toggle('Advanced settings', {
    value: false,
  }),
  preLoadTabs: toggle('Preload data in all tabs', {
    value: true,
    configuration: {
      condition: showIfTrue('advancedSettings'),
    },
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: [''],
    configuration: {
      condition: showIf('advancedSettings', 'EQ', true),
    },
  }),
};
