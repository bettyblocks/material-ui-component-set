import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import { menuItemOptions, categories as defaultCategories } from './options';

export const MenuItem = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || menuItemOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  return component(
    'MenuItem',
    { options, style, ref, label, optionCategories },
    descendants,
  );
};
