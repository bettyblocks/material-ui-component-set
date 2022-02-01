import { showIfTrue, variable } from '@betty-blocks/component-sdk';

export function makeAdvancedSettingsOptions(value: string) {
  const advancedAttrs = {
    configuration: { condition: showIfTrue('advancedSettings') },
  };

  return {
    dataComponentAttribute: variable('Test attribute', {
      value: [value],
      ...advancedAttrs,
    }),
  };
}
