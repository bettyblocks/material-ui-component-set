import {
  font,
  Icon,
  prefab,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { Card } from './structures/Card';
import { CardActions } from './structures/CardActions';
import { CardContent } from './structures/CardContent';
import { CardHeader } from './structures/Cardheader';
import { CardMedia } from './structures/CardMedia';
import { Text } from './structures/Text';
import { OpenPageButton } from './structures/OpenPage';
import { options as textOptions } from './structures/Text/options/index';
import { options as openPageButtonOptions } from './structures/OpenPage/options/index';

const attr = {
  icon: Icon.CardIcon,
  category: 'CARDS',
  keywords: ['Card'],
};

export default prefab('Card', attr, undefined, [
  Card({}, [
    CardHeader({}, []),
    CardMedia({}, []),
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
    CardActions({}, [
      OpenPageButton(
        {
          options: {
            ...openPageButtonOptions,
            buttonText: variable('Button text', {
              value: ['Button'],
            }),
          },
        },
        [],
      ),
    ]),
  ]),
]);
