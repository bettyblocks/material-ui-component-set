import { component, PrefabComponent } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import { dataTableOptions, categories as defaultCategories } from './options';

export const DataTable = (
  config: Configuration,
  descendants: PrefabComponent[] = [],
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
