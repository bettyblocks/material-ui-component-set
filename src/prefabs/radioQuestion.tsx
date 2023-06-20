import {
  Icon,
  InteractionType,
  PrefabInteraction,
  prefab,
} from '@betty-blocks/component-sdk';
import { radioWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [
  {
    name: 'Submit',
    sourceEvent: 'onChange',
    ref: {
      targetComponentId: '#radioQuestionForm',
      sourceComponentId: '#radioInput',
    },
    type: InteractionType.Custom,
  },
];
const attributes = {
  category: 'WIDGETS',
  icon: Icon.RadioButtonIcon,
  keywords: [
    'question',
    'radio',
    'multiple',
    'choice',
    'multiple choice',
    'radio question',
  ],
  interactions,
};

export default prefab(
  'Multiple Choice question',
  attributes,
  undefined,
  radioWidget,
);
