import { font, Icon, prefab, toggle } from '@betty-blocks/component-sdk';
import { CardContent, Text, textOptions } from './structures';

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
          type: font('Text style', { value: ['Title5'] }),
        },
      },
      [],
    ),
    Text(
      {
        options: {
          ...textOptions,
          type: font('Text style', { value: ['Body2'] }),
          useInnerHtml: toggle('Display Rich Text', {
            value: false,
          }),
        },
      },
      [],
    ),
  ]),
]);
