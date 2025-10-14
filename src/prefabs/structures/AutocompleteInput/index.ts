import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { Configuration } from '../Configuration';
import { options as defaults } from './options/index';
import { addChildOptions, optionEvents } from '../SelectInput/options/addChild';

export const AutocompleteInput = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;

  const categories = [
    {
      label: 'Validation Options',
      expanded: false,
      members: ['required', 'validationValueMissing'],
    },
    {
      label: 'Styling',
      expanded: false,
      members: [
        'hideLabel',
        'backgroundColor',
        'backgroundColorChip',
        'borderColor',
        'borderHoverColor',
        'borderFocusColor',
        'labelColor',
        'textColor',
        'textColorChip',
        'placeHolderColor',
        'helperColor',
        'errorColor',
      ],
    },
    {
      label: 'Advanced Options',
      expanded: false,
      members: ['errorType', 'nameAttribute', 'dataComponentAttribute'],
    },
  ];

  if (config.type) {
    options.type = updateOption(options.type, { value: config.type });
  }

  if (config.inputLabel) {
    options.label = updateOption(options.label, { value: [config.inputLabel] });
  }

  return component(
    'AutocompleteInput',
    {
      options,
      style,
      ref,
      label,
      optionCategories: categories,
      optionTemplates: {
        addChild: {
          options: addChildOptions('autocomplete'),
          optionEvents,
        },
      },
    },
    descendants,
  );
};
