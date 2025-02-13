import { prefab, Icon } from '@betty-blocks/component-sdk';

import { RatingInput } from './structures/RatingInput';

const attributes = {
  category: 'FORM',
  icon: Icon.RatingIcon,
  keywords: ['FORM', 'INPUT', 'RATING'],
};

export default prefab('Rating', attributes, undefined, [RatingInput({})]);
