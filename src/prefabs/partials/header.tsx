import {
  Icon,
  ThemeColor,
  color,
  font,
  option,
  prefab,
  showIf,
  sizes,
  variable,
} from '@betty-blocks/component-sdk';
import {
  Box,
  Row,
  Column,
  AppBar,
  OpenPageButton,
  rowOptions,
  boxOptions,
  columnOptions,
  appBarOptions,
  openPageButtonOptions,
} from '../structures';

const attrs = {
  icon: Icon.ContainerIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'header', 'top menu'],
  description: 'This is a top menu partial.',
};

// eslint-disable-next-line import/no-default-export
export default prefab('Top menu', attrs, undefined, [
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
                      value: ['0rem', '0rem', '0rem', '0rem'],
                    }),
                    backgroundColor: color('Background color', {
                      value: ThemeColor.PRIMARY,
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
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                        },
                      },
                      [
                        AppBar(
                          {
                            options: {
                              ...appBarOptions,
                              font: font('Title text style', {
                                value: 'Body1',
                              }),
                              title: variable('Title', { value: [''] }),
                              urlFileSource: variable('Source', {
                                value: [
                                  'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                                ],
                                configuration: {
                                  placeholder:
                                    'Starts with https:// or http://',
                                  as: 'MULTILINE',
                                  condition: showIf('type', 'EQ', 'url'),
                                },
                              }),
                            },
                          },
                          [
                            OpenPageButton({
                              options: {
                                ...openPageButtonOptions,
                                buttonText: variable('Button text', {
                                  value: ['Menu 1'],
                                }),
                                outerSpacing: sizes('Outer space', {
                                  value: ['0rem', 'M', '0rem', 'M'],
                                }),
                              },
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
                            }),
                            OpenPageButton({
                              options: {
                                ...openPageButtonOptions,
                                buttonText: variable('Button text', {
                                  value: ['Menu 2'],
                                }),
                                outerSpacing: sizes('Outer space', {
                                  value: ['0rem', '0rem', '0rem', 'M'],
                                }),
                              },
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
                            }),
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
    ],
  ),
]);
