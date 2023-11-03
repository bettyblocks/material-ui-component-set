import { component, PrefabReference } from '@betty-blocks/component-sdk';

import { Configuration } from '../Configuration';
import { options as defaults } from './options';

export const ActionJSButton = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;

  const optionCategories = [
    {
      label: 'Tooltip',
      expanded: false,
      members: [
        'addTooltip',
        'hasVisibleTooltip',
        'tooltipContent',
        'tooltipPlacement',
        'tooltipBackground',
        'tooltipText',
      ],
    },
    {
      label: 'Advanced',
      expanded: false,
      members: ['dataComponentAttribute'],
    },
  ];

  return component(
    'Action Button',
    { options, style, ref, label, optionCategories },
    descendants,
  );
};
