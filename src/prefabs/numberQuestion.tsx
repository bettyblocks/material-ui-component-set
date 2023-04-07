import { Icon, prefab, PrefabInteraction } from '@betty-blocks/component-sdk';
import { numberWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.NumberInputIcon,
  interactions,
  variables: [],
};

export default prefab('Number Question', attributes, undefined, numberWidget);
