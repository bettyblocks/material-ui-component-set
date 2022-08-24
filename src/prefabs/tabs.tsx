import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Tab, Tabs } from './structures';

const attr = {
  icon: Icon.TabsIcon,
  category: 'NAVIGATION',
  keywords: ['Navigation', 'tabs'],
};

export default prefab('Tabs', attr, undefined, [Tabs({}, [Tab({}, [])])]);
