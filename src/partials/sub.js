(() => ({
  name: 'Sub',
  icon: 'PartialIcon',
  category: 'PARTIALS',
  structure: [
    {
      name: 'Partial',
      options: [
        {
          value: '',
          label: 'Partial Reference',
          key: 'partialReferenceId',
          type: 'PARTIAL_REFERENCE',
        },
      ],
      descendants: [
        {
          name: 'Sub',
          options: [
            {
              type: 'TEXT',
              label: 'Text',
              key: 'text',
              value: 'Sub',
            },
          ],
          descendants: [],
        },
      ],
    },
  ],
}))();
