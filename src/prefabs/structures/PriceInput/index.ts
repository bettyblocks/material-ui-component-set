import {
  PrefabReference,
  setActionJSInputVariableOption,
  setVariableOption,
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

  return TextInput(
    {
      ...config,
      options,
      label,
      optionTemplates: {
        addChild: {
          options: addChildOptions('price'),
          optionEvents: {
            onChange: {
              property: [
                setVariableOption({ target: 'value', format: 'propertyValue' }),
                setVariableOption({ target: 'label', format: 'propertyLabel' }),
                setActionJSInputVariableOption({ target: 'actionVariableId' }),
              ],
              actionVariableId: [
                setVariableOption({ target: 'label', format: 'static' }),
              ],
            },
          },
        },
      },
    },
    descendants,
  );
};
