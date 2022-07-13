import {
  variable,
  toggle,
  option,
  color,
  ThemeColor,
  showIf,
  text,
  sizes,
  icon,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  label: variable('Label', {
    value: ['Label'],
  }),
  disabled: toggle('Disabled', {
    value: false,
  }),
  variant: option('CUSTOM', {
    label: 'Variant',
    value: 'default',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Default', value: 'default' },
        { name: 'Outlined', value: 'outlined' },
      ],
    },
  }),
  size: option('CUSTOM', {
    value: 'medium',
    label: 'Size',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Small', value: 'small' },
        { name: 'Medium', value: 'medium' },
      ],
    },
  }),
  color: color('Color', {
    value: ThemeColor.PRIMARY,
  }),
  textColor: color('Text color', {
    value: ThemeColor.WHITE,
  }),
  avatarType: option('CUSTOM', {
    label: 'Avatar type',
    value: 'icon',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Icon', value: 'icon' },
        { name: 'Text', value: 'text' },
        { name: 'Image', value: 'image' },
      ],
    },
  }),
  startIcon: icon('Start Icon', {
    value: 'None',
    configuration: {
      condition: showIf('avatarType', 'EQ', 'icon'),
    },
  }),
  avatar: text('Avatar text', {
    value: '',
    configuration: {
      condition: showIf('avatarType', 'EQ', 'text'),
    },
  }),
  imgUrl: variable('Image url', {
    value: [],
    configuration: {
      condition: showIf('avatarType', 'EQ', 'image'),
    },
  }),
  margin: sizes('Outer space', {
    value: ['M', 'M', 'M', 'M'],
  }),

  ...advanced,
};
