import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Button } from './structures';

const attrs = {
  icon: Icon.ButtonIcon,
  category: 'BUTTON',
  keywords: ['Button'],
};
export default prefab('Button', attrs, undefined, [Button({})]);
