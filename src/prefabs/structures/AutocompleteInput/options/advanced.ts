import { option, showIf, variable, toggle } from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

export const advanced = {
  advancedSettings: toggle('Advanced Settings', { value: false }),
  nameAttribute: variable('name attribute', {
    value: [],
    ...showOn('advancedSettings'),
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: [],
    ...showOn('advancedSettings'),
  }),
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Name',
    value: '',
    configuration: { condition: showIf('actionVariableId', 'EQ', 'never') },
  }),
};
