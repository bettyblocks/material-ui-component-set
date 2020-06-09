(() => ({
  name: 'Input Variable',
  icon: 'ContainerIcon',
  category: 'DATA',
  structure: [
    {
      name: 'inputVariable',
      options: [
        {
          label: 'Input variable',
          key: 'actionInputId',
          value: '',
          type: 'ACTION_INPUT',
        },
        {
          label: 'Value',
          key: 'defaultValue',
          value: [''],
          type: 'VARIABLE',
        },
      ],
      descendants: [],
    },
  ],
}))();
