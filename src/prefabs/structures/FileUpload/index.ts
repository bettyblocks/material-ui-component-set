import { PrefabReference, component } from '@betty-blocks/component-sdk';
import { fileUploadOptions } from './options';
import { Configuration } from '../Configuration';

const defaultCategories = [
  {
    label: 'Validation',
    expanded: false,
    members: [
      'required',
      'hideDefaultError',
      'accept',
      'maxFileSize',
      'maxFileSizeMessage',
    ],
  },
  {
    label: 'Styling',
    expanded: false,
    members: [
      'hideLabel',
      'labelColor',
      'helperColor',
      'deleteIconColor',
      'errorColor',
    ],
  },
  {
    label: 'Advanced settings',
    expanded: false,
    members: ['nameAttribute', 'dataComponentAttribute', 'actionVariableId'],
  },
];

export const FileUpload = (
  config: Configuration = {},
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || fileUploadOptions) };
  const categories = [...(config.optionCategories || defaultCategories)];

  return component(
    'FileUploadInput',
    { options, label: config.label, optionCategories: categories },
    descendants,
  );
};
