import { component, PrefabComponentOption } from '@betty-blocks/component-sdk';
import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { updateOption } from '../../../utils';
import { deleteActionVariable } from '../../hooks/deleteActionVariable';
import { options as defaults } from './options';

// TODO: export OptionProducer from the sdk
type OptionProducer = (key: string) => PrefabComponentOption;

export interface Configuration {
  options?: Record<string, OptionProducer>;
  adornmentIcon?: string;
  label?: string;
  type?: HTMLInputElement['type'];
}

const $afterDelete = [deleteActionVariable];

export const AutocompleteInput = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };

  if (config.type) {
    options.type = updateOption(options.type, { value: config.type });
  }

  if (config.label) {
    options.label = updateOption(options.label, { value: [config.label] });
  }

  if (config.adornmentIcon) {
    options.adornmentIcon = updateOption(options.adornmentIcon, {
      value: config.adornmentIcon,
    });
  }

  return component('AutocompleteInput', { options, $afterDelete }, children);
};
