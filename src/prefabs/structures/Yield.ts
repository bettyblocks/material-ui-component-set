import { component, PrefabReference } from '@betty-blocks/component-sdk';

export const Yield = (config: {}, children: PrefabReference[] = []) => {
  return component('Yield', { options: {} }, children);
};
