import {
  Icon,
  ThemeColor,
  addChild,
  color,
  endpoint,
  font,
  icon,
  linked,
  option,
  prefab,
  reconfigure,
  showIf,
  size,
  sizes,
  toggle,
  variable,
  wrapper,
} from '@betty-blocks/component-sdk';
import {
  Box,
  boxOptions,
  mediaOptions,
  listOptions,
  listItemOptions,
  Media,
  List,
  ListItem,
} from '../structures';

const attrs = {
  icon: Icon.ContainerIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'side menu'],
  description: 'This is the side menu partial.',
};

const children = [
  ListItem({
    options: {
      ...listItemOptions,
      primaryText: variable('Menu item name', {
        value: ['New menu item'],
        showInAddChild: true,
        showInReconfigure: true,
        configuration: {
          showOnDrop: true,
        },
      }),
      avatarOrIcon: option('CUSTOM', {
        label: 'Visual',
        value: 'icon',
        configuration: {
          as: 'BUTTONGROUP',
          dataType: 'string',
          allowedInput: [
            { name: 'None', value: 'none' },
            { name: 'Icon', value: 'icon' },
            { name: 'Avatar', value: 'avatar' },
          ],
        },
      }),
      icon: icon('Icon', {
        value: 'Apartment',
        showInAddChild: true,
        configuration: {
          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
        },
      }),
      iconColor: color('Icon color', {
        value: ThemeColor.WHITE,
        configuration: {
          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
        },
      }),
      linkTo: endpoint('Page', {
        ...listItemOptions.linkTo('linkTo'),
        showInAddChild: true,
        showInReconfigure: true,
        value: '',
      }),
      selected: toggle('Selected', { value: false }),
      titleColor: color('Title color', {
        value: ThemeColor.WHITE,
      }),
      subtitleFont: font('Subtitle text style', {
        value: 'Body2',
      }),
    },
  }),
];

// eslint-disable-next-line import/no-default-export
export default prefab('Side Menu', attrs, undefined, [
  wrapper(
    {
      label: 'Side Menu',
      options: {
        reconfigure: linked({
          label: 'Reconfigure menu',
          value: {
            ref: {
              componentId: '#list',
              optionId: '#reconfigure',
            },
          },
        }),
        addChild: linked({
          label: 'Add menu Item',
          value: {
            ref: {
              componentId: '#list',
              optionId: '#addChild',
            },
          },
        }),
        type: linked({
          label: 'Type',
          value: {
            ref: {
              componentId: '#media',
              optionId: '#mediaType',
            },
          },
        }),
        urlFileSource: linked({
          label: 'Source',
          value: {
            ref: {
              componentId: '#media',
              optionId: '#urlFileSource',
            },
          },
          configuration: {
            condition: showIf('type', 'EQ', 'url'),
          },
        }),
        imageFileSource: linked({
          label: 'Select image',
          value: {
            ref: {
              componentId: '#media',
              optionId: '#imageFileSource',
            },
          },
          configuration: {
            condition: showIf('type', 'EQ', 'img'),
          },
        }),
        videoFileSource: linked({
          label: 'Select video',
          value: {
            ref: {
              componentId: '#media',
              optionId: '#videoFileSource',
            },
          },
          configuration: {
            condition: showIf('type', 'EQ', 'video'),
          },
        }),
        iframeSource: linked({
          label: 'Source',
          value: {
            ref: {
              componentId: '#media',
              optionId: '#iframeSource',
            },
          },
          configuration: {
            condition: showIf('type', 'EQ', 'iframe'),
          },
        }),
      },
    },
    [
      Box(
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
              value: ThemeColor.PRIMARY,
            }),
            height: size('Height', {
              ...boxOptions.height('height'),
              value: '100%',
            }),
          },
        },
        [
          Box(
            {
              options: {
                ...boxOptions,
                innerSpacing: sizes('Inner space', {
                  value: ['L', 'L', '0rem', 'L'],
                }),
              },
            },
            [
              Media({
                ref: {
                  id: '#media',
                },
                options: {
                  ...mediaOptions,
                  type: option('CUSTOM', {
                    ...mediaOptions.type('type'),
                    ref: {
                      id: '#mediaType',
                    },
                    value: 'url',
                  }),
                  urlFileSource: variable('Source', {
                    ...mediaOptions.urlFileSource('urlFileSource'),
                    ref: {
                      id: '#urlFileSource',
                    },
                    value: [
                      'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                    ],
                  }),
                  imageFileSource: option('PUBLIC_FILE', {
                    ...mediaOptions.imageFileSource('imageFileSource'),
                    ref: {
                      id: '#imageFileSource',
                    },
                    value: '',
                  }),
                  videoFileSource: option('PUBLIC_FILE', {
                    ...mediaOptions.videoFileSource('videoFileSource'),
                    ref: {
                      id: '#videoFileSource',
                    },
                    value: '',
                  }),
                  iframeSource: variable('Source', {
                    ...mediaOptions.iframeSource('iframeSource'),
                    ref: {
                      id: '#iframeSource',
                    },
                    value: [],
                  }),
                },
              }),
            ],
          ),
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
              List(
                {
                  ref: {
                    id: '#list',
                  },
                  options: {
                    ...listOptions,
                    disablePadding: toggle('Disable padding', { value: true }),
                    reconfigure: reconfigure('Reconfigure menu', {
                      value: {
                        children,
                        reconfigureWizardType: 'ChildrenSelector',
                      },
                      ref: {
                        id: '#reconfigure',
                      },
                    }),
                    addChild: addChild('Add Menu Item', {
                      value: { children, addChildWizardType: 'ChildSelector' },
                      ref: {
                        id: '#addChild',
                      },
                    }),
                  },
                },
                [
                  ListItem({
                    options: {
                      ...listItemOptions,
                      primaryText: variable('Primary text', {
                        value: ['First list item'],
                        configuration: {
                          showOnDrop: true,
                        },
                      }),
                      avatarOrIcon: option('CUSTOM', {
                        label: 'Visual',
                        value: 'icon',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Icon', value: 'icon' },
                            { name: 'Avatar', value: 'avatar' },
                          ],
                        },
                      }),
                      icon: icon('Icon', {
                        value: 'Apartment',
                        configuration: {
                          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
                        },
                      }),
                      iconColor: color('Icon color', {
                        value: ThemeColor.WHITE,
                        configuration: {
                          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
                        },
                      }),
                      selected: toggle('Selected', { value: true }),
                      titleColor: color('Title color', {
                        value: ThemeColor.WHITE,
                      }),
                      subtitleFont: font('Subtitle text style', {
                        value: 'Body2',
                      }),
                    },
                  }),
                  ListItem({
                    options: {
                      ...listItemOptions,
                      primaryText: variable('Primary text', {
                        value: ['Second list item'],
                        showInReconfigure: true,
                        configuration: {
                          showOnDrop: true,
                        },
                      }),
                      avatarOrIcon: option('CUSTOM', {
                        label: 'Visual',
                        value: 'icon',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Icon', value: 'icon' },
                            { name: 'Avatar', value: 'avatar' },
                          ],
                        },
                      }),
                      icon: icon('Icon', {
                        value: 'Person',
                        configuration: {
                          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
                        },
                      }),
                      iconColor: color('Icon color', {
                        value: ThemeColor.WHITE,
                        configuration: {
                          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
                        },
                      }),
                      linkTo: endpoint('Page', {
                        ...listItemOptions.linkTo('linkTo'),
                        value: '',
                        showInReconfigure: true,
                      }),
                      selected: toggle('Selected', { value: false }),
                      titleColor: color('Title color', {
                        value: ThemeColor.WHITE,
                      }),
                      subtitleFont: font('Subtitle text style', {
                        value: 'Body2',
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
]);
