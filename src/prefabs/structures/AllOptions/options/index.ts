import {
  ThemeColor,
  authenticationProfile,
  buttongroup,
  color,
  endpoint,
  filter,
  font,
  hideIf,
  icon,
  model,
  modelAndRelation,
  number,
  option,
  property,
  size,
  text,
  toggle,
  variable,
  displayLogic,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const allOptionsOptions = {
  content: variable('Content', {
    value: ['Hello world'],
    configuration: { as: 'MULTILINE', showOnDrop: true },
  }),
  authenticationProfile: authenticationProfile('Auth profile', {
    value: '',
    configuration: { showOnDrop: true },
  }),
  color: color('Color', {
    value: ThemeColor.PRIMARY,
    configuration: { showOnDrop: true },
  }),
  endpoint: endpoint('Endpoint', {
    value: '',
    configuration: { showOnDrop: true },
  }),
  filter: filter('Filter', { value: '', configuration: { showOnDrop: true } }),
  font: font('Font', { value: 'Title1', configuration: { showOnDrop: true } }),
  icon: icon('Icon', {
    value: 'Favorite',
    configuration: { showOnDrop: true },
  }),
  model: model('Model', { value: '', configuration: { showOnDrop: true } }),
  modelAndRelation: modelAndRelation('Model and relation', {
    value: '',
    configuration: { showOnDrop: true },
  }),
  number: number('Number', { value: 1, configuration: { showOnDrop: true } }),
  property: property('Property', {
    value: '',
    configuration: { showOnDrop: true },
  }),
  size: size('size', { value: 'L', configuration: { showOnDrop: true } }),
  toggle: toggle('Toggle', {
    value: true,
    configuration: { showOnDrop: true },
  }),
  text: text('Text', { value: 'Hi mom', configuration: { showOnDrop: true } }),
  actionId: option('ACTION_JS', {
    label: 'Action',
    value: '',
    configuration: { showOnDrop: true },
  }),
  iconPosition: buttongroup(
    'Icon position',
    [
      ['Start', 'start'],
      ['End', 'end'],
    ],
    {
      value: 'start',
      configuration: {
        condition: hideIf('icon', 'EQ', 'None'),
        showOnDrop: true,
      },
    },
  ),
  fontWeight: option('CUSTOM', {
    label: 'Font weight',
    value: '300',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '300', value: '300' },
        { name: '400', value: '400' },
        { name: '500', value: '500' },
      ],
      showOnDrop: true,
    },
  }),
  displayLogic: displayLogic('displaylogic', {
    value: {},
  }),
  ...advanced('AllOptions'),
};
