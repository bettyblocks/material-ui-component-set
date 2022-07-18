import {
  option,
  variable,
  showIf,
  endpoint,
  size,
  sizes,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  type: option('CUSTOM', {
    label: 'Media type',
    value: 'img',
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
    value: [''],
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
  linkType: option('CUSTOM', {
    label: 'Link to',
    value: 'internal',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Internal page', value: 'internal' },
        { name: 'External page', value: 'external' },
      ],
      condition: showIf('type', 'EQ', 'img'),
    },
  }),
  linkTo: endpoint('Page', {
    value: '',
    configuration: {
      condition: showIf('linkType', 'EQ', 'internal'),
    },
  }),
  linkToExternal: variable('URL', {
    value: [''],
    configuration: {
      placeholder: 'Starts with https:// or http://',
      condition: showIf('linkType', 'EQ', 'external'),
    },
  }),
  imgAlt: variable('Image Alternative Text', {
    value: [],
    configuration: {
      condition: showIf('type', 'EQ', 'img'),
    },
  }),
  title: variable('Title', {
    value: [],
  }),
  width: size('Width', {
    value: '100%',
    configuration: {
      as: 'UNIT',
    },
  }),
  height: size('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', 'M', '0rem'],
  }),

  ...advanced,
};
