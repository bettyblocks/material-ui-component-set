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
  PrefabReference,
  BeforeCreateArgs,
  variable,
  font,
  showIfTrue,
  wrapper,
  // linked,
  // reconfigure,
} from '@betty-blocks/component-sdk';
import { Box as prefabBox } from './structures/Box';
import { options as boxOptions } from './structures/Box/options';
import { Column } from './structures/Column';
import { options as columnOptions } from './structures/Column/options';
import { Grid } from './structures/Grid';
import { options as gridOptions } from './structures/Grid/options';
import { Row } from './structures/Row';
import { options as rowOptions } from './structures/Row/options';
import { Text as TextPrefab } from './structures/Text';
import { options as textOptions } from './structures/Text/options';
import { appBar } from './structures/Appbar';
import { options as appBarOptions } from './structures/Appbar/options';
import { OpenPageButton } from './structures/OpenPage';
import { options as openPageOptions } from './structures/Button/options';
import { DataTable } from './structures/DataTable';
import { options as dataTableOptions } from './structures/DataTable/options';

const attrs = {
  name: 'Wrapper Header and Footer',
  icon: Icon.NavbarIcon,
  type: 'page',
  description: 'Full height page with a header and footer',
  detail:
    'Start with a full height page containing a header, footer and body that will scale to the height of the content.',
  previewUrl: 'https://preview.betty.app/header-and-footer',
  previewImage:
    'https://assets.bettyblocks.com/db829f94c9eb4896a0be42f916940bf1_assets/files/postthiskimchi',
  category: 'LAYOUT',
};
const beforeCreate = ({
  save,
  close,
  prefab,
  components: {
    Header,
    Content,
    PartialSelector,
    Footer,
    Field,
    Box,
    Text,
    ModelRelationSelector,
    PropertiesSelector,
    Button,
  },
}: BeforeCreateArgs) => {
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');
  const [modelId, setModelId] = React.useState('');
  const [properties, setProperties] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [stepNumber, setStepNumber] = React.useState(1);

  const getDescendantByRef = (refValue: string, structure: any) =>
    structure.reduce((acc: string, component: PrefabReference) => {
      if (acc) return acc;
      if (
        component.type === 'COMPONENT' &&
        // eslint-disable-next-line no-prototype-builtins
        component.ref
          ? Object.values(component.ref).indexOf(refValue) > -1
          : undefined
      ) {
        return component;
      }
      if (component.type === 'PARTIAL') {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return getDescendantByRef(refValue, component.descendants);
    }, null);

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
                  By using a partial for the header and footer you can easily
                  reuse the same structure without having to go through every
                  page.
                </Text>
              </Box>
              <Field label="HEADER PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(headerId: string) => {
                    setHeaderPartialId(headerId);
                  }}
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
          <Field label="Model">
            <ModelRelationSelector
              onChange={(value: string) => {
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
          <Field label="Columns">
            <PropertiesSelector
              modelId={modelId}
              value={properties}
              onChange={(value: []) => {
                setProperties(value);
              }}
            />
          </Field>
        </>
      );
    },
    onSave: () => {
      const newPrefab = { ...prefab };
      const prefabFooter = getDescendantByRef('#Footer', newPrefab.structure);
      const prefabHeader = getDescendantByRef('#Header', newPrefab.structure);
      const dataTablePrefab = getDescendantByRef(
        '#dataTable',
        newPrefab.structure,
      );
      if (headerPartialId) {
        prefabHeader.descendants = [{ type: 'PARTIAL', partialId: '' }];
        prefabHeader.descendants[0].partialId = headerPartialId;
      }
      if (footerPartialId) {
        prefabFooter.descendants = [{ type: 'PARTIAL', partialId: '' }];
        prefabFooter.descendants[0].partialId = footerPartialId;
      }
      if (dataTablePrefab.type !== 'COMPONENT') {
        setErrorMessage(
          `expected component prefab, found ${dataTablePrefab.type}`,
        );
        throw new Error(errorMessage);
      }
      dataTablePrefab.options[0] = {
        value: modelId,
        label: 'Model',
        key: 'model',
        type: 'MODEL_AND_RELATION',
      };
      properties.forEach(
        (property: {
          defaultValue: null;
          id: string[];
          kind: string;
          label: string;
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
          // TODO: Start making use of the component-sdk prefab, instead of inserting JSX
          // example: structure.descendants.push(DataTableColumn({}, []))
          dataTablePrefab.descendants.push({
            name: 'DataTableColumn',
            options: [
              {
                value: true,
                label: 'Initial visibility',
                key: 'visible',
                type: 'TOGGLE',
                configuration: {
                  as: 'VISIBILITY',
                },
              },
              {
                value: newProperty,
                label: 'Property',
                key: 'property',
                type: 'PROPERTY',
              },
              {
                type: 'TOGGLE',
                label: 'Sortable',
                key: 'sortable',
                value: false,
              },
              {
                type: 'VARIABLE',
                label: 'Header text',
                key: 'headerText',
                value: [''],
              },
              {
                value: 'Body1',
                label: 'Header Type',
                key: 'type',
                type: 'FONT',
              },
              {
                type: 'VARIABLE',
                label: 'Content',
                key: 'content',
                value: [''],
                configuration: {
                  as: 'MULTILINE',
                },
              },
              {
                value: 'Body1',
                label: 'Body type',
                key: 'bodyType',
                type: 'FONT',
              },
              {
                type: 'CUSTOM',
                label: 'Column Alignment',
                key: 'horizontalAlignment',
                value: 'left',
                configuration: {
                  as: 'BUTTONGROUP',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Left', value: 'left' },
                    { name: 'Center', value: 'center' },
                    { name: 'Right', value: 'right' },
                  ],
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
                type: 'COLOR',
                label: 'Background',
                key: 'background',
                value: 'Transparent',
              },
              {
                type: 'COLOR',
                label: 'Border color',
                key: 'borderColor',
                value: 'Light',
              },
              {
                value: false,
                label: 'Advanced settings',
                key: 'advancedSettings',
                type: 'TOGGLE',
              },
              {
                type: 'VARIABLE',
                label: 'Test attribute',
                key: 'dataComponentAttribute',
                value: ['DataTableColumn'],
                configuration: {
                  condition: {
                    type: 'SHOW',
                    option: 'advancedSettings',
                    comparator: 'EQ',
                    value: true,
                  },
                },
              },
            ],
            descendants: [],
          });
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
          <Footer
            onClose={close}
            onSave={stepNumber === stepper.stepAmount && stepper.onSave}
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
      <Header onClose={close} title="Configure header and footer" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};
export default makePrefab('TSX Header & Footer', attrs, beforeCreate, [
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
                                    appBar(
                                      {
                                        options: {
                                          ...appBarOptions,
                                          logoSource: variable('Logo', {
                                            value: [
                                              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                                            ],
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
                                              ...openPageOptions,
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
                                              ...openPageOptions,
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
                          label: 'Datatable wrapper',
                          options: [
                            // linked({
                            //   label: 'Refactor Datatable option',
                            //   value: {
                            //     ref: {
                            //       componentId: '#dataTable',
                            //       optionId: '#dataTableRefactorOption',
                            //     },
                            //   },
                            // }),
                          ],
                        },
                        [
                          DataTable(
                            {
                              ref: { id: '#dataTable' },
                              options: {
                                ...dataTableOptions,
                                // reconfigure: reconfigure('Reconfigure', {
                                //   ref: { id: '#dataTableRefactorOption' },
                                //   value: '',
                                // }),
                              },
                            },
                            [],
                          ),
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
                            type: font('Font', { value: ['Body1'] }),
                            outerSpacing: sizes('Outer space', {
                              value: ['L', 'L', 'L', 'L'],
                            }),
                            styles: toggle('Styles', { value: false }),
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
]);
