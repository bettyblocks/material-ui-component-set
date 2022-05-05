import { component, PrefabComponentOption } from '@betty-blocks/component-sdk';
import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { updateOption } from '../../../utils';
import { deleteActionVariable } from '../../hooks/deleteActionVariable';
import { options as defaults } from './options';

// TODO: export OptionProducer from the sdk
type OptionProducer = (key: string) => PrefabComponentOption;

export interface Configuration {
  options?: Record<string, OptionProducer>;
  format?: string;
  placeholder?: string;
  dataComponentAttribute?: string;
}

const $afterDelete = [deleteActionVariable];

export const DateTimePicker = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };

  if (config.format) {
    const update = {
      value: config.format,
      ...(config.placeholder
        ? { configuration: { placeholder: config.placeholder } }
        : {}),
    };

    options.type = updateOption(options.timeFormat, update);
  }

  if (config.dataComponentAttribute) {
    options.dataComponentAttribute = updateOption(
      options.dataComponentAttribute,
      {
        value: [config.dataComponentAttribute],
      },
    );
  }

  return component('DateTimePickerInput', { options, $afterDelete }, children);
};
