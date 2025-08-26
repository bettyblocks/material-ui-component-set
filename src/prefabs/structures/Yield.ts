import { component, PrefabReference } from '@betty-blocks/component-sdk';

export const Yield = (config: {}, children: PrefabReference[] = []) => {
  return component('Content area', { options: {} }, children);
};
