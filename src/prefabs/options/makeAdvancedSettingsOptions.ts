import { showIfTrue, variable, toggle } from '@betty-blocks/component-sdk';

export function makeAdvancedSettingsOptions(value: string) {
  const advancedAttrs = {
    configuration: { condition: showIfTrue('advancedSettings') },
  };

  return {
    advancedSettings: toggle('Advanced Settings', { value: false }),
    dataComponentAttribute: variable('Test attribute', {
      value: [value],
      ...advancedAttrs,
    }),
  };
}
