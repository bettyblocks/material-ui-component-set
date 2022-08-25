import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import { dataTableOptions, categories as defaultCategories } from './options';

export const DataTable = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || dataTableOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  return component(
    'DataTable',
    { options, style, ref, label, optionCategories },
    descendants,
  );
};
