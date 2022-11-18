import { toggle, variable } from '@betty-blocks/component-sdk';

export const advanced = {
  invisible: toggle('Invisible', {
    value: false,
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: ['Dialog'],
  }),
};
