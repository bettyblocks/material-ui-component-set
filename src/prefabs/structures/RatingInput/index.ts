import { component, PrefabReference } from '@betty-blocks/component-sdk';

import { updateOption } from '../../../utils';
import { Configuration } from '../Configuration';
import {
  ratingInputOptions as defaultOptions,
  categories as defaultCategories,
} from './options';

export const RatingInput = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaultOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;
  const optionCategories = config.optionCategories
    ? { ...config.optionCategories }
    : defaultCategories;

  if (config.inputLabel) {
    options.label = updateOption(options.label, { ...config.inputLabel });
  }

  if (config.value) {
    options.value = updateOption(options.value, { ...config.value });
  }
  return component(
    'Rating',
    { options, ref, style, label, optionCategories },
    descendants,
  );
};
