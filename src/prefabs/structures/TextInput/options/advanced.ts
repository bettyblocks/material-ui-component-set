import { number, variable } from '@betty-blocks/component-sdk';

export const advanced = {
  debounceDelay: number('Interaction (change) delay in milliseconds', {
    value: '0',
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: [],
  }),
};
