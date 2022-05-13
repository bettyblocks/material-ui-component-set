import { component, PrefabComponentOption } from '@betty-blocks/component-sdk';
import { PrefabComponent } from '@betty-blocks/component-sdk/build/prefabs/types/component';
import { updateOption } from '../../../utils';
import { deleteActionVariable } from '../../hooks/deleteActionVariable';
import { options as defaults } from './options';

// TODO: export OptionProducer from the sdk
type OptionProducer = (key: string) => PrefabComponentOption;

export enum DateInputTypes {
  DATE_TIME = 'datetime',
  DATE = 'date',
  TIME = 'time',
}

export interface Configuration {
  options?: Record<string, OptionProducer>;
  inputType?: string;
  placeholder?: string;
  dataComponentAttribute?: string;
}

const $afterDelete = [deleteActionVariable];

export const DateTimePicker = (
  config: Configuration,
  children: PrefabComponent[] = [],
) => {
  const options = { ...(config.options || defaults) };

  if (config.inputType) {
    let format;
    switch (config.inputType) {
      case DateInputTypes.DATE_TIME:
        format = 'MM/dd/yyyy HH:mm:ss';
        break;
      case DateInputTypes.DATE:
        format = 'MM/dd/yyyy';
        break;
      case DateInputTypes.TIME:
        format = 'HH:mm:ss';
        break;
      default:
        format = '';
    }

    const update = {
      value: format,
      ...(config.placeholder
        ? { configuration: { placeholder: config.placeholder } }
        : {}),
    };

    const key = `${config.inputType}Format`;

    options[key] = updateOption(options[key], update);

    options.type = updateOption(options.type, { value: config.inputType });
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
