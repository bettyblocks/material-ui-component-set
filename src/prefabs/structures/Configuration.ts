import {
  OptionCategory,
  OptionProducer,
  PrefabComponentStyle,
  OptionTemplates,
} from '@betty-blocks/component-sdk';

export interface Configuration {
  options?: Record<string, OptionProducer>;
  optionTemplates?: OptionTemplates;
  adornmentIcon?: string;
  label?: string;
  inputLabel?: string;
  type?: HTMLInputElement['type'];
  style?: PrefabComponentStyle;
  ref?: { id: string };
  inputType?: string;
  placeholder?: string;
  dataComponentAttribute?: string;
  optionCategories?: OptionCategory[];
  validationPattern?: string;
  pattern?: string;
}
