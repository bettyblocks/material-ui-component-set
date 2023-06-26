import { Icon, prefab, variable } from '@betty-blocks/component-sdk';
import {
  CardActions,
  OpenPageButton,
  openPageButtonOptions,
} from './structures';

const attr = {
  icon: Icon.CardActionsIcon,
  category: 'CARDS',
  keywords: ['Cards', 'card', 'actions', 'cardactions'],
};

export default prefab('Card Actions', attr, undefined, [
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
]);
