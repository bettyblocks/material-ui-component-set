import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { Configuration } from '../Configuration';
import { richTextOptions, categories as defaultCategories } from './options';
import { addChildOptions, optionEvents } from '../TextInput/options/addChild';

export const RichTextInput = (
  config: Configuration,
  children: PrefabReference[] = [],
) => {
  const options = { ...(config.options || richTextOptions) };
  const ref = config.ref ? { ...config.ref } : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  if (config.type) {
    options.type = updateOption(options.type, { value: config.type });
  }

  if (config.inputLabel) {
    options.label = updateOption(options.label, { ...config.inputLabel });
  }

  if (config.value) {
    options.value = updateOption(options.value, { ...config.value });
  }

  const label = config.label ? config.label : 'Rich text editor';

  return component(
    'RichTextInput',
    {
      label,
      options,
      ref,
      optionCategories,
      optionTemplates: {
        addChild: {
          options: addChildOptions('richText'),
          optionEvents,
        },
      },
    },
    children,
  );
};
