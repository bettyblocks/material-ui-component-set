import { Icon, prefab } from '@betty-blocks/component-sdk';
import { AutocompleteInput } from './structures/AutocompleteInput';

const attributes = {
  category: 'FORM',
  icon: Icon.AutoCompleteIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Autocomplete', attributes, undefined, [
  AutocompleteInput({
    label: 'Autocomplete',
    inputLabel: 'Autocomplete',
    type: 'text',
  }),
]);
