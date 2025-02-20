import {
  Icon,
  prefab,
  showIfTrue,
  size,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import {
  Button,
  FileUpload,
  buttonOptions,
  fileUploadOptions,
} from './structures';

const attr = {
  icon: Icon.ImageInputIcon,
  category: 'FORM',
  keywords: [
    'Form',
    'input',
    'image',
    'thumbnail',
    'file',
    'upload',
    'fileupload',
  ],
};

const optionCategories = [
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
      'showImagePreview',
      'imagePreviewWidth',
      'imagePreviewHeight',
    ],
  },
  {
    label: 'Advanced settings',
    expanded: false,
    members: ['nameAttribute', 'dataComponentAttribute', 'actionVariableId'],
  },
];

export default prefab('Image Upload', attr, undefined, [
  FileUpload(
    {
      inputType: 'image',
      label: 'Image Upload',
      inputLabel: 'Select image(s)...',
      optionCategories,
      options: {
        ...fileUploadOptions,
        showImagePreview: toggle('Show Image preview', { value: true }),
        imagePreviewWidth: size('Image preview width', {
          value: '200px',
          configuration: {
            as: 'UNIT',
            condition: showIfTrue('showImagePreview'),
          },
        }),
        imagePreviewHeight: size('Image preview height', {
          value: '112px',
          configuration: {
            as: 'UNIT',
            condition: showIfTrue('showImagePreview'),
          },
        }),
        accept: variable('Accept files', {
          value: ['image/*'],
        }),
      },
    },
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
  ),
]);
