import { hideIf, option, variable } from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  avatar: variable('Avatar', {
    value: [],
  }),
  avatarType: option('CUSTOM', {
    label: 'Avatar type',
    value: 'text',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Text', value: 'text' },
        { name: 'Image', value: 'imgage' },
      ],
      condition: hideIf('avatar', 'EQ', ''),
    },
  }),
  title: variable('Title', {
    value: ['Title'],
  }),
  subHeader: variable('Sub header', {
    value: [],
  }),

  ...advanced,
};
