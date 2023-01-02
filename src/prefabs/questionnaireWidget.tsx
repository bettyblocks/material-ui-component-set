import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  PrefabInteraction,
  BeforeCreateArgs,
  sizes,
  variable,
  option,
  PrefabComponent,
  showIf,
  font,
  size,
  toggle,
  color,
  ThemeColor,
  buttongroup,
  PrefabComponentOption,
  PrefabVariable,
  InteractionType,
} from '@betty-blocks/component-sdk';
import {
  Box,
  boxOptions,
  Text as TextComp,
  textOptions,
  Drawer,
  DrawerBar,
  Media,
  mediaOptions,
  DrawerContainer,
  Grid,
  gridOptions,
  drawerBarOptions,
  DataContainer,
  Column,
  Row,
  columnOptions,
  rowOptions,
  drawerContainerOptions,
  List,
  Button,
  ListItem,
  buttonOptions,
  listItemOptions,
  Tab,
  Tabs,
  tabsOptions,
} from './structures';
import { ModelProps, ModelQuery } from './types';

const interactions: PrefabInteraction[] = [
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#PrimaryTab',
      sourceComponentId: '#PrimaryListItem',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#SecondaryTab',
      sourceComponentId: '#SecondaryListItem',
    },
    type: InteractionType.Custom,
  },
];
const variables: PrefabVariable[] = [];
const beforeCreate = ({
  components: {
    Content,
    Header,
    Footer,
    Field,
    ModelSelector,
    Text,
    TextInput,

    Box: BoxComp,
    Button: ButtonComp,
  },
  prefab,
  save,
  close,
  helpers: { useModelQuery, setOption },
}: BeforeCreateArgs) => {
  const [model, setModel] = React.useState<ModelProps>();
  const [secondaryModel, setSecondaryModel] = React.useState<ModelProps>();

  const [modelId, setModelId] = React.useState('');
  const [secondModelId, setSecondModelId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [validationMessage, setValidationMessage] = React.useState('');
  const [stepNumber, setStepNumber] = React.useState(1);

  // TODO: could this code be simplified by using only one query?
  const { data } = useModelQuery({
    variables: { id: modelId },
    onCompleted: (result: ModelQuery) => {
      setModel(result.model);
    },
    skip: !modelId,
  });
  const { data: secondaryData } = useModelQuery({
    variables: { id: secondModelId },
    onCompleted: (result: ModelQuery) => {
      setSecondaryModel(result.model);
    },
    skip: !secondModelId,
  });

  const treeSearch = (refValue: string, structure: any) =>
    structure.reduce((acc: string, component: PrefabComponent) => {
      if (acc) return acc;
      if (
        component.ref &&
        Object.values(component.ref).indexOf(refValue) > -1
      ) {
        return component;
      }
      return treeSearch(refValue, component.descendants);
    }, null);

  if (modelId === null && validationMessage === '') {
    setValidationMessage('Selecting a model is required');
  }

  const stepper = {
    setStep: (step: number) => {
      if (step === 1) {
        return (
          <>
            <Field pad={{ bottom: '15px' }}>
              <Text>
                Add a title and a description to (the first section of) the
                questionnaire
              </Text>
            </Field>
            <Field pad={{ bottom: '15px' }} label="Section title">
              <TextInput
                onChange={({
                  target: { value },
                }: {
                  target: { value: string };
                }) => {
                  if (typeof value !== 'string') {
                    throw new Error('expected string');
                  }
                  setTitle(value);
                }}
                value={title}
              />
            </Field>
            <Field pad={{ bottom: '15px' }} label="Section Description">
              <TextInput
                onChange={({
                  target: { value },
                }: {
                  target: { value: string };
                }) => {
                  if (typeof value !== 'string') {
                    throw new Error('expected string');
                  }
                  setDescription(value);
                }}
                value={description}
              />
            </Field>
          </>
        );
      }
      return (
        // TODO: make this beforeCreate page look a bit nicer if possible
        <>
          <Text size="medium" weight="bolder">
            Select models for your questionnaire datacontainers.
          </Text>
          <Field
            label="Primary tab model"
            error={
              validationMessage === '' && (
                <Text color="#e82600">{validationMessage}</Text>
              )
            }
          >
            <ModelSelector
              onChange={(value: string) => {
                setModelId(value);
              }}
              required
              modelId={modelId}
              value={modelId}
            />
          </Field>
          <Field label="Second tab model">
            <ModelSelector
              onChange={(value: string) => {
                setSecondModelId(value);
              }}
              modelId={secondModelId}
              value={secondModelId}
              error={
                validationMessage && (
                  <Text color="#e82600">{validationMessage}</Text>
                )
              }
            />
          </Field>
        </>
      );
    },
    onSave: async () => {
      const newPrefab = { ...prefab };
      const titleText = treeSearch('#Title', newPrefab.structure);
      const descriptionText = treeSearch('#Description', newPrefab.structure);
      const primaryTab = treeSearch('#PrimaryTab', newPrefab.structure);
      const secondaryTab = treeSearch('#SecondaryTab', newPrefab.structure);
      const firstTabDataContainer = treeSearch(
        '#firstTabDataContainer',
        newPrefab.structure,
      );
      const secondTabDataContainer = treeSearch(
        '#secondTabDataContainer',
        newPrefab.structure,
      );
      const primaryListItem = treeSearch(
        '#PrimaryListItem',
        newPrefab.structure,
      );
      const secondaryListItem = treeSearch(
        '#SecondaryListItem',
        newPrefab.structure,
      );

      // TODO: (questionable) Can the user create new sections? If yes, how are we going
      // to do this in the beforeCreate?

      setOption(titleText, 'content', (opt: PrefabComponentOption) => ({
        ...opt,
        value: [title],
        configuration: { as: 'MULTILINE' },
      }));
      setOption(descriptionText, 'content', (opt: PrefabComponentOption) => ({
        ...opt,
        value: [description],
        configuration: { as: 'MULTILINE' },
      }));
      setOption(
        firstTabDataContainer,
        'model',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: modelId,
        }),
      );
      setOption(
        secondTabDataContainer,
        'model',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: secondModelId,
        }),
      );

      if (data && model) {
        setOption(primaryTab, 'label', (opt: PrefabComponentOption) => ({
          ...opt,
          value: [model.label],
        }));
        primaryTab.label = model.label;

        setOption(
          primaryListItem,
          'primaryText',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: [model.label],
          }),
        );
      }
      if (secondaryData && secondaryModel) {
        setOption(secondaryTab, 'label', (opt: PrefabComponentOption) => ({
          ...opt,
          value: [secondaryModel.label],
        }));
        setOption(
          secondaryListItem,
          'primaryText',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: [secondaryModel.label],
          }),
        );
        secondaryTab.label = secondaryModel.label;
      }

      save(newPrefab);
    },
    buttons: () => (
      <BoxComp direction="row" justify="between">
        <BoxComp direction="row" margin="2rem">
          <ButtonComp
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
          <ButtonComp
            label="Next"
            size="large"
            disabled={stepNumber === stepper.stepAmount}
            onClick={() => {
              const newStepnumber = stepNumber + 1;
              setStepNumber(newStepnumber);
            }}
            primary
          />
        </BoxComp>
        <BoxComp>
          <Footer
            onClose={close}
            onSave={stepper.onSave}
            canSave={stepNumber === stepper.stepAmount}
          />
        </BoxComp>
      </BoxComp>
    ),
    progressBar: () => {
      return (
        <BoxComp
          justify="center"
          margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
        >
          <Text size="medium" weight="bold">{`Step: ${stepNumber + 1} / ${
            stepper.stepAmount + 1
          }`}</Text>
        </BoxComp>
      );
    },
    stepAmount: 2,
  };
  return (
    <>
      <Header onClose={close} title="Configure your questionnaire template" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

const attributes = {
  type: 'page',
  category: 'LAYOUT',
  icon: Icon.UpdateFormIcon,
  interactions,
  variables,
};

export default makePrefab('Questionnaire Widget', attributes, beforeCreate, [
  Drawer({}, [
    DrawerBar(
      {
        options: {
          ...drawerBarOptions,
          innerSpacing: sizes('Inner space', {
            value: ['0rem', '0rem', '0rem', '0rem'],
          }),
          themeBgColor: color('Theme background color', {
            value: ThemeColor.PRIMARY,
          }),
        },
      },
      [
        Box(
          {
            options: {
              ...boxOptions,
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
              stretch: toggle('Stretch (when in flex container)', {
                value: true,
              }),
              backgroundColor: color('Background color', {
                value: ThemeColor.BLACK,
              }),
              backgroundColorAlpha: option('NUMBER', {
                label: 'Background color opacity',
                value: 60,
              }),
            },
          },
          [
            Box({}, [
              Media(
                {
                  options: {
                    ...mediaOptions,
                    type: option('CUSTOM', {
                      label: 'Media type',
                      value: 'url',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Image', value: 'img' },
                          { name: 'Data/URL', value: 'url' },
                          { name: 'Video', value: 'video' },
                          { name: 'I-frame', value: 'iframe' },
                        ],
                      },
                    }),
                    urlFileSource: variable('Source', {
                      value: [
                        'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                      ],
                      configuration: {
                        placeholder: 'Starts with https:// or http://',
                        as: 'MULTILINE',
                        condition: showIf('type', 'EQ', 'url'),
                      },
                    }),
                  },
                },
                [],
              ),
            ]),
            Box(
              {
                options: {
                  ...boxOptions,
                  innerSpacing: sizes('Inner space', {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                  }),
                },
              },
              [
                List({}, [
                  ListItem(
                    {
                      options: {
                        ...listItemOptions,
                        primaryText: variable('Primary text', {
                          value: ['Overview'],
                        }),
                        titleColor: color('Title color', {
                          value: ThemeColor.WHITE,
                        }),
                      },
                    },
                    [],
                  ),
                  ListItem(
                    {
                      options: {
                        ...listItemOptions,
                        primaryText: variable('Primary text', {
                          value: ['My profile'],
                        }),
                        titleColor: color('Title color', {
                          value: ThemeColor.WHITE,
                        }),
                      },
                    },
                    [],
                  ),
                  ListItem(
                    {
                      options: {
                        ...listItemOptions,
                        primaryText: variable('Primary text', {
                          value: ['Sign out'],
                        }),
                        titleColor: color('Title color', {
                          value: ThemeColor.WHITE,
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
    DrawerContainer(
      {
        options: {
          ...drawerContainerOptions,
          innerSpacing: sizes('Inner space', {
            value: ['0rem', '0rem', '0rem', '0rem'],
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
                        Box(
                          {
                            options: {
                              ...boxOptions,
                              innerSpacing: sizes('Inner space', {
                                value: ['0rem', '0rem', '0rem', '0rem'],
                              }),
                              stretch: toggle(
                                'Stretch (when in flex container)',
                                {
                                  value: true,
                                },
                              ),
                              backgroundColor: color('Background color', {
                                value: ThemeColor.WHITE,
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
                                    Box(
                                      {
                                        options: {
                                          ...boxOptions,
                                          innerSpacing: sizes('Inner space', {
                                            value: ['L', 'L', 'L', 'L'],
                                          }),
                                          backgroundColor: color(
                                            'Background color',
                                            {
                                              value: ThemeColor.PRIMARY,
                                            },
                                          ),
                                          backgroundColorAlpha: option(
                                            'NUMBER',
                                            {
                                              label: 'Background color opacity',
                                              value: 10,
                                            },
                                          ),
                                        },
                                      },
                                      [
                                        TextComp(
                                          {
                                            ref: {
                                              id: '#Title',
                                            },
                                            options: {
                                              ...textOptions,
                                              content: variable('Content', {
                                                ref: {
                                                  id: '#TitleText',
                                                },
                                                value: [],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              }),
                                              type: font('Font', {
                                                value: ['Title4'],
                                              }),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    '0rem',
                                                    'S',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [],
                                        ),
                                        TextComp(
                                          {
                                            ref: {
                                              id: '#Description',
                                            },
                                            options: {
                                              ...textOptions,
                                              content: variable('Content', {
                                                ref: {
                                                  id: '#DescriptionText',
                                                },
                                                value: [],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              }),
                                              type: font('Font', {
                                                value: ['Body1'],
                                              }),
                                            },
                                          },
                                          [],
                                        ),
                                      ],
                                    ),
                                    Box(
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
                                        Row(
                                          {
                                            ref: { id: '#hasSectionsRow' },

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
                                                    {
                                                      name: 'XL',
                                                      value: 'XL',
                                                    },
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
                                                ref: {
                                                  id: '#sectionsColumn',
                                                },
                                                options: {
                                                  ...columnOptions,
                                                  columnWidth: option(
                                                    'CUSTOM',
                                                    {
                                                      label: 'Column width',
                                                      value: '3',
                                                      configuration: {
                                                        as: 'DROPDOWN',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Fit content',
                                                            value: 'fitContent',
                                                          },
                                                          {
                                                            name: 'Flexible',
                                                            value: 'flexible',
                                                          },
                                                          {
                                                            name: 'Hidden',
                                                            value: 'hidden',
                                                          },
                                                          {
                                                            name: '1',
                                                            value: '1',
                                                          },
                                                          {
                                                            name: '2',
                                                            value: '2',
                                                          },
                                                          {
                                                            name: '3',
                                                            value: '3',
                                                          },
                                                          {
                                                            name: '4',
                                                            value: '4',
                                                          },
                                                          {
                                                            name: '5',
                                                            value: '5',
                                                          },
                                                          {
                                                            name: '6',
                                                            value: '6',
                                                          },
                                                          {
                                                            name: '7',
                                                            value: '7',
                                                          },
                                                          {
                                                            name: '8',
                                                            value: '8',
                                                          },
                                                          {
                                                            name: '9',
                                                            value: '9',
                                                          },
                                                          {
                                                            name: '10',
                                                            value: '10',
                                                          },
                                                          {
                                                            name: '11',
                                                            value: '11',
                                                          },
                                                          {
                                                            name: '12',
                                                            value: '12',
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ),
                                                  columnWidthTabletLandscape:
                                                    option('CUSTOM', {
                                                      label:
                                                        'Column width (tablet landscape)',
                                                      value: '3',
                                                      configuration: {
                                                        as: 'DROPDOWN',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Fit content',
                                                            value: 'fitContent',
                                                          },
                                                          {
                                                            name: 'Flexible',
                                                            value: 'flexible',
                                                          },
                                                          {
                                                            name: 'Hidden',
                                                            value: 'hidden',
                                                          },
                                                          {
                                                            name: '1',
                                                            value: '1',
                                                          },
                                                          {
                                                            name: '2',
                                                            value: '2',
                                                          },
                                                          {
                                                            name: '3',
                                                            value: '3',
                                                          },
                                                          {
                                                            name: '4',
                                                            value: '4',
                                                          },
                                                          {
                                                            name: '5',
                                                            value: '5',
                                                          },
                                                          {
                                                            name: '6',
                                                            value: '6',
                                                          },
                                                          {
                                                            name: '7',
                                                            value: '7',
                                                          },
                                                          {
                                                            name: '8',
                                                            value: '8',
                                                          },
                                                          {
                                                            name: '9',
                                                            value: '9',
                                                          },
                                                          {
                                                            name: '10',
                                                            value: '10',
                                                          },
                                                          {
                                                            name: '11',
                                                            value: '11',
                                                          },
                                                          {
                                                            name: '12',
                                                            value: '12',
                                                          },
                                                        ],
                                                      },
                                                    }),
                                                  columnWidthTabletPortrait:
                                                    option('CUSTOM', {
                                                      value: '12',
                                                      label:
                                                        'Column width (tablet portrait)',
                                                      configuration: {
                                                        as: 'DROPDOWN',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Fit content',
                                                            value: 'fitContent',
                                                          },
                                                          {
                                                            name: 'Flexible',
                                                            value: 'flexible',
                                                          },
                                                          {
                                                            name: 'Hidden',
                                                            value: 'hidden',
                                                          },
                                                          {
                                                            name: '1',
                                                            value: '1',
                                                          },
                                                          {
                                                            name: '2',
                                                            value: '2',
                                                          },
                                                          {
                                                            name: '3',
                                                            value: '3',
                                                          },
                                                          {
                                                            name: '4',
                                                            value: '4',
                                                          },
                                                          {
                                                            name: '5',
                                                            value: '5',
                                                          },
                                                          {
                                                            name: '6',
                                                            value: '6',
                                                          },
                                                          {
                                                            name: '7',
                                                            value: '7',
                                                          },
                                                          {
                                                            name: '8',
                                                            value: '8',
                                                          },
                                                          {
                                                            name: '9',
                                                            value: '9',
                                                          },
                                                          {
                                                            name: '10',
                                                            value: '10',
                                                          },
                                                          {
                                                            name: '11',
                                                            value: '11',
                                                          },
                                                          {
                                                            name: '12',
                                                            value: '12',
                                                          },
                                                        ],
                                                      },
                                                    }),
                                                  columnWidthMobile: option(
                                                    'CUSTOM',
                                                    {
                                                      value: '12',
                                                      label:
                                                        'Column width (mobile)',
                                                      configuration: {
                                                        as: 'DROPDOWN',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Fit content',
                                                            value: 'fitContent',
                                                          },
                                                          {
                                                            name: 'Flexible',
                                                            value: 'flexible',
                                                          },
                                                          {
                                                            name: 'Hidden',
                                                            value: 'hidden',
                                                          },
                                                          {
                                                            name: '1',
                                                            value: '1',
                                                          },
                                                          {
                                                            name: '2',
                                                            value: '2',
                                                          },
                                                          {
                                                            name: '3',
                                                            value: '3',
                                                          },
                                                          {
                                                            name: '4',
                                                            value: '4',
                                                          },
                                                          {
                                                            name: '5',
                                                            value: '5',
                                                          },
                                                          {
                                                            name: '6',
                                                            value: '6',
                                                          },
                                                          {
                                                            name: '7',
                                                            value: '7',
                                                          },
                                                          {
                                                            name: '8',
                                                            value: '8',
                                                          },
                                                          {
                                                            name: '9',
                                                            value: '9',
                                                          },
                                                          {
                                                            name: '10',
                                                            value: '10',
                                                          },
                                                          {
                                                            name: '11',
                                                            value: '11',
                                                          },
                                                          {
                                                            name: '12',
                                                            value: '12',
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                TextComp(
                                                  {
                                                    options: {
                                                      ...textOptions,
                                                      content: variable(
                                                        'Content',
                                                        {
                                                          value: ['Sections'],
                                                          configuration: {
                                                            as: 'MULTILINE',
                                                          },
                                                        },
                                                      ),
                                                      type: font('Font', {
                                                        value: ['Title5'],
                                                      }),
                                                    },
                                                  },
                                                  [],
                                                ),
                                                Box(
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
                                                    // DataList({}, [
                                                    List({}, [
                                                      Box(
                                                        {
                                                          options: {
                                                            ...boxOptions,
                                                            alignment:
                                                              buttongroup(
                                                                'Alignment',
                                                                [
                                                                  [
                                                                    'None',
                                                                    'none',
                                                                  ],
                                                                  [
                                                                    'Left',
                                                                    'flex-start',
                                                                  ],
                                                                  [
                                                                    'Center',
                                                                    'center',
                                                                  ],
                                                                  [
                                                                    'Right',
                                                                    'flex-end',
                                                                  ],
                                                                  [
                                                                    'Justified',
                                                                    'space-between',
                                                                  ],
                                                                ],
                                                                {
                                                                  value:
                                                                    'flex-start',
                                                                  configuration:
                                                                    {
                                                                      dataType:
                                                                        'string',
                                                                    },
                                                                },
                                                              ),
                                                            valignment:
                                                              buttongroup(
                                                                'Vertical alignment',
                                                                [
                                                                  [
                                                                    'None',
                                                                    'none',
                                                                  ],
                                                                  [
                                                                    'Top',
                                                                    'flex-start',
                                                                  ],
                                                                  [
                                                                    'Center',
                                                                    'center',
                                                                  ],
                                                                  [
                                                                    'Bottom',
                                                                    'flex-end',
                                                                  ],
                                                                ],
                                                                {
                                                                  value:
                                                                    'center',
                                                                  configuration:
                                                                    {
                                                                      dataType:
                                                                        'string',
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
                                                          Button(
                                                            {
                                                              style: {
                                                                overwrite: {
                                                                  backgroundColor:
                                                                    {
                                                                      type: 'THEME_COLOR',
                                                                      value:
                                                                        'primary',
                                                                    },
                                                                  borderColor: {
                                                                    type: 'THEME_COLOR',
                                                                    value:
                                                                      'primary',
                                                                  },
                                                                  borderRadius:
                                                                    [
                                                                      '1.5625rem',
                                                                    ],

                                                                  padding: [
                                                                    '0.6875rem',
                                                                    '1rem',
                                                                    '0.6875rem',
                                                                    '1rem',
                                                                  ],
                                                                },
                                                              },
                                                              options: {
                                                                ...buttonOptions,
                                                                buttonText:
                                                                  variable(
                                                                    'Button text',
                                                                    {
                                                                      value: [
                                                                        '1',
                                                                      ],
                                                                    },
                                                                  ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                          ListItem(
                                                            {
                                                              ref: {
                                                                id: '#PrimaryListItem',
                                                              },

                                                              options: {
                                                                ...listItemOptions,
                                                                primaryText:
                                                                  variable(
                                                                    'Primary text',
                                                                    {
                                                                      value: [
                                                                        'Basic Information',
                                                                      ],
                                                                    },
                                                                  ),
                                                                titleColor:
                                                                  color(
                                                                    'Title color',
                                                                    {
                                                                      value:
                                                                        ThemeColor.PRIMARY,
                                                                    },
                                                                  ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                        ],
                                                      ),
                                                      Box(
                                                        {
                                                          options: {
                                                            ...boxOptions,
                                                            alignment:
                                                              buttongroup(
                                                                'Alignment',
                                                                [
                                                                  [
                                                                    'None',
                                                                    'none',
                                                                  ],
                                                                  [
                                                                    'Left',
                                                                    'flex-start',
                                                                  ],
                                                                  [
                                                                    'Center',
                                                                    'center',
                                                                  ],
                                                                  [
                                                                    'Right',
                                                                    'flex-end',
                                                                  ],
                                                                  [
                                                                    'Justified',
                                                                    'space-between',
                                                                  ],
                                                                ],
                                                                {
                                                                  value:
                                                                    'flex-start',
                                                                  configuration:
                                                                    {
                                                                      dataType:
                                                                        'string',
                                                                    },
                                                                },
                                                              ),
                                                            valignment:
                                                              buttongroup(
                                                                'Vertical alignment',
                                                                [
                                                                  [
                                                                    'None',
                                                                    'none',
                                                                  ],
                                                                  [
                                                                    'Top',
                                                                    'flex-start',
                                                                  ],
                                                                  [
                                                                    'Center',
                                                                    'center',
                                                                  ],
                                                                  [
                                                                    'Bottom',
                                                                    'flex-end',
                                                                  ],
                                                                ],
                                                                {
                                                                  value:
                                                                    'center',
                                                                  configuration:
                                                                    {
                                                                      dataType:
                                                                        'string',
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
                                                          Button(
                                                            {
                                                              style: {
                                                                overwrite: {
                                                                  backgroundColor:
                                                                    {
                                                                      type: 'THEME_COLOR',
                                                                      value:
                                                                        'primary',
                                                                    },
                                                                  borderColor: {
                                                                    type: 'THEME_COLOR',
                                                                    value:
                                                                      'primary',
                                                                  },
                                                                  borderRadius:
                                                                    [
                                                                      '1.5625rem',
                                                                    ],

                                                                  padding: [
                                                                    '0.6875rem',
                                                                    '1rem',
                                                                    '0.6875rem',
                                                                    '1rem',
                                                                  ],
                                                                },
                                                              },
                                                              options: {
                                                                ...buttonOptions,
                                                                buttonText:
                                                                  variable(
                                                                    'Button text',
                                                                    {
                                                                      value: [
                                                                        '2',
                                                                      ],
                                                                    },
                                                                  ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                          ListItem(
                                                            {
                                                              ref: {
                                                                id: '#SecondaryListItem',
                                                              },

                                                              options: {
                                                                ...listItemOptions,
                                                                primaryText:
                                                                  variable(
                                                                    'Primary text',
                                                                    {
                                                                      value: [
                                                                        'Other information',
                                                                      ],
                                                                    },
                                                                  ),

                                                                titleColor:
                                                                  color(
                                                                    'Title color',
                                                                    {
                                                                      value:
                                                                        ThemeColor.PRIMARY,
                                                                    },
                                                                  ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                        ],
                                                      ),
                                                    ]),
                                                    // ]),
                                                  ],
                                                ),
                                              ],
                                            ),
                                            Column(
                                              {
                                                ref: {
                                                  id: '#questionsColumn',
                                                },
                                                options: {
                                                  ...columnOptions,
                                                  columnWidth: option(
                                                    'CUSTOM',
                                                    {
                                                      label: 'Column width',
                                                      value: '9',
                                                      configuration: {
                                                        as: 'DROPDOWN',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Fit content',
                                                            value: 'fitContent',
                                                          },
                                                          {
                                                            name: 'Flexible',
                                                            value: 'flexible',
                                                          },
                                                          {
                                                            name: 'Hidden',
                                                            value: 'hidden',
                                                          },
                                                          {
                                                            name: '1',
                                                            value: '1',
                                                          },
                                                          {
                                                            name: '2',
                                                            value: '2',
                                                          },
                                                          {
                                                            name: '3',
                                                            value: '3',
                                                          },
                                                          {
                                                            name: '4',
                                                            value: '4',
                                                          },
                                                          {
                                                            name: '5',
                                                            value: '5',
                                                          },
                                                          {
                                                            name: '6',
                                                            value: '6',
                                                          },
                                                          {
                                                            name: '7',
                                                            value: '7',
                                                          },
                                                          {
                                                            name: '8',
                                                            value: '8',
                                                          },
                                                          {
                                                            name: '9',
                                                            value: '9',
                                                          },
                                                          {
                                                            name: '10',
                                                            value: '10',
                                                          },
                                                          {
                                                            name: '11',
                                                            value: '11',
                                                          },
                                                          {
                                                            name: '12',
                                                            value: '12',
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ),
                                                  columnWidthTabletLandscape:
                                                    option('CUSTOM', {
                                                      label:
                                                        'Column width (tablet landscape)',
                                                      value: '9',
                                                      configuration: {
                                                        as: 'DROPDOWN',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Fit content',
                                                            value: 'fitContent',
                                                          },
                                                          {
                                                            name: 'Flexible',
                                                            value: 'flexible',
                                                          },
                                                          {
                                                            name: 'Hidden',
                                                            value: 'hidden',
                                                          },
                                                          {
                                                            name: '1',
                                                            value: '1',
                                                          },
                                                          {
                                                            name: '2',
                                                            value: '2',
                                                          },
                                                          {
                                                            name: '3',
                                                            value: '3',
                                                          },
                                                          {
                                                            name: '4',
                                                            value: '4',
                                                          },
                                                          {
                                                            name: '5',
                                                            value: '5',
                                                          },
                                                          {
                                                            name: '6',
                                                            value: '6',
                                                          },
                                                          {
                                                            name: '7',
                                                            value: '7',
                                                          },
                                                          {
                                                            name: '8',
                                                            value: '8',
                                                          },
                                                          {
                                                            name: '9',
                                                            value: '9',
                                                          },
                                                          {
                                                            name: '10',
                                                            value: '10',
                                                          },
                                                          {
                                                            name: '11',
                                                            value: '11',
                                                          },
                                                          {
                                                            name: '12',
                                                            value: '12',
                                                          },
                                                        ],
                                                      },
                                                    }),
                                                  columnWidthTabletPortrait:
                                                    option('CUSTOM', {
                                                      value: '12',
                                                      label:
                                                        'Column width (tablet portrait)',
                                                      configuration: {
                                                        as: 'DROPDOWN',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Fit content',
                                                            value: 'fitContent',
                                                          },
                                                          {
                                                            name: 'Flexible',
                                                            value: 'flexible',
                                                          },
                                                          {
                                                            name: 'Hidden',
                                                            value: 'hidden',
                                                          },
                                                          {
                                                            name: '1',
                                                            value: '1',
                                                          },
                                                          {
                                                            name: '2',
                                                            value: '2',
                                                          },
                                                          {
                                                            name: '3',
                                                            value: '3',
                                                          },
                                                          {
                                                            name: '4',
                                                            value: '4',
                                                          },
                                                          {
                                                            name: '5',
                                                            value: '5',
                                                          },
                                                          {
                                                            name: '6',
                                                            value: '6',
                                                          },
                                                          {
                                                            name: '7',
                                                            value: '7',
                                                          },
                                                          {
                                                            name: '8',
                                                            value: '8',
                                                          },
                                                          {
                                                            name: '9',
                                                            value: '9',
                                                          },
                                                          {
                                                            name: '10',
                                                            value: '10',
                                                          },
                                                          {
                                                            name: '11',
                                                            value: '11',
                                                          },
                                                          {
                                                            name: '12',
                                                            value: '12',
                                                          },
                                                        ],
                                                      },
                                                    }),
                                                  columnWidthMobile: option(
                                                    'CUSTOM',
                                                    {
                                                      value: '12',
                                                      label:
                                                        'Column width (mobile)',
                                                      configuration: {
                                                        as: 'DROPDOWN',
                                                        dataType: 'string',
                                                        allowedInput: [
                                                          {
                                                            name: 'Fit content',
                                                            value: 'fitContent',
                                                          },
                                                          {
                                                            name: 'Flexible',
                                                            value: 'flexible',
                                                          },
                                                          {
                                                            name: 'Hidden',
                                                            value: 'hidden',
                                                          },
                                                          {
                                                            name: '1',
                                                            value: '1',
                                                          },
                                                          {
                                                            name: '2',
                                                            value: '2',
                                                          },
                                                          {
                                                            name: '3',
                                                            value: '3',
                                                          },
                                                          {
                                                            name: '4',
                                                            value: '4',
                                                          },
                                                          {
                                                            name: '5',
                                                            value: '5',
                                                          },
                                                          {
                                                            name: '6',
                                                            value: '6',
                                                          },
                                                          {
                                                            name: '7',
                                                            value: '7',
                                                          },
                                                          {
                                                            name: '8',
                                                            value: '8',
                                                          },
                                                          {
                                                            name: '9',
                                                            value: '9',
                                                          },
                                                          {
                                                            name: '10',
                                                            value: '10',
                                                          },
                                                          {
                                                            name: '11',
                                                            value: '11',
                                                          },
                                                          {
                                                            name: '12',
                                                            value: '12',
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                Tabs(
                                                  {
                                                    options: {
                                                      ...tabsOptions,
                                                      hideTabs: toggle(
                                                        'Hide visual tabs',
                                                        { value: true },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    Tab(
                                                      {
                                                        ref: {
                                                          id: '#PrimaryTab',
                                                        },
                                                      },
                                                      [
                                                        DataContainer(
                                                          {
                                                            ref: {
                                                              id: '#firstTabDataContainer',
                                                            },
                                                          },
                                                          [
                                                            TextComp(
                                                              {
                                                                options: {
                                                                  ...textOptions,
                                                                  content:
                                                                    variable(
                                                                      'Content',
                                                                      {
                                                                        value: [
                                                                          'Basic information',
                                                                        ],
                                                                        configuration:
                                                                          {
                                                                            as: 'MULTILINE',
                                                                          },
                                                                      },
                                                                    ),
                                                                  type: font(
                                                                    'Font',
                                                                    {
                                                                      value: [
                                                                        'Title5',
                                                                      ],
                                                                    },
                                                                  ),
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                            TextComp(
                                                              {
                                                                options: {
                                                                  ...textOptions,
                                                                  content:
                                                                    variable(
                                                                      'Content',
                                                                      {
                                                                        value: [
                                                                          `We'll start with some basic questions before we dive into details.`,
                                                                        ],
                                                                        configuration:
                                                                          {
                                                                            as: 'MULTILINE',
                                                                          },
                                                                      },
                                                                    ),
                                                                  type: font(
                                                                    'Font',
                                                                    {
                                                                      value: [
                                                                        'Body1',
                                                                      ],
                                                                    },
                                                                  ),
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                            Box({}, []),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                    Tab(
                                                      {
                                                        ref: {
                                                          id: '#SecondaryTab',
                                                        },
                                                      },
                                                      [
                                                        DataContainer(
                                                          {
                                                            ref: {
                                                              id: '#secondTabDataContainer',
                                                            },
                                                          },
                                                          [
                                                            TextComp(
                                                              {
                                                                options: {
                                                                  ...textOptions,
                                                                  content:
                                                                    variable(
                                                                      'Content',
                                                                      {
                                                                        value: [
                                                                          'Other information',
                                                                        ],
                                                                        configuration:
                                                                          {
                                                                            as: 'MULTILINE',
                                                                          },
                                                                      },
                                                                    ),
                                                                  type: font(
                                                                    'Font',
                                                                    {
                                                                      value: [
                                                                        'Title5',
                                                                      ],
                                                                    },
                                                                  ),
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                            TextComp(
                                                              {
                                                                options: {
                                                                  ...textOptions,
                                                                  content:
                                                                    variable(
                                                                      'Content',
                                                                      {
                                                                        value: [
                                                                          `On this page you can drag and drop widgets or make your own to create your questionnaire.`,
                                                                        ],
                                                                        configuration:
                                                                          {
                                                                            as: 'MULTILINE',
                                                                          },
                                                                      },
                                                                    ),
                                                                  type: font(
                                                                    'Font',
                                                                    {
                                                                      value: [
                                                                        'Body1',
                                                                      ],
                                                                    },
                                                                  ),
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                            Box({}, []),
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
  ]),
]);
