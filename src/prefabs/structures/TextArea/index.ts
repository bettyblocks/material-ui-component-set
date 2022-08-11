import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { Configuration } from '../Configuration';
import { TextInput } from '../TextInput';
import { options as defaults } from './options';

export const TextArea = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const label = config.label ? config.label : undefined;

  return TextInput({ ...config, options, label }, children);
};
