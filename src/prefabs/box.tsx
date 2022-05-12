import { component, option, prefab, Icon } from '@betty-blocks/component-sdk';

const attributes = {
  category: 'LAYOUT',
  icon: Icon.ContainerIcon,
  keywords: ['Layout', 'box'],
};

export const boxOptions = {
  alignment: option('CUSTOM', {
    value: 'none',
    label: 'Alignment',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'None', value: 'none' },
        { name: 'Left', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'Right', value: 'flex-end' },
        { name: 'Justified', value: 'space-between' },
      ],
    },
  }),
  valignment: option('CUSTOM', {
    value: 'none',
    label: 'Vertical alignment',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'None', value: 'none' },
        { name: 'Top', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'Bottom', value: 'flex-end' },
      ],
    },
  }),
  stretch: option('TOGGLE', {
    value: false,
    label: 'Stretch (when in flex container)',
  }),
  transparent: option('TOGGLE', {
    value: false,
    label: 'Transparent',
  }),
  height: option('SIZE', {
    label: 'Height',
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  width: option('SIZE', {
    label: 'Width',
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  outerSpacing: option('SIZES', {
    value: ['0rem', '0rem', '0rem', '0rem'],
    label: 'Outer space',
  }),
  innerSpacing: option('SIZES', {
    value: ['M', 'M', 'M', 'M'],
    label: 'Inner space',
  }),
  positioningOptions: option('TOGGLE', {
    value: false,
    label: 'Show positioning options',
  }),
  position: option('CUSTOM', {
    value: 'static',
    label: 'Position',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Static', value: 'static' },
        { name: 'Relative', value: 'relative' },
        { name: 'Absolute', value: 'absolute' },
        { name: 'Fixed', value: 'fixed' },
        { name: 'Sticky', value: 'sticky' },
      ],
      condition: {
        type: 'SHOW',
        option: 'positioningOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  top: option('SIZE', {
    label: 'Top position',
    value: '',
    configuration: {
      as: 'UNIT',
      condition: {
        type: 'SHOW',
        option: 'positioningOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  right: option('SIZE', {
    label: 'Right position',
    value: '',
    configuration: {
      as: 'UNIT',
      condition: {
        type: 'SHOW',
        option: 'positioningOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  bottom: option('SIZE', {
    label: 'Bottom position',
    value: '',
    configuration: {
      as: 'UNIT',
      condition: {
        type: 'SHOW',
        option: 'positioningOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  left: option('SIZE', {
    label: 'Left position',
    value: '',
    configuration: {
      as: 'UNIT',
      condition: {
        type: 'SHOW',
        option: 'positioningOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  backgroundOptions: option('TOGGLE', {
    value: false,
    label: 'Show background options',
  }),
  backgroundColor: option('COLOR', {
    value: 'Transparent',
    label: 'Background color',
    configuration: {
      condition: {
        type: 'SHOW',
        option: 'backgroundOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  backgroundColorAlpha: option('NUMBER', {
    value: 100,
    label: 'Background color opacity',
    configuration: {
      condition: {
        type: 'SHOW',
        option: 'backgroundOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  backgroundUrl: option('VARIABLE', {
    value: [''],
    label: 'Background url',
    configuration: {
      condition: {
        type: 'SHOW',
        option: 'backgroundOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  backgroundSize: option('CUSTOM', {
    value: 'initial',
    label: 'Background size',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Initial', value: 'initial' },
        { name: 'Contain', value: 'contain' },
        { name: 'Cover', value: 'cover' },
      ],
      condition: {
        type: 'SHOW',
        option: 'backgroundOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  backgroundPosition: option('CUSTOM', {
    value: 'center center',
    label: 'Background position',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'Left top', value: 'left top' },
        { name: 'Left center', value: 'left center' },
        { name: 'Left bottom', value: 'left bottom' },
        { name: 'Center top', value: 'center top' },
        { name: 'Center center', value: 'center center' },
        { name: 'Center bottom', value: 'center bottom' },
        { name: 'Right top', value: 'right top' },
        { name: 'Right center', value: 'right center' },
        { name: 'Right bottom', value: 'right bottom' },
      ],
      condition: {
        type: 'SHOW',
        option: 'backgroundOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  backgroundRepeat: option('CUSTOM', {
    value: 'no-repeat',
    label: 'Background repeat',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'None', value: 'no-repeat' },
        { name: 'X', value: 'repeat-x' },
        { name: 'Y', value: 'repeat-y' },
        { name: 'All', value: 'repeat' },
      ],
      condition: {
        type: 'SHOW',
        option: 'backgroundOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  backgroundAttachment: option('CUSTOM', {
    value: 'inherit',
    label: 'Background attachment',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Inherit', value: 'inherit' },
        { name: 'Scroll', value: 'scroll' },
        { name: 'Fixed', value: 'fixed' },
      ],
      condition: {
        type: 'SHOW',
        option: 'backgroundOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  borderColor: option('COLOR', {
    value: 'Transparent',
    label: 'Border color',
    configuration: {
      condition: {
        type: 'SHOW',
        option: 'backgroundOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  borderWidth: option('SIZE', {
    label: 'Border thickness',
    value: '',
    configuration: {
      as: 'UNIT',
      condition: {
        type: 'SHOW',
        option: 'backgroundOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  borderStyle: option('CUSTOM', {
    value: 'solid',
    label: 'Border style',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'None', value: 'none' },
        { name: 'Solid', value: 'solid' },
        { name: 'Dashed', value: 'dashed' },
        { name: 'Dotted', value: 'dotted' },
      ],
      condition: {
        type: 'SHOW',
        option: 'backgroundOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  borderRadius: option('SIZE', {
    label: 'Border radius',
    value: '',
    configuration: {
      as: 'UNIT',
      condition: {
        type: 'SHOW',
        option: 'backgroundOptions',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  advancedSettings: option('TOGGLE', {
    value: false,
    label: 'Advanced settings',
  }),
  dataComponentAttribute: option('VARIABLE', {
    label: 'Test attribute',
    value: ['Box'],
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

export default prefab('Box', attributes, undefined, [
  component('Box', { options: boxOptions }, []),
]);
