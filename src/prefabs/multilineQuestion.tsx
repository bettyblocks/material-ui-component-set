import { Icon, prefab, PrefabInteraction } from '@betty-blocks/component-sdk';
import { multilineWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.TextareaIcon,
  interactions,
  variables: [],
};

export default prefab(
  'Multiline question',
  attributes,
  undefined,
  multilineWidget,
);
