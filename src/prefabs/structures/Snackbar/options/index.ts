import {
  toggle,
  variable,
  option,
  number,
  showIfTrue,
  font,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const snackbarOptions = {
  visible: toggle('Visible in builder', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  content: variable('Content', {
    value: ['You can also drag an alert component here for example'],
  }),
  font: font('Text style', { value: 'Body1' }),
  allowTextServerResponse: toggle('Allow to overwrite by the server response', {
    value: false,
  }),
  anchorOriginVertical: option('CUSTOM', {
    label: 'Vertical position',
    value: 'bottom',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        {
          name: 'Top',
          value: 'top',
        },
        {
          name: 'Bottom',
          value: 'bottom',
        },
      ],
    },
  }),
  anchorOriginHorizontal: option('CUSTOM', {
    label: 'Horizontal position',
    value: 'center',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Center',
          value: 'center',
        },
        {
          name: 'Right',
          value: 'right',
        },
      ],
    },
  }),
  autoHide: toggle('Auto hide', { value: true }),
  autoHideDuration: number('Auto Hide Duration (ms)', {
    value: 6000,
    configuration: {
      condition: showIfTrue('autoHide'),
    },
  }),
  runTimeVisibility: option('CUSTOM', {
    label: 'Initial State (RUNTIME)',
    value: 'false',
    configuration: {
      as: 'DROPDOWN',
      allowedInput: [
        { name: 'Visible', value: 'true' },
        { name: 'Hidden', value: 'false' },
      ],
    },
  }),

  ...advanced('Snackbar'),
};
