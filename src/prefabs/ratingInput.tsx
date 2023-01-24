import { prefab, Icon } from '@betty-blocks/component-sdk';

import { RatingInput } from './structures/RatingInput';

const attributes = {
  category: 'CONTENT',
  icon: Icon.TitleIcon,
  keywords: [''],
};

export default prefab('RatingInput', attributes, undefined, [RatingInput({})]);
