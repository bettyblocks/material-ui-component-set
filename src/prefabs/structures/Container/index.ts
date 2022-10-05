import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import {
  containerOptions as defaultOptions,
  categories as defaultCategories,
} from './options';

export const Container = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaultOptions) };
  const style = config.style ? { style: config.style } : undefined;
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? { ...config.optionCategories }
    : defaultCategories;

  return component(
    'Container',
    { options, ...style, ref, label, optionCategories },
    descendants,
  );
};
