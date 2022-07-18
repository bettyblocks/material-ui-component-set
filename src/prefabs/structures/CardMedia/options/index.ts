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
        { name: 'Image', value: 'img' },
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
  videoFileSource: option('PUBLIC_FILE', {
    label: 'Video',
    value: '',
    configuration: {
      mediaType: 'VIDEO',
      allowedExtensions: ['video/*'],
      condition: showIf('type', 'EQ', 'video'),
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
        { name: 'Video page', value: 'video' },
      ],
      condition: showIf('type', 'EQ', 'url'),
    },
  }),
  title: variable('Title', {
    value: [],
  }),
  ...advanced,
};
