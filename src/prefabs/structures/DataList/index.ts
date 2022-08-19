import { component, PrefabComponent } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import { dataListOptions, categories as defaultCategories } from './options';

export const DataList = (
  config: Configuration,
  descendants: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || dataListOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  return component(
    'DataList',
    { options, style, ref, label, optionCategories },
    descendants,
  );
};
