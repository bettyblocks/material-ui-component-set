import {
  option,
  showIf,
  variable,
  toggle,
  buttongroup,
} from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

export const advanced = {
  advancedSettings: toggle('Advanced Settings', { value: false }),
  errorType: buttongroup(
    'Error message',
    [
      ['Built in', 'built-in'],
      ['Interaction', 'interaction'],
    ],
    { value: 'built-in', ...showOn('advancedSettings') },
  ),
  nameAttribute: variable('name attribute', {
    value: [],
    ...showOn('advancedSettings'),
    configuration: { condition: showIf('nameAttribute', 'EQ', 'never') },
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
