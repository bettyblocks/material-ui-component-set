import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { Configuration, TextInput } from '../TextInput';
import { options } from './options';

export const TextArea = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => TextInput({ ...config, options }, children);
