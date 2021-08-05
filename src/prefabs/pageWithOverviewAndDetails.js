(() => ({
  name: 'Overview and detail view',
  icon: 'DataTable',
  type: 'page',
  description:
    'This is a page contains a data table with detail view, vertically oriented',
  detail:
    'Display your data in a Data Table by connecting a model. The details of this data is shown on the same page via a detail view (vertically oriented). This page template also contains an App Bar on top of the page.',
  previewUrl: 'https://preview.betty.app/overview-and-detail-view',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Overview_And_Detail_View.jpg',
  category: 'LAYOUT',
  beforeCreate: ({
    components: {
      Content,
      Header,
      Field,
      Footer,
      ModelSelector,
      PropertiesSelector,
      Text,
      Box,
      Button,
    },
    prefab,
    save,
    close,
    helpers: { useModelQuery },
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [properties, setProperties] = React.useState([]);
    const [detailProperties, setDetailProperties] = React.useState([]);
    const [modelValidation, setModelValidation] = React.useState(false);
    const [propertiesValidation, setPropertiesValidation] = React.useState(
      false,
    );
    const [detailsValidation, setDetailsValidation] = React.useState(false);
    const [stepNumber, setStepNumber] = React.useState(1);

    const rowOptions = width => {
      const widthOption = width || 'XL';
      const rowOption = [
        {
          type: 'CUSTOM',
          label: 'Width',
          key: 'maxRowWidth',
          value: widthOption,
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
        },
        {
          value: '',
          label: 'Height',
          key: 'rowHeight',
          type: 'TEXT',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          value: 'transparent',
          label: 'Background color',
          key: 'backgroundColor',
          type: 'COLOR',
        },
        {
          value: ['0rem', '0rem', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
      ];
      return rowOption;
    };

    const columnOptions = (innerSpace, columnWidth) => {
      const innerSpaceOption = innerSpace || ['M', 'M', 'M', 'M'];
      const columnWidthOptions = columnWidth || [
        'flexible',
        'flexible',
        'flexible',
        'flexible',
      ];
      const columnOption = [
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
          value: columnWidthOptions[0],
          label: 'Column width',
          key: 'columnWidth',
          type: 'CUSTOM',
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
        {
          value: columnWidthOptions[1],
          label: 'Column width (tablet landscape)',
          key: 'columnWidthTabletLandscape',
          type: 'CUSTOM',
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
        {
          value: columnWidthOptions[2],
          label: 'Column width (tablet portrait)',
          key: 'columnWidthTabletPortrait',
          type: 'CUSTOM',
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
        {
          value: columnWidthOptions[3],
          label: 'Column width (mobile)',
          key: 'columnWidthMobile',
          type: 'CUSTOM',
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
        {
          value: '',
          label: 'Height',
          key: 'columnHeight',
          type: 'TEXT',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          value: 'transparent',
          label: 'Background color',
          key: 'backgroundColor',
          type: 'COLOR',
        },
        {
          type: 'CUSTOM',
          label: 'Horizontal Alignment',
          key: 'horizontalAlignment',
          value: 'inherit',
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
        {
          type: 'CUSTOM',
          label: 'Vertical Alignment',
          key: 'verticalAlignment',
          value: 'inherit',
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
        {
          value: ['0rem', '0rem', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          value: innerSpaceOption,
          label: 'Inner space',
          key: 'innerSpacing',
          type: 'SIZES',
        },
      ];
      return columnOption;
    };

    const iconConfiguration = {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'None', value: 'none' },
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
    };

    const getDescendantByRef = (refValue, structure) =>
      structure.reduce((acc, component) => {
        if (acc) return acc;
        if (
          // eslint-disable-next-line no-prototype-builtins
          component.hasOwnProperty('ref') &&
          Object.values(component.ref).indexOf(refValue) > -1
        ) {
          return component;
        }
        return getDescendantByRef(refValue, component.descendants);
      }, null);

    const { data } = useModelQuery({
      variables: { id: modelId },
      skip: !modelId,
    });

    const enrichVarObj = obj => {
      const returnObj = obj;
      if (data && data.model) {
        const property = data.model.properties.find(
          prop => prop.id === obj.id[0],
        );
        if (property) {
          returnObj.name = `{{ ${data.model.name}.${property.name} }}`;
        }
      }
      return returnObj;
    };

    const stepper = {
      setStep: step => {
        if (step === 1) {
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
                  onChange={value => {
                    setModelValidation(false);
                    setModelId(value);
                    setPropertiesValidation(false);
                    setDetailsValidation(false);
                  }}
                  value={modelId}
                />
              </Field>
              <Field
                label="Columns in data table"
                error={
                  propertiesValidation && (
                    <Text color="#e82600">
                      Selecting a property is required
                    </Text>
                  )
                }
              >
                <PropertiesSelector
                  modelId={modelId}
                  value={properties}
                  disabledKinds={[
                    'HAS_AND_BELONGS_TO_MANY',
                    'HAS_MANY',
                    'MULTI_FILE',
                    'AUTO_INCREMENT',
                    'COUNT',
                    'MULTI_IMAGE',
                    'PDF',
                    'SIGNED_PDF',
                    'SUM',
                  ]}
                  onChange={value => {
                    setPropertiesValidation(!value.length);
                    setProperties(value);
                  }}
                />
              </Field>
            </>
          );
        }
        return (
          <Field
            label="Details"
            error={
              detailsValidation && (
                <Text color="#e82600">Selecting a property is required</Text>
              )
            }
          >
            <Text color="#666D85">
              These properties will be visible in the detail section
            </Text>
            <PropertiesSelector
              modelId={modelId}
              value={detailProperties}
              onChange={value => {
                setDetailsValidation(!value.length);
                setDetailProperties(value);
              }}
            />
          </Field>
        );
      },
      onSave: () => {
        if (!modelId || !properties.length || !detailProperties.length) {
          setModelValidation(!modelId);
          setPropertiesValidation(!properties.length);
          setDetailsValidation(!detailProperties.length);
          return;
        }
        const newPrefab = { ...prefab };

        const prefabStructure = [
          {
            name: 'Column',
            options: columnOptions(['0rem', '0rem', '0rem', '0rem']),
            descendants: [
              {
                name: 'AppBar',
                options: [
                  {
                    label: 'Background color',
                    key: 'backgroundColor',
                    value: 'Primary',
                    type: 'COLOR',
                  },
                  {
                    label: 'Text color',
                    key: 'color',
                    value: 'White',
                    type: 'COLOR',
                  },
                  {
                    type: 'SIZE',
                    label: 'Height',
                    key: 'height',
                    value: '',
                    configuration: {
                      as: 'UNIT',
                    },
                  },
                  {
                    label: 'Position',
                    key: 'position',
                    value: 'static',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
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
                    },
                  },
                  {
                    label: 'Title',
                    key: 'title',
                    value: ['App Bar'],
                    type: 'VARIABLE',
                  },
                  {
                    label: 'Logo',
                    key: 'logoSource',
                    value: [],
                    type: 'VARIABLE',
                  },
                  {
                    type: 'SIZE',
                    label: 'Logo Width',
                    key: 'logoWidth',
                    value: '150px',
                    configuration: {
                      as: 'UNIT',
                    },
                  },
                  {
                    label: 'Align items',
                    key: 'alignItems',
                    value: 'right',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
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
                    },
                  },
                  {
                    label: 'Page',
                    key: 'endpoint',
                    value: '',
                    type: 'ENDPOINT',
                  },
                  {
                    label: 'Variant',
                    key: 'appBarVariant',
                    value: 'elevation',
                    type: 'CUSTOM',
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
                        option: 'appBarVariant',
                        comparator: 'EQ',
                        value: 'elevation',
                      },
                    },
                  },
                  {
                    label: 'Square',
                    key: 'square',
                    value: true,
                    type: 'TOGGLE',
                  },
                  {
                    label: 'Size',
                    key: 'toolbarVariant',
                    value: 'regular',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
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
                    },
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
                        type: 'VARIABLE',
                        label: 'Button text',
                        key: 'buttonText',
                        value: ['Menu 1'],
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
                        value: false,
                        label: 'Full width',
                        key: 'fullWidth',
                        type: 'TOGGLE',
                      },
                      {
                        label: 'Icon',
                        key: 'icon',
                        value: 'None',
                        type: 'CUSTOM',
                        configuration: iconConfiguration,
                      },
                      {
                        value: 'small',
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
                          condition: {
                            type: 'HIDE',
                            option: 'icon',
                            comparator: 'EQ',
                            value: 'None',
                          },
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
                            option: 'icon',
                            comparator: 'EQ',
                            value: 'None',
                          },
                          allowedInput: [
                            { name: 'Start', value: 'start' },
                            { name: 'End', value: 'end' },
                          ],
                        },
                      },
                      {
                        value: ['0rem', 'M', '0rem', '0rem'],
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
                      {
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
                          condition: {
                            type: 'SHOW',
                            option: 'addTooltip',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  },
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
                        type: 'VARIABLE',
                        label: 'Button text',
                        key: 'buttonText',
                        value: ['Menu 2'],
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
                        value: false,
                        label: 'Full width',
                        key: 'fullWidth',
                        type: 'TOGGLE',
                      },
                      {
                        label: 'Icon',
                        key: 'icon',
                        value: 'None',
                        type: 'CUSTOM',
                        configuration: iconConfiguration,
                      },
                      {
                        value: 'small',
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
                          condition: {
                            type: 'HIDE',
                            option: 'icon',
                            comparator: 'EQ',
                            value: 'None',
                          },
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
                          allowedInput: [
                            { name: 'Start', value: 'start' },
                            { name: 'End', value: 'end' },
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
                      {
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
                          condition: {
                            type: 'SHOW',
                            option: 'addTooltip',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  },
                ],
              },
              {
                name: 'Row',
                options: rowOptions(),
                descendants: [
                  {
                    name: 'Column',
                    options: columnOptions(),
                    descendants: [
                      {
                        name: 'DataTable',
                        ref: {
                          id: '#dataTable',
                        },
                        options: [
                          {
                            value: modelId,
                            label: 'Model',
                            key: 'model',
                            type: 'MODEL',
                          },
                          {
                            value: {},
                            label: 'Filter',
                            key: 'filter',
                            type: 'FILTER',
                            configuration: {
                              dependsOn: 'model',
                            },
                          },
                          {
                            value: '',
                            label: 'Order by',
                            key: 'orderProperty',
                            type: 'PROPERTY',
                            configuration: {
                              dependsOn: 'model',
                            },
                          },
                          {
                            value: 'asc',
                            label: 'Sort order',
                            key: 'sortOrder',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Ascending', value: 'asc' },
                                { name: 'Descending', value: 'desc' },
                              ],
                              condition: {
                                type: 'HIDE',
                                option: 'orderProperty',
                                comparator: 'EQ',
                                value: '',
                              },
                            },
                          },
                          {
                            value: '',
                            label: 'Search on property',
                            key: 'searchProperty',
                            type: 'PROPERTY',
                            configuration: {
                              dependsOn: 'model',
                            },
                          },
                          {
                            value: '',
                            label: 'Hide built-in search field',
                            key: 'hideSearch',
                            type: 'TOGGLE',
                          },
                          {
                            type: 'VARIABLE',
                            label: 'Search on text',
                            key: 'labelSearchOn',
                            value: ['Search on'],
                            configuration: {
                              condition: {
                                type: 'HIDE',
                                option: 'hideSearch',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: '',
                            label: 'Authentication Profile',
                            key: 'authProfile',
                            type: 'AUTHENTICATION_PROFILE',
                          },
                          {
                            type: 'VARIABLE',
                            label: 'Title',
                            key: 'title',
                            value: [`${data.model.name}s`],
                          },
                          {
                            value: 'Title4',
                            label: 'Title type',
                            key: 'titleType',
                            type: 'FONT',
                          },
                          {
                            label: 'Pagination',
                            key: 'pagination',
                            value: 'always',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Always', value: 'always' },
                                { name: 'When needed', value: 'whenNeeded' },
                                { name: 'Never', value: 'never' },
                              ],
                            },
                          },
                          {
                            value: false,
                            label: 'Auto load on scroll',
                            key: 'autoLoadOnScroll',
                            type: 'TOGGLE',
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'pagination',
                                comparator: 'EQ',
                                value: 'never',
                              },
                            },
                          },
                          {
                            value: '50',
                            label: 'Number of records to auto load',
                            key: 'autoLoadTakeAmount',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                { name: '5', value: '5' },
                                { name: '10', value: '10' },
                                { name: '25', value: '25' },
                                { name: '50', value: '50' },
                                { name: '100', value: '100' },
                              ],
                              condition: {
                                type: 'SHOW',
                                option: 'autoLoadOnScroll',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: '5',
                            label: 'Rows per page',
                            key: 'take',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                { name: '5', value: '5' },
                                { name: '10', value: '10' },
                                { name: '25', value: '25' },
                                { name: '50', value: '50' },
                                { name: '100', value: '100' },
                              ],
                              condition: {
                                type: 'HIDE',
                                option: 'autoLoadOnScroll',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: '',
                            label: 'Placeholder rows',
                            key: 'placeholderTake',
                            type: 'NUMBER',
                          },
                          {
                            type: 'VARIABLE',
                            label: 'Rows per page text',
                            key: 'labelRowsPerPage',
                            value: ['Rows per page'],
                            configuration: {
                              condition: {
                                type: 'HIDE',
                                option: 'pagination',
                                comparator: 'EQ',
                                value: 'never',
                              },
                            },
                          },
                          {
                            type: 'VARIABLE',
                            label: "Pagination label (x 'of' y)",
                            key: 'labelNumberOfPages',
                            value: ['of'],
                            configuration: {
                              condition: {
                                type: 'HIDE',
                                option: 'pagination',
                                comparator: 'EQ',
                                value: 'never',
                              },
                            },
                          },
                          {
                            type: 'SIZE',
                            label: 'Height',
                            key: 'height',
                            value: '',
                            configuration: {
                              as: 'UNIT',
                            },
                          },
                          {
                            type: 'TOGGLE',
                            label: 'Sticky header',
                            key: 'stickyHeader',
                            value: false,
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
                                { name: 'Small', value: 'small' },
                                { name: 'Medium', value: 'medium' },
                              ],
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
                            label: 'Background header',
                            key: 'backgroundHeader',
                            value: 'Transparent',
                          },
                          {
                            label: 'Square',
                            key: 'square',
                            value: true,
                            type: 'TOGGLE',
                          },
                          {
                            label: 'Striped',
                            key: 'striped',
                            value: false,
                            type: 'TOGGLE',
                          },
                          {
                            type: 'COLOR',
                            label: 'Stripe color',
                            key: 'stripeColor',
                            value: 'Light',
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'striped',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
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
                                { name: 'Flat', value: 'flat' },
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
                          {
                            value: '',
                            label: 'Row click',
                            key: 'linkTo',
                            type: 'ENDPOINT',
                          },
                          {
                            type: 'COLOR',
                            label: 'Row hover color',
                            key: 'backgroundRowHover',
                            value: 'Transparent',
                            configuration: {
                              condition: {
                                type: 'HIDE',
                                option: 'linkTo',
                                comparator: 'EQ',
                                value: '',
                              },
                            },
                          },
                          {
                            value: ['0rem', '0rem', 'M', '0rem'],
                            label: 'Outer space',
                            key: 'outerSpacing',
                            type: 'SIZES',
                          },
                          {
                            value: 'built-in',
                            label: 'Error message',
                            key: 'showError',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Built in', value: 'built-in' },
                                { name: 'Interaction', value: 'interaction' },
                              ],
                            },
                          },
                        ],
                        descendants: [],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Row',
                options: rowOptions(),
                descendants: [
                  {
                    name: 'Column',
                    options: columnOptions(),
                    descendants: [
                      {
                        name: 'DataContainer',
                        ref: {
                          id: '#dataContainer',
                        },
                        options: [
                          {
                            value: modelId,
                            label: 'Model',
                            key: 'model',
                            type: 'MODEL',
                          },
                          {
                            value: '',
                            label: 'Current Record',
                            key: 'currentRecord',
                            type: 'NUMBER',
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'currentRecord',
                                comparator: 'EQ',
                                value: 'never',
                              },
                            },
                          },
                          {
                            value: {},
                            label: 'Filter',
                            key: 'filter',
                            type: 'FILTER',
                            configuration: {
                              dependsOn: 'model',
                            },
                          },
                          {
                            value: '',
                            label: 'Authentication Profile',
                            key: 'authProfile',
                            type: 'AUTHENTICATION_PROFILE',
                          },
                          {
                            value: '',
                            label: 'Redirect when no result',
                            key: 'redirectWithoutResult',
                            type: 'ENDPOINT',
                          },
                          {
                            value: 'built-in',
                            label: 'Error message',
                            key: 'showError',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Built in', value: 'built-in' },
                                { name: 'Interaction', value: 'interaction' },
                              ],
                            },
                          },
                          {
                            value: 'default',
                            label: 'Show on load',
                            key: 'loadingType',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Message', value: 'default' },
                                { name: 'Content', value: 'showChildren' },
                              ],
                            },
                          },
                          {
                            value: ['Loading...'],
                            label: 'Loading text',
                            key: 'loadingText',
                            type: 'VARIABLE',
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'loadingType',
                                comparator: 'EQ',
                                value: 'default',
                              },
                            },
                          },
                        ],
                        descendants: [
                          {
                            name: 'Paper',
                            options: [
                              {
                                label: 'Square',
                                key: 'square',
                                value: true,
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
                                    { name: 'Flat', value: 'flat' },
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
                              {
                                value: ['0rem', '0rem', '0rem', '0rem'],
                                label: 'Outer space',
                                key: 'outerSpacing',
                                type: 'SIZES',
                              },
                            ],
                            descendants: [
                              {
                                name: 'Row',
                                ref: {
                                  id: '#detailRow',
                                },
                                options: rowOptions('Full'),
                                descendants: [
                                  {
                                    name: 'Column',
                                    options: columnOptions(
                                      ['M', 'M', '0rem', 'M'],
                                      ['12', '12', '12', '12'],
                                    ),
                                    descendants: [
                                      {
                                        name: 'Text',
                                        options: [
                                          {
                                            type: 'VARIABLE',
                                            label: 'Content',
                                            key: 'content',
                                            value: ['Details'],
                                            configuration: {
                                              as: 'MULTILINE',
                                            },
                                          },
                                          {
                                            type: 'TOGGLE',
                                            label: 'Display Rich Text',
                                            key: 'useInnerHtml',
                                            value: false,
                                          },
                                          {
                                            value: 'Title4',
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
                                          {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                            label: 'Outer space',
                                            key: 'outerSpacing',
                                            type: 'SIZES',
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
                                                {
                                                  name: 'Internal page',
                                                  value: 'internal',
                                                },
                                                {
                                                  name: 'External page',
                                                  value: 'external',
                                                },
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
                                              placeholder:
                                                'Starts with https:// or http://',
                                              condition: {
                                                type: 'SHOW',
                                                option: 'linkType',
                                                comparator: 'EQ',
                                                value: 'external',
                                              },
                                            },
                                          },
                                          {
                                            value: false,
                                            label: 'Styles',
                                            key: 'styles',
                                            type: 'TOGGLE',
                                          },
                                          {
                                            type: 'COLOR',
                                            label: 'Text color',
                                            key: 'textColor',
                                            value: 'Black',
                                            configuration: {
                                              condition: {
                                                type: 'SHOW',
                                                option: 'styles',
                                                comparator: 'EQ',
                                                value: true,
                                              },
                                            },
                                          },
                                          {
                                            type: 'CUSTOM',
                                            label: 'Font weight',
                                            key: 'fontWeight',
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
                                              condition: {
                                                type: 'SHOW',
                                                option: 'styles',
                                                comparator: 'EQ',
                                                value: true,
                                              },
                                            },
                                          },
                                        ],
                                        descendants: [],
                                      },
                                    ],
                                  },
                                  {
                                    name: 'Column',
                                    options: columnOptions(
                                      ['M', 'M', 'M', 'M'],
                                      ['6', '6', '6', '12'],
                                    ),
                                    descendants: [],
                                  },
                                  {
                                    name: 'Column',
                                    options: columnOptions(
                                      ['M', 'M', 'M', 'M'],
                                      ['6', '6', '6', '12'],
                                    ),
                                    descendants: [],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ];

        const dataTable = getDescendantByRef('#dataTable', prefabStructure);
        properties.forEach(property => {
          dataTable.descendants.push({
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
                value: property,
                label: 'Property',
                key: 'property',
                type: 'PROPERTY',
              },
              {
                type: 'TOGGLE',
                label: 'Sortable',
                key: 'sortable',
                value: true,
              },
              {
                type: 'VARIABLE',
                label: 'Header text',
                key: 'headerText',
                value: [''],
              },
              {
                value: 'Title6',
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
            ],
            descendants:
              property.kind === 'IMAGE'
                ? [
                    {
                      name: 'Media',
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
                          value: [property],
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
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'type',
                              comparator: 'EQ',
                              value: 'img',
                            },
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
                          value: [],
                          label: 'Image Alternative Text',
                          key: 'imgAlt',
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
                          label: 'Title',
                          key: 'title',
                          type: 'VARIABLE',
                        },
                        {
                          type: 'SIZE',
                          label: 'Width',
                          key: 'width',
                          value: '100%',
                          configuration: {
                            as: 'UNIT',
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Height',
                          key: 'height',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                          },
                        },
                        {
                          value: ['0rem', '0rem', 'M', '0rem'],
                          label: 'Outer space',
                          key: 'outerSpacing',
                          type: 'SIZES',
                        },
                      ],
                      descendants: [],
                    },
                  ]
                : [],
          });
        });
        const detailRow = getDescendantByRef('#detailRow', prefabStructure);
        const newDetail = (descIndex, detail) => {
          const detailColumn = {
            name: 'Row',
            options: rowOptions(),
            descendants: [
              {
                name: 'Column',
                options: columnOptions(),
                descendants: [
                  {
                    name: 'Text',
                    options: [
                      {
                        type: 'VARIABLE',
                        label: 'Content',
                        key: 'content',
                        value: [`${detail.label}`],
                        configuration: {
                          as: 'MULTILINE',
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Display Rich Text',
                        key: 'useInnerHtml',
                        value: false,
                      },
                      {
                        value: 'Title6',
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
                      {
                        type: 'CUSTOM',
                        label: 'Link to',
                        key: 'linkType',
                        value: 'internal',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
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
                        value: true,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Font weight',
                        key: 'fontWeight',
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
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  },
                  detail.kind === 'IMAGE'
                    ? {
                        name: 'Media',
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
                            value: [enrichVarObj(detail)],
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
                              ],
                              condition: {
                                type: 'SHOW',
                                option: 'type',
                                comparator: 'EQ',
                                value: 'img',
                              },
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
                            value: [],
                            label: 'Image Alternative Text',
                            key: 'imgAlt',
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
                            label: 'Title',
                            key: 'title',
                            type: 'VARIABLE',
                          },
                          {
                            type: 'SIZE',
                            label: 'Width',
                            key: 'width',
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          },
                          {
                            type: 'SIZE',
                            label: 'Height',
                            key: 'height',
                            value: '',
                            configuration: {
                              as: 'UNIT',
                            },
                          },
                          {
                            value: ['0rem', '0rem', 'M', '0rem'],
                            label: 'Outer space',
                            key: 'outerSpacing',
                            type: 'SIZES',
                          },
                        ],
                        descendants: [],
                      }
                    : {
                        name: 'Text',
                        options: [
                          {
                            type: 'VARIABLE',
                            label: 'Content',
                            key: 'content',
                            value: [enrichVarObj(detail)],
                            configuration: {
                              as: 'MULTILINE',
                            },
                          },
                          {
                            type: 'TOGGLE',
                            label: 'Display Rich Text',
                            key: 'useInnerHtml',
                            value: false,
                          },
                          {
                            value: 'Body1',
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
                          {
                            type: 'CUSTOM',
                            label: 'Link to',
                            key: 'linkType',
                            value: 'internal',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
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
                            value: false,
                            label: 'Styles',
                            key: 'styles',
                            type: 'TOGGLE',
                          },
                          {
                            type: 'COLOR',
                            label: 'Text color',
                            key: 'textColor',
                            value: 'Black',
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'styles',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            type: 'CUSTOM',
                            label: 'Font weight',
                            key: 'fontWeight',
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
                              condition: {
                                type: 'SHOW',
                                option: 'styles',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                        ],
                        descendants: [],
                      },
                ],
              },
            ],
          };
          detailRow.descendants[descIndex].descendants.push(detailColumn);
        };

        detailProperties.forEach((detail, detailIndex) => {
          const isOdd = num => num % 2;
          if (isOdd(detailIndex)) {
            newDetail(2, detail);
          } else {
            newDetail(1, detail);
          }
        });

        const idProperty = data.model.properties.find(
          property => property.name === 'id',
        );

        const interactions = [
          {
            name: 'setCurrentRecord',
            sourceEvent: 'OnRowClick',
            parameters: [
              {
                parameter: 'argument',
                id: [idProperty.id],
              },
            ],
            ref: {
              targetComponentId: '#dataContainer',
              sourceComponentId: '#dataTable',
            },
            targetOptionName: 'currentRecord',
            type: 'Global',
          },
        ];

        newPrefab.structure[0].descendants = [...prefabStructure];
        newPrefab.interactions = interactions;

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
                if (!modelId) {
                  setModelValidation(true);
                  return;
                }
                if (!properties.length) {
                  setPropertiesValidation(true);
                  return;
                }
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
      progressBar: titles => {
        const titlesArray = titles;
        return (
          <Box
            justify="center"
            margin={{ bottom: '2rem', left: '2rem', top: '-1rem' }}
          >
            <Text size="medium" weight="bold">{`Step: ${stepNumber} / ${
              stepper.stepAmount
            } - ${titlesArray[stepNumber - 1]}`}</Text>
          </Box>
        );
      },
      stepAmount: 2,
    };

    return (
      <>
        <Header onClose={close} title="Configure data table and details" />
        {stepper.progressBar(['Configure Data Table', 'Configure Details'])}
        <Content>{stepper.setStep(stepNumber)}</Content>
        {stepper.buttons()}
      </>
    );
  },
  actions: [],
  interactions: [],
  structure: [
    {
      name: 'Row',
      options: [
        {
          type: 'CUSTOM',
          label: 'Width',
          key: 'maxRowWidth',
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
        },
        {
          value: '',
          label: 'Height',
          key: 'rowHeight',
          type: 'TEXT',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          value: 'transparent',
          label: 'Background color',
          key: 'backgroundColor',
          type: 'COLOR',
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
}))();
