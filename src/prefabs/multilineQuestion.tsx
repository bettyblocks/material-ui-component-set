import {
  Icon,
  InteractionType,
  PrefabInteraction,
  prefab,
} from '@betty-blocks/component-sdk';
import { multilineWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [
  {
    name: 'Submit',
    sourceEvent: 'onBlur',
    ref: {
      targetComponentId: '#multilineQuestionForm',
      sourceComponentId: '#textInput',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#ParentDataContainer',
      sourceComponentId: '#multilineQuestionForm',
    },
    type: InteractionType.Custom,
  },
];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.TextareaIcon,
  keywords: ['question', 'text', 'multiline', 'multiline question'],
  interactions,
};

export default prefab(
  'Multiline question',
  attributes,
  undefined,
  multilineWidget,
);
