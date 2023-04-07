import { Icon, prefab, PrefabInteraction } from '@betty-blocks/component-sdk';
import { checkboxWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.CheckboxIcon,
  interactions,
  variables: [],
};

export default prefab(
  'Checkbox question',
  attributes,
  undefined,
  checkboxWidget,
);
