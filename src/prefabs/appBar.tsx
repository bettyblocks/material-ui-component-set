import {
  Icon,
  prefab,
  variable,
  styleReference,
} from '@betty-blocks/component-sdk';
import { AppBar, OpenPageButton, openPageButtonOptions } from './structures';

const attr = {
  icon: Icon.NavbarIcon,
  category: 'NAVIGATION',
  keywords: ['Navigation', 'bar', 'navigationbar', 'menu', 'navbar', 'appbar'],
};

export default prefab('Navigation Bar', attr, undefined, [
  AppBar({}, [
    OpenPageButton({
      options: {
        ...openPageButtonOptions,
        buttonText: variable('Button text', { value: ['Menu 1'] }),
      },
      style: styleReference('Filled', {
        overwrite: {
          basis: {
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: '400',
          },
        },
      }),
    }),
    OpenPageButton({
      options: {
        ...openPageButtonOptions,
        buttonText: variable('Button text', { value: ['Menu 2'] }),
      },
      style: styleReference('Filled', {
        overwrite: {
          basis: {
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: '400',
          },
        },
      }),
    }),
  ]),
]);
