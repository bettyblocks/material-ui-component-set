import { showIf, text, variable, toggle } from '@betty-blocks/component-sdk';

import { showOn } from '../../../../utils';

export const validation = {
  required: toggle('Required'),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    ...showOn('required'),
  }),
  closeOnSelect: toggle('Close dropdown after select', { value: true }),
  disabled: toggle('Disabled'),
  placeholder: variable('Placeholder'),
  helperText: variable('Helper text'),
  type: text('Type', {
    value: '',
    configuration: { condition: showIf('type', 'EQ', 'never') },
  }),
};
