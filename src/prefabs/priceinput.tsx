import { Icon, prefab } from '@betty-blocks/component-sdk';

import { PriceInput } from './structures/PriceInput';

const attributes = {
  category: 'FORM',
  icon: Icon.PriceInputIcon,
  keywords: ['Form', 'input'],
};

const pattern = '[0-9]+(\\.[0-9][0-9]?)?';

export default prefab('Price', attributes, undefined, [
  PriceInput({
    label: 'Price field',
    inputLabel: 'Price',
    type: 'decimal',
    pattern,
  }),
]);
