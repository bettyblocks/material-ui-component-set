import { Icon, prefab } from '@betty-blocks/component-sdk';
import { ActionButton } from './structures/ActionButton';

const attrs = {
  icon: Icon.ButtonIcon,
  category: 'BUTTON',
  keywords: ['Button', 'action'],
};
export default prefab('Action Button', attrs, undefined, [ActionButton({})]);
