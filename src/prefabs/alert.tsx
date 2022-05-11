import {
  component,
  option,
  prefab,
  Icon,
} from '@betty-blocks/component-sdk';


const attributes = {
  category: 'CONTENT',
  icon: Icon.AlertIcon,
  keywords: ['Content', 'alert', 'notification'],
};

export const alertOptions = {
  visible: option('TOGGLE', {
    label: 'Toggle visibility',
    value: true,
    configuration: { as: 'VISIBILITY' },
  }),
  bodyText: option('VARIABLE', {
    label: 'Body text',
    value: ['Type your content here...'],
  }),
  allowTextServerResponse: option('TOGGLE', {
    label: 'Allow to overwrite by the server response',
    value: false,
  }),
  titleText: option('VARIABLE', {
    label: 'Title text',
    value: [''],
  }),
  allowTitleServerResponse: option('TOGGLE', {
    label: 'Allow to overwrite by the server response',
    value: false,
  }),
  textColor: option('COLOR', {
    label: 'Text color',
    value: 'Black',
  }),
  iconColor: option('COLOR', {
    value: 'Black',
    label: 'Icon color',
  }),
  background: option('COLOR', {
    label: 'Background color',
    value: 'Success',
  }),
  borderColor: option('COLOR', {
    label: 'Border color',
    value: 'Transparent',
  }),
  icon: option('ICON', {
    label: 'Icon',
    value: 'None',
  }),
  collapsable: option('TOGGLE', {
    value: false,
    label: 'Collapsable',
  }),
  horizontalAlignment: option('CUSTOM', {
    label: 'Horizontal Alignment',
    value: 'flex-start',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Left', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'Right', value: 'flex-end' },
      ],
      condition: {
        type: 'HIDE',
        option: 'collapsable',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  verticalAlignment: option('CUSTOM', {
    label: 'Vertical Alignment',
    value: 'stretch',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Top', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'Bottom', value: 'flex-end' },
        { name: 'Justified', value: 'stretch' },
      ],
    },
  }),
  outerSpacing: option('SIZES', {
    value: ['0rem', '0rem', 'M', '0rem'],
    label: 'Outer space',
  }),
  advancedSettings: option('TOGGLE', {
    value: false,
    label: 'Advanced settings',
  }),
  dataComponentAttribute: option('VARIABLE', {
    label: 'Test attribute',
    value: ['Alert'],
    configuration: {
      condition: {
        type: 'SHOW',
        option: 'advancedSettings',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
};

export default prefab('Alert', attributes, undefined, [
  component('Alert', { options: alertOptions }, []),
]);
