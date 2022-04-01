import { component, PrefabComponentOption } from '@betty-blocks/component-sdk';
import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { options as defaults } from './options';

// TODO: export OptionProducer from the sdk
type OptionProducer = (key: string) => PrefabComponentOption;

export interface Configuration {
  options?: Record<string, OptionProducer>;
}
export const Button = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };

  return component('Button', { options }, children);
};
