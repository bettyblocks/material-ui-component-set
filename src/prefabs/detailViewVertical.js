(() => ({
  name: 'detailViewVertical',
  icon: 'ContainerIcon',
  category: 'CONTENT',
  beforeCreate: ({
    components: {
      Content,
      Header,
      Field,
      Footer,
      ModelSelector,
      PropertiesSelector,
    },
    helpers: { useModelQuery },
    prefab,
    save,
    close,
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [properties, setProperties] = React.useState([]);

    const { data } = useModelQuery({
      variables: { id: modelId },
      skip: !modelId,
    });

    return (
      <>
        <Header title="Configure detail view" onClose={close} />
        <Content>
          <Field label="Model">
            <ModelSelector
              onChange={value => {
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
          <Field label="Records">
            <PropertiesSelector
              modelId={modelId}
              value={properties}
              onChange={value => {
                setProperties(value);
              }}
            />
          </Field>
        </Content>
        <Footer
          onSave={() => {
            const newPrefab = { ...prefab };

            if (data && data.model) {
              newPrefab.structure[0].options[0].value = data.model.label;
            }
            newPrefab.structure[0].options[1].value = modelId;

            properties.forEach(property => {
              let newProperty = property;
              const inheritFormatKinds = [
                'DATE_TIME',
                'DATE',
                'TIME',
                'INTEGER',
                'DECIMAL',
                'PRICE',
              ];
              if (inheritFormatKinds.includes(property.kind)) {
                newProperty = {
                  ...property,
                  format: 'INHERIT',
                };
              }

              newPrefab.structure[0].descendants.push({
                name: 'detailViewVerticalChild',
                options: [
                  {
                    type: 'VARIABLE',
                    label: 'Label',
                    key: 'label',
                    value: [newProperty.label],
                  },
                  {
                    type: 'PROPERTY',
                    label: 'Property',
                    key: 'property',
                    value: newProperty,
                  },
                ],
                descendants: [],
              });
            });

            save(newPrefab);
          }}
          onClose={close}
        />
      </>
    );
  },
  structure: [
    {
      name: 'detailViewVertical',
      options: [
        {
          type: 'TEXT',
          label: 'Title',
          key: 'title',
          value: 'Type your title here...',
        },
        {
          type: 'MODEL',
          label: 'Model',
          key: 'model',
          value: '',
        },
        {
          type: 'FILTER',
          label: 'Filter',
          key: 'filter',
          value: {},
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '',
          label: 'Current Record',
          key: 'currentRecord',
          type: 'NUMBER',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'currentRecord',
              comparator: 'EQ',
              value: 'never',
            },
          },
        },
        {
          value: ['M', 'M', 'M', 'M'],
          label: 'Inner space',
          key: 'innerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [],
    },
  ],
}))();
