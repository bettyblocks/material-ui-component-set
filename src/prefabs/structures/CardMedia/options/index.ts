import { option, showIf, variable } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const cardMediaOptions = {
  type: option('CUSTOM', {
    label: 'Media type',
    value: 'url',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Image', value: 'img' },
        { name: 'Data/URL', value: 'url' },
        { name: 'Video', value: 'video' },
        { name: 'I-frame', value: 'iframe' },
      ],
    },
  }),
  imageFileSource: option('PUBLIC_FILE', {
    label: 'Select image',
    value: '',
    configuration: {
      mediaType: 'IMAGE',
      allowedExtensions: ['image/*'],
      condition: showIf('type', 'EQ', 'img'),
    },
  }),
  videoFileSource: option('PUBLIC_FILE', {
    label: 'Select video',
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

  ...advanced('Card media'),
};
