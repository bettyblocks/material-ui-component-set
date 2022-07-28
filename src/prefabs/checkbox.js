(() => ({
  name: 'Checkbox',
  icon: 'CheckboxIcon',
  category: 'FORM',
  keywords: ['Form', 'input', 'check', 'box', 'checkbox'],
  structure: [
    {
      name: 'Checkbox',
      optionCategories: [
        {
          label: 'Validation options',
          expanded: true,
          members: ['validationValueMissing'],
        },
        {
          label: 'Styling',
          expanded: false,
          members: [
            'checkboxColor',
            'checkboxColorChecked',
            'textColor',
            'helperColor',
            'errorColor',
          ],
        },
        {
          label: 'Advanced',
          expanded: false,
          members: ['nameAttribute', 'dataComponentAttribute'],
        },
      ],
      options: [
        {
          value: { label: ['Checkbox'], value: [] },
          label: 'Label',
          key: 'customModelAttribute',
          type: 'CUSTOM_MODEL_ATTRIBUTE',
          configuration: {
            allowedTypes: ['boolean'],
          },
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
          value: ['This field is required'],
          label: 'Value required message',
          key: 'validationValueMissing',
          type: 'VARIABLE',
        },
        {
          type: 'TOGGLE',
          label: 'Disabled',
          key: 'disabled',
          value: false,
        },
        {
          value: [],
          label: 'Helper text',
          key: 'helperText',
          type: 'VARIABLE',
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
          type: 'COLOR',
          label: 'Checkbox color',
          key: 'checkboxColor',
          value: 'Accent3',
        },
        {
          type: 'COLOR',
          label: 'Checkbox color checked',
          key: 'checkboxColorChecked',
          value: 'Primary',
        },
        {
          type: 'COLOR',
          label: 'Text color',
          key: 'textColor',
          value: 'Black',
        },
        {
          type: 'COLOR',
          label: 'Helper color',
          key: 'helperColor',
          value: 'Accent2',
        },
        {
          type: 'COLOR',
          label: 'Error color',
          key: 'errorColor',
          value: 'Danger',
        },
        {
          type: 'VARIABLE',
          label: 'name attribute',
          key: 'nameAttribute',
          value: [],
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['Checkbox'],
        },
      ],
      descendants: [],
    },
  ],
}))();
