import { variable } from '@betty-blocks/component-sdk';

export const advanced = (value: string) => {
  return {
    nameAttribute: variable('Name attribute', {
      value: [],
    }),
    dataComponentAttribute: variable('Test attribute', {
      value: [value],
    }),
  };
};
