import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Progress } from './structures/Progress';

const attr = {
  icon: Icon.ProgressBarIcon,
  category: 'CONTENT',
  keywords: ['Content', 'progress', 'bar', 'progressbar'],
};

export default prefab('Progress Bar', attr, undefined, [Progress({}, [])]);
