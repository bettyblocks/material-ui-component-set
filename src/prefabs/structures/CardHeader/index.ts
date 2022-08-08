import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import { cardHeaderOptions, categories as defaultCategories } from './options';

export const CardHeader = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || cardHeaderOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  return component(
    'CardHeader',
    { options, style, ref, label, optionCategories },
    descendants,
  );
};
