import { Icon, prefab, toggle, variable } from '@betty-blocks/component-sdk';
import { Button, FileUpload, buttonOptions } from './structures';

const attr = {
  icon: Icon.FileInputIcon,
  category: 'FORM',
  keywords: ['Form', 'input', 'file', 'upload', 'fileupload'],
};

export default prefab('File Upload', attr, undefined, [
  FileUpload({ label: 'File Upload' }, [
    Button({
      label: 'upload',
      options: {
        ...buttonOptions,
        buttonText: variable('Button text', { value: ['Upload'] }),
        fullWidth: toggle('Full width', { value: true }),
      },
    }),
  ]),
]);
