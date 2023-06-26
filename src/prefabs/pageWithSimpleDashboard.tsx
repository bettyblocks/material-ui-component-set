import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  option,
  sizes,
  text,
  PrefabReference,
  PrefabInteraction,
  PrefabComponent,
  BeforeCreateArgs,
  variable,
  font,
  size,
  color,
  ThemeColor,
  buttongroup,
  showIf,
  icon,
  toggle,
  hideIf,
  number,
  PrefabComponentOption,
  showIfTrue,
} from '@betty-blocks/component-sdk';
import {
  Column,
  columnOptions,
  Row,
  rowOptions,
  Grid,
  gridOptions,
  Box as BoxPrefab,
  boxOptions,
  Text as TextPrefab,
  textOptions,
  Avatar,
  avatarOptions,
  TextInput,
  textInputOptions,
  Button as ButtonPrefab,
  buttonOptions,
  DataTable,
  dataTableOptions,
  openPageButtonOptions,
  AppBar,
  appBarOptions,
  OpenPageButton,
} from './structures';
import { showOn } from '../utils';

import { Property } from './types';

const interactions: PrefabInteraction[] = [];

const attrs = {
  icon: Icon.DataTable,
  type: 'page',
  description:
    'View your content in a data table with cards containing counters.',
  detail:
    'This dashboard has a configurable data table and some cards containing static data. This to spark your interest and show what things are possible with the Page builder.',
  previewUrl: 'https://preview.betty.app/simple-dashboard',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Simple_Dashboard.jpg',
  category: 'DATA',
  interactions,
};

const beforeCreate = ({
  components: {
    Header,
    Content,
    Footer,
    Field,
    Text,
    ModelSelector,
    PartialSelector,
    PropertiesSelector,
    PropertySelector,
    Box,
    Button,
  },
  helpers: { useModelQuery, setOption, cloneStructure, createBlacklist },
  prefab,
  save,
  close,
}: BeforeCreateArgs) => {
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');
  const [modelId, setModelId] = React.useState('');
  const [searchProperty, setSerachProperty] = React.useState<any>('');
  const [properties, setProperties] = React.useState<any>([]);
  const [modelValidation, setModelValidation] = React.useState(false);
  const [propertiesValidation, setPropertiesValidation] = React.useState(false);
  const [stepNumber, setStepNumber] = React.useState(1);
  const [canSave, setCanSave] = React.useState(false);
  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });

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

  const disabledKinds = createBlacklist([
    'BOOLEAN',
    'DATE',
    'DATE_TIME',
    'DECIMAL',
    'EMAIL',
    'EMAIL_ADDRESS',
    'ENUM',
    'FLOAT',
    'GOOGLE_DOCUMENT',
    'HAS_ONE',
    'IBAN',
    'IMAGE',
    'INTEGER',
    'LIST',
    'PERIODIC_COUNT',
    'PHONE_NUMBER',
    'PRICE',
    'SERIAL',
    'STRING',
    'TEXT',
    'TIME',
    'URL',
  ]);

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
                  reuse the same structure without having to go through page.
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
        <>
          <Field
            label="Model"
            error={
              modelValidation && (
                <Text color="#e82600">Selecting a model is required</Text>
              )
            }
          >
            <ModelSelector
              onChange={(value: string) => {
                setModelValidation(false);
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
          <Field
            label="Columns in the data table"
            error={
              propertiesValidation && (
                <Text color="#e82600">Selecting a property is required</Text>
              )
            }
          >
            <PropertiesSelector
              modelId={modelId}
              value={properties}
              disabledKinds={disabledKinds}
              onChange={(selectedFieldProperty: string) => {
                setProperties(selectedFieldProperty);
                setCanSave(selectedFieldProperty.length > 0);
              }}
            />
          </Field>
          <Field label="Select search property for data table">
            <PropertySelector
              modelId={modelId}
              onChange={(selectedSearchProperty: string) => {
                setSerachProperty(selectedSearchProperty);
              }}
              value={searchProperty}
            />
          </Field>
        </>
      );
    },
    onSave: async () => {
      const newPrefab = { ...prefab };
      const formProperties = properties.filter(
        (property: Property) =>
          property.label !== 'Created at' &&
          property.label !== 'Updated at' &&
          property.label !== 'Id',
      );
      const propertiesLength = formProperties.length;

      if (!modelId || propertiesLength < 1) {
        setModelValidation(!modelId);
        setPropertiesValidation(propertiesLength < 1);
        return;
      }

      // Set header
      const prefabHeader = treeSearch('#Header', newPrefab.structure);
      if (!prefabHeader) throw new Error('');
      if (headerPartialId) {
        prefabHeader.descendants = [
          { type: 'PARTIAL', partialId: headerPartialId },
        ];
      }

      // Set footer
      const prefabFooter = treeSearch('#Footer', newPrefab.structure);
      if (!prefabFooter) throw new Error('');
      if (footerPartialId) {
        prefabFooter.descendants = [
          { type: 'PARTIAL', partialId: footerPartialId },
        ];
      }

      // Set datatable
      const dataTableComp = treeSearch('#dataTable', newPrefab.structure);
      if (!dataTableComp) throw new Error('');
      setOption(dataTableComp, 'model', (opts: PrefabComponentOption) => ({
        ...opts,
        value: modelId,
      }));
      if (!data) throw new Error('');

      // Set search field placeholder with label
      const searchFieldComp = treeSearch('#searchField', newPrefab.structure);
      if (!searchFieldComp) throw new Error('');
      if (searchProperty) {
        // Get search property label
        const propertyLabel = data.model.properties.find(
          (prop: Property) => prop.id === searchProperty.id[0],
        ).name;

        setOption(
          searchFieldComp,
          'placeholder',
          (originalOption: PrefabComponentOption) => ({
            ...originalOption,
            value: [`Search on ${propertyLabel}`],
          }),
        );
        // Set search interaction
        if (newPrefab.interactions) {
          newPrefab.interactions.push({
            name: 'Filter',
            sourceEvent: 'onChange',
            parameters: [
              {
                parameter: 'property',
                operator: 'matches',
                resolveValue: false,
                id: [...searchProperty.id],
              },
            ],
            ref: {
              targetComponentId: '#dataTable',
              sourceComponentId: '#searchField',
            },
            type: 'Custom',
          } as PrefabInteraction);
        }
      }

      const dataLabel = data.model.label;

      const titleText = treeSearch('#titleText', newPrefab.structure);
      if (!titleText) throw new Error('Title component not found');
      setOption(
        titleText,
        'content',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: [`${dataLabel}s Dashboard`],
        }),
      );

      const modelText = treeSearch('#modelText', newPrefab.structure);
      if (!modelText) throw new Error('Title text component not found');
      setOption(
        modelText,
        'content',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: [`${dataLabel}s`],
        }),
      );

      const totalText = treeSearch('#totalText', newPrefab.structure);
      if (!totalText) throw new Error('Total text component not found');
      setOption(
        totalText,
        'content',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: [`${dataLabel}s in total`],
        }),
      );

      const doneText = treeSearch('#doneText', newPrefab.structure);
      if (!doneText) throw new Error('Done text component not found');
      setOption(
        doneText,
        'content',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: [`${dataLabel}s done`],
        }),
      );

      const inProgressText = treeSearch('#inProgressText', newPrefab.structure);
      if (!inProgressText)
        throw new Error('In progress text component not found');
      setOption(
        inProgressText,
        'content',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: [`${dataLabel}s in progress`],
        }),
      );

      const blockedText = treeSearch('#blockedText', newPrefab.structure);
      if (!blockedText) throw new Error('Blocked text component not found');
      setOption(
        blockedText,
        'content',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: [`${dataLabel}s blocked`],
        }),
      );

      const openText = treeSearch('#openText', newPrefab.structure);
      if (!openText) throw new Error('open text component not found');
      setOption(
        openText,
        'content',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: [`${dataLabel}s open`],
        }),
      );

      const listText = treeSearch('#listText', newPrefab.structure);
      if (!listText) throw new Error('List text component not found');
      setOption(
        listText,
        'content',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: [`${dataLabel}s list`],
        }),
      );

      const buttonText = treeSearch('#buttonText', newPrefab.structure);
      if (!buttonText) throw new Error('Button text component not found');
      setOption(
        buttonText,
        'buttonText',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: [`New ${dataLabel}`],
        }),
      );

      properties.forEach(
        (property: {
          defaultValue: null;
          id: string[];
          kind: string;
          labonSael: string;
          type: string;
          format: string;
        }) => {
          let newProperty = property;
          const inheritFormatKinds = [
            'DATE',
            'DATE_EXPRESSION',
            'DATE_TIME',
            'DATE_TIME_EXPRESSION',
            'DECIMAL',
            'DECIMAL_EXPRESSION',
            'INTEGER',
            'INTEGER_EXPRESSION',
            'PRICE',
            'PRICE_EXPRESSION',
            'TIME',
          ];

          if (inheritFormatKinds.includes(property.kind)) {
            newProperty = {
              ...property,
              format: 'INHERIT',
            };
          }

          const makeDetail = (prop: any) => {
            const mediaColumn = cloneStructure('Datatable Column');

            if (mediaColumn.type !== 'COMPONENT') {
              throw new Error(
                `expected component prefab, found ${mediaColumn.type}`,
              );
            }

            setOption(
              mediaColumn,
              'property',
              (originalOption: PrefabComponentOption) => {
                return {
                  ...originalOption,
                  value: prop,
                };
              },
            );

            const mediaComponent = cloneStructure('Media');
            if (mediaComponent.type === 'COMPONENT') {
              setOption(
                mediaComponent,
                'type',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: 'url',
                }),
              );
              setOption(
                mediaComponent,
                'urlFileSource',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: [{ ...prop }],
                }),
              );
            }

            mediaColumn.descendants.push(mediaComponent);

            const dataTableColumnStructure = cloneStructure('Datatable Column');
            if (dataTableColumnStructure.type !== 'COMPONENT') {
              throw new Error(
                `expected component prefab, found ${dataTableColumnStructure.type}`,
              );
            }

            setOption(
              dataTableColumnStructure,
              'property',
              (originalOption: PrefabComponentOption) => {
                return {
                  ...originalOption,
                  value: newProperty,
                };
              },
            );

            return prop.kind === 'IMAGE'
              ? mediaColumn
              : dataTableColumnStructure;
          };

          dataTableComp.descendants.push(makeDetail(newProperty));
        },
      );

      save(newPrefab);
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
          <Footer onClose={close} canSave={canSave} onSave={stepper.onSave} />
        </Box>
      </Box>
    ),
    // Progress bar for stepper
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
    // Max steps
    stepAmount: 2,
  };
  // Add stepper
  return (
    <>
      <Header onClose={close} title="Configure simple dashboard" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default makePrefab('Dashboard, clean and simple', attrs, beforeCreate, [
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
            innerSpacing: sizes('Inner space', {
              value: ['0rem', '0rem', '0rem', '0rem'],
            }),
            columnWidth: option('CUSTOM', {
              label: 'Column width',
              value: '12',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
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
              value: '12',
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
              label: 'Column width (tablet portrait)',
              value: '12',
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
              label: 'Column width (mobile)',
              value: '12',
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
            columnHeight: text('Height', {
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
                  },
                }),
                wrap: option('CUSTOM', {
                  value: 'nowrap',
                  label: 'Wrap',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'No wrap', value: 'nowrap' },
                      { name: 'Wrap', value: 'wrap' },
                      { name: 'Wrap reverse', value: 'wrap-reverse' },
                    ],
                  },
                }),
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
                      },
                    }),
                    wrap: option('CUSTOM', {
                      value: 'nowrap',
                      label: 'Wrap',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'No wrap', value: 'nowrap' },
                          { name: 'Wrap', value: 'wrap' },
                          { name: 'Wrap reverse', value: 'wrap-reverse' },
                        ],
                      },
                    }),
                  },
                },
                [
                  BoxPrefab(
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
                          BoxPrefab(
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
                  BoxPrefab(
                    {
                      options: {
                        ...boxOptions,
                        backgroundColor: color('Background color', {
                          value: ThemeColor.LIGHT,
                        }),
                        backgroundColorAlpha: option('NUMBER', {
                          label: 'Background color opacity',
                          value: 20,
                        }),
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        stretch: toggle('Stretch (when in flex container)', {
                          value: true,
                        }),
                      },
                    },
                    [
                      Row(
                        {
                          options: {
                            ...rowOptions,
                          },
                        },
                        [
                          Column(
                            {
                              options: {
                                ...columnOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', 'S', 'S', 'S'],
                                }),
                                columnWidth: option('CUSTOM', {
                                  label: 'Column width',
                                  value: '12',
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
                                  value: '12',
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
                                  label: 'Column width (tablet portrait)',
                                  value: '12',
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
                                  label: 'Column width (mobile)',
                                  value: '12',
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
                              },
                            },
                            [
                              Row({ options: { ...rowOptions } }, [
                                Column(
                                  {
                                    options: {
                                      ...columnOptions,
                                      innerSpacing: sizes('Inner space', {
                                        value: ['L', 'M', '0rem', 'M'],
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                      columnWidth: option('CUSTOM', {
                                        label: 'Column width',
                                        value: '12',
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
                                      columnWidthTabletLandscape: option(
                                        'CUSTOM',
                                        {
                                          label:
                                            'Column width (tablet landscape)',
                                          value: '12',
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
                                        },
                                      ),
                                      columnWidthTabletPortrait: option(
                                        'CUSTOM',
                                        {
                                          label:
                                            'Column width (tablet portrait)',
                                          value: '12',
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
                                        },
                                      ),
                                      columnWidthMobile: option('CUSTOM', {
                                        label: 'Column width (mobile)',
                                        value: '12',
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
                                    },
                                  },
                                  [
                                    TextPrefab({
                                      ref: {
                                        id: '#titleText',
                                      },
                                      options: {
                                        ...textOptions,
                                        content: variable('Content', {
                                          value: ['Dashboard'],
                                          configuration: { as: 'MULTILINE' },
                                        }),
                                        type: font('Text style', {
                                          value: ['Title4'],
                                        }),
                                      },
                                    }),
                                  ],
                                ),
                                Column(
                                  {
                                    options: {
                                      ...columnOptions,
                                      innerSpacing: sizes('Inner space', {
                                        value: ['L', 'M', '0rem', 'M'],
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                      columnWidth: option('CUSTOM', {
                                        label: 'Column width',
                                        value: '12',
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
                                      columnWidthTabletLandscape: option(
                                        'CUSTOM',
                                        {
                                          label:
                                            'Column width (tablet landscape)',
                                          value: '12',
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
                                        },
                                      ),
                                      columnWidthTabletPortrait: option(
                                        'CUSTOM',
                                        {
                                          label:
                                            'Column width (tablet portrait)',
                                          value: '12',
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
                                        },
                                      ),
                                      columnWidthMobile: option('CUSTOM', {
                                        label: 'Column width (mobile)',
                                        value: '12',
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
                                    },
                                  },
                                  [
                                    BoxPrefab(
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
                                          alignment: buttongroup(
                                            'Alignment',
                                            [
                                              ['None', 'none'],
                                              ['Left', 'flex-start'],
                                              ['Center', 'center'],
                                              ['Right', 'flex-end'],
                                              ['Justified', 'space-between'],
                                            ],
                                            {
                                              value: 'space-between',
                                              configuration: {
                                                dataType: 'string',
                                              },
                                            },
                                          ),
                                          valignment: buttongroup(
                                            'Vertical alignment',
                                            [
                                              ['None', 'none'],
                                              ['Top', 'flex-start'],
                                              ['Center', 'center'],
                                              ['Bottom', 'flex-end'],
                                            ],
                                            {
                                              value: 'flex-end',
                                              configuration: {
                                                dataType: 'string',
                                              },
                                            },
                                          ),
                                        },
                                      },
                                      [
                                        TextPrefab({
                                          ref: {
                                            id: '#modelText',
                                          },
                                          options: {
                                            ...textOptions,
                                            content: variable('Content', {
                                              value: ['Tasks'],
                                              configuration: {
                                                as: 'MULTILINE',
                                              },
                                            }),
                                            type: font('Text style', {
                                              value: ['Title6'],
                                            }),
                                          },
                                        }),
                                        BoxPrefab(
                                          {
                                            options: {
                                              ...boxOptions,
                                              height: size('Height', {
                                                value: '100%',
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
                                              alignment: buttongroup(
                                                'Alignment',
                                                [
                                                  ['None', 'none'],
                                                  ['Left', 'flex-start'],
                                                  ['Center', 'center'],
                                                  ['Right', 'flex-end'],
                                                  [
                                                    'Justified',
                                                    'space-between',
                                                  ],
                                                ],
                                                {
                                                  value: 'flex-end',
                                                  configuration: {
                                                    dataType: 'string',
                                                  },
                                                },
                                              ),
                                              valignment: buttongroup(
                                                'Vertical alignment',
                                                [
                                                  ['None', 'none'],
                                                  ['Top', 'flex-start'],
                                                  ['Center', 'center'],
                                                  ['Bottom', 'flex-end'],
                                                ],
                                                {
                                                  value: 'flex-end',
                                                  configuration: {
                                                    dataType: 'string',
                                                  },
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            TextPrefab({
                                              options: {
                                                ...textOptions,
                                                content: variable('Content', {
                                                  value: ['1345'],
                                                  configuration: {
                                                    as: 'MULTILINE',
                                                  },
                                                }),
                                                fontWeight: option('CUSTOM', {
                                                  label: 'Font weight',
                                                  value: '600',
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
                                                outerSpacing: sizes(
                                                  'Outer space',
                                                  {
                                                    value: [
                                                      '0rem',
                                                      'S',
                                                      '0rem',
                                                      '0rem',
                                                    ],
                                                  },
                                                ),
                                                type: font('Text style', {
                                                  value: ['Body1'],
                                                }),
                                              },
                                            }),
                                            TextPrefab({
                                              ref: {
                                                id: '#totalText',
                                              },
                                              options: {
                                                ...textOptions,
                                                content: variable('Content', {
                                                  value: ['Tasks in total'],
                                                  configuration: {
                                                    as: 'MULTILINE',
                                                  },
                                                }),
                                                textColor: color('Text color', {
                                                  value: ThemeColor.DARK,
                                                }),
                                                type: font('Text style', {
                                                  value: ['Body1'],
                                                }),
                                              },
                                            }),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                Column(
                                  {
                                    options: {
                                      ...columnOptions,
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                      columnWidth: option('CUSTOM', {
                                        label: 'Column width',
                                        value: '12',
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
                                      columnWidthTabletLandscape: option(
                                        'CUSTOM',
                                        {
                                          label:
                                            'Column width (tablet landscape)',
                                          value: '12',
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
                                        },
                                      ),
                                      columnWidthTabletPortrait: option(
                                        'CUSTOM',
                                        {
                                          label:
                                            'Column width (tablet portrait)',
                                          value: '12',
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
                                        },
                                      ),
                                      columnWidthMobile: option('CUSTOM', {
                                        label: 'Column width (mobile)',
                                        value: '12',
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
                                    },
                                  },
                                  [
                                    Row(
                                      {
                                        options: {
                                          ...rowOptions,
                                        },
                                      },
                                      [
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
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
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: ['M', 'M', 'M', 'M'],
                                                },
                                              ),
                                              columnWidth: option('CUSTOM', {
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
                                              columnWidthTabletLandscape:
                                                option('CUSTOM', {
                                                  label:
                                                    'Column width (tablet landscape)',
                                                  value: '6',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                              columnWidthTabletPortrait: option(
                                                'CUSTOM',
                                                {
                                                  label:
                                                    'Column width (tablet portrait)',
                                                  value: '6',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                              columnWidthMobile: option(
                                                'CUSTOM',
                                                {
                                                  label:
                                                    'Column width (mobile)',
                                                  value: '12',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                            BoxPrefab(
                                              {
                                                options: {
                                                  ...boxOptions,
                                                  innerSpacing: sizes(
                                                    'Inner space',
                                                    {
                                                      value: [
                                                        'L',
                                                        'L',
                                                        'L',
                                                        'L',
                                                      ],
                                                    },
                                                  ),
                                                  backgroundColor: color(
                                                    'Background color',
                                                    {
                                                      value: ThemeColor.WHITE,
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                BoxPrefab(
                                                  {
                                                    options: {
                                                      ...boxOptions,
                                                      outerSpacing: sizes(
                                                        'Outer space',
                                                        {
                                                          value: [
                                                            'S',
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                          ],
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
                                                      alignment: buttongroup(
                                                        'Alignment',
                                                        [
                                                          ['None', 'none'],
                                                          [
                                                            'Left',
                                                            'flex-start',
                                                          ],
                                                          ['Center', 'center'],
                                                          ['Right', 'flex-end'],
                                                          [
                                                            'Justified',
                                                            'space-between',
                                                          ],
                                                        ],
                                                        {
                                                          value: 'center',
                                                          configuration: {
                                                            dataType: 'string',
                                                          },
                                                        },
                                                      ),

                                                      valignment: buttongroup(
                                                        'Vertical alignment',
                                                        [
                                                          ['None', 'none'],
                                                          ['Top', 'flex-start'],
                                                          ['Center', 'center'],
                                                          [
                                                            'Bottom',
                                                            'flex-end',
                                                          ],
                                                        ],
                                                        {
                                                          value: 'center',
                                                          configuration: {
                                                            dataType: 'string',
                                                          },
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    BoxPrefab(
                                                      {
                                                        options: {
                                                          ...boxOptions,
                                                          nnerSpacing: sizes(
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
                                                          height: size(
                                                            'Height',
                                                            {
                                                              value: '64px',
                                                              configuration: {
                                                                as: 'UNIT',
                                                              },
                                                            },
                                                          ),
                                                          width: size('Width', {
                                                            value: '64px',
                                                            configuration: {
                                                              as: 'UNIT',
                                                            },
                                                          }),
                                                          borderRadius: size(
                                                            'Border radius',
                                                            {
                                                              value: '50%',
                                                              configuration: {
                                                                as: 'UNIT',
                                                              },
                                                            },
                                                          ),
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
                                                                value: 'center',
                                                                configuration: {
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
                                                                value: 'center',
                                                                configuration: {
                                                                  dataType:
                                                                    'string',
                                                                },
                                                              },
                                                            ),
                                                          position: buttongroup(
                                                            'Position',
                                                            [
                                                              [
                                                                'Static',
                                                                'static',
                                                              ],
                                                              [
                                                                'Relative',
                                                                'relative',
                                                              ],
                                                              [
                                                                'Absolute',
                                                                'absolute',
                                                              ],
                                                              [
                                                                'Fixed',
                                                                'fixed',
                                                              ],
                                                              [
                                                                'Sticky',
                                                                'sticky',
                                                              ],
                                                            ],
                                                            {
                                                              value: 'relative',
                                                              configuration: {
                                                                dataType:
                                                                  'string',
                                                              },
                                                            },
                                                          ),
                                                          backgroundColor:
                                                            color(
                                                              'Background color',
                                                              {
                                                                value:
                                                                  ThemeColor.PRIMARY,
                                                              },
                                                            ),
                                                          backgroundColorAlpha:
                                                            option('NUMBER', {
                                                              label:
                                                                'Background color opacity',
                                                              value: 25,
                                                            }),
                                                        },
                                                      },
                                                      [
                                                        Avatar({
                                                          options: {
                                                            ...avatarOptions,
                                                            icon: icon('Icon', {
                                                              value:
                                                                'Assignment',
                                                              configuration: {
                                                                condition:
                                                                  showIf(
                                                                    'type',
                                                                    'EQ',
                                                                    'icon',
                                                                  ),
                                                              },
                                                            }),
                                                            type: option(
                                                              'CUSTOM',
                                                              {
                                                                label: 'Type',
                                                                value: 'icon',
                                                                configuration: {
                                                                  as: 'BUTTONGROUP',
                                                                  dataType:
                                                                    'string',
                                                                  allowedInput:
                                                                    [
                                                                      {
                                                                        name: 'Image',
                                                                        value:
                                                                          'img',
                                                                      },
                                                                      {
                                                                        name: 'Letter',
                                                                        value:
                                                                          'letter',
                                                                      },
                                                                      {
                                                                        name: 'Icon',
                                                                        value:
                                                                          'icon',
                                                                      },
                                                                    ],
                                                                },
                                                              },
                                                            ),
                                                            backgroundColor:
                                                              color(
                                                                'Background color',
                                                                {
                                                                  value:
                                                                    ThemeColor.TRANSPARENT,
                                                                  configuration:
                                                                    {
                                                                      condition:
                                                                        {
                                                                          type: 'HIDE',
                                                                          option:
                                                                            'type',
                                                                          comparator:
                                                                            'EQ',
                                                                          value:
                                                                            'img',
                                                                        },
                                                                    },
                                                                },
                                                              ),
                                                            textColor: color(
                                                              'Text color',
                                                              {
                                                                value:
                                                                  ThemeColor.PRIMARY,
                                                              },
                                                            ),
                                                          },
                                                        }),
                                                      ],
                                                    ),
                                                  ],
                                                ),
                                                TextPrefab({
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        value: ['890'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Text style', {
                                                      value: ['Title4'],
                                                    }),
                                                    textAlignment: option(
                                                      'CUSTOM',
                                                      {
                                                        label: 'Text Alignment',
                                                        value: 'Center',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'Left',
                                                              value: 'left',
                                                            },
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
                                                TextPrefab({
                                                  ref: {
                                                    id: '#openText',
                                                  },
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        value: ['Tasks open'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Text style', {
                                                      value: ['Body1'],
                                                    }),
                                                    textColor: color(
                                                      'Text color',
                                                      {
                                                        value: ThemeColor.DARK,
                                                      },
                                                    ),
                                                    textAlignment: option(
                                                      'CUSTOM',
                                                      {
                                                        label: 'Text Alignment',
                                                        value: 'Center',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'Left',
                                                              value: 'left',
                                                            },
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
                                                      },
                                                    ),
                                                  },
                                                }),
                                              ],
                                            ),
                                          ],
                                        ),
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
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
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: ['M', 'M', 'M', 'M'],
                                                },
                                              ),
                                              columnWidth: option('CUSTOM', {
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
                                              columnWidthTabletLandscape:
                                                option('CUSTOM', {
                                                  label:
                                                    'Column width (tablet landscape)',
                                                  value: '6',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                              columnWidthTabletPortrait: option(
                                                'CUSTOM',
                                                {
                                                  label:
                                                    'Column width (tablet portrait)',
                                                  value: '6',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                              columnWidthMobile: option(
                                                'CUSTOM',
                                                {
                                                  label:
                                                    'Column width (mobile)',
                                                  value: '12',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                            BoxPrefab(
                                              {
                                                options: {
                                                  ...boxOptions,
                                                  innerSpacing: sizes(
                                                    'Inner space',
                                                    {
                                                      value: [
                                                        'L',
                                                        'L',
                                                        'L',
                                                        'L',
                                                      ],
                                                    },
                                                  ),
                                                  backgroundColor: color(
                                                    'Background color',
                                                    {
                                                      value: ThemeColor.WHITE,
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                BoxPrefab(
                                                  {
                                                    options: {
                                                      ...boxOptions,
                                                      outerSpacing: sizes(
                                                        'Outer space',
                                                        {
                                                          value: [
                                                            'S',
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                          ],
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
                                                      alignment: buttongroup(
                                                        'Alignment',
                                                        [
                                                          ['None', 'none'],
                                                          [
                                                            'Left',
                                                            'flex-start',
                                                          ],
                                                          ['Center', 'center'],
                                                          ['Right', 'flex-end'],
                                                          [
                                                            'Justified',
                                                            'space-between',
                                                          ],
                                                        ],
                                                        {
                                                          value: 'center',
                                                          configuration: {
                                                            dataType: 'string',
                                                          },
                                                        },
                                                      ),

                                                      valignment: buttongroup(
                                                        'Vertical alignment',
                                                        [
                                                          ['None', 'none'],
                                                          ['Top', 'flex-start'],
                                                          ['Center', 'center'],
                                                          [
                                                            'Bottom',
                                                            'flex-end',
                                                          ],
                                                        ],
                                                        {
                                                          value: 'center',
                                                          configuration: {
                                                            dataType: 'string',
                                                          },
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    BoxPrefab(
                                                      {
                                                        options: {
                                                          ...boxOptions,
                                                          nnerSpacing: sizes(
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
                                                          height: size(
                                                            'Height',
                                                            {
                                                              value: '64px',
                                                              configuration: {
                                                                as: 'UNIT',
                                                              },
                                                            },
                                                          ),
                                                          width: size('Width', {
                                                            value: '64px',
                                                            configuration: {
                                                              as: 'UNIT',
                                                            },
                                                          }),
                                                          borderRadius: size(
                                                            'Border radius',
                                                            {
                                                              value: '50%',
                                                              configuration: {
                                                                as: 'UNIT',
                                                              },
                                                            },
                                                          ),
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
                                                                value: 'center',
                                                                configuration: {
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
                                                                value: 'center',
                                                                configuration: {
                                                                  dataType:
                                                                    'string',
                                                                },
                                                              },
                                                            ),
                                                          position: buttongroup(
                                                            'Position',
                                                            [
                                                              [
                                                                'Static',
                                                                'static',
                                                              ],
                                                              [
                                                                'Relative',
                                                                'relative',
                                                              ],
                                                              [
                                                                'Absolute',
                                                                'absolute',
                                                              ],
                                                              [
                                                                'Fixed',
                                                                'fixed',
                                                              ],
                                                              [
                                                                'Sticky',
                                                                'sticky',
                                                              ],
                                                            ],
                                                            {
                                                              value: 'relative',
                                                              configuration: {
                                                                dataType:
                                                                  'string',
                                                              },
                                                            },
                                                          ),
                                                          backgroundColor:
                                                            color(
                                                              'Background color',
                                                              {
                                                                value:
                                                                  ThemeColor.SUCCESS,
                                                              },
                                                            ),
                                                          backgroundColorAlpha:
                                                            option('NUMBER', {
                                                              label:
                                                                'Background color opacity',
                                                              value: 25,
                                                            }),
                                                        },
                                                      },
                                                      [
                                                        Avatar({
                                                          options: {
                                                            ...avatarOptions,
                                                            icon: icon('Icon', {
                                                              value: 'Check',
                                                              configuration: {
                                                                condition:
                                                                  showIf(
                                                                    'type',
                                                                    'EQ',
                                                                    'icon',
                                                                  ),
                                                              },
                                                            }),
                                                            type: option(
                                                              'CUSTOM',
                                                              {
                                                                label: 'Type',
                                                                value: 'icon',
                                                                configuration: {
                                                                  as: 'BUTTONGROUP',
                                                                  dataType:
                                                                    'string',
                                                                  allowedInput:
                                                                    [
                                                                      {
                                                                        name: 'Image',
                                                                        value:
                                                                          'img',
                                                                      },
                                                                      {
                                                                        name: 'Letter',
                                                                        value:
                                                                          'letter',
                                                                      },
                                                                      {
                                                                        name: 'Icon',
                                                                        value:
                                                                          'icon',
                                                                      },
                                                                    ],
                                                                },
                                                              },
                                                            ),
                                                            backgroundColor:
                                                              color(
                                                                'Background color',
                                                                {
                                                                  value:
                                                                    ThemeColor.TRANSPARENT,
                                                                  configuration:
                                                                    {
                                                                      condition:
                                                                        {
                                                                          type: 'HIDE',
                                                                          option:
                                                                            'type',
                                                                          comparator:
                                                                            'EQ',
                                                                          value:
                                                                            'img',
                                                                        },
                                                                    },
                                                                },
                                                              ),
                                                            textColor: color(
                                                              'Text color',
                                                              {
                                                                value:
                                                                  ThemeColor.SUCCESS,
                                                              },
                                                            ),
                                                          },
                                                        }),
                                                      ],
                                                    ),
                                                  ],
                                                ),
                                                TextPrefab({
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        value: ['410'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Text style', {
                                                      value: ['Title4'],
                                                    }),
                                                    textAlignment: option(
                                                      'CUSTOM',
                                                      {
                                                        label: 'Text Alignment',
                                                        value: 'Center',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'Left',
                                                              value: 'left',
                                                            },
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
                                                TextPrefab({
                                                  ref: {
                                                    id: '#doneText',
                                                  },
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        value: ['Tasks done'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Text style', {
                                                      value: ['Body1'],
                                                    }),
                                                    textColor: color(
                                                      'Text color',
                                                      {
                                                        value: ThemeColor.DARK,
                                                      },
                                                    ),
                                                    textAlignment: option(
                                                      'CUSTOM',
                                                      {
                                                        label: 'Text Alignment',
                                                        value: 'Center',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'Left',
                                                              value: 'left',
                                                            },
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
                                                      },
                                                    ),
                                                  },
                                                }),
                                              ],
                                            ),
                                          ],
                                        ),
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
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
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: ['M', 'M', 'M', 'M'],
                                                },
                                              ),
                                              columnWidth: option('CUSTOM', {
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
                                              columnWidthTabletLandscape:
                                                option('CUSTOM', {
                                                  label:
                                                    'Column width (tablet landscape)',
                                                  value: '6',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                              columnWidthTabletPortrait: option(
                                                'CUSTOM',
                                                {
                                                  label:
                                                    'Column width (tablet portrait)',
                                                  value: '6',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                              columnWidthMobile: option(
                                                'CUSTOM',
                                                {
                                                  label:
                                                    'Column width (mobile)',
                                                  value: '12',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                            BoxPrefab(
                                              {
                                                options: {
                                                  ...boxOptions,
                                                  innerSpacing: sizes(
                                                    'Inner space',
                                                    {
                                                      value: [
                                                        'L',
                                                        'L',
                                                        'L',
                                                        'L',
                                                      ],
                                                    },
                                                  ),
                                                  backgroundColor: color(
                                                    'Background color',
                                                    {
                                                      value: ThemeColor.WHITE,
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                BoxPrefab(
                                                  {
                                                    options: {
                                                      ...boxOptions,
                                                      outerSpacing: sizes(
                                                        'Outer space',
                                                        {
                                                          value: [
                                                            'S',
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                          ],
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
                                                      alignment: buttongroup(
                                                        'Alignment',
                                                        [
                                                          ['None', 'none'],
                                                          [
                                                            'Left',
                                                            'flex-start',
                                                          ],
                                                          ['Center', 'center'],
                                                          ['Right', 'flex-end'],
                                                          [
                                                            'Justified',
                                                            'space-between',
                                                          ],
                                                        ],
                                                        {
                                                          value: 'center',
                                                          configuration: {
                                                            dataType: 'string',
                                                          },
                                                        },
                                                      ),

                                                      valignment: buttongroup(
                                                        'Vertical alignment',
                                                        [
                                                          ['None', 'none'],
                                                          ['Top', 'flex-start'],
                                                          ['Center', 'center'],
                                                          [
                                                            'Bottom',
                                                            'flex-end',
                                                          ],
                                                        ],
                                                        {
                                                          value: 'center',
                                                          configuration: {
                                                            dataType: 'string',
                                                          },
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    BoxPrefab(
                                                      {
                                                        options: {
                                                          ...boxOptions,
                                                          nnerSpacing: sizes(
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
                                                          height: size(
                                                            'Height',
                                                            {
                                                              value: '64px',
                                                              configuration: {
                                                                as: 'UNIT',
                                                              },
                                                            },
                                                          ),
                                                          width: size('Width', {
                                                            value: '64px',
                                                            configuration: {
                                                              as: 'UNIT',
                                                            },
                                                          }),
                                                          borderRadius: size(
                                                            'Border radius',
                                                            {
                                                              value: '50%',
                                                              configuration: {
                                                                as: 'UNIT',
                                                              },
                                                            },
                                                          ),
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
                                                                value: 'center',
                                                                configuration: {
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
                                                                value: 'center',
                                                                configuration: {
                                                                  dataType:
                                                                    'string',
                                                                },
                                                              },
                                                            ),
                                                          position: buttongroup(
                                                            'Position',
                                                            [
                                                              [
                                                                'Static',
                                                                'static',
                                                              ],
                                                              [
                                                                'Relative',
                                                                'relative',
                                                              ],
                                                              [
                                                                'Absolute',
                                                                'absolute',
                                                              ],
                                                              [
                                                                'Fixed',
                                                                'fixed',
                                                              ],
                                                              [
                                                                'Sticky',
                                                                'sticky',
                                                              ],
                                                            ],
                                                            {
                                                              value: 'relative',
                                                              configuration: {
                                                                dataType:
                                                                  'string',
                                                              },
                                                            },
                                                          ),
                                                          backgroundColor:
                                                            color(
                                                              'Background color',
                                                              {
                                                                value:
                                                                  ThemeColor.WARNING,
                                                              },
                                                            ),
                                                          backgroundColorAlpha:
                                                            option('NUMBER', {
                                                              label:
                                                                'Background color opacity',
                                                              value: 25,
                                                            }),
                                                        },
                                                      },
                                                      [
                                                        Avatar({
                                                          options: {
                                                            ...avatarOptions,
                                                            icon: icon('Icon', {
                                                              value:
                                                                'AccessTime',
                                                              configuration: {
                                                                condition:
                                                                  showIf(
                                                                    'type',
                                                                    'EQ',
                                                                    'icon',
                                                                  ),
                                                              },
                                                            }),
                                                            type: option(
                                                              'CUSTOM',
                                                              {
                                                                label: 'Type',
                                                                value: 'icon',
                                                                configuration: {
                                                                  as: 'BUTTONGROUP',
                                                                  dataType:
                                                                    'string',
                                                                  allowedInput:
                                                                    [
                                                                      {
                                                                        name: 'Image',
                                                                        value:
                                                                          'img',
                                                                      },
                                                                      {
                                                                        name: 'Letter',
                                                                        value:
                                                                          'letter',
                                                                      },
                                                                      {
                                                                        name: 'Icon',
                                                                        value:
                                                                          'icon',
                                                                      },
                                                                    ],
                                                                },
                                                              },
                                                            ),
                                                            backgroundColor:
                                                              color(
                                                                'Background color',
                                                                {
                                                                  value:
                                                                    ThemeColor.TRANSPARENT,
                                                                  configuration:
                                                                    {
                                                                      condition:
                                                                        {
                                                                          type: 'HIDE',
                                                                          option:
                                                                            'type',
                                                                          comparator:
                                                                            'EQ',
                                                                          value:
                                                                            'img',
                                                                        },
                                                                    },
                                                                },
                                                              ),
                                                            textColor: color(
                                                              'Text color',
                                                              {
                                                                value:
                                                                  ThemeColor.WARNING,
                                                              },
                                                            ),
                                                          },
                                                        }),
                                                      ],
                                                    ),
                                                  ],
                                                ),
                                                TextPrefab({
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        value: ['34'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Text style', {
                                                      value: ['Title4'],
                                                    }),
                                                    textAlignment: option(
                                                      'CUSTOM',
                                                      {
                                                        label: 'Text Alignment',
                                                        value: 'Center',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'Left',
                                                              value: 'left',
                                                            },
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
                                                TextPrefab({
                                                  ref: {
                                                    id: '#inProgressText',
                                                  },
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        value: [
                                                          'Tasks in progress',
                                                        ],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Text style', {
                                                      value: ['Body1'],
                                                    }),
                                                    textColor: color(
                                                      'Text color',
                                                      {
                                                        value: ThemeColor.DARK,
                                                      },
                                                    ),
                                                    textAlignment: option(
                                                      'CUSTOM',
                                                      {
                                                        label: 'Text Alignment',
                                                        value: 'Center',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'Left',
                                                              value: 'left',
                                                            },
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
                                                      },
                                                    ),
                                                  },
                                                }),
                                              ],
                                            ),
                                          ],
                                        ),
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
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
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: ['M', 'M', 'M', 'M'],
                                                },
                                              ),
                                              columnWidth: option('CUSTOM', {
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
                                              columnWidthTabletLandscape:
                                                option('CUSTOM', {
                                                  label:
                                                    'Column width (tablet landscape)',
                                                  value: '6',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                              columnWidthTabletPortrait: option(
                                                'CUSTOM',
                                                {
                                                  label:
                                                    'Column width (tablet portrait)',
                                                  value: '6',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                              columnWidthMobile: option(
                                                'CUSTOM',
                                                {
                                                  label:
                                                    'Column width (mobile)',
                                                  value: '12',
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
                                                      { name: '1', value: '1' },
                                                      { name: '2', value: '2' },
                                                      { name: '3', value: '3' },
                                                      { name: '4', value: '4' },
                                                      { name: '5', value: '5' },
                                                      { name: '6', value: '6' },
                                                      { name: '7', value: '7' },
                                                      { name: '8', value: '8' },
                                                      { name: '9', value: '9' },
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
                                            BoxPrefab(
                                              {
                                                options: {
                                                  ...boxOptions,
                                                  innerSpacing: sizes(
                                                    'Inner space',
                                                    {
                                                      value: [
                                                        'L',
                                                        'L',
                                                        'L',
                                                        'L',
                                                      ],
                                                    },
                                                  ),
                                                  backgroundColor: color(
                                                    'Background color',
                                                    {
                                                      value: ThemeColor.WHITE,
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                BoxPrefab(
                                                  {
                                                    options: {
                                                      ...boxOptions,
                                                      outerSpacing: sizes(
                                                        'Outer space',
                                                        {
                                                          value: [
                                                            'S',
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                          ],
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
                                                      alignment: buttongroup(
                                                        'Alignment',
                                                        [
                                                          ['None', 'none'],
                                                          [
                                                            'Left',
                                                            'flex-start',
                                                          ],
                                                          ['Center', 'center'],
                                                          ['Right', 'flex-end'],
                                                          [
                                                            'Justified',
                                                            'space-between',
                                                          ],
                                                        ],
                                                        {
                                                          value: 'center',
                                                          configuration: {
                                                            dataType: 'string',
                                                          },
                                                        },
                                                      ),

                                                      valignment: buttongroup(
                                                        'Vertical alignment',
                                                        [
                                                          ['None', 'none'],
                                                          ['Top', 'flex-start'],
                                                          ['Center', 'center'],
                                                          [
                                                            'Bottom',
                                                            'flex-end',
                                                          ],
                                                        ],
                                                        {
                                                          value: 'center',
                                                          configuration: {
                                                            dataType: 'string',
                                                          },
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    BoxPrefab(
                                                      {
                                                        options: {
                                                          ...boxOptions,
                                                          nnerSpacing: sizes(
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
                                                          height: size(
                                                            'Height',
                                                            {
                                                              value: '64px',
                                                              configuration: {
                                                                as: 'UNIT',
                                                              },
                                                            },
                                                          ),
                                                          width: size('Width', {
                                                            value: '64px',
                                                            configuration: {
                                                              as: 'UNIT',
                                                            },
                                                          }),
                                                          borderRadius: size(
                                                            'Border radius',
                                                            {
                                                              value: '50%',
                                                              configuration: {
                                                                as: 'UNIT',
                                                              },
                                                            },
                                                          ),
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
                                                                value: 'center',
                                                                configuration: {
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
                                                                value: 'center',
                                                                configuration: {
                                                                  dataType:
                                                                    'string',
                                                                },
                                                              },
                                                            ),
                                                          position: buttongroup(
                                                            'Position',
                                                            [
                                                              [
                                                                'Static',
                                                                'static',
                                                              ],
                                                              [
                                                                'Relative',
                                                                'relative',
                                                              ],
                                                              [
                                                                'Absolute',
                                                                'absolute',
                                                              ],
                                                              [
                                                                'Fixed',
                                                                'fixed',
                                                              ],
                                                              [
                                                                'Sticky',
                                                                'sticky',
                                                              ],
                                                            ],
                                                            {
                                                              value: 'relative',
                                                              configuration: {
                                                                dataType:
                                                                  'string',
                                                              },
                                                            },
                                                          ),
                                                          backgroundColor:
                                                            color(
                                                              'Background color',
                                                              {
                                                                value:
                                                                  ThemeColor.DANGER,
                                                              },
                                                            ),
                                                          backgroundColorAlpha:
                                                            option('NUMBER', {
                                                              label:
                                                                'Background color opacity',
                                                              value: 25,
                                                            }),
                                                        },
                                                      },
                                                      [
                                                        Avatar({
                                                          options: {
                                                            ...avatarOptions,
                                                            icon: icon('Icon', {
                                                              value:
                                                                'NotInterested',
                                                              configuration: {
                                                                condition:
                                                                  showIf(
                                                                    'type',
                                                                    'EQ',
                                                                    'icon',
                                                                  ),
                                                              },
                                                            }),
                                                            type: option(
                                                              'CUSTOM',
                                                              {
                                                                label: 'Type',
                                                                value: 'icon',
                                                                configuration: {
                                                                  as: 'BUTTONGROUP',
                                                                  dataType:
                                                                    'string',
                                                                  allowedInput:
                                                                    [
                                                                      {
                                                                        name: 'Image',
                                                                        value:
                                                                          'img',
                                                                      },
                                                                      {
                                                                        name: 'Letter',
                                                                        value:
                                                                          'letter',
                                                                      },
                                                                      {
                                                                        name: 'Icon',
                                                                        value:
                                                                          'icon',
                                                                      },
                                                                    ],
                                                                },
                                                              },
                                                            ),
                                                            backgroundColor:
                                                              color(
                                                                'Background color',
                                                                {
                                                                  value:
                                                                    ThemeColor.TRANSPARENT,
                                                                  configuration:
                                                                    {
                                                                      condition:
                                                                        {
                                                                          type: 'HIDE',
                                                                          option:
                                                                            'type',
                                                                          comparator:
                                                                            'EQ',
                                                                          value:
                                                                            'img',
                                                                        },
                                                                    },
                                                                },
                                                              ),
                                                            textColor: color(
                                                              'Text color',
                                                              {
                                                                value:
                                                                  ThemeColor.DANGER,
                                                              },
                                                            ),
                                                          },
                                                        }),
                                                      ],
                                                    ),
                                                  ],
                                                ),
                                                TextPrefab({
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        value: ['11'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Text style', {
                                                      value: ['Title4'],
                                                    }),
                                                    textAlignment: option(
                                                      'CUSTOM',
                                                      {
                                                        label: 'Text Alignment',
                                                        value: 'Center',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'Left',
                                                              value: 'left',
                                                            },
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
                                                TextPrefab({
                                                  ref: {
                                                    id: '#blockedText',
                                                  },
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        value: [
                                                          'Tasks blocked',
                                                        ],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Text style', {
                                                      value: ['Body1'],
                                                    }),
                                                    textColor: color(
                                                      'Text color',
                                                      {
                                                        value: ThemeColor.DARK,
                                                      },
                                                    ),
                                                    textAlignment: option(
                                                      'CUSTOM',
                                                      {
                                                        label: 'Text Alignment',
                                                        value: 'Center',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'Left',
                                                              value: 'left',
                                                            },
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
                              ]),
                              Row(
                                {
                                  options: {
                                    ...rowOptions,
                                  },
                                },
                                [
                                  Column(
                                    {
                                      options: {
                                        ...columnOptions,
                                        innerSpacing: sizes('Inner space', {
                                          value: ['M', 'M', 'XL', 'M'],
                                        }),
                                        columnWidth: option('CUSTOM', {
                                          label: 'Column width',
                                          value: '12',
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
                                        columnWidthTabletLandscape: option(
                                          'CUSTOM',
                                          {
                                            label:
                                              'Column width (tablet landscape)',
                                            value: '12',
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
                                                { name: '1', value: '1' },
                                                { name: '2', value: '2' },
                                                { name: '3', value: '3' },
                                                { name: '4', value: '4' },
                                                { name: '5', value: '5' },
                                                { name: '6', value: '6' },
                                                { name: '7', value: '7' },
                                                { name: '8', value: '8' },
                                                { name: '9', value: '9' },
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
                                        columnWidthTabletPortrait: option(
                                          'CUSTOM',
                                          {
                                            label:
                                              'Column width (tablet portrait)',
                                            value: '12',
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
                                                { name: '1', value: '1' },
                                                { name: '2', value: '2' },
                                                { name: '3', value: '3' },
                                                { name: '4', value: '4' },
                                                { name: '5', value: '5' },
                                                { name: '6', value: '6' },
                                                { name: '7', value: '7' },
                                                { name: '8', value: '8' },
                                                { name: '9', value: '9' },
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
                                        columnWidthMobile: option('CUSTOM', {
                                          label: 'Column width (mobile)',
                                          value: '12',
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
                                              { name: '1', value: '1' },
                                              { name: '2', value: '2' },
                                              { name: '3', value: '3' },
                                              { name: '4', value: '4' },
                                              { name: '5', value: '5' },
                                              { name: '6', value: '6' },
                                              { name: '7', value: '7' },
                                              { name: '8', value: '8' },
                                              { name: '9', value: '9' },
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
                                      },
                                    },
                                    [
                                      BoxPrefab(
                                        {
                                          options: {
                                            ...boxOptions,
                                            innerSpacing: sizes('Inner space', {
                                              value: [
                                                '0rem',
                                                '0rem',
                                                'M',
                                                '0rem',
                                              ],
                                            }),
                                            alignment: buttongroup(
                                              'Alignment',
                                              [
                                                ['None', 'none'],
                                                ['Left', 'flex-start'],
                                                ['Center', 'center'],
                                                ['Right', 'flex-end'],
                                                ['Justified', 'space-between'],
                                              ],
                                              {
                                                value: 'space-between',
                                                configuration: {
                                                  dataType: 'string',
                                                },
                                              },
                                            ),
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
                                          },
                                        },
                                        [
                                          TextPrefab({
                                            ref: {
                                              id: '#listText',
                                            },
                                            options: {
                                              ...textOptions,
                                              content: variable('Content', {
                                                value: ['Tasks list'],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              }),
                                              type: font('Text style', {
                                                value: ['Title6'],
                                              }),
                                            },
                                          }),
                                          BoxPrefab(
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
                                              TextInput(
                                                {
                                                  ref: { id: '#searchField' },
                                                  options: {
                                                    ...textInputOptions,
                                                    label: variable('Label', {
                                                      value: [],
                                                    }),
                                                    placeholder: variable(
                                                      'Placeholder',
                                                      {
                                                        value: [],
                                                      },
                                                    ),

                                                    autoComplete: toggle(
                                                      'Autocomplete',
                                                      {
                                                        value: true,
                                                      },
                                                    ),
                                                    adornmentIcon: icon(
                                                      'Icon',
                                                      {
                                                        value: 'Search',
                                                      },
                                                    ),
                                                    adornmentPosition:
                                                      buttongroup(
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
                                                              option:
                                                                'adornmentIcon',
                                                              comparator: 'EQ',
                                                              value: '',
                                                            },
                                                          },
                                                        },
                                                      ),
                                                    styles: toggle('Styles', {
                                                      value: true,
                                                    }),
                                                    fullWidth: toggle(
                                                      'Full width',
                                                      { value: false },
                                                    ),
                                                    hideLabel: toggle(
                                                      'Hide label',
                                                      {
                                                        value: true,
                                                        ...showOn('styles'),
                                                      },
                                                    ),

                                                    placeholderColor: color(
                                                      'Placeholder color',
                                                      {
                                                        value:
                                                          ThemeColor.ACCENT_2,
                                                        ...showOn('styles'),
                                                      },
                                                    ),
                                                    margin: buttongroup(
                                                      'Margin',
                                                      [
                                                        ['None', 'none'],
                                                        ['Dense', 'dense'],
                                                        ['Normal', 'normal'],
                                                      ],
                                                      { value: 'none' },
                                                    ),
                                                  },
                                                },
                                                [],
                                              ),
                                              ButtonPrefab(
                                                {
                                                  ref: {
                                                    id: '#buttonText',
                                                  },
                                                  options: {
                                                    ...buttonOptions,
                                                    icon: icon('Icon', {
                                                      value: 'Add',
                                                    }),
                                                    buttonText: variable(
                                                      'Button text',
                                                      {
                                                        value: ['New Task'],
                                                      },
                                                    ),
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
                                                    outerSpacing: sizes(
                                                      'Outer space',
                                                      {
                                                        value: [
                                                          '0rem',
                                                          '0rem',
                                                          '0rem',
                                                          'M',
                                                        ],
                                                      },
                                                    ),
                                                  },
                                                  style: {
                                                    overwrite: {
                                                      backgroundColor: {
                                                        type: 'THEME_COLOR',
                                                        value: 'primary',
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
                                                      padding: [
                                                        '0.6875rem',
                                                        '1.375rem',
                                                      ],
                                                      textDecoration: 'none',
                                                      textTransform: 'none',
                                                    },
                                                  },
                                                },
                                                [],
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                      BoxPrefab(
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
                                          DataTable(
                                            {
                                              ref: {
                                                id: '#dataTable',
                                              },
                                              options: {
                                                ...dataTableOptions,
                                                pagination: option('CUSTOM', {
                                                  label: 'Pagination',
                                                  value: 'always',
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
                                                outerSpacing: sizes(
                                                  'Outer space',
                                                  {
                                                    value: [
                                                      '0rem',
                                                      '0rem',
                                                      '0rem',
                                                      '0rem',
                                                    ],
                                                  },
                                                ),
                                                placeholderTake: number(
                                                  'Placeholder rows',
                                                  { value: '5' },
                                                ),
                                                take: option('CUSTOM', {
                                                  value: '5',
                                                  label: 'Rows per page',
                                                  configuration: {
                                                    as: 'DROPDOWN',
                                                    dataType: 'string',
                                                    dependsOn: 'model',
                                                    allowedInput: [
                                                      {
                                                        name: '5',
                                                        value: '5',
                                                      },
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '25',
                                                        value: '25',
                                                      },
                                                      {
                                                        name: '50',
                                                        value: '50',
                                                      },
                                                      {
                                                        name: '100',
                                                        value: '100',
                                                      },
                                                    ],
                                                    condition: hideIf(
                                                      'autoLoadOnScroll',
                                                      'EQ',
                                                      true,
                                                    ),
                                                  },
                                                }),
                                                background: color(
                                                  'Background',
                                                  {
                                                    value: ThemeColor.WHITE,
                                                  },
                                                ),
                                                variant: option('CUSTOM', {
                                                  label: 'Variant',
                                                  value: 'outlined',
                                                  configuration: {
                                                    as: 'BUTTONGROUP',
                                                    dataType: 'string',
                                                    allowedInput: [
                                                      {
                                                        name: 'Flat',
                                                        value: 'flat',
                                                      },
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
                  BoxPrefab(
                    {
                      ref: { id: '#Footer' },
                      options: {
                        ...boxOptions,
                        backgroundColor: color('Background color', {
                          value: ThemeColor.LIGHT,
                        }),
                        backgroundColorAlpha: option('NUMBER', {
                          label: 'Background color opacity',
                          value: 20,
                        }),
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                      },
                    },
                    [
                      BoxPrefab(
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
