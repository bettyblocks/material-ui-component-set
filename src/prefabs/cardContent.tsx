import { font, Icon, prefab, toggle } from '@betty-blocks/component-sdk';
import { CardContent } from './structures/CardContent';
import { Text } from './structures/Text';
import { textOptions } from './structures/Text/options/index';

const attr = {
  icon: Icon.CardContentIcon,
  category: 'CARDS',
  keywords: ['Cards', 'card', 'content', 'cardcontent'],
};

export default prefab('Card Content', attr, undefined, [
  CardContent({}, [
    Text(
      {
        options: {
          ...textOptions,
          type: font('Font', { value: ['Title5'] }),
        },
      },
      [],
    ),
    Text(
      {
        options: {
          ...textOptions,
          type: font('Font', { value: ['Body2'] }),
          useInnerHtml: toggle('Display Rich Text', {
            value: false,
          }),
        },
      },
      [],
    ),
  ]),
]);
