(() => ({
  name: 'TextField',
  icon: 'TextInputIcon',
  category: 'FORM',
  structure: [
    {
      name: 'TextField',
      options: [
        {
          value: 'label',
          label: 'Label',
          key: 'label',
          type: 'TEXT',
        },
        {
          value: [],
          label: 'Value',
          key: 'defaultValue',
          type: 'VARIABLE',
        },
        {
          value: '',
          label: 'Input',
          key: 'actionInputId',
          type: 'ACTION_INPUT',
        },
        {
          value: false,
          label: 'Required',
          key: 'required',
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
                name: 'AccessAlarm',
                value: 'AccessAlarm',
              },
              {
                name: 'AccessAlarms',
                value: 'AccessAlarms',
              },
              {
                name: 'AccessTime',
                value: 'AccessTime',
              },
              {
                name: 'Accessibility',
                value: 'Accessibility',
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
                name: 'AccessibleForward',
                value: 'AccessibleForward',
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
                name: 'AccountBox',
                value: 'AccountBox',
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
                name: 'Adb',
                value: 'Adb',
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
                name: 'AddAlarm',
                value: 'AddAlarm',
              },
              {
                name: 'AddAlert',
                value: 'AddAlert',
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
                name: 'AddIcCall',
                value: 'AddIcCall',
              },
              {
                name: 'AddLocation',
                value: 'AddLocation',
              },
              {
                name: 'AddPhotoAlternate',
                value: 'AddPhotoAlternate',
              },
              {
                name: 'AddShoppingCart',
                value: 'AddShoppingCart',
              },
              {
                name: 'AddToHomeScreen',
                value: 'AddToHomeScreen',
              },
              {
                name: 'AddToPhotos',
                value: 'AddToPhotos',
              },
              {
                name: 'AddToQueue',
                value: 'AddToQueue',
              },
              {
                name: 'Adjust',
                value: 'Adjust',
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
      ],
      descendants: [],
    },
  ],
}))();
