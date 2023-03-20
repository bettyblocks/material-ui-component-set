import {
  ThemeColor,
  childSelector,
  color,
  hideIf,
  option,
  showIf,
  toggle,
  variable,
  addChild,
  reconfigure,
  icon,
  font,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';
import { Step } from '../../Step';
import { stepOptions } from '../../Step/options';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: [
      'font',
      'activeColor',
      'inactiveColor',
      'activeLabelColor',
      'inactiveLabelColor',
      'backgroundColor',
      'connectorColor',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

const children = [
  Step({
    options: {
      ...stepOptions,
      label: variable('Label', {
        value: ['Step'],
        showInAddChild: true,
        showInReconfigure: true,
      }),
      icon: icon('Icon', {
        value: 'None',
        showInAddChild: true,
        showInReconfigure: true,
      }),
    },
  }),
];

export const stepperOptions = {
  reconfigure: reconfigure('Reconfigure', {
    value: { children, reconfigureWizardType: 'ChildrenSelector' },
  }),
  addChild: addChild('Add Step', {
    value: { children, addChildWizardType: 'ChildSelector' },
  }),
  activeStep: childSelector('Selected step (runtime)', { value: 1 }),
  selectedDesignStepIndex: childSelector('Selected step (design)', {
    value: 1,
  }),
  allSteps: toggle('Show all steps', { value: false }),
  type: option('CUSTOM', {
    label: 'Type',
    value: 'horizontal',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Horizontal', value: 'horizontal' },
        { name: 'Vertical', value: 'vertical' },
        { name: 'Mobile', value: 'mobile' },
      ],
    },
  }),
  variant: option('CUSTOM', {
    label: 'Variant',
    value: 'non-linear',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Linear', value: 'linear' },
        { name: 'Non-linear', value: 'non-linear' },
      ],
      condition: hideIf('type', 'EQ', 'mobile'),
    },
  }),
  alternativeLabel: toggle('Alternative label', {
    value: false,
    configuration: {
      condition: hideIf('type', 'EQ', 'mobile'),
    },
  }),
  font: font('Step text style', { value: 'Body1' }),
  activeColor: color('Active color', { value: ThemeColor.PRIMARY }),
  activeLabelColor: color('Active Label color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: hideIf('type', 'EQ', 'mobile'),
    },
  }),
  inactiveColor: color('Inactive color', { value: ThemeColor.SECONDARY }),
  inactiveLabelColor: color('Inactive Label color', {
    value: ThemeColor.MEDIUM,
    configuration: {
      condition: hideIf('type', 'EQ', 'mobile'),
    },
  }),
  backgroundColor: color('Background color', { value: ThemeColor.WHITE }),
  connectorColor: color('Connector color', {
    value: ThemeColor.LIGHT,
    configuration: {
      condition: hideIf('type', 'EQ', 'mobile'),
    },
  }),
  stepProgressColor: color('Step Progress color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: showIf('type', 'EQ', 'mobile'),
    },
  }),
  buttonNext: variable('Button next text', {
    value: ['Next'],
    configuration: {
      condition: showIf('type', 'EQ', 'mobile'),
    },
  }),
  buttonPrev: variable('Button previous text', {
    value: ['Back'],
    configuration: {
      condition: showIf('type', 'EQ', 'mobile'),
    },
  }),

  ...advanced('Stepper'),
};
