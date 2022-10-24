import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { Configuration } from '../Configuration';
import { options as defaults } from './options/index';

export const MultiAutocomplete = (
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
      members: [
        'required',
        'validationValueMissing',
        'pattern',
        'minLength',
        'validationTooShort',
        'maxLength',
        'validationTooLong',
      ],
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
        'checkboxColor',
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

  if (config.adornmentIcon) {
    options.adornmentIcon = updateOption(options.adornmentIcon, {
      value: config.adornmentIcon,
    });
  }

  return component(
    'Multi Autocomplete',
    { options, style, ref, label, optionCategories: categories },
    descendants,
  );
};
