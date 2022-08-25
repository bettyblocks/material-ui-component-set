import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import { chipOptions, categories as defaultCategories } from './options';

export const Chip = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || chipOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  return component(
    'Chip',
    { options, style, ref, label, optionCategories },
    descendants,
  );
};
