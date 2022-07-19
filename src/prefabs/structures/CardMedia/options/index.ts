import {
  option,
  property,
  showIf,
  variable,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  type: option('CUSTOM', {
    label: 'Media type',
    value: 'url',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Image', value: 'img' },
        { name: 'Data', value: 'data' },
        { name: 'Video', value: 'video' },
        { name: 'URL', value: 'url' },
        { name: 'I-frame', value: 'iframe' },
      ],
    },
  }),
  imageFileSource: option('PUBLIC_FILE', {
    label: 'Image',
    value: '',
    configuration: {
      mediaType: 'IMAGE',
      allowedExtensions: ['image/*'],
      condition: showIf('type', 'EQ', 'img'),
    },
  }),
  propertyFileSource: property('Property', {
    value: '',
    configuration: {
      condition: showIf('type', 'EQ', 'data'),
    },
  }),
  videoFileSource: option('PUBLIC_FILE', {
    label: 'Video',
    value: '',
    configuration: {
      mediaType: 'VIDEO',
      allowedExtensions: ['video/*'],
      condition: showIf('type', 'EQ', 'video'),
    },
  }),
  urlFileSource: variable('Source', {
    value: [
      'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    ],
    configuration: {
      placeholder: 'Starts with https:// or http://',
      as: 'MULTILINE',
      condition: showIf('type', 'EQ', 'url'),
    },
  }),
  iframeSource: variable('Source', {
    value: [],
    configuration: {
      as: 'MULTILINE',
      condition: showIf('type', 'EQ', 'iframe'),
    },
  }),
  urlSourceType: option('CUSTOM', {
    label: 'Type ',
    value: 'image',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Image', value: 'image' },
        { name: 'Video', value: 'video' },
      ],
      condition: showIf('type', 'EQ', 'url'),
    },
  }),
  title: variable('Title', {
    value: [],
  }),
  ...advanced,
};
