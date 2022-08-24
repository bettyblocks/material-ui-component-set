import { PrefabReference } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { TextInput } from '../TextInput';
import { Configuration } from '../Configuration';
import { options } from './options';

export const PriceInput = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const label = config.label ? config.label : undefined;
  options.adornmentPosition = updateOption(options.adornmentPosition, {
    value: 'start',
  });

  return TextInput({ ...config, options, label }, descendants);
};
