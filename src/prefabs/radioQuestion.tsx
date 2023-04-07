import { Icon, prefab, PrefabInteraction } from '@betty-blocks/component-sdk';
import { dateWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.RadioButtonIcon,
  interactions,
  variables: [],
};

export default prefab(
  'Multiple Choice question',
  attributes,
  undefined,
  dateWidget,
);
