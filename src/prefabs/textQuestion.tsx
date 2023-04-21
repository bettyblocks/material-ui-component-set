import {
  Icon,
  InteractionType,
  PrefabInteraction,
  prefab,
} from '@betty-blocks/component-sdk';
import { textWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [
  {
    name: 'Submit',
    sourceEvent: 'onBlur',
    ref: {
      targetComponentId: '#textQuestionForm',
      sourceComponentId: '#textInput',
    },
    type: InteractionType.Custom,
  },
];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.TextInputIcon,
  keywords: ['question', 'text', 'text question'],
  interactions,
};

export default prefab('Text Question', attributes, undefined, textWidget);
