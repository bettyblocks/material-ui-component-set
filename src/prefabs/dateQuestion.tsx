import {
  Icon,
  InteractionType,
  PrefabInteraction,
  prefab,
} from '@betty-blocks/component-sdk';
import { dateWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [
  {
    name: 'Submit',
    sourceEvent: 'onChange',
    ref: {
      targetComponentId: '#dateQuestionForm',
      sourceComponentId: '#dateInput',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#ParentDataContainer',
      sourceComponentId: '#dateQuestionForm',
    },
    type: InteractionType.Custom,
  },
];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.DatePickerIcon,
  keywords: ['question', 'date', 'date question'],
  interactions,
};

export default prefab('Date question', attributes, undefined, dateWidget);
