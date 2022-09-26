import { component, toggle, variable } from '@betty-blocks/component-sdk';
import { Button } from '../Button';
import { options as defaultOptions } from './options';
import { buttonOptions } from '..';
import { updateOption } from '../../../utils';

interface Configuration {
  supportImages?: boolean;
  label?: string;
}

export const FileUpload = (config: Configuration = {}) => {
  const options = defaultOptions(config.supportImages);

  if (config.supportImages) {
    options.accept = updateOption(options.accept, {
      value: ['image/*'],
    });
  }

  return component('FileUploadInput', { options, label: config.label }, [
    Button({
      label: 'upload',
      options: {
        ...buttonOptions,
        buttonText: variable('Button text', { value: ['Upload'] }),
        fullWidth: toggle('Full width', { value: true }),
      },
    }),
  ]);
};
