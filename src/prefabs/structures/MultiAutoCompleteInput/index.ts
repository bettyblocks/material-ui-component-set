import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { deleteActionVariable } from '../../hooks/deleteActionVariable';
import { Configuration } from '../Configuration';
import { options as defaults } from './options';

const $afterDelete = [deleteActionVariable];

export const MultiAutocomplete = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;

  if (config.type) {
    options.type = updateOption(options.type, { value: config.type });
  }

  if (config.adornmentIcon) {
    options.adornmentIcon = updateOption(options.adornmentIcon, {
      value: config.adornmentIcon,
    });
  }

  return component(
    'Multi Autocomplete Beta',
    { options, $afterDelete, style, ref, label },
    descendants,
  );
};
