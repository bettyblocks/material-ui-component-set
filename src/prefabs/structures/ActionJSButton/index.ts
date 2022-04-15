import { component, PrefabComponentOption } from '@betty-blocks/component-sdk';
import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { createAction } from '../../hooks/createAction';
import { deleteAction } from '../../hooks/deleteAction';
import { options as defaults } from './options';

// TODO: export OptionProducer from the sdk
type OptionProducer = (key: string) => PrefabComponentOption;

export interface Configuration {
  options?: Record<string, OptionProducer>;
}

const $afterDelete = [deleteAction];
const $afterCreate = [createAction];

export const ActionJSButton = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };

  return component(
    'Action Button Beta',
    { options, $afterCreate, $afterDelete },
    children,
  );
};
