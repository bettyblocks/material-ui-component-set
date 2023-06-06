import {
  Icon,
  InteractionType,
  PrefabInteraction,
  prefab,
} from '@betty-blocks/component-sdk';
import { dropdownWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [
  {
    name: 'Submit',
    sourceEvent: 'onChange',
    ref: {
      targetComponentId: '#dropdownQuestionForm',
      sourceComponentId: '#dropdownInput',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#ParentDataContainer',
      sourceComponentId: '#dropdownQuestionForm',
    },
    type: InteractionType.Custom,
  },
];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.SelectIcon,
  keywords: ['question', 'dropdown', 'dropdown question'],
  interactions,
};

export default prefab(
  'Dropdown question',
  attributes,
  undefined,
  dropdownWidget,
);
