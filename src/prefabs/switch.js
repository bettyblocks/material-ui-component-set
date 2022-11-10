(() => ({
  name: 'Switch',
  icon: 'TabsIcon',
  category: 'LOGIC',
  keywords: ['logic', 'switch', 'condition', 'if', 'else', 'case'],
  structure: [
    {
      type: 'COMPONENT',
      name: 'switch',
      label: 'Switch',
      optionCategories: [
        {
          label: 'Advanced',
          expanded: false,
          members: ['dataComponentAttribute'],
        },
      ],
      options: [
        {
          type: 'CHILD_SELECTOR',
          label: 'Design case',
          key: 'activeDesignIndex',
          value: [1],
        },
        {
          type: 'TOGGLE',
          label: 'DESIGN ALL',
          key: 'showAllCases',
          value: true,
        },
        {
          type: 'VARIABLE',
          label: 'Variable',
          key: 'variable',
          value: ['default'],
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          type: 'SIZE',
          label: 'Height',
          key: 'height',
          value: '',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          type: 'SIZE',
          label: 'Width',
          key: 'width',
          value: '100%',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: [],
        },
      ],
      descendants: [
        {
          type: 'COMPONENT',
          name: 'switchCase',
          label: 'Case',
          optionCategories: [
            {
              label: 'Advanced',
              expanded: false,
              members: ['dataComponentAttribute'],
            },
          ],
          options: [
            {
              type: 'CUSTOM',
              label: 'Type',
              key: 'defaultCase',
              value: false,
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'boolean',
                allowedInput: [
                  {
                    name: 'Case',
                    value: false,
                  },
                  {
                    name: 'Default',
                    value: true,
                  },
                ],
              },
            },
            {
              type: 'CUSTOM',
              key: 'compare',
              label: 'Switch variable',
              value: 'eq',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'defaultCase',
                  comparator: 'EQ',
                  value: false,
                },
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Equals',
                    value: 'eq',
                  },
                  {
                    name: 'Not equal',
                    value: 'neq',
                  },
                  {
                    name: 'Contains',
                    value: 'contains',
                  },
                  {
                    name: 'Does not contain',
                    value: 'notcontains',
                  },
                  {
                    name: 'Greater than',
                    value: 'gt',
                  },
                  {
                    name: 'Less than',
                    value: 'lt',
                  },
                  {
                    name: 'Greater than or equal to',
                    value: 'gteq',
                  },
                  {
                    name: 'Less than or equal to',
                    value: 'lteq',
                  },
                ],
              },
            },
            {
              type: 'VARIABLE',
              label: 'Case',
              key: 'switchCase',
              value: ['default'],
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'defaultCase',
                  comparator: 'EQ',
                  value: false,
                },
                dependsOn: 'model',
              },
            },
            {
              type: 'SIZE',
              label: 'Height',
              key: 'height',
              value: '',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              type: 'SIZE',
              label: 'Width',
              key: 'width',
              value: '100%',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              type: 'VARIABLE',
              label: 'Test attribute',
              key: 'dataComponentAttribute',
              value: [],
            },
          ],
          descendants: [],
        },
      ],
    },
  ],
}))();
