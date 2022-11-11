import { variable } from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

export const advanced = {
  dataComponentAttribute: variable('Test attribute', {
    value: [],
    ...showOn('advancedSettings'),
  }),
};
