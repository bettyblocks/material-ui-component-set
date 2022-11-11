import { Icon, prefab } from '@betty-blocks/component-sdk';
import { ActionJSButton } from './structures/ActionJSButton';

const attributes = {
  category: 'BUTTON',
  icon: Icon.ButtonIcon,
  keywords: ['Button', 'Action', 'input'],
};

export default prefab('Action Button', attributes, undefined, [
  ActionJSButton({}),
]);
