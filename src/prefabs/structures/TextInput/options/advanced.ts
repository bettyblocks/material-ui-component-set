import { variable, text, number } from '@betty-blocks/component-sdk';

export const advanced = {
  debounceDelay: number('Debounce delay (in ms)'),
  dataComponentAttribute: variable('Test attribute', {
    value: [],
  }),
  searchParam: text('Search variable name', {
    value: [''],
  }),
};
