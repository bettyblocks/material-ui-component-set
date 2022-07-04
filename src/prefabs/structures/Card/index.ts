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

export const Card = (
  config: Configuration,
  descendants: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };
  return component('Card', { options }, descendants);
};
