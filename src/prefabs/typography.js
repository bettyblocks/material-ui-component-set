(() => ({
    name: 'Typography',
    icon: 'ParagraphIcon',
    category: 'CONTENT',
    structure: [
      {
        name: 'Typography',
        options: [
          {
            type: 'TOGGLE',
            label: 'Gutter bottom',
            key: 'gutterBottom',
            value: false,
          },
          {
            label: 'Align',
            key: 'align',
            value: 'inherit',
            type: 'CUSTOM',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Inherit', value: 'inherit' },
                { name: 'Left', value: 'left' },
                { name: 'Center', value: 'center' },
                { name: 'Right', value: 'right' },
                { name: 'Justified', value: 'justified' },
              ],
            },
          },
          {
            label: 'Color',
            key: 'color',
            value: 'inherit',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                'initial',
                'inherit',
                'primary',
                'secondary',
                'textPrimary',
                'textSecondary',
                'error',
              ].map(value => ({
                name: value.charAt(0).toUpperCase() + value.slice(1),
                value,
              })),
            },
          },
          {
            label: 'Display',
            key: 'display',
            value: 'initial',
            type: 'CUSTOM',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Initial', value: 'initial' },
                { name: 'Block', value: 'block' },
                { name: 'Inline', value: 'inline' },
              ],
            },
          },
          {
            label: 'Variant',
            key: 'variant',
            value: 'body1',
            type: 'CUSTOM',
            configuration: {
              as: 'DROPDOWN',
              dataType: 'string',
              allowedInput: [
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'subtitle1',
                'subtitle2',
                'body1',
                'body2',
                'caption',
                'button',
                'overline',
                'srOnly',
                'inherit',
              ].map(value => ({
                name: value.charAt(0).toUpperCase() + value.slice(1),
                value,
              })),
            },
          },
        ],
        descendants: [],
      },
    ],
  }))();
  