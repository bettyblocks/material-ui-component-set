(() => ({
    name: 'Span',
    icon: 'ParagraphIcon',
    category: 'CONTENT',
    structure: [
      {
        name: 'Span',
        options: [
          {
            type: 'VARIABLE',
            label: 'Text',
            key: 'text',
            value: ['Type your content here...'],
            configuration: {
              as: 'MULTILINE',
            },
          },
          {
            type: 'TOGGLE',
            label: 'Link',
            key: 'link',
            value: false,
          },
        ],
        descendants: [],
      },
    ],
  }))();
  