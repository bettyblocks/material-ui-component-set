import {
  model,
  option,
  filter,
  number,
  showIf,
} from '@betty-blocks/component-sdk';

export const options = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  model: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'model' } }),
  currentRecord: number('Current Record', {
    value: '',
    configuration: { condition: showIf('currentRecord', 'EQ', 'never') },
  }),
};
