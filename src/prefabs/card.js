(() => ({
  name: 'Card',
  icon: 'CardIcon',
  category: 'CARDS',
  structure: [
    {
      name: 'Card',
      options: [
        {
          label: 'Square',
          key: 'square',
          value: false,
          type: 'TOGGLE',
        },
        {
          label: 'Variant',
          key: 'variant',
          value: 'elevation',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Elevation', value: 'elevation' },
              { name: 'Outlined', value: 'outlined' },
            ],
          },
        },
        {
          label: 'Elevation',
          key: 'elevation',
          value: '1',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
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
              { name: '13', value: '13' },
              { name: '14', value: '14' },
              { name: '15', value: '15' },
              { name: '16', value: '16' },
              { name: '17', value: '17' },
              { name: '18', value: '18' },
              { name: '19', value: '19' },
              { name: '20', value: '20' },
              { name: '21', value: '21' },
              { name: '22', value: '22' },
              { name: '23', value: '23' },
              { name: '24', value: '24' },
            ],
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'elevation',
            },
          },
        },
      ],
      descendants: [
        {
          name: 'CardHeader',
          options: [
            {
              value: [],
              label: 'Avatar',
              key: 'avatar',
              type: 'VARIABLE',
            },
            {
              label: 'Avatar type',
              key: 'avatarType',
              value: 'text',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Text', value: 'text' },
                  { name: 'Image', value: 'image' },
                ],
                condition: {
                  type: 'HIDE',
                  option: 'avatar',
                  comparator: 'EQ',
                  value: '',
                },
              },
            },
            {
              value: ['Title'],
              label: 'Title',
              key: 'title',
              type: 'VARIABLE',
            },
            {
              value: [],
              label: 'Sub header',
              key: 'subheader',
              type: 'VARIABLE',
            },
          ],
          descendants: [],
        },
        {
          name: 'CardMedia',
          options: [
            {
              label: 'Media type',
              key: 'type',
              value: 'img',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Image', value: 'img' },
                  { name: 'Video', value: 'video' },
                  { name: 'I-frame', value: 'iframe' },
                ],
              },
            },
            {
              value: [
                'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
              ],
              label: 'Source',
              key: 'imageSource',
              type: 'VARIABLE',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'type',
                  comparator: 'EQ',
                  value: 'img',
                },
              },
            },
            {
              value: [],
              label: 'Source',
              key: 'videoSource',
              type: 'VARIABLE',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'type',
                  comparator: 'EQ',
                  value: 'video',
                },
              },
            },
            {
              value: [],
              label: 'Source',
              key: 'iframeSource',
              type: 'VARIABLE',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'type',
                  comparator: 'EQ',
                  value: 'iframe',
                },
              },
            },
            {
              value: [],
              label: 'Title',
              key: 'title',
              type: 'VARIABLE',
            },
          ],
          descendants: [],
        },
        {
          name: 'CardContent',
          options: [],
          descendants: [
            {
              name: 'Text',
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Content',
                  key: 'content',
                  value: [],
                  configuration: {
                    as: 'MULTILINE',
                  },
                },
                {
                  value: 'Title5',
                  label: 'Type',
                  key: 'type',
                  type: 'FONT',
                },
                {
                  type: 'CUSTOM',
                  label: 'Text Alignment',
                  key: 'textAlignment',
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
                  value: ['0rem', '0rem', '0rem', '0rem'],
                  label: 'Outer space',
                  key: 'outerSpacing',
                  type: 'SIZES',
                },
              ],
              descendants: [],
            },
            {
              name: 'Text',
              options: [
                {
                  type: 'VARIABLE',
                  label: 'Content',
                  key: 'content',
                  value: [],
                  configuration: {
                    as: 'MULTILINE',
                  },
                },
                {
                  value: 'Body2',
                  label: 'Type',
                  key: 'type',
                  type: 'FONT',
                },
                {
                  type: 'CUSTOM',
                  label: 'Text Alignment',
                  key: 'textAlignment',
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
                  value: ['0rem', '0rem', '0rem', '0rem'],
                  label: 'Outer space',
                  key: 'outerSpacing',
                  type: 'SIZES',
                },
              ],
              descendants: [],
            },
          ],
        },
        {
          name: 'CardActions',
          options: [
            {
              type: 'CUSTOM',
              label: 'Alignment',
              key: 'alignment',
              value: 'flex-start',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  {
                    name: 'Start',
                    value: 'flex-start',
                  },
                  {
                    name: 'Center',
                    value: 'center',
                  },
                  {
                    name: 'End',
                    value: 'flex-end',
                  },
                ],
              },
            },
            {
              type: 'TOGGLE',
              label: 'Disable spacing',
              key: 'disableSpacing',
              value: false,
            },
          ],
          descendants: [
            {
              name: 'Button',
              options: [
                {
                  label: 'Toggle visibility',
                  key: 'visible',
                  value: true,
                  type: 'TOGGLE',
                  configuration: {
                    as: 'VISIBILITY',
                  },
                },
                {
                  type: 'CUSTOM',
                  label: 'variant',
                  key: 'variant',
                  value: 'text',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Text', value: 'text' },
                      { name: 'Outlined', value: 'outlined' },
                      { name: 'Contain', value: 'contained' },
                      { name: 'Icon', value: 'icon' },
                    ],
                  },
                },
                {
                  type: 'VARIABLE',
                  label: 'Button text',
                  key: 'buttonText',
                  value: ['Button'],
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'variant',
                      comparator: 'EQ',
                      value: 'icon',
                    },
                  },
                },
                {
                  type: 'CUSTOM',
                  label: 'Link to',
                  key: 'linkType',
                  value: 'internal',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Internal page', value: 'internal' },
                      { name: 'External page', value: 'external' },
                      { name: 'Action', value: 'action' },
                    ],
                  },
                },
                {
                  value: '',
                  label: 'Page',
                  key: 'linkTo',
                  type: 'ENDPOINT',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'linkType',
                      comparator: 'EQ',
                      value: 'internal',
                    },
                  },
                },
                {
                  value: [''],
                  label: 'URL',
                  key: 'linkToExternal',
                  type: 'VARIABLE',
                  configuration: {
                    placeholder: 'Starts with https:// or http://',
                    condition: {
                      type: 'SHOW',
                      option: 'linkType',
                      comparator: 'EQ',
                      value: 'external',
                    },
                  },
                },
                {
                  value: '',
                  label: 'Action',
                  key: 'actionId',
                  type: 'ACTION',
                  configuration: {
                    apiVersion: 'v1',
                    condition: {
                      type: 'SHOW',
                      option: 'linkType',
                      comparator: 'EQ',
                      value: 'action',
                    },
                  },
                },
                {
                  value: false,
                  label: 'Full width',
                  key: 'fullWidth',
                  type: 'TOGGLE',
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'variant',
                      comparator: 'EQ',
                      value: 'icon',
                    },
                  },
                },
                {
                  value: 'medium',
                  label: 'Size',
                  key: 'size',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Large', value: 'large' },
                      { name: 'Medium', value: 'medium' },
                      { name: 'Small', value: 'small' },
                    ],
                  },
                },
                {
                  label: 'Icon',
                  key: 'icon',
                  value: 'None',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'None',
                        value: 'None',
                      },
                      {
                        name: 'AcUnit',
                        value: 'AcUnit',
                      },
                      {
                        name: 'AccessTime',
                        value: 'AccessTime',
                      },
                      {
                        name: 'AccessibilityNew',
                        value: 'AccessibilityNew',
                      },
                      {
                        name: 'Accessible',
                        value: 'Accessible',
                      },
                      {
                        name: 'AccountBalance',
                        value: 'AccountBalance',
                      },
                      {
                        name: 'AccountBalanceWallet',
                        value: 'AccountBalanceWallet',
                      },
                      {
                        name: 'AccountCircle',
                        value: 'AccountCircle',
                      },
                      {
                        name: 'AccountTree',
                        value: 'AccountTree',
                      },
                      {
                        name: 'Add',
                        value: 'Add',
                      },
                      {
                        name: 'AddAPhoto',
                        value: 'AddAPhoto',
                      },
                      {
                        name: 'AddBox',
                        value: 'AddBox',
                      },
                      {
                        name: 'AddCircle',
                        value: 'AddCircle',
                      },
                      {
                        name: 'AddCircleOutline',
                        value: 'AddCircleOutline',
                      },
                      {
                        name: 'AddComment',
                        value: 'AddComment',
                      },
                      {
                        name: 'Adjust',
                        value: 'Adjust',
                      },
                      {
                        name: 'AirplanemodeActive',
                        value: 'AirplanemodeActive',
                      },
                      {
                        name: 'AirplanemodeInactive',
                        value: 'AirplanemodeInactive',
                      },
                      {
                        name: 'Airplay',
                        value: 'Airplay',
                      },
                      {
                        name: 'AirportShuttle',
                        value: 'AirportShuttle',
                      },
                      {
                        name: 'Alarm',
                        value: 'Alarm',
                      },
                      {
                        name: 'Album',
                        value: 'Album',
                      },
                      {
                        name: 'AllInbox',
                        value: 'AllInbox',
                      },
                      {
                        name: 'AllInclusive',
                        value: 'AllInclusive',
                      },
                      {
                        name: 'AlternateEmail',
                        value: 'AlternateEmail',
                      },
                      {
                        name: 'Announcement',
                        value: 'Announcement',
                      },
                      {
                        name: 'Apartment',
                        value: 'Apartment',
                      },
                      {
                        name: 'Apps',
                        value: 'Apps',
                      },
                      {
                        name: 'Archive',
                        value: 'Archive',
                      },
                      {
                        name: 'ArrowBack',
                        value: 'ArrowBack',
                      },
                      {
                        name: 'ArrowBackIos',
                        value: 'ArrowBackIos',
                      },
                      {
                        name: 'ArrowDownward',
                        value: 'ArrowDownward',
                      },
                      {
                        name: 'ArrowDropDown',
                        value: 'ArrowDropDown',
                      },
                      {
                        name: 'ArrowDropDownCircle',
                        value: 'ArrowDropDownCircle',
                      },
                      {
                        name: 'ArrowDropUp',
                        value: 'ArrowDropUp',
                      },
                      {
                        name: 'ArrowForward',
                        value: 'ArrowForward',
                      },
                      {
                        name: 'ArrowForwardIos',
                        value: 'ArrowForwardIos',
                      },
                      {
                        name: 'ArrowLeft',
                        value: 'ArrowLeft',
                      },
                      {
                        name: 'ArrowRight',
                        value: 'ArrowRight',
                      },
                      {
                        name: 'ArrowRightAlt',
                        value: 'ArrowRightAlt',
                      },
                      {
                        name: 'ArrowUpward',
                        value: 'ArrowUpward',
                      },
                      {
                        name: 'Assessment',
                        value: 'Assessment',
                      },
                      {
                        name: 'Assignment',
                        value: 'Assignment',
                      },
                      {
                        name: 'AssignmentInd',
                        value: 'AssignmentInd',
                      },
                      {
                        name: 'AssignmentLate',
                        value: 'AssignmentLate',
                      },
                      {
                        name: 'AssignmentReturn',
                        value: 'AssignmentReturn',
                      },
                      {
                        name: 'AssignmentReturned',
                        value: 'AssignmentReturned',
                      },
                      {
                        name: 'AssignmentTurnedIn',
                        value: 'AssignmentTurnedIn',
                      },
                      {
                        name: 'Assistant',
                        value: 'Assistant',
                      },
                      {
                        name: 'AssistantPhoto',
                        value: 'AssistantPhoto',
                      },
                      {
                        name: 'AttachFile',
                        value: 'AttachFile',
                      },
                      {
                        name: 'AttachMoney',
                        value: 'AttachMoney',
                      },
                      {
                        name: 'Attachment',
                        value: 'Attachment',
                      },
                      {
                        name: 'Audiotrack',
                        value: 'Audiotrack',
                      },
                      {
                        name: 'Autorenew',
                        value: 'Autorenew',
                      },
                      {
                        name: 'AvTimer',
                        value: 'AvTimer',
                      },
                      {
                        name: 'Backspace',
                        value: 'Backspace',
                      },
                      {
                        name: 'Backup',
                        value: 'Backup',
                      },
                      {
                        name: 'BarChart',
                        value: 'BarChart',
                      },
                      {
                        name: 'Battery20',
                        value: 'Battery20',
                      },
                      {
                        name: 'Beenhere',
                        value: 'Beenhere',
                      },
                      {
                        name: 'Block',
                        value: 'Block',
                      },
                      {
                        name: 'Bluetooth',
                        value: 'Bluetooth',
                      },
                      {
                        name: 'Book',
                        value: 'Book',
                      },
                      {
                        name: 'Bookmark',
                        value: 'Bookmark',
                      },
                      {
                        name: 'BookmarkBorder',
                        value: 'BookmarkBorder',
                      },
                      {
                        name: 'Bookmarks',
                        value: 'Bookmarks',
                      },
                      {
                        name: 'Brush',
                        value: 'Brush',
                      },
                      {
                        name: 'BubbleChart',
                        value: 'BubbleChart',
                      },
                      {
                        name: 'BugReport',
                        value: 'BugReport',
                      },
                      {
                        name: 'Build',
                        value: 'Build',
                      },
                      {
                        name: 'Cached',
                        value: 'Cached',
                      },
                      {
                        name: 'Cake',
                        value: 'Cake',
                      },
                      {
                        name: 'CalendarToday',
                        value: 'CalendarToday',
                      },
                      {
                        name: 'Call',
                        value: 'Call',
                      },
                      {
                        name: 'CameraAlt',
                        value: 'CameraAlt',
                      },
                      {
                        name: 'CameraRoll',
                        value: 'CameraRoll',
                      },
                      {
                        name: 'Cancel',
                        value: 'Cancel',
                      },
                      {
                        name: 'CardTravel',
                        value: 'CardTravel',
                      },
                      {
                        name: 'Cast',
                        value: 'Cast',
                      },
                      {
                        name: 'Category',
                        value: 'Category',
                      },
                      {
                        name: 'Chat',
                        value: 'Chat',
                      },
                      {
                        name: 'Check',
                        value: 'Check',
                      },
                      {
                        name: 'CheckBox',
                        value: 'CheckBox',
                      },
                      {
                        name: 'CheckCircle',
                        value: 'CheckCircle',
                      },
                      {
                        name: 'CheckCircleOutline',
                        value: 'CheckCircleOutline',
                      },
                      {
                        name: 'ChevronLeft',
                        value: 'ChevronLeft',
                      },
                      {
                        name: 'ChevronRight',
                        value: 'ChevronRight',
                      },
                      {
                        name: 'ChildCare',
                        value: 'ChildCare',
                      },
                      {
                        name: 'Clear',
                        value: 'Clear',
                      },
                      {
                        name: 'Close',
                        value: 'Close',
                      },
                      {
                        name: 'Cloud',
                        value: 'Cloud',
                      },
                      {
                        name: 'CloudDownload',
                        value: 'CloudDownload',
                      },
                      {
                        name: 'CloudUpload',
                        value: 'CloudUpload',
                      },
                      {
                        name: 'Code',
                        value: 'Code',
                      },
                      {
                        name: 'Collections',
                        value: 'Collections',
                      },
                      {
                        name: 'ColorLens',
                        value: 'ColorLens',
                      },
                      {
                        name: 'Colorize',
                        value: 'Colorize',
                      },
                      {
                        name: 'Commute',
                        value: 'Commute',
                      },
                      {
                        name: 'Computer',
                        value: 'Computer',
                      },
                      {
                        name: 'CreditCard',
                        value: 'CreditCard',
                      },
                      {
                        name: 'Dashboard',
                        value: 'Dashboard',
                      },
                      {
                        name: 'DataUsage',
                        value: 'DataUsage',
                      },
                      {
                        name: 'Deck',
                        value: 'Deck',
                      },
                      {
                        name: 'Dehaze',
                        value: 'Dehaze',
                      },
                      {
                        name: 'Delete',
                        value: 'Delete',
                      },
                      {
                        name: 'DeleteForever',
                        value: 'DeleteForever',
                      },
                      {
                        name: 'DesktopMac',
                        value: 'DesktopMac',
                      },
                      {
                        name: 'DeveloperMode',
                        value: 'DeveloperMode',
                      },
                      {
                        name: 'Devices',
                        value: 'Devices',
                      },
                      {
                        name: 'Dialpad',
                        value: 'Dialpad',
                      },
                      {
                        name: 'Directions',
                        value: 'Directions',
                      },
                      {
                        name: 'DirectionsBike',
                        value: 'DirectionsBike',
                      },
                      {
                        name: 'DirectionsBoat',
                        value: 'DirectionsBoat',
                      },
                      {
                        name: 'DirectionsBus',
                        value: 'DirectionsBus',
                      },
                      {
                        name: 'DirectionsCar',
                        value: 'DirectionsCar',
                      },
                      {
                        name: 'DirectionsRailway',
                        value: 'DirectionsRailway',
                      },
                      {
                        name: 'DirectionsRun',
                        value: 'DirectionsRun',
                      },
                      {
                        name: 'DirectionsSubway',
                        value: 'DirectionsSubway',
                      },
                      {
                        name: 'DirectionsTransit',
                        value: 'DirectionsTransit',
                      },
                      {
                        name: 'DirectionsWalk',
                        value: 'DirectionsWalk',
                      },
                      {
                        name: 'DiscFull',
                        value: 'DiscFull',
                      },
                      {
                        name: 'Dns',
                        value: 'Dns',
                      },
                      {
                        name: 'Done',
                        value: 'Done',
                      },
                      {
                        name: 'DoneAll',
                        value: 'DoneAll',
                      },
                      {
                        name: 'DoubleArrow',
                        value: 'DoubleArrow',
                      },
                      {
                        name: 'Drafts',
                        value: 'Drafts',
                      },
                      {
                        name: 'Eco',
                        value: 'Eco',
                      },
                      {
                        name: 'Edit',
                        value: 'Edit',
                      },
                      {
                        name: 'Email',
                        value: 'Email',
                      },
                      {
                        name: 'Equalizer',
                        value: 'Equalizer',
                      },
                      {
                        name: 'Error',
                        value: 'Error',
                      },
                      {
                        name: 'Euro',
                        value: 'Euro',
                      },
                      {
                        name: 'Event',
                        value: 'Event',
                      },
                      {
                        name: 'ExpandLess',
                        value: 'ExpandLess',
                      },
                      {
                        name: 'ExpandMore',
                        value: 'ExpandMore',
                      },
                      {
                        name: 'Explore',
                        value: 'Explore',
                      },
                      {
                        name: 'Extension',
                        value: 'Extension',
                      },
                      {
                        name: 'Face',
                        value: 'Face',
                      },
                      {
                        name: 'Facebook',
                        value: 'Facebook',
                      },
                      {
                        name: 'FastForward',
                        value: 'FastForward',
                      },
                      {
                        name: 'FastRewind',
                        value: 'FastRewind',
                      },
                      {
                        name: 'Favorite',
                        value: 'Favorite',
                      },
                      {
                        name: 'FavoriteBorder',
                        value: 'FavoriteBorder',
                      },
                      {
                        name: 'FileCopy',
                        value: 'FileCopy',
                      },
                      {
                        name: 'FilterList',
                        value: 'FilterList',
                      },
                      {
                        name: 'Flag',
                        value: 'Flag',
                      },
                      {
                        name: 'Flare',
                        value: 'Flare',
                      },
                      {
                        name: 'Flight',
                        value: 'Flight',
                      },
                      {
                        name: 'Folder',
                        value: 'Folder',
                      },
                      {
                        name: 'Forum',
                        value: 'Forum',
                      },
                      {
                        name: 'Forward',
                        value: 'Forward',
                      },
                      {
                        name: 'FreeBreakfast',
                        value: 'FreeBreakfast',
                      },
                      {
                        name: 'Fullscreen',
                        value: 'Fullscreen',
                      },
                      {
                        name: 'Functions',
                        value: 'Functions',
                      },
                      {
                        name: 'Games',
                        value: 'Games',
                      },
                      {
                        name: 'Gavel',
                        value: 'Gavel',
                      },
                      {
                        name: 'Gesture',
                        value: 'Gesture',
                      },
                      {
                        name: 'GetApp',
                        value: 'GetApp',
                      },
                      {
                        name: 'Gif',
                        value: 'Gif',
                      },
                      {
                        name: 'GpsFixed',
                        value: 'GpsFixed',
                      },
                      {
                        name: 'Grade',
                        value: 'Grade',
                      },
                      {
                        name: 'Group',
                        value: 'Group',
                      },
                      {
                        name: 'Headset',
                        value: 'Headset',
                      },
                      {
                        name: 'Hearing',
                        value: 'Hearing',
                      },
                      {
                        name: 'Height',
                        value: 'Height',
                      },
                      {
                        name: 'Help',
                        value: 'Help',
                      },
                      {
                        name: 'HelpOutline',
                        value: 'HelpOutline',
                      },
                      {
                        name: 'Highlight',
                        value: 'Highlight',
                      },
                      {
                        name: 'History',
                        value: 'History',
                      },
                      {
                        name: 'Home',
                        value: 'Home',
                      },
                      {
                        name: 'Hotel',
                        value: 'Hotel',
                      },
                      {
                        name: 'HourglassEmpty',
                        value: 'HourglassEmpty',
                      },
                      {
                        name: 'Http',
                        value: 'Http',
                      },
                      {
                        name: 'Https',
                        value: 'Https',
                      },
                      {
                        name: 'Image',
                        value: 'Image',
                      },
                      {
                        name: 'ImportExport',
                        value: 'ImportExport',
                      },
                      {
                        name: 'Inbox',
                        value: 'Inbox',
                      },
                      {
                        name: 'Info',
                        value: 'Info',
                      },
                      {
                        name: 'Input',
                        value: 'Input',
                      },
                      {
                        name: 'Keyboard',
                        value: 'Keyboard',
                      },
                      {
                        name: 'KeyboardArrowDown',
                        value: 'KeyboardArrowDown',
                      },
                      {
                        name: 'KeyboardArrowLeft',
                        value: 'KeyboardArrowLeft',
                      },
                      {
                        name: 'KeyboardArrowRight',
                        value: 'KeyboardArrowRight',
                      },
                      {
                        name: 'KeyboardArrowUp',
                        value: 'KeyboardArrowUp',
                      },
                      {
                        name: 'KeyboardVoice',
                        value: 'KeyboardVoice',
                      },
                      {
                        name: 'Label',
                        value: 'Label',
                      },
                      {
                        name: 'Landscape',
                        value: 'Landscape',
                      },
                      {
                        name: 'Language',
                        value: 'Language',
                      },
                      {
                        name: 'Laptop',
                        value: 'Laptop',
                      },
                      {
                        name: 'LastPage',
                        value: 'LastPage',
                      },
                      {
                        name: 'Launch',
                        value: 'Launch',
                      },
                      {
                        name: 'Layers',
                        value: 'Layers',
                      },
                      {
                        name: 'Link',
                        value: 'Link',
                      },
                      {
                        name: 'List',
                        value: 'List',
                      },
                      {
                        name: 'LocalBar',
                        value: 'LocalBar',
                      },
                      {
                        name: 'Lock',
                        value: 'Lock',
                      },
                      {
                        name: 'LockOpen',
                        value: 'LockOpen',
                      },
                      {
                        name: 'Loop',
                        value: 'Loop',
                      },
                      {
                        name: 'Mail',
                        value: 'Mail',
                      },
                      {
                        name: 'Map',
                        value: 'Map',
                      },
                      {
                        name: 'Menu',
                        value: 'Menu',
                      },
                      {
                        name: 'Message',
                        value: 'Message',
                      },
                      {
                        name: 'Mic',
                        value: 'Mic',
                      },
                      {
                        name: 'Mms',
                        value: 'Mms',
                      },
                      {
                        name: 'Money',
                        value: 'Money',
                      },
                      {
                        name: 'Mood',
                        value: 'Mood',
                      },
                      {
                        name: 'MoodBad',
                        value: 'MoodBad',
                      },
                      {
                        name: 'More',
                        value: 'More',
                      },
                      {
                        name: 'MoreHoriz',
                        value: 'MoreHoriz',
                      },
                      {
                        name: 'MoreVert',
                        value: 'MoreVert',
                      },
                      {
                        name: 'Motorcycle',
                        value: 'Motorcycle',
                      },
                      {
                        name: 'Movie',
                        value: 'Movie',
                      },
                      {
                        name: 'MusicNote',
                        value: 'MusicNote',
                      },
                      {
                        name: 'MyLocation',
                        value: 'MyLocation',
                      },
                      {
                        name: 'Nature',
                        value: 'Nature',
                      },
                      {
                        name: 'Navigation',
                        value: 'Navigation',
                      },
                      {
                        name: 'NewReleases',
                        value: 'NewReleases',
                      },
                      {
                        name: 'NotInterested',
                        value: 'NotInterested',
                      },
                      {
                        name: 'Note',
                        value: 'Note',
                      },
                      {
                        name: 'NotificationImportant',
                        value: 'NotificationImportant',
                      },
                      {
                        name: 'Notifications',
                        value: 'Notifications',
                      },
                      {
                        name: 'NotificationsActive',
                        value: 'NotificationsActive',
                      },
                      {
                        name: 'Opacity',
                        value: 'Opacity',
                      },
                      {
                        name: 'Palette',
                        value: 'Palette',
                      },
                      {
                        name: 'Pause',
                        value: 'Pause',
                      },
                      {
                        name: 'Payment',
                        value: 'Payment',
                      },
                      {
                        name: 'People',
                        value: 'People',
                      },
                      {
                        name: 'Person',
                        value: 'Person',
                      },
                      {
                        name: 'PersonAdd',
                        value: 'PersonAdd',
                      },
                      {
                        name: 'Pets',
                        value: 'Pets',
                      },
                      {
                        name: 'Phone',
                        value: 'Phone',
                      },
                      {
                        name: 'Photo',
                        value: 'Photo',
                      },
                      {
                        name: 'PhotoCamera',
                        value: 'PhotoCamera',
                      },
                      {
                        name: 'PieChart',
                        value: 'PieChart',
                      },
                      {
                        name: 'Place',
                        value: 'Place',
                      },
                      {
                        name: 'PlayArrow',
                        value: 'PlayArrow',
                      },
                      {
                        name: 'PlayCircleFilled',
                        value: 'PlayCircleFilled',
                      },
                      {
                        name: 'PlayCircleFilledWhite',
                        value: 'PlayCircleFilledWhite',
                      },
                      {
                        name: 'PlayCircleOutline',
                        value: 'PlayCircleOutline',
                      },
                      {
                        name: 'Power',
                        value: 'Power',
                      },
                      {
                        name: 'Public',
                        value: 'Public',
                      },
                      {
                        name: 'Radio',
                        value: 'Radio',
                      },
                      {
                        name: 'Redo',
                        value: 'Redo',
                      },
                      {
                        name: 'Refresh',
                        value: 'Refresh',
                      },
                      {
                        name: 'Remove',
                        value: 'Remove',
                      },
                      {
                        name: 'RemoveCircle',
                        value: 'RemoveCircle',
                      },
                      {
                        name: 'RemoveCircleOutline',
                        value: 'RemoveCircleOutline',
                      },
                      {
                        name: 'Replay',
                        value: 'Replay',
                      },
                      {
                        name: 'Reply',
                        value: 'Reply',
                      },
                      {
                        name: 'Report',
                        value: 'Report',
                      },
                      {
                        name: 'ReportProblem',
                        value: 'ReportProblem',
                      },
                      {
                        name: 'Restaurant',
                        value: 'Restaurant',
                      },
                      {
                        name: 'RssFeed',
                        value: 'RssFeed',
                      },
                      {
                        name: 'Save',
                        value: 'Save',
                      },
                      {
                        name: 'SaveAlt',
                        value: 'SaveAlt',
                      },
                      {
                        name: 'School',
                        value: 'School',
                      },
                      {
                        name: 'Search',
                        value: 'Search',
                      },
                      {
                        name: 'Security',
                        value: 'Security',
                      },
                      {
                        name: 'Send',
                        value: 'Send',
                      },
                      {
                        name: 'Settings',
                        value: 'Settings',
                      },
                      {
                        name: 'ShoppingCart',
                        value: 'ShoppingCart',
                      },
                      {
                        name: 'ShowChart',
                        value: 'ShowChart',
                      },
                      {
                        name: 'Smartphone',
                        value: 'Smartphone',
                      },
                      {
                        name: 'SmokeFree',
                        value: 'SmokeFree',
                      },
                      {
                        name: 'SmokingRooms',
                        value: 'SmokingRooms',
                      },
                      {
                        name: 'Speaker',
                        value: 'Speaker',
                      },
                      {
                        name: 'Speed',
                        value: 'Speed',
                      },
                      {
                        name: 'Spellcheck',
                        value: 'Spellcheck',
                      },
                      {
                        name: 'SquareFoot',
                        value: 'SquareFoot',
                      },
                      {
                        name: 'Star',
                        value: 'Star',
                      },
                      {
                        name: 'StarBorder',
                        value: 'StarBorder',
                      },
                      {
                        name: 'StarHalf',
                        value: 'StarHalf',
                      },
                      {
                        name: 'StarOutline',
                        value: 'StarOutline',
                      },
                      {
                        name: 'StarRate',
                        value: 'StarRate',
                      },
                      {
                        name: 'Stars',
                        value: 'Stars',
                      },
                      {
                        name: 'Stop',
                        value: 'Stop',
                      },
                      {
                        name: 'Storefront',
                        value: 'Storefront',
                      },
                      {
                        name: 'Sync',
                        value: 'Sync',
                      },
                      {
                        name: 'Tab',
                        value: 'Tab',
                      },
                      {
                        name: 'TextFields',
                        value: 'TextFields',
                      },
                      {
                        name: 'ThumbDown',
                        value: 'ThumbDown',
                      },
                      {
                        name: 'ThumbDownAlt',
                        value: 'ThumbDownAlt',
                      },
                      {
                        name: 'ThumbUp',
                        value: 'ThumbUp',
                      },
                      {
                        name: 'ThumbUpAlt',
                        value: 'ThumbUpAlt',
                      },
                      {
                        name: 'ThumbsUpDown',
                        value: 'ThumbsUpDown',
                      },
                      {
                        name: 'Title',
                        value: 'Title',
                      },
                      {
                        name: 'TouchApp',
                        value: 'TouchApp',
                      },
                      {
                        name: 'Traffic',
                        value: 'Traffic',
                      },
                      {
                        name: 'Train',
                        value: 'Train',
                      },
                      {
                        name: 'Tram',
                        value: 'Tram',
                      },
                      {
                        name: 'Translate',
                        value: 'Translate',
                      },
                      {
                        name: 'TrendingDown',
                        value: 'TrendingDown',
                      },
                      {
                        name: 'TrendingFlat',
                        value: 'TrendingFlat',
                      },
                      {
                        name: 'TrendingUp',
                        value: 'TrendingUp',
                      },
                      {
                        name: 'Undo',
                        value: 'Undo',
                      },
                      {
                        name: 'Update',
                        value: 'Update',
                      },
                      {
                        name: 'Usb',
                        value: 'Usb',
                      },
                      {
                        name: 'VerifiedUser',
                        value: 'VerifiedUser',
                      },
                      {
                        name: 'VideoCall',
                        value: 'VideoCall',
                      },
                      {
                        name: 'Visibility',
                        value: 'Visibility',
                      },
                      {
                        name: 'VisibilityOff',
                        value: 'VisibilityOff',
                      },
                      {
                        name: 'Voicemail',
                        value: 'Voicemail',
                      },
                      {
                        name: 'VolumeDown',
                        value: 'VolumeDown',
                      },
                      {
                        name: 'VolumeMute',
                        value: 'VolumeMute',
                      },
                      {
                        name: 'VolumeOff',
                        value: 'VolumeOff',
                      },
                      {
                        name: 'VolumeUp',
                        value: 'VolumeUp',
                      },
                      {
                        name: 'Warning',
                        value: 'Warning',
                      },
                      {
                        name: 'Watch',
                        value: 'Watch',
                      },
                      {
                        name: 'WatchLater',
                        value: 'WatchLater',
                      },
                      {
                        name: 'Wc',
                        value: 'Wc',
                      },
                      {
                        name: 'Widgets',
                        value: 'Widgets',
                      },
                      {
                        name: 'Wifi',
                        value: 'Wifi',
                      },
                      {
                        name: 'Work',
                        value: 'Work',
                      },
                    ],
                  },
                },
                {
                  type: 'CUSTOM',
                  label: 'Icon position',
                  key: 'iconPosition',
                  value: 'start',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    condition: {
                      type: 'HIDE',
                      option: 'variant',
                      comparator: 'EQ',
                      value: 'icon',
                    },
                    allowedInput: [
                      { name: 'Start', value: 'start' },
                      { name: 'End', value: 'end' },
                    ],
                  },
                },
                {
                  type: 'COLOR',
                  label: 'Text color',
                  key: 'textColor',
                  value: 'Primary',
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'variant',
                      comparator: 'EQ',
                      value: 'icon',
                    },
                  },
                },
                {
                  type: 'COLOR',
                  label: 'Color',
                  key: 'background',
                  value: 'Secondary',
                },
                {
                  value: ['0rem', '0rem', '0rem', '0rem'],
                  label: 'Outer space',
                  key: 'outerSpacing',
                  type: 'SIZES',
                },
                {
                  label: 'Disabled',
                  key: 'disabled',
                  value: false,
                  type: 'TOGGLE',
                },
              ],
              descendants: [],
            },
          ],
        },
      ],
    },
  ],
}))();
