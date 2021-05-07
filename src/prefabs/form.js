(() => ({
  name: 'Form',
  icon: 'FormIcon',
  category: 'FORM',
  keywords: ['Form', 'input'],
  structure: [
    {
      name: 'Form',
      options: [
        {
          value: {
            customModelId: null,
            actionId: null,
            modelId: null,
            variableId: null,
          },
          label: 'Action',
          key: 'formData',
          type: 'FORM_DATA',
          configuration: {
            apiVersion: 'v1',
          },
        },
        {
          value: '',
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
          value: 'built-in',
          label: 'Success message',
          key: 'showSuccess',
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
              { name: 'Interaction', value: 'interaction' },
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
          name: 'TextField',
          options: [
            {
              value: { label: ['Textfield'], value: [] },
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
              value: 'none',
              type: 'CUSTOM',
              configuration: {
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
              },
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
                  { name: 'Left', value: 'flex-start' },
                  { name: 'Center', value: 'center' },
                  { name: 'Right', value: 'flex-end' },
                  { name: 'Justified', value: 'space-between' },
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
                  label: 'type',
                  key: 'type',
                  value: 'submit',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Submit', value: 'submit' },
                      { name: 'Reset', value: 'reset' },
                    ],
                  },
                },
                {
                  type: 'VARIABLE',
                  label: 'Button text',
                  key: 'buttonText',
                  value: ['Send'],
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
                  label: 'Add Tooltip',
                  key: 'addTooltip',
                  value: false,
                  type: 'TOGGLE',
                  configuration: {
                    as: 'VISIBILITY',
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
}))();
