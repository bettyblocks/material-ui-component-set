(() => ({
  name: 'Step',
  icon: 'StepIcon',
  category: 'NAVIGATION',
  keywords: ['Navigation', 'step'],
  structure: [
    {
      name: 'Step',
      options: [
        {
          type: 'VARIABLE',
          label: 'Label',
          key: 'label',
          value: ['Step'],
        },
        {
          label: 'Icon',
          key: 'icon',
          value: 'None',
          type: 'ICON',
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['Step'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
