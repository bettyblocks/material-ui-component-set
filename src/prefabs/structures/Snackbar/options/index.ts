import {
  toggle,
  variable,
  option,
  number,
  showIfTrue,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced settings',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const snackbarOptions = {
  visible: toggle('Toggle visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  content: variable('Content', {
    value: ['You can also drag an alert component here for example'],
  }),
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

  ...advanced('Snackbar'),
};
