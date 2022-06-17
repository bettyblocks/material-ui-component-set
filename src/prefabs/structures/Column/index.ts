import {
  component,
  PrefabComponentOption,
  PrefabComponent,
} from '@betty-blocks/component-sdk';
import { options as defaults } from './options';

type OptionProducer = (key: string) => PrefabComponentOption;

export interface Configuration {
  label?: string;
  options?: Record<string, OptionProducer>;
}

export const Column = (
  config: Configuration,
  descendants: PrefabComponent[] = [],
): PrefabComponent => {
  const options = { ...(config.options || defaults) };
  return component('Column', { options }, descendants);
};
