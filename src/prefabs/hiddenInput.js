(() => ({
  name: 'HiddenInput',
  icon: 'HiddenInputIcon',
  category: 'FORM',
  structure: [
    {
      name: 'HiddenInput',
      options: [
        {
          value: { label: ['Hidden'], value: [] },
          label: 'Label',
          key: 'customModelAttribute',
          type: 'CUSTOM_MODEL_ATTRIBUTE',
          configuration: {
            allowedTypes: ['string'],
          },
        },
        {
          type: 'TOGGLE',
          label: 'Disabled',
          key: 'disabled',
          value: false,
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'name attribute',
          key: 'nameAttribute',
          value: [],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Advanced',
          key: 'advanced',
          value: false,
        },
        {
          type: 'VARIABLE',
          label: 'Testing',
          key: 'testing',
          value: [''],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advanced',
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
