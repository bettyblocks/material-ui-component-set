(() => ({
  name: 'Card and list view',
  icon: 'DataList',
  type: 'page',
  description:
    'Toggle the view of your content between a card view or a list view.',
  detail:
    'Display your data in different views such as a list or a card view via a toggle. This page template also contains a custom search functionality to filter your data.',
  previewUrl: 'https://preview.betty.app/card-and-list-view',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Card_And_List_View.jpg',
  category: 'LAYOUT',
  beforeCreate: ({
    helpers: { useModelQuery },
    prefab,
    save,
    close,
    components: {
      Header,
      Content,
      Field,
      Footer,
      Text,
      Box,
      ModelSelector,
      PropertySelector,
    },
  }) => {
    const [showValidation, setShowValidation] = React.useState(false);
    const [modelId, setModelId] = React.useState('');
    const [imageProperty, setImageProperty] = React.useState('');
    const [titleProperty, setTitleProperty] = React.useState('');
    const [subheaderProperty, setSubheaderProperty] = React.useState('');
    const [descriptionProperty, setDescriptionProperty] = React.useState('');

    const { data } = useModelQuery({
      variables: { id: modelId },
      skip: !modelId,
    });

    const enrichVarObj = obj => {
      const returnObj = obj;
      if (data && data.model) {
        const property = data.model.properties.find(prop => prop.id === obj.id);
        if (property) {
          returnObj.name = `{{ ${data.model.name}.${property.name} }}`;
        }
      }
      return returnObj;
    };

    const iconConfiguration = {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: 'None', value: 'None' },
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

    const prefabStructure = [
      {
        name: 'Column',
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
            value: '12',
            label: 'Column width',
            key: 'columnWidth',
            type: 'CUSTOM',
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
          },
          {
            value: '12',
            label: 'Column width (tablet landscape)',
            key: 'columnWidthTabletLandscape',
            type: 'CUSTOM',
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
          },
          {
            value: '12',
            label: 'Column width (tablet portrait)',
            key: 'columnWidthTabletPortrait',
            type: 'CUSTOM',
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
          },
          {
            value: '12',
            label: 'Column width (mobile)',
            key: 'columnWidthMobile',
            type: 'CUSTOM',
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
                { name: 'None', value: 'inherit' },
                { name: 'Left', value: 'flex-start' },
                { name: 'Center', value: 'center' },
                { name: 'Right', value: 'flex-end' },
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
                { name: 'None', value: 'inherit' },
                { name: 'Top', value: 'flex-start' },
                { name: 'Center', value: 'center' },
                { name: 'Bottom', value: 'flex-end' },
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
            value: ['0rem', '0rem', '0rem', '0rem'],
            label: 'Inner space',
            key: 'innerSpacing',
            type: 'SIZES',
          },
        ],
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
                value: ['Card and list view'],
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
                    label: 'Icon size',
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
                    label: 'Icon size',
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
        ],
      },
      {
        name: 'Column',
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
            value: '12',
            label: 'Column width',
            key: 'columnWidth',
            type: 'CUSTOM',
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
          },
          {
            value: '12',
            label: 'Column width (tablet landscape)',
            key: 'columnWidthTabletLandscape',
            type: 'CUSTOM',
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
          },
          {
            value: '12',
            label: 'Column width (tablet portrait)',
            key: 'columnWidthTabletPortrait',
            type: 'CUSTOM',
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
          },
          {
            value: '12',
            label: 'Column width (mobile)',
            key: 'columnWidthMobile',
            type: 'CUSTOM',
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
                { name: 'None', value: 'inherit' },
                { name: 'Left', value: 'flex-start' },
                { name: 'Center', value: 'center' },
                { name: 'Right', value: 'flex-end' },
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
                { name: 'None', value: 'inherit' },
                { name: 'Top', value: 'flex-start' },
                { name: 'Center', value: 'center' },
                { name: 'Bottom', value: 'flex-end' },
              ],
            },
          },
          {
            value: ['XL', '0rem', '0rem', '0rem'],
            label: 'Outer space',
            key: 'outerSpacing',
            type: 'SIZES',
          },
          {
            value: ['XL', 'M', 'M', 'M'],
            label: 'Inner space',
            key: 'innerSpacing',
            type: 'SIZES',
          },
        ],
        descendants: [
          {
            name: 'Row',
            options: [
              {
                type: 'CUSTOM',
                label: 'Width',
                key: 'maxRowWidth',
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
            descendants: [
              {
                name: 'Column',
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
                    value: 'flexible',
                    label: 'Column width',
                    key: 'columnWidth',
                    type: 'CUSTOM',
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
                  },
                  {
                    value: 'flexible',
                    label: 'Column width (tablet landscape)',
                    key: 'columnWidthTabletLandscape',
                    type: 'CUSTOM',
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
                  },
                  {
                    value: 'flexible',
                    label: 'Column width (tablet portrait)',
                    key: 'columnWidthTabletPortrait',
                    type: 'CUSTOM',
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
                  },
                  {
                    value: 'flexible',
                    label: 'Column width (mobile)',
                    key: 'columnWidthMobile',
                    type: 'CUSTOM',
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
                        { name: 'None', value: 'inherit' },
                        { name: 'Left', value: 'flex-start' },
                        { name: 'Center', value: 'center' },
                        { name: 'Right', value: 'flex-end' },
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
                        { name: 'None', value: 'inherit' },
                        { name: 'Top', value: 'flex-start' },
                        { name: 'Center', value: 'center' },
                        { name: 'Bottom', value: 'flex-end' },
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
                    value: ['0rem', '0rem', '0rem', '0rem'],
                    label: 'Inner space',
                    key: 'innerSpacing',
                    type: 'SIZES',
                  },
                ],
                descendants: [
                  {
                    name: 'Box',
                    options: [
                      {
                        value: 'space-between',
                        label: 'Alignment',
                        key: 'alignment',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Left', value: 'flex-start' },
                            { name: 'Center', value: 'center' },
                            { name: 'Right', value: 'flex-end' },
                            { name: 'Justified', value: 'space-between' },
                          ],
                        },
                      },
                      {
                        value: 'center',
                        label: 'Vertical alignment',
                        key: 'valignment',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Top', value: 'flex-start' },
                            { name: 'Center', value: 'center' },
                            { name: 'Bottom', value: 'flex-end' },
                          ],
                        },
                      },
                      {
                        value: false,
                        label: 'Stretch (when in flex container)',
                        key: 'stretch',
                        type: 'TOGGLE',
                      },
                      {
                        value: false,
                        label: 'Transparent',
                        key: 'transparent',
                        type: 'TOGGLE',
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
                        type: 'SIZE',
                        label: 'Width',
                        key: 'width',
                        value: '',
                        configuration: {
                          as: 'UNIT',
                        },
                      },
                      {
                        value: ['0rem', '0rem', '0rem', '0rem'],
                        label: 'Outer space',
                        key: 'outerSpacing',
                        type: 'SIZES',
                      },
                      {
                        value: ['0rem', '0rem', '0rem', '0rem'],
                        label: 'Inner space',
                        key: 'innerSpacing',
                        type: 'SIZES',
                      },
                      {
                        value: false,
                        label: 'Show positioning options',
                        key: 'positioningOptions',
                        type: 'TOGGLE',
                      },
                      {
                        value: 'static',
                        label: 'Position',
                        key: 'position',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Static', value: 'static' },
                            { name: 'Relative', value: 'relative' },
                            { name: 'Absolute', value: 'absolute' },
                            { name: 'Fixed', value: 'fixed' },
                            { name: 'Sticky', value: 'sticky' },
                          ],
                          condition: {
                            type: 'SHOW',
                            option: 'positioningOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'SIZE',
                        label: 'Top position',
                        key: 'top',
                        value: '',
                        configuration: {
                          as: 'UNIT',
                          condition: {
                            type: 'SHOW',
                            option: 'positioningOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'SIZE',
                        label: 'Right position',
                        key: 'right',
                        value: '',
                        configuration: {
                          as: 'UNIT',
                          condition: {
                            type: 'SHOW',
                            option: 'positioningOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'SIZE',
                        label: 'Bottom position',
                        key: 'bottom',
                        value: '',
                        configuration: {
                          as: 'UNIT',
                          condition: {
                            type: 'SHOW',
                            option: 'positioningOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'SIZE',
                        label: 'Left position',
                        key: 'left',
                        value: '',
                        configuration: {
                          as: 'UNIT',
                          condition: {
                            type: 'SHOW',
                            option: 'positioningOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Show background options',
                        key: 'backgroundOptions',
                        type: 'TOGGLE',
                      },
                      {
                        value: 'Transparent',
                        label: 'Background color',
                        key: 'backgroundColor',
                        type: 'COLOR',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'backgroundOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: 100,
                        label: 'Background color opacity',
                        key: 'backgroundColorAlpha',
                        type: 'NUMBER',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'backgroundOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: [''],
                        label: 'Background url',
                        key: 'backgroundUrl',
                        type: 'VARIABLE',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'backgroundOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: 'initial',
                        label: 'Background size',
                        key: 'backgroundSize',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Initial', value: 'initial' },
                            { name: 'Contain', value: 'contain' },
                            { name: 'Cover', value: 'cover' },
                          ],
                          condition: {
                            type: 'SHOW',
                            option: 'backgroundOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: 'center center',
                        label: 'Background position',
                        key: 'backgroundPosition',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'DROPDOWN',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Left top', value: 'left top' },
                            { name: 'Left center', value: 'left center' },
                            { name: 'Left bottom', value: 'left bottom' },
                            { name: 'Center top', value: 'center top' },
                            { name: 'Center center', value: 'center center' },
                            { name: 'Center bottom', value: 'center bottom' },
                            { name: 'Right top', value: 'right top' },
                            { name: 'Right center', value: 'right center' },
                            { name: 'Right bottom', value: 'right bottom' },
                          ],
                          condition: {
                            type: 'SHOW',
                            option: 'backgroundOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: 'no-repeat',
                        label: 'Background repeat',
                        key: 'backgroundRepeat',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'no-repeat' },
                            { name: 'X', value: 'repeat-x' },
                            { name: 'Y', value: 'repeat-y' },
                            { name: 'All', value: 'repeat' },
                          ],
                          condition: {
                            type: 'SHOW',
                            option: 'backgroundOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: 'Transparent',
                        label: 'Border color',
                        key: 'borderColor',
                        type: 'COLOR',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'backgroundOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'SIZE',
                        label: 'Border thickness',
                        key: 'borderWidth',
                        value: '',
                        configuration: {
                          as: 'UNIT',
                          condition: {
                            type: 'SHOW',
                            option: 'backgroundOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        value: 'solid',
                        label: 'Border style',
                        key: 'borderStyle',
                        type: 'CUSTOM',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Solid', value: 'solid' },
                            { name: 'Dashed', value: 'dashed' },
                            { name: 'Dotted', value: 'dotted' },
                          ],
                          condition: {
                            type: 'SHOW',
                            option: 'backgroundOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'SIZE',
                        label: 'Border radius',
                        key: 'borderRadius',
                        value: '',
                        configuration: {
                          as: 'UNIT',
                          condition: {
                            type: 'SHOW',
                            option: 'backgroundOptions',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [
                      {
                        name: 'Text',
                        options: [
                          {
                            type: 'VARIABLE',
                            label: 'Content',
                            key: 'content',
                            value: ['Overview'],
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
                      {
                        name: 'Box',
                        options: [
                          {
                            value: 'none',
                            label: 'Alignment',
                            key: 'alignment',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'None', value: 'none' },
                                { name: 'Left', value: 'flex-start' },
                                { name: 'Center', value: 'center' },
                                { name: 'Right', value: 'flex-end' },
                                { name: 'Justified', value: 'space-between' },
                              ],
                            },
                          },
                          {
                            value: 'none',
                            label: 'Vertical alignment',
                            key: 'valignment',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'None', value: 'none' },
                                { name: 'Top', value: 'flex-start' },
                                { name: 'Center', value: 'center' },
                                { name: 'Bottom', value: 'flex-end' },
                              ],
                            },
                          },
                          {
                            value: false,
                            label: 'Stretch (when in flex container)',
                            key: 'stretch',
                            type: 'TOGGLE',
                          },
                          {
                            value: false,
                            label: 'Transparent',
                            key: 'transparent',
                            type: 'TOGGLE',
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
                            type: 'SIZE',
                            label: 'Width',
                            key: 'width',
                            value: '',
                            configuration: {
                              as: 'UNIT',
                            },
                          },
                          {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                            label: 'Outer space',
                            key: 'outerSpacing',
                            type: 'SIZES',
                          },
                          {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                            label: 'Inner space',
                            key: 'innerSpacing',
                            type: 'SIZES',
                          },
                          {
                            value: false,
                            label: 'Show positioning options',
                            key: 'positioningOptions',
                            type: 'TOGGLE',
                          },
                          {
                            value: 'static',
                            label: 'Position',
                            key: 'position',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Static', value: 'static' },
                                { name: 'Relative', value: 'relative' },
                                { name: 'Absolute', value: 'absolute' },
                                { name: 'Fixed', value: 'fixed' },
                                { name: 'Sticky', value: 'sticky' },
                              ],
                              condition: {
                                type: 'SHOW',
                                option: 'positioningOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            type: 'SIZE',
                            label: 'Top position',
                            key: 'top',
                            value: '',
                            configuration: {
                              as: 'UNIT',
                              condition: {
                                type: 'SHOW',
                                option: 'positioningOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            type: 'SIZE',
                            label: 'Right position',
                            key: 'right',
                            value: '',
                            configuration: {
                              as: 'UNIT',
                              condition: {
                                type: 'SHOW',
                                option: 'positioningOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            type: 'SIZE',
                            label: 'Bottom position',
                            key: 'bottom',
                            value: '',
                            configuration: {
                              as: 'UNIT',
                              condition: {
                                type: 'SHOW',
                                option: 'positioningOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            type: 'SIZE',
                            label: 'Left position',
                            key: 'left',
                            value: '',
                            configuration: {
                              as: 'UNIT',
                              condition: {
                                type: 'SHOW',
                                option: 'positioningOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: false,
                            label: 'Show background options',
                            key: 'backgroundOptions',
                            type: 'TOGGLE',
                          },
                          {
                            value: 'Transparent',
                            label: 'Background color',
                            key: 'backgroundColor',
                            type: 'COLOR',
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'backgroundOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: 100,
                            label: 'Background color opacity',
                            key: 'backgroundColorAlpha',
                            type: 'NUMBER',
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'backgroundOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: [''],
                            label: 'Background url',
                            key: 'backgroundUrl',
                            type: 'VARIABLE',
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'backgroundOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: 'initial',
                            label: 'Background size',
                            key: 'backgroundSize',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Initial', value: 'initial' },
                                { name: 'Contain', value: 'contain' },
                                { name: 'Cover', value: 'cover' },
                              ],
                              condition: {
                                type: 'SHOW',
                                option: 'backgroundOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: 'center center',
                            label: 'Background position',
                            key: 'backgroundPosition',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'DROPDOWN',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Left top', value: 'left top' },
                                { name: 'Left center', value: 'left center' },
                                { name: 'Left bottom', value: 'left bottom' },
                                { name: 'Center top', value: 'center top' },
                                {
                                  name: 'Center center',
                                  value: 'center center',
                                },
                                {
                                  name: 'Center bottom',
                                  value: 'center bottom',
                                },
                                { name: 'Right top', value: 'right top' },
                                { name: 'Right center', value: 'right center' },
                                { name: 'Right bottom', value: 'right bottom' },
                              ],
                              condition: {
                                type: 'SHOW',
                                option: 'backgroundOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: 'no-repeat',
                            label: 'Background repeat',
                            key: 'backgroundRepeat',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'None', value: 'no-repeat' },
                                { name: 'X', value: 'repeat-x' },
                                { name: 'Y', value: 'repeat-y' },
                                { name: 'All', value: 'repeat' },
                              ],
                              condition: {
                                type: 'SHOW',
                                option: 'backgroundOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: 'Transparent',
                            label: 'Border color',
                            key: 'borderColor',
                            type: 'COLOR',
                            configuration: {
                              condition: {
                                type: 'SHOW',
                                option: 'backgroundOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            type: 'SIZE',
                            label: 'Border thickness',
                            key: 'borderWidth',
                            value: '',
                            configuration: {
                              as: 'UNIT',
                              condition: {
                                type: 'SHOW',
                                option: 'backgroundOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            value: 'solid',
                            label: 'Border style',
                            key: 'borderStyle',
                            type: 'CUSTOM',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'None', value: 'none' },
                                { name: 'Solid', value: 'solid' },
                                { name: 'Dashed', value: 'dashed' },
                                { name: 'Dotted', value: 'dotted' },
                              ],
                              condition: {
                                type: 'SHOW',
                                option: 'backgroundOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                          {
                            type: 'SIZE',
                            label: 'Border radius',
                            key: 'borderRadius',
                            value: '',
                            configuration: {
                              as: 'UNIT',
                              condition: {
                                type: 'SHOW',
                                option: 'backgroundOptions',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          },
                        ],
                        descendants: [
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
                            descendants: [
                              {
                                name: 'Column',
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
                                    value: 'fitContent',
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
                                  },
                                  {
                                    value: 'fitContent',
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
                                  },
                                  {
                                    value: 'fitContent',
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
                                  },
                                  {
                                    value: 'hidden',
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
                                        { name: 'None', value: 'inherit' },
                                        { name: 'Left', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Right', value: 'flex-end' },
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
                                        { name: 'None', value: 'inherit' },
                                        { name: 'Top', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Bottom', value: 'flex-end' },
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
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                    label: 'Inner space',
                                    key: 'innerSpacing',
                                    type: 'SIZES',
                                  },
                                ],
                                descendants: [
                                  {
                                    name: 'Button',
                                    ref: {
                                      id: '#listBtnId',
                                    },
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
                                        value: [''],
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
                                        label: 'Icon',
                                        key: 'icon',
                                        value: 'List',
                                        type: 'CUSTOM',
                                        configuration: iconConfiguration,
                                      },
                                      {
                                        value: 'small',
                                        label: 'Icon size',
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
                                        value: ['0rem', 'S', '0rem', '0rem'],
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
                                    ref: {
                                      id: '#gridBtnId',
                                    },
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
                                        value: [''],
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
                                        value: 'Apps',
                                        type: 'CUSTOM',
                                        configuration: iconConfiguration,
                                      },
                                      {
                                        value: 'small',
                                        label: 'Icon size',
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
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: 'Divider',
                    options: [
                      {
                        value: 'S',
                        label: 'Thickness',
                        key: 'thickness',
                        type: 'SIZE',
                      },
                      {
                        value: 'Light',
                        label: 'Color',
                        key: 'color',
                        type: 'COLOR',
                      },
                      {
                        value: ['M', '0rem', 'M', '0rem'],
                        label: 'Outer space',
                        key: 'outerSpacing',
                        type: 'SIZES',
                      },
                    ],
                    descendants: [],
                  },
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
                        type: 'SIZE',
                        label: 'Height',
                        key: 'height',
                        value: '',
                        configuration: {
                          as: 'UNIT',
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
                        value: true,
                        type: 'TOGGLE',
                      },
                    ],
                    descendants: [
                      {
                        name: 'Tab',
                        ref: {
                          id: '#gridTabId',
                        },
                        options: [
                          {
                            label: 'Tab label',
                            key: 'label',
                            value: ['Grid'],
                            type: 'VARIABLE',
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
                            type: 'SIZE',
                            label: 'Width',
                            key: 'width',
                            value: '',
                            configuration: {
                              as: 'UNIT',
                            },
                          },
                          {
                            label: 'Icon',
                            key: 'icon',
                            value: 'None',
                            type: 'CUSTOM',
                            configuration: iconConfiguration,
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
                        descendants: [
                          {
                            name: 'TextField',
                            ref: {
                              id: '#searchGrid',
                            },
                            options: [
                              {
                                value: { label: ['Search'], value: [] },
                                label: 'Label',
                                key: 'customModelAttribute',
                                type: 'CUSTOM_MODEL_ATTRIBUTE',
                                configuration: {
                                  allowedTypes: ['string'],
                                },
                              },
                              {
                                value: true,
                                label: 'Autocomplete',
                                key: 'autoComplete',
                                type: 'TOGGLE',
                              },
                              {
                                value: false,
                                label: 'Validation options',
                                key: 'validationOptions',
                                type: 'TOGGLE',
                              },
                              {
                                label: 'Validation pattern',
                                key: 'pattern',
                                value: '',
                                type: 'TEXT',
                                configuration: {
                                  placeholder:
                                    '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                label: 'Min length',
                                key: 'minlength',
                                value: '',
                                type: 'NUMBER',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                label: 'Max length',
                                key: 'maxlength',
                                value: '',
                                type: 'NUMBER',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                value: ['This field is required'],
                                label: 'Value required message',
                                key: 'validationValueMissing',
                                type: 'VARIABLE',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                value: ['Invalid value'],
                                label: 'Pattern mismatch message',
                                key: 'validationPatternMismatch',
                                type: 'VARIABLE',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                value: ['This value is too short'],
                                label: 'Value too short message',
                                key: 'validationTooShort',
                                type: 'VARIABLE',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                value: ['This value is too long'],
                                label: 'Value too long message',
                                key: 'validationTooLong',
                                type: 'VARIABLE',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
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
                                value: [],
                                label: 'Placeholder',
                                key: 'placeholder',
                                type: 'VARIABLE',
                              },
                              {
                                value: [],
                                label: 'Helper text',
                                key: 'helperText',
                                type: 'VARIABLE',
                              },
                              {
                                label: 'Variant',
                                key: 'variant',
                                value: 'outlined',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'Standard', value: 'standard' },
                                    { name: 'Outlined', value: 'outlined' },
                                    { name: 'Filled', value: 'filled' },
                                  ],
                                },
                              },
                              {
                                type: 'TOGGLE',
                                label: 'Full width',
                                key: 'fullWidth',
                                value: true,
                              },
                              {
                                label: 'Size',
                                key: 'size',
                                value: 'medium',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'Medium', value: 'medium' },
                                    { name: 'Small', value: 'small' },
                                  ],
                                },
                              },
                              {
                                label: 'Margin',
                                key: 'margin',
                                value: 'normal',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'None', value: 'none' },
                                    { name: 'Dense', value: 'dense' },
                                    { name: 'Normal', value: 'normal' },
                                  ],
                                },
                              },
                              {
                                label: 'Adornment',
                                key: 'adornmentIcon',
                                value: 'Search',
                                type: 'CUSTOM',
                                configuration: iconConfiguration,
                              },
                              {
                                type: 'CUSTOM',
                                label: 'Position',
                                key: 'adornmentPosition',
                                value: 'start',
                                configuration: {
                                  condition: {
                                    type: 'HIDE',
                                    option: 'adornmentIcon',
                                    comparator: 'EQ',
                                    value: '',
                                  },
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'Start', value: 'start' },
                                    { name: 'End', value: 'end' },
                                  ],
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
                                label: 'Background color',
                                key: 'backgroundColor',
                                value: 'White',
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
                                type: 'COLOR',
                                label: 'Border color',
                                key: 'borderColor',
                                value: 'Accent1',
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
                                type: 'COLOR',
                                label: 'Border color (hover)',
                                key: 'borderHoverColor',
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
                                type: 'COLOR',
                                label: 'Border color (focus)',
                                key: 'borderFocusColor',
                                value: 'Primary',
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
                                value: false,
                                label: 'Hide label',
                                key: 'hideLabel',
                                type: 'TOGGLE',
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
                                type: 'COLOR',
                                label: 'Label color',
                                key: 'labelColor',
                                value: 'Accent3',
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
                                type: 'COLOR',
                                label: 'Placeholder color',
                                key: 'placeholderColor',
                                value: 'Light',
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
                                type: 'COLOR',
                                label: 'Helper color',
                                key: 'helperColor',
                                value: 'Accent2',
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
                                type: 'COLOR',
                                label: 'Error color',
                                key: 'errorColor',
                                value: 'Danger',
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
                                value: false,
                                label: 'Advanced settings',
                                key: 'advancedSettings',
                                type: 'TOGGLE',
                              },
                              {
                                type: 'VARIABLE',
                                label: 'name attribute',
                                key: 'nameAttribute',
                                value: [],
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
                          },
                          {
                            name: 'Row',
                            options: [
                              {
                                type: 'CUSTOM',
                                label: 'Width',
                                key: 'maxRowWidth',
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
                            descendants: [
                              {
                                name: 'Column',
                                ref: {
                                  id: '#noResultsGridColumn',
                                },
                                options: [
                                  {
                                    label: 'Toggle visibility',
                                    key: 'visible',
                                    value: false,
                                    type: 'TOGGLE',
                                    configuration: {
                                      as: 'VISIBILITY',
                                    },
                                  },
                                  {
                                    value: 'flexible',
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
                                  },
                                  {
                                    value: 'flexible',
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
                                  },
                                  {
                                    value: 'flexible',
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
                                  },
                                  {
                                    value: 'flexible',
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
                                        { name: 'None', value: 'inherit' },
                                        { name: 'Left', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Right', value: 'flex-end' },
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
                                        { name: 'None', value: 'inherit' },
                                        { name: 'Top', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Bottom', value: 'flex-end' },
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
                                    value: ['M', 'M', 'M', 'M'],
                                    label: 'Inner space',
                                    key: 'innerSpacing',
                                    type: 'SIZES',
                                  },
                                ],
                                descendants: [
                                  {
                                    name: 'Text',
                                    options: [
                                      {
                                        type: 'VARIABLE',
                                        label: 'Content',
                                        key: 'content',
                                        value: ['No results found'],
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
                            ],
                          },
                          {
                            name: 'DataList',
                            ref: {
                              id: '#dataGrid',
                            },
                            options: [
                              {
                                value: '',
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
                                type: 'PROPERTY',
                                label: 'Order by',
                                key: 'orderBy',
                                value: '',
                                configuration: {
                                  dependsOn: 'model',
                                },
                              },
                              {
                                type: 'CUSTOM',
                                label: 'Sort order',
                                key: 'order',
                                value: 'asc',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  condition: {
                                    type: 'HIDE',
                                    option: 'orderBy',
                                    comparator: 'EQ',
                                    value: '',
                                  },
                                  allowedInput: [
                                    { name: 'Ascending', value: 'asc' },
                                    { name: 'Descending', value: 'desc' },
                                  ],
                                },
                              },
                              {
                                value: titleProperty || '',
                                label: 'Search on property',
                                key: 'searchProperty',
                                type: 'PROPERTY',
                                configuration: {
                                  dependsOn: 'model',
                                },
                              },
                              {
                                value: 'true',
                                label: 'Hide built-in search field',
                                key: 'hideSearch',
                                type: 'TOGGLE',
                              },
                              {
                                value: '',
                                label: 'Authentication Profile',
                                key: 'authProfile',
                                type: 'AUTHENTICATION_PROFILE',
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
                                    {
                                      name: 'When needed',
                                      value: 'whenNeeded',
                                    },
                                    { name: 'Never', value: 'never' },
                                  ],
                                },
                              },
                              {
                                value: '12',
                                label: 'Rows per page (max 50)',
                                key: 'take',
                                type: 'NUMBER',
                              },
                              {
                                value: '',
                                label: 'Placeholder rows',
                                key: 'placeholderTake',
                                type: 'NUMBER',
                              },
                              {
                                type: 'CUSTOM',
                                label: 'Type',
                                key: 'type',
                                value: 'grid',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'List',
                                      value: 'list',
                                    },
                                    {
                                      name: 'Grid',
                                      value: 'grid',
                                    },
                                    {
                                      name: 'Inline',
                                      value: 'inline',
                                    },
                                  ],
                                },
                              },
                              {
                                type: 'SIZE',
                                label: 'Min Width',
                                key: 'width',
                                value: '250px',
                                configuration: {
                                  as: 'UNIT',
                                  condition: {
                                    type: 'SHOW',
                                    option: 'type',
                                    comparator: 'EQ',
                                    value: 'grid',
                                  },
                                },
                              },
                              {
                                type: 'SIZE',
                                label: 'Gap',
                                key: 'gap',
                                value: '1rem',
                                configuration: {
                                  as: 'UNIT',
                                  condition: {
                                    type: 'SHOW',
                                    option: 'type',
                                    comparator: 'EQ',
                                    value: 'grid',
                                  },
                                },
                              },
                              {
                                value: ['M', '0rem', 'M', '0rem'],
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
                                    {
                                      name: 'Interaction',
                                      value: 'interaction',
                                    },
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
                                    { name: 'Skeleton', value: 'skeleton' },
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
                                    value: 'outlined',
                                    type: 'CUSTOM',
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
                                            {
                                              name: 'Video',
                                              value: 'video',
                                            },
                                            {
                                              name: 'I-frame',
                                              value: 'iframe',
                                            },
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
                                            {
                                              name: 'Image',
                                              value: 'image',
                                            },
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
                                        value: ['Subheader'],
                                        label: 'Sub header',
                                        key: 'subheader',
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
                                            value: ['Description'],
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
                                    name: 'CardActions',
                                    options: [
                                      {
                                        type: 'CUSTOM',
                                        label: 'Alignment',
                                        key: 'alignment',
                                        value: 'flex-end',
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
                                            type: 'VARIABLE',
                                            label: 'Button text',
                                            key: 'buttonText',
                                            value: [''],
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
                                            value: 'ChevronRight',
                                            type: 'CUSTOM',
                                            configuration: iconConfiguration,
                                          },
                                          {
                                            value: 'small',
                                            label: 'Icon Size',
                                            key: 'size',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
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
                                                {
                                                  name: 'Start',
                                                  value: 'start',
                                                },
                                                {
                                                  name: 'End',
                                                  value: 'end',
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
                                            configuration: {
                                              as: 'VISIBILITY',
                                            },
                                          },
                                          {
                                            label: 'Toggle tooltip visibility',
                                            key: 'visibleTooltip',
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
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        name: 'Tab',
                        ref: {
                          id: '#listTabId',
                        },
                        options: [
                          {
                            label: 'Tab label',
                            key: 'label',
                            value: ['List'],
                            type: 'VARIABLE',
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
                            type: 'SIZE',
                            label: 'Width',
                            key: 'width',
                            value: '',
                            configuration: {
                              as: 'UNIT',
                            },
                          },
                          {
                            label: 'Icon',
                            key: 'icon',
                            value: 'None',
                            type: 'CUSTOM',
                            configuration: iconConfiguration,
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
                        descendants: [
                          {
                            name: 'TextField',
                            ref: {
                              id: '#listSearch',
                            },
                            options: [
                              {
                                value: { label: ['Search'], value: [] },
                                label: 'Label',
                                key: 'customModelAttribute',
                                type: 'CUSTOM_MODEL_ATTRIBUTE',
                                configuration: {
                                  allowedTypes: ['string'],
                                },
                              },
                              {
                                value: true,
                                label: 'Autocomplete',
                                key: 'autoComplete',
                                type: 'TOGGLE',
                              },
                              {
                                value: false,
                                label: 'Validation options',
                                key: 'validationOptions',
                                type: 'TOGGLE',
                              },
                              {
                                label: 'Validation pattern',
                                key: 'pattern',
                                value: '',
                                type: 'TEXT',
                                configuration: {
                                  placeholder:
                                    '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                label: 'Min length',
                                key: 'minlength',
                                value: '',
                                type: 'NUMBER',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                label: 'Max length',
                                key: 'maxlength',
                                value: '',
                                type: 'NUMBER',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                value: ['This field is required'],
                                label: 'Value required message',
                                key: 'validationValueMissing',
                                type: 'VARIABLE',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                value: ['Invalid value'],
                                label: 'Pattern mismatch message',
                                key: 'validationPatternMismatch',
                                type: 'VARIABLE',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                value: ['This value is too short'],
                                label: 'Value too short message',
                                key: 'validationTooShort',
                                type: 'VARIABLE',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
                                  },
                                },
                              },
                              {
                                value: ['This value is too long'],
                                label: 'Value too long message',
                                key: 'validationTooLong',
                                type: 'VARIABLE',
                                configuration: {
                                  condition: {
                                    type: 'SHOW',
                                    option: 'validationOptions',
                                    comparator: 'EQ',
                                    value: true,
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
                                value: [],
                                label: 'Placeholder',
                                key: 'placeholder',
                                type: 'VARIABLE',
                              },
                              {
                                value: [],
                                label: 'Helper text',
                                key: 'helperText',
                                type: 'VARIABLE',
                              },
                              {
                                label: 'Variant',
                                key: 'variant',
                                value: 'outlined',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'Standard', value: 'standard' },
                                    { name: 'Outlined', value: 'outlined' },
                                    { name: 'Filled', value: 'filled' },
                                  ],
                                },
                              },
                              {
                                type: 'TOGGLE',
                                label: 'Full width',
                                key: 'fullWidth',
                                value: true,
                              },
                              {
                                label: 'Size',
                                key: 'size',
                                value: 'medium',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'Medium', value: 'medium' },
                                    { name: 'Small', value: 'small' },
                                  ],
                                },
                              },
                              {
                                label: 'Margin',
                                key: 'margin',
                                value: 'normal',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'None', value: 'none' },
                                    { name: 'Dense', value: 'dense' },
                                    { name: 'Normal', value: 'normal' },
                                  ],
                                },
                              },
                              {
                                label: 'Adornment',
                                key: 'adornmentIcon',
                                value: 'Search',
                                type: 'CUSTOM',
                                configuration: iconConfiguration,
                              },
                              {
                                type: 'CUSTOM',
                                label: 'Position',
                                key: 'adornmentPosition',
                                value: 'start',
                                configuration: {
                                  condition: {
                                    type: 'HIDE',
                                    option: 'adornmentIcon',
                                    comparator: 'EQ',
                                    value: '',
                                  },
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'Start', value: 'start' },
                                    { name: 'End', value: 'end' },
                                  ],
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
                                label: 'Background color',
                                key: 'backgroundColor',
                                value: 'White',
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
                                type: 'COLOR',
                                label: 'Border color',
                                key: 'borderColor',
                                value: 'Accent1',
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
                                type: 'COLOR',
                                label: 'Border color (hover)',
                                key: 'borderHoverColor',
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
                                type: 'COLOR',
                                label: 'Border color (focus)',
                                key: 'borderFocusColor',
                                value: 'Primary',
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
                                value: false,
                                label: 'Hide label',
                                key: 'hideLabel',
                                type: 'TOGGLE',
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
                                type: 'COLOR',
                                label: 'Label color',
                                key: 'labelColor',
                                value: 'Accent3',
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
                                type: 'COLOR',
                                label: 'Placeholder color',
                                key: 'placeholderColor',
                                value: 'Light',
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
                                type: 'COLOR',
                                label: 'Helper color',
                                key: 'helperColor',
                                value: 'Accent2',
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
                                type: 'COLOR',
                                label: 'Error color',
                                key: 'errorColor',
                                value: 'Danger',
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
                                value: false,
                                label: 'Advanced settings',
                                key: 'advancedSettings',
                                type: 'TOGGLE',
                              },
                              {
                                type: 'VARIABLE',
                                label: 'name attribute',
                                key: 'nameAttribute',
                                value: [],
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
                          },
                          {
                            name: 'Row',
                            options: [
                              {
                                type: 'CUSTOM',
                                label: 'Width',
                                key: 'maxRowWidth',
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
                            descendants: [
                              {
                                name: 'Column',
                                ref: {
                                  id: '#noResultsListColumn',
                                },
                                options: [
                                  {
                                    label: 'Toggle visibility',
                                    key: 'visible',
                                    value: false,
                                    type: 'TOGGLE',
                                    configuration: {
                                      as: 'VISIBILITY',
                                    },
                                  },
                                  {
                                    value: 'flexible',
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
                                  },
                                  {
                                    value: 'flexible',
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
                                  },
                                  {
                                    value: 'flexible',
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
                                  },
                                  {
                                    value: 'flexible',
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
                                        { name: 'None', value: 'inherit' },
                                        { name: 'Left', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Right', value: 'flex-end' },
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
                                        { name: 'None', value: 'inherit' },
                                        { name: 'Top', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Bottom', value: 'flex-end' },
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
                                    value: ['M', 'M', 'M', 'M'],
                                    label: 'Inner space',
                                    key: 'innerSpacing',
                                    type: 'SIZES',
                                  },
                                ],
                                descendants: [
                                  {
                                    name: 'Text',
                                    options: [
                                      {
                                        type: 'VARIABLE',
                                        label: 'Content',
                                        key: 'content',
                                        value: ['No results found'],
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
                            ],
                          },
                          {
                            name: 'DataList',
                            ref: {
                              id: '#dataList',
                            },
                            options: [
                              {
                                value: '',
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
                                type: 'PROPERTY',
                                label: 'Order by',
                                key: 'orderBy',
                                value: '',
                                configuration: {
                                  dependsOn: 'model',
                                },
                              },
                              {
                                type: 'CUSTOM',
                                label: 'Sort order',
                                key: 'order',
                                value: 'asc',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  condition: {
                                    type: 'HIDE',
                                    option: 'orderBy',
                                    comparator: 'EQ',
                                    value: '',
                                  },
                                  allowedInput: [
                                    { name: 'Ascending', value: 'asc' },
                                    { name: 'Descending', value: 'desc' },
                                  ],
                                },
                              },
                              {
                                value: titleProperty || '',
                                label: 'Search on property',
                                key: 'searchProperty',
                                type: 'PROPERTY',
                                configuration: {
                                  dependsOn: 'model',
                                },
                              },
                              {
                                value: 'true',
                                label: 'Hide built-in search field',
                                key: 'hideSearch',
                                type: 'TOGGLE',
                              },
                              {
                                value: '',
                                label: 'Authentication Profile',
                                key: 'authProfile',
                                type: 'AUTHENTICATION_PROFILE',
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
                                    {
                                      name: 'When needed',
                                      value: 'whenNeeded',
                                    },
                                    { name: 'Never', value: 'never' },
                                  ],
                                },
                              },
                              {
                                value: '10',
                                label: 'Rows per page (max 50)',
                                key: 'take',
                                type: 'NUMBER',
                              },
                              {
                                value: '',
                                label: 'Placeholder rows',
                                key: 'placeholderTake',
                                type: 'NUMBER',
                              },
                              {
                                type: 'CUSTOM',
                                label: 'Type',
                                key: 'type',
                                value: 'list',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    {
                                      name: 'List',
                                      value: 'list',
                                    },
                                    {
                                      name: 'Grid',
                                      value: 'grid',
                                    },
                                    {
                                      name: 'Inline',
                                      value: 'inline',
                                    },
                                  ],
                                },
                              },
                              {
                                type: 'SIZE',
                                label: 'Min Width',
                                key: 'width',
                                value: '200px',
                                configuration: {
                                  as: 'UNIT',
                                  condition: {
                                    type: 'SHOW',
                                    option: 'type',
                                    comparator: 'EQ',
                                    value: 'grid',
                                  },
                                },
                              },
                              {
                                type: 'SIZE',
                                label: 'Gap',
                                key: 'gap',
                                value: '1rem',
                                configuration: {
                                  as: 'UNIT',
                                  condition: {
                                    type: 'SHOW',
                                    option: 'type',
                                    comparator: 'EQ',
                                    value: 'grid',
                                  },
                                },
                              },
                              {
                                value: ['M', '0rem', 'M', '0rem'],
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
                                    {
                                      name: 'Interaction',
                                      value: 'interaction',
                                    },
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
                                    { name: 'Skeleton', value: 'skeleton' },
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
                                name: 'Row',
                                options: [
                                  {
                                    type: 'CUSTOM',
                                    label: 'Width',
                                    key: 'maxRowWidth',
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
                                    value: ['0rem', '0rem', 'M', '0rem'],
                                    label: 'Outer space',
                                    key: 'outerSpacing',
                                    type: 'SIZES',
                                  },
                                ],
                                descendants: [
                                  {
                                    name: 'Column',
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
                                        value: 'flexible',
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
                                      {
                                        value: 'flexible',
                                        label:
                                          'Column width (tablet landscape)',
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
                                      {
                                        value: 'flexible',
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
                                      {
                                        value: 'flexible',
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
                                            { name: 'None', value: 'inherit' },
                                            {
                                              name: 'Left',
                                              value: 'flex-start',
                                            },
                                            { name: 'Center', value: 'center' },
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
                                            { name: 'None', value: 'inherit' },
                                            {
                                              name: 'Top',
                                              value: 'flex-start',
                                            },
                                            { name: 'Center', value: 'center' },
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
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                        label: 'Inner space',
                                        key: 'innerSpacing',
                                        type: 'SIZES',
                                      },
                                    ],
                                    descendants: [
                                      {
                                        name: 'Paper',
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
                                            value: 'outlined',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                { name: 'Flat', value: 'flat' },
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
                                                option: 'variant',
                                                comparator: 'EQ',
                                                value: 'elevation',
                                              },
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
                                        ],
                                        descendants: [
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
                                                    {
                                                      name: 'Full',
                                                      value: 'Full',
                                                    },
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
                                            ],
                                            descendants: [
                                              {
                                                name: 'Column',
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
                                                    value: '3',
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
                                                    },
                                                  },
                                                  {
                                                    value: '3',
                                                    label:
                                                      'Column width (tablet landscape)',
                                                    key:
                                                      'columnWidthTabletLandscape',
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
                                                    },
                                                  },
                                                  {
                                                    value: '3',
                                                    label:
                                                      'Column width (tablet portrait)',
                                                    key:
                                                      'columnWidthTabletPortrait',
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
                                                    },
                                                  },
                                                  {
                                                    value: '12',
                                                    label:
                                                      'Column width (mobile)',
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
                                                    label:
                                                      'Horizontal Alignment',
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
                                                    value: ['M', 'M', 'M', 'M'],
                                                    label: 'Inner space',
                                                    key: 'innerSpacing',
                                                    type: 'SIZES',
                                                  },
                                                ],
                                                descendants: [
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
                                                            {
                                                              name: 'Image',
                                                              value: 'img',
                                                            },
                                                            {
                                                              name: 'Video',
                                                              value: 'video',
                                                            },
                                                            {
                                                              name: 'I-frame',
                                                              value: 'iframe',
                                                            },
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
                                                          as: 'MULTILINE',
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
                                                          as: 'MULTILINE',
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
                                                          as: 'MULTILINE',
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
                                                            {
                                                              name:
                                                                'Internal page',
                                                              value: 'internal',
                                                            },
                                                            {
                                                              name:
                                                                'External page',
                                                              value: 'external',
                                                            },
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
                                                        value: [],
                                                        label:
                                                          'Image Alternative Text',
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
                                                    ],
                                                    descendants: [],
                                                  },
                                                ],
                                              },
                                              {
                                                name: 'Column',
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
                                                    value: '8',
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
                                                    },
                                                  },
                                                  {
                                                    value: '8',
                                                    label:
                                                      'Column width (tablet landscape)',
                                                    key:
                                                      'columnWidthTabletLandscape',
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
                                                    },
                                                  },
                                                  {
                                                    value: '8',
                                                    label:
                                                      'Column width (tablet portrait)',
                                                    key:
                                                      'columnWidthTabletPortrait',
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
                                                    },
                                                  },
                                                  {
                                                    value: '10',
                                                    label:
                                                      'Column width (mobile)',
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
                                                    label:
                                                      'Horizontal Alignment',
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
                                                    value: ['M', 'M', 'M', 'M'],
                                                    label: 'Inner space',
                                                    key: 'innerSpacing',
                                                    type: 'SIZES',
                                                  },
                                                ],
                                                descendants: [
                                                  {
                                                    name: 'Text',
                                                    options: [
                                                      {
                                                        type: 'VARIABLE',
                                                        label: 'Content',
                                                        key: 'content',
                                                        value: ['Title'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                      {
                                                        type: 'TOGGLE',
                                                        label:
                                                          'Display Rich Text',
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
                                                              name:
                                                                'Internal page',
                                                              value: 'internal',
                                                            },
                                                            {
                                                              name:
                                                                'External page',
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
                                                  {
                                                    name: 'Text',
                                                    options: [
                                                      {
                                                        type: 'VARIABLE',
                                                        label: 'Content',
                                                        key: 'content',
                                                        value: ['Subheader'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                      {
                                                        type: 'TOGGLE',
                                                        label:
                                                          'Display Rich Text',
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
                                                      },
                                                      {
                                                        value: [
                                                          '0rem',
                                                          '0rem',
                                                          'S',
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
                                                              name:
                                                                'Internal page',
                                                              value: 'internal',
                                                            },
                                                            {
                                                              name:
                                                                'External page',
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
                                                        value: true,
                                                        label: 'Styles',
                                                        key: 'styles',
                                                        type: 'TOGGLE',
                                                      },
                                                      {
                                                        type: 'COLOR',
                                                        label: 'Text color',
                                                        key: 'textColor',
                                                        value: 'Accent3',
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
                                                  {
                                                    name: 'Text',
                                                    options: [
                                                      {
                                                        type: 'VARIABLE',
                                                        label: 'Content',
                                                        key: 'content',
                                                        value: ['Description'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                      {
                                                        type: 'TOGGLE',
                                                        label:
                                                          'Display Rich Text',
                                                        key: 'useInnerHtml',
                                                        value: false,
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
                                                              name:
                                                                'Internal page',
                                                              value: 'internal',
                                                            },
                                                            {
                                                              name:
                                                                'External page',
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
                                                    value: '1',
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
                                                    },
                                                  },
                                                  {
                                                    value: '1',
                                                    label:
                                                      'Column width (tablet landscape)',
                                                    key:
                                                      'columnWidthTabletLandscape',
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
                                                    },
                                                  },
                                                  {
                                                    value: '1',
                                                    label:
                                                      'Column width (tablet portrait)',
                                                    key:
                                                      'columnWidthTabletPortrait',
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
                                                    },
                                                  },
                                                  {
                                                    value: '2',
                                                    label:
                                                      'Column width (mobile)',
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
                                                    label:
                                                      'Horizontal Alignment',
                                                    key: 'horizontalAlignment',
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
                                                  {
                                                    type: 'CUSTOM',
                                                    label: 'Vertical Alignment',
                                                    key: 'verticalAlignment',
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
                                                    value: ['M', 'M', 'M', 'M'],
                                                    label: 'Inner space',
                                                    key: 'innerSpacing',
                                                    type: 'SIZES',
                                                  },
                                                ],
                                                descendants: [
                                                  {
                                                    name: 'Button',
                                                    options: [
                                                      {
                                                        label:
                                                          'Toggle visibility',
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
                                                        value: [''],
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
                                                        value: 'ChevronRight',
                                                        type: 'CUSTOM',
                                                        configuration: iconConfiguration,
                                                      },
                                                      {
                                                        value: 'small',
                                                        label: 'Icon size',
                                                        key: 'size',
                                                        type: 'CUSTOM',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
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
                                                            {
                                                              name: 'Start',
                                                              value: 'start',
                                                            },
                                                            {
                                                              name: 'End',
                                                              value: 'end',
                                                            },
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
                                                        label:
                                                          'Toggle tooltip visibility',
                                                        key:
                                                          'hasVisibleTooltip',
                                                        value: true,
                                                        type: 'TOGGLE',
                                                        configuration: {
                                                          as: 'VISIBILITY',
                                                          condition: {
                                                            type: 'SHOW',
                                                            option:
                                                              'addTooltip',
                                                            comparator: 'EQ',
                                                            value: true,
                                                          },
                                                        },
                                                      },
                                                      {
                                                        type: 'VARIABLE',
                                                        label:
                                                          'Tooltip Content',
                                                        key: 'tooltipContent',
                                                        value: ['Tips'],
                                                        configuration: {
                                                          condition: {
                                                            type: 'SHOW',
                                                            option:
                                                              'addTooltip',
                                                            comparator: 'EQ',
                                                            value: true,
                                                          },
                                                        },
                                                      },
                                                      {
                                                        label:
                                                          'Tooltip Placement',
                                                        key: 'tooltipPlacement',
                                                        value: 'bottom',
                                                        type: 'CUSTOM',
                                                        configuration: {
                                                          as: 'DROPDOWN',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'Top Start',
                                                              value:
                                                                'top-start',
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
                                                              name:
                                                                'Botttom Start',
                                                              value:
                                                                'bottom-start',
                                                            },
                                                            {
                                                              name: 'Bottom',
                                                              value: 'bottom',
                                                            },
                                                            {
                                                              name:
                                                                'Bottom End',
                                                              value:
                                                                'bottom-end',
                                                            },
                                                          ],
                                                          condition: {
                                                            type: 'SHOW',
                                                            option:
                                                              'addTooltip',
                                                            comparator: 'EQ',
                                                            value: true,
                                                          },
                                                        },
                                                      },
                                                      {
                                                        type: 'COLOR',
                                                        label:
                                                          'Tooltip Background',
                                                        key:
                                                          'tooltipBackground',
                                                        value: 'Medium',
                                                        configuration: {
                                                          condition: {
                                                            type: 'SHOW',
                                                            option:
                                                              'addTooltip',
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
                                                            option:
                                                              'addTooltip',
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
                ],
              },
            ],
          },
        ],
      },
    ];

    return (
      <>
        <Header onClose={close} title="Configure data grid" />
        <Content>
          <Box direction="row">
            <Box direction="column" basis="2/3">
              <Field
                label="Select model"
                error={
                  showValidation && (
                    <Text color="#e82600">Selecting a model is required</Text>
                  )
                }
              >
                <ModelSelector
                  onChange={value => {
                    setShowValidation(false);
                    setModelId(value);
                    setImageProperty('');
                    setTitleProperty('');
                    setSubheaderProperty('');
                    setDescriptionProperty('');
                  }}
                  value={modelId}
                />
              </Field>
              <Field label="Image property">
                <PropertySelector
                  modelId={modelId}
                  onChange={value => {
                    setImageProperty(value);
                  }}
                  value={imageProperty}
                  disabled={!modelId}
                />
              </Field>
              <Field label="Title property">
                <Text size="small" color="grey700" as="div">
                  This property is also being used as search property.
                </Text>
                <PropertySelector
                  modelId={modelId}
                  onChange={value => {
                    setTitleProperty(value);
                  }}
                  value={titleProperty}
                  disabled={!modelId}
                />
              </Field>
              <Field label="Subheader property">
                <PropertySelector
                  modelId={modelId}
                  onChange={value => {
                    setSubheaderProperty(value);
                  }}
                  value={subheaderProperty}
                  disabled={!modelId}
                />
              </Field>
              <Field label="Description property">
                <PropertySelector
                  modelId={modelId}
                  onChange={value => {
                    setDescriptionProperty(value);
                  }}
                  value={descriptionProperty}
                  disabled={!modelId}
                />
              </Field>
            </Box>
            <Box direction="column" basis="1/3">
              <Field
                info={
                  <Text size="small" color="grey700">
                    This is what each grid item will look like on the canvas
                  </Text>
                }
              >
                <Text>Preview:</Text>
              </Field>
              <Box
                fill="true"
                round="4px"
                overflow="hidden"
                border={{
                  color: '#E0E0E0',
                  size: 'xsmall',
                  style: 'solid',
                  side: 'all',
                }}
              >
                <Box
                  pad={imageProperty.id ? 'large' : 'medium'}
                  border={
                    imageProperty.id
                      ? {
                          color: '#AFB5C8',
                          size: 'xsmall',
                          style: 'dashed',
                          side: 'all',
                        }
                      : ''
                  }
                  background={
                    imageProperty.id
                      ? '#F0F1F5'
                      : 'url(https://material-ui.com/static/images/cards/contemplative-reptile.jpg)'
                  }
                  flex={{ grow: '30' }}
                  justify="center"
                  align="center"
                >
                  <Text truncate="true">
                    {imageProperty.id ? enrichVarObj(imageProperty).name : ''}
                  </Text>
                </Box>
                <Box pad="medium">
                  <Text color="#000000DE" truncate="true">
                    {titleProperty.id
                      ? enrichVarObj(titleProperty).name
                      : 'Title'}
                  </Text>
                  <Text size="small" color="#0000008A" truncate="true">
                    {subheaderProperty.id
                      ? enrichVarObj(subheaderProperty).name
                      : 'Subheader'}
                  </Text>
                </Box>
                <Box
                  pad={{ top: 'none', bottom: 'medium', horizontal: 'medium' }}
                >
                  <Text size="small" truncate="true">
                    {descriptionProperty.id
                      ? enrichVarObj(descriptionProperty).name
                      : 'Description'}
                  </Text>
                </Box>
                <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                  <Text size="large" textAlign="end">
                    ›
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Content>
        <Footer
          onClose={close}
          onSkip={() => {
            const newPrefab = { ...prefab };
            newPrefab.structure[0].descendants = prefabStructure;
            save(newPrefab);
          }}
          onSave={() => {
            if (!modelId) {
              setShowValidation(true);
              return;
            }
            const newPrefab = { ...prefab };
            if (modelId) {
              const dataGrid =
                prefabStructure[1].descendants[0].descendants[0].descendants[2]
                  .descendants[0].descendants[2];
              dataGrid.options[0].value = modelId;
              if (imageProperty.id) {
                dataGrid.descendants[0].descendants[0].options[1].value = [
                  enrichVarObj(imageProperty),
                ];
              }
              if (titleProperty.id) {
                dataGrid.descendants[0].descendants[1].options[2].value = [
                  enrichVarObj(titleProperty),
                ];
              }
              if (subheaderProperty.id) {
                dataGrid.descendants[0].descendants[1].options[3].value = [
                  enrichVarObj(subheaderProperty),
                ];
              }
              if (descriptionProperty.id) {
                dataGrid.descendants[0].descendants[2].descendants[0].options[0].value = [
                  enrichVarObj(descriptionProperty),
                ];
              }

              const dataList =
                prefabStructure[1].descendants[0].descendants[0].descendants[2]
                  .descendants[1].descendants[2];
              dataList.options[0].value = modelId;
              if (imageProperty.id) {
                dataList.descendants[0].descendants[0].descendants[0].descendants[0].descendants[0].descendants[0].options[1].value = [
                  enrichVarObj(imageProperty),
                ];
              }
              if (titleProperty.id) {
                dataList.descendants[0].descendants[0].descendants[0].descendants[0].descendants[1].descendants[0].options[0].value = [
                  enrichVarObj(titleProperty),
                ];
              }
              if (subheaderProperty.id) {
                dataList.descendants[0].descendants[0].descendants[0].descendants[0].descendants[1].descendants[1].options[0].value = [
                  enrichVarObj(subheaderProperty),
                ];
              }
              if (descriptionProperty.id) {
                dataList.descendants[0].descendants[0].descendants[0].descendants[0].descendants[1].descendants[2].options[0].value = [
                  enrichVarObj(descriptionProperty),
                ];
              }

              newPrefab.structure[0].descendants = prefabStructure;
              save(newPrefab);
            }
          }}
        />
      </>
    );
  },
  variables: [],
  actions: [],
  interactions: [
    {
      name: 'Select',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#listTabId',
        sourceComponentId: '#listBtnId',
      },
      type: 'Custom',
    },
    {
      name: 'Select',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#gridTabId',
        sourceComponentId: '#gridBtnId',
      },
      type: 'Custom',
    },
    {
      name: 'SetSearchValue',
      sourceEvent: 'Change',
      ref: {
        targetComponentId: '#dataGrid',
        sourceComponentId: '#searchGrid',
      },
      type: 'Custom',
    },
    {
      name: 'SetSearchValue',
      sourceEvent: 'Change',
      ref: {
        targetComponentId: '#dataList',
        sourceComponentId: '#listSearch',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'onNoResults',
      ref: {
        targetComponentId: '#noResultsListColumn',
        sourceComponentId: '#dataList',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onSuccess',
      ref: {
        targetComponentId: '#noResultsListColumn',
        sourceComponentId: '#dataList',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'onNoResults',
      ref: {
        targetComponentId: '#noResultsGridColumn',
        sourceComponentId: '#dataGrid',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onSuccess',
      ref: {
        targetComponentId: '#noResultsGridColumn',
        sourceComponentId: '#dataGrid',
      },
      type: 'Custom',
    },
  ],
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
