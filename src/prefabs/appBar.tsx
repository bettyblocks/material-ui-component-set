import { Icon, prefab, variable } from '@betty-blocks/component-sdk';
import { AppBar } from './structures/Appbar';
import { OpenPageButton } from './structures/OpenPage';
import { options } from './structures/OpenPage/options';

const attr = {
  icon: Icon.NavbarIcon,
  category: 'NAVIGATION',
  keywords: ['Navigation', 'bar', 'navigationbar', 'menu', 'navbar', 'appbar'],
};
const optionsA = { ...options };
const optionsB = { ...options };
optionsA.buttonText = variable('Button text', { value: ['Menu 1'] });
optionsB.buttonText = variable('Button text', { value: ['Menu 2'] });

export default prefab('Navigation Bar', attr, undefined, [
  AppBar({}, [
    OpenPageButton({
      options: optionsA,
      style: {
        overwrite: {
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: '400',
        },
      },
    }),
    OpenPageButton({
      options: optionsB,
      style: {
        overwrite: {
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: '400',
        },
      },
    }),
  ]),
]);
