(() => ({
  name: 'CRUD with slide-out panel',
  icon: 'DataTable',
  type: 'page',
  description: 'This page contains a datatable with CRUD slide-out panel.',
  detail:
    'In this ready to use Data Table, it is possible to create, display (read), update and delete records. These functionalities are shown in a slide-out panel.',
  previewUrl: 'https://preview.betty.app/crud-with-slide-out-panel',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Crud_With_Slide_Out_Panel.jpg',
  category: 'DATA',
  beforeCreate: ({
    close,
    components: {
      Header,
      Content,
      Footer,
      Field,
      Text,
      CheckBox,
      ModelSelector,
      PropertiesSelector,
    },
    helpers: { useModelQuery, camelToSnakeCase },
    prefab,
    save,
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [properties, setProperties] = React.useState([]);
    const [detailProperties, setDetailProperties] = React.useState([]);
    const [modelValidation, setModelValidation] = React.useState(false);
    const [propertiesValidation, setPropertiesValidation] = React.useState(
      false,
    );
    const [
      createContainsNoEditableProperties,
      setCreateContainsNoEditableProperties,
    ] = React.useState(false);
    const [
      createPropertiesValidation,
      setCreatePropertiesValidation,
    ] = React.useState(false);
    const [
      selectedCreateFormProperties,
      setSelectedCreateFormProperties,
    ] = React.useState([]);
    const [
      createFormUseDataProperties,
      setCreateFormUseDataProperties,
    ] = React.useState(true);
    const { data } = useModelQuery({
      variables: { id: modelId },
      skip: !modelId,
      onCompleted: response => {
        setDetailProperties(response.model.properties);
      },
    });

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

    const capitalize = s => {
      if (typeof s !== 'string') return '';
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const enrichDetailProperty = obj => {
      const returnObj = { ...obj };
      if (data && data.model) {
        let foundProperty = {};
        foundProperty = data.model.properties.find(
          target => target.id === obj.id,
        );
        if (foundProperty) {
          returnObj.name = `{{ ${data.model.name}.${foundProperty.name} }}`;
          returnObj.id = [foundProperty.id];
          // eslint-disable-next-line no-underscore-dangle
          returnObj.type = foundProperty.__typename.toUpperCase();
          // eslint-disable-next-line no-underscore-dangle
          delete returnObj.__typename;
          delete returnObj.modelId;
          delete returnObj.unique;
          if (obj.kind === 'IMAGE' || obj.kind === 'FILE') {
            returnObj.useKey = 'url';
          }
        }
      }
      return returnObj;
    };

    const iconConfiguration = {
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
    };

    function makeDescendantsArray(propertiesInput, kind) {
      const descendants = propertiesInput.map(property => {
        switch (property.kind) {
          case 'INTEGER': {
            return {
              name: 'TextField',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
                  label: 'Label',
                  key: 'customModelAttribute',
                  type: 'CUSTOM_MODEL_ATTRIBUTE',
                  configuration: {
                    allowedTypes: ['integer'],
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
                    placeholder: '[0-9]{8,}',
                    condition: {
                      type: 'SHOW',
                      option: 'validationOptions',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  label: 'Min value',
                  key: 'minvalue',
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
                  label: 'Max value',
                  key: 'maxvalue',
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
                  value: ['This value is below the set minimum'],
                  label: 'Value below minimum message',
                  key: 'validationBelowMinimum',
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
                  value: ['This value is above the set maximum'],
                  label: 'Value above maximun',
                  key: 'validationAboveMaximum',
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
                      {
                        name: 'Standard',
                        value: 'standard',
                      },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
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
                  key: 'adornment',
                  value: '',
                  type: 'TEXT',
                },
                {
                  type: 'CUSTOM',
                  label: 'Position',
                  key: 'adornmentPosition',
                  value: 'start',
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'adornment',
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
                  label: 'Type',
                  key: 'type',
                  value: 'number',
                  type: 'TEXT',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'adornment',
                      comparator: 'EQ',
                      value: 0,
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
            };
          }
          case 'EMAIL_ADDRESS': {
            return {
              name: 'TextField',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
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
                    placeholder: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
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
                  value: ['No valid value provided'],
                  label: 'Email mismatch message',
                  key: 'validationTypeMismatch',
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
                      {
                        name: 'Standard',
                        value: 'standard',
                      },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
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
                  value: 'Email',
                  type: 'CUSTOM',
                  configuration: iconConfiguration,
                },
                {
                  type: 'CUSTOM',
                  label: 'Position',
                  key: 'adornmentPosition',
                  value: 'end',
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'adornmentIcon',
                      comparator: 'EQ',
                      value: 'none',
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
                  label: 'Type',
                  key: 'type',
                  value: 'email',
                  type: 'TEXT',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'adornmentIcon',
                      comparator: 'EQ',
                      value: 0,
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
            };
          }
          case 'DECIMAL': {
            return {
              name: 'TextField',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
                  label: 'Label',
                  key: 'customModelAttribute',
                  type: 'CUSTOM_MODEL_ATTRIBUTE',
                  configuration: {
                    allowedTypes: ['decimal'],
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
                    placeholder: '[0-9]{8,}',
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
                      {
                        name: 'Standard',
                        value: 'standard',
                      },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
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
                  key: 'adornment',
                  value: '',
                  type: 'TEXT',
                },
                {
                  type: 'CUSTOM',
                  label: 'Position',
                  key: 'adornmentPosition',
                  value: 'start',
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'adornment',
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
                  label: 'Type',
                  key: 'type',
                  value: 'decimal',
                  type: 'TEXT',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'adornment',
                      comparator: 'EQ',
                      value: 0,
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
            };
          }
          case 'TEXT': {
            return {
              name: 'TextField',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
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
                    placeholder: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
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
                  value: false,
                  label: 'Disabled',
                  key: 'disabled',
                  type: 'TOGGLE',
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
                      {
                        name: 'Standard',
                        value: 'standard',
                      },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
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
                  value: true,
                  label: 'Multiline',
                  key: 'multiline',
                  type: 'TOGGLE',
                },
                {
                  value: 4,
                  label: 'Rows',
                  key: 'rows',
                  type: 'NUMBER',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'multiline',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
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
                  value: 'none',
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
            };
          }
          case 'PRICE': {
            return {
              name: 'TextField',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
                  label: 'Label',
                  key: 'customModelAttribute',
                  type: 'CUSTOM_MODEL_ATTRIBUTE',
                  configuration: {
                    allowedTypes: ['decimal'],
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
                    placeholder: '[0-9]+(\\.[0-9][0-9]?)?',
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
                      {
                        name: 'Standard',
                        value: 'standard',
                      },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
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
                  label: 'Currency',
                  key: 'adornment',
                  value: 'â‚¬',
                  type: 'TEXT',
                },
                {
                  type: 'CUSTOM',
                  label: 'Position',
                  key: 'adornmentPosition',
                  value: 'start',
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'adornment',
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
                  label: 'Type',
                  key: 'type',
                  value: 'decimal',
                  type: 'TEXT',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'adornment',
                      comparator: 'EQ',
                      value: 0,
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
            };
          }
          case 'PASSWORD': {
            return {
              name: 'TextField',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
                  label: 'Label',
                  key: 'customModelAttribute',
                  type: 'CUSTOM_MODEL_ATTRIBUTE',
                  configuration: {
                    allowedTypes: ['string'],
                  },
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
                  value: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                  type: 'TEXT',
                  configuration: {
                    placeholder: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
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
                  value: [
                    'Password must contain 8 characters, 1 lowercase character, 1 upper case character and 1 digit',
                  ],
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
                      {
                        name: 'Standard',
                        value: 'standard',
                      },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
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
                  label: 'Show password toggle',
                  key: 'adornment',
                  value: true,
                  type: 'TOGGLE',
                },
                {
                  type: 'CUSTOM',
                  label: 'Position',
                  key: 'adornmentPosition',
                  value: 'end',
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'adornment',
                      comparator: 'EQ',
                      value: false,
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
                  label: 'Type',
                  key: 'type',
                  value: 'password',
                  type: 'TEXT',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'adornmentPosition',
                      comparator: 'EQ',
                      value: 0,
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
            };
          }
          case 'DATE': {
            return {
              name: 'DateTimePicker',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
                  label: 'Label',
                  key: 'customModelAttribute',
                  type: 'CUSTOM_MODEL_ATTRIBUTE',
                  configuration: {
                    allowedTypes: ['date'],
                  },
                },
                {
                  label: 'Type',
                  key: 'type',
                  value: 'date',
                  type: 'TEXT',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'customModelAttribute',
                      comparator: 'EQ',
                      value: false,
                    },
                  },
                },
                {
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
                  type: 'TOGGLE',
                },
                {
                  type: 'TOGGLE',
                  label: 'Disable Toolbar',
                  key: 'disableToolbar',
                  value: false,
                },
                {
                  type: 'TOGGLE',
                  label: 'Disable past dates',
                  key: 'disablePastDates',
                  value: false,
                },
                {
                  label: 'Language',
                  key: 'locale',
                  value: 'en',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'English', value: 'en' },
                      { name: 'Dutch', value: 'nl' },
                    ],
                  },
                },
                {
                  value: 'MM/dd/yyyy',
                  label: 'Format',
                  key: 'dateFormat',
                  type: 'TEXT',
                },
                {
                  value: false,
                  label: 'Error',
                  key: 'error',
                  type: 'TOGGLE',
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
                  value: 'inline',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Dialog', value: 'dialog' },
                      { name: 'Inline', value: 'inline' },
                      { name: 'Static', value: 'static' },
                    ],
                  },
                },
                {
                  type: 'TOGGLE',
                  label: 'Clearable',
                  key: 'clearable',
                  value: false,
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'variant',
                      comparator: 'EQ',
                      value: 'dialog',
                    },
                  },
                },
                {
                  label: 'Input Variant',
                  key: 'inputvariant',
                  value: 'outlined',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'Standard',
                        value: 'standard',
                      },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
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
                  label: 'Background color popup',
                  key: 'backgroundColorPopup',
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
            };
          }
          case 'DATE_TIME': {
            return {
              name: 'DateTimePicker',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
                  label: 'Label',
                  key: 'customModelAttribute',
                  type: 'CUSTOM_MODEL_ATTRIBUTE',
                  configuration: {
                    allowedTypes: ['date_time'],
                  },
                },
                {
                  label: 'Type',
                  key: 'type',
                  value: 'datetime',
                  type: 'TEXT',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'customModelAttribute',
                      comparator: 'EQ',
                      value: false,
                    },
                  },
                },
                {
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
                  type: 'TOGGLE',
                },
                {
                  type: 'TOGGLE',
                  label: 'Disable Toolbar',
                  key: 'disableToolbar',
                  value: false,
                },
                {
                  type: 'TOGGLE',
                  label: 'Disable past dates',
                  key: 'disablePastDates',
                  value: false,
                },
                {
                  label: 'Language',
                  key: 'locale',
                  value: 'en',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'English', value: 'en' },
                      { name: 'Dutch', value: 'nl' },
                    ],
                  },
                },
                {
                  value: 'MM/dd/yyyy HH:mm:ss',
                  label: 'Format',
                  key: 'dateTimeFormat',
                  type: 'TEXT',
                  configuration: {
                    placeholder: 'dd/MM/yyyy HH:mm:ss',
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'datetime',
                    },
                  },
                },
                {
                  value: true,
                  label: 'Use 24-hour format',
                  key: 'use24HourClockTime',
                  type: 'TOGGLE',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'time',
                    },
                  },
                },
                {
                  value: true,
                  label: 'Use 24-hour format',
                  key: 'use24HourClockDateTime',
                  type: 'TOGGLE',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'datetime',
                    },
                  },
                },
                {
                  value: false,
                  label: 'Error',
                  key: 'error',
                  type: 'TOGGLE',
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
                  value: 'inline',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Dialog', value: 'dialog' },
                      { name: 'Inline', value: 'inline' },
                      { name: 'Static', value: 'static' },
                    ],
                  },
                },
                {
                  type: 'TOGGLE',
                  label: 'Clearable',
                  key: 'clearable',
                  value: false,
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'variant',
                      comparator: 'EQ',
                      value: 'dialog',
                    },
                  },
                },
                {
                  label: 'Input Variant',
                  key: 'inputvariant',
                  value: 'outlined',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'Standard',
                        value: 'standard',
                      },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
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
                  label: 'Background color popup',
                  key: 'backgroundColorPopup',
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
            };
          }
          case 'TIME': {
            return {
              name: 'DateTimePicker',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
                  label: 'Label',
                  key: 'customModelAttribute',
                  type: 'CUSTOM_MODEL_ATTRIBUTE',
                  configuration: {
                    allowedTypes: ['string'],
                  },
                },
                {
                  label: 'Type',
                  key: 'type',
                  value: 'time',
                  type: 'TEXT',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'customModelAttribute',
                      comparator: 'EQ',
                      value: false,
                    },
                  },
                },
                {
                  value: true,
                  label: 'Autocomplete',
                  key: 'autoComplete',
                  type: 'TOGGLE',
                },
                {
                  type: 'TOGGLE',
                  label: 'Disable Toolbar',
                  key: 'disableToolbar',
                  value: false,
                },
                {
                  value: 'HH:mm:ss',
                  label: 'Format',
                  key: 'timeFormat',
                  type: 'TEXT',
                },
                {
                  value: true,
                  label: 'Use 24-hour format',
                  key: 'use24HourClockTime',
                  type: 'TOGGLE',
                },
                {
                  value: false,
                  label: 'Error',
                  key: 'error',
                  type: 'TOGGLE',
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
                  value: 'inline',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Dialog', value: 'dialog' },
                      { name: 'Inline', value: 'inline' },
                      { name: 'Static', value: 'static' },
                    ],
                  },
                },
                {
                  type: 'TOGGLE',
                  label: 'Clearable',
                  key: 'clearable',
                  value: false,
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'variant',
                      comparator: 'EQ',
                      value: 'dialog',
                    },
                  },
                },
                {
                  label: 'Input Variant',
                  key: 'inputvariant',
                  value: 'outlined',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: 'Standard',
                        value: 'standard',
                      },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
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
                  label: 'Background color popup',
                  key: 'backgroundColorPopup',
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
            };
          }
          case 'FILE':
          case 'IMAGE': {
            return {
              name: 'FileUpload',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
                  label: 'Label',
                  key: 'customModelAttribute',
                  type: 'CUSTOM_MODEL_ATTRIBUTE',
                  configuration: {
                    allowedTypes: ['file'],
                  },
                },
                {
                  value: false,
                  label: 'Hide default error',
                  key: 'hideDefaultError',
                  type: 'TOGGLE',
                },
                {
                  type: 'TOGGLE',
                  label: 'Disabled',
                  key: 'disabled',
                  value: false,
                },
                {
                  value: [],
                  label: 'Helper text',
                  key: 'helperText',
                  type: 'VARIABLE',
                },
                {
                  type: 'TOGGLE',
                  label: 'Full width',
                  key: 'fullWidth',
                  value: true,
                },
                {
                  value: ['image/*'],
                  label: 'Accept files',
                  key: 'accept',
                  type: 'VARIABLE',
                },
                {
                  type: 'TOGGLE',
                  label: 'Allow multiple',
                  key: 'multiple',
                  value: false,
                },
                {
                  label: 'Button size',
                  key: 'size',
                  value: 'medium',
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
                  type: 'CUSTOM',
                  label: 'Button variant',
                  key: 'variant',
                  value: 'contained',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Text', value: 'text' },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
                      {
                        name: 'Contain',
                        value: 'contained',
                      },
                      { name: 'Icon', value: 'icon' },
                    ],
                  },
                },
                {
                  type: 'VARIABLE',
                  label: 'Button text',
                  key: 'buttonText',
                  value: ['Upload'],
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
                  label: 'Button icon',
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
                  label: 'Button icon position',
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
                  value: false,
                  label: 'Styles',
                  key: 'styles',
                  type: 'TOGGLE',
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
                  label: 'Button text color',
                  key: 'buttonTextColor',
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
                  label: 'Button color',
                  key: 'background',
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
            };
          }
          case 'BOOLEAN': {
            return {
              name: 'Checkbox',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
                  label: 'Label',
                  key: 'customModelAttribute',
                  type: 'CUSTOM_MODEL_ATTRIBUTE',
                  configuration: {
                    allowedTypes: ['boolean'],
                  },
                },
                {
                  label: 'Label Position',
                  key: 'position',
                  value: 'end',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Start', value: 'start' },
                      { name: 'End', value: 'end' },
                      { name: 'Top', value: 'top' },
                      { name: 'Bottom', value: 'bottom' },
                    ],
                  },
                },
                {
                  value: false,
                  label: 'Validation options',
                  key: 'validationOptions',
                  type: 'TOGGLE',
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
                  type: 'TOGGLE',
                  label: 'Disabled',
                  key: 'disabled',
                  value: false,
                },
                {
                  value: [],
                  label: 'Helper text',
                  key: 'helperText',
                  type: 'VARIABLE',
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
                  value: false,
                  label: 'Styles',
                  key: 'styles',
                  type: 'TOGGLE',
                },
                {
                  type: 'COLOR',
                  label: 'Checkbox color',
                  key: 'checkboxColor',
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
                  label: 'Checkbox color checked',
                  key: 'checkboxColorChecked',
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
            };
          }
          case 'LIST': {
            return {
              name: 'Select',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
                  label: 'Label',
                  key: 'customModelAttribute',
                  type: 'CUSTOM_MODEL_ATTRIBUTE',
                  configuration: {
                    allowedTypes: ['string'],
                  },
                },
                {
                  value: [''],
                  label: 'Blank option',
                  key: 'blanco',
                  type: 'VARIABLE',
                },
                {
                  label: 'Option type',
                  key: 'optionType',
                  value: 'static',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Static', value: 'static' },
                      { name: 'Model', value: 'model' },
                      { name: 'Property', value: 'property' },
                    ],
                  },
                },
                {
                  value: property.id,
                  label: 'Property',
                  key: 'property',
                  type: 'PROPERTY',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'optionType',
                      comparator: 'EQ',
                      value: 'property',
                    },
                  },
                },
                {
                  type: 'MODEL',
                  label: 'Model',
                  key: 'model',
                  value: '',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'optionType',
                      comparator: 'EQ',
                      value: 'model',
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
                    condition: {
                      type: 'SHOW',
                      option: 'optionType',
                      comparator: 'EQ',
                      value: 'model',
                    },
                  },
                },
                {
                  type: 'PROPERTY',
                  label: 'Order by',
                  key: 'orderBy',
                  value: '',
                  configuration: {
                    dependsOn: 'model',
                    apiVersion: 'v1',
                    condition: {
                      type: 'SHOW',
                      option: 'optionType',
                      comparator: 'EQ',
                      value: 'model',
                    },
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
                  type: 'PROPERTY',
                  label: 'Property',
                  key: 'labelProperty',
                  value: '',
                  configuration: {
                    dependsOn: 'model',
                    condition: {
                      type: 'SHOW',
                      option: 'optionType',
                      comparator: 'EQ',
                      value: 'model',
                    },
                  },
                },
                {
                  value: '',
                  label: 'Value property',
                  key: 'valueProperty',
                  type: 'PROPERTY',
                  configuration: {
                    dependsOn: 'model',
                    condition: {
                      type: 'SHOW',
                      option: 'optionType',
                      comparator: 'EQ',
                      value: 'model',
                    },
                  },
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
                    condition: {
                      type: 'SHOW',
                      option: 'optionType',
                      comparator: 'EQ',
                      value: 'model',
                    },
                  },
                },
                {
                  type: 'TEXT',
                  label: 'Options',
                  key: 'selectOptions',
                  value: 'a\nb\nc',
                  configuration: {
                    as: 'MULTILINE',
                    condition: {
                      type: 'SHOW',
                      option: 'optionType',
                      comparator: 'EQ',
                      value: 'static',
                    },
                  },
                },
                {
                  value: false,
                  label: 'Validation options',
                  key: 'validationOptions',
                  type: 'TOGGLE',
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
                  type: 'TOGGLE',
                  label: 'Disabled',
                  key: 'disabled',
                  value: false,
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
            };
          }
          default:
            return {
              name: 'TextField',
              options: [
                {
                  value: {
                    label: [property.label],
                    value: [
                      {
                        id: property.id,
                        type: property.type,
                      },
                    ],
                    propertyIds: property.id,
                    ref: {
                      id:
                        kind === 'edit'
                          ? `#edit_attribute_${property.id[0]}`
                          : `#attribute_${property.id[0]}`,
                    },
                  },
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
                    placeholder: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
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
                      {
                        name: 'Standard',
                        value: 'standard',
                      },
                      {
                        name: 'Outlined',
                        value: 'outlined',
                      },
                      {
                        name: 'Filled',
                        value: 'filled',
                      },
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
                      {
                        name: 'Medium',
                        value: 'medium',
                      },
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
                      {
                        name: 'Normal',
                        value: 'normal',
                      },
                    ],
                  },
                },
                {
                  label: 'Adornment',
                  key: 'adornmentIcon',
                  value: 'none',
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
            };
        }
      });
      return descendants;
    }

    const makeDetails = (property, detailDataContainer) => {
      const valueField = () =>
        property.kind === 'IMAGE'
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
                  value: [enrichDetailProperty(property)],
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
                  value: [enrichDetailProperty(property)],
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
            };
      const newDetail = [
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
              value: ['0rem', '0rem', 'M', '0rem'],
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
              value: true,
              label: 'Show background options',
              key: 'backgroundOptions',
              type: 'TOGGLE',
            },
            {
              value: 'Accent1',
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
              value: 20,
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
              value: 'inherit',
              label: 'Background attachment',
              key: 'backgroundAttachment',
              type: 'CUSTOM',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Inherit', value: 'inherit' },
                  { name: 'Scroll', value: 'scroll' },
                  { name: 'Fixed', value: 'fixed' },
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
              value: '5px',
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
                  value: [`${[property.label]}:`],
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
            valueField(),
          ],
        },
      ];
      // eslint-disable-next-line no-param-reassign
      detailDataContainer.descendants = [
        ...detailDataContainer.descendants,
        ...newDetail,
      ];
    };

    return (
      <>
        <Header onClose={close} title="Configure component" />
        <Content>
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
              }}
              value={modelId}
            />
          </Field>
          <Field
            label="Columns in the data table"
            error={
              propertiesValidation && (
                <Text color="#e82600">Selecting a property is required</Text>
              )
            }
          >
            <PropertiesSelector
              modelId={modelId}
              value={properties}
              disabledKinds={[
                'BELONGS_TO',
                'HAS_AND_BELONGS_TO_MANY',
                'HAS_MANY',
                'MULTI_FILE',
                'AUTO_INCREMENT',
                'COUNT',
                'MULTI_IMAGE',
                'PDF',
                'RICH_TEXT',
                'SIGNED_PDF',
                'SUM',
                'BOOLEAN_EXPRESSION',
                'DATE_EXPRESSION',
                'DATE_TIME_EXPRESSION',
                'DECIMAL_EXPRESSION',
                'INTEGER_EXPRESSION',
                'MINUTES_EXPRESSION',
                'PRICE_EXPRESSION',
                'STRING_EXPRESSION',
                'TEXT_EXPRESSION',
                'MINUTES',
                'ZIPCODE',
              ]}
              onChange={value => {
                setProperties(value);
                setCreateContainsNoEditableProperties(false);
              }}
            />
          </Field>
          <Field label="Create & Update Form">
            <CheckBox
              label="Use the same properties as the data table in the create and update form"
              checked={createFormUseDataProperties}
              onChange={() => {
                setCreateFormUseDataProperties(!createFormUseDataProperties);
                setCreateContainsNoEditableProperties(false);
              }}
            />
            <Field
              error={
                createContainsNoEditableProperties && (
                  <Text color="#e82600">
                    &quot;Id&quot;, &quot;Created at&quot; and &quot;Updated
                    at&quot; are not editable. At least one editable property is
                    necessary in the create form. Please select one.
                  </Text>
                )
              }
            />
            {!createFormUseDataProperties && (
              <Field
                label="Input fields in the create and update form"
                error={
                  createPropertiesValidation && (
                    <Text color="#e82600">
                      Selecting a property is required
                    </Text>
                  )
                }
              >
                <PropertiesSelector
                  modelId={modelId}
                  value={selectedCreateFormProperties}
                  disabledNames={['created_at', 'updated_at', 'id']}
                  disabledKinds={[
                    'BELONGS_TO',
                    'HAS_AND_BELONGS_TO_MANY',
                    'HAS_MANY',
                    'MULTI_FILE',
                    'AUTO_INCREMENT',
                    'COUNT',
                    'MULTI_IMAGE',
                    'PDF',
                    'RICH_TEXT',
                    'SIGNED_PDF',
                    'SUM',
                    'BOOLEAN_EXPRESSION',
                    'DATE_EXPRESSION',
                    'DATE_TIME_EXPRESSION',
                    'DECIMAL_EXPRESSION',
                    'INTEGER_EXPRESSION',
                    'MINUTES_EXPRESSION',
                    'PRICE_EXPRESSION',
                    'STRING_EXPRESSION',
                    'TEXT_EXPRESSION',
                    'MINUTES',
                    'ZIPCODE',
                  ]}
                  onChange={value => {
                    setCreatePropertiesValidation(!value.length);
                    setSelectedCreateFormProperties(value);
                    setCreateContainsNoEditableProperties(!value.length);
                  }}
                />
              </Field>
            )}
          </Field>
        </Content>
        <Footer
          onClose={close}
          onSave={() => {
            const selectedCreateFormPropertiesLength =
              selectedCreateFormProperties.length;
            const propertiesLength = properties.length;
            if (
              !modelId ||
              (selectedCreateFormPropertiesLength < 1 &&
                !createFormUseDataProperties) ||
              propertiesLength < 1
            ) {
              setModelValidation(!modelId);
              setCreatePropertiesValidation(
                selectedCreateFormPropertiesLength < 1 &&
                  !createFormUseDataProperties,
              );

              setPropertiesValidation(propertiesLength < 1);
              return;
            }
            const createFormProperties = (createFormUseDataProperties
              ? properties
              : selectedCreateFormProperties
            ).filter(
              property =>
                property.label !== 'Created at' &&
                property.label !== 'Updated at' &&
                property.label !== 'Id',
            );
            if (createFormProperties.length < 1) {
              setCreateContainsNoEditableProperties(true);
              return;
            }
            const newPrefab = { ...prefab };

            const idProperty = data.model.properties.find(p => p.name === 'id');

            const drawerSidebar = [
              {
                name: 'DrawerSidebar',
                ref: {
                  id: '#drawerSidebar',
                },
                options: [
                  {
                    type: 'COLOR',
                    label: 'Theme background color',
                    key: 'themeBgColor',
                    value: 'White',
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
                        value: '100%',
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
                        value: ['XL', 'XL', 'XL', 'XL'],
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
                              id: '#createTab',
                            },
                            options: [
                              {
                                label: 'Tab label',
                                key: 'label',
                                value: ['CreateTab'],
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
                                name: 'Text',
                                options: [
                                  {
                                    type: 'VARIABLE',
                                    label: 'Content',
                                    key: 'content',
                                    value: [`Create ${data.model.name}`],
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
                                    value: ['0rem', '0rem', 'S', '0rem'],
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
                              {
                                name: 'Alert',
                                ref: {
                                  id: '#createSuccesAlert',
                                },
                                options: [
                                  {
                                    value: false,
                                    label: 'Toggle visibility',
                                    key: 'visible',
                                    type: 'TOGGLE',
                                    configuration: {
                                      as: 'VISIBILITY',
                                    },
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Body text',
                                    key: 'bodyText',
                                    value: [
                                      `${capitalize(
                                        data.model.name,
                                      )} created succesfully`,
                                    ],
                                    configuration: {
                                      dependsOn: 'model',
                                    },
                                  },
                                  {
                                    label:
                                      'Allow to overwrite by the server response',
                                    key: 'allowTextServerResponse',
                                    value: false,
                                    type: 'TOGGLE',
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Title text',
                                    key: 'titleText',
                                    value: [''],
                                  },
                                  {
                                    label:
                                      'Allow to overwrite by the server response',
                                    key: 'allowTitleServerResponse',
                                    value: false,
                                    type: 'TOGGLE',
                                  },
                                  {
                                    value: 'White',
                                    label: 'Text color',
                                    key: 'textColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'White',
                                    label: 'Icon color',
                                    key: 'iconColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'Success',
                                    label: 'Background color',
                                    key: 'background',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'Transparent',
                                    label: 'Border color',
                                    key: 'borderColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    label: 'Icon',
                                    key: 'icon',
                                    value: 'None',
                                    type: 'CUSTOM',
                                    configuration: iconConfiguration,
                                  },
                                  {
                                    value: false,
                                    label: 'Collapsable',
                                    key: 'collapsable',
                                    type: 'TOGGLE',
                                  },
                                  {
                                    type: 'CUSTOM',
                                    label: 'Horizontal Alignment',
                                    key: 'horizontalAlignment',
                                    value: 'flex-start',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Left', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Right', value: 'flex-end' },
                                      ],
                                      condition: {
                                        type: 'HIDE',
                                        option: 'collapsable',
                                        comparator: 'EQ',
                                        value: true,
                                      },
                                    },
                                  },
                                  {
                                    type: 'CUSTOM',
                                    label: 'Vertical Alignment',
                                    key: 'verticalAlignment',
                                    value: 'stretch',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Top', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Bottom', value: 'flex-end' },
                                        { name: 'Justified', value: 'stretch' },
                                      ],
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
                              {
                                name: 'Alert',
                                ref: {
                                  id: '#errorCreateAlert',
                                },
                                options: [
                                  {
                                    value: false,
                                    label: 'Toggle visibility',
                                    key: 'visible',
                                    type: 'TOGGLE',
                                    configuration: {
                                      as: 'VISIBILITY',
                                    },
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Body text',
                                    key: 'bodyText',
                                    value: [
                                      `Something went wrong while creating new ${data.model.name}`,
                                    ],
                                    configuration: {
                                      dependsOn: 'model',
                                    },
                                  },
                                  {
                                    label:
                                      'Allow to overwrite by the server response',
                                    key: 'allowTextServerResponse',
                                    value: false,
                                    type: 'TOGGLE',
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Title text',
                                    key: 'titleText',
                                    value: [''],
                                  },
                                  {
                                    label:
                                      'Allow to overwrite by the server response',
                                    key: 'allowTitleServerResponse',
                                    value: false,
                                    type: 'TOGGLE',
                                  },
                                  {
                                    value: 'White',
                                    label: 'Text color',
                                    key: 'textColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'White',
                                    label: 'Icon color',
                                    key: 'iconColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'Danger',
                                    label: 'Background color',
                                    key: 'background',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'Transparent',
                                    label: 'Border color',
                                    key: 'borderColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    label: 'Icon',
                                    key: 'icon',
                                    value: 'Warning',
                                    type: 'CUSTOM',
                                    configuration: iconConfiguration,
                                  },
                                  {
                                    value: false,
                                    label: 'Collapsable',
                                    key: 'collapsable',
                                    type: 'TOGGLE',
                                  },
                                  {
                                    type: 'CUSTOM',
                                    label: 'Horizontal Alignment',
                                    key: 'horizontalAlignment',
                                    value: 'flex-start',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Left', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Right', value: 'flex-end' },
                                      ],
                                      condition: {
                                        type: 'HIDE',
                                        option: 'collapsable',
                                        comparator: 'EQ',
                                        value: true,
                                      },
                                    },
                                  },
                                  {
                                    type: 'CUSTOM',
                                    label: 'Vertical Alignment',
                                    key: 'verticalAlignment',
                                    value: 'stretch',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Top', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Bottom', value: 'flex-end' },
                                        { name: 'Justified', value: 'stretch' },
                                      ],
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
                              {
                                name: 'Form',
                                ref: {
                                  id: '#createForm',
                                },
                                options: [
                                  {
                                    value: {
                                      modelId,
                                      ref: {
                                        customModelId: '#customModelVariableId',
                                        actionId: '#createActionId',
                                        variableId: '#customModelVariableId',
                                        objectVariableId:
                                          '#createObjectVariableId',
                                      },
                                    },
                                    label: 'Action',
                                    key: 'formData',
                                    type: 'FORM_DATA',
                                    configuration: {
                                      apiVersion: 'v1',
                                    },
                                  },
                                  {
                                    value: modelId,
                                    label: 'Model',
                                    key: 'model',
                                    type: 'MODEL',
                                    configuration: {
                                      condition: {
                                        type: 'SHOW',
                                        option: 'formData',
                                        comparator: 'EQ',
                                        value: '',
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
                                    value: 'interaction',
                                    label: 'Success message',
                                    key: 'showSuccess',
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
                                    value: 'Thanks for submitting the form!',
                                    label: 'Success message',
                                    key: 'formSuccessMessage',
                                    type: 'TEXT',
                                    configuration: {
                                      condition: {
                                        type: 'SHOW',
                                        option: 'showSuccess',
                                        comparator: 'EQ',
                                        value: 'built-in',
                                      },
                                    },
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
                                    value: 'Failed to submit the form!',
                                    label: 'Error message',
                                    key: 'formErrorMessage',
                                    type: 'TEXT',
                                    configuration: {
                                      condition: {
                                        type: 'SHOW',
                                        option: 'showError',
                                        comparator: 'EQ',
                                        value: 'built-in',
                                      },
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
                                        {
                                          name: 'Content',
                                          value: 'showChildren',
                                        },
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
                                  {
                                    value: ['0rem', '0rem', 'M', '0rem'],
                                    label: 'Outer space',
                                    key: 'outerSpacing',
                                    type: 'SIZES',
                                  },
                                  {
                                    value: '',
                                    label: 'Redirect after succesful submit',
                                    key: 'redirect',
                                    type: 'ENDPOINT',
                                  },
                                ],
                                descendants: [
                                  {
                                    name: 'Box',
                                    options: [
                                      {
                                        value: 'flex-start',
                                        label: 'Alignment',
                                        key: 'alignment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            { name: 'None', value: 'none' },
                                            {
                                              name: 'Left',
                                              value: 'flex-start',
                                            },
                                            { name: 'Center', value: 'center' },
                                            {
                                              name: 'Right',
                                              value: 'flex-end',
                                            },
                                            {
                                              name: 'Justified',
                                              value: 'space-between',
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        value: false,
                                        label:
                                          'Stretch (when in flex container)',
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
                                        value: ['M', '0rem', 'XL', '0rem'],
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
                                            {
                                              name: 'Relative',
                                              value: 'relative',
                                            },
                                            {
                                              name: 'Absolute',
                                              value: 'absolute',
                                            },
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
                                            {
                                              name: 'Initial',
                                              value: 'initial',
                                            },
                                            {
                                              name: 'Contain',
                                              value: 'contain',
                                            },
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
                                        value: 'no-repeat',
                                        label: 'Background repeat',
                                        key: 'backgroundRepeat',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'None',
                                              value: 'no-repeat',
                                            },
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
                                        name: 'Button',
                                        ref: {
                                          id: '#createCancelButton',
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
                                            value: ['Cancel'],
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
                                                {
                                                  name: 'Small',
                                                  value: 'small',
                                                },
                                                {
                                                  name: 'Medium',
                                                  value: 'medium',
                                                },
                                                {
                                                  name: 'Large',
                                                  value: 'large',
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
                                              'S',
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
                                          id: '#createSubmitButton',
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
                                            type: 'CUSTOM',
                                            label: 'type',
                                            key: 'type',
                                            value: 'submit',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Submit',
                                                  value: 'submit',
                                                },
                                                {
                                                  name: 'Reset',
                                                  value: 'reset',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label: 'Button text',
                                            key: 'buttonText',
                                            value: ['Create'],
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
                                                { name: 'End', value: 'end' },
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
                          {
                            name: 'Tab',
                            ref: {
                              id: '#detailTab',
                            },
                            options: [
                              {
                                label: 'Tab label',
                                key: 'label',
                                value: ['DetailTab'],
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
                                        { name: 'Center', value: 'center' },
                                        { name: 'Right', value: 'right' },
                                      ],
                                    },
                                  },
                                  {
                                    value: ['0rem', '0rem', 'M', '0rem'],
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
                              {
                                name: 'DataContainer',
                                ref: {
                                  id: '#detailsDataContainer',
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
                                        {
                                          name: 'Content',
                                          value: 'showChildren',
                                        },
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
                                descendants: [],
                              },
                              {
                                name: 'Button',
                                ref: {
                                  id: '#detailCancelButton',
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
                                    value: ['Cancel'],
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
                                        { name: 'Small', value: 'small' },
                                        { name: 'Medium', value: 'medium' },
                                        { name: 'Large', value: 'large' },
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
                                    value: ['M', '0rem', 'XL', '0rem'],
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
                            name: 'Tab',
                            ref: {
                              id: '#editTab',
                            },
                            options: [
                              {
                                label: 'Tab label',
                                key: 'label',
                                value: ['EditTab'],
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
                                name: 'Text',
                                options: [
                                  {
                                    type: 'VARIABLE',
                                    label: 'Content',
                                    key: 'content',
                                    value: [`Update ${data.model.name}`],
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
                                    value: ['0rem', '0rem', 'S', '0rem'],
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
                              {
                                name: 'Alert',
                                ref: {
                                  id: '#editSuccesAlert',
                                },
                                options: [
                                  {
                                    value: false,
                                    label: 'Toggle visibility',
                                    key: 'visible',
                                    type: 'TOGGLE',
                                    configuration: {
                                      as: 'VISIBILITY',
                                    },
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Body text',
                                    key: 'bodyText',
                                    value: [
                                      `${capitalize(
                                        data.model.name,
                                      )} updated succesfully`,
                                    ],
                                    configuration: {
                                      dependsOn: 'model',
                                    },
                                  },
                                  {
                                    label:
                                      'Allow to overwrite by the server response',
                                    key: 'allowTextServerResponse',
                                    value: false,
                                    type: 'TOGGLE',
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Title text',
                                    key: 'titleText',
                                    value: [''],
                                  },
                                  {
                                    label:
                                      'Allow to overwrite by the server response',
                                    key: 'allowTitleServerResponse',
                                    value: false,
                                    type: 'TOGGLE',
                                  },
                                  {
                                    value: 'White',
                                    label: 'Text color',
                                    key: 'textColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'White',
                                    label: 'Icon color',
                                    key: 'iconColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'Success',
                                    label: 'Background color',
                                    key: 'background',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'Transparent',
                                    label: 'Border color',
                                    key: 'borderColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    label: 'Icon',
                                    key: 'icon',
                                    value: 'None',
                                    type: 'CUSTOM',
                                    configuration: iconConfiguration,
                                  },
                                  {
                                    value: false,
                                    label: 'Collapsable',
                                    key: 'collapsable',
                                    type: 'TOGGLE',
                                  },
                                  {
                                    type: 'CUSTOM',
                                    label: 'Horizontal Alignment',
                                    key: 'horizontalAlignment',
                                    value: 'flex-start',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Left', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Right', value: 'flex-end' },
                                      ],
                                      condition: {
                                        type: 'HIDE',
                                        option: 'collapsable',
                                        comparator: 'EQ',
                                        value: true,
                                      },
                                    },
                                  },
                                  {
                                    type: 'CUSTOM',
                                    label: 'Vertical Alignment',
                                    key: 'verticalAlignment',
                                    value: 'stretch',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Top', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Bottom', value: 'flex-end' },
                                        { name: 'Justified', value: 'stretch' },
                                      ],
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
                              {
                                name: 'Alert',
                                ref: {
                                  id: '#errorEditAlert',
                                },
                                options: [
                                  {
                                    value: false,
                                    label: 'Toggle visibility',
                                    key: 'visible',
                                    type: 'TOGGLE',
                                    configuration: {
                                      as: 'VISIBILITY',
                                    },
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Body text',
                                    key: 'bodyText',
                                    value: [
                                      `Something went wrong while updating ${data.model.name}`,
                                    ],
                                    configuration: {
                                      dependsOn: 'model',
                                    },
                                  },
                                  {
                                    label:
                                      'Allow to overwrite by the server response',
                                    key: 'allowTextServerResponse',
                                    value: false,
                                    type: 'TOGGLE',
                                  },
                                  {
                                    type: 'VARIABLE',
                                    label: 'Title text',
                                    key: 'titleText',
                                    value: [''],
                                  },
                                  {
                                    label:
                                      'Allow to overwrite by the server response',
                                    key: 'allowTitleServerResponse',
                                    value: false,
                                    type: 'TOGGLE',
                                  },
                                  {
                                    value: 'White',
                                    label: 'Text color',
                                    key: 'textColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'White',
                                    label: 'Icon color',
                                    key: 'iconColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'Danger',
                                    label: 'Background color',
                                    key: 'background',
                                    type: 'COLOR',
                                  },
                                  {
                                    value: 'Transparent',
                                    label: 'Border color',
                                    key: 'borderColor',
                                    type: 'COLOR',
                                  },
                                  {
                                    label: 'Icon',
                                    key: 'icon',
                                    value: 'Warning',
                                    type: 'CUSTOM',
                                    configuration: iconConfiguration,
                                  },
                                  {
                                    value: false,
                                    label: 'Collapsable',
                                    key: 'collapsable',
                                    type: 'TOGGLE',
                                  },
                                  {
                                    type: 'CUSTOM',
                                    label: 'Horizontal Alignment',
                                    key: 'horizontalAlignment',
                                    value: 'flex-start',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Left', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Right', value: 'flex-end' },
                                      ],
                                      condition: {
                                        type: 'HIDE',
                                        option: 'collapsable',
                                        comparator: 'EQ',
                                        value: true,
                                      },
                                    },
                                  },
                                  {
                                    type: 'CUSTOM',
                                    label: 'Vertical Alignment',
                                    key: 'verticalAlignment',
                                    value: 'stretch',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'Top', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Bottom', value: 'flex-end' },
                                        { name: 'Justified', value: 'stretch' },
                                      ],
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
                              {
                                name: 'Form',
                                ref: {
                                  id: '#editForm',
                                },
                                options: [
                                  {
                                    value: {
                                      modelId,
                                      ref: {
                                        customModelId: '#editCustomModelId',
                                        actionId: '#editActionId',
                                        variableId:
                                          '#editCustomModelVariableId',
                                        objectVariableId:
                                          '#editObjectVariableId',
                                      },
                                    },
                                    label: 'Action',
                                    key: 'formData',
                                    type: 'FORM_DATA',
                                    configuration: {
                                      apiVersion: 'v1',
                                    },
                                  },
                                  {
                                    value: modelId,
                                    label: 'Model',
                                    key: 'model',
                                    type: 'MODEL',
                                    configuration: {
                                      condition: {
                                        type: 'SHOW',
                                        option: 'formData',
                                        comparator: 'EQ',
                                        value: '',
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
                                    value: 'interaction',
                                    label: 'Success message',
                                    key: 'showSuccess',
                                    type: 'CUSTOM',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Built in',
                                          value: 'built-in',
                                        },
                                        {
                                          name: 'Interaction',
                                          value: 'interaction',
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    value: 'Thanks for submitting the form!',
                                    label: 'Success message',
                                    key: 'formSuccessMessage',
                                    type: 'TEXT',
                                    configuration: {
                                      condition: {
                                        type: 'SHOW',
                                        option: 'showSuccess',
                                        comparator: 'EQ',
                                        value: 'built-in',
                                      },
                                    },
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
                                        {
                                          name: 'Built in',
                                          value: 'built-in',
                                        },
                                        {
                                          name: 'Interaction',
                                          value: 'interaction',
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    value: 'Failed to submit the form!',
                                    label: 'Error message',
                                    key: 'formErrorMessage',
                                    type: 'TEXT',
                                    configuration: {
                                      condition: {
                                        type: 'SHOW',
                                        option: 'showError',
                                        comparator: 'EQ',
                                        value: 'built-in',
                                      },
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
                                        {
                                          name: 'Content',
                                          value: 'showChildren',
                                        },
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
                                  {
                                    value: ['0rem', '0rem', 'M', '0rem'],
                                    label: 'Outer space',
                                    key: 'outerSpacing',
                                    type: 'SIZES',
                                  },
                                  {
                                    value: '',
                                    label: 'Redirect after succesful submit',
                                    key: 'redirect',
                                    type: 'ENDPOINT',
                                  },
                                ],
                                descendants: [
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
                                            {
                                              name: 'Left',
                                              value: 'flex-start',
                                            },
                                            { name: 'Center', value: 'center' },
                                            {
                                              name: 'Right',
                                              value: 'flex-end',
                                            },
                                            {
                                              name: 'Justified',
                                              value: 'space-between',
                                            },
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
                                        value: false,
                                        label:
                                          'Stretch (when in flex container)',
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
                                        value: ['M', '0rem', 'XL', '0rem'],
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
                                            {
                                              name: 'Relative',
                                              value: 'relative',
                                            },
                                            {
                                              name: 'Absolute',
                                              value: 'absolute',
                                            },
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
                                            {
                                              name: 'Initial',
                                              value: 'initial',
                                            },
                                            {
                                              name: 'Contain',
                                              value: 'contain',
                                            },
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
                                            {
                                              name: 'Left top',
                                              value: 'left top',
                                            },
                                            {
                                              name: 'Left center',
                                              value: 'left center',
                                            },
                                            {
                                              name: 'Left bottom',
                                              value: 'left bottom',
                                            },
                                            {
                                              name: 'Center top',
                                              value: 'center top',
                                            },
                                            {
                                              name: 'Center center',
                                              value: 'center center',
                                            },
                                            {
                                              name: 'Center bottom',
                                              value: 'center bottom',
                                            },
                                            {
                                              name: 'Right top',
                                              value: 'right top',
                                            },
                                            {
                                              name: 'Right center',
                                              value: 'right center',
                                            },
                                            {
                                              name: 'Right bottom',
                                              value: 'right bottom',
                                            },
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
                                            {
                                              name: 'None',
                                              value: 'no-repeat',
                                            },
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
                                        value: 'inherit',
                                        label: 'Background attachment',
                                        key: 'backgroundAttachment',
                                        type: 'CUSTOM',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Inherit',
                                              value: 'inherit',
                                            },
                                            { name: 'Scroll', value: 'scroll' },
                                            { name: 'Fixed', value: 'fixed' },
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
                                        name: 'Button',
                                        ref: {
                                          id: '#editCancelButton',
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
                                            value: ['Cancel'],
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
                                                {
                                                  name: 'Small',
                                                  value: 'small',
                                                },
                                                {
                                                  name: 'Medium',
                                                  value: 'medium',
                                                },
                                                {
                                                  name: 'Large',
                                                  value: 'large',
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
                                              'S',
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
                                          id: '#editSubmitButton',
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
                                            type: 'CUSTOM',
                                            label: 'type',
                                            key: 'type',
                                            value: 'submit',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Submit',
                                                  value: 'submit',
                                                },
                                                {
                                                  name: 'Reset',
                                                  value: 'reset',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label: 'Button text',
                                            key: 'buttonText',
                                            value: ['Update'],
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
                                                { name: 'End', value: 'end' },
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
                    ],
                  },
                ],
              },
            ];

            const drawerContainer = [
              {
                name: 'DrawerContainer',
                options: [
                  {
                    type: 'COLOR',
                    label: 'Theme background color',
                    key: 'themeBgColor',
                    value: 'Transparent',
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
                        value: '60px',
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
                                { name: 'Small', value: 'small' },
                                { name: 'Medium', value: 'medium' },
                                { name: 'Large', value: 'large' },
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
                                { name: 'Small', value: 'small' },
                                { name: 'Medium', value: 'medium' },
                                { name: 'Large', value: 'large' },
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
                        value: '100%',
                        label: 'Height',
                        key: 'rowHeight',
                        type: 'TEXT',
                        configuration: {
                          as: 'UNIT',
                        },
                      },
                      {
                        value: 'Transparent',
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
                            value: '100%',
                            label: 'Height',
                            key: 'columnHeight',
                            type: 'TEXT',
                            configuration: {
                              as: 'UNIT',
                            },
                          },
                          {
                            value: 'Transparent',
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
                                    {
                                      name: 'Justified',
                                      value: 'space-between',
                                    },
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
                                value: ['XL', 'M', 'M', 'M'],
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
                                value: true,
                                label: 'Show background options',
                                key: 'backgroundOptions',
                                type: 'TOGGLE',
                              },
                              {
                                value: 'Accent1',
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
                                value: 20,
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
                                    {
                                      name: 'Left center',
                                      value: 'left center',
                                    },
                                    {
                                      name: 'Left bottom',
                                      value: 'left bottom',
                                    },
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
                                    {
                                      name: 'Right center',
                                      value: 'right center',
                                    },
                                    {
                                      name: 'Right bottom',
                                      value: 'right bottom',
                                    },
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
                                value: 'inherit',
                                label: 'Background attachment',
                                key: 'backgroundAttachment',
                                type: 'CUSTOM',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'Inherit', value: 'inherit' },
                                    { name: 'Scroll', value: 'scroll' },
                                    { name: 'Fixed', value: 'fixed' },
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
                                        value: ['0rem', 'XL', '0rem', 'XL'],
                                        label: 'Inner space',
                                        key: 'innerSpacing',
                                        type: 'SIZES',
                                      },
                                    ],
                                    descendants: [
                                      {
                                        name: 'Conditional',
                                        options: [
                                          {
                                            value: false,
                                            label: 'Initial visibility',
                                            key: 'visible',
                                            type: 'TOGGLE',
                                            configuration: {
                                              as: 'VISIBILITY',
                                            },
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label: 'Left',
                                            key: 'left',
                                            value: [],
                                          },
                                          {
                                            type: 'CUSTOM',
                                            label: 'Compare',
                                            key: 'compare',
                                            value: 'eq',
                                            configuration: {
                                              as: 'DROPDOWN',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Equals',
                                                  value: 'eq',
                                                },
                                                {
                                                  name: 'Not equal',
                                                  value: 'neq',
                                                },
                                                {
                                                  name: 'Contains',
                                                  value: 'contains',
                                                },
                                                {
                                                  name: 'Does not contain',
                                                  value: 'notcontains',
                                                },
                                                {
                                                  name: 'Greater than',
                                                  value: 'gt',
                                                },
                                                {
                                                  name: 'Less than',
                                                  value: 'lt',
                                                },
                                                {
                                                  name:
                                                    'Greater than or equal to',
                                                  value: 'gteq',
                                                },
                                                {
                                                  name: 'Less than or equal to',
                                                  value: 'lteq',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            type: 'VARIABLE',
                                            label: 'Right',
                                            key: 'right',
                                            value: [],
                                          },
                                        ],
                                        descendants: [
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
                                                    {
                                                      name: 'None',
                                                      value: 'none',
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
                                                    {
                                                      name: 'Justified',
                                                      value: 'space-between',
                                                    },
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
                                                    {
                                                      name: 'None',
                                                      value: 'none',
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
                                                value: false,
                                                label:
                                                  'Stretch (when in flex container)',
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
                                                value: [
                                                  '0rem',
                                                  '0rem',
                                                  'XL',
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
                                              {
                                                value: false,
                                                label:
                                                  'Show positioning options',
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
                                                    {
                                                      name: 'Static',
                                                      value: 'static',
                                                    },
                                                    {
                                                      name: 'Relative',
                                                      value: 'relative',
                                                    },
                                                    {
                                                      name: 'Absolute',
                                                      value: 'absolute',
                                                    },
                                                    {
                                                      name: 'Fixed',
                                                      value: 'fixed',
                                                    },
                                                    {
                                                      name: 'Sticky',
                                                      value: 'sticky',
                                                    },
                                                  ],
                                                  condition: {
                                                    type: 'SHOW',
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
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
                                                    option:
                                                      'positioningOptions',
                                                    comparator: 'EQ',
                                                    value: true,
                                                  },
                                                },
                                              },
                                              {
                                                value: true,
                                                label:
                                                  'Show background options',
                                                key: 'backgroundOptions',
                                                type: 'TOGGLE',
                                              },
                                              {
                                                value: 'Info',
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
                                                label:
                                                  'Background color opacity',
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
                                                    {
                                                      name: 'Initial',
                                                      value: 'initial',
                                                    },
                                                    {
                                                      name: 'Contain',
                                                      value: 'contain',
                                                    },
                                                    {
                                                      name: 'Cover',
                                                      value: 'cover',
                                                    },
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
                                                    {
                                                      name: 'Left top',
                                                      value: 'left top',
                                                    },
                                                    {
                                                      name: 'Left center',
                                                      value: 'left center',
                                                    },
                                                    {
                                                      name: 'Left bottom',
                                                      value: 'left bottom',
                                                    },
                                                    {
                                                      name: 'Center top',
                                                      value: 'center top',
                                                    },
                                                    {
                                                      name: 'Center center',
                                                      value: 'center center',
                                                    },
                                                    {
                                                      name: 'Center bottom',
                                                      value: 'center bottom',
                                                    },
                                                    {
                                                      name: 'Right top',
                                                      value: 'right top',
                                                    },
                                                    {
                                                      name: 'Right center',
                                                      value: 'right center',
                                                    },
                                                    {
                                                      name: 'Right bottom',
                                                      value: 'right bottom',
                                                    },
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
                                                    {
                                                      name: 'None',
                                                      value: 'no-repeat',
                                                    },
                                                    {
                                                      name: 'X',
                                                      value: 'repeat-x',
                                                    },
                                                    {
                                                      name: 'Y',
                                                      value: 'repeat-y',
                                                    },
                                                    {
                                                      name: 'All',
                                                      value: 'repeat',
                                                    },
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
                                                    {
                                                      name: 'None',
                                                      value: 'none',
                                                    },
                                                    {
                                                      name: 'Solid',
                                                      value: 'solid',
                                                    },
                                                    {
                                                      name: 'Dashed',
                                                      value: 'dashed',
                                                    },
                                                    {
                                                      name: 'Dotted',
                                                      value: 'dotted',
                                                    },
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
                                                value: '5px',
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
                                                    value: [
                                                      'To toggle the sidebar you have navigate to the highest parent component (Drawer) and click on Toggle visibility.  In this sidebar you find the "add record" and "edit record" forms.',
                                                    ],
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
                                                    value: true,
                                                    label: 'Styles',
                                                    key: 'styles',
                                                    type: 'TOGGLE',
                                                  },
                                                  {
                                                    type: 'COLOR',
                                                    label: 'Text color',
                                                    key: 'textColor',
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
                                                    type: 'CUSTOM',
                                                    label: 'Font weight',
                                                    key: 'fontWeight',
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
                                                    value: [
                                                      'This message is not visible in your app',
                                                    ],
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
                                                    value: true,
                                                    label: 'Styles',
                                                    key: 'styles',
                                                    type: 'TOGGLE',
                                                  },
                                                  {
                                                    type: 'COLOR',
                                                    label: 'Text color',
                                                    key: 'textColor',
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
                                                    type: 'CUSTOM',
                                                    label: 'Font weight',
                                                    key: 'fontWeight',
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
                                        value: 'Transparent',
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
                                        value: ['0rem', 'XL', '0rem', 'XL'],
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
                                                {
                                                  name: 'Justified',
                                                  value: 'space-between',
                                                },
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
                                            value: false,
                                            label:
                                              'Stretch (when in flex container)',
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
                                            value: ['M', 'L', 'M', '0rem'],
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
                                                {
                                                  name: 'Static',
                                                  value: 'static',
                                                },
                                                {
                                                  name: 'Relative',
                                                  value: 'relative',
                                                },
                                                {
                                                  name: 'Absolute',
                                                  value: 'absolute',
                                                },
                                                {
                                                  name: 'Fixed',
                                                  value: 'fixed',
                                                },
                                                {
                                                  name: 'Sticky',
                                                  value: 'sticky',
                                                },
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
                                                {
                                                  name: 'Initial',
                                                  value: 'initial',
                                                },
                                                {
                                                  name: 'Contain',
                                                  value: 'contain',
                                                },
                                                {
                                                  name: 'Cover',
                                                  value: 'cover',
                                                },
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
                                                {
                                                  name: 'Left top',
                                                  value: 'left top',
                                                },
                                                {
                                                  name: 'Left center',
                                                  value: 'left center',
                                                },
                                                {
                                                  name: 'Left bottom',
                                                  value: 'left bottom',
                                                },
                                                {
                                                  name: 'Center top',
                                                  value: 'center top',
                                                },
                                                {
                                                  name: 'Center center',
                                                  value: 'center center',
                                                },
                                                {
                                                  name: 'Center bottom',
                                                  value: 'center bottom',
                                                },
                                                {
                                                  name: 'Right top',
                                                  value: 'right top',
                                                },
                                                {
                                                  name: 'Right center',
                                                  value: 'right center',
                                                },
                                                {
                                                  name: 'Right bottom',
                                                  value: 'right bottom',
                                                },
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
                                                {
                                                  name: 'None',
                                                  value: 'no-repeat',
                                                },
                                                {
                                                  name: 'X',
                                                  value: 'repeat-x',
                                                },
                                                {
                                                  name: 'Y',
                                                  value: 'repeat-y',
                                                },
                                                {
                                                  name: 'All',
                                                  value: 'repeat',
                                                },
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
                                                {
                                                  name: 'Solid',
                                                  value: 'solid',
                                                },
                                                {
                                                  name: 'Dashed',
                                                  value: 'dashed',
                                                },
                                                {
                                                  name: 'Dotted',
                                                  value: 'dotted',
                                                },
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
                                            ref: {
                                              id: '#dataTableTitle',
                                            },
                                            options: [
                                              {
                                                type: 'VARIABLE',
                                                label: 'Content',
                                                key: 'content',
                                                value: [
                                                  `${capitalize(
                                                    data.model.name,
                                                  )}s`,
                                                ],
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
                                                value: true,
                                                label: 'Styles',
                                                key: 'styles',
                                                type: 'TOGGLE',
                                              },
                                              {
                                                type: 'COLOR',
                                                label: 'Text color',
                                                key: 'textColor',
                                                value: 'Dark',
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
                                            name: 'Button',
                                            ref: {
                                              id: '#createButton',
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
                                                value: [
                                                  `Add ${data.model.name}`,
                                                ],
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
                                                value: 'Add',
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
                                                      name: 'Small',
                                                      value: 'small',
                                                    },
                                                    {
                                                      name: 'Medium',
                                                      value: 'medium',
                                                    },
                                                    {
                                                      name: 'Large',
                                                      value: 'large',
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
                                              },
                                              {
                                                label:
                                                  'Toggle tooltip visibility',
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
                                                {
                                                  name: 'Ascending',
                                                  value: 'asc',
                                                },
                                                {
                                                  name: 'Descending',
                                                  value: 'desc',
                                                },
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
                                            value: [''],
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
                                                {
                                                  name: 'Always',
                                                  value: 'always',
                                                },
                                                {
                                                  name: 'When needed',
                                                  value: 'whenNeeded',
                                                },
                                                {
                                                  name: 'Never',
                                                  value: 'never',
                                                },
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
                                            label:
                                              'Number of records to auto load',
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
                                            value: '10',
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
                                            label:
                                              "Pagination label (x 'of' y)",
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
                                                {
                                                  name: 'Small',
                                                  value: 'small',
                                                },
                                                {
                                                  name: 'Medium',
                                                  value: 'medium',
                                                },
                                              ],
                                            },
                                          },
                                          {
                                            type: 'COLOR',
                                            label: 'Background',
                                            key: 'background',
                                            value: 'White',
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
                                            value: false,
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
                                            value: 'flat',
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
                                            value: 'built-in',
                                            label: 'Error message',
                                            key: 'showError',
                                            type: 'CUSTOM',
                                            configuration: {
                                              as: 'BUTTONGROUP',
                                              dataType: 'string',
                                              allowedInput: [
                                                {
                                                  name: 'Built in',
                                                  value: 'built-in',
                                                },
                                                {
                                                  name: 'Interaction',
                                                  value: 'interaction',
                                                },
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
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ];

            const createForm = getDescendantByRef('#createForm', drawerSidebar);
            const editForm = getDescendantByRef('#editForm', drawerSidebar);
            const createFormInputsArray = makeDescendantsArray(
              createFormProperties,
            ).filter(item => item !== undefined);
            createForm.descendants = [
              ...createFormInputsArray,
              ...createForm.descendants,
            ];

            const editFormInputsArray = makeDescendantsArray(
              createFormProperties,
              'edit',
            ).filter(item => item !== undefined);
            editForm.descendants = [
              ...editFormInputsArray,
              ...editForm.descendants,
            ];

            newPrefab.actions[1].events[0].options.modelId = modelId;
            newPrefab.actions[1].events[0].options.assign = createFormProperties.map(
              property => ({
                leftHandSide: property.id[0],
                ref: {
                  path: [
                    '#customModelVariableId',
                    `#attribute_${property.id[0]}`,
                  ],
                },
              }),
            );

            newPrefab.actions[2].events[0].options.assign = createFormProperties.map(
              property => ({
                leftHandSide: property.id[0],
                ref: {
                  path: [
                    '#editCustomModelVariableId',
                    `#edit_attribute_${property.id[0]}`,
                  ],
                },
              }),
            );

            newPrefab.actions[0].events[0].options.assign = createFormProperties.map(
              property => ({
                leftHandSide: property.id[0],
                ref: {
                  path: [
                    '#editcustomModelVariableId',
                    `#attribute_${property.id[0]}`,
                  ],
                },
              }),
            );
            const detailDataContainer = getDescendantByRef(
              '#detailsDataContainer',
              drawerSidebar,
            );
            detailProperties.forEach(property => {
              makeDetails(property, detailDataContainer);
            });
            const dataTable = getDescendantByRef('#dataTable', drawerContainer);
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
                    value: 'Body1',
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
                  value: '',
                  label: 'Property',
                  key: 'property',
                  type: 'PROPERTY',
                },
                {
                  type: 'TOGGLE',
                  label: 'Sortable',
                  key: 'sortable',
                  value: false,
                },
                {
                  type: 'VARIABLE',
                  label: 'Header text',
                  key: 'headerText',
                  value: [''],
                },
                {
                  value: 'Body1',
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
              descendants: [
                {
                  name: 'Box',
                  options: [
                    {
                      value: 'flex-end',
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
                      value: 'inherit',
                      label: 'Background attachment',
                      key: 'backgroundAttachment',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Inherit', value: 'inherit' },
                          { name: 'Scroll', value: 'scroll' },
                          { name: 'Fixed', value: 'fixed' },
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
                      name: 'Button',
                      ref: {
                        id: '#detailButton',
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
                          value: 'Info',
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
                              { name: 'Small', value: 'small' },
                              { name: 'Medium', value: 'medium' },
                              { name: 'Large', value: 'large' },
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
                        id: '#editButton',
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
                          value: 'Edit',
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
                              { name: 'Small', value: 'small' },
                              { name: 'Medium', value: 'medium' },
                              { name: 'Large', value: 'large' },
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
                          value: 'inherit',
                          label: 'Background attachment',
                          key: 'backgroundAttachment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Inherit', value: 'inherit' },
                              { name: 'Scroll', value: 'scroll' },
                              { name: 'Fixed', value: 'fixed' },
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
                          name: 'Button',
                          ref: {
                            id: '#deleteButton',
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
                              value: 'Delete',
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
                                  { name: 'Small', value: 'small' },
                                  { name: 'Medium', value: 'medium' },
                                  { name: 'Large', value: 'large' },
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
                        {
                          name: 'Dialog',
                          ref: {
                            id: '#dialog',
                          },
                          options: [
                            {
                              label: 'Toggle visibility',
                              key: 'isVisible',
                              value: false,
                              type: 'TOGGLE',
                              configuration: {
                                as: 'VISIBILITY',
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Fullscreen',
                              key: 'isFullscreen',
                              value: false,
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Disable backdrop click',
                              key: 'disableClick',
                              value: false,
                            },
                            {
                              value: 'sm',
                              label: 'Width',
                              key: 'width',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'DROPDOWN',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Extra-small', value: 'xs' },
                                  { name: 'Small', value: 'sm' },
                                  { name: 'Medium', value: 'md' },
                                  { name: 'Large', value: 'lg' },
                                  { name: 'Extra-large', value: 'xl' },
                                ],
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
                                  value: false,
                                  type: 'TOGGLE',
                                },
                                {
                                  label: 'Variant',
                                  key: 'variant',
                                  value: 'flat',
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
                                  value: '0',
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
                                          value: 'flexible',
                                          label:
                                            'Column width (tablet portrait)',
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
                                                  {
                                                    name: 'Built in',
                                                    value: 'built-in',
                                                  },
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
                                                  {
                                                    name: 'Message',
                                                    value: 'default',
                                                  },
                                                  {
                                                    name: 'Content',
                                                    value: 'showChildren',
                                                  },
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
                                                      {
                                                        name: 'None',
                                                        value: 'none',
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
                                                      {
                                                        name: 'Justified',
                                                        value: 'space-between',
                                                      },
                                                    ],
                                                  },
                                                },
                                                {
                                                  value: false,
                                                  label:
                                                    'Stretch (when in flex container)',
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
                                                  value: [
                                                    'M',
                                                    '0rem',
                                                    '0rem',
                                                    'M',
                                                  ],
                                                  label: 'Inner space',
                                                  key: 'innerSpacing',
                                                  type: 'SIZES',
                                                },
                                                {
                                                  value: false,
                                                  label:
                                                    'Show positioning options',
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
                                                      {
                                                        name: 'Static',
                                                        value: 'static',
                                                      },
                                                      {
                                                        name: 'Relative',
                                                        value: 'relative',
                                                      },
                                                      {
                                                        name: 'Absolute',
                                                        value: 'absolute',
                                                      },
                                                      {
                                                        name: 'Fixed',
                                                        value: 'fixed',
                                                      },
                                                      {
                                                        name: 'Sticky',
                                                        value: 'sticky',
                                                      },
                                                    ],
                                                    condition: {
                                                      type: 'SHOW',
                                                      option:
                                                        'positioningOptions',
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
                                                      option:
                                                        'positioningOptions',
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
                                                      option:
                                                        'positioningOptions',
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
                                                      option:
                                                        'positioningOptions',
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
                                                      option:
                                                        'positioningOptions',
                                                      comparator: 'EQ',
                                                      value: true,
                                                    },
                                                  },
                                                },
                                                {
                                                  value: false,
                                                  label:
                                                    'Show background options',
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
                                                      option:
                                                        'backgroundOptions',
                                                      comparator: 'EQ',
                                                      value: true,
                                                    },
                                                  },
                                                },
                                                {
                                                  value: 100,
                                                  label:
                                                    'Background color opacity',
                                                  key: 'backgroundColorAlpha',
                                                  type: 'NUMBER',
                                                  configuration: {
                                                    condition: {
                                                      type: 'SHOW',
                                                      option:
                                                        'backgroundOptions',
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
                                                      option:
                                                        'backgroundOptions',
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
                                                      {
                                                        name: 'Initial',
                                                        value: 'initial',
                                                      },
                                                      {
                                                        name: 'Contain',
                                                        value: 'contain',
                                                      },
                                                      {
                                                        name: 'Cover',
                                                        value: 'cover',
                                                      },
                                                    ],
                                                    condition: {
                                                      type: 'SHOW',
                                                      option:
                                                        'backgroundOptions',
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
                                                      {
                                                        name: 'None',
                                                        value: 'no-repeat',
                                                      },
                                                      {
                                                        name: 'X',
                                                        value: 'repeat-x',
                                                      },
                                                      {
                                                        name: 'Y',
                                                        value: 'repeat-y',
                                                      },
                                                      {
                                                        name: 'All',
                                                        value: 'repeat',
                                                      },
                                                    ],
                                                    condition: {
                                                      type: 'SHOW',
                                                      option:
                                                        'backgroundOptions',
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
                                                      option:
                                                        'backgroundOptions',
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
                                                      option:
                                                        'backgroundOptions',
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
                                                      {
                                                        name: 'None',
                                                        value: 'none',
                                                      },
                                                      {
                                                        name: 'Solid',
                                                        value: 'solid',
                                                      },
                                                      {
                                                        name: 'Dashed',
                                                        value: 'dashed',
                                                      },
                                                      {
                                                        name: 'Dotted',
                                                        value: 'dotted',
                                                      },
                                                    ],
                                                    condition: {
                                                      type: 'SHOW',
                                                      option:
                                                        'backgroundOptions',
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
                                                      option:
                                                        'backgroundOptions',
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
                                                      value: ['Delete record'],
                                                      configuration: {
                                                        as: 'MULTILINE',
                                                      },
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
                                                  name: 'Button',
                                                  ref: {
                                                    id: '#closeBtn',
                                                  },
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
                                                      value: 'Close',
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
                                                            name: 'Small',
                                                            value: 'small',
                                                          },
                                                          {
                                                            name: 'Medium',
                                                            value: 'medium',
                                                          },
                                                          {
                                                            name: 'Large',
                                                            value: 'large',
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
                                                        'S',
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
                                                      label:
                                                        'Tooltip Background',
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
                                                      {
                                                        name: 'XL',
                                                        value: 'XL',
                                                      },
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
                                                      value: 'flexible',
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
                                                      value: 'flexible',
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
                                                      value: 'flexible',
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
                                                      key:
                                                        'horizontalAlignment',
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
                                                      label:
                                                        'Vertical Alignment',
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
                                                        'S',
                                                        '0rem',
                                                        '0rem',
                                                      ],
                                                      label: 'Outer space',
                                                      key: 'outerSpacing',
                                                      type: 'SIZES',
                                                    },
                                                    {
                                                      value: [
                                                        '0rem',
                                                        '0rem',
                                                        '0rem',
                                                        '0rem',
                                                      ],
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
                                                          value: [
                                                            "Are you sure you want to delete this record? You can't undo this action.",
                                                          ],
                                                          configuration: {
                                                            as: 'MULTILINE',
                                                          },
                                                        },
                                                        {
                                                          value: 'Body1',
                                                          label: 'Type',
                                                          key: 'type',
                                                          type: 'FONT',
                                                        },
                                                        {
                                                          type: 'CUSTOM',
                                                          label:
                                                            'Text Alignment',
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
                                                            'M',
                                                            '0rem',
                                                            'M',
                                                            '0rem',
                                                          ],
                                                          label: 'Outer space',
                                                          key: 'outerSpacing',
                                                          type: 'SIZES',
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
                                              ],
                                            },
                                            {
                                              name: 'Box',
                                              options: [
                                                {
                                                  value: 'flex-end',
                                                  label: 'Alignment',
                                                  key: 'alignment',
                                                  type: 'CUSTOM',
                                                  configuration: {
                                                    as: 'BUTTONGROUP',
                                                    dataType: 'string',
                                                    allowedInput: [
                                                      {
                                                        name: 'None',
                                                        value: 'none',
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
                                                      {
                                                        name: 'Justified',
                                                        value: 'space-between',
                                                      },
                                                    ],
                                                  },
                                                },
                                                {
                                                  value: false,
                                                  label:
                                                    'Stretch (when in flex container)',
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
                                                {
                                                  value: false,
                                                  label:
                                                    'Show positioning options',
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
                                                      {
                                                        name: 'Static',
                                                        value: 'static',
                                                      },
                                                      {
                                                        name: 'Relative',
                                                        value: 'relative',
                                                      },
                                                      {
                                                        name: 'Absolute',
                                                        value: 'absolute',
                                                      },
                                                      {
                                                        name: 'Fixed',
                                                        value: 'fixed',
                                                      },
                                                      {
                                                        name: 'Sticky',
                                                        value: 'sticky',
                                                      },
                                                    ],
                                                    condition: {
                                                      type: 'SHOW',
                                                      option:
                                                        'positioningOptions',
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
                                                      option:
                                                        'positioningOptions',
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
                                                      option:
                                                        'positioningOptions',
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
                                                      option:
                                                        'positioningOptions',
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
                                                      option:
                                                        'positioningOptions',
                                                      comparator: 'EQ',
                                                      value: true,
                                                    },
                                                  },
                                                },
                                                {
                                                  value: false,
                                                  label:
                                                    'Show background options',
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
                                                      option:
                                                        'backgroundOptions',
                                                      comparator: 'EQ',
                                                      value: true,
                                                    },
                                                  },
                                                },
                                                {
                                                  value: 100,
                                                  label:
                                                    'Background color opacity',
                                                  key: 'backgroundColorAlpha',
                                                  type: 'NUMBER',
                                                  configuration: {
                                                    condition: {
                                                      type: 'SHOW',
                                                      option:
                                                        'backgroundOptions',
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
                                                      option:
                                                        'backgroundOptions',
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
                                                      {
                                                        name: 'Initial',
                                                        value: 'initial',
                                                      },
                                                      {
                                                        name: 'Contain',
                                                        value: 'contain',
                                                      },
                                                      {
                                                        name: 'Cover',
                                                        value: 'cover',
                                                      },
                                                    ],
                                                    condition: {
                                                      type: 'SHOW',
                                                      option:
                                                        'backgroundOptions',
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
                                                      {
                                                        name: 'None',
                                                        value: 'no-repeat',
                                                      },
                                                      {
                                                        name: 'X',
                                                        value: 'repeat-x',
                                                      },
                                                      {
                                                        name: 'Y',
                                                        value: 'repeat-y',
                                                      },
                                                      {
                                                        name: 'All',
                                                        value: 'repeat',
                                                      },
                                                    ],
                                                    condition: {
                                                      type: 'SHOW',
                                                      option:
                                                        'backgroundOptions',
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
                                                      option:
                                                        'backgroundOptions',
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
                                                      option:
                                                        'backgroundOptions',
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
                                                      {
                                                        name: 'None',
                                                        value: 'none',
                                                      },
                                                      {
                                                        name: 'Solid',
                                                        value: 'solid',
                                                      },
                                                      {
                                                        name: 'Dashed',
                                                        value: 'dashed',
                                                      },
                                                      {
                                                        name: 'Dotted',
                                                        value: 'dotted',
                                                      },
                                                    ],
                                                    condition: {
                                                      type: 'SHOW',
                                                      option:
                                                        'backgroundOptions',
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
                                                      option:
                                                        'backgroundOptions',
                                                      comparator: 'EQ',
                                                      value: true,
                                                    },
                                                  },
                                                },
                                              ],
                                              descendants: [
                                                {
                                                  name: 'Button',
                                                  ref: {
                                                    id: '#cancelBtn',
                                                  },
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
                                                      value: ['Cancel'],
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
                                                          {
                                                            name: 'Small',
                                                            value: 'small',
                                                          },
                                                          {
                                                            name: 'Medium',
                                                            value: 'medium',
                                                          },
                                                          {
                                                            name: 'Large',
                                                            value: 'large',
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
                                                        'S',
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
                                                      label:
                                                        'Tooltip Background',
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
                                                    id: '#deleteActionButton',
                                                  },
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
                                                      value: ['Delete'],
                                                    },
                                                    {
                                                      ref: {
                                                        value: '#actionId',
                                                      },
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
                                                      value: [modelId],
                                                      label:
                                                        'Objects to pass to action',
                                                      key: 'actionModels',
                                                      type:
                                                        'ACTION_INPUT_OBJECTS',
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
                                                          {
                                                            name: 'Small',
                                                            value: 'small',
                                                          },
                                                          {
                                                            name: 'Medium',
                                                            value: 'medium',
                                                          },
                                                          {
                                                            name: 'Large',
                                                            value: 'large',
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
                                                      label:
                                                        'Tooltip Background',
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
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            });

            const setCurrentDeleteRecord = {
              name: 'setCurrentRecord',
              sourceEvent: 'Click',
              targetOptionName: 'currentRecord',
              parameters: [
                {
                  id: [idProperty.id],
                  parameter: 'argument',
                },
              ],
              ref: {
                sourceComponentId: '#deleteButton',
                targetComponentId: '#dataContainer',
              },
              type: 'Global',
            };

            const setCurrentDetailRecord = {
              name: 'setCurrentRecord',
              sourceEvent: 'Click',
              targetOptionName: 'currentRecord',
              parameters: [
                {
                  id: [idProperty.id],
                  parameter: 'argument',
                },
              ],
              ref: {
                sourceComponentId: '#detailButton',
                targetComponentId: '#detailsDataContainer',
              },
              type: 'Global',
            };

            const setCurrentEditRecord = {
              name: 'setCurrentRecord',
              sourceEvent: 'Click',
              targetOptionName: 'currentRecord',
              parameters: [
                {
                  id: [idProperty.id],
                  parameter: 'argument',
                },
              ],
              ref: {
                sourceComponentId: '#editButton',
                targetComponentId: '#editForm',
              },
              type: 'Global',
            };

            newPrefab.interactions.push(setCurrentDeleteRecord);
            newPrefab.interactions.push(setCurrentDetailRecord);
            newPrefab.interactions.push(setCurrentEditRecord);

            if (data && data.model) {
              newPrefab.variables[0].name = camelToSnakeCase(data.model.name);
            }
            newPrefab.variables[0].options.modelId = modelId;
            newPrefab.variables[1].options.modelId = modelId;
            newPrefab.variables[2].options.modelId = modelId;
            newPrefab.variables[3].options.modelId = modelId;
            newPrefab.variables[4].options.modelId = modelId;
            newPrefab.structure[0].descendants = [
              ...drawerSidebar,
              ...drawerContainer,
            ];
            const alertInteractions = [
              {
                name: 'Show',
                sourceEvent: 'onActionSuccess',
                ref: {
                  targetComponentId: '#createSuccesAlert',
                  sourceComponentId: '#createForm',
                },
                type: 'Custom',
              },
              {
                name: 'Hide',
                sourceEvent: 'onSubmit',
                ref: {
                  targetComponentId: '#createSuccesAlert',
                  sourceComponentId: '#createForm',
                },
                type: 'Custom',
              },
              {
                name: 'Show',
                sourceEvent: 'onActionError',
                ref: {
                  targetComponentId: '#errorCreateAlert',
                  sourceComponentId: '#createForm',
                },
                type: 'Custom',
              },
              {
                name: 'Hide',
                sourceEvent: 'onSubmit',
                ref: {
                  targetComponentId: '#errorCreateAlert',
                  sourceComponentId: '#createForm',
                },
                type: 'Custom',
              },
              {
                name: 'Show',
                sourceEvent: 'onActionSuccess',
                ref: {
                  targetComponentId: '#editSuccesAlert',
                  sourceComponentId: '#editForm',
                },
                type: 'Custom',
              },
              {
                name: 'Hide',
                sourceEvent: 'onSubmit',
                ref: {
                  targetComponentId: '#editSuccesAlert',
                  sourceComponentId: '#editForm',
                },
                type: 'Custom',
              },
              {
                name: 'Show',
                sourceEvent: 'onActionError',
                ref: {
                  targetComponentId: '#errorEditAlert',
                  sourceComponentId: '#editForm',
                },
                type: 'Custom',
              },
              {
                name: 'Hide',
                sourceEvent: 'onSubmit',
                ref: {
                  targetComponentId: '#errorEditAlert',
                  sourceComponentId: '#editForm',
                },
                type: 'Custom',
              },
              {
                name: 'Toggle loading state',
                sourceEvent: 'onSubmit',
                ref: {
                  targetComponentId: '#createSubmitButton',
                  sourceComponentId: '#createForm',
                },
                type: 'Custom',
              },
              {
                name: 'Toggle loading state',
                sourceEvent: 'onActionDone',
                ref: {
                  targetComponentId: '#createSubmitButton',
                  sourceComponentId: '#createForm',
                },
                type: 'Custom',
              },
            ];

            newPrefab.interactions = [
              ...newPrefab.interactions,
              ...alertInteractions,
            ];

            save(newPrefab);
          }}
        />
      </>
    );
  },
  interactions: [
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#dialog',
        sourceComponentId: '#deleteButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#dialog',
        sourceComponentId: '#closeBtn',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#dialog',
        sourceComponentId: '#cancelBtn',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onActionSuccess',
      ref: {
        targetComponentId: '#dialog',
        sourceComponentId: '#deleteActionButton',
      },
      type: 'Custom',
    },
    {
      name: 'Refetch',
      sourceEvent: 'onActionSuccess',
      ref: {
        targetComponentId: '#dataTable',
        sourceComponentId: '#deleteActionButton',
      },
      type: 'Custom',
    },
    {
      name: 'Refetch',
      sourceEvent: 'onActionSuccess',
      ref: {
        targetComponentId: '#dataTable',
        sourceComponentId: '#createForm',
      },
      type: 'Custom',
    },
    {
      name: 'Refetch',
      sourceEvent: 'onActionSuccess',
      ref: {
        targetComponentId: '#dataTable',
        sourceComponentId: '#editForm',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#errorEditAlert',
        sourceComponentId: '#editForm',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#drawerSidebar',
        sourceComponentId: '#detailButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#drawerSidebar',
        sourceComponentId: '#editCancelButton',
      },
      type: 'Custom',
    },
    {
      name: 'Select',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#detailTab',
        sourceComponentId: '#detailButton',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#drawerSidebar',
        sourceComponentId: '#createButton',
      },
      type: 'Custom',
    },
    {
      name: 'Show',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#drawerSidebar',
        sourceComponentId: '#editButton',
      },
      type: 'Custom',
    },
    {
      name: 'Select',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#createTab',
        sourceComponentId: '#createButton',
      },
      type: 'Custom',
    },
    {
      name: 'Select',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#editTab',
        sourceComponentId: '#editButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#drawerSidebar',
        sourceComponentId: '#detailCancelButton',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'Click',
      ref: {
        targetComponentId: '#drawerSidebar',
        sourceComponentId: '#createCancelButton',
      },
      type: 'Custom',
    },
  ],
  variables: [
    {
      kind: 'object',
      name: 'form_object',
      ref: {
        id: '#objectVariableId',
        endpointId: '#endpointId',
      },
      options: {
        modelId: '',
      },
    },
    {
      kind: 'construct',
      name: 'form_data',
      ref: {
        id: '#customModelVariableId',
        endpointId: '#createEndpointId',
      },
      options: {
        modelId: '',
        ref: {
          customModelId: '#customModelVariableId',
        },
      },
    },
    {
      kind: 'object',
      name: 'create_form_object',
      ref: {
        id: '#createObjectVariableId',
        endpointId: '#createEndpointId',
      },
      options: {
        modelId: '',
      },
    },
    {
      kind: 'construct',
      name: 'edit_form_data',
      ref: {
        id: '#editCustomModelVariableId',
        endpointId: '#editEndpointId',
      },
      options: {
        modelId: '',
        ref: {
          customModelId: '#editCustomModelId',
        },
      },
    },
    {
      kind: 'object',
      name: 'edit_form_object',
      ref: {
        id: '#editObjectVariableId',
        endpointId: '#editEndpointId',
      },
      options: {
        modelId: '',
      },
    },
  ],
  actions: [
    {
      name: 'Delete record action',
      ref: {
        id: '#actionId',
        endpointId: '#endpointId',
      },
      useNewRuntime: false,
      events: [
        {
          kind: 'delete',
          options: {
            ref: {
              object: '#objectVariableId',
            },
          },
        },
      ],
    },
    {
      name: 'Create form action',
      ref: {
        id: '#createActionId',
        endpointId: '#createEndpointId',
      },
      useNewRuntime: false,
      events: [
        {
          kind: 'create',
          options: {
            modelId: '',
            assign: [],
          },
        },
      ],
    },
    {
      name: 'Edit form action',
      ref: {
        id: '#editActionId',
        endpointId: '#editEndpointId',
      },
      useNewRuntime: false,
      events: [
        {
          kind: 'update',
          options: {
            ref: {
              object: '#editObjectVariableId',
            },
            assign: [],
          },
        },
      ],
    },
  ],
  structure: [
    {
      name: 'Drawer',
      options: [
        {
          type: 'SIZE',
          label: 'Drawer Width',
          key: 'drawerWidth',
          value: '480px',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          value: 'temporary',
          label: 'Drawer type',
          key: 'drawerType',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Persistent', value: 'persistent' },
              { name: 'Temporary', value: 'temporary' },
            ],
          },
        },
        {
          value: 'sm',
          label: 'Responsively temporary on',
          key: 'breakpoint',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Permanent', value: 'xs' },
              { name: 'Mobile', value: 'sm' },
              { name: 'Tablet portrait', value: 'md' },
              { name: 'Tablet landscape', value: 'lg' },
            ],
            condition: {
              type: 'SHOW',
              option: 'drawerType',
              comparator: 'EQ',
              value: 'persistent',
            },
          },
        },
        {
          value: 'right',
          label: 'Alignment',
          key: 'temporaryAnchor',
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
              type: 'SHOW',
              option: 'drawerType',
              comparator: 'EQ',
              value: 'temporary',
            },
          },
        },
        {
          value: 'left',
          label: 'Alignment',
          key: 'persistentAnchor',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Left', value: 'left' },
              { name: 'Right', value: 'right' },
            ],
            condition: {
              type: 'HIDE',
              option: 'drawerType',
              comparator: 'EQ',
              value: 'temporary',
            },
          },
        },
        {
          label: 'Toggle visibility',
          key: 'visibility',
          value: false,
          type: 'TOGGLE',
          configuration: {
            as: 'VISIBILITY',
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
