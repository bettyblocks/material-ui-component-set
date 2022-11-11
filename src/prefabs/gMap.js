(() => ({
  name: 'GoogleMap',
  icon: 'CheckboxIcon',
  category: 'Dependencies',
  keywords: ['google', 'map'],
  structure: [
    {
      name: 'GoogleMap',
      options: [
        {
          value: ['52.9342815'],
          label: 'Latitude',
          key: 'lat',
          type: 'VARIABLE',
        },
        {
          value: ['4.7435801'],
          label: 'Longitude',
          key: 'long',
          type: 'VARIABLE',
        },
        {
          value: ['Den Helder'],
          label: 'markerText',
          key: 'markerText',
          type: 'VARIABLE',
        },
        {
          value: ['11'],
          label: 'Zoom',
          key: 'zoom',
          type: 'VARIABLE',
        },
      ],
      descendants: [],
    },
  ],
}))();
