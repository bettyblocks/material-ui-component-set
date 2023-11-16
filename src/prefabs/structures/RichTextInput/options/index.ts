import {
  hideIf,
  option,
  property,
  showIf,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { styles } from './styles';
import { validation } from './validation';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Toolbar options',
    expanded: false,
    members: [
      'showBold',
      'showItalic',
      'showUnderlined',
      'showStrikethrough',
      'showCodeInline',
      'showCodeBlock',
      'showNumberedList',
      'showBulletedList',
      'showLeftAlign',
      'showCenterAlign',
      'showRightAlign',
      'showJustifyAlign',
    ],
  },
  {
    label: 'Styling',
    expanded: false,
    members: [
      'hideLabel',
      'backgroundColor',
      'borderColor',
      'borderHoverColor',
      'borderFocusColor',
      'buttonColor',
      'buttonHoverColor',
      'buttonActiveColor',
      'buttonDisabledColor',
      'labelColor',
      'placeholderColor',
      'helperColor',
      'errorColor',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const richTextOptions = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),

  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['TEXT', 'URL', 'IBAN', 'STRING'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
  }),

  label: variable('Label', { value: [''] }),
  value: variable('Value', { value: [''] }),
  showBold: toggle('Bold', { value: true }),
  showItalic: toggle('Italic', { value: true }),
  showUnderlined: toggle('Underlined', { value: true }),
  showStrikethrough: toggle('Strikethrough', { value: true }),
  showCodeInline: toggle('Code inline', { value: true }),
  showCodeBlock: toggle('Code block', { value: true }),
  showNumberedList: toggle('NumberedList', { value: true }),
  showBulletedList: toggle('BulletedList', { value: true }),
  showLeftAlign: toggle('Left alignment', { value: true }),
  showCenterAlign: toggle('Center alignment', { value: true }),
  showRightAlign: toggle('Right alignment', { value: true }),
  showJustifyAlign: toggle('Justify alignment', { value: true }),

  ...validation,
  ...styles,
  ...advanced('RichTextEditor'),
};
