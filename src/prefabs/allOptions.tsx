import { prefab, Icon } from '@betty-blocks/component-sdk';

import { AllOptions } from './structures/AllOptions';

const attributes = {
  category: 'CONTENT',
  icon: Icon.TitleIcon,
  keywords: [''],
};

export default prefab('AllOptions', attributes, undefined, [AllOptions({})]);
