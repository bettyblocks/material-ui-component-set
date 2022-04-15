import {
  number,
  showIf,
  text,
  variable,
  toggle,
} from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

export const validation = {
  validationOptions: toggle('Validation options'),
  required: toggle('Required', showOn('validationOptions')),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    ...showOn('required'),
  }),

  pattern: text('Validation pattern', {
    value: '',
    configuration: {
      ...showOn('validationOptions').configuration,
    },
  }),

  validationPatternMismatch: variable('Pattern mismatch message', {
    value: ['Invalid value'],
    ...showOn('validationOptions'),
  }),

  minLength: number('Min length', showOn('validationOptions')),
  validationTooShort: variable('Value too short message', {
    value: ['This value is too short'],
    ...showOn('validationOptions'),
  }),

  maxLength: number('Max length', showOn('validationOptions')),
  validationTooLong: variable('Value too long message', {
    value: ['This value is too long'],
    ...showOn('validationOptions'),
  }),

  autoComplete: toggle('Autocomplete', { value: false }),
  disabled: toggle('Disabled'),
  placeholder: variable('Placeholder'),
  helperText: variable('Helper text'),
  type: text('Type', {
    value: '',
    configuration: { condition: showIf('type', 'EQ', 'never') },
  }),
};
