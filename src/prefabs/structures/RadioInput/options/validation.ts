import { variable, toggle } from '@betty-blocks/component-sdk';
import { showOn } from '../../../../utils';

export const validation = {
  required: toggle('Required'),
  validationOptions: toggle('Validation options'),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    ...showOn('validationOptions'),
  }),
  disabled: toggle('Disabled'),
  helperText: variable('Helper text'),
};
