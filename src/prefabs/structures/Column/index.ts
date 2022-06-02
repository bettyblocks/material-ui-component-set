import { component, PrefabComponentOption } from '@betty-blocks/component-sdk';
import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { options as Headers } from './options';

type OptionProducer = (key: string) => PrefabComponentOption;

export interface Configuration {
  label?: string;
  options?: Record<string, OptionProducer>;
}

export const Column = (
  config: Configuration,
  descendants: PrefabComponent[] = [],
): PrefabComponent => {
  const options = { ...(config.options || Headers) };
  return component('Column', { options }, descendants);
};
