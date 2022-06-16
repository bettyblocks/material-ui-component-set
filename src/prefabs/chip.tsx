import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Chip } from './structures/Chip';

const attr = {
  icon: Icon.ChipIcon,
  category: 'CONTENT',
  keywords: ['Content', 'chip'],
};

export default prefab('Chip', attr, undefined, [Chip({}, [])]);
