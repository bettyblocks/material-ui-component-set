import { component, toggle, variable } from '@betty-blocks/component-sdk';
import { Button } from '../Button';
import { options as defaultOptions } from './options/index';
import { buttonOptions } from '..';
import { updateOption } from '../../../utils';

interface Configuration {
  supportImages?: boolean;
  label?: string;
}

export const FileUpload = (config: Configuration = {}) => {
  const options = defaultOptions(config.supportImages);

  const categories = [
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
      members: ['hideLabel', 'labelColor', 'helperColor', 'errorColor'],
    },
    {
      label: 'Advanced settings',
      expanded: false,
      members: ['nameAttribute', 'dataComponentAttribute', 'actionVariableId'],
    },
  ];

  if (config.supportImages) {
    options.accept = updateOption(options.accept, {
      value: ['image/*'],
    });
  }

  return component(
    'FileUploadInput',
    { options, label: config.label, optionCategories: categories },
    [
      Button({
        label: 'upload',
        options: {
          ...buttonOptions,
          buttonText: variable('Button text', { value: ['Upload'] }),
          fullWidth: toggle('Full width', { value: true }),
        },
      }),
    ],
  );
};
