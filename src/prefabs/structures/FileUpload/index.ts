import { PrefabReference, component } from '@betty-blocks/component-sdk';
import { fileUploadOptionsResolver } from './options';
import { Configuration } from '../Configuration';
import { addChildOptions, optionEvents } from './options/addChild';
import { updateOption } from '../../../utils';

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
  const options = {
    ...(config.options ||
      fileUploadOptionsResolver(config.inputType || 'file')),
  };
  const categories = [...(config.optionCategories || defaultCategories)];

  if (config.inputLabel) {
    options.label = updateOption(options.label, { value: [config.inputLabel] });
  }

  return component(
    'FileUploadInput',
    {
      options,
      label: config.label,
      optionCategories: categories,
      optionTemplates: {
        addChild: {
          options: addChildOptions(config.inputType || 'file'),
          optionEvents,
        },
      },
    },
    descendants,
  );
};
