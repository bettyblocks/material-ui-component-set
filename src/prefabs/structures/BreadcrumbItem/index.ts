import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import {
  breadcrumbItemOptions,
  categories as defaultCategories,
} from './options';

export const BreadcrumbItem = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || breadcrumbItemOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  return component(
    'BreadcrumbItem',
    { options, style, ref, label, optionCategories },
    descendants,
  );
};
