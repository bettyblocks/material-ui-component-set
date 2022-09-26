import { variable, toggle, number } from '@betty-blocks/component-sdk';
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
  take: number('take', {
    value: 50,
    ...showOn('advancedSettings'),
  }),
};
