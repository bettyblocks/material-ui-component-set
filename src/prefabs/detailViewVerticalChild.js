(() => ({
  name: 'detailViewVerticalChild',
  icon: 'ContainerIcon',
  category: 'CONTENT',
  beforeCreate: ({
    components: { Content, Header, Field, Footer, PropertySelector },
    prefab,
    save,
    close,
  }) => {
    const [property, setProperty] = React.useState('');

    return (
      <>
        <Header
          onClose={close}
          title="New detail"
          subtitle="You can choose a property for your detail view here or choose to add it later by clicking 'add without configuration'"
        />
        <Content>
          <Field label="Property">
            <PropertySelector
              onChange={value => {
                setProperty(value);
              }}
              value={property}
            />
          </Field>
        </Content>
        <Footer
          onSave={() => {
            const newPrefab = { ...prefab };

            newPrefab.structure[0].options[0].value = property;
            save(newPrefab);
          }}
          onSkip={() => {
            const newPrefab = { ...prefab };
            save(newPrefab);
          }}
          onClose={close}
        />
      </>
    );
  },
  structure: [
    {
      name: 'detailViewVerticalChild',
      options: [
        {
          type: 'PROPERTY',
          label: 'Property',
          key: 'property',
          value: '',
        },
      ],
      descendants: [],
    },
  ],
}))();
