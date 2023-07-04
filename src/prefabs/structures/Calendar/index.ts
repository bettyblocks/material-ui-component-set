import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';

export const Calendar = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;


  return component(
    'Calendar',
    { options, style, ref, label },
    descendants,
  );
};