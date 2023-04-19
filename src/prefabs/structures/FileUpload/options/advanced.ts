import { variable, showIf, option } from '@betty-blocks/component-sdk';

export const advanced = {
  nameAttribute: variable('name attribute', {
    value: [],
  }),
  dataComponentAttribute: variable('Test attribute', {
    value: ['FileUpload'],
  }),
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Name',
    value: '',
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),
};
