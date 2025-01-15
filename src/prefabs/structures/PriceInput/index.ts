import {
  optionActionSetVariable,
  PrefabReference,
} from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { TextInput } from '../TextInput';
import { options } from './options';
import { Configuration } from '../Configuration';
import { addChildOptions } from '../TextInput/options/addChild';

export const PriceInput = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const label = config.label ? config.label : 'Price field';
  options.adornmentPosition = updateOption(options.adornmentPosition, {
    value: 'start',
  });
  options.dataComponentAttribute = updateOption(
    options.dataComponentAttribute,
    {
      value: ['PriceInput'],
    },
  );

  return TextInput(
    {
      ...config,
      options,
      label,
      optionTemplates: {
        addChild: {
          options: addChildOptions('price'),
          optionActions: {
            property: {
              onChange: [
                optionActionSetVariable('value', 'propertyValue'),
                optionActionSetVariable('label', 'propertyLabel'),
              ],
            },
            actionVariableId: {
              onChange: [
                optionActionSetVariable('value', 'propertyValue'),
                optionActionSetVariable('label', 'propertyLabel'),
              ],
            },
          },
        },
      },
    },
    descendants,
  );
};
