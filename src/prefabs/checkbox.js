(() => ({
  name: 'Checkbox',
  icon: 'CheckboxIcon',
  category: 'FORM',
  structure: [
    {
      name: 'Checkbox',
      options: [
        {
          value: [],
          label: 'Label',
          key: 'label',
          type: 'VARIABLE',
        },
        {
          value: [],
          label: 'Value',
          key: 'checked',
          type: 'VARIABLE',
        },
        {
          value: [],
          label: 'Name',
          key: 'name',
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
          value: false,
          label: 'Required',
          key: 'required',
          type: 'TOGGLE',
        },
        {
          value: false,
          label: 'Error',
          key: 'error',
          type: 'TOGGLE',
        },
        {
          type: 'TOGGLE',
          label: 'Disabled',
          key: 'disabled',
          value: false,
        },
        // {
        //   value: '',
        //   label: 'Placeholder',
        //   key: 'placeholder',
        //   type: 'TEXT',
        // },
        // {
        //   value: '',
        //   label: 'Helper text',
        //   key: 'helperText',
        //   type: 'TEXT',
        // },
        // {
        //   label: 'Variant',
        //   key: 'variant',
        //   value: 'outlined',
        //   type: 'CUSTOM',
        //   configuration: {
        //     as: 'BUTTONGROUP',
        //     dataType: 'string',
        //     allowedInput: [
        //       { name: 'Standard', value: 'standard' },
        //       { name: 'Outlined', value: 'outlined' },
        //       { name: 'Filled', value: 'filled' },
        //     ],
        //   },
        // },
        // {
        //   type: 'TOGGLE',
        //   label: 'Full width',
        //   key: 'fullWidth',
        //   value: true,
        // },
        // {
        //   label: 'Size',
        //   key: 'size',
        //   value: 'medium',
        //   type: 'CUSTOM',
        //   configuration: {
        //     as: 'BUTTONGROUP',
        //     dataType: 'string',
        //     allowedInput: [
        //       { name: 'Medium', value: 'medium' },
        //       { name: 'Small', value: 'small' },
        //     ],
        //   },
        // },
        // {
        //   label: 'Margin',
        //   key: 'margin',
        //   value: 'none',
        //   type: 'CUSTOM',
        //   configuration: {
        //     as: 'BUTTONGROUP',
        //     dataType: 'string',
        //     allowedInput: [
        //       { name: 'None', value: 'none' },
        //       { name: 'Dense', value: 'dense' },
        //       { name: 'Normal', value: 'normal' },
        //     ],
        //   },
        // },
      ],
      descendants: [],
    },
  ],
}))();
