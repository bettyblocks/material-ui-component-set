import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { Configuration } from '../Configuration';
import { optionsResolver } from './options';
import { addChildOptions, optionEvents } from '../TextInput/options/addChild';

export enum DateInputTypes {
  DATE_TIME = 'datetime',
  DATE = 'date',
  TIME = 'time',
}

export const DateTimePicker = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = {
    ...(config.options || optionsResolver(config.inputType || 'date')),
  };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;

  const categories = [
    {
      label: 'Validations',
      expanded: false,
      members: [
        'required',
        'validationValueMissing',
        'validationInvalidValue',
        'minValue',
        'validationBeforeMinValue',
        'maxValue',
        'validationAfterMaxValue',
      ],
    },
    {
      label: 'Styling',
      expanded: false,
      members: [
        'hideLabel',
        'backgroundColor',
        'backgroundColorPopup',
        'borderColor',
        'borderHoverColor',
        'borderFocusColor',
        'labelColor',
        'textColor',
        'placeholderColor',
        'helperColor',
        'errorColor',
      ],
    },
    {
      label: 'Advanced',
      expanded: false,
      members: ['dataComponentAttribute'],
    },
  ];

  if (config.inputType) {
    let format;
    switch (config.inputType) {
      case DateInputTypes.DATE_TIME:
        format = 'MM/dd/yyyy HH:mm:ss';
        break;
      case DateInputTypes.DATE:
        format = 'dd/MM/yyyy';
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

    if (config.inputLabel) {
      options.label = updateOption(options.label, {
        ...config.inputLabel,
      });
    }
  }

  if (config.dataComponentAttribute) {
    options.dataComponentAttribute = updateOption(
      options.dataComponentAttribute,
      {
        value: [config.dataComponentAttribute],
      },
    );
  }

  return component(
    'DateTimePickerInput',
    {
      options,
      style,
      ref,
      label,
      optionCategories: categories,
      optionTemplates: {
        addChild: {
          options: addChildOptions(config.inputType || 'date'),
          optionEvents,
        },
      },
    },
    descendants,
  );
};
