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
      'circleSideBarWidth',
      'circleWidth',
      'circleColor',
      'circleTextColor',
      'circleLabelColor',
      'circleBorderColor',
      'inactiveCircleColor',
      'inactiveCircleTextColor',
      'inactiveCircleLabelColor',
      'inactiveCircleBorderColor',
      'connectorColor',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['preLoadTabs', 'disableMenuClick', 'dataComponentAttribute'],
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
  layout: option('CUSTOM', {
    label: 'Layout',
    value: 'default',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Default', value: 'default' },
        { name: 'Circle', value: 'circle' },
      ],
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
  appBarColor: color('Bar color', {
    value: ThemeColor.PRIMARY,
    configuration: {
      condition: showIf('layout', 'EQ', 'default'),
    },
  }),
  font: font('Text style', { value: 'Body1' }),
  textColor: color('Text color', {
    value: ThemeColor.WHITE,
    configuration: {
      condition: showIf('layout', 'EQ', 'default'),
    },
  }),
  circleSideBarWidth: size('Circle Sidebar Width', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  circleWidth: size('Circle width', {
    value: '33px',
    configuration: {
      as: 'UNIT',
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  circleColor: color('Active circle color', {
    value: ThemeColor.PRIMARY,
    configuration: {
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  circleTextColor: color('Active circle text color', {
    value: ThemeColor.WHITE,
    configuration: {
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  circleLabelColor: color('Active circle label color', {
    value: ThemeColor.PRIMARY,
    configuration: {
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  circleBorderColor: color('Active circle border color', {
    value: ThemeColor.TRANSPARENT,
    configuration: {
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  inactiveCircleColor: color('Inactive circle color', {
    value: ThemeColor.WHITE,
    configuration: {
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  inactiveCircleTextColor: color('Inactive circle text color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  inactiveCircleLabelColor: color('Inactive circle label color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  inactiveCircleBorderColor: color('Inactive circle border color', {
    value: ThemeColor.ACCENT_1,
    configuration: {
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  connectorColor: color('Connector color', {
    value: ThemeColor.ACCENT_1,
    configuration: {
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  indicatorColor: color('Indicator color', {
    value: ThemeColor.SUCCESS,
    configuration: {
      condition: showIf('layout', 'EQ', 'default'),
    },
  }),
  hideTabs: toggle('Hide visual tabs', { value: false }),
  preLoadTabs: toggle('Preload data in all tabs', {
    value: true,
  }),
  disableMenuClick: toggle('Disable navigation buttons', {
    value: false,
    configuration: {
      condition: showIf('layout', 'EQ', 'circle'),
    },
  }),
  ...advanced('Tabs'),
};
