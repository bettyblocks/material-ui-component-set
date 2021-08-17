(() => ({
  name: 'Login form with image',
  icon: 'LoginFormIcon',
  type: 'page',
  description: 'Page with login form and side image',
  detail:
    'It takes a few clicks to set up your login page. Connect your model to the form and feel free to customize your image to your liking.',
  previewUrl: 'https://preview.betty.app/login',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Login.jpg',
  category: 'FORM',
  beforeCreate: ({
    prefab,
    save,
    close,
    components: {
      AuthenticationProfileSelector,
      EndpointSelector,
      Header,
      Content,
      Field,
      Footer,
      Text,
    },
  }) => {
    const [authProfileId, setAuthProfileId] = React.useState('');
    const [authProfile, setAuthProfile] = React.useState(null);
    const [redirectTo, setRedirectTo] = React.useState('');
    const [showAuthValidation, setShowAuthValidation] = React.useState(false);
    const [showEndpointValidation, setShowEndpointValidation] = React.useState(
      false,
    );

    function serializeParameters(obj) {
      return Object.entries(obj).map(([name, entry]) => ({
        name,
        value: entry.map(v => JSON.stringify(v)),
      }));
    }

    const isEmptyRedirect = value =>
      !value || Object.keys(value).length === 0 || value.id === '';

    return (
      <>
        <Header onClose={close} title="Configure login form" />
        <Content>
          <Field
            label="Select an authentication profile"
            error={
              showAuthValidation && (
                <Text color="#e82600">
                  Selecting an authentication profile is required
                </Text>
              )
            }
          >
            <AuthenticationProfileSelector
              onChange={(id, authProfileObject) => {
                setShowAuthValidation(false);
                setAuthProfileId(id);
                setAuthProfile(authProfileObject);
              }}
              value={authProfileId}
            />
          </Field>
          <Field
            label="Redirect after successful login"
            error={
              showEndpointValidation && (
                <Text color="#e82600">Selecting an endpoint is required</Text>
              )
            }
          >
            <EndpointSelector
              onChange={value => {
                setShowEndpointValidation(isEmptyRedirect(value));
                setRedirectTo(value);
              }}
              value={redirectTo}
              size="large"
            />
          </Field>
        </Content>
        <Footer
          onClose={close}
          onSave={() => {
            if (!authProfileId) {
              setShowAuthValidation(true);
              return;
            }

            if (isEmptyRedirect(redirectTo)) {
              setShowEndpointValidation(true);
              return;
            }

            const newPrefab = { ...prefab };
            if (authProfile) {
              const { loginModel, properties, id } = authProfile;
              const formPrefab =
                newPrefab.structure[0].descendants[0].descendants[0]
                  .descendants[0].descendants[0].descendants[1].descendants[0]
                  .descendants[1].descendants[0];
              newPrefab.actions[1].events[0].options.authenticationProfileId = id;
              formPrefab.options[0].value.modelId = loginModel;
              formPrefab.options[1].value = loginModel;
              newPrefab.variables[0].options.modelId = loginModel;
              newPrefab.interactions[4].parameters = [
                {
                  parameter: 'redirectTo',
                  pageId: redirectTo.pageId,
                  endpointId: redirectTo.id,
                  parameters: serializeParameters(redirectTo.params),
                },
              ];
              newPrefab.actions[0].events[0].options.assign = properties.map(
                property => {
                  const isPassword = property.kind === 'PASSWORD';
                  return {
                    ref: {
                      leftHandSide: isPassword
                        ? '#passwordVariableId'
                        : '#usernameVariableId',
                      path: [
                        '#customModelVariableId',
                        `#attribute_${property.id}`,
                      ],
                    },
                  };
                },
              );

              const descendants = properties.sort((a, b) =>
                a.kind.localeCompare(b.kind),
              );
              const descendantsArray = descendants.map(property => {
                switch (property.kind) {
                  case 'EMAIL_ADDRESS': {
                    return {
                      name: 'TextField',
                      options: [
                        {
                          value: {
                            label: [property.label],
                            value: [
                              {
                                id: [property.id],
                                type: 'PROPERTY',
                              },
                            ],
                            propertyIds: [property.id],
                            ref: {
                              id: `#attribute_${property.id}`,
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
                            placeholder:
                              '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
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
                  case 'PASSWORD': {
                    return {
                      name: 'TextField',
                      options: [
                        {
                          value: {
                            label: [property.label],
                            value: [
                              {
                                id: [property.id],
                                type: 'PROPERTY',
                              },
                            ],
                            propertyIds: [property.id],
                            ref: {
                              id: `#attribute_${property.id}`,
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
                  default:
                    return {
                      name: 'TextField',
                      options: [
                        {
                          value: {
                            label: [property.label],
                            value: [
                              {
                                id: [property.id],
                                type: 'PROPERTY',
                              },
                            ],
                            propertyIds: [property.id],
                            ref: {
                              id: `#attribute_${property.id}`,
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
                    };
                }
              });

              const alertErrorDescendant = [
                {
                  name: 'Alert',
                  ref: {
                    id: '#alertErrorId',
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
                      value: ['*Dynamic value from the Action response*'],
                      configuration: {
                        dependsOn: 'model',
                      },
                    },
                    {
                      label: 'Allow to overwrite by the server response',
                      key: 'allowTextServerResponse',
                      value: true,
                      type: 'TOGGLE',
                    },
                    {
                      type: 'VARIABLE',
                      label: 'Title text',
                      key: 'titleText',
                      value: ['Error'],
                    },
                    {
                      label: 'Allow to overwrite by the server response',
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
                      value: 'Error',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
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
                      value: true,
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
              ];

              formPrefab.descendants = [
                ...alertErrorDescendant,
                ...descendantsArray,
                ...formPrefab.descendants,
              ];

              save(newPrefab);
            }
          }}
        />
      </>
    );
  },
  variables: [
    {
      kind: 'construct',
      name: 'form_data',
      ref: {
        id: '#customModelVariableId',
        endpointId: '#endpointId',
      },
      options: {
        modelId: '',
        ref: {
          customModelId: '#customModelId',
        },
      },
    },
    {
      ref: {
        id: '#usernameVariableId',
        actionId: '#loginActionId',
      },
      kind: 'string',
      name: 'username',
    },
    {
      ref: {
        id: '#passwordVariableId',
        actionId: '#loginActionId',
      },
      kind: 'string',
      name: 'password',
    },
  ],
  actions: [
    {
      ref: {
        id: '#actionId',
        endpointId: '#endpointId',
      },
      options: {
        ref: {
          result: '#actionResult',
        },
      },
      useNewRuntime: false,
      events: [
        {
          kind: 'action',
          options: {
            assign: [],
            ref: {
              modelAction: '#loginActionId',
              resultAs: '#actionResult',
            },
          },
        },
      ],
    },
    {
      name: 'Login user action',
      ref: {
        id: '#loginActionId',
      },
      options: {
        ref: {
          result: '#jwt',
        },
      },
      useNewRuntime: true,
      events: [
        {
          kind: 'authenticate_user',
          options: {
            authenticationProfileId: '',
            ref: {
              username: '#usernameVariableId',
              password: '#passwordVariableId',
              jwtAs: '#jwt',
            },
          },
        },
      ],
    },
  ],
  interactions: [
    {
      name: 'Show',
      sourceEvent: 'onActionError',
      ref: {
        targetComponentId: '#alertErrorId',
        sourceComponentId: '#formId',
      },
      type: 'Custom',
    },
    {
      name: 'Toggle loading state',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#btnId',
        sourceComponentId: '#formId',
      },
      type: 'Custom',
    },
    {
      name: 'Toggle loading state',
      sourceEvent: 'onActionDone',
      ref: {
        targetComponentId: '#btnId',
        sourceComponentId: '#formId',
      },
      type: 'Custom',
    },
    {
      name: 'Hide',
      sourceEvent: 'onSubmit',
      ref: {
        targetComponentId: '#alertErrorId',
        sourceComponentId: '#formId',
      },
      type: 'Custom',
    },
    {
      name: 'login',
      sourceEvent: 'onActionSuccess',
      ref: {
        sourceComponentId: '#formId',
      },
      parameters: [],
      type: 'Global',
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
                  value: '100vh',
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
                  value: true,
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
                  value: [
                    'https://assets.bettyblocks.com/1e9019bb1c5c4af2ba799c2ee1761af0_assets/files/login-background',
                  ],
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
                  value: 'cover',
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
                          value: '4',
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
                          value: '6',
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
                          value: 'White',
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
                          value: 'flex-start',
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
                              value: '10%',
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
                                  value: 'center',
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
                                  value: ['XL', 'XL', '0rem', 'XL'],
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
                                      value: [
                                        'https://assets.bettyblocks.com/f95733c870a2471fa89e7716cac0556f_assets/files/logo-placeholder',
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
                                            name: 'Internal page',
                                            value: 'internal',
                                          },
                                          {
                                            name: 'External page',
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
                                      value: '',
                                      configuration: {
                                        as: 'UNIT',
                                      },
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
                                      value: ['S', 'S', 'S', 'S'],
                                      label: 'Outer space',
                                      key: 'outerSpacing',
                                      type: 'SIZES',
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
                              value: '90%',
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
                                  value: 'center',
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
                                  value: ['XL', 'XL', 'XL', 'XL'],
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
                              ],
                              descendants: [
                                {
                                  name: 'Text',
                                  options: [
                                    {
                                      type: 'VARIABLE',
                                      label: 'Content',
                                      key: 'content',
                                      value: ['Login'],
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
                                      value: 'Title3',
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
                                      value: ['0rem', '0rem', 'XL', '0rem'],
                                      label: 'Outer space',
                                      key: 'outerSpacing',
                                      type: 'SIZES',
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
                                      value: '100',
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
                                      name: 'Form',
                                      ref: {
                                        id: '#formId',
                                      },
                                      options: [
                                        {
                                          value: {
                                            modelId: '',
                                            ref: {
                                              customModelId: '#customModelId',
                                              actionId: '#actionId',
                                              variableId:
                                                '#customModelVariableId',
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
                                          value: '',
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
                                          value: 'interaction',
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
                                          value: '',
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
                                        {
                                          value: ['0rem', '0rem', 'M', '0rem'],
                                          label: 'Outer space',
                                          key: 'outerSpacing',
                                          type: 'SIZES',
                                        },
                                        {
                                          value: '',
                                          label:
                                            'Redirect after succesful submit',
                                          key: 'redirect',
                                          type: 'ENDPOINT',
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
                                                '0rem',
                                                '0rem',
                                                '0rem',
                                                '0rem',
                                              ],
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
                                                  type: 'VARIABLE',
                                                  label: 'Button text',
                                                  key: 'buttonText',
                                                  value: [
                                                    'Register new account',
                                                  ],
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
                                                      {
                                                        name: 'Current Tab',
                                                        value: '_self',
                                                      },
                                                      {
                                                        name: 'New Tab',
                                                        value: '_blank',
                                                      },
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
                                                        name:
                                                          'AccessibilityNew',
                                                        value:
                                                          'AccessibilityNew',
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
                                                        name:
                                                          'AccountBalanceWallet',
                                                        value:
                                                          'AccountBalanceWallet',
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
                                                        name:
                                                          'AddCircleOutline',
                                                        value:
                                                          'AddCircleOutline',
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
                                                        name:
                                                          'AirplanemodeActive',
                                                        value:
                                                          'AirplanemodeActive',
                                                      },
                                                      {
                                                        name:
                                                          'AirplanemodeInactive',
                                                        value:
                                                          'AirplanemodeInactive',
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
                                                        name:
                                                          'ArrowDropDownCircle',
                                                        value:
                                                          'ArrowDropDownCircle',
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
                                                        value:
                                                          'ArrowForwardIos',
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
                                                        name:
                                                          'AssignmentReturn',
                                                        value:
                                                          'AssignmentReturn',
                                                      },
                                                      {
                                                        name:
                                                          'AssignmentReturned',
                                                        value:
                                                          'AssignmentReturned',
                                                      },
                                                      {
                                                        name:
                                                          'AssignmentTurnedIn',
                                                        value:
                                                          'AssignmentTurnedIn',
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
                                                        name:
                                                          'CheckCircleOutline',
                                                        value:
                                                          'CheckCircleOutline',
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
                                                        name:
                                                          'DirectionsRailway',
                                                        value:
                                                          'DirectionsRailway',
                                                      },
                                                      {
                                                        name: 'DirectionsRun',
                                                        value: 'DirectionsRun',
                                                      },
                                                      {
                                                        name:
                                                          'DirectionsSubway',
                                                        value:
                                                          'DirectionsSubway',
                                                      },
                                                      {
                                                        name:
                                                          'DirectionsTransit',
                                                        value:
                                                          'DirectionsTransit',
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
                                                        name:
                                                          'KeyboardArrowDown',
                                                        value:
                                                          'KeyboardArrowDown',
                                                      },
                                                      {
                                                        name:
                                                          'KeyboardArrowLeft',
                                                        value:
                                                          'KeyboardArrowLeft',
                                                      },
                                                      {
                                                        name:
                                                          'KeyboardArrowRight',
                                                        value:
                                                          'KeyboardArrowRight',
                                                      },
                                                      {
                                                        name: 'KeyboardArrowUp',
                                                        value:
                                                          'KeyboardArrowUp',
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
                                                        name:
                                                          'NotificationImportant',
                                                        value:
                                                          'NotificationImportant',
                                                      },
                                                      {
                                                        name: 'Notifications',
                                                        value: 'Notifications',
                                                      },
                                                      {
                                                        name:
                                                          'NotificationsActive',
                                                        value:
                                                          'NotificationsActive',
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
                                                        name:
                                                          'PlayCircleFilled',
                                                        value:
                                                          'PlayCircleFilled',
                                                      },
                                                      {
                                                        name:
                                                          'PlayCircleFilledWhite',
                                                        value:
                                                          'PlayCircleFilledWhite',
                                                      },
                                                      {
                                                        name:
                                                          'PlayCircleOutline',
                                                        value:
                                                          'PlayCircleOutline',
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
                                                        name:
                                                          'RemoveCircleOutline',
                                                        value:
                                                          'RemoveCircleOutline',
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
                                                  value: [
                                                    'I forgot my password',
                                                  ],
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
                                                      {
                                                        name: 'Current Tab',
                                                        value: '_self',
                                                      },
                                                      {
                                                        name: 'New Tab',
                                                        value: '_blank',
                                                      },
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
                                                        name:
                                                          'AccessibilityNew',
                                                        value:
                                                          'AccessibilityNew',
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
                                                        name:
                                                          'AccountBalanceWallet',
                                                        value:
                                                          'AccountBalanceWallet',
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
                                                        name:
                                                          'AddCircleOutline',
                                                        value:
                                                          'AddCircleOutline',
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
                                                        name:
                                                          'AirplanemodeActive',
                                                        value:
                                                          'AirplanemodeActive',
                                                      },
                                                      {
                                                        name:
                                                          'AirplanemodeInactive',
                                                        value:
                                                          'AirplanemodeInactive',
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
                                                        name:
                                                          'ArrowDropDownCircle',
                                                        value:
                                                          'ArrowDropDownCircle',
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
                                                        value:
                                                          'ArrowForwardIos',
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
                                                        name:
                                                          'AssignmentReturn',
                                                        value:
                                                          'AssignmentReturn',
                                                      },
                                                      {
                                                        name:
                                                          'AssignmentReturned',
                                                        value:
                                                          'AssignmentReturned',
                                                      },
                                                      {
                                                        name:
                                                          'AssignmentTurnedIn',
                                                        value:
                                                          'AssignmentTurnedIn',
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
                                                        name:
                                                          'CheckCircleOutline',
                                                        value:
                                                          'CheckCircleOutline',
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
                                                        name:
                                                          'DirectionsRailway',
                                                        value:
                                                          'DirectionsRailway',
                                                      },
                                                      {
                                                        name: 'DirectionsRun',
                                                        value: 'DirectionsRun',
                                                      },
                                                      {
                                                        name:
                                                          'DirectionsSubway',
                                                        value:
                                                          'DirectionsSubway',
                                                      },
                                                      {
                                                        name:
                                                          'DirectionsTransit',
                                                        value:
                                                          'DirectionsTransit',
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
                                                        name:
                                                          'KeyboardArrowDown',
                                                        value:
                                                          'KeyboardArrowDown',
                                                      },
                                                      {
                                                        name:
                                                          'KeyboardArrowLeft',
                                                        value:
                                                          'KeyboardArrowLeft',
                                                      },
                                                      {
                                                        name:
                                                          'KeyboardArrowRight',
                                                        value:
                                                          'KeyboardArrowRight',
                                                      },
                                                      {
                                                        name: 'KeyboardArrowUp',
                                                        value:
                                                          'KeyboardArrowUp',
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
                                                        name:
                                                          'NotificationImportant',
                                                        value:
                                                          'NotificationImportant',
                                                      },
                                                      {
                                                        name: 'Notifications',
                                                        value: 'Notifications',
                                                      },
                                                      {
                                                        name:
                                                          'NotificationsActive',
                                                        value:
                                                          'NotificationsActive',
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
                                                        name:
                                                          'PlayCircleFilled',
                                                        value:
                                                          'PlayCircleFilled',
                                                      },
                                                      {
                                                        name:
                                                          'PlayCircleFilledWhite',
                                                        value:
                                                          'PlayCircleFilledWhite',
                                                      },
                                                      {
                                                        name:
                                                          'PlayCircleOutline',
                                                        value:
                                                          'PlayCircleOutline',
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
                                                        name:
                                                          'RemoveCircleOutline',
                                                        value:
                                                          'RemoveCircleOutline',
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
                                          name: 'Button',
                                          ref: {
                                            id: '#btnId',
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
                                              value: ['Login'],
                                            },
                                            {
                                              value: true,
                                              label: 'Full width',
                                              key: 'fullWidth',
                                              type: 'TOGGLE',
                                            },
                                            {
                                              label: 'Icon',
                                              key: 'icon',
                                              value: 'DoubleArrow',
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
                                                    name:
                                                      'AccountBalanceWallet',
                                                    value:
                                                      'AccountBalanceWallet',
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
                                                    name:
                                                      'AirplanemodeInactive',
                                                    value:
                                                      'AirplanemodeInactive',
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
                                                    value:
                                                      'ArrowDropDownCircle',
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
                                                    name:
                                                      'NotificationImportant',
                                                    value:
                                                      'NotificationImportant',
                                                  },
                                                  {
                                                    name: 'Notifications',
                                                    value: 'Notifications',
                                                  },
                                                  {
                                                    name: 'NotificationsActive',
                                                    value:
                                                      'NotificationsActive',
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
                                                    name:
                                                      'PlayCircleFilledWhite',
                                                    value:
                                                      'PlayCircleFilledWhite',
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
                                                    value:
                                                      'RemoveCircleOutline',
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
                                                'M',
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
}))();
