import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { deleteActionVariable } from '../../hooks/deleteActionVariable';
import { Configuration } from '../Configuration';
import { options as defaults } from './options';

const $afterDelete = [deleteActionVariable];

export const RichTextInput = (
  config: Configuration,
  children: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const ref = config.ref ? { ...config.ref } : undefined;

  if (config.type) {
    options.type = updateOption(options.type, { value: config.type });
  }

  if (config.inputLabel) {
    options.label = updateOption(options.label, { value: [config.inputLabel] });
  }

  return component(
    'RichTextInput',
    { label: config.label, options, ref, $afterDelete },
    children,
  );
};
