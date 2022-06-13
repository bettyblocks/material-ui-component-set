import {
  component,
  PrefabComponentOption,
  PrefabComponent,
} from '@betty-blocks/component-sdk';
import { options as defaults } from './options';

type OptionProducer = (key: string) => PrefabComponentOption;

export interface Configuration {
  options?: Record<string, OptionProducer>;
}

export const Container = (
  config: Configuration,
  descendants: PrefabComponent[] = [],
): PrefabComponent => {
  const options = { ...(config.options || defaults) };
  return component('Container', { options }, descendants);
};
