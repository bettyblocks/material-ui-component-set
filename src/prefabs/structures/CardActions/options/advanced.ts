import { toggle, variable } from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

export const advanced = {
  advancedSettings: toggle('Advanced settings', { value: false }),
  dataComponentAttribute: variable('Test attribute', {
    value: ['CardActions'],
    ...showOn('advancedSettings'),
  }),
};
