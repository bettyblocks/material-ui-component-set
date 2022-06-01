import { component, PrefabComponentOption, option } from '@betty-blocks/component-sdk';
import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import {options as defaults} from './options';

type OptionProducer = (key: string) => PrefabComponentOption;

export interface Configuration {
  label?: string;
  options?: Record<string, OptionProducer>;
}
export const Row = (
  config: Configuration,
  descendants: PrefabComponent[] = [],
  ) => {
    const options = { ...(config.options || defaults) };
    return component('Row', { options } , descendants);
  }