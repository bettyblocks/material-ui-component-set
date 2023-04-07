import { Icon, prefab, PrefabInteraction } from '@betty-blocks/component-sdk';
import { dateWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.DatePickerIcon,
  interactions,
  variables: [],
};

export default prefab('Date question', attributes, undefined, dateWidget);
