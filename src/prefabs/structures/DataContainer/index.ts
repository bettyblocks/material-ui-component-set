import { component, PrefabComponent } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import {
  dataContainerOptions,
  categories as defaultCategories,
} from './options';

export const DataContainer = (
  config: Configuration,
  descendants: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || dataContainerOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  return component(
    'DataContainer',
    { options, style, ref, label, optionCategories },
    descendants,
  );
};
