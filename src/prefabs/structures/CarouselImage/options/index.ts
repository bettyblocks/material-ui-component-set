import { option, showIf, variable } from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  type: option('CUSTOM', {
    label: 'Media type',
    value: 'url',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Public File', value: 'publicFile' },
        { name: 'URL', value: 'url' },
      ],
    },
  }),
  imageFileSource: option('PUBLIC_FILE', {
    label: 'Image',
    value: '',
    configuration: {
      mediaType: 'IMAGE',
      allowedExtensions: ['image/*'],
      condition: showIf('type', 'EQ', 'publicFile'),
    },
  }),
  imageUrlSource: variable('Source', {
    value: [
      'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/image-carousel-preview',
    ],
    configuration: {
      condition: showIf('type', 'EQ', 'url'),
    },
  }),

  ...advanced,
};
