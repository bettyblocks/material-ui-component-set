(() => ({
  name: 'Dialog',
  icon: 'PanelIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'Dialog',
      options: [
        {
          value: true,
          label: 'Visible in dev?',
          key: 'isVisibleInDev',
          type: 'TOGGLE',
        },
      ],
      descendants: [],
    },
  ],
}))();
