import { Icon, prefab } from '@betty-blocks/component-sdk';
import { FileUpload } from './structures/FileUpload';

const attr = {
  icon: Icon.FileInputIcon,
  category: 'FORMV2',
  keywords: ['Form', 'input', 'file', 'upload', 'fileupload'],
};

export default prefab('File Upload Beta', attr, undefined, [FileUpload()]);
