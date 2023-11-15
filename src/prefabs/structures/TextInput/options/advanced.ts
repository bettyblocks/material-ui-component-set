import { variable, text, number } from '@betty-blocks/component-sdk';

export const advanced = {
  debounceDelay: number('Interaction (change) delay in milliseconds', {
    value: '0',
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: [],
  }),
  searchParam: text('Search variable name', {
    value: [''],
  }),
};
