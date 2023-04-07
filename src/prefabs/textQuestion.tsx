import { prefab, Icon, PrefabInteraction } from '@betty-blocks/component-sdk';
import { textWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.TextInputIcon,
  interactions,
  variables: [],
};

export default prefab('Text Question', attributes, undefined, textWidget);
