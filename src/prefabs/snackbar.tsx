import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Snackbar } from './structures/Snackbar';

const attr = {
  icon: Icon.SnackbarIcon,
  category: 'CONTENT',
  keywords: [
    'Content',
    'snack',
    'bar',
    'snackbar',
    'toaster',
    'notification',
    'frikadel',
  ],
};

export default prefab('Snackbar', attr, undefined, [Snackbar({}, [])]);
