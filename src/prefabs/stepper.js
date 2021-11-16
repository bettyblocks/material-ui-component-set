(() => ({
  name: 'Stepper',
  icon: 'StepperIcon',
  category: 'NAVIGATION',
  keywords: ['Navigation', 'stepper', 'progress'],
  structure: [
    {
      name: 'Stepper',
      options: [
        {
          type: 'NUMBER',
          label: 'Show step',
          key: 'activeStep',
          value: '1',
        },
        {
          type: 'TOGGLE',
          label: 'Show all steps',
          key: 'allSteps',
          value: false,
        },
        {
          type: 'CUSTOM',
          label: 'Type',
          key: 'type',
          value: 'horizontal',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Horizontal', value: 'horizontal' },
              { name: 'Vertical', value: 'vertical' },
              { name: 'Mobile', value: 'mobile' },
            ],
          },
        },
        {
          type: 'CUSTOM',
          label: 'Variant',
          key: 'variant',
          value: 'non-linear',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Linear', value: 'linear' },
              { name: 'Non-linear', value: 'non-linear' },
            ],
            condition: {
              type: 'HIDE',
              option: 'type',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Alternative label',
          key: 'alternativeLabel',
          value: false,
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'type',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Active color',
          key: 'activeColor',
          value: 'Primary',
        },
        {
          type: 'COLOR',
          label: 'Active Label color',
          key: 'activeLabelColor',
          value: 'Black',
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'type',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Inactive color',
          key: 'inactiveColor',
          value: 'Secondary',
        },
        {
          type: 'COLOR',
          label: 'Inactive Label color',
          key: 'inactiveLabelColor',
          value: 'Medium',
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'type',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Background color',
          key: 'backgroundColor',
          value: 'White',
        },
        {
          type: 'COLOR',
          label: 'Connector color',
          key: 'connectorColor',
          value: 'Light',
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'type',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Step Progress color',
          key: 'stepProgressColor',
          value: 'Black',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Button next text',
          key: 'buttonNext',
          value: ['Next'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Button previous text',
          key: 'buttonPrev',
          value: ['Back'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
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
          value: ['Stepper'],
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
      descendants: [
        {
          name: 'Step',
          options: [
            {
              type: 'VARIABLE',
              label: 'Label',
              key: 'label',
              value: ['Step 1'],
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
        {
          name: 'Step',
          options: [
            {
              type: 'VARIABLE',
              label: 'Label',
              key: 'label',
              value: ['Step 2'],
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
    },
  ],
}))();
