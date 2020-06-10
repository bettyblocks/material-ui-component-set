(() => ({
  name: 'Dialog',
  icon: 'SelectIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Dialog',
      options: [
        {
          type: 'TOGGLE',
          label: 'Visibility',
          key: 'isVisible',
          value: false,
        },
        {
          type: 'TOGGLE',
          label: 'Fullscreen',
          key: 'isFullscreen',
          value: false,
        },
      ],
      descendants: [],
    },
  ],
}))();
