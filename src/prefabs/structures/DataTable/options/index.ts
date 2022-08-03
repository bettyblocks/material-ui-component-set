import {
  model,
  filter,
  property,
  option,
  showIf,
  hideIf,
  variable,
  toggle,
  font,
  showIfTrue,
  number,
  size,
  color,
  ThemeColor,
  endpoint,
  sizes,
  reconfigure,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  model: model('Model', { value: '' }),
  reconfigure: reconfigure('Reconfigure', { value: '' }),
  filter: filter('Filter', {
    value: {},
    configuration: {
      dependsOn: 'model',
    },
  }),
  orderProperty: property('Order by', {
    value: '',
    configuration: {
      dependsOn: 'model',
    },
  }),
  sortOrder: option('CUSTOM', {
    value: 'asc',
    label: 'Sort order',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      dependsOn: 'model',
      allowedInput: [
        { name: 'Ascending', value: 'asc' },
        { name: 'Descending', value: 'desc' },
      ],
      condition: hideIf('orderProperty', 'EQ', ''),
    },
  }),
  searchProperty: property('Search on property', {
    value: '',
    configuration: {
      dependsOn: 'model',
    },
  }),
  labelSearchOn: variable('Search on text', {
    value: ['Search on'],
    configuration: {
      dependsOn: 'model',
      condition: hideIf('hideSearch', 'EQ', true),
    },
  }),
  hideTextOverflow: toggle('Hide text-overflow', {
    value: true,
  }),
  title: variable('Title', { value: [''] }),
  titleType: font('Title type', {
    value: 'Title4',
  }),
  pagination: option('CUSTOM', {
    label: 'Pagination',
    value: 'always',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      dependsOn: 'model',
      allowedInput: [
        { name: 'Always', value: 'always' },
        { name: 'When needed', value: 'whenNeeded' },
        { name: 'Never', value: 'never' },
      ],
    },
  }),
  autoLoadOnScroll: toggle('Auto load on scroll', {
    value: false,
    configuration: {
      dependsOn: 'model',
      condition: showIf('pagination', 'EQ', 'never'),
    },
  }),
  autoLoadTakeAmount: option('CUSTOM', {
    value: '50',
    label: 'Number of records to auto load',
    configuration: {
      dependsOn: 'model',
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '5', value: '5' },
        { name: '10', value: '10' },
        { name: '25', value: '25' },
        { name: '50', value: '50' },
        { name: '100', value: '100' },
      ],
      condition: showIfTrue('autoLoadOnScroll'),
    },
  }),
  take: option('CUSTOM', {
    value: '5',
    label: 'Rows per page',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      dependsOn: 'model',
      allowedInput: [
        { name: '5', value: '5' },
        { name: '10', value: '10' },
        { name: '25', value: '25' },
        { name: '50', value: '50' },
        { name: '100', value: '100' },
      ],
      condition: hideIf('autoLoadOnScroll', 'EQ', true),
    },
  }),
  placeholderTake: number('Placeholder rows', { value: '' }),
  labelRowsPerPage: variable('Rows per page text', {
    value: ['Rows per page'],
    configuration: {
      condition: hideIf('pagination', 'EQ', 'never'),
    },
  }),
  labelNumberOfPages: variable(`Pagination label (x 'of' y)`, {
    value: ['of'],
    configuration: {
      condition: hideIf('pagination', 'EQ', 'never'),
    },
  }),
  height: size('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  stickyHeader: toggle('Sticky header', { value: false }),
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
  background: color('Background', { value: ThemeColor.TRANSPARENT }),
  backgroundHeader: color('Background', { value: ThemeColor.TRANSPARENT }),
  square: toggle('Square', { value: false }),
  striped: toggle('Striped', { value: false }),
  stripeColor: color('Stripe color', {
    value: ThemeColor.LIGHT,
    configuration: {
      condition: showIfTrue('striped'),
    },
  }),
  variant: option('CUSTOM', {
    label: 'Variant',
    value: 'elevation',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Flat', value: 'flat' },
        { name: 'Elevation', value: 'elevation' },
        { name: 'Outlined', value: 'outlined' },
      ],
    },
  }),
  elevation: option('CUSTOM', {
    label: 'Elevation',
    value: '1',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
        { name: '10', value: '10' },
        { name: '11', value: '11' },
        { name: '12', value: '12' },
        { name: '13', value: '13' },
        { name: '14', value: '14' },
        { name: '15', value: '15' },
        { name: '16', value: '16' },
        { name: '17', value: '17' },
        { name: '18', value: '18' },
        { name: '19', value: '19' },
        { name: '20', value: '20' },
        { name: '21', value: '21' },
        { name: '22', value: '22' },
        { name: '23', value: '23' },
        { name: '24', value: '24' },
      ],
      condition: showIf('variant', 'EQ', 'elevation'),
    },
  }),
  linkTo: endpoint('Row click', { value: '' }),
  backgroundRowHover: color('Row hover color', {
    value: ThemeColor.TRANSPARENT,
    configuration: {
      condition: hideIf('linkTo', 'EQ', ''),
    },
  }),
  outerSpacing: sizes('Outer space', { value: ['0rem', '0rem', 'M', '0rem'] }),
  showError: option('CUSTOM', {
    value: 'built-in',
    label: 'Error message',
    configuration: {
      dependsOn: 'model',
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Built in', value: 'built-in' },
        { name: 'Interaction', value: 'interaction' },
      ],
    },
  }),

  ...advanced,
};
