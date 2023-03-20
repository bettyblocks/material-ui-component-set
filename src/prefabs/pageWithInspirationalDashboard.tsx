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
  icon,
  buttongroup,
  PrefabComponent,
} from '@betty-blocks/component-sdk';
import {
  Box as BoxPrefab,
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
  Paper,
  Icon as IconPrefab,
  iconOptions,
  Divider,
  dividerOptions,
  Progress,
  progressOptions,
  Avatar,
  avatarOptions,
  Button as ButtonPrefab,
  buttonOptions,
} from './structures';

const attrs = {
  icon: Icon.DataTable,
  type: 'page',
  description: 'Page with a static dashboard for inspiration.',
  detail:
    'This page has a static dashboard to spark your interest and show what things are possible with the pagebuilder.',
  previewUrl: 'https://preview.betty.app/inspirational-dashboard',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Inspirational_Dashboard.jpg',
  category: 'LAYOUT',
};

const smallColumnOptions = {
  ...columnOptions,
  columnWidth: option('CUSTOM', {
    label: 'Column width',
    value: '3',
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
    value: '3',
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
  columnWidthTabletPortrait: option('CUSTOM', {
    value: '6',
    label: 'Column width (tablet portrait)',
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
  columnWidthMobile: option('CUSTOM', {
    value: '12',
    label: 'Column width (mobile)',
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
};

const statusPaper = (
  backgroundColor: ThemeColor,
  statusIcon: string,
  statusTitle: string,
  statusValue: string,
) => {
  return Paper({}, [
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
          backgroundColor: color('Background color', {
            value: backgroundColor,
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
            },
          },
          [
            IconPrefab(
              {
                options: {
                  ...iconOptions,
                  icon: icon('Icon', { value: statusIcon }),
                  size: size('Size', { value: 'M' }),
                  color: color('Color', { value: ThemeColor.WHITE }),
                },
              },
              [],
            ),
          ],
        ),
        Column({}, [
          TextPrefab(
            {
              options: {
                ...textOptions,
                content: variable('Content', {
                  value: [statusTitle],
                  configuration: { as: 'MULTILINE' },
                }),
                type: font('Text style', { value: ['Body1'] }),
                textColor: color('Text color', {
                  value: ThemeColor.WHITE,
                  configuration: {
                    condition: showIfTrue('styles'),
                  },
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
                    condition: showIfTrue('styles'),
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
                  value: [statusValue],
                  configuration: { as: 'MULTILINE' },
                }),
                type: font('Text style', { value: ['Title5'] }),
                textColor: color('Text color', {
                  value: ThemeColor.WHITE,
                  configuration: {
                    condition: showIfTrue('styles'),
                  },
                }),
                fontWeight: option('CUSTOM', {
                  label: 'Font weight',
                  value: '400',
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
                    condition: showIfTrue('styles'),
                  },
                }),
              },
            },
            [],
          ),
        ]),
      ],
    ),
  ]);
};

const outlinedBox = (header: PrefabReference, content: PrefabReference) => {
  return BoxPrefab(
    {
      options: {
        ...boxOptions,
        height: size('Height', {
          value: '100%',
          configuration: {
            as: 'UNIT',
          },
        }),
        innerSpacing: sizes('Inner space', {
          value: ['0rem', '0rem', '0rem', '0rem'],
        }),
        backgroundColor: color('Background color', {
          value: ThemeColor.WHITE,
        }),
        borderColor: color('Border color', {
          value: ThemeColor.ACCENT_1,
        }),
        borderWidth: size('Border thickness', {
          value: '1px',
          configuration: {
            as: 'UNIT',
          },
        }),
      },
    },
    [
      header,
      Divider(
        {
          options: {
            ...dividerOptions,
            color: color('Color', { value: ThemeColor.ACCENT_1 }),
            outerSpacing: sizes('Outer space', {
              value: ['0rem', '0rem', '0rem', '0rem'],
            }),
          },
        },
        [],
      ),
      content,
    ],
  );
};

const circularProgress = (progressColor: ThemeColor, progressValue: string) => {
  return Progress(
    {
      options: {
        ...progressOptions,
        type: option('CUSTOM', {
          value: 'circular',
          label: 'Type',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Circular',
                value: 'circular',
              },
              {
                name: 'Linear',
                value: 'linear',
              },
            ],
          },
        }),
        color: color('Color', { value: progressColor }),
        thickness: variable('Thickness', {
          value: ['2.5'],
          configuration: {
            condition: showIf('type', 'EQ', 'circular'),
          },
        }),
        size: variable('Size', {
          value: ['10rem'],
          configuration: {
            condition: showIf('type', 'EQ', 'circular'),
          },
        }),
        value: variable('Value', {
          value: [progressValue],
        }),
      },
    },
    [],
  );
};

const linearProgressBox = (
  leftText: string,
  rightText: string,
  progressColor: ThemeColor,
  progressValue: string,
) => {
  return BoxPrefab(
    {
      options: {
        ...boxOptions,
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
                  value: [leftText],
                  configuration: { as: 'MULTILINE' },
                }),
                useInnerHtml: toggle('Display Rich Text', {
                  value: false,
                }),
                type: font('Text style', { value: ['Body1'] }),
                textColor: color('Text color', {
                  value: ThemeColor.DARK,
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
                  value: [rightText],
                  configuration: { as: 'MULTILINE' },
                }),
                useInnerHtml: toggle('Display Rich Text', {
                  value: false,
                }),
                type: font('Text style', { value: ['Body1'] }),
                textColor: color('Text color', {
                  value: ThemeColor.DARK,
                }),
              },
            },
            [],
          ),
        ],
      ),
      Progress(
        {
          options: {
            ...progressOptions,
            type: option('CUSTOM', {
              value: 'linear',
              label: 'Type',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Circular',
                    value: 'circular',
                  },
                  {
                    name: 'Linear',
                    value: 'linear',
                  },
                ],
              },
            }),
            color: color('Color', { value: progressColor }),
            barHeight: text('Height', {
              value: '7px',
              configuration: {
                as: 'UNIT',
                condition: showIf('type', 'EQ', 'linear'),
              },
            }),
            value: variable('Value', {
              value: [progressValue],
            }),
            outerSpacing: sizes('Outer space', {
              value: ['0rem', '0rem', 'L', '0rem'],
            }),
          },
        },
        [],
      ),
    ],
  );
};

const statisticsBox = (
  topText: string,
  bottomText: string,
  iconValue: string,
  iconColor: ThemeColor,
) => {
  return BoxPrefab(
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
      IconPrefab(
        {
          options: {
            ...iconOptions,
            icon: icon('Icon', { value: iconValue }),
            size: size('Size', { value: 'M' }),
            color: color('Color', { value: iconColor }),
            outerSpacing: sizes('Outer space', {
              value: ['M', '0rem', 'M', '0rem'],
            }),
          },
        },
        [],
      ),
      BoxPrefab({}, [
        TextPrefab(
          {
            options: {
              ...textOptions,
              content: variable('Content', {
                value: [topText],
                configuration: { as: 'MULTILINE' },
              }),
              useInnerHtml: toggle('Display Rich Text', {
                value: false,
              }),
              type: font('Text style', { value: ['Body1'] }),
              textColor: color('Text color', {
                value: ThemeColor.MEDIUM,
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
                value: [bottomText],
                configuration: { as: 'MULTILINE' },
              }),
              type: font('Text style', { value: ['Title5'] }),
              textColor: color('Text color', {
                value: ThemeColor.DARK,
              }),
            },
          },
          [],
        ),
      ]),
    ],
  );
};

const beforeCreate = ({
  save,
  close,
  prefab,
  components: { Header, Content, Field, Footer, Text, Box, PartialSelector },
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
      <Header onClose={close} title="Configure inspirational dashboard" />
      <Box
        justify="center"
        margin={{ bottom: '2rem', left: '2rem', top: '-1rem' }}
      >
        <Text size="medium" weight="bold">
          Step: 2 / 2
        </Text>
      </Box>
      <Content>
        <Box pad={{ bottom: '15px' }}>
          <Box pad={{ bottom: '15px' }}>
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
        onClose={close}
        onSave={() => {
          const newPrefab = { ...prefab };

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

          save(newPrefab);
        }}
        onSkip={() => {
          save({ ...prefab });
        }}
      />
    </>
  );
};

export default makePrefab('Dashboard, inspirational', attrs, beforeCreate, [
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
                  BoxPrefab(
                    {
                      ref: { id: '#topMenu' },

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
                      },
                    },
                    [
                      Row({}, [
                        Column(
                          {
                            options: {
                              ...columnOptions,
                              innerSpacing: sizes('Inner space', {
                                value: ['0rem', 'S', '0rem', 'S'],
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
                                      value: ['M', 'M', 'M', 'M'],
                                    }),
                                  },
                                },
                                [
                                  TextPrefab(
                                    {
                                      ref: { id: '#titleComponent' },
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
                                    },
                                    [],
                                  ),
                                ],
                              ),
                            ]),
                            Row({}, [
                              Column({ options: smallColumnOptions }, [
                                statusPaper(
                                  ThemeColor.WARNING,
                                  'People',
                                  'Visitors',
                                  '1,294',
                                ),
                              ]),
                              Column({ options: smallColumnOptions }, [
                                statusPaper(
                                  ThemeColor.SUCCESS,
                                  'BarChart',
                                  'Sales',
                                  '$ 1,345',
                                ),
                              ]),
                              Column({ options: smallColumnOptions }, [
                                statusPaper(
                                  ThemeColor.DANGER,
                                  'Bookmark',
                                  'Subscribers',
                                  '1303',
                                ),
                              ]),
                              Column({ options: smallColumnOptions }, [
                                statusPaper(
                                  ThemeColor.PRIMARY,
                                  'Check',
                                  'Orders',
                                  '576',
                                ),
                              ]),
                            ]),
                            Row({}, [
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
                                      },
                                    ),
                                    columnWidthTabletPortrait: option(
                                      'CUSTOM',
                                      {
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
                                  outlinedBox(
                                    BoxPrefab(
                                      {
                                        options: {
                                          ...boxOptions,
                                          innerSpacing: sizes('Inner space', {
                                            value: ['M', 'L', 'M', 'L'],
                                          }),
                                        },
                                      },
                                      [
                                        TextPrefab(
                                          {
                                            options: {
                                              ...textOptions,
                                              content: variable('Content', {
                                                value: ['Tasks'],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              }),
                                              type: font('Text style', {
                                                value: ['Title5'],
                                              }),
                                              textAlignment: option('CUSTOM', {
                                                label: 'Text Alignment',
                                                value: 'center',
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
                                              textColor: color('Text color', {
                                                value: ThemeColor.DARK,
                                                configuration: {
                                                  condition:
                                                    showIfTrue('styles'),
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
                                                value: ['Complete'],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              }),
                                              useInnerHtml: toggle(
                                                'Display Rich Text',
                                                {
                                                  value: false,
                                                },
                                              ),
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
                                              }),
                                              textColor: color('Text color', {
                                                value: ThemeColor.MEDIUM,
                                                configuration: {
                                                  condition:
                                                    showIfTrue('styles'),
                                                },
                                              }),
                                            },
                                          },
                                          [],
                                        ),
                                      ],
                                    ),
                                    BoxPrefab({}, [
                                      BoxPrefab(
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
                                                'M',
                                                '0rem',
                                              ],
                                            }),
                                          },
                                        },
                                        [
                                          circularProgress(
                                            ThemeColor.PRIMARY,
                                            '80',
                                          ),
                                        ],
                                      ),
                                      Row({}, [
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
                                              horizontalAlignment: option(
                                                'CUSTOM',
                                                {
                                                  label: 'Horizontal Alignment',
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
                                                        name: 'Left',
                                                        value: 'flex-start',
                                                      },
                                                      {
                                                        name: 'Center',
                                                        value: 'center',
                                                      },
                                                      {
                                                        name: 'Right',
                                                        value: 'flex-end',
                                                      },
                                                    ],
                                                  },
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            TextPrefab(
                                              {
                                                options: {
                                                  ...textOptions,
                                                  content: variable('Content', {
                                                    value: ['80%'],
                                                    configuration: {
                                                      as: 'MULTILINE',
                                                    },
                                                  }),
                                                  type: font('Text style', {
                                                    value: ['Title5'],
                                                  }),
                                                  outerSpacing: sizes(
                                                    'Outer space',
                                                    {
                                                      value: [
                                                        '0rem',
                                                        '0rem',
                                                        'M',
                                                        '0rem',
                                                      ],
                                                    },
                                                  ),
                                                  textColor: color(
                                                    'Text color',
                                                    {
                                                      value: ThemeColor.DARK,
                                                      configuration: {
                                                        condition:
                                                          showIfTrue('styles'),
                                                      },
                                                    },
                                                  ),
                                                },
                                              },
                                              [],
                                            ),
                                            BoxPrefab(
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
                                                      [
                                                        'Justified',
                                                        'space-between',
                                                      ],
                                                    ],
                                                    {
                                                      value: 'flex-start',
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
                                                },
                                              },
                                              [
                                                IconPrefab(
                                                  {
                                                    options: {
                                                      ...iconOptions,
                                                      icon: icon('Icon', {
                                                        value: 'Check',
                                                      }),
                                                      color: color('Color', {
                                                        value:
                                                          ThemeColor.SUCCESS,
                                                      }),
                                                      outerSpacing: sizes(
                                                        'Outer space',
                                                        {
                                                          value: [
                                                            'S',
                                                            'S',
                                                            'S',
                                                            '0rem',
                                                          ],
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
                                                          value: ['Completed'],
                                                          configuration: {
                                                            as: 'MULTILINE',
                                                          },
                                                        },
                                                      ),
                                                      useInnerHtml: toggle(
                                                        'Display Rich Text',
                                                        {
                                                          value: false,
                                                        },
                                                      ),
                                                      type: font('Text style', {
                                                        value: ['Body1'],
                                                      }),
                                                    },
                                                  },
                                                  [],
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ]),
                                    ]),
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
                                      },
                                    ),
                                    columnWidthTabletPortrait: option(
                                      'CUSTOM',
                                      {
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
                                  outlinedBox(
                                    BoxPrefab(
                                      {
                                        options: {
                                          ...boxOptions,
                                          innerSpacing: sizes('Inner space', {
                                            value: ['M', 'L', 'M', 'L'],
                                          }),
                                        },
                                      },
                                      [
                                        TextPrefab(
                                          {
                                            options: {
                                              ...textOptions,
                                              content: variable('Content', {
                                                value: ['Customer feedback'],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              }),
                                              useInnerHtml: toggle(
                                                'Display Rich Text',
                                                {
                                                  value: false,
                                                },
                                              ),
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
                                              textColor: color('Text color', {
                                                value: ThemeColor.MEDIUM,
                                                configuration: {
                                                  condition:
                                                    showIfTrue('styles'),
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
                                                value: ['385749'],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              }),
                                              type: font('Text style', {
                                                value: ['Title5'],
                                              }),
                                              textAlignment: option('CUSTOM', {
                                                label: 'Text Alignment',
                                                value: 'center',
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
                                              }),
                                              textColor: color('Text color', {
                                                value: ThemeColor.DARK,
                                                configuration: {
                                                  condition:
                                                    showIfTrue('styles'),
                                                },
                                              }),
                                            },
                                          },
                                          [],
                                        ),
                                      ],
                                    ),
                                    BoxPrefab({}, [
                                      BoxPrefab(
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
                                                'M',
                                                '0rem',
                                              ],
                                            }),
                                          },
                                        },
                                        [
                                          circularProgress(
                                            ThemeColor.SUCCESS,
                                            '92',
                                          ),
                                        ],
                                      ),
                                      Row({}, [
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
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
                                                  value: '6',
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
                                              horizontalAlignment: option(
                                                'CUSTOM',
                                                {
                                                  label: 'Horizontal Alignment',
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
                                                        name: 'Left',
                                                        value: 'flex-start',
                                                      },
                                                      {
                                                        name: 'Center',
                                                        value: 'center',
                                                      },
                                                      {
                                                        name: 'Right',
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
                                                    'M',
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            TextPrefab(
                                              {
                                                options: {
                                                  ...textOptions,
                                                  content: variable('Content', {
                                                    value: ['92%'],
                                                    configuration: {
                                                      as: 'MULTILINE',
                                                    },
                                                  }),
                                                  type: font('Text style', {
                                                    value: ['Title5'],
                                                  }),
                                                  outerSpacing: sizes(
                                                    'Outer space',
                                                    {
                                                      value: [
                                                        '0rem',
                                                        '0rem',
                                                        'M',
                                                        '0rem',
                                                      ],
                                                    },
                                                  ),
                                                  textColor: color(
                                                    'Text color',
                                                    {
                                                      value: ThemeColor.DARK,
                                                      configuration: {
                                                        condition:
                                                          showIfTrue('styles'),
                                                      },
                                                    },
                                                  ),
                                                },
                                              },
                                              [],
                                            ),
                                            BoxPrefab(
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
                                                      [
                                                        'Justified',
                                                        'space-between',
                                                      ],
                                                    ],
                                                    {
                                                      value: 'flex-start',
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
                                                },
                                              },
                                              [
                                                IconPrefab(
                                                  {
                                                    options: {
                                                      ...iconOptions,
                                                      icon: icon('Icon', {
                                                        value: 'ThumbUpAlt',
                                                      }),
                                                      color: color('Color', {
                                                        value:
                                                          ThemeColor.SUCCESS,
                                                      }),
                                                      outerSpacing: sizes(
                                                        'Outer space',
                                                        {
                                                          value: [
                                                            'S',
                                                            'S',
                                                            'S',
                                                            '0rem',
                                                          ],
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
                                                          value: ['Positive'],
                                                          configuration: {
                                                            as: 'MULTILINE',
                                                          },
                                                        },
                                                      ),
                                                      useInnerHtml: toggle(
                                                        'Display Rich Text',
                                                        {
                                                          value: false,
                                                        },
                                                      ),
                                                      type: font('Text style', {
                                                        value: ['Body1'],
                                                      }),
                                                      textColor: color(
                                                        'Text color',
                                                        {
                                                          value:
                                                            ThemeColor.SUCCESS,
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
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
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
                                                  value: '6',
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
                                              horizontalAlignment: option(
                                                'CUSTOM',
                                                {
                                                  label: 'Horizontal Alignment',
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
                                                        name: 'Left',
                                                        value: 'flex-start',
                                                      },
                                                      {
                                                        name: 'Center',
                                                        value: 'center',
                                                      },
                                                      {
                                                        name: 'Right',
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
                                                    'M',
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            TextPrefab(
                                              {
                                                options: {
                                                  ...textOptions,
                                                  content: variable('Content', {
                                                    value: ['8%'],
                                                    configuration: {
                                                      as: 'MULTILINE',
                                                    },
                                                  }),
                                                  type: font('Text style', {
                                                    value: ['Title5'],
                                                  }),
                                                  outerSpacing: sizes(
                                                    'Outer space',
                                                    {
                                                      value: [
                                                        '0rem',
                                                        '0rem',
                                                        'M',
                                                        '0rem',
                                                      ],
                                                    },
                                                  ),
                                                  textColor: color(
                                                    'Text color',
                                                    {
                                                      value: ThemeColor.DARK,
                                                      configuration: {
                                                        condition:
                                                          showIfTrue('styles'),
                                                      },
                                                    },
                                                  ),
                                                },
                                              },
                                              [],
                                            ),
                                            BoxPrefab(
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
                                                      [
                                                        'Justified',
                                                        'space-between',
                                                      ],
                                                    ],
                                                    {
                                                      value: 'flex-start',
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
                                                },
                                              },
                                              [
                                                IconPrefab(
                                                  {
                                                    options: {
                                                      ...iconOptions,
                                                      icon: icon('Icon', {
                                                        value: 'ThumbDownAlt',
                                                      }),
                                                      color: color('Color', {
                                                        value:
                                                          ThemeColor.DANGER,
                                                      }),
                                                      outerSpacing: sizes(
                                                        'Outer space',
                                                        {
                                                          value: [
                                                            'S',
                                                            'S',
                                                            'S',
                                                            '0rem',
                                                          ],
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
                                                          value: ['Negative'],
                                                          configuration: {
                                                            as: 'MULTILINE',
                                                          },
                                                        },
                                                      ),
                                                      useInnerHtml: toggle(
                                                        'Display Rich Text',
                                                        {
                                                          value: false,
                                                        },
                                                      ),
                                                      type: font('Text style', {
                                                        value: ['Body1'],
                                                      }),
                                                      textColor: color(
                                                        'Text color',
                                                        {
                                                          value:
                                                            ThemeColor.DANGER,
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
                                    ]),
                                  ),
                                ],
                              ),
                              Column(
                                {
                                  options: {
                                    ...columnOptions,
                                    columnWidth: option('CUSTOM', {
                                      label: 'Column width',
                                      value: '5',
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
                                        value: '5',
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
                                      },
                                    ),
                                    columnWidthTabletPortrait: option(
                                      'CUSTOM',
                                      {
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
                                  outlinedBox(
                                    BoxPrefab(
                                      {
                                        options: {
                                          ...boxOptions,
                                          innerSpacing: sizes('Inner space', {
                                            value: ['M', 'L', 'M', 'L'],
                                          }),
                                        },
                                      },
                                      [
                                        TextPrefab(
                                          {
                                            options: {
                                              ...textOptions,
                                              content: variable('Content', {
                                                value: ['Quote of the day'],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              }),
                                              type: font('Text style', {
                                                value: ['Title5'],
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
                                              textColor: color('Text color', {
                                                value: ThemeColor.DARK,
                                                configuration: {
                                                  condition:
                                                    showIfTrue('styles'),
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
                                                value: ['2021-03-10'],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
                                              }),
                                              useInnerHtml: toggle(
                                                'Display Rich Text',
                                                {
                                                  value: false,
                                                },
                                              ),
                                              type: font('Text style', {
                                                value: ['Body1'],
                                              }),
                                              textColor: color('Text color', {
                                                value: ThemeColor.MEDIUM,
                                                configuration: {
                                                  condition:
                                                    showIfTrue('styles'),
                                                },
                                              }),
                                            },
                                          },
                                          [],
                                        ),
                                      ],
                                    ),
                                    BoxPrefab(
                                      {
                                        options: {
                                          ...boxOptions,
                                          innerSpacing: sizes('Inner space', {
                                            value: ['S', 'S', 'S', 'S'],
                                          }),
                                        },
                                      },
                                      [
                                        BoxPrefab({}, [
                                          TextPrefab(
                                            {
                                              options: {
                                                ...textOptions,
                                                content: variable('Content', {
                                                  value: [
                                                    '“Remember, there is no code faster than no-code.”',
                                                  ],
                                                  configuration: {
                                                    as: 'MULTILINE',
                                                  },
                                                }),
                                                useInnerHtml: toggle(
                                                  'Display Rich Text',
                                                  {
                                                    value: false,
                                                  },
                                                ),
                                                type: font('Text style', {
                                                  value: ['Body1'],
                                                }),
                                              },
                                            },
                                            [],
                                          ),
                                        ]),
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
                                                    'L',
                                                    '0rem',
                                                    'L',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            BoxPrefab({}, [
                                              Avatar(
                                                {
                                                  options: {
                                                    ...avatarOptions,
                                                    imgUrl: variable(
                                                      'Image url',
                                                      {
                                                        value: [
                                                          'https://assets.bettyblocks.com/3ca5c23d0a054028b9b0d5b2607053b4_assets/files/user_default.jpg',
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
                                                    imgAlt: variable(
                                                      'Image alternative text',
                                                      {
                                                        value: ['Silhouette'],
                                                        configuration: {
                                                          condition: showIf(
                                                            'type',
                                                            'EQ',
                                                            'img',
                                                          ),
                                                        },
                                                      },
                                                    ),
                                                    width: size('Width', {
                                                      value: '50px',
                                                      configuration: {
                                                        as: 'UNIT',
                                                      },
                                                    }),
                                                    height: size('Height', {
                                                      value: '50px',
                                                      configuration: {
                                                        as: 'UNIT',
                                                      },
                                                    }),
                                                    margin: sizes(
                                                      'Outer Space',
                                                      {
                                                        value: [
                                                          'M',
                                                          'M',
                                                          'L',
                                                          'M',
                                                        ],
                                                      },
                                                    ),
                                                  },
                                                },
                                                [],
                                              ),
                                            ]),
                                            BoxPrefab(
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
                                                    options: {
                                                      ...textOptions,
                                                      content: variable(
                                                        'Content',
                                                        {
                                                          value: ['John Doe'],
                                                          configuration: {
                                                            as: 'MULTILINE',
                                                          },
                                                        },
                                                      ),
                                                      type: font('Text style', {
                                                        value: ['Title6'],
                                                      }),
                                                      textColor: color(
                                                        'Text color',
                                                        {
                                                          value:
                                                            ThemeColor.DARK,
                                                          configuration: {
                                                            condition:
                                                              showIfTrue(
                                                                'styles',
                                                              ),
                                                          },
                                                        },
                                                      ),
                                                      fontWeight: option(
                                                        'CUSTOM',
                                                        {
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
                                                            condition:
                                                              showIfTrue(
                                                                'styles',
                                                              ),
                                                          },
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
                                                            'No-code developer',
                                                          ],
                                                          configuration: {
                                                            as: 'MULTILINE',
                                                          },
                                                        },
                                                      ),
                                                      useInnerHtml: toggle(
                                                        'Display Rich Text',
                                                        {
                                                          value: false,
                                                        },
                                                      ),
                                                      type: font('Text style', {
                                                        value: ['Body1'],
                                                      }),
                                                      textColor: color(
                                                        'Text color',
                                                        {
                                                          value:
                                                            ThemeColor.MEDIUM,
                                                          configuration: {
                                                            condition:
                                                              showIfTrue(
                                                                'styles',
                                                              ),
                                                          },
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
                                  ),
                                ],
                              ),
                            ]),
                            Row({}, [
                              Column({}, [
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
                                      innerSpacing: sizes('Inner space', {
                                        value: ['M', 'M', 'M', 'M'],
                                      }),
                                      backgroundColor: color(
                                        'Background color',
                                        {
                                          value: ThemeColor.WHITE,
                                        },
                                      ),
                                      borderColor: color('Border color', {
                                        value: ThemeColor.ACCENT_1,
                                      }),
                                      borderWidth: size('Border thickness', {
                                        value: '1px',
                                        configuration: {
                                          as: 'UNIT',
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
                                            columnWidthMobile: option(
                                              'CUSTOM',
                                              {
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
                                              },
                                            ),
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
                                            innerSpacing: sizes('Inner space', {
                                              value: ['XL', 'XL', 'XL', 'XL'],
                                            }),
                                          },
                                        },
                                        [
                                          TextPrefab(
                                            {
                                              options: {
                                                ...textOptions,
                                                content: variable('Content', {
                                                  value: ['My balance'],
                                                  configuration: {
                                                    as: 'MULTILINE',
                                                  },
                                                }),
                                                useInnerHtml: toggle(
                                                  'Display Rich Text',
                                                  {
                                                    value: false,
                                                  },
                                                ),
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
                                          TextPrefab(
                                            {
                                              options: {
                                                ...textOptions,
                                                content: variable('Content', {
                                                  value: ['$ 3,018'],
                                                  configuration: {
                                                    as: 'MULTILINE',
                                                  },
                                                }),
                                                type: font('Text style', {
                                                  value: ['Title4'],
                                                }),
                                                outerSpacing: sizes(
                                                  'Outer space',
                                                  {
                                                    value: [
                                                      'S',
                                                      '0rem',
                                                      'M',
                                                      '0rem',
                                                    ],
                                                  },
                                                ),
                                                textColor: color('Text color', {
                                                  value: ThemeColor.DARK,
                                                }),
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
                                                    condition:
                                                      showIfTrue('styles'),
                                                  },
                                                }),
                                              },
                                            },
                                            [],
                                          ),
                                          ButtonPrefab(
                                            {
                                              options: {
                                                ...buttonOptions,
                                                buttonText: variable(
                                                  'Button text',
                                                  {
                                                    value: ['Add Balance'],
                                                  },
                                                ),
                                                fullWidth: toggle(
                                                  'Full width',
                                                  {
                                                    value: true,
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
                                          Divider(
                                            {
                                              options: {
                                                ...dividerOptions,
                                                color: color('Color', {
                                                  value: ThemeColor.ACCENT_1,
                                                }),
                                                outerSpacing: sizes(
                                                  'Outer space',
                                                  {
                                                    value: [
                                                      'L',
                                                      '0rem',
                                                      'L',
                                                      '0rem',
                                                    ],
                                                  },
                                                ),
                                              },
                                            },
                                            [],
                                          ),
                                          BoxPrefab(
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
                                                    [
                                                      'Justified',
                                                      'space-between',
                                                    ],
                                                  ],
                                                  {
                                                    value: 'space-between',
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
                                              BoxPrefab(
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
                                                        [
                                                          'Justified',
                                                          'space-between',
                                                        ],
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
                                                              {
                                                                name: 'Image',
                                                                value: 'img',
                                                              },
                                                              {
                                                                name: 'Letter',
                                                                value: 'letter',
                                                              },
                                                              {
                                                                name: 'Icon',
                                                                value: 'icon',
                                                              },
                                                            ],
                                                          },
                                                        }),
                                                        icon: icon('Icon', {
                                                          value: 'History',
                                                          configuration: {
                                                            condition: showIf(
                                                              'type',
                                                              'EQ',
                                                              'icon',
                                                            ),
                                                          },
                                                        }),
                                                        backgroundColor: color(
                                                          'Background color',
                                                          {
                                                            value:
                                                              ThemeColor.TRANSPARENT,
                                                            configuration: {
                                                              condition: {
                                                                type: 'HIDE',
                                                                option: 'type',
                                                                comparator:
                                                                  'EQ',
                                                                value: 'img',
                                                              },
                                                            },
                                                          },
                                                        ),
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
                                                        textColor: color(
                                                          'Text color',
                                                          {
                                                            value:
                                                              ThemeColor.ACCENT_1,
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
                                                            value: ['History'],
                                                            configuration: {
                                                              as: 'MULTILINE',
                                                            },
                                                          },
                                                        ),
                                                        useInnerHtml: toggle(
                                                          'Display Rich Text',
                                                          {
                                                            value: false,
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
                                                              ThemeColor.ACCENT_1,
                                                          },
                                                        ),
                                                        fontWeight: option(
                                                          'CUSTOM',
                                                          {
                                                            label:
                                                              'Font weight',
                                                            value: '500',
                                                            configuration: {
                                                              as: 'DROPDOWN',
                                                              dataType:
                                                                'string',
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
                                                          },
                                                        ),
                                                      },
                                                    },
                                                    [],
                                                  ),
                                                ],
                                              ),
                                              BoxPrefab(
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
                                                        [
                                                          'Justified',
                                                          'space-between',
                                                        ],
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
                                                              {
                                                                name: 'Image',
                                                                value: 'img',
                                                              },
                                                              {
                                                                name: 'Letter',
                                                                value: 'letter',
                                                              },
                                                              {
                                                                name: 'Icon',
                                                                value: 'icon',
                                                              },
                                                            ],
                                                          },
                                                        }),
                                                        icon: icon('Icon', {
                                                          value: 'Refresh',
                                                          configuration: {
                                                            condition: showIf(
                                                              'type',
                                                              'EQ',
                                                              'icon',
                                                            ),
                                                          },
                                                        }),
                                                        backgroundColor: color(
                                                          'Background color',
                                                          {
                                                            value:
                                                              ThemeColor.TRANSPARENT,
                                                            configuration: {
                                                              condition: {
                                                                type: 'HIDE',
                                                                option: 'type',
                                                                comparator:
                                                                  'EQ',
                                                                value: 'img',
                                                              },
                                                            },
                                                          },
                                                        ),
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
                                                        textColor: color(
                                                          'Text color',
                                                          {
                                                            value:
                                                              ThemeColor.ACCENT_1,
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
                                                            value: ['Refresh'],
                                                            configuration: {
                                                              as: 'MULTILINE',
                                                            },
                                                          },
                                                        ),
                                                        useInnerHtml: toggle(
                                                          'Display Rich Text',
                                                          {
                                                            value: false,
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
                                                              ThemeColor.ACCENT_1,
                                                          },
                                                        ),
                                                        fontWeight: option(
                                                          'CUSTOM',
                                                          {
                                                            label:
                                                              'Font weight',
                                                            value: '500',
                                                            configuration: {
                                                              as: 'DROPDOWN',
                                                              dataType:
                                                                'string',
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
                                            columnWidthMobile: option(
                                              'CUSTOM',
                                              {
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
                                              },
                                            ),
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
                                            innerSpacing: sizes('Inner space', {
                                              value: ['XL', 'XL', 'XL', 'XL'],
                                            }),
                                          },
                                        },
                                        [
                                          linearProgressBox(
                                            '$3K',
                                            'Profit',
                                            ThemeColor.SUCCESS,
                                            '80',
                                          ),
                                          linearProgressBox(
                                            'Orders',
                                            '576',
                                            ThemeColor.INFO,
                                            '60',
                                          ),
                                          linearProgressBox(
                                            'Task complete',
                                            '70%',
                                            ThemeColor.PRIMARY,
                                            '70',
                                          ),
                                          linearProgressBox(
                                            'Open rate',
                                            '60%',
                                            ThemeColor.WARNING,
                                            '60',
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
                                            columnWidthMobile: option(
                                              'CUSTOM',
                                              {
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
                                              },
                                            ),
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
                                            innerSpacing: sizes('Inner space', {
                                              value: ['XL', 'XL', 'XL', 'XL'],
                                            }),
                                          },
                                        },
                                        [
                                          TextPrefab(
                                            {
                                              options: {
                                                ...textOptions,
                                                content: variable('Content', {
                                                  value: ['Statistics'],
                                                  configuration: {
                                                    as: 'MULTILINE',
                                                  },
                                                }),
                                                useInnerHtml: toggle(
                                                  'Display Rich Text',
                                                  {
                                                    value: false,
                                                  },
                                                ),
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
                                          statisticsBox(
                                            'Number',
                                            '150GB',
                                            'PieChart',
                                            ThemeColor.WARNING,
                                          ),
                                          Divider(
                                            {
                                              options: {
                                                ...dividerOptions,
                                                color: color('Color', {
                                                  value: ThemeColor.ACCENT_1,
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
                                              },
                                            },
                                            [],
                                          ),
                                          statisticsBox(
                                            'Followers',
                                            '+45K',
                                            'FavoriteBorder',
                                            ThemeColor.PRIMARY,
                                          ),
                                        ],
                                      ),
                                    ]),
                                  ],
                                ),
                              ]),
                            ]),
                          ],
                        ),
                      ]),
                    ],
                  ),
                  BoxPrefab(
                    {
                      ref: { id: '#footer' },
                      options: {
                        ...boxOptions,
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
                      BoxPrefab(
                        {
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
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
                                useInnerHtml: toggle('Display Rich Text', {
                                  value: false,
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
