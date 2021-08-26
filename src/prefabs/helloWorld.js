(() => ({
  name: 'HelloWorld',
  icon: 'TitleIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'HelloWorld',
      options: [
        {
          label: 'Action',
          key: 'actionId',
          value: '',
          type: 'ACTION',
          configuration: {
            apiVersion: 'v1',
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
