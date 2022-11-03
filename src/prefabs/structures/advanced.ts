import { variable } from '@betty-blocks/component-sdk';

export const advanced = (value: string) => {
  return {
    dataComponentAttribute: variable('Test attribute', {
      value: [value],
    }),
  };
};
