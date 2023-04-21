import {
  Icon,
  InteractionType,
  PrefabInteraction,
  prefab,
} from '@betty-blocks/component-sdk';
import { checkboxWidget } from './questionnaire';

const interactions: PrefabInteraction[] = [
  {
    name: 'Submit',
    sourceEvent: 'onChange',
    ref: {
      targetComponentId: '#checkboxQuestionForm',
      sourceComponentId: '#checkboxInput',
    },
    type: InteractionType.Custom,
  },
];

const attributes = {
  category: 'WIDGETS',
  icon: Icon.CheckboxIcon,
  keywords: ['question', 'check', 'checkbox', 'checkbox question'],
  interactions,
};

export default prefab(
  'Checkbox question',
  attributes,
  undefined,
  checkboxWidget,
);
