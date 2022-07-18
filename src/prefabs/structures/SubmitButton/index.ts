import {
  component,
  OptionProducer,
  PrefabComponent,
  PrefabComponentStyle,
} from '@betty-blocks/component-sdk';
import { options as defaults } from './options';

export interface Configuration {
  options?: Record<string, OptionProducer>;
  style?: PrefabComponentStyle;
  ref?: { id: string };
}

export const SubmitButton = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;

  return component('Button', { options, style, ref }, children);
};
