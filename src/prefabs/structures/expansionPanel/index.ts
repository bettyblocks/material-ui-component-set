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
export const ExpansionPanel = (
  config: Configuration,
  descendants: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };
  return component('ExpansionPanel', { options }, descendants);
};
