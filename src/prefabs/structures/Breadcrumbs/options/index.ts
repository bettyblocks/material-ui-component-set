import {
  hideIf,
  option,
  text,
  showIf,
  icon,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const breadcrumbsOptions = {
  maxItems: option('CUSTOM', {
    label: 'Max Items',
    value: '0',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'All', value: '0' },
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
      ],
    },
  }),
  itemsBeforeCollapse: option('CUSTOM', {
    label: 'Items before collapse',
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
      ],
      condition: hideIf('maxItems', 'EQ', '0'),
    },
  }),
  itemsAfterCollapse: option('CUSTOM', {
    label: 'Items after collapse',
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
      ],
      condition: hideIf('maxItems', 'EQ', '0'),
    },
  }),
  separatorType: option('CUSTOM', {
    label: 'Separator Type',
    value: 'text',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Text', value: 'text' },
        { name: 'Icon', value: 'icon' },
      ],
    },
  }),
  separatorText: text('Separator Text', {
    value: '/',
    configuration: {
      condition: showIf('separatorType', 'EQ', 'text'),
    },
  }),
  separatorIcon: icon('Separator Icon', {
    value: 'ChevronRight',
    configuration: {
      condition: showIf('separatorType', 'EQ', 'icon'),
    },
  }),

  ...advanced('Breadcrumbs'),
};
