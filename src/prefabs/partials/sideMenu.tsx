import {
  Icon,
  ThemeColor,
  addChild,
  color,
  font,
  icon,
  option,
  prefab,
  showIf,
  sizes,
  toggle,
  variable,
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

const outerBoxOptions = { ...boxOptions };
outerBoxOptions.stretch = toggle('Stretch (when in flex container)', {
  value: true,
});
outerBoxOptions.innerSpacing = sizes('Inner space', {
  value: ['0rem', '0rem', '0rem', '0rem'],
});
outerBoxOptions.backgroundColor = color('Background color', {
  value: ThemeColor.PRIMARY,
});

const logoBoxOptions = { ...boxOptions };
logoBoxOptions.innerSpacing = sizes('Inner space', {
  value: ['L', 'L', '0rem', 'L'],
});

const logoOptions = { ...mediaOptions };
logoOptions.type = option('CUSTOM', {
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
});
logoOptions.urlFileSource = variable('Source', {
  value: [
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
  ],
  configuration: {
    placeholder: 'Starts with https:// or http://',
    as: 'MULTILINE',
    condition: showIf('type', 'EQ', 'url'),
  },
});

const linkListBoxOptions = { ...boxOptions };
linkListBoxOptions.innerSpacing = sizes('Inner space', {
  value: ['0rem', '0rem', '0rem', '0rem'],
});

const firstLinkItemOptions = { ...listItemOptions };
firstLinkItemOptions.primaryText = variable('Primary text', {
  value: ['First list item'],
  configuration: {
    showOnDrop: true,
  },
});
firstLinkItemOptions.avatarOrIcon = option('CUSTOM', {
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
});
firstLinkItemOptions.icon = icon('Icon', {
  value: 'Apartment',
  configuration: {
    condition: showIf('avatarOrIcon', 'EQ', 'icon'),
  },
});
firstLinkItemOptions.iconColor = color('Icon color', {
  value: ThemeColor.WHITE,
  configuration: {
    condition: showIf('avatarOrIcon', 'EQ', 'icon'),
  },
});
firstLinkItemOptions.selected = toggle('Selected', { value: true });
firstLinkItemOptions.titleColor = color('Title color', {
  value: ThemeColor.WHITE,
});
firstLinkItemOptions.subtitleFont = font('Subtitle text style', {
  value: 'Body2',
});

const secondLinkItemOptions = { ...listItemOptions };
secondLinkItemOptions.primaryText = variable('Primary text', {
  value: ['Second list item'],
  configuration: {
    showOnDrop: true,
  },
});
secondLinkItemOptions.avatarOrIcon = option('CUSTOM', {
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
});
secondLinkItemOptions.icon = icon('Icon', {
  value: 'Person',
  configuration: {
    condition: showIf('avatarOrIcon', 'EQ', 'icon'),
  },
});
secondLinkItemOptions.iconColor = color('Icon color', {
  value: ThemeColor.WHITE,
  configuration: {
    condition: showIf('avatarOrIcon', 'EQ', 'icon'),
  },
});
secondLinkItemOptions.selected = toggle('Selected', { value: false });
secondLinkItemOptions.titleColor = color('Title color', {
  value: ThemeColor.WHITE,
});
secondLinkItemOptions.subtitleFont = font('Subtitle text style', {
  value: 'Body2',
});

const children = [
  ListItem({
    options: {
      ...listItemOptions,
      primaryText: variable('Menu item name', {
        value: ['New menu item'],
        showInAddChild: true,
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

const linkListOptions = { ...listOptions };
linkListOptions.disablePadding = toggle('Disable padding', { value: true });
linkListOptions.addChild = addChild('Add Menu Item', {
  value: { children, addChildWizardType: 'ChildSelector' },
  ref: {
    id: '#addChild',
  },
});

export default prefab('Side Menu', attrs, undefined, [
  Box({ options: outerBoxOptions }, [
    Box({ options: logoBoxOptions }, [Media({ options: logoOptions })]),
    Box({ options: linkListBoxOptions }, [
      List({ options: linkListOptions }, [
        ListItem({ options: firstLinkItemOptions }),
        ListItem({ options: secondLinkItemOptions }),
      ]),
    ]),
  ]),
]);
