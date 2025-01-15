import { Icon, prefab } from '@betty-blocks/component-sdk';
import { MultiAutocomplete } from './structures/MultiAutoCompleteInput';

const attributes = {
  category: 'FORM',
  icon: Icon.AutoCompleteIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Multi Autocomplete', attributes, undefined, [
  MultiAutocomplete({
    label: 'Multi Autocomplete',
    inputLabel: { value: ['Multi Autocomplete'] },
    type: 'text',
  }),
]);
