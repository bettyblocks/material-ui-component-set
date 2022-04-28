import { component } from '@betty-blocks/component-sdk';
import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';


/**
 * making your structures into a function gives you an opportunity
 * to customize how they are created
 */
export const Row = (descandants: PrefabComponent[] = []) =>

/**
 * component, actually means strcuture. I'll change this in the future.
 * 
 * also note options is no longer a list. it's an object where
 * the keys are the keys
 */
  component('Row', { options: {} }, descandants);
