(() => ({
  name: 'RadioGroup',
  icon: 'RadioButtonIcon',
  category: 'FORM',
  structure: [
    {
      name: 'RadioGroup',
      options: [
        {
          value: ['Label'],
          label: 'Label',
          key: 'label',
          type: 'VARIABLE',
        },
        {
          value: [],
          label: 'Value',
          key: 'defaultValue',
          type: 'VARIABLE',
        },
        {
          label: 'Label Position',
          key: 'position',
          value: 'end',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Start', value: 'start' },
              { name: 'End', value: 'end' },
              { name: 'Top', value: 'top' },
              { name: 'Bottom', value: 'bottom' },
            ],
          },
        },
        {
          label: 'Option type',
          key: 'optionType',
          value: 'static',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Static', value: 'static' },
              { name: 'Data', value: 'data' },
            ],
          },
        },
        {
          type: 'MODEL',
          label: 'Model',
          key: 'model',
          value: '',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'optionType',
              comparator: 'EQ',
              value: 'data',
            },
          },
        },
        {
          type: 'PROPERTY',
          label: 'Label Property',
          key: 'labelProp',
          value: '',
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'optionType',
              comparator: 'EQ',
              value: 'data',
            },
          },
        },
        {
          type: 'PROPERTY',
          label: 'Value Property',
          key: 'valueProp',
          value: '',
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'optionType',
              comparator: 'EQ',
              value: 'data',
            },
          },
        },
        {
          type: 'TEXT',
          label: 'Options',
          key: 'radioOptions',
          value: 'Option 1\nOption 2\nOption 3',
          configuration: {
            as: 'MULTILINE',
            condition: {
              type: 'SHOW',
              option: 'optionType',
              comparator: 'EQ',
              value: 'static',
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Row',
          key: 'row',
          value: true,
        },
        {
          value: false,
          label: 'Required',
          key: 'required',
          type: 'TOGGLE',
        },
        {
          value: false,
          label: 'Disabled',
          key: 'disabled',
          type: 'TOGGLE',
        },
        {
          label: 'Size',
          key: 'size',
          value: 'medium',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Medium', value: 'medium' },
              { name: 'Small', value: 'small' },
            ],
          },
        },
        {
          value: '',
          label: 'Input',
          key: 'actionInputId',
          type: 'ACTION_INPUT',
        },
        {
          value: [],
          label: 'Helper text',
          key: 'helperText',
          type: 'VARIABLE',
        },
      ],
      descendants: [],
    },
  ],
}))();
