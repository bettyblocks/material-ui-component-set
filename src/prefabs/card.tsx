import { font, Icon, prefab, variable } from '@betty-blocks/component-sdk';
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
    CardActions({}, [
      OpenPageButton(
        {
          options: {
            ...openPageButtonOptions,
            buttonText: variable('Button text', {
              ...openPageButtonOptions.buttonText('buttonText'),
              value: ['Button'],
            }),
          },
        },
        [],
      ),
    ]),
  ]),
]);
