import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  icon,
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
  PrefabComponent,
  buttongroup,
  hideIf,
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
  cardOptions,
  Card,
  cardMediaOptions,
  CardMedia,
  CardHeader,
  cardHeaderOptions,
  CardContent,
  CardActions,
  buttonOptions,
  Button as ButtonPrefab,
  Avatar,
  avatarOptions,
  List,
  listOptions,
  ListItem,
  listItemOptions,
  RatingInput,
  ratingInputOptions,
} from './structures';
import { styles } from './structures/ListItem/options/styles';

const attrs = {
  icon: Icon.ContainerIcon,
  type: 'page',
  isPublicPage: false,
  description: 'This is a page with a static Homepage-layout.',
  detail:
    'his page has a static homepage to spark your interest and show what things are possible with the pagebuilder.',
  previewUrl: 'https://preview.betty.app/homepage',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Homepage.jpg',
  category: 'LAYOUT',
};

const beforeCreate = ({
  save,
  close,
  prefab,
  components: { Text, Field, Box, PartialSelector, Header, Content, Footer },
}: BeforeCreateArgs) => {
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');

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

  return (
    <>
      <Header onClose={close} title="Configure homepage" />

      <Content>
        <Box pad={{ bottom: '15px' }}>
          <Box>
            <Text size="medium" weight="bolder">
              Select partials
            </Text>
          </Box>
          <Box pad={{ bottom: '15px' }}>
            <Text color="grey700">
              By using a partial for the top menu and footer you can easily
              reuse the same structure without having to go through every page.
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
      </Content>
      <Footer
        onClick={close}
        onSave={() => {
          const newPrefab = { ...prefab };
          const prefabHeader = treeSearch('#Header', newPrefab.structure);
          if (!prefabHeader) throw new Error('Header partial box not found');
          if (headerPartialId) {
            prefabHeader.descendants = [
              { type: 'PARTIAL', partialId: headerPartialId },
            ];
          }
          const prefabFooter = treeSearch('#Footer', newPrefab.structure);
          if (!prefabFooter) throw new Error('Footer partial box not found');
          if (footerPartialId) {
            prefabFooter.descendants = [
              { type: 'PARTIAL', partialId: footerPartialId },
            ];
          }

          save(newPrefab);
        }}
        onSkip={() => {
          const newPrefab = { ...prefab };
          save(newPrefab);
        }}
      />
    </>
  );
};

export default makePrefab('Homepage, inspirational', attrs, beforeCreate, [
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
                        backgroundOptions: toggle('Show background options', {
                          value: true,
                        }),
                        backgroundColor: color('Background color', {
                          value: ThemeColor.PRIMARY,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
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
                          prefabBox(
                            {
                              options: {
                                ...boxOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                                backgroundColor: color('Background color', {
                                  value: ThemeColor.PRIMARY,
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
                                                  fontWeight: '500',
                                                  padding: ['0rem', '0rem'],
                                                  textDecoration: 'none',
                                                  textTransform: 'none',
                                                  borderWidth: ['0rem'],
                                                },
                                              },
                                              options: {
                                                ...openPageButtonOptions,
                                                buttonText: variable(
                                                  'Button text',
                                                  {
                                                    value: ['About'],
                                                  },
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
                                                  fontWeight: '500',
                                                  padding: ['0rem', '0rem'],
                                                  textDecoration: 'none',
                                                  textTransform: 'none',
                                                  borderWidth: ['0rem'],
                                                },
                                              },
                                              options: {
                                                ...openPageButtonOptions,
                                                buttonText: variable(
                                                  'Button text',
                                                  {
                                                    value: ['Services'],
                                                  },
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
                                                  fontWeight: '500',
                                                  padding: ['0rem', '0rem'],
                                                  textDecoration: 'none',
                                                  textTransform: 'none',
                                                  borderWidth: ['0rem'],
                                                },
                                              },
                                              options: {
                                                ...openPageButtonOptions,
                                                buttonText: variable(
                                                  'Button text',
                                                  {
                                                    value: ['Cases'],
                                                  },
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
                                                  fontWeight: '500',
                                                  padding: ['0rem', '0rem'],
                                                  textDecoration: 'none',
                                                  textTransform: 'none',
                                                  borderWidth: ['0rem'],
                                                },
                                              },
                                              options: {
                                                ...openPageButtonOptions,
                                                buttonText: variable(
                                                  'Button text',
                                                  {
                                                    value: ['Jobs'],
                                                  },
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
                                                  fontWeight: '500',
                                                  padding: ['0rem', '0rem'],
                                                  textDecoration: 'none',
                                                  textTransform: 'none',
                                                  borderWidth: ['0rem'],
                                                },
                                              },
                                              options: {
                                                ...openPageButtonOptions,
                                                buttonText: variable(
                                                  'Button text',
                                                  {
                                                    value: ['Contact'],
                                                  },
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
                  prefabBox(
                    {
                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
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
                            value: 'left',
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
                        height: size('Height', {
                          value: '500px',
                          configuration: {
                            as: 'UNIT',
                          },
                        }),
                        backgroundUrl: variable('Background url', {
                          value: [
                            'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/Homepage_banner_gradient',
                          ],
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
                              value: 'XL',
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
                            outerSpacing: sizes('Outer space', {
                              value: ['0rem', '0rem', 'XL', '0rem'],
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
                                  value: ['M', 'M', 'M', 'M'],
                                }),
                                columnWidth: option('CUSTOM', {
                                  label: 'Column width',
                                  value: '6',
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
                                  value: '6',
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
                                  value: '10',
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
                                horizontalAlignment: option('CUSTOM', {
                                  label: 'Horizontal Alignment',
                                  value: 'flex-start',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
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
                                      value: ['Welcome to our site'],
                                      // configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Title2'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                    fontWeight: option('CUSTOM', {
                                      label: 'Font weight',
                                      value: '600',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '100', value: '100' },
                                          { name: '200', value: '200' },
                                          { name: '300', value: '300' },
                                          { name: '400', value: '400' },
                                          { name: '500', value: '500' },
                                          { name: '600', value: '600' },
                                          { name: '700', value: '700' },
                                          { name: '800', value: '800' },
                                          { name: '900', value: '900' },
                                        ],
                                      },
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: [
                                        'We are an agency based in Europe. When we team up, you get crafted solutions that are here to stay.',
                                      ],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Title5'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['M', '0rem', 'XL', '0rem'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
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
                                      borderColor: {
                                        type: 'THEME_COLOR',
                                        value: 'white',
                                      },
                                      borderRadius: ['0.25rem'],
                                      borderStyle: 'solid',
                                      borderWidth: ['0.0625rem'],
                                      boxShadow: 'none',
                                      color: {
                                        type: 'THEME_COLOR',
                                        value: 'white',
                                      },
                                      fontFamily: 'Roboto',
                                      fontSize: '0.875rem',
                                      fontStyle: 'none',
                                      fontWeight: '400',
                                      padding: ['0.6875rem', '1.375rem'],
                                      textDecoration: 'none',
                                      textTransform: 'none',
                                    },
                                  },
                                  options: {
                                    ...openPageButtonOptions,
                                    buttonText: variable('Button text', {
                                      value: ['See our cases'],
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
                  prefabBox(
                    {
                      options: {
                        ...boxOptions,
                        stretch: toggle('Stretch (when in flex container)', {
                          value: true,
                        }),
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
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
                            outerSpacing: sizes('Outer space', {
                              value: ['XL', '0rem', 'XL', '0rem'],
                            }),
                          },
                        },
                        [
                          Column(
                            {
                              options: {
                                ...columnOptions,
                                horizontalAlignment: option('CUSTOM', {
                                  label: 'Horizontal Alignment',
                                  value: 'center',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
                                  },
                                }),
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                              },
                            },
                            [
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['About us'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Title4'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', '0rem', 'M', '0rem'],
                                    }),
                                    fontWeight: option('CUSTOM', {
                                      label: 'Font weight',
                                      value: '300',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '100', value: '100' },
                                          { name: '200', value: '200' },
                                          { name: '300', value: '300' },
                                          { name: '400', value: '400' },
                                          { name: '500', value: '500' },
                                          { name: '600', value: '600' },
                                          { name: '700', value: '700' },
                                          { name: '800', value: '800' },
                                          { name: '900', value: '900' },
                                        ],
                                      },
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: [
                                        'We bring win-win survival strategies to the table to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.',
                                      ],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
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
                                          { name: 'Center', value: 'center' },
                                          { name: 'Right', value: 'right' },
                                        ],
                                      },
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', 'M', 'XL', 'M'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              OpenPageButton(
                                {
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
                                      fontWeight: '500',
                                      padding: ['0.6875rem', '1.375rem'],
                                      textDecoration: 'none',
                                      textTransform: 'none',
                                    },
                                  },
                                  options: {
                                    ...openPageButtonOptions,
                                    buttonText: variable('Button text', {
                                      value: ['Read more'],
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
                  prefabBox(
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
                      },
                    },
                    [
                      Row(
                        {
                          options: {
                            ...rowOptions,
                            outerSpacing: sizes('Outer space', {
                              value: ['XL', '0rem', 'XL', '0rem'],
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
                                  value: '12',
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
                                horizontalAlignment: option('CUSTOM', {
                                  label: 'Horizontal Alignment',
                                  value: 'center',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
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
                                      value: ['Our services'],
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
                                    type: font('Text style', {
                                      value: ['Title4'],
                                    }),
                                    fontWeight: option('CUSTOM', {
                                      label: 'Font weight',
                                      value: '300',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '100', value: '100' },
                                          { name: '200', value: '200' },
                                          { name: '300', value: '300' },
                                          { name: '400', value: '400' },
                                          { name: '500', value: '500' },
                                          { name: '600', value: '600' },
                                          { name: '700', value: '700' },
                                          { name: '800', value: '800' },
                                          { name: '900', value: '900' },
                                        ],
                                      },
                                    }),
                                  },
                                },
                                [],
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
                                  value: '12',
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
                                            value: '4',
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
                                            value: '6',
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
                                            square: toggle('Square', {
                                              value: true,
                                            }),
                                          },
                                        },
                                        [
                                          CardMedia(
                                            {
                                              options: {
                                                ...cardMediaOptions,
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
                                                        name: 'Data',
                                                        value: 'data',
                                                      },
                                                      {
                                                        name: 'Video',
                                                        value: 'video',
                                                      },
                                                      {
                                                        name: 'URL',
                                                        value: 'url',
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
                                                      'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/Homepage_support',
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
                                              },
                                            },
                                            [],
                                          ),
                                          CardHeader(
                                            {
                                              options: {
                                                ...cardHeaderOptions,
                                                title: variable('Title', {
                                                  value: ['24/7 support'],
                                                }),
                                              },
                                            },
                                            [],
                                          ),
                                          CardContent({}, [
                                            TextPrefab(
                                              {
                                                options: {
                                                  ...textOptions,
                                                  content: variable('Content', {
                                                    value: [
                                                      'Distinctively exploit optimal alignments for intuitive bandwidth. Quickly coordinate e-business applications through revolutionary catalysts for change.',
                                                    ],
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
                                          ]),
                                          CardActions({}, [
                                            ButtonPrefab(
                                              {
                                                style: {
                                                  overwrite: {
                                                    backgroundColor: {
                                                      type: 'THEME_COLOR',
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
                                                      '1.375rem',
                                                    ],
                                                    textDecoration: 'none',
                                                    textTransform: 'none',
                                                  },
                                                },
                                                options: {
                                                  ...buttonOptions,
                                                  buttonText: variable(
                                                    'Button text',
                                                    { value: ['Read more'] },
                                                  ),
                                                  icon: icon('Icon', {
                                                    value: 'ChevronRight',
                                                  }),
                                                  iconPosition: option(
                                                    'CUSTOM',
                                                    {
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
                                                    },
                                                  ),
                                                },
                                              },
                                              [],
                                            ),
                                          ]),
                                        ],
                                      ),
                                    ],
                                  ),
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
                                            value: '4',
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
                                            value: '6',
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
                                          CardMedia(
                                            {
                                              options: {
                                                ...cardMediaOptions,
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
                                                        name: 'Data',
                                                        value: 'data',
                                                      },
                                                      {
                                                        name: 'Video',
                                                        value: 'video',
                                                      },
                                                      {
                                                        name: 'URL',
                                                        value: 'url',
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
                                                      'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/Homepage_product_management',
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
                                              },
                                            },
                                            [],
                                          ),
                                          CardHeader(
                                            {
                                              options: {
                                                ...cardHeaderOptions,
                                                title: variable('Title', {
                                                  value: ['Product Management'],
                                                }),
                                              },
                                            },
                                            [],
                                          ),
                                          CardContent({}, [
                                            TextPrefab(
                                              {
                                                options: {
                                                  ...textOptions,
                                                  content: variable('Content', {
                                                    value: [
                                                      'Globally incubate standards compliant channels before scalable benefits. Quickly disseminate superior deliverables whereas web-enabled applications.',
                                                    ],
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
                                          ]),
                                          CardActions({}, [
                                            ButtonPrefab(
                                              {
                                                style: {
                                                  overwrite: {
                                                    backgroundColor: {
                                                      type: 'THEME_COLOR',
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
                                                      '1.375rem',
                                                    ],
                                                    textDecoration: 'none',
                                                    textTransform: 'none',
                                                  },
                                                },
                                                options: {
                                                  ...buttonOptions,
                                                  buttonText: variable(
                                                    'Button text',
                                                    { value: ['Read more'] },
                                                  ),
                                                  icon: icon('Icon', {
                                                    value: 'ChevronRight',
                                                  }),
                                                  iconPosition: option(
                                                    'CUSTOM',
                                                    {
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
                                                    },
                                                  ),
                                                },
                                              },
                                              [],
                                            ),
                                          ]),
                                        ],
                                      ),
                                    ],
                                  ),
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
                                            value: '4',
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
                                            value: '6',
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
                                          CardMedia(
                                            {
                                              options: {
                                                ...cardMediaOptions,
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
                                                        name: 'Data',
                                                        value: 'data',
                                                      },
                                                      {
                                                        name: 'Video',
                                                        value: 'video',
                                                      },
                                                      {
                                                        name: 'URL',
                                                        value: 'url',
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
                                                      'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/Homepage_research',
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
                                              },
                                            },
                                            [],
                                          ),
                                          CardHeader(
                                            {
                                              options: {
                                                ...cardHeaderOptions,
                                                title: variable('Title', {
                                                  value: ['Research'],
                                                }),
                                              },
                                            },
                                            [],
                                          ),
                                          CardContent({}, [
                                            TextPrefab(
                                              {
                                                options: {
                                                  ...textOptions,
                                                  content: variable('Content', {
                                                    value: [
                                                      'Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes and tactical architectures.',
                                                    ],
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
                                          ]),
                                          CardActions({}, [
                                            ButtonPrefab(
                                              {
                                                style: {
                                                  overwrite: {
                                                    backgroundColor: {
                                                      type: 'THEME_COLOR',
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
                                                      '1.375rem',
                                                    ],
                                                    textDecoration: 'none',
                                                    textTransform: 'none',
                                                  },
                                                },
                                                options: {
                                                  ...buttonOptions,
                                                  buttonText: variable(
                                                    'Button text',
                                                    { value: ['Read more'] },
                                                  ),
                                                  icon: icon('Icon', {
                                                    value: 'ChevronRight',
                                                  }),
                                                  iconPosition: option(
                                                    'CUSTOM',
                                                    {
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
                                                    },
                                                  ),
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
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        backgroundOptions: toggle('Show background options', {
                          value: true,
                        }),
                        backgroundColor: color('Background color', {
                          value: ThemeColor.WHITE,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
                          },
                        }),
                        width: size('Width', {
                          value: '100%',
                          configuration: {
                            as: 'UNIT',
                          },
                        }),
                      },
                    },
                    [
                      Row(
                        {
                          options: {
                            ...rowOptions,
                            outerSpacing: sizes('Outer space', {
                              value: ['XL', '0rem', 'XL', '0rem'],
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
                                  value: '3',
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
                                  value: '3',
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
                                  value: '6',
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
                                horizontalAlignment: option('CUSTOM', {
                                  label: 'Horizontal Alignment',
                                  value: 'center',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
                                  },
                                }),
                                innerSpacing: sizes('Inner space', {
                                  value: ['S', 'S', 'S', 'S'],
                                }),
                              },
                            },
                            [
                              Avatar(
                                {
                                  options: {
                                    ...avatarOptions,
                                    type: option('CUSTOM', {
                                      label: 'Type',
                                      value: 'icon',
                                      configuration: {
                                        as: 'BUTTONGROUP',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: 'Image', value: 'img' },
                                          { name: 'Letter', value: 'letter' },
                                          { name: 'Icon', value: 'icon' },
                                        ],
                                      },
                                    }),
                                    icon: icon('Icon', {
                                      value: 'People',
                                      configuration: {
                                        condition: showIf('type', 'EQ', 'icon'),
                                      },
                                    }),
                                    backgroundColor: color('Background color', {
                                      value: ThemeColor.PRIMARY,
                                      configuration: {
                                        condition: {
                                          type: 'HIDE',
                                          option: 'type',
                                          comparator: 'EQ',
                                          value: 'img',
                                        },
                                      },
                                    }),
                                    width: size('Width', {
                                      value: '64px',
                                      configuration: {
                                        as: 'UNIT',
                                      },
                                    }),
                                    height: size('Height', {
                                      value: '64px',
                                      configuration: {
                                        as: 'UNIT',
                                      },
                                    }),
                                    margin: sizes('Outer Space', {
                                      value: ['0rem', '0rem', '0rem', '0rem'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['12.345'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Title5'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['S', '0rem', '0rem', '0rem'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Satisfied customers'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.DARK,
                                    }),
                                  },
                                },
                                [],
                              ),
                            ],
                          ),
                          Column(
                            {
                              options: {
                                ...columnOptions,
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
                                  value: '3',
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
                                  value: '6',
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
                                horizontalAlignment: option('CUSTOM', {
                                  label: 'Horizontal Alignment',
                                  value: 'center',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
                                  },
                                }),
                                innerSpacing: sizes('Inner space', {
                                  value: ['S', 'S', 'S', 'S'],
                                }),
                              },
                            },
                            [
                              Avatar(
                                {
                                  options: {
                                    ...avatarOptions,
                                    type: option('CUSTOM', {
                                      label: 'Type',
                                      value: 'icon',
                                      configuration: {
                                        as: 'BUTTONGROUP',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: 'Image', value: 'img' },
                                          { name: 'Letter', value: 'letter' },
                                          { name: 'Icon', value: 'icon' },
                                        ],
                                      },
                                    }),
                                    icon: icon('Icon', {
                                      value: 'History',
                                      configuration: {
                                        condition: showIf('type', 'EQ', 'icon'),
                                      },
                                    }),
                                    backgroundColor: color('Background color', {
                                      value: ThemeColor.PRIMARY,
                                      configuration: {
                                        condition: {
                                          type: 'HIDE',
                                          option: 'type',
                                          comparator: 'EQ',
                                          value: 'img',
                                        },
                                      },
                                    }),
                                    width: size('Width', {
                                      value: '64px',
                                      configuration: {
                                        as: 'UNIT',
                                      },
                                    }),
                                    height: size('Height', {
                                      value: '64px',
                                      configuration: {
                                        as: 'UNIT',
                                      },
                                    }),
                                    margin: sizes('Outer Space', {
                                      value: ['0rem', '0rem', '0rem', '0rem'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['24/7'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Title5'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['S', '0rem', '0rem', '0rem'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Support'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.DARK,
                                    }),
                                  },
                                },
                                [],
                              ),
                            ],
                          ),
                          Column(
                            {
                              options: {
                                ...columnOptions,
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
                                  value: '3',
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
                                  value: '6',
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
                                horizontalAlignment: option('CUSTOM', {
                                  label: 'Horizontal Alignment',
                                  value: 'center',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
                                  },
                                }),
                                innerSpacing: sizes('Inner space', {
                                  value: ['S', 'S', 'S', 'S'],
                                }),
                              },
                            },
                            [
                              Avatar(
                                {
                                  options: {
                                    ...avatarOptions,
                                    type: option('CUSTOM', {
                                      label: 'Type',
                                      value: 'icon',
                                      configuration: {
                                        as: 'BUTTONGROUP',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: 'Image', value: 'img' },
                                          { name: 'Letter', value: 'letter' },
                                          { name: 'Icon', value: 'icon' },
                                        ],
                                      },
                                    }),
                                    icon: icon('Icon', {
                                      value: 'StarRate',
                                      configuration: {
                                        condition: showIf('type', 'EQ', 'icon'),
                                      },
                                    }),
                                    backgroundColor: color('Background color', {
                                      value: ThemeColor.PRIMARY,
                                      configuration: {
                                        condition: {
                                          type: 'HIDE',
                                          option: 'type',
                                          comparator: 'EQ',
                                          value: 'img',
                                        },
                                      },
                                    }),
                                    width: size('Width', {
                                      value: '64px',
                                      configuration: {
                                        as: 'UNIT',
                                      },
                                    }),
                                    height: size('Height', {
                                      value: '64px',
                                      configuration: {
                                        as: 'UNIT',
                                      },
                                    }),
                                    margin: sizes('Outer Space', {
                                      value: ['0rem', '0rem', '0rem', '0rem'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['98.765'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Title5'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['S', '0rem', '0rem', '0rem'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Magical sparks'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.DARK,
                                    }),
                                  },
                                },
                                [],
                              ),
                            ],
                          ),
                          Column(
                            {
                              options: {
                                ...columnOptions,
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
                                  value: '3',
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
                                  value: '6',
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
                                horizontalAlignment: option('CUSTOM', {
                                  label: 'Horizontal Alignment',
                                  value: 'center',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
                                  },
                                }),
                                innerSpacing: sizes('Inner space', {
                                  value: ['S', 'S', 'S', 'S'],
                                }),
                              },
                            },
                            [
                              Avatar(
                                {
                                  options: {
                                    ...avatarOptions,
                                    type: option('CUSTOM', {
                                      label: 'Type',
                                      value: 'icon',
                                      configuration: {
                                        as: 'BUTTONGROUP',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: 'Image', value: 'img' },
                                          { name: 'Letter', value: 'letter' },
                                          { name: 'Icon', value: 'icon' },
                                        ],
                                      },
                                    }),
                                    icon: icon('ThumbUp', {
                                      value: 'ThumbUp',
                                      configuration: {
                                        condition: showIf('type', 'EQ', 'icon'),
                                      },
                                    }),
                                    backgroundColor: color('Background color', {
                                      value: ThemeColor.PRIMARY,
                                      configuration: {
                                        condition: {
                                          type: 'HIDE',
                                          option: 'type',
                                          comparator: 'EQ',
                                          value: 'img',
                                        },
                                      },
                                    }),
                                    width: size('Width', {
                                      value: '64px',
                                      configuration: {
                                        as: 'UNIT',
                                      },
                                    }),
                                    height: size('Height', {
                                      value: '64px',
                                      configuration: {
                                        as: 'UNIT',
                                      },
                                    }),
                                    margin: sizes('Outer Space', {
                                      value: ['0rem', '0rem', '0rem', '0rem'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['9,1'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Title5'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['S', '0rem', '0rem', '0rem'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Average rating'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.DARK,
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
                  prefabBox(
                    {
                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        backgroundOptions: toggle('Show background options', {
                          value: true,
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
                        }),
                      },
                    },
                    [
                      Row(
                        {
                          options: {
                            ...rowOptions,
                            outerSpacing: sizes('Outer space', {
                              value: ['XL', '0rem', 'XL', '0rem'],
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
                                  value: '12',
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
                                horizontalAlignment: option('CUSTOM', {
                                  label: 'Horizontal Alignment',
                                  value: 'center',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
                                  },
                                }),
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                              },
                            },
                            [
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Clients about us'],
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
                                    type: font('Text style', {
                                      value: ['Title4'],
                                    }),
                                    fontWeight: option('CUSTOM', {
                                      label: 'Font weight',
                                      value: '300',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '100', value: '100' },
                                          { name: '200', value: '200' },
                                          { name: '300', value: '300' },
                                          { name: '400', value: '400' },
                                          { name: '500', value: '500' },
                                          { name: '600', value: '600' },
                                          { name: '700', value: '700' },
                                          { name: '800', value: '800' },
                                          { name: '900', value: '900' },
                                        ],
                                      },
                                    }),
                                  },
                                },
                                [],
                              ),
                            ],
                          ),
                          Column(
                            {
                              options: {
                                ...columnOptions,
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
                                  value: '12',
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
                                      value: 'full',
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
                                        columnWidthTabletLandscape: option(
                                          'CUSTOM',
                                          {
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
                                            value: '6',
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
                                          value: '6',
                                          label: 'Column width (mobile)',
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
                                      },
                                    },
                                    [
                                      prefabBox(
                                        {
                                          options: {
                                            ...boxOptions,
                                            height: size('Height', {
                                              value: '100%',
                                              configuration: {
                                                as: 'UNIT',
                                              },
                                            }),
                                            backgroundColor: color(
                                              'Background color',
                                              {
                                                value: ThemeColor.WHITE,
                                              },
                                            ),
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
                                                backgroundColor: color(
                                                  'Background color',
                                                  {
                                                    value: ThemeColor.WHITE,
                                                  },
                                                ),
                                              },
                                            },
                                            [
                                              Avatar(
                                                {
                                                  options: {
                                                    ...avatarOptions,
                                                    margin: sizes(
                                                      'Outer Space',
                                                      {
                                                        value: [
                                                          '0rem',
                                                          '0rem',
                                                          '0rem',
                                                          '0rem',
                                                        ],
                                                      },
                                                    ),
                                                    imgUrl: variable(
                                                      'Image url',
                                                      {
                                                        value: [
                                                          'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/Homepage_Jenny_Wilson',
                                                        ],
                                                        configuration: {
                                                          condition: showIf(
                                                            'type',
                                                            'EQ',
                                                            'img',
                                                          ),
                                                        },
                                                      },
                                                    ),
                                                  },
                                                },
                                                [],
                                              ),
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
                                                          'M',
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
                                                  TextPrefab(
                                                    {
                                                      options: {
                                                        ...textOptions,
                                                        content: variable(
                                                          'Content',
                                                          {
                                                            value: [
                                                              'Jenny Wilson',
                                                            ],
                                                            configuration: {
                                                              as: 'MULTILINE',
                                                            },
                                                          },
                                                        ),
                                                        type: font(
                                                          'Text style',
                                                          {
                                                            value: ['Title6'],
                                                          },
                                                        ),
                                                      },
                                                    },
                                                    [],
                                                  ),
                                                  TextPrefab(
                                                    {
                                                      options: {
                                                        ...textOptions,
                                                        content: variable(
                                                          'Content',
                                                          {
                                                            value: [
                                                              'Barone LLC',
                                                            ],
                                                            configuration: {
                                                              as: 'MULTILINE',
                                                            },
                                                          },
                                                        ),
                                                        type: font(
                                                          'Text style',
                                                          {
                                                            value: ['Body1'],
                                                          },
                                                        ),
                                                        textColor: color(
                                                          'Text color',
                                                          {
                                                            value:
                                                              ThemeColor.DARK,
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
                                          // Rating
                                          RatingInput({
                                            options: {
                                              ...ratingInputOptions,
                                              readonly: toggle('Is read only', {
                                                value: 'true',
                                              }),
                                              hideLabel: toggle('Hide label', {
                                                value: 'true',
                                              }),
                                              value: variable('Value', {
                                                value: ['4'],
                                              }),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    'M',
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          }),
                                          TextPrefab(
                                            {
                                              options: {
                                                ...textOptions,
                                                content: variable('Content', {
                                                  value: [
                                                    'This is the most valuable business resource we have EVER purchased. Man, this thing is getting better and better as I learn more about it.',
                                                  ],
                                                  configuration: {
                                                    as: 'MULTILINE',
                                                  },
                                                }),
                                                type: font('Text style', {
                                                  value: ['Body1'],
                                                }),
                                                textColor: color('Text color', {
                                                  value: ThemeColor.DARK,
                                                }),
                                              },
                                            },
                                            [],
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                  Column(
                                    {
                                      options: {
                                        ...columnOptions,
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
                                        columnWidthTabletLandscape: option(
                                          'CUSTOM',
                                          {
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
                                            value: '6',
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
                                          value: '6',
                                          label: 'Column width (mobile)',
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
                                      },
                                    },
                                    [
                                      prefabBox(
                                        {
                                          options: {
                                            ...boxOptions,
                                            height: size('Height', {
                                              value: '100%',
                                              configuration: {
                                                as: 'UNIT',
                                              },
                                            }),
                                            backgroundColor: color(
                                              'Background color',
                                              {
                                                value: ThemeColor.WHITE,
                                              },
                                            ),
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
                                                backgroundColor: color(
                                                  'Background color',
                                                  {
                                                    value: ThemeColor.WHITE,
                                                  },
                                                ),
                                              },
                                            },
                                            [
                                              Avatar(
                                                {
                                                  options: {
                                                    ...avatarOptions,
                                                    margin: sizes(
                                                      'Outer Space',
                                                      {
                                                        value: [
                                                          '0rem',
                                                          '0rem',
                                                          '0rem',
                                                          '0rem',
                                                        ],
                                                      },
                                                    ),
                                                    imgUrl: variable(
                                                      'Image url',
                                                      {
                                                        value: [
                                                          'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/Homepage_Wade_Warren',
                                                        ],
                                                        configuration: {
                                                          condition: showIf(
                                                            'type',
                                                            'EQ',
                                                            'img',
                                                          ),
                                                        },
                                                      },
                                                    ),
                                                  },
                                                },
                                                [],
                                              ),
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
                                                          'M',
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
                                                  TextPrefab(
                                                    {
                                                      options: {
                                                        ...textOptions,
                                                        content: variable(
                                                          'Content',
                                                          {
                                                            value: [
                                                              'Wade Warren',
                                                            ],
                                                            configuration: {
                                                              as: 'MULTILINE',
                                                            },
                                                          },
                                                        ),
                                                        type: font(
                                                          'Text style',
                                                          {
                                                            value: ['Title6'],
                                                          },
                                                        ),
                                                      },
                                                    },
                                                    [],
                                                  ),
                                                  TextPrefab(
                                                    {
                                                      options: {
                                                        ...textOptions,
                                                        content: variable(
                                                          'Content',
                                                          {
                                                            value: [
                                                              'Abstergo Ltd.',
                                                            ],
                                                            configuration: {
                                                              as: 'MULTILINE',
                                                            },
                                                          },
                                                        ),
                                                        type: font(
                                                          'Text style',
                                                          {
                                                            value: ['Body1'],
                                                          },
                                                        ),
                                                        textColor: color(
                                                          'Text color',
                                                          {
                                                            value:
                                                              ThemeColor.DARK,
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
                                          // Rating
                                          RatingInput({
                                            options: {
                                              ...ratingInputOptions,
                                              readonly: toggle('Is read only', {
                                                value: 'true',
                                              }),
                                              hideLabel: toggle('Hide label', {
                                                value: 'true',
                                              }),
                                              value: variable('Value', {
                                                value: ['3'],
                                              }),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    'M',
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          }),
                                          TextPrefab(
                                            {
                                              options: {
                                                ...textOptions,
                                                content: variable('Content', {
                                                  value: [
                                                    'Sure, it is a useful tool in our daily lives, but I think that performance is still a bit of a issue here, if we all use this at the same time.',
                                                  ],
                                                  configuration: {
                                                    as: 'MULTILINE',
                                                  },
                                                }),
                                                type: font('Text style', {
                                                  value: ['Body1'],
                                                }),
                                                textColor: color('Text color', {
                                                  value: ThemeColor.DARK,
                                                }),
                                              },
                                            },
                                            [],
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                  Column(
                                    {
                                      options: {
                                        ...columnOptions,
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
                                        columnWidthTabletLandscape: option(
                                          'CUSTOM',
                                          {
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
                                            value: '6',
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
                                          value: '6',
                                          label: 'Column width (mobile)',
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
                                      },
                                    },
                                    [
                                      prefabBox(
                                        {
                                          options: {
                                            ...boxOptions,
                                            height: size('Height', {
                                              value: '100%',
                                              configuration: {
                                                as: 'UNIT',
                                              },
                                            }),
                                            backgroundColor: color(
                                              'Background color',
                                              {
                                                value: ThemeColor.WHITE,
                                              },
                                            ),
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
                                                backgroundColor: color(
                                                  'Background color',
                                                  {
                                                    value: ThemeColor.WHITE,
                                                  },
                                                ),
                                              },
                                            },
                                            [
                                              Avatar(
                                                {
                                                  options: {
                                                    ...avatarOptions,
                                                    margin: sizes(
                                                      'Outer Space',
                                                      {
                                                        value: [
                                                          '0rem',
                                                          '0rem',
                                                          '0rem',
                                                          '0rem',
                                                        ],
                                                      },
                                                    ),
                                                    imgUrl: variable(
                                                      'Image url',
                                                      {
                                                        value: [
                                                          'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/Homepage_Jacob_Jones',
                                                        ],
                                                        configuration: {
                                                          condition: showIf(
                                                            'type',
                                                            'EQ',
                                                            'img',
                                                          ),
                                                        },
                                                      },
                                                    ),
                                                  },
                                                },
                                                [],
                                              ),
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
                                                          'M',
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
                                                  TextPrefab(
                                                    {
                                                      options: {
                                                        ...textOptions,
                                                        content: variable(
                                                          'Content',
                                                          {
                                                            value: [
                                                              'Jacob Jones',
                                                            ],
                                                            configuration: {
                                                              as: 'MULTILINE',
                                                            },
                                                          },
                                                        ),
                                                        type: font(
                                                          'Text style',
                                                          {
                                                            value: ['Title6'],
                                                          },
                                                        ),
                                                      },
                                                    },
                                                    [],
                                                  ),
                                                  TextPrefab(
                                                    {
                                                      options: {
                                                        ...textOptions,
                                                        content: variable(
                                                          'Content',
                                                          {
                                                            value: ['Acme Co.'],
                                                            configuration: {
                                                              as: 'MULTILINE',
                                                            },
                                                          },
                                                        ),
                                                        type: font(
                                                          'Text style',
                                                          {
                                                            value: ['Body1'],
                                                          },
                                                        ),
                                                        textColor: color(
                                                          'Text color',
                                                          {
                                                            value:
                                                              ThemeColor.DARK,
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
                                          // Rating
                                          RatingInput({
                                            options: {
                                              ...ratingInputOptions,
                                              readonly: toggle('Is read only', {
                                                value: 'true',
                                              }),
                                              hideLabel: toggle('Hide label', {
                                                value: 'true',
                                              }),
                                              value: variable('Value', {
                                                value: ['4'],
                                              }),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    'M',
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          }),
                                          TextPrefab(
                                            {
                                              options: {
                                                ...textOptions,
                                                content: variable('Content', {
                                                  value: [
                                                    "This is exactly what I've been looking for. It's really wonderful. I would like to personally thank you for your outstanding product!",
                                                  ],
                                                  configuration: {
                                                    as: 'MULTILINE',
                                                  },
                                                }),
                                                type: font('Text style', {
                                                  value: ['Body1'],
                                                }),
                                                textColor: color('Text color', {
                                                  value: ThemeColor.DARK,
                                                }),
                                              },
                                            },
                                            [],
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                  Column(
                                    {
                                      options: {
                                        ...columnOptions,
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
                                        columnWidthTabletLandscape: option(
                                          'CUSTOM',
                                          {
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
                                            value: '6',
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
                                          value: '6',
                                          label: 'Column width (mobile)',
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
                                      },
                                    },
                                    [
                                      prefabBox(
                                        {
                                          options: {
                                            ...boxOptions,
                                            height: size('Height', {
                                              value: '100%',
                                              configuration: {
                                                as: 'UNIT',
                                              },
                                            }),
                                            backgroundColor: color(
                                              'Background color',
                                              {
                                                value: ThemeColor.WHITE,
                                              },
                                            ),
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
                                                backgroundColor: color(
                                                  'Background color',
                                                  {
                                                    value: ThemeColor.WHITE,
                                                  },
                                                ),
                                              },
                                            },
                                            [
                                              Avatar(
                                                {
                                                  options: {
                                                    ...avatarOptions,
                                                    margin: sizes(
                                                      'Outer Space',
                                                      {
                                                        value: [
                                                          '0rem',
                                                          '0rem',
                                                          '0rem',
                                                          '0rem',
                                                        ],
                                                      },
                                                    ),
                                                    imgUrl: variable(
                                                      'Image url',
                                                      {
                                                        value: [
                                                          'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/Homepage_Darlene_Robertson',
                                                        ],
                                                        configuration: {
                                                          condition: showIf(
                                                            'type',
                                                            'EQ',
                                                            'img',
                                                          ),
                                                        },
                                                      },
                                                    ),
                                                  },
                                                },
                                                [],
                                              ),
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
                                                          'M',
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
                                                  TextPrefab(
                                                    {
                                                      options: {
                                                        ...textOptions,
                                                        content: variable(
                                                          'Content',
                                                          {
                                                            value: [
                                                              'Darlene Robertson',
                                                            ],
                                                            configuration: {
                                                              as: 'MULTILINE',
                                                            },
                                                          },
                                                        ),
                                                        type: font(
                                                          'Text style',
                                                          {
                                                            value: ['Title6'],
                                                          },
                                                        ),
                                                      },
                                                    },
                                                    [],
                                                  ),
                                                  TextPrefab(
                                                    {
                                                      options: {
                                                        ...textOptions,
                                                        content: variable(
                                                          'Content',
                                                          {
                                                            value: [
                                                              'Binford Ltd.',
                                                            ],
                                                            configuration: {
                                                              as: 'MULTILINE',
                                                            },
                                                          },
                                                        ),
                                                        type: font(
                                                          'Text style',
                                                          {
                                                            value: ['Body1'],
                                                          },
                                                        ),
                                                        textColor: color(
                                                          'Text color',
                                                          {
                                                            value:
                                                              ThemeColor.DARK,
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
                                          // Rating
                                          RatingInput({
                                            options: {
                                              ...ratingInputOptions,
                                              readonly: toggle('Is read only', {
                                                value: 'true',
                                              }),
                                              hideLabel: toggle('Hide label', {
                                                value: 'true',
                                              }),
                                              value: variable('Value', {
                                                value: ['5'],
                                              }),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    'M',
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          }),
                                          TextPrefab(
                                            {
                                              options: {
                                                ...textOptions,
                                                content: variable('Content', {
                                                  value: [
                                                    "I can honestly say that there is no other company that I've ever worked with that has better service than this one. Love it!",
                                                  ],
                                                  configuration: {
                                                    as: 'MULTILINE',
                                                  },
                                                }),
                                                type: font('Text style', {
                                                  value: ['Body1'],
                                                }),
                                                textColor: color('Text color', {
                                                  value: ThemeColor.DARK,
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
                  prefabBox(
                    {
                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        backgroundOptions: toggle('Show background options', {
                          value: true,
                        }),
                        backgroundColor: color('Background color', {
                          value: ThemeColor.WHITE,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
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
                              value: 'M',
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
                            outerSpacing: sizes('Outer space', {
                              value: ['XL', '0rem', 'XL', '0rem'],
                            }),
                          },
                        },
                        [
                          Column(
                            {
                              options: {
                                ...columnOptions,
                                horizontalAlignment: option('CUSTOM', {
                                  label: 'Horizontal Alignment',
                                  value: 'center',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
                                  },
                                }),
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                              },
                            },
                            [
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Are you interested?'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Title4'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', '0rem', 'M', '0rem'],
                                    }),
                                    fontWeight: option('CUSTOM', {
                                      label: 'Font weight',
                                      value: '300',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '100', value: '100' },
                                          { name: '200', value: '200' },
                                          { name: '300', value: '300' },
                                          { name: '400', value: '400' },
                                          { name: '500', value: '500' },
                                          { name: '600', value: '600' },
                                          { name: '700', value: '700' },
                                          { name: '800', value: '800' },
                                          { name: '900', value: '900' },
                                        ],
                                      },
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: [
                                        'Without a beginning or end to existence, time is rendered irrelevant. It continues to change its form. The concept of time has to be thrown out as well.',
                                      ],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', 'M', 'XL', 'M'],
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
                                  },
                                },
                                [],
                              ),
                              OpenPageButton(
                                {
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
                                      fontWeight: '500',
                                      padding: ['0.6875rem', '1.375rem'],
                                      textDecoration: 'none',
                                      textTransform: 'none',
                                    },
                                  },
                                  options: {
                                    ...openPageButtonOptions,
                                    buttonText: variable('Button text', {
                                      value: ['Contact us'],
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
                  prefabBox(
                    {
                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        backgroundOptions: toggle('Show background options', {
                          value: true,
                        }),
                        backgroundColor: color('Background color', {
                          value: ThemeColor.PRIMARY,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
                          },
                        }),
                        width: size('Width', {
                          value: '100%',
                          configuration: {
                            as: 'UNIT',
                          },
                        }),
                      },
                    },
                    [
                      Row(
                        {
                          options: {
                            ...rowOptions,
                            outerSpacing: sizes('Outer space', {
                              value: ['XL', '0rem', 'XL', '0rem'],
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
                              },
                            },
                            [
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Contact information'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Title5'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', '0rem', 'M', '0rem'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                    fontWeight: option('CUSTOM', {
                                      label: 'Font weight',
                                      value: '500',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '100', value: '100' },
                                          { name: '200', value: '200' },
                                          { name: '300', value: '300' },
                                          { name: '400', value: '400' },
                                          { name: '500', value: '500' },
                                          { name: '600', value: '600' },
                                          { name: '700', value: '700' },
                                          { name: '800', value: '800' },
                                          { name: '900', value: '900' },
                                        ],
                                      },
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Company name'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Heuvelstraat 131'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['4812 PH Breda'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['The Netherlands'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['+31 6 12345678'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['L', '0rem', '0rem', '0rem'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['info@companyexample.com'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                  },
                                },
                                [],
                              ),
                            ],
                          ),
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
                              },
                            },
                            [
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Support'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Title5'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', '0rem', 'M', '0rem'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                    fontWeight: option('CUSTOM', {
                                      label: 'Font weight',
                                      value: '500',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '100', value: '100' },
                                          { name: '200', value: '200' },
                                          { name: '300', value: '300' },
                                          { name: '400', value: '400' },
                                          { name: '500', value: '500' },
                                          { name: '600', value: '600' },
                                          { name: '700', value: '700' },
                                          { name: '800', value: '800' },
                                          { name: '900', value: '900' },
                                        ],
                                      },
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: [
                                        'Frequently Asked Questions (FAQ)',
                                      ],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body2'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', '0rem', 'M', '0rem'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                    fontWeight: option('CUSTOM', {
                                      label: 'Font weight',
                                      value: '500',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '100', value: '100' },
                                          { name: '200', value: '200' },
                                          { name: '300', value: '300' },
                                          { name: '400', value: '400' },
                                          { name: '500', value: '500' },
                                          { name: '600', value: '600' },
                                          { name: '700', value: '700' },
                                          { name: '800', value: '800' },
                                          { name: '900', value: '900' },
                                        ],
                                      },
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Customer Service'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body2'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', '0rem', 'M', '0rem'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                    fontWeight: option('CUSTOM', {
                                      label: 'Font weight',
                                      value: '500',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '100', value: '100' },
                                          { name: '200', value: '200' },
                                          { name: '300', value: '300' },
                                          { name: '400', value: '400' },
                                          { name: '500', value: '500' },
                                          { name: '600', value: '600' },
                                          { name: '700', value: '700' },
                                          { name: '800', value: '800' },
                                          { name: '900', value: '900' },
                                        ],
                                      },
                                    }),
                                  },
                                },
                                [],
                              ),
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Chat with a service employee'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body2'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', '0rem', 'M', '0rem'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                    fontWeight: option('CUSTOM', {
                                      label: 'Font weight',
                                      value: '500',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '100', value: '100' },
                                          { name: '200', value: '200' },
                                          { name: '300', value: '300' },
                                          { name: '400', value: '400' },
                                          { name: '500', value: '500' },
                                          { name: '600', value: '600' },
                                          { name: '700', value: '700' },
                                          { name: '800', value: '800' },
                                          { name: '900', value: '900' },
                                        ],
                                      },
                                    }),
                                  },
                                },
                                [],
                              ),
                            ],
                          ),
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
                              },
                            },
                            [
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Social'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    type: font('Text style', {
                                      value: ['Title5'],
                                    }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.WHITE,
                                    }),
                                    fontWeight: option('CUSTOM', {
                                      label: 'Font weight',
                                      value: '500',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '100', value: '100' },
                                          { name: '200', value: '200' },
                                          { name: '300', value: '300' },
                                          { name: '400', value: '400' },
                                          { name: '500', value: '500' },
                                          { name: '600', value: '600' },
                                          { name: '700', value: '700' },
                                          { name: '800', value: '800' },
                                          { name: '900', value: '900' },
                                        ],
                                      },
                                    }),
                                  },
                                },
                                [],
                              ),
                              List(
                                {
                                  options: {
                                    ...listOptions,
                                    disablePadding: toggle('Disable padding', {
                                      value: true,
                                    }),
                                  },
                                },
                                [
                                  ListItem(
                                    {
                                      options: {
                                        ...listItemOptions,
                                        primaryText: variable('Primary text', {
                                          value: ['Facebook'],
                                        }),
                                        linkToExternal: variable('URL', {
                                          value: ['https://www.facebook.com/'],
                                          configuration: {
                                            placeholder:
                                              'Starts with https:// or http://',
                                            condition: showIf(
                                              'linkType',
                                              'EQ',
                                              'external',
                                            ),
                                          },
                                        }),
                                        disableGutters: toggle(
                                          'Disable gutters',
                                          { value: true },
                                        ),
                                        dense: toggle('Dense', {
                                          value: true,
                                        }),
                                        ...styles,
                                        titleColor: color('Title color', {
                                          value: ThemeColor.WHITE,
                                        }),
                                        titleWeight: option('CUSTOM', {
                                          label: 'Title Font weight',
                                          value: '500',
                                          configuration: {
                                            as: 'DROPDOWN',
                                            dataType: 'string',
                                            allowedInput: [
                                              { name: '100', value: '100' },
                                              { name: '200', value: '200' },
                                              { name: '300', value: '300' },
                                              { name: '400', value: '400' },
                                              { name: '500', value: '500' },
                                              { name: '600', value: '600' },
                                              { name: '700', value: '700' },
                                              { name: '800', value: '800' },
                                              { name: '900', value: '900' },
                                            ],
                                          },
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
                                          value: ['Twitter'],
                                        }),
                                        linkToExternal: variable('URL', {
                                          value: ['https://www.twitter.com/'],
                                          configuration: {
                                            placeholder:
                                              'Starts with https:// or http://',
                                            condition: showIf(
                                              'linkType',
                                              'EQ',
                                              'external',
                                            ),
                                          },
                                        }),
                                        disableGutters: toggle(
                                          'Disable gutters',
                                          { value: true },
                                        ),
                                        dense: toggle('Dense', {
                                          value: true,
                                        }),
                                        ...styles,
                                        titleColor: color('Title color', {
                                          value: ThemeColor.WHITE,
                                        }),
                                        titleWeight: option('CUSTOM', {
                                          label: 'Title Font weight',
                                          value: '500',
                                          configuration: {
                                            as: 'DROPDOWN',
                                            dataType: 'string',
                                            allowedInput: [
                                              { name: '100', value: '100' },
                                              { name: '200', value: '200' },
                                              { name: '300', value: '300' },
                                              { name: '400', value: '400' },
                                              { name: '500', value: '500' },
                                              { name: '600', value: '600' },
                                              { name: '700', value: '700' },
                                              { name: '800', value: '800' },
                                              { name: '900', value: '900' },
                                            ],
                                          },
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
                                          value: ['Instagram'],
                                        }),
                                        linkToExternal: variable('URL', {
                                          value: ['https://www.instagram.com/'],
                                          configuration: {
                                            placeholder:
                                              'Starts with https:// or http://',
                                            condition: showIf(
                                              'linkType',
                                              'EQ',
                                              'external',
                                            ),
                                          },
                                        }),
                                        disableGutters: toggle(
                                          'Disable gutters',
                                          { value: true },
                                        ),
                                        dense: toggle('Dense', {
                                          value: true,
                                        }),
                                        ...styles,
                                        titleColor: color('Title color', {
                                          value: ThemeColor.WHITE,
                                        }),
                                        titleWeight: option('CUSTOM', {
                                          label: 'Title Font weight',
                                          value: '500',
                                          configuration: {
                                            as: 'DROPDOWN',
                                            dataType: 'string',
                                            allowedInput: [
                                              { name: '100', value: '100' },
                                              { name: '200', value: '200' },
                                              { name: '300', value: '300' },
                                              { name: '400', value: '400' },
                                              { name: '500', value: '500' },
                                              { name: '600', value: '600' },
                                              { name: '700', value: '700' },
                                              { name: '800', value: '800' },
                                              { name: '900', value: '900' },
                                            ],
                                          },
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
                                          value: ['LinkedIn'],
                                        }),
                                        linkToExternal: variable('URL', {
                                          value: ['https://www.linkedin.com/'],
                                          configuration: {
                                            placeholder:
                                              'Starts with https:// or http://',
                                            condition: showIf(
                                              'linkType',
                                              'EQ',
                                              'external',
                                            ),
                                          },
                                        }),
                                        disableGutters: toggle(
                                          'Disable gutters',
                                          { value: true },
                                        ),
                                        dense: toggle('Dense', {
                                          value: true,
                                        }),
                                        ...styles,
                                        titleColor: color('Title color', {
                                          value: ThemeColor.WHITE,
                                        }),
                                        titleWeight: option('CUSTOM', {
                                          label: 'Title Font weight',
                                          value: '500',
                                          configuration: {
                                            as: 'DROPDOWN',
                                            dataType: 'string',
                                            allowedInput: [
                                              { name: '100', value: '100' },
                                              { name: '200', value: '200' },
                                              { name: '300', value: '300' },
                                              { name: '400', value: '400' },
                                              { name: '500', value: '500' },
                                              { name: '600', value: '600' },
                                              { name: '700', value: '700' },
                                              { name: '800', value: '800' },
                                              { name: '900', value: '900' },
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
                  prefabBox(
                    {
                      ref: { id: '#Footer' },
                      options: {
                        ...boxOptions,
                        backgroundColor: color('Background color', {
                          value: ThemeColor.PRIMARY,
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
                            backgroundColor: color('Background color', {
                              value: ThemeColor.BLACK,
                            }),
                            backgroundColorAlpha: option('NUMBER', {
                              label: 'Background color opacity',
                              value: 20,
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
                                    horizontalAlignment: option('CUSTOM', {
                                      label: 'Horizontal Alignment',
                                      value: 'flex-start',
                                      configuration: {
                                        as: 'BUTTONGROUP',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: 'None', value: 'inherit' },
                                          { name: 'Left', value: 'flex-start' },
                                          { name: 'Center', value: 'center' },
                                          { name: 'Right', value: 'flex-end' },
                                        ],
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
                                            value: 'flex-start',
                                            configuration: {
                                              dataType: 'string',
                                            },
                                          },
                                        ),
                                        width: size('Width', {
                                          value: '100%',
                                          configuration: {
                                            as: 'UNIT',
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
                                              value: ['© Company BV'],
                                              configuration: {
                                                as: 'MULTILINE',
                                              },
                                            }),
                                            type: font('Text style', {
                                              value: ['Body2'],
                                            }),
                                            textColor: color('Text color', {
                                              value: ThemeColor.WHITE,
                                            }),

                                            fontWeight: option('CUSTOM', {
                                              label: 'Font weight',
                                              value: '500',
                                              configuration: {
                                                as: 'DROPDOWN',
                                                dataType: 'string',
                                                allowedInput: [
                                                  { name: '100', value: '100' },
                                                  { name: '200', value: '200' },
                                                  { name: '300', value: '300' },
                                                  { name: '400', value: '400' },
                                                  { name: '500', value: '500' },
                                                  { name: '600', value: '600' },
                                                  { name: '700', value: '700' },
                                                  { name: '800', value: '800' },
                                                  { name: '900', value: '900' },
                                                ],
                                              },
                                            }),
                                          },
                                        },
                                        [],
                                      ),
                                      TextPrefab(
                                        {
                                          options: {
                                            ...textOptions,
                                            content: variable('Content', {
                                              value: ['·'],
                                              configuration: {
                                                as: 'MULTILINE',
                                              },
                                            }),
                                            type: font('Text style', {
                                              value: ['Body2'],
                                            }),
                                            textColor: color('Text color', {
                                              value: ThemeColor.WHITE,
                                            }),
                                            outerSpacing: sizes('Outer space', {
                                              value: ['0rem', 'S', '0rem', 'S'],
                                            }),
                                            fontWeight: option('CUSTOM', {
                                              label: 'Font weight',
                                              value: '900',
                                              configuration: {
                                                as: 'DROPDOWN',
                                                dataType: 'string',
                                                allowedInput: [
                                                  { name: '100', value: '100' },
                                                  { name: '200', value: '200' },
                                                  { name: '300', value: '300' },
                                                  { name: '400', value: '400' },
                                                  { name: '500', value: '500' },
                                                  { name: '600', value: '600' },
                                                  { name: '700', value: '700' },
                                                  { name: '800', value: '800' },
                                                  { name: '900', value: '900' },
                                                ],
                                              },
                                            }),
                                          },
                                        },
                                        [],
                                      ),
                                      TextPrefab(
                                        {
                                          options: {
                                            ...textOptions,
                                            content: variable('Content', {
                                              value: ['Disclaimer'],
                                              configuration: {
                                                as: 'MULTILINE',
                                              },
                                            }),
                                            type: font('Text style', {
                                              value: ['Body2'],
                                            }),
                                            textColor: color('Text color', {
                                              value: ThemeColor.WHITE,
                                            }),
                                          },
                                        },
                                        [],
                                      ),
                                      TextPrefab(
                                        {
                                          options: {
                                            ...textOptions,
                                            content: variable('Content', {
                                              value: ['·'],
                                              configuration: {
                                                as: 'MULTILINE',
                                              },
                                            }),
                                            type: font('Text style', {
                                              value: ['Body2'],
                                            }),
                                            textColor: color('Text color', {
                                              value: ThemeColor.WHITE,
                                            }),
                                            outerSpacing: sizes('Outer space', {
                                              value: ['0rem', 'S', '0rem', 'S'],
                                            }),
                                            fontWeight: option('CUSTOM', {
                                              label: 'Font weight',
                                              value: '900',
                                              configuration: {
                                                as: 'DROPDOWN',
                                                dataType: 'string',
                                                allowedInput: [
                                                  { name: '100', value: '100' },
                                                  { name: '200', value: '200' },
                                                  { name: '300', value: '300' },
                                                  { name: '400', value: '400' },
                                                  { name: '500', value: '500' },
                                                  { name: '600', value: '600' },
                                                  { name: '700', value: '700' },
                                                  { name: '800', value: '800' },
                                                  { name: '900', value: '900' },
                                                ],
                                              },
                                            }),
                                          },
                                        },
                                        [],
                                      ),
                                      TextPrefab(
                                        {
                                          options: {
                                            ...textOptions,
                                            content: variable('Content', {
                                              value: ['Privacy Statement'],
                                              configuration: {
                                                as: 'MULTILINE',
                                              },
                                            }),
                                            type: font('Text style', {
                                              value: ['Body2'],
                                            }),
                                            textColor: color('Text color', {
                                              value: ThemeColor.WHITE,
                                            }),
                                          },
                                        },
                                        [],
                                      ),
                                      TextPrefab(
                                        {
                                          options: {
                                            ...textOptions,
                                            content: variable('Content', {
                                              value: ['·'],
                                              configuration: {
                                                as: 'MULTILINE',
                                              },
                                            }),
                                            type: font('Text style', {
                                              value: ['Body2'],
                                            }),
                                            textColor: color('Text color', {
                                              value: ThemeColor.WHITE,
                                            }),
                                            outerSpacing: sizes('Outer space', {
                                              value: ['0rem', 'S', '0rem', 'S'],
                                            }),
                                            fontWeight: option('CUSTOM', {
                                              label: 'Font weight',
                                              value: '900',
                                              configuration: {
                                                as: 'DROPDOWN',
                                                dataType: 'string',
                                                allowedInput: [
                                                  { name: '100', value: '100' },
                                                  { name: '200', value: '200' },
                                                  { name: '300', value: '300' },
                                                  { name: '400', value: '400' },
                                                  { name: '500', value: '500' },
                                                  { name: '600', value: '600' },
                                                  { name: '700', value: '700' },
                                                  { name: '800', value: '800' },
                                                  { name: '900', value: '900' },
                                                ],
                                              },
                                            }),
                                          },
                                        },
                                        [],
                                      ),
                                      TextPrefab(
                                        {
                                          options: {
                                            ...textOptions,
                                            content: variable(
                                              'Terms & Conditions',
                                              {
                                                value: ['Terms & Conditions'],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              },
                                            ),
                                            type: font('Text style', {
                                              value: ['Body2'],
                                            }),
                                            textColor: color('Text color', {
                                              value: ThemeColor.WHITE,
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
            ],
          ),
        ],
      ),
    ],
  ),
]);
