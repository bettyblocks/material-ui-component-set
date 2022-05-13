import {
  component,
  PrefabReference,
  OptionProducer,
} from '@betty-blocks/component-sdk';
import { options as defaults } from './options';

export interface Configuration {
  options?: Record<string, OptionProducer>;
}

export const Box = (config: Configuration): PrefabReference => {
  const options = { ...defaults, ...config.options };

  return component('Box', { options }, []);
};
