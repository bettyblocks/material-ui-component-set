import { prefab, Icon } from '@betty-blocks/component-sdk';
import { PageContent } from './structures/PageContent';

const attr = {
  icon: Icon.RowColumnIcon,
  category: 'HIDDEN',
  keywords: [],
};

export default prefab('PageContent', attr, undefined, [PageContent({}, [])]);
