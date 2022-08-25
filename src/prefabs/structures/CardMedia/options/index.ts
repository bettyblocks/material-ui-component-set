import { option, showIf, variable } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced settings',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const cardMediaOptions = {
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
    value: [
      'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    ],
    configuration: {
      condition: showIf('type', 'EQ', 'img'),
    },
  }),
  videoSource: variable('Source', {
    value: [],
    configuration: {
      condition: showIf('type', 'EQ', 'video'),
    },
  }),
  iframeSource: variable('Source', {
    value: [],
    configuration: {
      condition: showIf('type', 'EQ', 'iframe'),
    },
  }),
  title: variable('Title', {
    value: [],
  }),

  ...advanced('Card media'),
};
