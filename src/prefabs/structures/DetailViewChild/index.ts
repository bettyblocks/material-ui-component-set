import {
  component,
  PrefabComponentOption,
  PrefabComponent,
  PrefabComponentStyle,
} from '@betty-blocks/component-sdk';
import { options as defaults } from './options';

type OptionProducer = (key: string) => PrefabComponentOption;

export interface Configuration {
  options?: Record<string, OptionProducer>;
  style?: PrefabComponentStyle;
  ref?: { id: string };
}
export const DetailViewChild = (
  config: Configuration,
  descendants: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  return component('DetailViewChild', { options, style, ref }, descendants);
};
