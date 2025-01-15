import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';

import { updateOption } from '../../../utils';
import { Configuration } from '../Configuration';
import { TextInput } from '../TextInput';
import { options as defaults } from './options';

export const TextArea = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const label = config.label ? config.label : 'Text Area';

  if (config.inputLabel) {
    options.label = updateOption(options.label, { ...config.inputLabel });
  }

  if (config.value) {
    options.value = updateOption(options.value, { ...config.value });
  }

  return TextInput({ ...config, options, label }, children);
};
