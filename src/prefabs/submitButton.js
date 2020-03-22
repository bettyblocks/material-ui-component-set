(() => ({
  name: 'SubmitButton',
  icon: 'SubmitButtonIcon',
  category: 'FORM',
  structure: [
    {
      name: 'Button',
      options: [
        {
          type: 'CUSTOM',
          label: 'type',
          key: 'type',
          value: 'submit',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Submit', value: 'submit' },
              { name: 'Reset', value: 'reset' },
            ],
          },
        },
        {
          type: 'VARIABLE',
          label: 'Button text',
          key: 'buttonText',
          value: ['Button'],
        },

        {
          type: 'CUSTOM',
          label: 'variant',
          key: 'variant',
          value: 'contained',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Text', value: 'text' },
              { name: 'Outlined', value: 'outlined' },
              { name: 'Contained', value: 'contained' },
            ],
          },
        },
        {
          value: false,
          label: 'Full width',
          key: 'fullWidth',
          type: 'TOGGLE',
        },
        {
          value: 'medium',
          label: 'Size',
          key: 'size',
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
          label: 'StartIcon',
          key: 'startIcon',
          value: 'None',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: '',
                value: 'None',
              },
              {
                name: 'ExpandMore',
                value: 'ExpandMore',
              },
              {
                name: 'FilterList',
                value: 'FilterList',
              },
              {
                name: 'Search',
                value: 'Search',
              },
              {
                name: 'FileCopy',
                value: 'FileCopy',
              },
              {
                name: 'GetApp',
                value: 'GetApp',
              },
              {
                name: 'Email',
                value: 'Email',
              },
            ],
          },
        },
        {
          type: 'COLOR',
          label: 'Text color',
          key: 'textColor',
          value: 'White',
        },
        {
          type: 'COLOR',
          label: 'Background color',
          key: 'background',
          value: 'Success',
        },
        {
          value: ['0rem', 'M', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [],
    },
  ],
}))();
