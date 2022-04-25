import { component, PrefabComponentOption } from '@betty-blocks/component-sdk';
import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
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

export const DateTimePicker = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };
  
  return component('DateTimePickerInput', { options, $afterDelete }, children);
};
