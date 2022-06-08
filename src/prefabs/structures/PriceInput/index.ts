import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { updateOption } from '../../../utils';
import { Configuration, TextInput } from '../TextInput';
import { options } from './options';

export const PriceInput = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  options.adornmentPosition = updateOption(options.adornmentPosition, {
    value: 'start',
  });
  options.dataComponentAttribute = updateOption(
    options.dataComponentAttribute,
    {
      value: ['PriceInput'],
    },
  );

  return TextInput({ ...config, options }, children);
};
