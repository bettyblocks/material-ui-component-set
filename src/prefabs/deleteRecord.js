(() => ({
  name: 'Delete Record',
  icon: 'DeleteRecordIcon',
  category: 'BUTTON',
  keywords: ['Button', 'delete', 'deleterecord'],
  beforeCreate: ({
    prefab,
    save,
    close,
    components: { ModelSelector, Header, Content, Field, Footer, Text },
    helpers: { useModelQuery },
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [showValidation, setShowValidation] = React.useState(false);

    const { data } = useModelQuery({
      variables: { id: modelId },
      skip: !modelId,
    });

    React.useEffect(() => {
      setShowValidation(false);
    }, [modelId]);

    return (
      <>
        <Header onClose={close} title="Configure delete record" />
        <Content>
          <Field
            label="Select model"
            error={
              showValidation && <Text color="#e82600">Model is required</Text>
            }
            info="Small note: If you can't select any models try to place the button inside a component where an object is available."
          >
            <ModelSelector
              onChange={id => {
                setModelId(id);
              }}
              value={modelId}
              margin
              scopedModels
            />
          </Field>
        </Content>
        <Footer
          onClose={close}
          onSave={() => {
            const camelToSnakeCase = str =>
              str[0].toLowerCase() +
              str
                .slice(1, str.length)
                .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

            if (!modelId || !data || !data.model) {
              setShowValidation(true);
              return;
            }
            const newPrefab = { ...prefab };
            if (data && data.model) {
              newPrefab.variables[0].name = camelToSnakeCase(data.model.name);
            }
            newPrefab.structure[0].descendants[1].descendants[0].descendants[0].descendants[0].descendants[2].descendants[1].options[6].value = [
              modelId,
            ];
            newPrefab.variables[0].options.modelId = modelId;

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
        sourceComponentId: '#submitButton',
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
  ],
  structure: [
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
              value: ['Delete'],
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
              label: 'Full width',
              key: 'fullWidth',
              type: 'TOGGLE',
            },
            {
              label: 'Icon',
              key: 'icon',
              value: 'Delete',
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
                          value: ['M', 'M', 'M', 'M'],
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
                              value: ['M', '0rem', '0rem', 'M'],
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
                              name: 'Icon',
                              ref: {
                                id: '#closeBtn',
                              },
                              options: [
                                {
                                  label: 'Icon',
                                  key: 'icon',
                                  value: 'Close',
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
                                  value: 'S',
                                  label: 'Size',
                                  key: 'size',
                                  type: 'SIZE',
                                },
                                {
                                  type: 'COLOR',
                                  label: 'Color',
                                  key: 'color',
                                  value: 'Accent1',
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
                                  value: ['0rem', 'M', '0rem', '0rem'],
                                  label: 'Outer space',
                                  key: 'outerSpacing',
                                  type: 'SIZES',
                                },
                                {
                                  type: 'TOGGLE',
                                  label: 'Add Badge',
                                  key: 'addBadge',
                                  value: false,
                                },
                                {
                                  type: 'TOGGLE',
                                  label: 'Hide Badge if value is 0',
                                  key: 'hideBadge',
                                  value: false,
                                  configuration: {
                                    condition: {
                                      type: 'SHOW',
                                      option: 'addBadge',
                                      comparator: 'EQ',
                                      value: true,
                                    },
                                  },
                                },
                                {
                                  type: 'VARIABLE',
                                  label: 'Content',
                                  key: 'content',
                                  value: ['1'],
                                  configuration: {
                                    as: 'MULTILINE',
                                    condition: {
                                      type: 'SHOW',
                                      option: 'addBadge',
                                      comparator: 'EQ',
                                      value: true,
                                    },
                                  },
                                },
                                {
                                  label: 'Badge Color',
                                  key: 'badgeColor',
                                  value: 'Secondary',
                                  type: 'COLOR',
                                  configuration: {
                                    condition: {
                                      type: 'SHOW',
                                      option: 'addBadge',
                                      comparator: 'EQ',
                                      value: true,
                                    },
                                  },
                                },
                                {
                                  label: 'Anchor Origin',
                                  key: 'anchorOrigin',
                                  value: 'right,top',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Top Right',
                                        value: 'right,top',
                                      },
                                      {
                                        name: 'Top Left',
                                        value: 'left,top',
                                      },
                                      {
                                        name: 'Bottom Right',
                                        value: 'right,bottom',
                                      },
                                      {
                                        name: 'Bottom Left',
                                        value: 'left,bottom',
                                      },
                                    ],
                                    condition: {
                                      type: 'SHOW',
                                      option: 'addBadge',
                                      comparator: 'EQ',
                                      value: true,
                                    },
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
                                      { name: 'Dot', value: 'dot' },
                                    ],
                                    condition: {
                                      type: 'SHOW',
                                      option: 'addBadge',
                                      comparator: 'EQ',
                                      value: true,
                                    },
                                  },
                                },
                                {
                                  type: 'SIZES',
                                  label: 'Outer Space',
                                  key: 'margin',
                                  value: ['S', 'S', 'S', 'S'],
                                  configuration: {
                                    condition: {
                                      type: 'SHOW',
                                      option: 'addBadge',
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
                                      value: [
                                        'Are you sure you want to delete this record? You can’t undo this action.',
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
                              ref: {
                                id: '#cancelBtn',
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
                            {
                              name: 'Button',
                              ref: {
                                id: '#submitButton',
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
                                  value: ['Delete'],
                                },
                                {
                                  type: 'CUSTOM',
                                  label: 'Link to',
                                  key: 'linkType',
                                  value: 'action',
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
                                  value: [],
                                  label: 'Objects to pass to action',
                                  key: 'actionModels',
                                  type: 'ACTION_INPUT_OBJECTS',
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
  ],
}))();
