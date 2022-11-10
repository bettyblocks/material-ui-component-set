(() => ({
  name: 'Switch case',
  icon: 'TabIcon',
  category: 'LOGIC',
  keywords: ['logic', 'switch', 'condition', 'if', 'else', 'case'],
  structure: [
    {
      type: 'COMPONENT',
      name: 'SwitchCase',
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
          key: 'caseType',
          value: 'case',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Case',
                value: 'case',
              },
              {
                name: 'Default',
                value: 'default',
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
              option: 'caseType',
              comparator: 'EQ',
              value: 'case',
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
          value: [''],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'caseType',
              comparator: 'EQ',
              value: 'case',
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
}))();
