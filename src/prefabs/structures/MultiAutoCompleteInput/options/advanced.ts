import {
  buttongroup,
  showIf,
  toggle,
  variable,
  number,
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
  take: number('take', {
    value: 20,
    ...showOn('advancedSettings'),
  }),
};
