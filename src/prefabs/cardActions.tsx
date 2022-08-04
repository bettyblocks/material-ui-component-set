import { Icon, prefab, variable } from '@betty-blocks/component-sdk';
import { CardActions } from './structures/CardActions';
import { OpenPageButton } from './structures/OpenPage';
import { openPageButtonOptions } from './structures/OpenPage/options/index';

const attr = {
  icon: Icon.CardActionsIcon,
  category: 'CARDS',
  keywords: ['Cards', 'card', 'actions', 'cardactions'],
};

openPageButtonOptions.buttonText = variable('Button text', {
  value: ['Button'],
});

export default prefab('Card Actions', attr, undefined, [
  CardActions({}, [OpenPageButton({ options: openPageButtonOptions }, [])]),
]);
