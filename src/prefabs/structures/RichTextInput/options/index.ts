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
import { getAllowedKindsByType } from '../../../helpers/getAllowedKindsByType';

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

const { allowedKinds, allowedInputKinds } = getAllowedKindsByType('richText');

export const richTextOptions = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      ...(allowedInputKinds ? { allowedKinds: allowedInputKinds } : undefined),
      condition: showIf('property', 'EQ', ''),
    },
  }),

  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds,
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
    },
  }),

  label: variable('Label', {
    value: [''],
    configuration: { allowFormatting: false, allowPropertyName: true },
  }),
  value: variable('Value', {
    value: [''],
    configuration: { allowFormatting: false },
  }),
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
