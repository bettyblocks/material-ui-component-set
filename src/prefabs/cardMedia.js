(() => ({
  name: 'CardMedia',
  icon: 'ImageIcon',
  category: 'CARDS',
  structure: [
    {
      name: 'CardMedia',
      options: [
        {
          value:
            'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
          label: 'Image',
          key: 'image',
          type: 'TEXT',
        },
        {
          value: '',
          label: 'Title',
          key: 'title',
          type: 'TEXT',
        },
        {
          value: '140px',
          label: 'Media Height ',
          key: 'imageHeight',
          type: 'SIZE',
          configuration: {
            as: 'UNIT',
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
