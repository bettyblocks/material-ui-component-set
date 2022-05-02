import { component, PrefabComponentOption } from '@betty-blocks/component-sdk';
import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { updateOption } from '../../../utils';
import { deleteActionVariable } from '../../hooks/deleteActionVariable';
import { options as defaults } from './options';

// TODO: export OptionProducer from the sdk
type OptionProducer = (key: string) => PrefabComponentOption;

export interface Configuration {
  options?: Record<string, OptionProducer>;
  validationPattern?: string;
  adornmentIcon?: string;
  label?: string;
  type?: HTMLInputElement['type'];
  pattern?: string;
}

const $afterDelete = [deleteActionVariable];

export const SingleValueAutocompleteInput = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };

  // if (config.type) {
  //   options.type = updateOption(options.type, { value: config.type });
  // }

  // if (config.validationPattern) {
  //   options.pattern = updateOption(options.pattern, {
  //     value: [config.validationPattern],
  //   });
  // }

  if (config.label) {
    options.label = updateOption(options.label, { value: [config.label] });
  }

  // if (config.pattern) {
  //   options.pattern = updateOption(options.pattern, {
  //     value: config.pattern,
  //     configuration: {
  //       ...(<object>options.pattern('pattern').configuration),
  //       placeholder: config.pattern,
  //     },
  //   });
  // }

  // if (config.adornmentIcon) {
  //   options.adornmentIcon = updateOption(options.adornmentIcon, {
  //     value: config.adornmentIcon,
  //   });
  // }

  return component(
    'Single Value Autocomplete Input',
    { options, $afterDelete },
    children,
  );
};
