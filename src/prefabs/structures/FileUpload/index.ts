import { component, toggle, variable } from '@betty-blocks/component-sdk';
import { Button } from '../Button';
import { options } from './options';
import { buttonOptions } from '..';

interface Configuration {
  supportImages?: boolean;
}

export const FileUpload = (config: Configuration = {}) => {
  return component(
    'FileUploadInput',
    { options: options(config.supportImages) },
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
