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
  BeforeCreateArgs,
  variable,
  buttongroup,
  ThemeColor,
  color,
  font,
  PrefabReference,
  PrefabComponent,
  PrefabComponentOption,
  wrapper,
  linked,
  PrefabInteraction,
  InteractionType,
} from '@betty-blocks/component-sdk';
import {
  Box as prefabBox,
  boxOptions,
  Text as prefabText,
  textOptions,
  Column,
  columnOptions,
  Grid,
  gridOptions,
  Row,
  rowOptions,
  DataContainer,
  dataContainerOptions,
  Media,
  mediaOptions,
  ActionJSButton,
  actionJSButtonOptions,
  Divider,
  dividerOptions,
} from './structures';
import {
  Property,
  PropertyStateProps,
  Properties,
  IdPropertyProps,
  ModelProps,
  ModelQuery,
} from './types';

const interactions: PrefabInteraction[] = [
  {
    type: InteractionType.Global,
    name: 'navigateToOutputUrl',
    sourceEvent: 'onActionSuccess',
    ref: {
      sourceComponentId: '#createAction',
    },
    parameters: [],
  },
];

const attrs = {
  name: 'Questionnaire Startpage',
  icon: Icon.SubmitButtonIcon,
  type: 'page',
  description:
    "Use this page as the start of your questionnaire flow. This template is best used in combination with the 'Questionnaire' template.",
  detail:
    "Use this page as the start of your questionnaire flow. This template is best used in combination with the 'Questionnaire' template.",
  previewUrl: 'https://preview.betty.app/questionnaire-startpage',
  previewImage:
    'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/b520d74dff324c5f8e06b319d02c4c6e',
  category: 'FORMV2',
  interactions,
};

const beforeCreate = ({
  save,
  close,
  prefab,
  components: {
    Header,
    Content,
    ModelSelector,
    PropertySelector,
    Footer,
    Field,
    Text,
  },
  helpers: { useModelQuery, setOption, prepareAction, createUuid },
}: BeforeCreateArgs) => {
  const [model, setModel] = React.useState<ModelProps>();
  const [modelId, setModelId] = React.useState('');
  const [showModelValidation, setShowModelValidation] = React.useState(false);
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  const [titleProperty, setTitleProperty] = React.useState<PropertyStateProps>({
    id: '',
  });
  const [showTitleValidation, setShowTitleValidation] = React.useState(false);
  const [descriptionProperty, setDescriptionProperty] =
    React.useState<PropertyStateProps>({
      id: '',
    });
  const [showDescriptionValidation, setShowDescriptionValidation] =
    React.useState(false);
  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });

  const createActionId = createUuid();

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

  useModelQuery({
    variables: { id: modelId },
    onCompleted: ({ model: dataModel }: ModelQuery) => {
      setModel(dataModel);
      setIdProperty(dataModel.properties.find(({ name }) => name === 'id'));
    },
  });

  return (
    <>
      <Header
        onClose={close}
        title="Configure Questionnaire initialization page"
      />
      <Content>
        <Field
          label="Select a model for saving the questionnaire data"
          error={
            showModelValidation && (
              <Text color="#e82600">Selecting a model is required</Text>
            )
          }
        >
          <ModelSelector
            onChange={(value: string) => {
              setShowModelValidation(false);
              setModelId(value);
              setTitleProperty({ id: '' });
              setDescriptionProperty({ id: '' });
            }}
            value={modelId}
          />
        </Field>
        <Field
          label="Title property"
          error={
            showTitleValidation && (
              <Text color="#e82600">Selecting a title is required</Text>
            )
          }
        >
          <PropertySelector
            modelId={modelId}
            onChange={(value: Property) => {
              setTitleProperty(value);
              setShowTitleValidation(false);
            }}
            value={titleProperty}
            disabled={!modelId}
          />
        </Field>
        <Field
          label="Description property"
          error={
            showDescriptionValidation && (
              <Text color="#e82600">Selecting a description is required</Text>
            )
          }
        >
          <PropertySelector
            modelId={modelId}
            onChange={(value: Property) => {
              setDescriptionProperty(value);
              setShowDescriptionValidation(false);
            }}
            value={descriptionProperty}
            disabled={!modelId}
          />
        </Field>
      </Content>
      <Footer
        onSave={async () => {
          if (!modelId) {
            setShowModelValidation(true);
            return;
          }
          if (!titleProperty.id) {
            setShowTitleValidation(true);
            return;
          }
          if (!descriptionProperty.id) {
            setShowDescriptionValidation(true);
            return;
          }
          const newPrefab = { ...prefab };

          const datacontainer = treeSearch(
            '#datacontainer',
            newPrefab.structure,
          );
          if (!datacontainer) throw new Error('No data container found');
          setOption(datacontainer, 'model', (opts: PrefabComponentOption) => ({
            ...opts,
            value: modelId,
          }));

          const titleText = treeSearch('#titleText', newPrefab.structure);
          if (!titleText) throw new Error('No questionnaire title found');
          setOption(titleText, 'content', (opts: PrefabComponentOption) => ({
            ...opts,
            value: [enrichVarObj(titleProperty)],
          }));
          const descriptionText = treeSearch(
            '#descriptionText',
            newPrefab.structure,
          );
          if (!descriptionText)
            throw new Error('No questionnaire description found');
          setOption(
            descriptionText,
            'content',
            (opts: PrefabComponentOption) => ({
              ...opts,
              value: [enrichVarObj(descriptionProperty)],
            }),
          );

          if (idProperty && model) {
            const createAction = treeSearch(
              '#createAction',
              newPrefab.structure,
            );
            if (!createAction) throw new Error('No action button found');
            createAction.id = createActionId;
            const properties: Properties[] = [];

            const result = await prepareAction(
              createActionId,
              idProperty,
              properties,
              'create',
              undefined,
              `Start Questionnaire - Create ${model.label}`,
              'public',
            );
            setOption(
              createAction,
              'actionId',
              (opt: PrefabComponentOption) => ({
                ...opt,
                value: result.action.actionId,
                configuration: { disabled: true },
                ref: { id: '#createActionOption' },
              }),
            );
            setOption(createAction, 'model', (opt: PrefabComponentOption) => ({
              ...opt,
              value: modelId,
              configuration: {
                disabled: true,
              },
            }));
          }

          save(newPrefab);
        }}
      />
    </>
  );
};

export default makePrefab('Questionnaire Startpage', attrs, beforeCreate, [
  wrapper(
    {
      label: 'Start Questionnaire',
      options: {
        title: linked({
          label: 'Questionnaire title',
          value: {
            ref: {
              componentId: '#titleText',
              optionId: '#questionnaireTitle',
            },
          },
        }),
        description: linked({
          label: 'Questionnaire description',
          value: {
            ref: {
              componentId: '#descriptionText',
              optionId: '#questionnaireDescription',
            },
          },
        }),
        createAction: linked({
          label: 'Start questionnaire action',
          value: {
            ref: {
              componentId: '#createAction',
              optionId: '#createActionOption',
            },
          },
        }),
      },
    },
    [
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
              prefabBox(
                {
                  options: {
                    ...boxOptions,
                    innerSpacing: sizes('Inner space', {
                      value: ['0rem', '0rem', '0rem', '0rem'],
                    }),
                    stretch: toggle('Stretch (when in flex container)', {
                      value: true,
                    }),
                    height: size('Height', {
                      value: '100vh',
                      configuration: {
                        as: 'UNIT',
                      },
                    }),
                    backgroundUrl: variable('Background url', {
                      value: [
                        'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/7da5d896b3194eddb22f92cf89781ab3',
                      ],
                    }),
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
                [
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
                            columnWidth: option('CUSTOM', {
                              label: 'Column width',
                              value: '4',
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
                              value: '4',
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
                              value: '6',
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
                              value: '12',
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
                            backgroundColor: color('Background color', {
                              value: ThemeColor.WHITE,
                            }),
                            verticalAlignment: option('CUSTOM', {
                              label: 'Vertical Alignment',
                              value: 'center',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'None', value: 'inherit' },
                                  { name: 'Top', value: 'flex-start' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Bottom', value: 'flex-end' },
                                ],
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
                                        condition: showIf(
                                          'type',
                                          'EQ',
                                          'container',
                                        ),
                                      },
                                    }),
                                  },
                                },
                                [
                                  prefabBox(
                                    {
                                      options: {
                                        ...boxOptions,
                                        valignment: buttongroup(
                                          'Vertical alignment',
                                          [
                                            ['None', 'none'],
                                            ['Top', 'flex-start'],
                                            ['Center', 'center'],
                                            ['Bottom', 'flex-end'],
                                          ],
                                          {
                                            value: 'center',
                                            configuration: {
                                              dataType: 'string',
                                            },
                                          },
                                        ),
                                        stretch: toggle(
                                          'Stretch (when in flex container)',
                                          {
                                            value: true,
                                          },
                                        ),
                                        innerSpacing: sizes('Inner space', {
                                          value: ['0rem', 'XL', '0rem', 'XL'],
                                        }),
                                      },
                                    },
                                    [
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
                                                  {
                                                    name: 'Full',
                                                    value: 'Full',
                                                  },
                                                ],
                                              },
                                            }),
                                          },
                                        },
                                        [
                                          Column(
                                            {
                                              options: {
                                                ...columnOptions,
                                                verticalAlignment: option(
                                                  'CUSTOM',
                                                  {
                                                    label: 'Vertical Alignment',
                                                    value: 'center',
                                                    configuration: {
                                                      as: 'BUTTONGROUP',
                                                      dataType: 'string',
                                                      allowedInput: [
                                                        {
                                                          name: 'None',
                                                          value: 'inherit',
                                                        },
                                                        {
                                                          name: 'Top',
                                                          value: 'flex-start',
                                                        },
                                                        {
                                                          name: 'Center',
                                                          value: 'center',
                                                        },
                                                        {
                                                          name: 'Bottom',
                                                          value: 'flex-end',
                                                        },
                                                      ],
                                                    },
                                                  },
                                                ),
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
                                              Media({
                                                options: {
                                                  ...mediaOptions,
                                                  type: option('CUSTOM', {
                                                    label: 'Media type',
                                                    value: 'url',
                                                    configuration: {
                                                      as: 'BUTTONGROUP',
                                                      dataType: 'string',
                                                      allowedInput: [
                                                        {
                                                          name: 'Image',
                                                          value: 'img',
                                                        },
                                                        {
                                                          name: 'Data/URL',
                                                          value: 'url',
                                                        },
                                                        {
                                                          name: 'Video',
                                                          value: 'video',
                                                        },
                                                        {
                                                          name: 'I-frame',
                                                          value: 'iframe',
                                                        },
                                                      ],
                                                    },
                                                  }),
                                                  urlFileSource: variable(
                                                    'Source',
                                                    {
                                                      value: [
                                                        'https://assets.bettyblocks.com/373317d12bf04d5496079adc02aab34a_assets/files/Your_Logo_-_B.svg',
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
                                                    },
                                                  ),
                                                  width: size('Width', {
                                                    value: '',
                                                    configuration: {
                                                      as: 'UNIT',
                                                    },
                                                  }),
                                                  outerSpacing: sizes(
                                                    'Outer space',
                                                    {
                                                      value: [
                                                        '0rem',
                                                        '0rem',
                                                        'XL',
                                                        '0rem',
                                                      ],
                                                    },
                                                  ),
                                                },
                                              }),
                                              DataContainer(
                                                {
                                                  ref: {
                                                    id: '#datacontainer',
                                                  },
                                                  options: {
                                                    ...dataContainerOptions,
                                                    loadingType: option(
                                                      'CUSTOM',
                                                      {
                                                        value: 'showChildren',
                                                        label: 'Show on load',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'Message',
                                                              value: 'default',
                                                            },
                                                            {
                                                              name: 'Content',
                                                              value:
                                                                'showChildren',
                                                            },
                                                          ],
                                                        },
                                                      },
                                                    ),
                                                  },
                                                },
                                                [
                                                  prefabText({
                                                    ref: {
                                                      id: '#titleText',
                                                    },
                                                    options: {
                                                      ...textOptions,
                                                      content: variable(
                                                        'Content',
                                                        {
                                                          ref: {
                                                            id: '#questionnaireTitle',
                                                          },
                                                          value: [''],
                                                          configuration: {
                                                            as: 'MULTILINE',
                                                          },
                                                        },
                                                      ),
                                                      type: font('Font', {
                                                        value: ['Title4'],
                                                      }),
                                                      outerSpacing: sizes(
                                                        'Outer space',
                                                        {
                                                          value: [
                                                            'L',
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                          ],
                                                        },
                                                      ),
                                                    },
                                                  }),
                                                  prefabText({
                                                    ref: {
                                                      id: '#descriptionText',
                                                    },
                                                    options: {
                                                      ...textOptions,
                                                      content: variable(
                                                        'Content',
                                                        {
                                                          ref: {
                                                            id: '#questionnaireDescription',
                                                          },
                                                          value: [''],
                                                          configuration: {
                                                            as: 'MULTILINE',
                                                          },
                                                        },
                                                      ),
                                                      type: font('Font', {
                                                        value: ['Body1'],
                                                      }),
                                                      outerSpacing: sizes(
                                                        'Outer space',
                                                        {
                                                          value: [
                                                            'M',
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                          ],
                                                        },
                                                      ),
                                                    },
                                                  }),
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
                                                      ActionJSButton({
                                                        ref: {
                                                          id: '#createAction',
                                                        },
                                                        style: {
                                                          overwrite: {
                                                            backgroundColor: {
                                                              type: 'THEME_COLOR',
                                                              value: 'primary',
                                                            },
                                                            borderColor: {
                                                              type: 'THEME_COLOR',
                                                              value: 'primary',
                                                            },
                                                            borderRadius: [
                                                              '0.25rem',
                                                            ],
                                                            borderStyle:
                                                              'solid',
                                                            borderWidth: [
                                                              '0.0625rem',
                                                            ],
                                                            boxShadow: 'none',
                                                            color: {
                                                              type: 'THEME_COLOR',
                                                              value: 'white',
                                                            },
                                                            fontFamily:
                                                              'Roboto',
                                                            fontSize:
                                                              '0.875rem',
                                                            fontStyle: 'none',
                                                            fontWeight: '400',
                                                            padding: [
                                                              '0.625rem',
                                                              '1.3125rem',
                                                            ],
                                                            textDecoration:
                                                              'none',
                                                            textTransform:
                                                              'none',
                                                          },
                                                        },
                                                        options: {
                                                          ...actionJSButtonOptions,
                                                          actionId: option(
                                                            'ACTION_JS',
                                                            {
                                                              label: 'Action',
                                                              value: '',
                                                              configuration: {
                                                                disabled: true,
                                                              },
                                                            },
                                                          ),
                                                          buttonText: variable(
                                                            'Button text',
                                                            {
                                                              value: [
                                                                'Start questionnaire',
                                                              ],
                                                            },
                                                          ),
                                                          outerSpacing: sizes(
                                                            'Outer space',
                                                            {
                                                              value: [
                                                                'M',
                                                                '0rem',
                                                                '0rem',
                                                                '0rem',
                                                              ],
                                                            },
                                                          ),
                                                        },
                                                      }),
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
                                  prefabBox(
                                    {
                                      options: {
                                        ...boxOptions,
                                        innerSpacing: sizes('Inner space', {
                                          value: [
                                            '0rem',
                                            '0rem',
                                            '0rem',
                                            '0rem',
                                          ],
                                        }),
                                      },
                                    },
                                    [
                                      Divider({
                                        options: {
                                          ...dividerOptions,
                                          outerSpacing: sizes('Outer space', {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                          }),
                                        },
                                      }),
                                      prefabText({
                                        options: {
                                          ...textOptions,
                                          content: variable('Content', {
                                            value: ['Powered by Betty Blocks'],
                                            configuration: { as: 'MULTILINE' },
                                          }),
                                          type: font('Font', {
                                            value: ['Body1'],
                                          }),
                                          textAlignment: option('CUSTOM', {
                                            label: 'Text Alignment',
                                            value: 'center',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                { name: 'Left', value: 'left' },
                                                {
                                                  name: 'Center',
                                                  value: 'center',
                                                },
                                                {
                                                  name: 'Right',
                                                  value: 'right',
                                                },
                                              ],
                                            },
                                          }),
                                          outerSpacing: sizes('Outer space', {
                                            value: ['L', '0rem', 'L', '0rem'],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.LIGHT,
                                          }),
                                        },
                                      }),
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
            ],
          ),
        ],
      ),
    ],
  ),
]);
