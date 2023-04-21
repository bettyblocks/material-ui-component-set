import {
  Icon,
  InteractionType,
  PrefabInteraction,
  prefab,
} from '@betty-blocks/component-sdk';
import { numberWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [
  {
    name: 'Submit',
    sourceEvent: 'onBlur',
    ref: {
      targetComponentId: '#numberQuestionForm',
      sourceComponentId: '#numberInput',
    },
    type: InteractionType.Custom,
  },
];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.NumberInputIcon,
  keywords: ['question', 'number', 'number question'],
  interactions,
};

export default prefab('Number Question', attributes, undefined, numberWidget);
