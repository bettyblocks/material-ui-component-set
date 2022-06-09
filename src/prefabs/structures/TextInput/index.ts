import {
  component,
  OptionProducer,
  PrefabComponent,
} from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { deleteActionVariable } from '../../hooks/deleteActionVariable';
import { options as defaults } from './options';

export interface Configuration {
  options?: Record<string, OptionProducer>;
  validationPattern?: string;
  adornmentIcon?: string;
  label?: string;
  inputLabel?: string;
  type?: HTMLInputElement['type'];
  pattern?: string;
}

const $afterDelete = [deleteActionVariable];

export const TextInput = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };

  if (config.type) {
    options.type = updateOption(options.type, { value: config.type });
  }

  if (config.validationPattern) {
    options.pattern = updateOption(options.pattern, {
      value: [config.validationPattern],
    });
  }

  if (config.inputLabel) {
    options.label = updateOption(options.label, { value: [config.inputLabel] });
  }

  if (config.pattern) {
    options.pattern = updateOption(options.pattern, {
      value: config.pattern,
      configuration: {
        ...(<object>options.pattern('pattern').configuration),
        placeholder: config.pattern,
      },
    });
  }

  if (config.adornmentIcon) {
    options.adornmentIcon = updateOption(options.adornmentIcon, {
      value: config.adornmentIcon,
    });
  }

  return component(
    'TextInput',
    { label: config.label, options, $afterDelete },
    children,
  );
};
