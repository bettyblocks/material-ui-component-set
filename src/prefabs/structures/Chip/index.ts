import {
  component,
  PrefabReference,
  OptionProducer,
  PrefabComponentStyle,
} from '@betty-blocks/component-sdk';
import { options as defaults } from './options';

export interface Configuration {
  options?: Record<string, OptionProducer>;
  style?: PrefabComponentStyle;
}

export const Chip = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const style = { ...config.style };

  return component('Chip', { options, style }, descendants);
};
