import {
  OptionCategory,
  OptionProducer,
  OptionTemplates,
  PrefabComponentStyle,
} from '@betty-blocks/component-sdk';
import { InputType } from '../helpers/getAllowedKindsByType';

export interface Configuration {
  options?: Record<string, OptionProducer>;
  optionTemplates?: OptionTemplates;
  adornmentIcon?: string;
  label?: string;
  inputLabel?: string;
  type?: HTMLInputElement['type'];
  style?: PrefabComponentStyle;
  ref?: { id: string };
  inputType?: InputType;
  placeholder?: string;
  dataComponentAttribute?: string;
  optionCategories?: OptionCategory[];
  validationPattern?: string;
  pattern?: string;
}
