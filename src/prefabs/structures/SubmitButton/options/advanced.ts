import { variable, toggle } from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

export const advanced = {
  advancedSettings: toggle('Advanced settings', { value: false }),

  dataComponentAttribute: variable('Test attribute', {
    value: ['Button'],
    ...showOn('advancedSettings'),
  }),
};
