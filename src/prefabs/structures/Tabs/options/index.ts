import {
  ThemeColor,
  childSelector,
  color,
  option,
  showIf,
  size,
  toggle,
  reconfigure,
  addChild,
  variable,
  icon,
  hideIf,
  font,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';
import { Tab } from '../../Tab';
import { tabOptions } from '../../Tab/options';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: [
      'height',
      'width',
      'appBarColor',
      'font',
      'textColor',
      'indicatorColor',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['preLoadTabs', 'dataComponentAttribute'],
  },
];

const children = [
  Tab({
    options: {
      ...tabOptions,
      label: variable('Tab label', {
        value: ['TAB'],
        showInAddChild: true,
        showInReconfigure: true,
      }),
      icon: icon('Icon', {
        value: 'None',
        showInAddChild: true,
        showInReconfigure: true,
      }),
      iconAlignment: option('CUSTOM', {
        label: 'Icon Alignment',
        value: 'top',
        configuration: {
          as: 'BUTTONGROUP',
          dataType: 'string',
          allowedInput: [
            { name: 'Left', value: 'left' },
            { name: 'Top', value: 'top' },
            { name: 'Right', value: 'right' },
            { name: 'Bottom', value: 'bottom' },
          ],
          condition: hideIf('icon', 'EQ', 'None'),
        },
        showInAddChild: true,
      }),
    },
  }),
];

export const tabsOptions = {
  reconfigure: reconfigure('Reconfigure', {
    value: { children, reconfigureWizardType: 'ChildrenSelector' },
  }),
  addChild: addChild('Add Tab', {
    value: { children, addChildWizardType: 'ChildSelector' },
  }),
  defaultValue: childSelector('Selected tab (runtime)', {
    value: 1,
    configuration: {
      as: 'DROPDOWN',
    },
  }),
  selectedDesignTabIndex: childSelector('Selected tab (design)', {
    value: 1,
    configuration: {
      as: 'DROPDOWN',
    },
  }),
  showAllTabs: toggle('Show all tabs', { value: false }),
  height: size('Height', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  width: size('Width', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  alignment: option('CUSTOM', {
    value: 'top',
    label: 'Alignment',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Left', value: 'left' },
        { name: 'Top', value: 'top' },
        { name: 'Right', value: 'right' },
        { name: 'Bottom', value: 'bottom' },
      ],
    },
  }),
  variant: option('CUSTOM', {
    label: 'Variant',
    value: 'standard',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Standard', value: 'standard' },
        { name: 'Scrollable', value: 'scrollable' },
        { name: 'Full width', value: 'fullWidth' },
      ],
    },
  }),
  scrollButtons: option('CUSTOM', {
    label: 'Scrollbuttons',
    value: 'auto',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Auto', value: 'auto' },
        { name: 'Desktop', value: 'desktop' },
        { name: 'Always', value: 'on' },
        { name: 'Never', value: 'off' },
      ],
      condition: showIf('variant', 'EQ', 'scrollable'),
    },
  }),
  centered: toggle('Centered', {
    value: false,
    configuration: {
      condition: showIf('orientation', 'EQ', 'horizontal'),
    },
  }),
  appBarColor: color('Bar color', { value: ThemeColor.PRIMARY }),
  font: font('Text style', { value: 'Body1' }),
  textColor: color('Text color', { value: ThemeColor.WHITE }),
  indicatorColor: color('Indicator color', { value: ThemeColor.SUCCESS }),
  hideTabs: toggle('Hide visual tabs', { value: false }),
  preLoadTabs: toggle('Preload data in all tabs', {
    value: true,
  }),

  ...advanced('Tabs'),
};
