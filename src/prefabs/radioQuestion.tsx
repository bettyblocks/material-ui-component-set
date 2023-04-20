import { Icon, prefab, PrefabInteraction } from '@betty-blocks/component-sdk';
import { radioWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.RadioButtonIcon,
  interactions,
  variables: [],
};

export default prefab(
  'Multiple choice question',
  attributes,
  undefined,
  radioWidget,
);
