import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import { breadcrumbsOptions, categories as defaultCategories } from './options';

export const Breadcrumbs = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || breadcrumbsOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  return component(
    'Breadcrumbs',
    { options, style, ref, label, optionCategories },
    descendants,
  );
};
