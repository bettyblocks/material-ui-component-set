import { component, toggle, variable } from '@betty-blocks/component-sdk';
import { Button } from '../Button';
import { options } from './options';
import { buttonOptions } from '..';

export const FileUpload = () =>
  component('FileUploadInput', { options }, [
    Button({
      label: 'upload',
      options: {
        ...buttonOptions,
        buttonText: variable('Button text', { value: ['Upload'] }),
        fullWidth: toggle('Full width', { value: true }),
      },
    }),
  ]);
