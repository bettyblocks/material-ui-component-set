(() => ({
  name: 'Page with app bar',
  icon: 'NavbarIcon',
  type: 'page',
  description: 'Full height page with an app bar',
  detail: 'Start with a full height page containing an App Bar on top.',
  previewUrl: 'https://preview.betty.app/app-bar',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_App_Bar.jpg',
  category: 'LAYOUT',
  structure: [
    {
      descendants: [
        {
          descendants: [
            {
              descendants: [
                {
                  descendants: [],
                  name: 'Button',
                  options: [
                    {
                      configuration: {
                        apiVersion: 'v1',
                        as: 'VISIBILITY',
                      },
                      key: 'visible',
                      label: 'Toggle visibility',
                      type: 'TOGGLE',
                      value: true,
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                      },
                      key: 'buttonText',
                      label: 'Button text',
                      type: 'VARIABLE',
                      value: ['Menu 1'],
                    },
                    {
                      configuration: {
                        allowedInput: [
                          {
                            name: 'Internal page',
                            value: 'internal',
                          },
                          {
                            name: 'External page',
                            value: 'external',
                          },
                        ],
                        apiVersion: 'v1',
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                      },
                      key: 'linkType',
                      label: 'Link to',
                      type: 'CUSTOM',
                      value: 'internal',
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                        condition: {
                          comparator: 'EQ',
                          option: 'linkType',
                          type: 'SHOW',
                          value: 'internal',
                        },
                      },
                      key: 'linkTo',
                      label: 'Page',
                      type: 'ENDPOINT',
                      value: '',
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                        condition: {
                          comparator: 'EQ',
                          option: 'linkType',
                          type: 'SHOW',
                          value: 'external',
                        },
                        placeholder: 'Starts with https:// or http://',
                      },
                      key: 'linkToExternal',
                      label: 'URL',
                      type: 'VARIABLE',
                      value: [''],
                    },
                    {
                      value: '_self',
                      label: 'Open in',
                      key: 'openLinkToExternal',
                      type: 'CUSTOM',
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'linkType',
                          comparator: 'EQ',
                          value: 'external',
                        },
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Current Tab', value: '_self' },
                          { name: 'New Tab', value: '_blank' },
                        ],
                      },
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                      },
                      key: 'fullWidth',
                      label: 'Full width',
                      type: 'TOGGLE',
                      value: false,
                    },
                    {
                      configuration: {
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
                        apiVersion: 'v1',
                        as: 'DROPDOWN',
                        dataType: 'string',
                      },
                      key: 'icon',
                      label: 'Icon',
                      type: 'CUSTOM',
                      value: 'None',
                    },
                    {
                      configuration: {
                        allowedInput: [
                          {
                            name: 'Large',
                            value: 'large',
                          },
                          {
                            name: 'Medium',
                            value: 'medium',
                          },
                          {
                            name: 'Small',
                            value: 'small',
                          },
                        ],
                        apiVersion: 'v1',
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        condition: {
                          type: 'HIDE',
                          option: 'icon',
                          comparator: 'EQ',
                          value: 'None',
                        },
                      },
                      key: 'size',
                      label: 'Icon size',
                      type: 'CUSTOM',
                      value: 'medium',
                    },
                    {
                      configuration: {
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
                        apiVersion: 'v1',
                        as: 'BUTTONGROUP',
                        condition: {
                          type: 'HIDE',
                          option: 'icon',
                          comparator: 'EQ',
                          value: 'None',
                        },
                        dataType: 'string',
                      },
                      key: 'iconPosition',
                      label: 'Icon position',
                      type: 'CUSTOM',
                      value: 'start',
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                      },
                      key: 'outerSpacing',
                      label: 'Outer space',
                      type: 'SIZES',
                      value: ['0rem', 'M', '0rem', '0rem'],
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                      },
                      key: 'disabled',
                      label: 'Disabled',
                      type: 'TOGGLE',
                      value: false,
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                        as: 'VISIBILITY',
                      },
                      label: 'Add Tooltip',
                      key: 'addTooltip',
                      value: false,
                      type: 'TOGGLE',
                    },
                    {
                      label: 'Toggle tooltip visibility',
                      key: 'hasVisibleTooltip',
                      value: true,
                      type: 'TOGGLE',
                      configuration: {
                        apiVersion: 'v1',
                        as: 'VISIBILITY',
                        condition: {
                          type: 'SHOW',
                          option: 'addTooltip',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      type: 'VARIABLE',
                      label: 'Tooltip Content',
                      key: 'tooltipContent',
                      value: ['Tips'],
                      configuration: {
                        apiVersion: 'v1',
                        condition: {
                          type: 'SHOW',
                          option: 'addTooltip',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      label: 'Tooltip Placement',
                      key: 'tooltipPlacement',
                      value: 'bottom',
                      type: 'CUSTOM',
                      configuration: {
                        apiVersion: 'v1',
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Top Start',
                            value: 'top-start',
                          },
                          {
                            name: 'Top',
                            value: 'top',
                          },
                          {
                            name: 'Top End',
                            value: 'top-end',
                          },
                          {
                            name: 'Right',
                            value: 'right',
                          },
                          {
                            name: 'Left',
                            value: 'left',
                          },
                          {
                            name: 'Botttom Start',
                            value: 'bottom-start',
                          },
                          {
                            name: 'Bottom',
                            value: 'bottom',
                          },
                          {
                            name: 'Bottom End',
                            value: 'bottom-end',
                          },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'addTooltip',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      type: 'COLOR',
                      label: 'Tooltip Background',
                      key: 'tooltipBackground',
                      value: 'Medium',
                      configuration: {
                        apiVersion: 'v1',
                        condition: {
                          type: 'SHOW',
                          option: 'addTooltip',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      type: 'COLOR',
                      label: 'Tooltip Text',
                      key: 'tooltipText',
                      value: 'Black',
                      configuration: {
                        apiVersion: 'v1',
                        condition: {
                          type: 'SHOW',
                          option: 'addTooltip',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                  ],
                },
                {
                  descendants: [],
                  name: 'Button',
                  options: [
                    {
                      configuration: {
                        apiVersion: 'v1',
                        as: 'VISIBILITY',
                      },
                      key: 'visible',
                      label: 'Toggle visibility',
                      type: 'TOGGLE',
                      value: true,
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                      },
                      key: 'buttonText',
                      label: 'Button text',
                      type: 'VARIABLE',
                      value: ['Menu 2'],
                    },
                    {
                      configuration: {
                        allowedInput: [
                          {
                            name: 'Internal page',
                            value: 'internal',
                          },
                          {
                            name: 'External page',
                            value: 'external',
                          },
                        ],
                        apiVersion: 'v1',
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                      },
                      key: 'linkType',
                      label: 'Link to',
                      type: 'CUSTOM',
                      value: 'internal',
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                        condition: {
                          comparator: 'EQ',
                          option: 'linkType',
                          type: 'SHOW',
                          value: 'internal',
                        },
                      },
                      key: 'linkTo',
                      label: 'Page',
                      type: 'ENDPOINT',
                      value: '',
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                        condition: {
                          comparator: 'EQ',
                          option: 'linkType',
                          type: 'SHOW',
                          value: 'external',
                        },
                        placeholder: 'Starts with https:// or http://',
                      },
                      key: 'linkToExternal',
                      label: 'URL',
                      type: 'VARIABLE',
                      value: [''],
                    },
                    {
                      value: '_self',
                      label: 'Open in',
                      key: 'openLinkToExternal',
                      type: 'CUSTOM',
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'linkType',
                          comparator: 'EQ',
                          value: 'external',
                        },
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Current Tab', value: '_self' },
                          { name: 'New Tab', value: '_blank' },
                        ],
                      },
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                      },
                      key: 'fullWidth',
                      label: 'Full width',
                      type: 'TOGGLE',
                      value: false,
                    },
                    {
                      configuration: {
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
                        apiVersion: 'v1',
                        as: 'DROPDOWN',
                        dataType: 'string',
                      },
                      key: 'icon',
                      label: 'Icon',
                      type: 'CUSTOM',
                      value: 'None',
                    },
                    {
                      configuration: {
                        allowedInput: [
                          {
                            name: 'Large',
                            value: 'large',
                          },
                          {
                            name: 'Medium',
                            value: 'medium',
                          },
                          {
                            name: 'Small',
                            value: 'small',
                          },
                        ],
                        condition: {
                          type: 'HIDE',
                          option: 'icon',
                          comparator: 'EQ',
                          value: 'None',
                        },
                        apiVersion: 'v1',
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                      },
                      key: 'size',
                      label: 'Icon size',
                      type: 'CUSTOM',
                      value: 'medium',
                    },
                    {
                      configuration: {
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
                        apiVersion: 'v1',
                        as: 'BUTTONGROUP',
                        condition: {
                          type: 'HIDE',
                          option: 'icon',
                          comparator: 'EQ',
                          value: 'None',
                        },
                        dataType: 'string',
                      },
                      key: 'iconPosition',
                      label: 'Icon position',
                      type: 'CUSTOM',
                      value: 'start',
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                      },
                      key: 'outerSpacing',
                      label: 'Outer space',
                      type: 'SIZES',
                      value: ['0rem', '0rem', '0rem', '0rem'],
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                      },
                      key: 'disabled',
                      label: 'Disabled',
                      type: 'TOGGLE',
                      value: false,
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                        as: 'VISIBILITY',
                      },
                      label: 'Add Tooltip',
                      key: 'addTooltip',
                      value: false,
                      type: 'TOGGLE',
                    },
                    {
                      type: 'VARIABLE',
                      label: 'Tooltip Content',
                      key: 'tooltipContent',
                      value: ['Tips'],
                      configuration: {
                        apiVersion: 'v1',
                        condition: {
                          type: 'SHOW',
                          option: 'addTooltip',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      label: 'Tooltip Placement',
                      key: 'tooltipPlacement',
                      value: 'bottom',
                      type: 'CUSTOM',
                      configuration: {
                        apiVersion: 'v1',
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Top Start',
                            value: 'top-start',
                          },
                          {
                            name: 'Top',
                            value: 'top',
                          },
                          {
                            name: 'Top End',
                            value: 'top-end',
                          },
                          {
                            name: 'Right',
                            value: 'right',
                          },
                          {
                            name: 'Left',
                            value: 'left',
                          },
                          {
                            name: 'Botttom Start',
                            value: 'bottom-start',
                          },
                          {
                            name: 'Bottom',
                            value: 'bottom',
                          },
                          {
                            name: 'Bottom End',
                            value: 'bottom-end',
                          },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'addTooltip',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      type: 'COLOR',
                      label: 'Tooltip Background',
                      key: 'tooltipBackground',
                      value: 'medium',
                      configuration: {
                        apiVersion: 'v1',
                        condition: {
                          type: 'SHOW',
                          option: 'addTooltip',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      type: 'COLOR',
                      label: 'Tooltip Text',
                      key: 'tooltipText',
                      value: 'Black',
                      configuration: {
                        apiVersion: 'v1',
                        condition: {
                          type: 'SHOW',
                          option: 'addTooltip',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                  ],
                },
              ],
              name: 'AppBar',
              options: [
                {
                  configuration: {
                    apiVersion: 'v1',
                  },
                  key: 'backgroundColor',
                  label: 'Background color',
                  type: 'COLOR',
                  value: 'Primary',
                },
                {
                  configuration: {
                    apiVersion: 'v1',
                  },
                  key: 'color',
                  label: 'Text color',
                  type: 'COLOR',
                  value: 'White',
                },
                {
                  configuration: {
                    apiVersion: 'v1',
                    as: 'UNIT',
                  },
                  key: 'height',
                  label: 'Height',
                  type: 'SIZE',
                  value: '',
                },
                {
                  configuration: {
                    allowedInput: [
                      {
                        name: 'Fixed',
                        value: 'fixed',
                      },
                      {
                        name: 'Absolute',
                        value: 'absolute',
                      },
                      {
                        name: 'Sticky',
                        value: 'sticky',
                      },
                      {
                        name: 'Static',
                        value: 'static',
                      },
                      {
                        name: 'Relative',
                        value: 'relative',
                      },
                    ],
                    apiVersion: 'v1',
                    as: 'DROPDOWN',
                    dataType: 'string',
                  },
                  key: 'position',
                  label: 'Position',
                  type: 'CUSTOM',
                  value: 'static',
                },
                {
                  configuration: {
                    apiVersion: 'v1',
                  },
                  key: 'title',
                  label: 'Title',
                  type: 'VARIABLE',
                  value: ['App Bar'],
                },
                {
                  configuration: {
                    apiVersion: 'v1',
                  },
                  key: 'logoSource',
                  label: 'Logo',
                  type: 'VARIABLE',
                  value: [],
                },
                {
                  configuration: {
                    apiVersion: 'v1',
                    as: 'UNIT',
                  },
                  key: 'logoWidth',
                  label: 'Logo Width',
                  type: 'SIZE',
                  value: '150px',
                },
                {
                  configuration: {
                    allowedInput: [
                      {
                        name: 'Left',
                        value: 'left',
                      },
                      {
                        name: 'Right',
                        value: 'right',
                      },
                    ],
                    apiVersion: 'v1',
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                  },
                  key: 'alignItems',
                  label: 'Align items',
                  type: 'CUSTOM',
                  value: 'right',
                },
                {
                  configuration: {
                    apiVersion: 'v1',
                  },
                  key: 'endpoint',
                  label: 'Page',
                  type: 'ENDPOINT',
                  value: '',
                },
                {
                  configuration: {
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
                    apiVersion: 'v1',
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                  },
                  key: 'appBarVariant',
                  label: 'Variant',
                  type: 'CUSTOM',
                  value: 'elevation',
                },
                {
                  configuration: {
                    allowedInput: [
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
                      {
                        name: '13',
                        value: '13',
                      },
                      {
                        name: '14',
                        value: '14',
                      },
                      {
                        name: '15',
                        value: '15',
                      },
                      {
                        name: '16',
                        value: '16',
                      },
                      {
                        name: '17',
                        value: '17',
                      },
                      {
                        name: '18',
                        value: '18',
                      },
                      {
                        name: '19',
                        value: '19',
                      },
                      {
                        name: '20',
                        value: '20',
                      },
                      {
                        name: '21',
                        value: '21',
                      },
                      {
                        name: '22',
                        value: '22',
                      },
                      {
                        name: '23',
                        value: '23',
                      },
                      {
                        name: '24',
                        value: '24',
                      },
                    ],
                    apiVersion: 'v1',
                    as: 'DROPDOWN',
                    condition: {
                      comparator: 'EQ',
                      option: 'appBarVariant',
                      type: 'SHOW',
                      value: 'elevation',
                    },
                    dataType: 'string',
                  },
                  key: 'elevation',
                  label: 'Elevation',
                  type: 'CUSTOM',
                  value: '1',
                },
                {
                  configuration: {
                    apiVersion: 'v1',
                  },
                  key: 'square',
                  label: 'Square',
                  type: 'TOGGLE',
                  value: true,
                },
                {
                  configuration: {
                    allowedInput: [
                      {
                        name: 'Regular',
                        value: 'regular',
                      },
                      {
                        name: 'Dense',
                        value: 'dense',
                      },
                    ],
                    apiVersion: 'v1',
                    as: 'DROPDOWN',
                    dataType: 'string',
                  },
                  key: 'toolbarVariant',
                  label: 'Size',
                  type: 'CUSTOM',
                  value: 'regular',
                },
              ],
            },
            {
              descendants: [
                {
                  descendants: [],
                  name: 'Column',
                  options: [
                    {
                      configuration: {
                        apiVersion: 'v1',
                        as: 'VISIBILITY',
                      },
                      key: 'visible',
                      label: 'Toggle visibility',
                      type: 'TOGGLE',
                      value: true,
                    },
                    {
                      configuration: {
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
                        apiVersion: 'v1',
                        as: 'DROPDOWN',
                        dataType: 'string',
                      },
                      key: 'columnWidth',
                      label: 'Column width',
                      type: 'CUSTOM',
                      value: 'flexible',
                    },
                    {
                      configuration: {
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
                        apiVersion: 'v1',
                        as: 'DROPDOWN',
                        dataType: 'string',
                      },
                      key: 'columnWidthTabletLandscape',
                      label: 'Column width (tablet landscape)',
                      type: 'CUSTOM',
                      value: 'flexible',
                    },
                    {
                      configuration: {
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
                        apiVersion: 'v1',
                        as: 'DROPDOWN',
                        dataType: 'string',
                      },
                      key: 'columnWidthTabletPortrait',
                      label: 'Column width (tablet portrait)',
                      type: 'CUSTOM',
                      value: 'flexible',
                    },
                    {
                      configuration: {
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
                        apiVersion: 'v1',
                        as: 'DROPDOWN',
                        dataType: 'string',
                      },
                      key: 'columnWidthMobile',
                      label: 'Column width (mobile)',
                      type: 'CUSTOM',
                      value: 'flexible',
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                        as: 'UNIT',
                      },
                      key: 'columnHeight',
                      label: 'Height',
                      type: 'TEXT',
                      value: '',
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                      },
                      key: 'backgroundColor',
                      label: 'Background color',
                      type: 'COLOR',
                      value: 'transparent',
                    },
                    {
                      configuration: {
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
                        apiVersion: 'v1',
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                      },
                      key: 'horizontalAlignment',
                      label: 'Horizontal Alignment',
                      type: 'CUSTOM',
                      value: 'inherit',
                    },
                    {
                      configuration: {
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
                        apiVersion: 'v1',
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                      },
                      key: 'verticalAlignment',
                      label: 'Vertical Alignment',
                      type: 'CUSTOM',
                      value: 'inherit',
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                      },
                      key: 'outerSpacing',
                      label: 'Outer space',
                      type: 'SIZES',
                      value: ['0rem', '0rem', '0rem', '0rem'],
                    },
                    {
                      configuration: {
                        apiVersion: 'v1',
                      },
                      key: 'innerSpacing',
                      label: 'Inner space',
                      type: 'SIZES',
                      value: ['M', 'M', 'M', 'M'],
                    },
                  ],
                },
              ],
              name: 'Row',
              options: [
                {
                  configuration: {
                    allowedInput: [
                      {
                        name: 'S',
                        value: 'S',
                      },
                      {
                        name: 'M',
                        value: 'M',
                      },
                      {
                        name: 'L',
                        value: 'L',
                      },
                      {
                        name: 'XL',
                        value: 'XL',
                      },
                      {
                        name: 'Full',
                        value: 'Full',
                      },
                    ],
                    apiVersion: 'v1',
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                  },
                  key: 'maxRowWidth',
                  label: 'Width',
                  type: 'CUSTOM',
                  value: 'XL',
                },
                {
                  configuration: {
                    apiVersion: 'v1',
                    as: 'UNIT',
                  },
                  key: 'rowHeight',
                  label: 'Height',
                  type: 'TEXT',
                  value: '',
                },
                {
                  configuration: {
                    apiVersion: 'v1',
                  },
                  key: 'backgroundColor',
                  label: 'Background color',
                  type: 'COLOR',
                  value: 'transparent',
                },
                {
                  configuration: {
                    apiVersion: 'v1',
                  },
                  key: 'outerSpacing',
                  label: 'Outer space',
                  type: 'SIZES',
                  value: ['0rem', '0rem', '0rem', '0rem'],
                },
              ],
            },
          ],
          name: 'Column',
          options: [
            {
              configuration: {
                apiVersion: 'v1',
                as: 'VISIBILITY',
              },
              key: 'visible',
              label: 'Toggle visibility',
              type: 'TOGGLE',
              value: true,
            },
            {
              configuration: {
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
                apiVersion: 'v1',
                as: 'DROPDOWN',
                dataType: 'string',
              },
              key: 'columnWidth',
              label: 'Column width',
              type: 'CUSTOM',
              value: 'flexible',
            },
            {
              configuration: {
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
                apiVersion: 'v1',
                as: 'DROPDOWN',
                dataType: 'string',
              },
              key: 'columnWidthTabletLandscape',
              label: 'Column width (tablet landscape)',
              type: 'CUSTOM',
              value: 'flexible',
            },
            {
              configuration: {
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
                apiVersion: 'v1',
                as: 'DROPDOWN',
                dataType: 'string',
              },
              key: 'columnWidthTabletPortrait',
              label: 'Column width (tablet portrait)',
              type: 'CUSTOM',
              value: 'flexible',
            },
            {
              configuration: {
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
                apiVersion: 'v1',
                as: 'DROPDOWN',
                dataType: 'string',
              },
              key: 'columnWidthMobile',
              label: 'Column width (mobile)',
              type: 'CUSTOM',
              value: 'flexible',
            },
            {
              configuration: {
                apiVersion: 'v1',
                as: 'UNIT',
              },
              key: 'columnHeight',
              label: 'Height',
              type: 'TEXT',
              value: '',
            },
            {
              configuration: {
                apiVersion: 'v1',
              },
              key: 'backgroundColor',
              label: 'Background color',
              type: 'COLOR',
              value: 'transparent',
            },
            {
              configuration: {
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
                apiVersion: 'v1',
                as: 'BUTTONGROUP',
                dataType: 'string',
              },
              key: 'horizontalAlignment',
              label: 'Horizontal Alignment',
              type: 'CUSTOM',
              value: 'inherit',
            },
            {
              configuration: {
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
                apiVersion: 'v1',
                as: 'BUTTONGROUP',
                dataType: 'string',
              },
              key: 'verticalAlignment',
              label: 'Vertical Alignment',
              type: 'CUSTOM',
              value: 'inherit',
            },
            {
              configuration: {
                apiVersion: 'v1',
              },
              key: 'outerSpacing',
              label: 'Outer space',
              type: 'SIZES',
              value: ['0rem', '0rem', '0rem', '0rem'],
            },
            {
              configuration: {
                apiVersion: 'v1',
              },
              key: 'innerSpacing',
              label: 'Inner space',
              type: 'SIZES',
              value: ['0rem', '0rem', '0rem', '0rem'],
            },
          ],
        },
      ],
      name: 'Row',
      options: [
        {
          configuration: {
            allowedInput: [
              {
                name: 'S',
                value: 'S',
              },
              {
                name: 'M',
                value: 'M',
              },
              {
                name: 'L',
                value: 'L',
              },
              {
                name: 'XL',
                value: 'XL',
              },
              {
                name: 'Full',
                value: 'Full',
              },
            ],
            apiVersion: 'v1',
            as: 'BUTTONGROUP',
            dataType: 'string',
          },
          key: 'maxRowWidth',
          label: 'Width',
          type: 'CUSTOM',
          value: 'Full',
        },
        {
          configuration: {
            apiVersion: 'v1',
            as: 'UNIT',
          },
          key: 'rowHeight',
          label: 'Height',
          type: 'TEXT',
          value: '100%',
        },
        {
          configuration: {
            apiVersion: 'v1',
          },
          key: 'backgroundColor',
          label: 'Background color',
          type: 'COLOR',
          value: 'transparent',
        },
        {
          configuration: {
            apiVersion: 'v1',
          },
          key: 'outerSpacing',
          label: 'Outer space',
          type: 'SIZES',
          value: ['0rem', '0rem', '0rem', '0rem'],
        },
      ],
    },
  ],
}))();
