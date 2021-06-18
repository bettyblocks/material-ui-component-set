(() => ({
  name: 'Carousel',
  icon: 'ImageCarouselIcon',
  category: 'NAVIGATION',
  keywords: ['image', 'carousel', 'image carousel', 'slideshow'],
  beforeCreate: ({
    components: {
      Content,
      Header,
      Field,
      Footer,
      ModelSelector,
      ButtonGroup,
      ButtonGroupButton,
      PropertySelector,
      Box,
      Button,
      Text,
      TextInput,
      DeleteButton,
    },
    prefab,
    save,
    close,
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [property, setProperty] = React.useState('');
    const [select, setSelect] = React.useState('custom');
    const [images, setImages] = React.useState([
      {
        index: 1,
        image:
          'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/image-carousel-preview',
      },
    ]);

    const maxImages = images.length < 9;

    return (
      <>
        <Header
          title="Configure image carousel"
          onClose={close}
          subtitle={
            <div style={{ marginTop: '-1rem' }}>
              <Text size="small" color="grey700">
                Select <b>URL</b> to add images via an URL or select{' '}
                <b>Model</b> to add the images via a data model.
              </Text>
            </div>
          }
          margin={{ top: '0px' }}
        />
        <Content>
          <Box margin={{ bottom: '32px' }}>
            <Field label="Source">
              <ButtonGroup
                onChange={({ target: { value } }) => {
                  setSelect(value);
                }}
                value={select}
                color="blue"
                size="large"
              >
                <ButtonGroupButton label="URL" value="custom" name="options" />
                <ButtonGroupButton label="Model" value="model" name="options" />
              </ButtonGroup>
            </Field>
          </Box>
          {select === 'model' ? (
            <Box>
              <Box direction="column" basis="full" pad={{ bottom: '10px' }}>
                <Field
                  info={
                    <Text size="small" color="grey700">
                      Add images to the image carousel by selecting a data model
                      and the image property.
                    </Text>
                  }
                >
                  <Text>
                    <b>Select a model and property</b>
                  </Text>
                </Field>
              </Box>
              <Field>
                <Field label="Select model">
                  <ModelSelector
                    onChange={value => {
                      setModelId(value);
                    }}
                    value={modelId}
                  />
                </Field>
                <Field label="Image property">
                  <PropertySelector
                    modelId={modelId}
                    onChange={value => {
                      setProperty(value);
                    }}
                    value={property}
                  />
                </Field>
              </Field>
            </Box>
          ) : (
            <Box direction="column">
              <Box direction="row" margin={{ bottom: '25px' }}>
                <Box direction="column" basis="full">
                  <Field
                    info={
                      <Text size="small" color="grey700">
                        Click on +Add image to add multiple images to the image
                        carousel.
                      </Text>
                    }
                  >
                    <Text>
                      <b>Add image</b>
                    </Text>
                  </Field>
                </Box>
                <Box
                  direction="column"
                  alignSelf="center"
                  basis="auto"
                  style={{ minWidth: '100px' }}
                >
                  <Button
                    label="+ Add image"
                    disabled={!maxImages}
                    onClick={() => {
                      if (maxImages) {
                        setImages([
                          ...images,
                          {
                            index: images.length + 1,
                            image:
                              'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/image-carousel-preview',
                          },
                        ]);
                      }
                    }}
                  />
                </Box>
              </Box>
              {images.map(item => (
                <Box margin={{ bottom: '15px' }}>
                  <Box
                    direction="column"
                    basis="auto"
                    alignSelf="start"
                    pad={{ right: '15px' }}
                  >
                    <Text size="small">IMAGE {item.index} URL</Text>
                  </Box>
                  <Field>
                    <Box direction="row">
                      <Box direction="column" basis="full">
                        <TextInput
                          onChange={({ target: { value } }) => {
                            const index = images.findIndex(
                              currentRow => currentRow.index === item.index,
                            );
                            const updatedImages = images;
                            updatedImages[index].image = value;
                            setImages([...updatedImages]);
                          }}
                          value={item.image}
                        />
                      </Box>
                      <Box
                        direction="column"
                        pad={{ left: '4px' }}
                        style={{ minWidth: '40px', maxWidth: '40px' }}
                      >
                        <DeleteButton
                          label="X"
                          value={item.index}
                          disabled={!(images.length > 1)}
                          onClick={event => {
                            const newImages = [...images];
                            const index = newImages.findIndex(
                              currentImage =>
                                currentImage.index ===
                                parseInt(event.target.value, 10),
                            );
                            if (index !== -1) {
                              newImages.splice(index, 1);

                              newImages.map((correctImage, imageIndex) => {
                                const newImage = correctImage;
                                newImage.index = imageIndex + 1;
                                return { ...newImage };
                              });
                              setImages([...newImages]);
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  </Field>
                </Box>
              ))}
            </Box>
          )}
        </Content>
        <Footer
          onSave={() => {
            const newPrefab = { ...prefab };

            newPrefab.structure[0].options[0].value = select;

            if (select === 'custom') {
              images.forEach(item => {
                newPrefab.structure[0].descendants.push({
                  name: 'CarouselImage',
                  options: [
                    {
                      value: [item.image],
                      label: 'Source',
                      key: 'imageSource',
                      type: 'VARIABLE',
                    },
                  ],
                  descendants: [],
                });
              });
            } else {
              newPrefab.structure[0].options[1].value = modelId;
              newPrefab.structure[0].options[2].value = property;
            }
            save(newPrefab);
          }}
          onClose={close}
        />
      </>
    );
  },
  interactions: [],
  variables: [],
  structure: [
    {
      name: 'Carousel',
      options: [
        {
          type: 'CUSTOM',
          label: 'Source',
          key: 'select',
          value: 'custom',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'URL',
                value: 'custom',
              },
              {
                name: 'Model',
                value: 'model',
              },
            ],
          },
        },
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          label: 'Property',
          key: 'property',
          type: 'PROPERTY',
          value: '',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          value: '',
          label: 'Order by',
          key: 'orderProperty',
          type: 'PROPERTY',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          value: 'asc',
          label: 'Sort order',
          key: 'sortOrder',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Ascending', value: 'asc' },
              { name: 'Descending', value: 'desc' },
            ],
            condition: {
              type: 'HIDE',
              option: 'orderProperty',
              comparator: 'EQ',
              value: '',
            },
          },
        },
        {
          type: 'NUMBER',
          label: 'Max images',
          key: 'maxImages',
          value: 50,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'model',
            },
          },
        },
        {
          type: 'NUMBER',
          label: 'Show image',
          key: 'activeStep',
          value: '1',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'custom',
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Show all images',
          key: 'allImages',
          value: false,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'select',
              comparator: 'EQ',
              value: 'custom',
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Continous loop',
          key: 'continousLoop',
          value: false,
        },
        {
          type: 'TOGGLE',
          label: 'Autoplay',
          key: 'autoplay',
          value: false,
        },
        {
          type: 'NUMBER',
          label: 'Autoplay duration (ms)',
          key: 'duration',
          value: '5000',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'autoplay',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'SIZE',
          label: 'Width',
          key: 'width',
          value: '',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          type: 'SIZE',
          label: 'Height',
          key: 'height',
          value: '',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          type: 'CUSTOM',
          label: 'Variant',
          key: 'variant',
          value: 'horizontal',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Overlay', value: 'horizontal' },
              { name: 'Bottom', value: 'mobile' },
            ],
          },
        },
        {
          type: 'COLOR',
          label: 'Active dot color',
          key: 'dotColor',
          value: 'Primary',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'horizontal',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Inactive dot color',
          key: 'incativeDotColor',
          value: 'Light',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'horizontal',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Button background color',
          key: 'buttonBackgroundColor',
          value: 'Light',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'horizontal',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Button icon color',
          key: 'buttonColor',
          value: 'Black',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'horizontal',
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Button next label',
          key: 'buttonNext',
          value: ['Next'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Button previous label',
          key: 'buttonPrev',
          value: ['Back'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Active color',
          key: 'activeColor',
          value: 'Primary',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Active Label color',
          key: 'activeLabelColor',
          value: 'Black',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Inactive color',
          key: 'inactiveColor',
          value: 'Secondary',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Inactive Label color',
          key: 'inactiveLabelColor',
          value: 'Medium',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Background color',
          key: 'backgroundColor',
          value: 'White',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Step Progress color',
          key: 'stepProgressColor',
          value: 'Black',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'mobile',
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
