import { component, PrefabComponent } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import {
  dataTableColumnOptions,
  categories as defaultCategories,
} from './options';

export const DataTableColumn = (
  config: Configuration,
  descendants: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || dataTableColumnOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  return component(
    'DataTableColumn',
    { options, style, ref, label, optionCategories },
    descendants,
  );
};
