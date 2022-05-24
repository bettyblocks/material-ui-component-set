import {
  component,
  OptionProducer,
  PrefabComponent,
} from '@betty-blocks/component-sdk';
import { createAction } from '../../hooks/createAction';
import { options as defaults } from './options';

export interface Configuration {
  options?: Record<string, OptionProducer>;
}

const $afterCreate = [createAction];

export const ActionJSButton = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };

  return component('Action Button Beta', { options, $afterCreate }, children);
};
