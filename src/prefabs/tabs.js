(() => ({
  name: 'Tabs',
  icon: 'TabsIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'Tabs',
      options: [
        {
          label: 'Selected tab index',
          key: 'defaultValue',
          value: '1',
          type: 'NUMBER',
        },
        {
          label: 'Show all tabs',
          key: 'showAllTabs',
          value: false,
          type: 'TOGGLE',
        },
        {
          value: 'top',
          label: 'Alignment',
          key: 'alignment',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Left', value: 'left' },
              { name: 'Top', value: 'top' },
              { name: 'Right', value: 'right' },
              { name: 'Bottom', value: 'bottom' },
            ],
          },
        },
        {
          label: 'Variant',
          key: 'variant',
          value: 'standard',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Standard', value: 'standard' },
              { name: 'Scrollable', value: 'scrollable' },
              { name: 'Full width', value: 'fullWidth' },
            ],
          },
        },
        {
          label: 'Scrollbuttons',
          key: 'scrollButtons',
          value: 'auto',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Auto', value: 'auto' },
              { name: 'Desktop', value: 'desktop' },
              { name: 'Always', value: 'on' },
              { name: 'Never', value: 'off' },
            ],
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'scrollable',
            },
          },
        },
        {
          type: 'TOGGLE',
          label: 'Centered',
          key: 'centered',
          value: false,
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'orientation',
              comparator: 'EQ',
              value: 'horizontal',
            },
          },
        },
        {
          label: 'Bar color',
          key: 'appBarColor',
          value: 'Primary',
          type: 'COLOR',
        },
        {
          label: 'Text color',
          key: 'textColor',
          value: 'White',
          type: 'COLOR',
        },
        {
          label: 'Indicator color',
          key: 'indicatorColor',
          value: 'Success',
          type: 'COLOR',
        },
        {
          label: 'Hide visual tabs',
          key: 'hideTabs',
          value: false,
          type: 'TOGGLE',
        },
      ],
      descendants: [
        {
          name: 'Tab',
          options: [
            {
              label: 'Tab label',
              key: 'label',
              value: ['TAB'],
              type: 'VARIABLE',
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
                    name: '',
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
              label: 'Icon Alignment',
              key: 'iconAlignment',
              value: 'top',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Left', value: 'left' },
                  { name: 'Top', value: 'top' },
                  { name: 'Right', value: 'right' },
                  { name: 'Bottom', value: 'bottom' },
                ],
                condition: {
                  type: 'HIDE',
                  option: 'icon',
                  comparator: 'EQ',
                  value: 'None',
                },
              },
            },
            {
              type: 'TOGGLE',
              label: 'Disabled',
              key: 'disabled',
              value: false,
            },
            {
              type: 'TOGGLE',
              label: 'Disable ripple',
              key: 'disableRipple',
              value: false,
            },
          ],
          descendants: [],
        },
      ],
    },
  ],
}))();
