import { Icon, prefab, PrefabInteraction } from '@betty-blocks/component-sdk';
import { dropdownWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.SelectIcon,
  interactions,
  variables: [],
};

export default prefab(
  'Dropdown question',
  attributes,
  undefined,
  dropdownWidget,
);
