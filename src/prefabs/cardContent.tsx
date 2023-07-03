import { font, Icon, prefab } from '@betty-blocks/component-sdk';
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
          type: font('Text style', {
            ...textOptions.type('type'),
            value: ['Title5'],
          }),
        },
      },
      [],
    ),
    Text(
      {
        options: {
          ...textOptions,
          type: font('Text style', {
            ...textOptions.type('type'),
            value: ['Body2'],
          }),
        },
      },
      [],
    ),
  ]),
]);
