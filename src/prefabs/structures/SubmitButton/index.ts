import {
  component,
  OptionProducer,
  PrefabComponent,
} from '@betty-blocks/component-sdk';
import { options as defaults } from './options';

export interface Configuration {
  options?: Record<string, OptionProducer>;
}
export const SubmitButton = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };

  return component('Button', { options }, children);
};
