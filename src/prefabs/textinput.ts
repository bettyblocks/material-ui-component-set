import {
  buttongroup,
  color,
  component,
  icon,
  number,
  option,
  prefab,
  text,
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

const validationAttrs = {
  configuration: { condition: showIfTrue('validationOptions') },
};

const validationOptions = {
  validationOptions: toggle('Validation options', validationAttrs),
  required: toggle('Required'),
  pattern: text('Validation pattern', {
    configuration: {
      placeholder: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
      ...validationAttrs.configuration,
    },
  }),
  minLength: number('Min length', validationAttrs),
  maxLength: number('Max length', validationAttrs),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    ...validationAttrs,
  }),
  validationPatternMismatch: variable('Pattern mismatch message', {
    value: ['Invalid value'],
    ...validationAttrs,
  }),
  validationTooShort: variable('Value too short message', {
    value: ['This value is too short'],
    ...validationAttrs,
  }),
  validationTooLong: variable('Value too long message', {
    value: ['This value is too long'],
    ...validationAttrs,
  }),
};

const stylesAttrs = {
  configuration: { condition: showIfTrue('styles') },
};

const stylesOptions = {
  styles: toggle('Styles'),
  backgroundColor: color('Background color', {
    value: 'white',
    ...stylesAttrs,
  }),
  borderColor: color('Border color', {
    value: 'Accent1',
    ...stylesAttrs,
  }),
  borderHoverColor: color('Border color (hover)', {
    value: 'Black',
    ...stylesAttrs,
  }),
  borderFocusColor: color('Border color (focus)', {
    value: 'Primary',
    ...stylesAttrs,
  }),
  hideLabel: toggle('Hide label', stylesAttrs),
  labelColor: color('Label color', {
    value: 'Accent3',
    ...stylesAttrs,
  }),
  textColor: color('Text color', {
    value: 'Black',
    ...stylesAttrs,
  }),
  placeholderColor: color('Placeholder color', {
    value: 'Light',
    ...stylesAttrs,
  }),
  helperColor: color('Helper color', {
    value: 'Accent2',
    ...stylesAttrs,
  }),
  errorColor: color('Error color', {
    value: 'Danger',
    ...stylesAttrs,
  }),
};

const advancedAttrs = {
  configuration: { condition: showIfTrue('advancedSettings') },
};

const advancedOptions = {
  dataComponentAttribute: variable('Test attribute', {
    value: ['TextField'],
    ...advancedAttrs,
  }),
};

const variant = buttongroup('Variant', [
  ['Standard', 'standard'],
  ['Outlined', 'outlined'],
  ['Filled', 'filled'],
]);

const size = buttongroup('Size', [
  ['Medium', 'medium'],
  ['Small', 'small'],
]);

const margin = buttongroup('Margin', [
  ['None', 'none'],
  ['Dense', 'dense'],
  ['Normal', 'normal'],
]);

const adornmentPosition = buttongroup(
  'Position',
  [
    ['Start', 'start'],
    ['End', 'end'],
  ],
  {
    configuration: {
      condition: {
        type: 'HIDE',
        option: 'adornmentIcon',
        comparator: 'EQ',
        value: '',
      },
    },
  },
);

const options = {
  label: variable('Label'),
  actionVariableId: option('ACTION_JS_VARIABLE', { label: 'Name', value: '' }),
  autoComplete: toggle('Autocomplete', { value: true }),
  ...validationOptions,
  disabled: toggle('Disabled'),
  placeholder: variable('Placeholder'),
  helperText: variable('Helper text'),
  variant,
  fullWidth: toggle('Full width', { value: true }),
  size,
  margin,
  adornmentIcon: icon('Adornment'),
  adornmentPosition,
  ...stylesOptions,
  ...advancedOptions,
};

const hooks = {
  $afterDelete: [
    {
      query: 'DeleteActionVariable',
      input: {
        id: {
          ref: ['options', 'actionVariableId'],
        },
      },
    },
  ],
};

const textInput = prefab('textinput', attributes, undefined, [
  component('TextInput', { options, ...hooks }, []),
]);

export default textInput;
