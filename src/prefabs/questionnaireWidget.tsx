import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
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
    TextArea,
  },
  prefab,
  save,
  close,
  helpers: { useModelQuery, setOption },
}: BeforeCreateArgs) => {
  const [model, setModel] = React.useState<ModelProps>();
  const [modelId, setModelId] = React.useState('');

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [sectionTitle, setSectionTitle] = React.useState('');
  const [sectionDescription, setSectionDescription] = React.useState('');
  const [validation, setValidation] = React.useState(false);
  const [validationMessage, setValidationMessage] = React.useState('');
  const [stepNumber, setStepNumber] = React.useState(1);

  const { data } = useModelQuery({
    variables: { id: modelId },
    onCompleted: (result: ModelQuery) => {
      setModel(result.model);
    },
    skip: !modelId,
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

  if (modelId === '' && validationMessage === '') {
    setValidationMessage('Selecting a model is required');
  }

  const stepper = {
    setStep: (step: number) => {
      if (step === 1) {
        return (
          <>
            <Field pad={{ bottom: '15px' }}>
              <Text>Add a title and a description to the questionnaire</Text>
            </Field>
            <Field pad={{ bottom: '15px' }} label="Questionnaire title">
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
            <Field pad={{ bottom: '15px' }} label="Questionnaire description">
              <TextArea
                resize={false}
                style={{ minHeight: '150px' }}
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
      if (step === 2) {
        return (
          <>
            <Field pad={{ bottom: '15px' }}>
              <Text>
                Add a title and a description to the first section of the
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
                  setSectionTitle(value);
                }}
                value={sectionTitle}
              />
            </Field>
            <Field pad={{ bottom: '15px' }} label="Section description">
              <TextArea
                resize={false}
                style={{ minHeight: '150px' }}
                onChange={({
                  target: { value },
                }: {
                  target: { value: string };
                }) => {
                  if (typeof value !== 'string') {
                    throw new Error('expected string');
                  }
                  setSectionDescription(value);
                }}
                value={sectionDescription}
              />
            </Field>
          </>
        );
      }
      return (
        <>
          <Field pad={{ bottom: '15px' }}>
            <Text>Select a model for your questionnaire</Text>
          </Field>
          <Field
            label="Questionnaire model"
            error={
              validation && <Text color="#e82600">{validationMessage}</Text>
            }
          >
            <ModelSelector
              onChange={(value: string) => {
                setModelId(value);
                setValidationMessage('');
                setValidation(false);
              }}
              required
              modelId={modelId}
              value={modelId}
            />
          </Field>
        </>
      );
    },
    onSave: async () => {
      if (!modelId) {
        setValidation(true);
        return;
      }
      const newPrefab = { ...prefab };
      const titleText = treeSearch('#Title', newPrefab.structure);
      const descriptionText = treeSearch('#Description', newPrefab.structure);
      const primaryTab = treeSearch('#PrimaryTab', newPrefab.structure);
      const questionnaireDataContainer = treeSearch(
        '#questionnaireDataContainer',
        newPrefab.structure,
      );

      if (title) {
        setOption(titleText, 'content', (opt: PrefabComponentOption) => ({
          ...opt,
          value: [title],
          configuration: { as: 'MULTILINE' },
        }));
      }
      if (description) {
        setOption(descriptionText, 'content', (opt: PrefabComponentOption) => ({
          ...opt,
          value: [description],
          configuration: { as: 'MULTILINE' },
        }));
      }
      setOption(
        questionnaireDataContainer,
        'model',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: modelId,
        }),
      );
      if (data && model) {
        setOption(primaryTab, 'label', (opt: PrefabComponentOption) => ({
          ...opt,
          value: [model.label],
        }));
        primaryTab.label = model.label;
      }

      if (sectionTitle !== '') {
        const sectionTitleText = treeSearch(
          '#sectionTitle',
          newPrefab.structure,
        );
        if (sectionTitleText.type === 'COMPONENT') {
          setOption(
            sectionTitleText,
            'content',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: [sectionTitle],
            }),
          );
        }

        const sectionButton = treeSearch('#primaryButton', newPrefab.structure);
        if (sectionButton.type === 'COMPONENT') {
          setOption(
            sectionButton,
            'buttonText',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: [sectionTitle],
            }),
          );
        }
      }

      if (sectionDescription !== '') {
        const sectionDescriptionText = treeSearch(
          '#sectionDescription',
          newPrefab.structure,
        );
        if (sectionDescriptionText.type === 'COMPONENT') {
          setOption(
            sectionDescriptionText,
            'content',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: [sectionDescription],
            }),
          );
        }
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
            canSave={stepNumber === stepper.stepAmount && modelId !== ''}
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
          <Text
            size="medium"
            weight="bold"
          >{`Step: ${stepNumber} / ${stepper.stepAmount}`}</Text>
        </BoxComp>
      );
    },
    stepAmount: 3,
  };
  return (
    <>
      <Header onClose={close} title="Configure your questionnaire" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

const attributes = {
  category: 'WIDGETS',
  icon: Icon.UpdateFormIcon,
  type: 'page',
  detail:
    'Easily build a questionnaire with or without sections, weighted scoring, logic and more with this template.',
  description:
    'Easily build a questionnaire with or without sections, weighted scoring, logic and more with this template.',
  previewImage:
    'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/56b89343f4ef499393e162173777c9ec',
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
                                            value: ['L', 'XL', 'XL', 'XL'],
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
                                                value: ['Title'],
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
                                              fontWeight: option('CUSTOM', {
                                                label: 'Font weight',
                                                value: '500',
                                                configuration: {
                                                  as: 'DROPDOWN',
                                                  dataType: 'string',
                                                  allowedInput: [
                                                    {
                                                      name: '100',
                                                      value: '100',
                                                    },
                                                    {
                                                      name: '200',
                                                      value: '200',
                                                    },
                                                    {
                                                      name: '300',
                                                      value: '300',
                                                    },
                                                    {
                                                      name: '400',
                                                      value: '400',
                                                    },
                                                    {
                                                      name: '500',
                                                      value: '500',
                                                    },
                                                    {
                                                      name: '600',
                                                      value: '600',
                                                    },
                                                    {
                                                      name: '700',
                                                      value: '700',
                                                    },
                                                    {
                                                      name: '800',
                                                      value: '800',
                                                    },
                                                    {
                                                      name: '900',
                                                      value: '900',
                                                    },
                                                  ],
                                                },
                                              }),
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
                                                value: ['Description'],
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
                                                  innerSpacing: sizes(
                                                    'Inner space',
                                                    {
                                                      value: [
                                                        'XL',
                                                        '0rem',
                                                        'XL',
                                                        'XL',
                                                      ],
                                                    },
                                                  ),
                                                  columnWidth: option(
                                                    'CUSTOM',
                                                    {
                                                      label: 'Column width',
                                                      value: '2',
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
                                                      value: '2',
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
                                                    List(
                                                      {
                                                        ref: {
                                                          id: '#sectionButtonList',
                                                        },
                                                      },
                                                      [
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
                                                              innerSpacing:
                                                                sizes(
                                                                  'Inner space',
                                                                  {
                                                                    value: [
                                                                      '0rem',
                                                                      '0rem',
                                                                      'M',
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
                                                                    borderColor:
                                                                      {
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
                                                            Button(
                                                              {
                                                                ref: {
                                                                  id: '#primaryButton',
                                                                },
                                                                style: {
                                                                  overwrite: {
                                                                    backgroundColor:
                                                                      {
                                                                        type: 'STATIC',
                                                                        value:
                                                                          'transparent',
                                                                      },
                                                                    boxShadow:
                                                                      'none',
                                                                    color: {
                                                                      type: 'THEME_COLOR',
                                                                      value:
                                                                        'primary',
                                                                    },
                                                                    fontFamily:
                                                                      'Roboto',
                                                                    fontSize:
                                                                      '0.875rem',
                                                                    fontStyle:
                                                                      'none',
                                                                    fontWeight:
                                                                      '400',
                                                                    padding: [
                                                                      '0.6875rem',
                                                                      '1rem',
                                                                      '0.6875rem',
                                                                      '1rem',
                                                                    ],
                                                                    textDecoration:
                                                                      'none',
                                                                    textTransform:
                                                                      'none',
                                                                  },
                                                                },

                                                                options: {
                                                                  ...buttonOptions,
                                                                  buttonText:
                                                                    variable(
                                                                      'Button Text',
                                                                      {
                                                                        value: [
                                                                          'Basic information',
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
                                                  innerSpacing: sizes(
                                                    'Inner space',
                                                    {
                                                      value: [
                                                        'XL',
                                                        'XL',
                                                        'XL',
                                                        'XL',
                                                      ],
                                                    },
                                                  ),
                                                  columnWidth: option(
                                                    'CUSTOM',
                                                    {
                                                      label: 'Column width',
                                                      value: '10',
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
                                                      value: '10',
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
                                                DataContainer(
                                                  {
                                                    ref: {
                                                      id: '#questionnaireDataContainer',
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
                                                            TextComp(
                                                              {
                                                                ref: {
                                                                  id: '#sectionTitle',
                                                                },
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
                                                                  fontWeight:
                                                                    option(
                                                                      'CUSTOM',
                                                                      {
                                                                        label:
                                                                          'Font weight',
                                                                        value:
                                                                          '500',
                                                                        configuration:
                                                                          {
                                                                            as: 'DROPDOWN',
                                                                            dataType:
                                                                              'string',
                                                                            allowedInput:
                                                                              [
                                                                                {
                                                                                  name: '100',
                                                                                  value:
                                                                                    '100',
                                                                                },
                                                                                {
                                                                                  name: '200',
                                                                                  value:
                                                                                    '200',
                                                                                },
                                                                                {
                                                                                  name: '300',
                                                                                  value:
                                                                                    '300',
                                                                                },
                                                                                {
                                                                                  name: '400',
                                                                                  value:
                                                                                    '400',
                                                                                },
                                                                                {
                                                                                  name: '500',
                                                                                  value:
                                                                                    '500',
                                                                                },
                                                                                {
                                                                                  name: '600',
                                                                                  value:
                                                                                    '600',
                                                                                },
                                                                                {
                                                                                  name: '700',
                                                                                  value:
                                                                                    '700',
                                                                                },
                                                                                {
                                                                                  name: '800',
                                                                                  value:
                                                                                    '800',
                                                                                },
                                                                                {
                                                                                  name: '900',
                                                                                  value:
                                                                                    '900',
                                                                                },
                                                                              ],
                                                                          },
                                                                      },
                                                                    ),
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                            TextComp(
                                                              {
                                                                ref: {
                                                                  id: '#sectionDescription',
                                                                },
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
                                                            Box(
                                                              {
                                                                label:
                                                                  'Question drop area',
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
