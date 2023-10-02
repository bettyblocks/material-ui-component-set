import { number, variable } from '@betty-blocks/component-sdk';

export const advanced = {
  debounceDelay: number('Interaction (change) delay in milliseconds'),
  dataComponentAttribute: variable('Test attribute', {
    value: [],
  }),
};
