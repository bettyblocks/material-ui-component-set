import { Icon, prefab } from '@betty-blocks/component-sdk';
import { actionButton } from './structures/actionButton';

const attrs = {
  icon: Icon.ButtonIcon,
  category: 'BUTTON',
  keywords: ['Button'],
};
export default prefab('Action Button', attrs, undefined, [actionButton({})]);
