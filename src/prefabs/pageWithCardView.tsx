import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  option,
  text,
  sizes,
  size,
  showIf,
  toggle,
  color,
  ThemeColor,
  BeforeCreateArgs,
  variable,
  font,
  showIfTrue,
  icon,
  buttongroup,
  hideIf,
  PrefabInteraction,
  InteractionType,
  number,
  PrefabComponentOption,
  PrefabReference,
  PrefabComponent,
  wrapper,
  linked,
} from '@betty-blocks/component-sdk';
import {
  Box as prefabBox,
  Column,
  boxOptions,
  columnOptions,
  Grid,
  gridOptions,
  Row,
  rowOptions,
  Text as TextPrefab,
  textOptions,
  AppBar,
  appBarOptions,
  OpenPageButton,
  openPageButtonOptions,
  TextInput,
  textInputOptions,
  DataList,
  Button as ButtonPrefab,
  buttonOptions,
  dataListOptions,
  CardActions,
  CardContent,
  CardHeader,
  cardHeaderOptions,
  cardOptions,
  Card,
} from './structures';
import { showOn } from '../utils';
import { Property, PropertyStateProps } from './types';

const interactions: PrefabInteraction[] = [
  {
    name: 'Show',
    sourceEvent: 'onNoResults',
    ref: {
      targetComponentId: '#noresults',
      sourceComponentId: '#datalist',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onSuccess',
    ref: {
      targetComponentId: '#noresults',
      sourceComponentId: '#datalist',
    },
    type: InteractionType.Custom,
  },
];

const attrs = {
  icon: Icon.GridIcon,
  type: 'page',
  description:
    'View your content in a grid view with card items. This also includes a custom search field.',
  detail:
    'View your content in a grid view with card items. This page template also contains a custom search functonality to filter your data.',
  previewUrl: 'https://preview.betty.app/card-view',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Card_View.jpg',
  category: 'LAYOUT',
  interactions,
};

const beforeCreate = ({
  save,
  close,
  prefab,
  components: {
    Header,
    Content,
    Field,
    Footer,
    Text,
    Box,
    ModelSelector,
    PropertySelector,
    Button,
    PartialSelector,
  },
  helpers: { useModelQuery, setOption },
}: BeforeCreateArgs) => {
  const [showValidation, setShowValidation] = React.useState(false);
  const [modelId, setModelId] = React.useState('');
  const [imageProperty, setImageProperty] = React.useState<PropertyStateProps>({
    id: '',
  });
  const [titleProperty, setTitleProperty] = React.useState<PropertyStateProps>({
    id: '',
  });
  const [subheaderProperty, setSubheaderProperty] =
    React.useState<PropertyStateProps>({ id: '' });
  const [descriptionProperty, setDescriptionProperty] =
    React.useState<PropertyStateProps>({ id: '' });

  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });
  const [stepNumber, setStepNumber] = React.useState(1);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');

  const enrichVarObj = (obj: any) => {
    const returnObject = obj;
    if (data && data.model) {
      const property = data.model.properties.find(
        (prop: any) => prop.id === obj.id[0],
      );
      if (property) {
        returnObject.name = `{{ ${data.model.name}.${property.name} }}`;
      }
    }
    return returnObject;
  };

  function treeSearch(
    dirName: string,
    array: PrefabReference[],
  ): PrefabComponent | undefined {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < array.length; i++) {
      const q = array[i];
      if (q.type === 'COMPONENT') {
        if (q.ref && q.ref.id === dirName) {
          return q;
        }
      }
      if (q.type !== 'PARTIAL' && q.descendants && q.descendants.length) {
        const result = treeSearch(dirName, q.descendants);
        if (result) return result;
      }
    }
    return undefined;
  }

  const stepper = {
    setStep: (step: number) => {
      if (step === 1) {
        return (
          <>
            <Box pad={{ bottom: '15px' }}>
              <Box pad={{ bottom: '15px' }}>
                <Text size="medium" weight="bolder">
                  Select partials
                </Text>
              </Box>
              <Box pad={{ bottom: '15px' }}>
                <Text color="grey700">
                  By using a partial for the top menu and footer you can easily
                  reuse the same structure without having to go through every
                  page.
                </Text>
              </Box>
              <Field label="TOP MENU PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(headerId: string) => {
                    setHeaderPartialId(headerId);
                  }}
                  preSelected="Top menu"
                  value={headerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </Box>
            <Box pad={{ bottom: '15px' }}>
              <Field label="FOOTER PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(footerId: string) => {
                    setFooterPartialId(footerId);
                  }}
                  preSelected="Footer"
                  value={footerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </Box>
          </>
        );
      }
      return (
        <Box direction="row">
          <Box direction="column" basis="2/3">
            <Field
              label="Select model"
              error={
                showValidation && (
                  <Text color="#e82600">Selecting a model is required</Text>
                )
              }
            >
              <ModelSelector
                onChange={(value: string) => {
                  setShowValidation(false);
                  setModelId(value);
                  setImageProperty({ id: '' });
                  setTitleProperty({ id: '' });
                  setSubheaderProperty({ id: '' });
                  setDescriptionProperty({ id: '' });
                }}
                value={modelId}
              />
            </Field>
            <Field label="Image property">
              <PropertySelector
                modelId={modelId}
                onChange={(value: Property) => {
                  setImageProperty(value);
                }}
                value={imageProperty}
                disabled={!modelId}
              />
            </Field>
            <Field label="Title property">
              <PropertySelector
                modelId={modelId}
                onChange={(value: Property) => {
                  setTitleProperty(value);
                }}
                value={titleProperty}
                disabled={!modelId}
              />
            </Field>
            <Field label="Subheader property">
              <PropertySelector
                modelId={modelId}
                onChange={(value: Property) => {
                  setSubheaderProperty(value);
                }}
                value={subheaderProperty}
                disabled={!modelId}
              />
            </Field>
            <Field label="Description property">
              <PropertySelector
                modelId={modelId}
                onChange={(value: Property) => {
                  setDescriptionProperty(value);
                }}
                value={descriptionProperty}
                disabled={!modelId}
              />
            </Field>
          </Box>
          <Box direction="column" basis="1/3">
            <Field
              info={
                <Text size="small" color="grey700">
                  This is what each grid item will look like on the canvas
                </Text>
              }
            >
              <Text>Preview:</Text>
            </Field>
            <Box
              fill="true"
              round="4px"
              overflow="hidden"
              border={{
                color: '#E0E0E0',
                size: 'xsmall',
                style: 'solid',
                side: 'all',
              }}
            >
              <Box
                pad={imageProperty.id ? 'large' : 'medium'}
                border={
                  imageProperty.id
                    ? {
                        color: '#AFB5C8',
                        size: 'xsmall',
                        style: 'dashed',
                        side: 'all',
                      }
                    : ''
                }
                background={
                  imageProperty.id
                    ? '#F0F1F5'
                    : 'url(https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/contemplative_lizard)'
                }
                flex={{ grow: '30' }}
                justify="center"
                align="center"
              >
                <Text truncate="true">
                  {imageProperty.id ? enrichVarObj(imageProperty).name : ''}
                </Text>
              </Box>
              <Box pad="medium">
                <Text color="#000000DE" truncate="true">
                  {titleProperty.id
                    ? enrichVarObj(titleProperty).name
                    : 'Title'}
                </Text>
                <Text size="small" color="#0000008A" truncate="true">
                  {subheaderProperty.id
                    ? enrichVarObj(subheaderProperty).name
                    : 'Subheader'}
                </Text>
              </Box>
              <Box
                pad={{
                  top: 'none',
                  bottom: 'medium',
                  horizontal: 'medium',
                }}
              >
                <Text size="small" truncate="true">
                  {descriptionProperty.id
                    ? enrichVarObj(descriptionProperty).name
                    : 'Description'}
                </Text>
              </Box>
              <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                <Text size="large" textAlign="end">
                  ›
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    },
    onSave: () => {
      if (!modelId) {
        setShowValidation(true);
        return;
      }
      const newPrefab = { ...prefab };
      if (modelId) {
        const dataList = treeSearch('#datalist', newPrefab.structure);
        if (!dataList) throw new Error('No datalist found');
        setOption(
          dataList,
          'model',
          (originalOption: PrefabComponentOption) => ({
            ...originalOption,
            value: modelId,
          }),
        );
        if (imageProperty.id) {
          const imageBoxStructure = treeSearch(
            '#GridBoxImage',
            newPrefab.structure,
          );
          if (!imageBoxStructure)
            throw new Error('No image box structure found');
          setOption(
            imageBoxStructure,
            'backgroundUrl',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: [enrichVarObj(imageProperty)],
            }),
          );
        }
        const titleStructure = treeSearch(
          '#gridSubHeader',
          newPrefab.structure,
        );
        if (!titleStructure) throw new Error('No title structure found');
        if (titleProperty.id) {
          setOption(
            titleStructure,
            'title',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: [enrichVarObj(titleProperty)],
            }),
          );
          if (newPrefab.interactions) {
            newPrefab.interactions.push({
              name: 'Filter',
              sourceEvent: 'onChange',
              parameters: [
                {
                  id: [...titleProperty.id],
                  operator: 'regex',
                  parameter: 'property',
                  resolveValue: false,
                },
              ],
              ref: {
                targetComponentId: '#datalist',
                sourceComponentId: '#searchField',
              },
              type: 'Custom',
            } as PrefabInteraction);
          }
        }
        if (subheaderProperty.id) {
          setOption(
            titleStructure,
            'subHeader',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: [enrichVarObj(subheaderProperty)],
            }),
          );
        }
        if (descriptionProperty.id) {
          const descriptionStructure = treeSearch(
            '#gridDescription',
            newPrefab.structure,
          );
          if (!descriptionStructure)
            throw new Error('No description structure found');
          setOption(
            descriptionStructure,
            'content',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: [enrichVarObj(descriptionProperty)],
            }),
          );
        }
        // #region Partial Selection
        const prefabFooter = treeSearch('#Footer', newPrefab.structure);
        const prefabHeader = treeSearch('#Header', newPrefab.structure);
        if (headerPartialId && prefabHeader) {
          prefabHeader.descendants = [
            { type: 'PARTIAL', partialId: headerPartialId },
          ];
        }

        if (footerPartialId && prefabFooter) {
          prefabFooter.descendants = [
            { type: 'PARTIAL', partialId: footerPartialId },
          ];
        }
        // #endregion
        save(newPrefab);
      }
    },
    buttons: () => (
      <Box direction="row" justify="between">
        <Box direction="row" margin="2rem">
          <Button
            label="Previous"
            size="large"
            background={{ color: '#f0f1f5' }}
            onClick={() => {
              if (stepNumber === 1) {
                return;
              }
              const newStepnumber = stepNumber - 1;
              setStepNumber(newStepnumber);
            }}
            margin={{ right: '5px' }}
            disabled={stepNumber === 1}
          />
          <Button
            label="Next"
            size="large"
            disabled={stepNumber === stepper.stepAmount}
            onClick={() => {
              const newStepnumber = stepNumber + 1;
              setStepNumber(newStepnumber);
            }}
            primary
          />
        </Box>
        <Box>
          <Footer
            onClose={close}
            onSkip={() => {
              const newPrefab = { ...prefab };
              save(newPrefab);
            }}
            canSave={stepNumber === stepper.stepAmount}
            onSave={stepper.onSave}
          />
        </Box>
      </Box>
    ),
    progressBar: () => {
      return (
        <Box
          justify="center"
          margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
        >
          <Text size="medium" weight="bold">{`Step: ${stepNumber + 1} / ${
            stepper.stepAmount + 1
          }`}</Text>
        </Box>
      );
    },
    stepAmount: 2,
  };
  return (
    <>
      <Header onClose={close} title="Configure Card view" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default makePrefab('Overview, card view', attrs, beforeCreate, [
  Row(
    {
      options: {
        ...rowOptions,
        maxRowWidth: option('CUSTOM', {
          label: 'Width',
          value: 'Full',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'S', value: 'S' },
              { name: 'M', value: 'M' },
              { name: 'L', value: 'L' },
              { name: 'XL', value: 'XL' },
              { name: 'Full', value: 'Full' },
            ],
          },
        }),
        rowHeight: text('Height', {
          value: '100%',
          configuration: {
            as: 'UNIT',
          },
        }),
      },
    },
    [
      Column(
        {
          options: {
            ...columnOptions,
            columnHeight: text('Height', {
              value: '100%',
              configuration: {
                as: 'UNIT',
              },
            }),
            innerSpacing: sizes('Inner space', {
              value: ['0rem', '0rem', '0rem', '0rem'],
            }),
          },
        },
        [
          Grid(
            {
              options: {
                ...gridOptions,
                height: size('Height', {
                  value: '100%',
                  configuration: {
                    as: 'UNIT',
                  },
                }),
              },
            },
            [
              Grid(
                {
                  options: {
                    ...gridOptions,
                    direction: option('CUSTOM', {
                      value: 'column',
                      label: 'Direction',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Horizontal', value: 'row' },
                          { name: 'Vertical', value: 'column' },
                        ],
                        condition: showIf('type', 'EQ', 'container'),
                      },
                    }),
                  },
                },
                [
                  prefabBox(
                    {
                      ref: { id: '#Header' },

                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                      },
                    },
                    [
                      Column(
                        {
                          options: {
                            ...columnOptions,
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                            }),
                          },
                        },
                        [
                          prefabBox(
                            {
                              options: {
                                ...boxOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                                backgroundOptions: toggle(
                                  'Show background options',
                                  {
                                    value: true,
                                  },
                                ),
                                backgroundColor: color('Background color', {
                                  value: ThemeColor.PRIMARY,
                                  configuration: {
                                    condition: showIf(
                                      'backgroundOptions',
                                      'EQ',
                                      true,
                                    ),
                                  },
                                }),
                              },
                            },
                            [
                              Row({}, [
                                Column(
                                  {
                                    options: {
                                      ...columnOptions,
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                  },
                                  [
                                    AppBar(
                                      {
                                        options: {
                                          ...appBarOptions,
                                          urlFileSource: variable('Source', {
                                            value: [
                                              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                                            ],
                                            configuration: {
                                              placeholder:
                                                'Starts with https:// or http://',
                                              as: 'MULTILINE',
                                              condition: showIf(
                                                'type',
                                                'EQ',
                                                'url',
                                              ),
                                            },
                                          }),
                                          title: variable('Title', {
                                            value: [],
                                          }),
                                        },
                                      },
                                      [
                                        OpenPageButton(
                                          {
                                            style: {
                                              overwrite: {
                                                backgroundColor: {
                                                  type: 'STATIC',
                                                  value: 'transparent',
                                                },
                                                boxShadow: 'none',
                                                color: {
                                                  type: 'THEME_COLOR',
                                                  value: 'white',
                                                },
                                                fontFamily: 'Roboto',
                                                fontSize: '0.875rem',
                                                fontStyle: 'none',
                                                fontWeight: '400',
                                                padding: ['0rem', '0rem'],
                                                textDecoration: 'none',
                                                textTransform: 'none',
                                              },
                                            },
                                            options: {
                                              ...openPageButtonOptions,
                                              buttonText: variable(
                                                'Button text',
                                                { value: ['Menu 1'] },
                                              ),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                    'M',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [],
                                        ),
                                        OpenPageButton(
                                          {
                                            style: {
                                              overwrite: {
                                                backgroundColor: {
                                                  type: 'STATIC',
                                                  value: 'transparent',
                                                },
                                                boxShadow: 'none',
                                                color: {
                                                  type: 'THEME_COLOR',
                                                  value: 'white',
                                                },
                                                fontFamily: 'Roboto',
                                                fontSize: '0.875rem',
                                                fontStyle: 'none',
                                                fontWeight: '400',
                                                padding: ['0rem', '0rem'],
                                                textDecoration: 'none',
                                                textTransform: 'none',
                                              },
                                            },
                                            options: {
                                              ...openPageButtonOptions,
                                              buttonText: variable(
                                                'Button text',
                                                { value: ['Menu 2'] },
                                              ),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [],
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ]),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                  prefabBox(
                    {
                      options: {
                        ...boxOptions,
                        stretch: toggle('Stretch (when in flex container)', {
                          value: true,
                        }),
                        width: size('Width', {
                          value: '100%',
                          configuration: {
                            as: 'UNIT',
                          },
                        }),
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        backgroundColor: color('Background color', {
                          value: ThemeColor.LIGHT,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
                          },
                        }),
                        backgroundColorAlpha: option('NUMBER', {
                          label: 'Background color opacity',
                          value: 20,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
                          },
                        }),
                      },
                    },
                    [
                      wrapper(
                        {
                          label: 'Card view',
                          options: {
                            pageTitle: linked({
                              label: 'Page title',
                              value: {
                                ref: {
                                  componentId: '#pageTitle',
                                  optionId: '#pageTitleContent',
                                },
                              },
                            }),
                          },
                        },
                        [
                          Row({}, [
                            Column(
                              {
                                options: {
                                  ...columnOptions,
                                  columnWidth: option('CUSTOM', {
                                    label: 'Column width',
                                    value: 'flexible',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        { name: 'Flexible', value: 'flexible' },
                                        { name: 'Hidden', value: 'hidden' },
                                        { name: '1', value: '1' },
                                        { name: '2', value: '2' },
                                        { name: '3', value: '3' },
                                        { name: '4', value: '4' },
                                        { name: '5', value: '5' },
                                        { name: '6', value: '6' },
                                        { name: '7', value: '7' },
                                        { name: '8', value: '8' },
                                        { name: '9', value: '9' },
                                        { name: '10', value: '10' },
                                        { name: '11', value: '11' },
                                        { name: '12', value: '12' },
                                      ],
                                    },
                                  }),
                                  columnWidthTabletLandscape: option('CUSTOM', {
                                    label: 'Column width (tablet landscape)',
                                    value: 'flexible',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        { name: 'Flexible', value: 'flexible' },
                                        { name: 'Hidden', value: 'hidden' },
                                        { name: '1', value: '1' },
                                        { name: '2', value: '2' },
                                        { name: '3', value: '3' },
                                        { name: '4', value: '4' },
                                        { name: '5', value: '5' },
                                        { name: '6', value: '6' },
                                        { name: '7', value: '7' },
                                        { name: '8', value: '8' },
                                        { name: '9', value: '9' },
                                        { name: '10', value: '10' },
                                        { name: '11', value: '11' },
                                        { name: '12', value: '12' },
                                      ],
                                    },
                                  }),
                                  columnWidthTabletPortrait: option('CUSTOM', {
                                    value: 'flexible',
                                    label: 'Column width (tablet portrait)',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        { name: 'Flexible', value: 'flexible' },
                                        { name: 'Hidden', value: 'hidden' },
                                        { name: '1', value: '1' },
                                        { name: '2', value: '2' },
                                        { name: '3', value: '3' },
                                        { name: '4', value: '4' },
                                        { name: '5', value: '5' },
                                        { name: '6', value: '6' },
                                        { name: '7', value: '7' },
                                        { name: '8', value: '8' },
                                        { name: '9', value: '9' },
                                        { name: '10', value: '10' },
                                        { name: '11', value: '11' },
                                        { name: '12', value: '12' },
                                      ],
                                    },
                                  }),
                                  columnWidthMobile: option('CUSTOM', {
                                    value: 'flexible',
                                    label: 'Column width (mobile)',
                                    configuration: {
                                      as: 'DROPDOWN',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Fit content',
                                          value: 'fitContent',
                                        },
                                        { name: 'Flexible', value: 'flexible' },
                                        { name: 'Hidden', value: 'hidden' },
                                        { name: '1', value: '1' },
                                        { name: '2', value: '2' },
                                        { name: '3', value: '3' },
                                        { name: '4', value: '4' },
                                        { name: '5', value: '5' },
                                        { name: '6', value: '6' },
                                        { name: '7', value: '7' },
                                        { name: '8', value: '8' },
                                        { name: '9', value: '9' },
                                        { name: '10', value: '10' },
                                        { name: '11', value: '11' },
                                        { name: '12', value: '12' },
                                      ],
                                    },
                                  }),
                                  innerSpacing: sizes('Inner space', {
                                    value: ['L', 'L', 'L', 'L'],
                                  }),
                                },
                              },
                              [
                                TextPrefab(
                                  {
                                    ref: { id: '#pageTitle' },
                                    options: {
                                      ...textOptions,
                                      content: variable('Content', {
                                        value: ['Overview'],
                                        configuration: { as: 'MULTILINE' },
                                        ref: {
                                          id: '#pageTitleContent',
                                        },
                                      }),
                                      type: font('Text style', {
                                        value: ['Title4'],
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', '0rem', 'M', '0rem'],
                                      }),
                                    },
                                  },
                                  [],
                                ),
                                TextInput(
                                  {
                                    ref: { id: '#searchField' },
                                    options: {
                                      ...textInputOptions,
                                      label: variable('Label', {
                                        value: ['Search'],
                                      }),
                                      placeholder: variable('Placeholder', {
                                        value: ['Search'],
                                      }),

                                      autoComplete: toggle('Autocomplete', {
                                        value: true,
                                      }),
                                      adornmentIcon: icon('Icon', {
                                        value: 'Search',
                                      }),
                                      adornmentPosition: buttongroup(
                                        'Position',
                                        [
                                          ['Start', 'start'],
                                          ['End', 'end'],
                                        ],
                                        {
                                          value: 'start',
                                          configuration: {
                                            condition: {
                                              type: 'HIDE',
                                              option: 'adornmentIcon',
                                              comparator: 'EQ',
                                              value: '',
                                            },
                                          },
                                        },
                                      ),
                                      styles: toggle('Styles', { value: true }),
                                      hideLabel: toggle('Hide label', {
                                        value: true,
                                        ...showOn('styles'),
                                      }),

                                      placeholderColor: color(
                                        'Placeholder color',
                                        {
                                          value: ThemeColor.ACCENT_2,
                                          ...showOn('styles'),
                                        },
                                      ),
                                    },
                                  },
                                  [],
                                ),
                                Row({}, [
                                  Column(
                                    {
                                      ref: {
                                        id: '#noresults',
                                      },
                                    },
                                    [
                                      TextPrefab(
                                        {
                                          options: {
                                            ...textOptions,
                                            content: variable('Content', {
                                              value: ['No results found'],
                                              configuration: {
                                                as: 'MULTILINE',
                                              },
                                            }),
                                            type: font('Text style', {
                                              value: ['Body1'],
                                            }),
                                          },
                                        },
                                        [],
                                      ),
                                    ],
                                  ),
                                ]),
                                DataList(
                                  {
                                    ref: { id: '#datalist' },
                                    options: {
                                      ...dataListOptions,
                                      pagination: option('CUSTOM', {
                                        label: 'Pagination',
                                        value: 'whenNeeded',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          dependsOn: 'model',
                                          allowedInput: [
                                            {
                                              name: 'Always',
                                              value: 'always',
                                            },
                                            {
                                              name: 'When needed',
                                              value: 'whenNeeded',
                                            },
                                            {
                                              name: 'Never',
                                              value: 'never',
                                            },
                                          ],
                                        },
                                      }),
                                      take: number('Rows per page (max 50)', {
                                        value: '8',
                                        configuration: {
                                          dependsOn: 'model',
                                        },
                                      }),
                                      placeholderTake: number(
                                        'Placeholder rows',
                                        {
                                          value: '8',
                                        },
                                      ),
                                      type: option('CUSTOM', {
                                        label: 'Type',
                                        value: 'grid',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'List',
                                              value: 'list',
                                            },
                                            {
                                              name: 'Grid',
                                              value: 'grid',
                                            },
                                            {
                                              name: 'Inline',
                                              value: 'inline',
                                            },
                                          ],
                                        },
                                      }),
                                      width: size('Min Width', {
                                        value: '250px',
                                        configuration: {
                                          as: 'UNIT',
                                          condition: showIf(
                                            'type',
                                            'EQ',
                                            'grid',
                                          ),
                                        },
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['M', '0rem', 'M', '0rem'],
                                      }),
                                    },
                                  },
                                  [
                                    Card(
                                      {
                                        options: {
                                          ...cardOptions,
                                          variant: option('CUSTOM', {
                                            value: 'outlined',
                                            label: 'Variant',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Elevation',
                                                  value: 'elevation',
                                                },
                                                {
                                                  name: 'Outlined',
                                                  value: 'outlined',
                                                },
                                              ],
                                            },
                                          }),
                                        },
                                      },
                                      [
                                        prefabBox(
                                          {
                                            ref: {
                                              id: '#GridBoxImage',
                                            },
                                            options: {
                                              ...boxOptions,
                                              height: size('Height', {
                                                value: '220px',
                                                configuration: {
                                                  as: 'UNIT',
                                                },
                                              }),
                                              innerSpacing: sizes(
                                                'Inner space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                              backgroundUrl: variable(
                                                'Background url',
                                                {
                                                  value: [
                                                    'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/contemplative_lizard',
                                                  ],
                                                },
                                              ),
                                              backgroundSize: buttongroup(
                                                'Background size',
                                                [
                                                  ['Initial', 'initial'],
                                                  ['Contain', 'contain'],
                                                  ['Cover', 'cover'],
                                                ],
                                                {
                                                  value: 'cover',
                                                  configuration: {
                                                    dataType: 'string',
                                                  },
                                                },
                                              ),
                                            },
                                          },
                                          [],
                                        ),
                                        CardHeader(
                                          {
                                            ref: {
                                              id: '#gridSubHeader',
                                            },
                                            options: {
                                              ...cardHeaderOptions,
                                              subHeader: variable(
                                                'Sub header',
                                                {
                                                  value: ['Subheader'],
                                                },
                                              ),
                                            },
                                          },
                                          [],
                                        ),
                                        CardContent({}, [
                                          prefabBox(
                                            {
                                              options: {
                                                ...boxOptions,
                                                innerSpacing: sizes(
                                                  'Inner space',
                                                  {
                                                    value: [
                                                      '0rem',
                                                      '0rem',
                                                      '0rem',
                                                      '0rem',
                                                    ],
                                                  },
                                                ),
                                              },
                                            },
                                            [
                                              TextPrefab(
                                                {
                                                  ref: {
                                                    id: '#gridDescription',
                                                  },
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        value: ['Description'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Text style', {
                                                      value: ['Body2'],
                                                    }),
                                                  },
                                                },
                                                [],
                                              ),
                                            ],
                                          ),
                                        ]),
                                        CardActions({}, [
                                          ButtonPrefab(
                                            {
                                              style: {
                                                overwrite: {
                                                  backgroundColor: {
                                                    type: 'STATIC',
                                                    value: 'transparent',
                                                  },
                                                  boxShadow: 'none',
                                                  color: {
                                                    type: 'THEME_COLOR',
                                                    value: 'primary',
                                                  },
                                                  fontFamily: 'Roboto',
                                                  fontSize: '0.875rem',
                                                  fontStyle: 'none',
                                                  fontWeight: '400',
                                                  padding: [
                                                    '0.6875rem',
                                                    '0.6875rem',
                                                  ],
                                                  textDecoration: 'none',
                                                  textTransform: 'none',
                                                },
                                              },
                                              options: {
                                                ...buttonOptions,
                                                buttonText: variable(
                                                  'Button text',
                                                  { value: ['View'] },
                                                ),
                                                icon: icon('Icon', {
                                                  value: 'ChevronRight',
                                                }),
                                                size: option('CUSTOM', {
                                                  value: 'medium',
                                                  label: 'Icon size',
                                                  configuration: {
                                                    as: 'BUTTONGROUP',
                                                    dataType: 'string',
                                                    allowedInput: [
                                                      {
                                                        name: 'Small',
                                                        value: 'small',
                                                      },
                                                      {
                                                        name: 'Medium',
                                                        value: 'medium',
                                                      },
                                                      {
                                                        name: 'Large',
                                                        value: 'large',
                                                      },
                                                    ],
                                                    condition: hideIf(
                                                      'icon',
                                                      'EQ',
                                                      'none',
                                                    ),
                                                  },
                                                }),
                                                iconPosition: option('CUSTOM', {
                                                  label: 'Icon position',
                                                  value: 'end',
                                                  configuration: {
                                                    as: 'BUTTONGROUP',
                                                    dataType: 'string',
                                                    allowedInput: [
                                                      {
                                                        name: 'Start',
                                                        value: 'start',
                                                      },
                                                      {
                                                        name: 'End',
                                                        value: 'end',
                                                      },
                                                    ],
                                                    condition: hideIf(
                                                      'icon',
                                                      'EQ',
                                                      'none',
                                                    ),
                                                  },
                                                }),
                                              },
                                            },
                                            [],
                                          ),
                                        ]),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ]),
                        ],
                      ),
                    ],
                  ),
                  prefabBox(
                    {
                      ref: { id: '#Footer' },
                      options: {
                        ...boxOptions,
                        width: size('Width', {
                          value: '100%',
                          configuration: {
                            as: 'UNIT',
                          },
                        }),
                        innerSpacing: sizes('Inner space', {
                          ref: { id: '#footerBoxInnerSpacing' },
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        backgroundColor: color('Background color', {
                          value: ThemeColor.LIGHT,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
                          },
                        }),
                        backgroundColorAlpha: option('NUMBER', {
                          label: 'Background color opacity',
                          value: 20,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
                          },
                        }),
                      },
                    },
                    [
                      prefabBox(
                        {
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              ref: { id: '#footerBoxInnerSpacing' },
                              value: ['L', 'L', 'L', 'L'],
                            }),
                          },
                        },
                        [
                          TextPrefab(
                            {
                              options: {
                                ...textOptions,
                                content: variable('Content', {
                                  value: ['Powered by Bettyblocks'],
                                  configuration: { as: 'MULTILINE' },
                                }),
                                textAlignment: option('CUSTOM', {
                                  label: 'Text Alignment',
                                  value: 'center',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'Left', value: 'left' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'right' },
                                    ],
                                  },
                                }),
                                type: font('Text style', { value: ['Body1'] }),
                                styles: toggle('Styles', { value: true }),
                                textColor: color('Text color', {
                                  value: ThemeColor.MEDIUM,
                                  configuration: {
                                    condition: showIfTrue('styles'),
                                  },
                                }),
                              },
                            },
                            [],
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  ),
]);
