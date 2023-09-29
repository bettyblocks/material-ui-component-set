import { number, variable } from '@betty-blocks/component-sdk';

export const advanced = {
  debounceDelay: number('Debounce delay (in ms)'),
  dataComponentAttribute: variable('Test attribute', {
    value: [],
  }),
};
