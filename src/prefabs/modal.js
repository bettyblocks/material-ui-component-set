(() => ({
    name: 'Modal',
    icon: 'AlertIcon',
    category: 'CONTENT',
    structure: [
      {
        name: 'Modal',
        options: [
            {
                key: "title",
                value: "",
                label: "Title",
                type: "TEXT",
            },
            {
                key: "description",
                value: "",
                label: "Description",
                type: "TEXT",
            },
            {
                key: "buttonTitle",
                value: "Open modal",
                label: "Button title",
                type: "TEXT",
            },
        ],
        descendants: [],
      },
    ],
  }))();
  