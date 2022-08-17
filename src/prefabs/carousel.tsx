import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { Carousel } from './structures/Carousel';
import { CarouselImage } from './structures/CarouselImage';

const attr = {
  icon: Icon.ImageCarouselIcon,
  category: 'CONTENT',
  keywords: ['image', 'carousel', 'image carousel', 'slideshow'],
};

const beforeCreate = ({
  components: {
    Content,
    Header,
    Field,
    Footer,
    ModelRelationSelector,
    ButtonGroup,
    ButtonGroupButton,
    PropertySelector,
    Box,
    Button,
    Text,
    TextInput,
    DeleteButton,
  },
  prefab: originalPrefab,
  save,
  close,
  helpers: { cloneStructure, setOption },
}: BeforeCreateArgs) => {
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
              Select <b>URL</b> to add images via an URL or select <b>Model</b>{' '}
              to add the images via a data model.
            </Text>
          </div>
        }
        margin={{ top: '0px' }}
      />
      <Content>
        <Box margin={{ bottom: '32px' }}>
          <Field label="Source">
            <ButtonGroup
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => {
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
                <ModelRelationSelector
                  onChange={(value: string) => {
                    setModelId(value);
                  }}
                  value={modelId}
                />
              </Field>
              <Field label="Image property">
                <PropertySelector
                  modelId={modelId}
                  onChange={(value: string) => {
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
            {images.map((item) => (
              <Box key={item.index} margin={{ bottom: '15px' }}>
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
                        onChange={({
                          target: { value },
                        }: {
                          target: { value: string };
                        }) => {
                          if (typeof value !== 'string') {
                            throw new Error('expected string');
                          }
                          const index = images.findIndex(
                            (currentRow) => currentRow.index === item.index,
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
                        onClick={(event: any) => {
                          const newImages = [...images];
                          const index = newImages.findIndex(
                            (currentImage) =>
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
        onSave={(): void => {
          const newPrefab = { ...originalPrefab };
          const structure = newPrefab.structure[0];

          if (structure.type !== 'COMPONENT') {
            return;
          }
          if (select === 'custom') {
            structure.descendants = [];

            images.forEach(({ image }) => {
              const carouselImage = cloneStructure('Carousel image');
              if (carouselImage.type !== 'COMPONENT') {
                throw new Error(
                  `Expected a component, but instead got ${carouselImage.type}`,
                );
              }
              setOption(carouselImage, 'imageSource', (option) => ({
                ...option,
                value: [image],
              }));
              structure.descendants.push(carouselImage);
            });
          } else {
            setOption(structure, 'select', (option) => ({
              ...option,
              value: 'model',
            }));
            setOption(structure, 'model', (option) => ({
              ...option,
              value: modelId,
            }));
            setOption(structure, 'property', (option) => ({
              ...option,
              value: property,
            }));
          }
          save(newPrefab);
        }}
        onClose={close}
      />
    </>
  );
};
export default makePrefab('Carousel', attr, beforeCreate, [
  Carousel({}, [CarouselImage({})]),
]);
