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

export const actionButton = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const style = { ...config.style };
  const actions = [
    {
      name: '',
      ref: {
        id: '#actionId',
        endpointId: '#endpointId',
      },
      useNewRuntime: false,
      events: [],
    },
  ];

  return component('Button', { options, style, actions }, descendants);
};
