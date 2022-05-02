(() => ({
  name: 'Partialnew',
  icon: 'PaperIcon',
  type: 'page',
  category: 'LAYOUT',
  keywords: ['Layout', 'paper'],
  beforeCreate: ({
    prefab,
    save,
    close,
    components: { Header, Content, PartialSelector, Footer },
  }) => {
    const [partialRef, setPartialRef] = React.useState({ id: '', name: '' });

    return (
      <>
        <Header onClose={close} title="Configure open page button" />
        <Content>
          <PartialSelector
            onChange={(id, name) => {
              setPartialRef({ id, name });
            }}
            value={partialRef.id}
            allowedTypes={[
              'BODY_COMPONENT',
              'CONTAINER_COMPONENT',
              'CONTENT_COMPONENT',
            ]}
          />
        </Content>
        <Footer
          onclick={close}
          onSave={() => {
            const newPrefab = { ...prefab };
            const partialComponent =
              newPrefab.structure[0].descendants[0].descendants[0];
            partialComponent.partialId = partialRef.id;
            partialComponent.options[0].value = partialRef.id;
            // partialComponent.label = partialRef.name;
            newPrefab.structure[0].descendants[0].descendants[0] =
              partialComponent;
            save(newPrefab);
          }}
          onSkip={() => {
            const newPrefab = { ...prefab };
            save(newPrefab);
          }}
        />
      </>
    );
  },
  structure: [
    {
      type: 'PARTIAL',
    },
  ],
}))();
