import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Calendar } from './structures';

const attr = {
  icon: Icon.CardContentIcon,
  category: 'LAYOUT',
  keywords: ['calendar', 'fullcalendar', 'agenda', 'date'],
};

export default prefab('Calendar', attr, undefined, [
    Calendar({}, [
  ]),
]);
