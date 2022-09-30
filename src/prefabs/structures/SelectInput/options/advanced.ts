import { variable, toggle } from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

export const advanced = {
  advancedSettings: toggle('Advanced settings', { value: false }),
  blanco: variable('Blank option', {
    value: [''],
    ...showOn('advancedSettings'),
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: [],
    ...showOn('advancedSettings'),
  }),
};
