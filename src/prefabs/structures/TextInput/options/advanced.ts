import { variable, text } from '@betty-blocks/component-sdk';

export const advanced = {
  dataComponentAttribute: variable('Test attribute', {
    value: [],
  }),
  searchParam: text('Search variable name', {
    value: [''],
  }),
};
