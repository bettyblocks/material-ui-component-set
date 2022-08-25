import {
  option,
  variable,
  showIf,
  endpoint,
  size,
  sizes,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: ['width', 'height'],
  },
  {
    label: 'Spacing',
    expanded: false,
    members: ['outerSpacing'],
  },
  {
    label: 'Alternative names',
    expanded: false,
    members: ['title', 'imgAlt'],
  },
  {
    label: 'Advanced settings',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const mediaOptions = {
  type: option('CUSTOM', {
    label: 'Media type',
    value: 'img',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Image', value: 'img' },
        { name: 'Video', value: 'video' },
        { name: 'I-frame', value: 'iframe' },
      ],
    },
  }),
  imageSource: variable('Source', {
    value: [],
    configuration: {
      as: 'MULTILINE',
      condition: showIf('type', 'EQ', 'img'),
    },
  }),
  videoSource: variable('Source', {
    value: [],
    configuration: {
      as: 'MULTILINE',
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

  ...advanced('Media'),
};
