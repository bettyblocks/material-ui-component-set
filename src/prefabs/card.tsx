import {
  font,
  Icon,
  prefab,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Text,
  OpenPageButton,
  textOptions,
  openPageButtonOptions,
} from './structures';

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
