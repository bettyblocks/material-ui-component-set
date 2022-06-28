import { Icon, prefab } from '@betty-blocks/component-sdk';
import { ActionButton } from './structures/ActionButton';

const actions = [
  {
    name: 'New Action',
    ref: {
      id: '#actionId',
      endpointId: '#endpointId',
    },
    useNewRuntime: false,
    events: [],
  },
];

const attrs = {
  icon: Icon.ButtonIcon,
  category: 'BUTTON',
  keywords: ['Button', 'action'],
  actions,
};
export default prefab('Action Button', attrs, undefined, [ActionButton({})]);
