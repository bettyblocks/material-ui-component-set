import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Step } from './structures';

const attr = {
  icon: Icon.StepIcon,
  category: 'NAVIGATION',
  keywords: ['Navigation', 'step'],
};

export default prefab('Step', attr, undefined, [Step({}, [])]);
