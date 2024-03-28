import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';

export const PageContent = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || null) };
  const style = { ...(config.style || null) };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : undefined;

  return component(
    'PageContent',
    { options, style, ref, label, optionCategories },
    descendants,
  );
};
