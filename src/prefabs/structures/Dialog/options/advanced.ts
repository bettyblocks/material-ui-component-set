import { toggle, variable, hideIf } from '@betty-blocks/component-sdk';

export const advanced = {
  invisible: toggle('Invisible', {
    value: false,
  }),
  preLoadChildren: toggle('Preload child components', {
    value: true,
    configuration: {
      condition: hideIf('runTimeVisibility', 'EQ', 'true'),
    },
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: ['Dialog'],
  }),
};
