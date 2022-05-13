import { component, PrefabComponentOption } from '@betty-blocks/component-sdk';
import { PrefabReference } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { options as defaults } from './options';

// TODO: export OptionProducer from the sdk
type OptionProducer = (key: string) => PrefabComponentOption;

export interface Configuration {
  options?: Record<string, OptionProducer>;
}

export const Box = (config: Configuration): PrefabReference => {
  const options = { ...defaults, ...config.options };

  return component('Box', { options: options }, []);
};
