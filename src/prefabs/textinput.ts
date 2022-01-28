import {
  component,
  prefab,
  toggle,
  variable,
  showIfTrue,
} from '@betty-blocks/component-sdk';
import categories from './helpers/categories';
import icons from './helpers/icons';

const attributes = {
  category: categories.form,
  icon: icons.TextInputIcon,
};

const validationOptions = {
  // validationOptions: toggle('Validation options'),
  // required: toggle('Required'),
  // pattern: text('Validation pattern', {
  //   configuration: {
  //     placeholder: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
  //   },
  // }),
  // minLength: number('Min length'),
  // maxLength: number('Max length'),
  // validationValueMissing: variable('Value required message', {
  //   value: ['This field is required'],
  // }),
  // validationPatternMismatch: variable('Pattern mismatch message', {
  //   value: ['Invalid value'],
  // }),
  // validationTooShort: variable('Value too short message', {
  //   value: ['This value is too short'],
  // }),
  // validationTooLong: variable('Value too long message', {
  //   value: ['This value is too long'],
  // }),
};

// const valOptions = Object.fromEntries(
//   Object.entries(validationOptions).map(([key, val]) => {
//     return [
//       key,
//       {
//         ...val,
//         configuration: {
//           ...val.configuration,
//           condition: showIfTrue('validationOptions'),
//         },
//       },
//     ];
//   }),
// );

const options = {
  // label: variable('Label'),
  // actionVariableId: option('ACTION_JS_VARIABLE', { label: 'Name', value: '' }),
  // autoComplete: toggle('Autocomplete', { value: true }),
  // ...valOptions,
  // disabled: toggle('Disabled'),
  // placeholder: variable('Placeholder'),
  // helperText: variable('Helper text'),
  // variant: option('CUSTOM', {
  //   label: 'Variant',
  //   value: 'outlined',
  //   configuration: {
  //     as: 'BUTTONGROUP',
  //     dataType: 'string',
  //     allowedInput: [
  //       { name: 'Standard', value: 'standard' },
  //       { name: 'Outlined', value: 'outlined' },
  //       { name: 'Filled', value: 'filled' },
  //     ],
  //   },
  // }),
};

const textInput = prefab('textinput', attributes, undefined, [
  component('TextInput', { options }, []),
]);

export default textInput;
