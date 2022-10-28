import { variable, toggle, showIfTrue } from '@betty-blocks/component-sdk';

export const validation = {
  required: toggle('Required'),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    configuration: {
      condition: showIfTrue('required'),
    },
  }),
  disabled: toggle('Disabled'),
  helperText: variable('Helper text'),
};
