import { showIf, text, variable, toggle } from '@betty-blocks/component-sdk';

import { showOn } from '../../../../utils';

export const validation = {
  required: toggle('Required', { value: false }),
  validationOptions: toggle('Validation options'),
  pattern: text('Validation pattern', {
    value: '',
    ...showOn('validationOptions'),
  }),

  minLength: variable('Min length', {
    value: [''],
    ...showOn('validationOptions'),
  }),

  maxLength: variable('Max length', {
    value: [''],
    ...showOn('validationOptions'),
  }),

  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    ...showOn('required'),
  }),

  validationTooShort: variable('Value too short message', {
    value: ['This value is too short'],
    ...showOn('validationOptions'),
  }),

  closeOnSelect: toggle('Close dropdown after select', { value: true }),
  disabled: toggle('Disabled', { value: false }),
  placeholder: variable('Placeholder'),
  helperText: variable('Helper text'),
  type: text('Type', {
    value: '',
    configuration: { condition: showIf('type', 'EQ', 'never') },
  }),
};
