import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import { cardActionsOptions, categories as defaultCategories } from './options';

export const CardActions = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || cardActionsOptions) };
  const style = config.style ? { style: config.style } : {};
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  return component(
    'CardActions',
    { options, ...style, ref, label, optionCategories },
    descendants,
  );
};
