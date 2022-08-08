import { Icon, prefab } from '@betty-blocks/component-sdk';
import { CardHeader } from './structures';

const attr = {
  icon: Icon.CardHeaderIcon,
  category: 'CARDS',
  keywords: ['Cards', 'card', 'header', 'cardheader'],
};

export default prefab('Card Header', attr, undefined, [CardHeader({}, [])]);
