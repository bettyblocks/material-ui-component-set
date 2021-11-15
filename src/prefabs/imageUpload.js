(() => ({
  name: 'Image Upload',
  icon: 'ImageInputIcon',
  category: 'FORM',
  keywords: ['Form', 'input', 'image', 'upload', 'imageupload'],
  structure: [
    {
      name: 'FileUpload',
      options: [
        {
          value: { label: ['Select image(s)...'] },
          label: 'Label',
          key: 'customModelAttribute',
          type: 'CUSTOM_MODEL_ATTRIBUTE',
          configuration: {
            allowedTypes: ['file'],
          },
        },
        {
          type: 'CUSTOM',
          label: 'Type',
          key: 'type',
          value: 'list',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'List',
                value: 'list',
              },
              {
                name: 'Grid',
                value: 'grid',
              },
            ],
          },
        },
        {
          type: 'TOGGLE',
          label: 'Show Image preview',
          value: true,
          key: 'showImagePreview',
        },
        {
          type: 'SIZE',
          label: 'Image preview width',
          key: 'imagePreviewWidth',
          value: '200px',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'showImagePreview',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'SIZE',
          label: 'Image preview height',
          key: 'imagePreviewHeight',
          value: '112px',
          configuration: {
            as: 'UNIT',
            condition: {
              type: 'SHOW',
              option: 'showImagePreview',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          value: false,
          label: 'Hide default error',
          key: 'hideDefaultError',
          type: 'TOGGLE',
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
          type: 'TOGGLE',
          label: 'Full width',
          key: 'fullWidth',
          value: true,
        },
        {
          value: ['image/*'],
          label: 'Accept files',
          key: 'accept',
          type: 'VARIABLE',
        },
        {
          type: 'TOGGLE',
          label: 'Allow multiple',
          key: 'multiple',
          value: false,
        },
        {
          label: 'Margin',
          key: 'margin',
          value: 'normal',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'None', value: 'none' },
              { name: 'Dense', value: 'dense' },
              { name: 'Normal', value: 'normal' },
            ],
          },
        },
        {
          value: false,
          label: 'Styles',
          key: 'styles',
          type: 'TOGGLE',
        },
        {
          value: false,
          label: 'Hide label',
          key: 'hideLabel',
          type: 'TOGGLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Label color',
          key: 'labelColor',
          value: 'Black',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Helper color',
          key: 'helperColor',
          value: 'Accent2',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Error color',
          key: 'errorColor',
          value: 'Danger',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'styles',
              comparator: 'EQ',
              value: true,
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
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['FileUpload'],
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
          name: 'Button',
          options: [
            {
              label: 'Toggle visibility',
              key: 'visible',
              value: true,
              type: 'TOGGLE',
              configuration: {
                as: 'VISIBILITY',
              },
            },
            {
              type: 'VARIABLE',
              label: 'Button text',
              key: 'buttonText',
              value: ['Upload'],
            },
            {
              value: true,
              label: 'Full width',
              key: 'fullWidth',
              type: 'TOGGLE',
            },
            {
              label: 'Icon',
              key: 'icon',
              value: 'None',
              type: 'ICON',
            },
            {
              value: 'small',
              label: 'Icon size',
              key: 'size',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Small', value: 'small' },
                  { name: 'Medium', value: 'medium' },
                  { name: 'Large', value: 'large' },
                ],
                condition: {
                  type: 'HIDE',
                  option: 'icon',
                  comparator: 'EQ',
                  value: 'None',
                },
              },
            },
            {
              type: 'CUSTOM',
              label: 'Icon position',
              key: 'iconPosition',
              value: 'start',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Start', value: 'start' },
                  { name: 'End', value: 'end' },
                ],
                condition: {
                  type: 'HIDE',
                  option: 'icon',
                  comparator: 'EQ',
                  value: 'None',
                },
              },
            },
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Outer space',
              key: 'outerSpacing',
              type: 'SIZES',
            },
            {
              label: 'Disabled',
              key: 'disabled',
              value: false,
              type: 'TOGGLE',
            },
            {
              label: 'Add Tooltip',
              key: 'addTooltip',
              value: false,
              type: 'TOGGLE',
            },
            {
              label: 'Toggle tooltip visibility',
              key: 'hasVisibleTooltip',
              value: true,
              type: 'TOGGLE',
              configuration: {
                as: 'VISIBILITY',
                condition: {
                  type: 'SHOW',
                  option: 'addTooltip',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              type: 'VARIABLE',
              label: 'Tooltip Content',
              key: 'tooltipContent',
              value: ['Tips'],
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'addTooltip',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              label: 'Tooltip Placement',
              key: 'tooltipPlacement',
              value: 'bottom',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Top Start',
                    value: 'top-start',
                  },
                  {
                    name: 'Top',
                    value: 'top',
                  },
                  {
                    name: 'Top End',
                    value: 'top-end',
                  },
                  {
                    name: 'Right',
                    value: 'right',
                  },
                  {
                    name: 'Left',
                    value: 'left',
                  },
                  {
                    name: 'Botttom Start',
                    value: 'bottom-start',
                  },
                  {
                    name: 'Bottom',
                    value: 'bottom',
                  },
                  {
                    name: 'Bottom End',
                    value: 'bottom-end',
                  },
                ],
                condition: {
                  type: 'SHOW',
                  option: 'addTooltip',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              type: 'COLOR',
              label: 'Tooltip Background',
              key: 'tooltipBackground',
              value: 'Medium',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'addTooltip',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              type: 'COLOR',
              label: 'Tooltip Text',
              key: 'tooltipText',
              value: 'Black',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'addTooltip',
                  comparator: 'EQ',
                  value: true,
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
              value: ['Button'],
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
