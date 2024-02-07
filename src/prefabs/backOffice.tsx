import * as React from 'react';

import {
  prefab,
  Icon,
  toggle,
  sizes,
  showIf,
  variable,
  option,
  icon,
  ThemeColor,
  color,
  size,
  buttongroup,
  font,
  hideIf,
  text,
  PrefabReference,
  component,
  PrefabInteraction,
  PrefabComponentOption,
  InteractionType,
  BeforeCreateArgs,
  PrefabComponent,
  wrapper,
  linked,
  childSelector,
  showIfTrue,
  reconfigure,
  property,
  addChild,
  endpoint,
} from '@betty-blocks/component-sdk';

import {
  Box,
  boxOptions,
  Button,
  buttonOptions,
  Column,
  columnOptions,
  Conditional,
  conditionalOptions,
  DataContainer,
  dataContainerOptions,
  DataTable,
  DataTableColumn,
  dataTableColumnOptions,
  dataTableOptions,
  DetailViewChild,
  detailViewChildOptions,
  Dialog,
  dialogOptions,
  Drawer,
  DrawerBar,
  drawerBarOptions,
  DrawerContainer,
  drawerContainerOptions,
  drawerOptions,
  FilterComponent,
  filterComponentOptions,
  FormErrorAlert,
  Grid,
  gridOptions,
  List,
  ListItem,
  listItemOptions,
  listOptions,
  Media,
  mediaOptions,
  Paper,
  Row,
  rowOptions,
  SubmitButton,
  submitButtonOptions,
  Subview,
  SubviewItem,
  subviewItemOptions,
  subviewOptions,
  Tab,
  tabOptions,
  Tabs,
  tabsOptions,
  Text,
  TextInput,
  textInputOptions,
  textOptions,
} from './structures';
import { options as formOptions } from './structures/ActionJSForm/options';
import { children as formChildren } from './structures/ActionJSForm/children';
import { Properties, IdPropertyProps, ModelProps, ModelQuery } from './types';
import { PermissionType, PropertyStateProps } from './types/types';

const children = [
  DataTableColumn({
    options: {
      ...dataTableColumnOptions,
      property: property('Property', {
        value: '',
        showInAddChild: true,
        showInReconfigure: true,
      }),
    },
  }),
];

const detailChildren = [
  wrapper(
    {
      label: 'Detail view item',
      options: {
        property: linked({
          label: 'Property',
          value: {
            ref: {
              componentId: '#detailItem',
              optionId: '#detailItemProperty',
            },
          },
          showInReconfigure: true,
        }),
        valueContent: linked({
          label: 'Label Text',
          value: {
            ref: {
              componentId: '#detailItem',
              optionId: '#detailItemLabel',
            },
          },
        }),
      },
    },
    [
      Conditional(
        {
          options: {
            ...conditionalOptions,
            left: variable('Conditional property', {
              value: [],
            }),
            compare: option('CUSTOM', {
              label: 'Compare',
              value: 'neq',
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
                    name: 'Greater than or equal to',
                    value: 'gteq',
                  },
                  {
                    name: 'Less than or equal to',
                    value: 'lteq',
                  },
                ],
              },
            }),
          },
        },
        [
          Box(
            {
              options: {
                ...boxOptions,
                outerSpacing: sizes('Outer space', {
                  value: ['0rem', '0rem', 'M', '0rem'],
                }),
                backgroundColor: color('Background color', {
                  value: ThemeColor.ACCENT_1,
                }),
                backgroundColorAlpha: option('NUMBER', {
                  label: 'Background color opacity',
                  value: 20,
                }),
              },
            },
            [
              DetailViewChild(
                {
                  ref: {
                    id: '#detailItem',
                  },
                  options: {
                    ...detailViewChildOptions,
                    property: property('Property', {
                      value: '',
                      showInAddChild: true,
                      ref: {
                        id: '#detailItemProperty',
                      },
                    }),
                    labelText: variable('Label Text', {
                      ...detailViewChildOptions.labelText('labelText'),
                      ref: { id: '#detailItemLabel' },
                    }),
                    fontWeight: option('CUSTOM', {
                      ...detailViewChildOptions.fontWeight('fontWeight'),
                      value: '500',
                    }),
                  },
                },
                [],
              ),
            ],
          ),
        ],
      ),
    ],
  ),
];

const subViewChildren = [
  SubviewItem({
    options: {
      ...subviewItemOptions,
      prop: property('Relation', {
        value: '',
        showInAddChild: true,
        showInReconfigure: true,
        configuration: {
          allowRelations: true,
          allowedKinds: [
            'BELONGS_TO',
            'HAS_AND_BELONGS_TO_MANY',
            'HAS_MANY',
            'HAS_ONE',
          ],
        },
      }),
      linkTo: endpoint('Page', {
        value: '',
        showInAddChild: true,
      }),
    },
  }),
];

const interactions: PrefabInteraction[] = [
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#deleteButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#closeBtn',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#cancelButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#deleteDialog',
      sourceComponentId: '#deleteForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#dataTable',
      sourceComponentId: '#deleteForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#dataTable',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#dataTable',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onSubmit',
    ref: {
      targetComponentId: '#editErrorAlert',
      sourceComponentId: '#updateForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#detailButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#editCancelButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#createCancelButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#detailTab',
      sourceComponentId: '#detailButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#createButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#editButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#createTab',
      sourceComponentId: '#createButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#editTab',
      sourceComponentId: '#editButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#editTab',
      sourceComponentId: '#editButtonFromDetails',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#detailCancelButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#closeEditTabBtn',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#closeCreateTabBtn',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#closeDetailsTabBtn',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Submit',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#createForm',
      sourceComponentId: '#createSubmitButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Submit',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#updateForm',
      sourceComponentId: '#editSubmitButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#searchColumn',
      sourceComponentId: '#searchButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#searchButtonActive',
      sourceComponentId: '#searchButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#searchButton',
      sourceComponentId: '#searchButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#searchButtonActive',
      sourceComponentId: '#searchButtonActive',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#searchColumn',
      sourceComponentId: '#searchButtonActive',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#searchButton',
      sourceComponentId: '#searchButtonActive',
    },
    type: InteractionType.Custom,
  },
  {
    type: InteractionType.Custom,
    name: 'Disable',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#createSubmitButton',
      sourceComponentId: '#createForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Enable',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#createSubmitButton',
      sourceComponentId: '#createForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Enable',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#createSubmitButton',
      sourceComponentId: '#createForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Disable',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#editSubmitButton',
      sourceComponentId: '#updateForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Enable',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#editSubmitButton',
      sourceComponentId: '#updateForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Enable',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#editSubmitButton',
      sourceComponentId: '#updateForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#createAlertErrorId',
      sourceComponentId: '#createForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#createAlertErrorId',
      sourceComponentId: '#createForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#editErrorAlert',
      sourceComponentId: '#updateForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#editErrorAlert',
      sourceComponentId: '#updateForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Toggle loading state',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#deleteSubmitButton',
      sourceComponentId: '#deleteForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Toggle loading state',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#deleteSubmitButton',
      sourceComponentId: '#deleteForm',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Toggle loading state',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#deleteSubmitButton',
      sourceComponentId: '#deleteForm',
    },
  },
  {
    name: 'Add filter group',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterComp',
      sourceComponentId: '#addFilterButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Apply filter',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterComp',
      sourceComponentId: '#applyButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Advanced filter',
    sourceEvent: 'onSubmit',
    ref: {
      targetComponentId: '#dataTable',
      sourceComponentId: '#filterComp',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Clear advanced filter',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#dataTable',
      sourceComponentId: '#clearFilterButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Reset advanced filter',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterComp',
      sourceComponentId: '#clearFilterButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterColumn',
      sourceComponentId: '#filterButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterButtonActive',
      sourceComponentId: '#filterButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterButton',
      sourceComponentId: '#filterButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterButtonActive',
      sourceComponentId: '#filterButtonActive',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterColumn',
      sourceComponentId: '#filterButtonActive',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterButton',
      sourceComponentId: '#filterButtonActive',
    },
    type: InteractionType.Custom,
  },
];

const attributes = {
  category: 'FORM',
  icon: Icon.UpdateFormIcon,
  type: 'page',
  developerMode: 'basic',
  description:
    'This page contains a datatable and all you need to manage your records.',
  detail:
    'In this ready to use Data Table, it is possible to create, display (read), update and delete records. These functionalities are shown in a slide-out panel.',
  previewUrl: 'https://preview.betty.app/back-office',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Back_Office.jpg',
  interactions,
};

const sideMenu = Box(
  {
    ref: { id: '#sideMenuPartial' },
    options: {
      ...boxOptions,
      stretch: toggle('Stretch (when in flex container)', {
        value: true,
      }),
      innerSpacing: sizes('Inner space', {
        value: ['0rem', '0rem', '0rem', '0rem'],
      }),
      backgroundColor: color('Background color', {
        value: ThemeColor.PRIMARY,
      }),
    },
  },
  [
    Box(
      {
        options: {
          ...boxOptions,
          stretch: toggle('Stretch (when in flex container)', {
            value: true,
          }),
          innerSpacing: sizes('Inner space', {
            value: ['0rem', '0rem', '0rem', '0rem'],
          }),
        },
      },
      [
        Box(
          {
            options: {
              ...boxOptions,
              innerSpacing: sizes('Inner space', {
                value: ['L', 'L', '0rem', 'L'],
              }),
            },
          },
          [
            Media(
              {
                options: {
                  ...mediaOptions,
                  type: option('CUSTOM', {
                    label: 'Media type',
                    value: 'url',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Image', value: 'img' },
                        { name: 'Data/URL', value: 'url' },
                        { name: 'Video', value: 'video' },
                        { name: 'I-frame', value: 'iframe' },
                      ],
                    },
                  }),
                  urlFileSource: variable('Source', {
                    value: [
                      'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                    ],
                    configuration: {
                      placeholder: 'Starts with https:// or http://',
                      as: 'MULTILINE',
                      condition: showIf('type', 'EQ', 'url'),
                    },
                  }),
                },
              },
              [],
            ),
          ],
        ),
        Box(
          {
            options: {
              ...boxOptions,
              stretch: toggle('Stretch (when in flex container)', {
                value: true,
              }),
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
            },
          },
          [
            List(
              {
                options: {
                  ...listOptions,
                  disablePadding: toggle('Disable padding', { value: false }),
                },
              },
              [
                ListItem(
                  {
                    options: {
                      ...listItemOptions,
                      primaryText: variable('Primary text', {
                        value: ['First list item'],
                      }),
                      avatarOrIcon: option('CUSTOM', {
                        label: 'Visual',
                        value: 'icon',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Icon', value: 'icon' },
                            { name: 'Avatar', value: 'avatar' },
                          ],
                        },
                      }),
                      icon: icon('Icon', {
                        value: 'Apartment',
                        configuration: {
                          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
                        },
                      }),
                      selected: toggle('Selected', { value: true }),
                      titleColor: color('Title color', {
                        value: ThemeColor.WHITE,
                      }),
                      iconColor: color('Icon color', {
                        value: ThemeColor.WHITE,
                        configuration: {
                          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
                        },
                      }),
                    },
                  },
                  [],
                ),
                ListItem(
                  {
                    options: {
                      ...listItemOptions,
                      primaryText: variable('Primary text', {
                        value: ['Second list item'],
                      }),
                      avatarOrIcon: option('CUSTOM', {
                        label: 'Visual',
                        value: 'icon',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'None', value: 'none' },
                            { name: 'Icon', value: 'icon' },
                            { name: 'Avatar', value: 'avatar' },
                          ],
                        },
                      }),
                      titleColor: color('Title color', {
                        value: ThemeColor.WHITE,
                      }),
                      iconColor: color('Icon color', {
                        value: ThemeColor.WHITE,
                        configuration: {
                          condition: showIf('avatarOrIcon', 'EQ', 'icon'),
                        },
                      }),
                    },
                  },
                  [],
                ),
              ],
            ),
          ],
        ),
      ],
    ),
  ],
);

const drawerContainer = DrawerContainer(
  {
    label: 'Backoffice - Content',
    options: {
      ...drawerContainerOptions,
      innerSpacing: sizes('Inner space', {
        value: ['0rem', '0rem', '0rem', '0rem'],
      }),
    },
  },
  [
    Drawer(
      {
        ref: {
          id: '#contentContainer',
        },
        options: {
          ...drawerOptions,
          visibility: toggle('Visible in builder', {
            value: false,
            configuration: {
              as: 'VISIBILITY',
            },
            ref: {
              id: '#contentContainerVisibility',
            },
          }),
          drawerType: option('CUSTOM', {
            value: 'temporary',
            label: 'Drawer type',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Persistent', value: 'persistent' },
                { name: 'Temporary', value: 'temporary' },
              ],
            },
          }),
          temporaryAnchor: option('CUSTOM', {
            value: 'right',
            label: 'Alignment',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Left', value: 'left' },
                { name: 'Top', value: 'top' },
                { name: 'Right', value: 'right' },
                { name: 'Bottom', value: 'bottom' },
              ],
              condition: showIf('drawerType', 'EQ', 'temporary'),
            },
          }),
          drawerWidth: size('Drawer Width', {
            value: '900px',
            configuration: {
              as: 'UNIT',
            },
            ref: {
              id: '#contentContainerDrawerWidth',
            },
          }),
        },
      },
      [
        DrawerBar(
          {
            options: {
              ...drawerBarOptions,
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
            },
            ref: { id: '#drawerSidebar' },
          },
          [
            Box(
              {
                options: {
                  ...boxOptions,
                  height: size('Height', {
                    value: '100%',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                  innerSpacing: sizes('Inner space', {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                  }),
                },
              },
              [
                Tabs(
                  {
                    ref: {
                      id: '#drawerTabs',
                    },
                    options: {
                      ...tabsOptions,
                      selectedDesignTabIndex: childSelector(
                        'Selected tab (design)',
                        {
                          value: 1,
                          ref: {
                            id: '#drawerTabsSelectedDesignTabIndex',
                          },
                        },
                      ),
                      height: size('Height', {
                        value: '100%',
                        configuration: {
                          as: 'UNIT',
                        },
                      }),
                      hideTabs: toggle('Hide visual tabs', { value: true }),
                    },
                  },
                  [
                    Tab(
                      {
                        label: 'Create',
                        options: {
                          ...tabOptions,
                          label: variable('Tab label', {
                            value: ['CreateTab'],
                          }),
                          height: size('Height', {
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                        },
                        ref: { id: '#createTab' },
                      },
                      [
                        Grid(
                          {
                            options: {
                              ...gridOptions,
                              height: size('Height', {
                                value: '100%',
                                configuration: {
                                  as: 'UNIT',
                                },
                              }),
                            },
                          },
                          [
                            Grid(
                              {
                                options: {
                                  ...gridOptions,
                                  direction: option('CUSTOM', {
                                    value: 'column',
                                    label: 'Direction',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Horizontal',
                                          value: 'row',
                                        },
                                        {
                                          name: 'Vertical',
                                          value: 'column',
                                        },
                                      ],
                                      condition: showIf(
                                        'type',
                                        'EQ',
                                        'container',
                                      ),
                                    },
                                  }),
                                },
                              },
                              [
                                Box(
                                  {
                                    options: {
                                      ...boxOptions,
                                      alignment: buttongroup(
                                        'Alignment',
                                        [
                                          ['None', 'none'],
                                          ['Left', 'flex-start'],
                                          ['Center', 'center'],
                                          ['Right', 'flex-end'],
                                          ['Justified', 'space-between'],
                                        ],
                                        {
                                          value: 'space-between',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      valignment: buttongroup(
                                        'Vertical alignment',
                                        [
                                          ['None', 'none'],
                                          ['Top', 'flex-start'],
                                          ['Center', 'center'],
                                          ['Bottom', 'flex-end'],
                                        ],
                                        {
                                          value: 'center',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      backgroundColor: color(
                                        'Background color',
                                        {
                                          value: ThemeColor.PRIMARY,
                                        },
                                      ),
                                    },
                                  },
                                  [
                                    Text(
                                      {
                                        ref: {
                                          id: '#createTabTitle',
                                        },
                                        options: {
                                          ...textOptions,
                                          content: variable('Content', {
                                            value: ['Create'],
                                            configuration: {
                                              as: 'MULTILINE',
                                            },
                                            ref: {
                                              id: '#createTabTitleContent',
                                            },
                                          }),
                                          type: font('Text style', {
                                            value: ['Title5'],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    Button(
                                      {
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: [''],
                                          }),
                                          icon: icon('Icon', {
                                            value: 'Close',
                                          }),
                                          size: option('CUSTOM', {
                                            value: 'medium',
                                            label: 'Icon size',
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
                                              condition: hideIf(
                                                'icon',
                                                'EQ',
                                                'none',
                                              ),
                                            },
                                          }),
                                        },
                                        ref: { id: '#closeCreateTabBtn' },
                                        style: {
                                          overwrite: {
                                            backgroundColor: {
                                              type: 'STATIC',
                                              value: 'Transparent',
                                            },
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'white',
                                            },
                                            padding: ['0rem'],
                                          },
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                                Box(
                                  {
                                    options: {
                                      ...boxOptions,
                                      stretch: toggle(
                                        'Stretch (when in flex container)',
                                        {
                                          value: true,
                                        },
                                      ),
                                    },
                                    ref: { id: '#createFormBox' },
                                  },
                                  [
                                    component(
                                      'Form',
                                      {
                                        label: 'Create Form',
                                        options: {
                                          ...formOptions,
                                          reconfigure: reconfigure(
                                            'Reconfigure',
                                            {
                                              value: {
                                                children: formChildren,
                                                reconfigureWizardType:
                                                  'ChildrenSelector',
                                              },
                                              ref: {
                                                id: '#createFormReconfigure',
                                              },
                                            },
                                          ),
                                        },
                                        ref: { id: '#createForm' },
                                      },
                                      [
                                        FormErrorAlert({
                                          ref: {
                                            id: '#createAlertErrorId',
                                          },
                                        }),
                                      ],
                                    ),
                                  ],
                                ),
                                Box(
                                  {
                                    options: {
                                      ...boxOptions,
                                      alignment: buttongroup(
                                        'Alignment',
                                        [
                                          ['None', 'none'],
                                          ['Left', 'flex-start'],
                                          ['Center', 'center'],
                                          ['Right', 'flex-end'],
                                          ['Justified', 'space-between'],
                                        ],
                                        {
                                          value: 'space-between',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      backgroundColor: color(
                                        'Background color',
                                        {
                                          value: ThemeColor.LIGHT,
                                        },
                                      ),
                                      backgroundColorAlpha: option('NUMBER', {
                                        label: 'Background color opacity',
                                        value: 20,
                                      }),
                                    },
                                  },
                                  [
                                    Button(
                                      {
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Cancel'],
                                          }),
                                          outerSpacing: sizes('Outer space', {
                                            value: [
                                              '0rem',
                                              'S',
                                              '0rem',
                                              '0rem',
                                            ],
                                          }),
                                        },
                                        ref: { id: '#createCancelButton' },
                                        style: {
                                          overwrite: {
                                            backgroundColor: {
                                              type: 'STATIC',
                                              value: 'transparent',
                                            },
                                            borderColor: {
                                              type: 'THEME_COLOR',
                                              value: 'primary',
                                            },
                                            borderRadius: ['0.25rem'],
                                            borderStyle: 'solid',
                                            borderWidth: ['0.0625rem'],
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'primary',
                                            },
                                            fontFamily: 'Roboto',
                                            fontSize: '0.875rem',
                                            fontStyle: 'none',
                                            fontWeight: '400',
                                            padding: ['0.625rem', '1.3125rem'],
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                          },
                                        },
                                      },
                                      [],
                                    ),
                                    SubmitButton(
                                      {
                                        options: {
                                          ...submitButtonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Save'],
                                          }),
                                          icon: icon('Icon', {
                                            value: 'Save',
                                          }),
                                        },
                                        ref: { id: '#createSubmitButton' },
                                        style: {
                                          overwrite: {
                                            backgroundColor: {
                                              type: 'THEME_COLOR',
                                              value: 'primary',
                                            },
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'white',
                                            },
                                            fontFamily: 'Roboto',
                                            fontSize: '0.875rem',
                                            fontStyle: 'none',
                                            fontWeight: '400',
                                            padding: ['0.6875rem', '1.375rem'],
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                          },
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                    Tab(
                      {
                        label: 'Details',
                        options: {
                          ...tabOptions,
                          label: variable('Tab label', {
                            value: ['DetailsTab'],
                          }),
                          height: size('Height', {
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                        },
                        ref: { id: '#detailTab' },
                      },
                      [
                        Grid(
                          {
                            options: {
                              ...gridOptions,
                              height: size('Height', {
                                value: '100%',
                                configuration: {
                                  as: 'UNIT',
                                },
                              }),
                            },
                          },
                          [
                            Grid(
                              {
                                options: {
                                  ...gridOptions,
                                  direction: option('CUSTOM', {
                                    value: 'column',
                                    label: 'Direction',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Horizontal',
                                          value: 'row',
                                        },
                                        {
                                          name: 'Vertical',
                                          value: 'column',
                                        },
                                      ],
                                      condition: showIf(
                                        'type',
                                        'EQ',
                                        'container',
                                      ),
                                    },
                                  }),
                                },
                              },
                              [
                                Box(
                                  {
                                    options: {
                                      ...boxOptions,
                                      alignment: buttongroup(
                                        'Alignment',
                                        [
                                          ['None', 'none'],
                                          ['Left', 'flex-start'],
                                          ['Center', 'center'],
                                          ['Right', 'flex-end'],
                                          ['Justified', 'space-between'],
                                        ],
                                        {
                                          value: 'space-between',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      valignment: buttongroup(
                                        'Vertical alignment',
                                        [
                                          ['None', 'none'],
                                          ['Top', 'flex-start'],
                                          ['Center', 'center'],
                                          ['Bottom', 'flex-end'],
                                        ],
                                        {
                                          value: 'center',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      backgroundColor: color(
                                        'Background color',
                                        {
                                          value: ThemeColor.PRIMARY,
                                        },
                                      ),
                                    },
                                  },
                                  [
                                    Text(
                                      {
                                        ref: {
                                          id: '#detailsTabTitle',
                                        },
                                        options: {
                                          ...textOptions,
                                          content: variable('Content', {
                                            value: ['Details'],
                                            configuration: {
                                              as: 'MULTILINE',
                                            },
                                            ref: {
                                              id: '#detailsTabTitleContent',
                                            },
                                          }),
                                          type: font('Text style', {
                                            value: ['Title5'],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    Button(
                                      {
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: [''],
                                          }),
                                          icon: icon('Icon', {
                                            value: 'Close',
                                          }),
                                          size: option('CUSTOM', {
                                            value: 'medium',
                                            label: 'Icon size',
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
                                              condition: hideIf(
                                                'icon',
                                                'EQ',
                                                'none',
                                              ),
                                            },
                                          }),
                                        },
                                        ref: { id: '#closeDetailsTabBtn' },
                                        style: {
                                          overwrite: {
                                            backgroundColor: {
                                              type: 'STATIC',
                                              value: 'Transparent',
                                            },
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'white',
                                            },
                                            padding: ['0rem'],
                                          },
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                                Box(
                                  {
                                    options: {
                                      ...boxOptions,
                                      stretch: toggle(
                                        'Stretch (when in flex container)',
                                        {
                                          value: true,
                                        },
                                      ),
                                      width: size('Width', {
                                        value: '100%',
                                        configuration: {
                                          as: 'UNIT',
                                        },
                                      }),
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                    ref: { id: '#detailBox' },
                                  },
                                  [
                                    DataContainer(
                                      {
                                        ref: {
                                          id: '#detailDatacontainer',
                                        },
                                        options: {
                                          ...dataContainerOptions,
                                          loadingType: option('CUSTOM', {
                                            value: 'showChildren',
                                            label: 'Show on load',
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
                                          }),
                                        },
                                      },
                                      [
                                        Row(
                                          {
                                            options: {
                                              ...rowOptions,
                                              maxRowWidth: option('CUSTOM', {
                                                label: 'Width',
                                                value: 'Full',
                                                configuration: {
                                                  as: 'BUTTONGROUP',
                                                  dataType: 'string',
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
                                                },
                                              }),
                                            },
                                          },
                                          [
                                            Column(
                                              {
                                                ref: {
                                                  id: '#detailColumn',
                                                },
                                                options: {
                                                  ...columnOptions,
                                                  columnWidth: option(
                                                    'CUSTOM',
                                                    {
                                                      label: 'Column width',
                                                      value: '8',
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
                                                  ),
                                                  columnWidthTabletLandscape:
                                                    option('CUSTOM', {
                                                      label:
                                                        'Column width (tablet landscape)',
                                                      value: '8',
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
                                                    }),
                                                  columnWidthTabletPortrait:
                                                    option('CUSTOM', {
                                                      value: '12',
                                                      label:
                                                        'Column width (tablet portrait)',
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
                                                    }),
                                                  columnWidthMobile: option(
                                                    'CUSTOM',
                                                    {
                                                      value: '12',
                                                      label:
                                                        'Column width (mobile)',
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
                                                  ),
                                                  reconfigure: reconfigure(
                                                    'Reconfigure detail view',
                                                    {
                                                      ref: {
                                                        id: '#reconfigureDetail',
                                                      },
                                                      value: {
                                                        children:
                                                          detailChildren,
                                                        reconfigureWizardType:
                                                          'ChildrenSelector',
                                                      },
                                                    },
                                                  ),
                                                  addChild: addChild(
                                                    'Add detail view',
                                                    {
                                                      ref: {
                                                        id: '#addDetailViewChild',
                                                      },
                                                      optionRef: {
                                                        id: '#reconfigureDetailOption',
                                                      },
                                                      value: {
                                                        children:
                                                          detailChildren,
                                                        addChildWizardType:
                                                          'ChildSelector',
                                                      },
                                                    },
                                                  ),
                                                },
                                              },
                                              [],
                                            ),
                                            Column(
                                              {
                                                options: {
                                                  ...columnOptions,
                                                  columnWidth: option(
                                                    'CUSTOM',
                                                    {
                                                      label: 'Column width',
                                                      value: '4',
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
                                                  ),
                                                  columnWidthTabletLandscape:
                                                    option('CUSTOM', {
                                                      label:
                                                        'Column width (tablet landscape)',
                                                      value: '4',
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
                                                    }),
                                                  columnWidthTabletPortrait:
                                                    option('CUSTOM', {
                                                      value: '12',
                                                      label:
                                                        'Column width (tablet portrait)',
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
                                                    }),
                                                  columnWidthMobile: option(
                                                    'CUSTOM',
                                                    {
                                                      value: '12',
                                                      label:
                                                        'Column width (mobile)',
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
                                                  ),
                                                },
                                              },
                                              [
                                                Subview(
                                                  {
                                                    ref: {
                                                      id: '#subView',
                                                    },
                                                    options: {
                                                      ...subviewOptions,
                                                      reconfigure: reconfigure(
                                                        'Reconfigure sub view',
                                                        {
                                                          ref: {
                                                            id: '#reconfigureSubView',
                                                          },
                                                          value: {
                                                            children:
                                                              subViewChildren,
                                                            reconfigureWizardType:
                                                              'ChildrenSelector',
                                                          },
                                                        },
                                                      ),
                                                      addChild: addChild(
                                                        'Add Subview Item',
                                                        {
                                                          ref: {
                                                            id: '#addSubViewChild',
                                                          },
                                                          value: {
                                                            children:
                                                              subViewChildren,
                                                            addChildWizardType:
                                                              'ChildSelector',
                                                          },
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [],
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                Box(
                                  {
                                    options: {
                                      ...boxOptions,
                                      alignment: buttongroup(
                                        'Alignment',
                                        [
                                          ['None', 'none'],
                                          ['Left', 'flex-start'],
                                          ['Center', 'center'],
                                          ['Right', 'flex-end'],
                                          ['Justified', 'space-between'],
                                        ],
                                        {
                                          value: 'space-between',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      backgroundColor: color(
                                        'Background color',
                                        {
                                          value: ThemeColor.LIGHT,
                                        },
                                      ),
                                      backgroundColorAlpha: option('NUMBER', {
                                        label: 'Background color opacity',
                                        value: 20,
                                      }),
                                    },
                                  },
                                  [
                                    Button(
                                      {
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Cancel'],
                                          }),
                                        },
                                        ref: {
                                          id: '#detailCancelButton',
                                        },
                                        style: {
                                          overwrite: {
                                            backgroundColor: {
                                              type: 'STATIC',
                                              value: 'transparent',
                                            },
                                            borderColor: {
                                              type: 'THEME_COLOR',
                                              value: 'primary',
                                            },
                                            borderRadius: ['0.25rem'],
                                            borderStyle: 'solid',
                                            borderWidth: ['0.0625rem'],
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'primary',
                                            },
                                            fontFamily: 'Roboto',
                                            fontSize: '0.875rem',
                                            fontStyle: 'none',
                                            fontWeight: '400',
                                            padding: ['0.625rem', '1.3125rem'],
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                          },
                                        },
                                      },
                                      [],
                                    ),
                                    Button(
                                      {
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Edit'],
                                          }),
                                          icon: icon('Icon', {
                                            value: 'Edit',
                                          }),
                                        },
                                        ref: {
                                          id: '#editButtonFromDetails',
                                        },
                                        style: {
                                          overwrite: {
                                            backgroundColor: {
                                              type: 'THEME_COLOR',
                                              value: 'primary',
                                            },
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'white',
                                            },
                                            fontFamily: 'Roboto',
                                            fontSize: '0.875rem',
                                            fontStyle: 'none',
                                            fontWeight: '400',
                                            padding: ['0.6875rem', '1.375rem'],
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                          },
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                    Tab(
                      {
                        label: 'Update',
                        options: {
                          ...tabOptions,
                          label: variable('Tab label', {
                            value: ['UpdateTab'],
                          }),
                          height: size('Height', {
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                        },
                        ref: { id: '#editTab' },
                      },
                      [
                        Grid(
                          {
                            options: {
                              ...gridOptions,
                              height: size('Height', {
                                value: '100%',
                                configuration: {
                                  as: 'UNIT',
                                },
                              }),
                            },
                          },
                          [
                            Grid(
                              {
                                options: {
                                  ...gridOptions,
                                  direction: option('CUSTOM', {
                                    value: 'column',
                                    label: 'Direction',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        {
                                          name: 'Horizontal',
                                          value: 'row',
                                        },
                                        {
                                          name: 'Vertical',
                                          value: 'column',
                                        },
                                      ],
                                      condition: showIf(
                                        'type',
                                        'EQ',
                                        'container',
                                      ),
                                    },
                                  }),
                                },
                              },
                              [
                                Box(
                                  {
                                    options: {
                                      ...boxOptions,
                                      alignment: buttongroup(
                                        'Alignment',
                                        [
                                          ['None', 'none'],
                                          ['Left', 'flex-start'],
                                          ['Center', 'center'],
                                          ['Right', 'flex-end'],
                                          ['Justified', 'space-between'],
                                        ],
                                        {
                                          value: 'space-between',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      valignment: buttongroup(
                                        'Vertical alignment',
                                        [
                                          ['None', 'none'],
                                          ['Top', 'flex-start'],
                                          ['Center', 'center'],
                                          ['Bottom', 'flex-end'],
                                        ],
                                        {
                                          value: 'center',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      backgroundColor: color(
                                        'Background color',
                                        {
                                          value: ThemeColor.PRIMARY,
                                        },
                                      ),
                                    },
                                  },
                                  [
                                    Text(
                                      {
                                        ref: {
                                          id: '#updateTabTitle',
                                        },
                                        options: {
                                          ...textOptions,
                                          content: variable('Content', {
                                            value: ['Update'],
                                            configuration: {
                                              as: 'MULTILINE',
                                            },
                                            ref: {
                                              id: '#updateTabTitleContent',
                                            },
                                          }),
                                          type: font('Text style', {
                                            value: ['Title5'],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    Button(
                                      {
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: [''],
                                          }),
                                          icon: icon('Icon', {
                                            value: 'Close',
                                          }),
                                          size: option('CUSTOM', {
                                            value: 'medium',
                                            label: 'Icon size',
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
                                              condition: hideIf(
                                                'icon',
                                                'EQ',
                                                'none',
                                              ),
                                            },
                                          }),
                                        },
                                        ref: { id: '#closeEditTabBtn' },
                                        style: {
                                          overwrite: {
                                            backgroundColor: {
                                              type: 'STATIC',
                                              value: 'Transparent',
                                            },
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'white',
                                            },
                                            padding: ['0rem'],
                                          },
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                                Box(
                                  {
                                    options: {
                                      ...boxOptions,
                                      stretch: toggle(
                                        'Stretch (when in flex container)',
                                        {
                                          value: true,
                                        },
                                      ),
                                    },
                                  },
                                  [
                                    component(
                                      'Form',
                                      {
                                        label: 'Update Form',
                                        options: {
                                          ...formOptions,
                                          reconfigure: reconfigure(
                                            'Reconfigure',
                                            {
                                              value: {
                                                children: formChildren,
                                                reconfigureWizardType:
                                                  'ChildrenSelector',
                                              },
                                              ref: {
                                                id: '#updateFormReconfigure',
                                              },
                                            },
                                          ),
                                        },
                                        ref: { id: '#updateForm' },
                                      },
                                      [
                                        FormErrorAlert({
                                          ref: { id: '#editErrorAlert' },
                                        }),
                                      ],
                                    ),
                                  ],
                                ),
                                Box(
                                  {
                                    options: {
                                      ...boxOptions,
                                      alignment: buttongroup(
                                        'Alignment',
                                        [
                                          ['None', 'none'],
                                          ['Left', 'flex-start'],
                                          ['Center', 'center'],
                                          ['Right', 'flex-end'],
                                          ['Justified', 'space-between'],
                                        ],
                                        {
                                          value: 'space-between',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      backgroundColor: color(
                                        'Background color',
                                        {
                                          value: ThemeColor.LIGHT,
                                        },
                                      ),
                                      backgroundColorAlpha: option('NUMBER', {
                                        label: 'Background color opacity',
                                        value: 20,
                                      }),
                                    },
                                  },
                                  [
                                    Button(
                                      {
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Cancel'],
                                          }),
                                          outerSpacing: sizes('Outer space', {
                                            value: [
                                              '0rem',
                                              'S',
                                              '0rem',
                                              '0rem',
                                            ],
                                          }),
                                        },
                                        ref: { id: '#editCancelButton' },
                                        style: {
                                          overwrite: {
                                            backgroundColor: {
                                              type: 'STATIC',
                                              value: 'transparent',
                                            },
                                            borderColor: {
                                              type: 'THEME_COLOR',
                                              value: 'primary',
                                            },
                                            borderRadius: ['0.25rem'],
                                            borderStyle: 'solid',
                                            borderWidth: ['0.0625rem'],
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'primary',
                                            },
                                            fontFamily: 'Roboto',
                                            fontSize: '0.875rem',
                                            fontStyle: 'none',
                                            fontWeight: '400',
                                            padding: ['0.625rem', '1.3125rem'],
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                          },
                                        },
                                      },
                                      [],
                                    ),
                                    SubmitButton(
                                      {
                                        options: {
                                          ...submitButtonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Save'],
                                          }),
                                          icon: icon('Icon', {
                                            value: 'Save',
                                          }),
                                        },
                                        ref: { id: '#editSubmitButton' },
                                        style: {
                                          overwrite: {
                                            backgroundColor: {
                                              type: 'THEME_COLOR',
                                              value: 'primary',
                                            },
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'white',
                                            },
                                            fontFamily: 'Roboto',
                                            fontSize: '0.875rem',
                                            fontStyle: 'none',
                                            fontWeight: '400',
                                            padding: ['0.6875rem', '1.375rem'],
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                          },
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
        DrawerContainer(
          {
            options: {
              ...drawerContainerOptions,
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
            },
          },
          [
            Row(
              {
                options: {
                  ...rowOptions,
                  maxRowWidth: option('CUSTOM', {
                    label: 'Width',
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
                  }),
                  rowHeight: text('Height', {
                    value: '100vh',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                },
              },
              [
                Column(
                  {
                    options: {
                      ...columnOptions,
                      columnHeight: text('Height', {
                        value: '100%',
                        configuration: {
                          as: 'UNIT',
                        },
                      }),
                      innerSpacing: sizes('Inner space', {
                        value: ['0rem', '0rem', '0rem', '0rem'],
                      }),
                    },
                  },
                  [
                    Grid(
                      {
                        options: {
                          ...gridOptions,
                          height: size('Height', {
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                        },
                      },
                      [
                        Grid(
                          {
                            options: {
                              ...gridOptions,
                              direction: option('CUSTOM', {
                                value: 'column',
                                label: 'Direction',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'Horizontal', value: 'row' },
                                    { name: 'Vertical', value: 'column' },
                                  ],
                                  condition: showIf('type', 'EQ', 'container'),
                                },
                              }),
                            },
                          },
                          [
                            Box(
                              {
                                options: {
                                  ...boxOptions,
                                  stretch: toggle(
                                    'Stretch (when in flex container)',
                                    {
                                      value: true,
                                    },
                                  ),
                                  innerSpacing: sizes('Inner space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                  backgroundColor: color('Background color', {
                                    value: ThemeColor.LIGHT,
                                  }),
                                  backgroundColorAlpha: option('NUMBER', {
                                    label: 'Background color opacity',
                                    value: 20,
                                  }),
                                },
                              },
                              [
                                Row(
                                  {
                                    options: {
                                      ...rowOptions,
                                      maxRowWidth: option('CUSTOM', {
                                        label: 'Width',
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
                                      }),
                                      rowHeight: text('Height', {
                                        value: '100%',
                                        configuration: {
                                          as: 'UNIT',
                                        },
                                      }),
                                    },
                                  },
                                  [
                                    Column(
                                      {
                                        options: {
                                          ...columnOptions,
                                          columnWidth: option('CUSTOM', {
                                            label: 'Column width',
                                            value: '12',
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
                                          }),
                                          columnWidthTabletLandscape: option(
                                            'CUSTOM',
                                            {
                                              label:
                                                'Column width (tablet landscape)',
                                              value: '12',
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
                                          ),
                                          columnWidthTabletPortrait: option(
                                            'CUSTOM',
                                            {
                                              value: '12',
                                              label:
                                                'Column width (tablet portrait)',
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
                                          ),
                                          columnWidthMobile: option('CUSTOM', {
                                            value: '12',
                                            label: 'Column width (mobile)',
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
                                          }),
                                          columnHeight: text('Height', {
                                            value: '100%',
                                            configuration: {
                                              as: 'UNIT',
                                            },
                                          }),
                                          outerSpacing: sizes('Outer space', {
                                            value: ['L', 'L', 'L', 'L'],
                                          }),
                                          innerSpacing: sizes('Inner space', {
                                            value: ['L', 'L', 'L', 'L'],
                                          }),
                                        },
                                      },
                                      [
                                        Box(
                                          {
                                            options: {
                                              ...boxOptions,
                                              innerSpacing: sizes(
                                                'Inner space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            Row(
                                              {
                                                options: {
                                                  ...rowOptions,
                                                  maxRowWidth: option(
                                                    'CUSTOM',
                                                    {
                                                      label: 'Width',
                                                      value: 'Full',
                                                      configuration: {
                                                        as: 'BUTTONGROUP',
                                                        dataType: 'string',
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
                                                      },
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                Column(
                                                  {
                                                    options: {
                                                      ...columnOptions,
                                                      innerSpacing: sizes(
                                                        'Inner space',
                                                        {
                                                          value: [
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                            '0rem',
                                                          ],
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    Box(
                                                      {
                                                        options: {
                                                          ...boxOptions,
                                                          alignment:
                                                            buttongroup(
                                                              'Alignment',
                                                              [
                                                                [
                                                                  'None',
                                                                  'none',
                                                                ],
                                                                [
                                                                  'Left',
                                                                  'flex-start',
                                                                ],
                                                                [
                                                                  'Center',
                                                                  'center',
                                                                ],
                                                                [
                                                                  'Right',
                                                                  'flex-end',
                                                                ],
                                                                [
                                                                  'Justified',
                                                                  'space-between',
                                                                ],
                                                              ],
                                                              {
                                                                value:
                                                                  'space-between',
                                                                configuration: {
                                                                  dataType:
                                                                    'string',
                                                                },
                                                              },
                                                            ),
                                                          innerSpacing: sizes(
                                                            'Inner space',
                                                            {
                                                              value: [
                                                                '0rem',
                                                                '0rem',
                                                                '0rem',
                                                                '0rem',
                                                              ],
                                                            },
                                                          ),
                                                        },
                                                      },
                                                      [
                                                        Text(
                                                          {
                                                            options: {
                                                              ...textOptions,
                                                              type: font(
                                                                'Text style',
                                                                {
                                                                  value: [
                                                                    'Title4',
                                                                  ],
                                                                },
                                                              ),
                                                              content: variable(
                                                                'Content',
                                                                {
                                                                  value: [],
                                                                  configuration:
                                                                    {
                                                                      as: 'MULTILINE',
                                                                    },
                                                                  ref: {
                                                                    id: '#pageTitleContent',
                                                                  },
                                                                },
                                                              ),
                                                            },
                                                            ref: {
                                                              id: '#pageTitle',
                                                            },
                                                          },
                                                          [],
                                                        ),
                                                        Box(
                                                          {
                                                            options: {
                                                              ...boxOptions,
                                                              innerSpacing:
                                                                sizes(
                                                                  'Inner space',
                                                                  {
                                                                    value: [
                                                                      'M',
                                                                      '0rem',
                                                                      'M',
                                                                      'M',
                                                                    ],
                                                                  },
                                                                ),
                                                            },
                                                          },
                                                          [
                                                            Button(
                                                              {
                                                                ref: {
                                                                  id: '#filterButtonActive',
                                                                },
                                                                label:
                                                                  'Active filter button',
                                                                style: {
                                                                  overwrite: {
                                                                    backgroundColor:
                                                                      {
                                                                        type: 'STATIC',
                                                                        value:
                                                                          'white',
                                                                      },
                                                                    boxShadow:
                                                                      'none',
                                                                    color: {
                                                                      type: 'THEME_COLOR',
                                                                      value:
                                                                        'primary',
                                                                    },
                                                                    fontFamily:
                                                                      'Roboto',
                                                                    fontSize:
                                                                      '0.875rem',
                                                                    fontStyle:
                                                                      'none',
                                                                    fontWeight:
                                                                      '400',
                                                                    padding: [
                                                                      '0.5rem',
                                                                      '0.625rem',
                                                                    ],
                                                                    textDecoration:
                                                                      'none',
                                                                    textTransform:
                                                                      'none',
                                                                  },
                                                                },
                                                                options: {
                                                                  ...buttonOptions,
                                                                  visible:
                                                                    toggle(
                                                                      'Toggle visibility',
                                                                      {
                                                                        value:
                                                                          false,
                                                                        configuration:
                                                                          {
                                                                            as: 'VISIBILITY',
                                                                          },
                                                                      },
                                                                    ),
                                                                  buttonText:
                                                                    variable(
                                                                      'Button text',
                                                                      {
                                                                        value: [
                                                                          'Filter',
                                                                        ],
                                                                      },
                                                                    ),
                                                                  icon: icon(
                                                                    'Icon',
                                                                    {
                                                                      value:
                                                                        'FilterList',
                                                                    },
                                                                  ),
                                                                  outerSpacing:
                                                                    sizes(
                                                                      'Outer space',
                                                                      {
                                                                        value: [
                                                                          '0rem',
                                                                          'XL',
                                                                          '0rem',
                                                                          '0rem',
                                                                        ],
                                                                      },
                                                                    ),
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                            Button(
                                                              {
                                                                ref: {
                                                                  id: '#filterButton',
                                                                },
                                                                label:
                                                                  'Filter button',
                                                                style: {
                                                                  overwrite: {
                                                                    backgroundColor:
                                                                      {
                                                                        type: 'STATIC',
                                                                        value:
                                                                          'transparent',
                                                                      },
                                                                    boxShadow:
                                                                      'none',
                                                                    color: {
                                                                      type: 'THEME_COLOR',
                                                                      value:
                                                                        'primary',
                                                                    },
                                                                    fontFamily:
                                                                      'Roboto',
                                                                    fontSize:
                                                                      '0.875rem',
                                                                    fontStyle:
                                                                      'none',
                                                                    fontWeight:
                                                                      '400',
                                                                    padding: [
                                                                      '0.5rem',
                                                                      '0.625rem',
                                                                    ],
                                                                    textDecoration:
                                                                      'none',
                                                                    textTransform:
                                                                      'none',
                                                                  },
                                                                },
                                                                options: {
                                                                  ...buttonOptions,
                                                                  buttonText:
                                                                    variable(
                                                                      'Button text',
                                                                      {
                                                                        value: [
                                                                          'Filter',
                                                                        ],
                                                                      },
                                                                    ),
                                                                  icon: icon(
                                                                    'Icon',
                                                                    {
                                                                      value:
                                                                        'FilterList',
                                                                    },
                                                                  ),
                                                                  outerSpacing:
                                                                    sizes(
                                                                      'Outer space',
                                                                      {
                                                                        value: [
                                                                          '0rem',
                                                                          'XL',
                                                                          '0rem',
                                                                          '0rem',
                                                                        ],
                                                                      },
                                                                    ),
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                            Button(
                                                              {
                                                                ref: {
                                                                  id: '#searchButtonActive',
                                                                },
                                                                label:
                                                                  'Active search button',
                                                                style: {
                                                                  overwrite: {
                                                                    backgroundColor:
                                                                      {
                                                                        type: 'STATIC',
                                                                        value:
                                                                          'white',
                                                                      },
                                                                    boxShadow:
                                                                      'none',
                                                                    color: {
                                                                      type: 'THEME_COLOR',
                                                                      value:
                                                                        'primary',
                                                                    },
                                                                    fontFamily:
                                                                      'Roboto',
                                                                    fontSize:
                                                                      '0.875rem',
                                                                    fontStyle:
                                                                      'none',
                                                                    fontWeight:
                                                                      '400',
                                                                    padding: [
                                                                      '0.5rem',
                                                                      '0.625rem',
                                                                    ],
                                                                    textDecoration:
                                                                      'none',
                                                                    textTransform:
                                                                      'none',
                                                                  },
                                                                },
                                                                options: {
                                                                  ...buttonOptions,
                                                                  visible:
                                                                    toggle(
                                                                      'Toggle visibility',
                                                                      {
                                                                        value:
                                                                          false,
                                                                        configuration:
                                                                          {
                                                                            as: 'VISIBILITY',
                                                                          },
                                                                      },
                                                                    ),
                                                                  buttonText:
                                                                    variable(
                                                                      'Button text',
                                                                      {
                                                                        value: [
                                                                          'Search',
                                                                        ],
                                                                      },
                                                                    ),
                                                                  icon: icon(
                                                                    'Icon',
                                                                    {
                                                                      value:
                                                                        'Search',
                                                                    },
                                                                  ),
                                                                  outerSpacing:
                                                                    sizes(
                                                                      'Outer space',
                                                                      {
                                                                        value: [
                                                                          '0rem',
                                                                          'XL',
                                                                          '0rem',
                                                                          '0rem',
                                                                        ],
                                                                      },
                                                                    ),
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                            Button(
                                                              {
                                                                ref: {
                                                                  id: '#searchButton',
                                                                },
                                                                label:
                                                                  'Search button',
                                                                style: {
                                                                  overwrite: {
                                                                    backgroundColor:
                                                                      {
                                                                        type: 'STATIC',
                                                                        value:
                                                                          'transparent',
                                                                      },
                                                                    boxShadow:
                                                                      'none',
                                                                    color: {
                                                                      type: 'THEME_COLOR',
                                                                      value:
                                                                        'primary',
                                                                    },
                                                                    fontFamily:
                                                                      'Roboto',
                                                                    fontSize:
                                                                      '0.875rem',
                                                                    fontStyle:
                                                                      'none',
                                                                    fontWeight:
                                                                      '400',
                                                                    padding: [
                                                                      '0.5rem',
                                                                      '0.625rem',
                                                                    ],
                                                                    textDecoration:
                                                                      'none',
                                                                    textTransform:
                                                                      'none',
                                                                  },
                                                                },
                                                                options: {
                                                                  ...buttonOptions,
                                                                  buttonText:
                                                                    variable(
                                                                      'Button text',
                                                                      {
                                                                        value: [
                                                                          'Search',
                                                                        ],
                                                                      },
                                                                    ),
                                                                  icon: icon(
                                                                    'Icon',
                                                                    {
                                                                      value:
                                                                        'Search',
                                                                    },
                                                                  ),
                                                                  outerSpacing:
                                                                    sizes(
                                                                      'Outer space',
                                                                      {
                                                                        value: [
                                                                          '0rem',
                                                                          'XL',
                                                                          '0rem',
                                                                          '0rem',
                                                                        ],
                                                                      },
                                                                    ),
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                            Button(
                                                              {
                                                                options: {
                                                                  ...buttonOptions,
                                                                  buttonText:
                                                                    variable(
                                                                      'Button text',
                                                                      {
                                                                        value: [
                                                                          'New',
                                                                        ],
                                                                      },
                                                                    ),
                                                                  icon: icon(
                                                                    'Icon',
                                                                    {
                                                                      value:
                                                                        'Add',
                                                                    },
                                                                  ),
                                                                },
                                                                ref: {
                                                                  id: '#createButton',
                                                                },
                                                                style: {
                                                                  overwrite: {
                                                                    backgroundColor:
                                                                      {
                                                                        type: 'THEME_COLOR',
                                                                        value:
                                                                          'primary',
                                                                      },
                                                                    boxShadow:
                                                                      'none',
                                                                    color: {
                                                                      type: 'THEME_COLOR',
                                                                      value:
                                                                        'white',
                                                                    },
                                                                    fontFamily:
                                                                      'Roboto',
                                                                    fontSize:
                                                                      '0.875rem',
                                                                    fontStyle:
                                                                      'none',
                                                                    fontWeight:
                                                                      '400',
                                                                    padding: [
                                                                      '0.6875rem',
                                                                      '1.375rem',
                                                                    ],
                                                                    textDecoration:
                                                                      'none',
                                                                    textTransform:
                                                                      'none',
                                                                  },
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                    Box(
                                                      {
                                                        options: {
                                                          ...boxOptions,
                                                          innerSpacing: sizes(
                                                            'Inner space',
                                                            {
                                                              value: [
                                                                '0rem',
                                                                '0rem',
                                                                'M',
                                                                '0rem',
                                                              ],
                                                            },
                                                          ),
                                                        },
                                                      },
                                                      [
                                                        Column(
                                                          {
                                                            label:
                                                              'Search Column',
                                                            ref: {
                                                              id: '#searchColumn',
                                                            },
                                                            options: {
                                                              ...columnOptions,
                                                              visible: toggle(
                                                                'Toggle visibility',
                                                                {
                                                                  value: false,
                                                                  configuration:
                                                                    {
                                                                      as: 'VISIBILITY',
                                                                    },
                                                                },
                                                              ),
                                                              innerSpacing:
                                                                sizes(
                                                                  'Inner space',
                                                                  {
                                                                    value: [
                                                                      '0rem',
                                                                      '0rem',
                                                                      '0rem',
                                                                      '0rem',
                                                                    ],
                                                                  },
                                                                ),
                                                            },
                                                          },
                                                          [
                                                            Box(
                                                              {
                                                                options: {
                                                                  ...boxOptions,
                                                                  innerSpacing:
                                                                    sizes(
                                                                      'Inner space',
                                                                      {
                                                                        value: [
                                                                          '0rem',
                                                                          '0rem',
                                                                          '0rem',
                                                                          '0rem',
                                                                        ],
                                                                      },
                                                                    ),
                                                                  stretch:
                                                                    toggle(
                                                                      'Stretch (when in flex container)',
                                                                      {
                                                                        value:
                                                                          true,
                                                                      },
                                                                    ),
                                                                  position:
                                                                    buttongroup(
                                                                      'Position',
                                                                      [
                                                                        [
                                                                          'Static',
                                                                          'static',
                                                                        ],
                                                                        [
                                                                          'Relative',
                                                                          'relative',
                                                                        ],
                                                                        [
                                                                          'Absolute',
                                                                          'absolute',
                                                                        ],
                                                                        [
                                                                          'Fixed',
                                                                          'fixed',
                                                                        ],
                                                                        [
                                                                          'Sticky',
                                                                          'sticky',
                                                                        ],
                                                                      ],
                                                                      {
                                                                        value:
                                                                          'relative',
                                                                        configuration:
                                                                          {
                                                                            dataType:
                                                                              'string',
                                                                          },
                                                                      },
                                                                    ),
                                                                },
                                                              },
                                                              [
                                                                TextInput(
                                                                  {
                                                                    label:
                                                                      'Text field Beta',
                                                                    inputLabel:
                                                                      'Searchfield',
                                                                    type: 'text',
                                                                    ref: {
                                                                      id: '#searchField',
                                                                    },
                                                                    options: {
                                                                      ...textInputOptions,
                                                                      autoComplete:
                                                                        toggle(
                                                                          'Autocomplete',
                                                                          {
                                                                            value:
                                                                              true,
                                                                          },
                                                                        ),
                                                                      placeholder:
                                                                        variable(
                                                                          'Placeholder',
                                                                          {
                                                                            value:
                                                                              [
                                                                                'Search',
                                                                              ],
                                                                          },
                                                                        ),
                                                                      fullWidth:
                                                                        toggle(
                                                                          'Full width',
                                                                          {
                                                                            value:
                                                                              true,
                                                                          },
                                                                        ),
                                                                      styles:
                                                                        toggle(
                                                                          'Styles',
                                                                          {
                                                                            value:
                                                                              true,
                                                                          },
                                                                        ),
                                                                      hideLabel:
                                                                        toggle(
                                                                          'Hide label',
                                                                          {
                                                                            value:
                                                                              true,
                                                                            configuration:
                                                                              {
                                                                                condition:
                                                                                  showIfTrue(
                                                                                    'styles',
                                                                                  ),
                                                                              },
                                                                          },
                                                                        ),
                                                                      margin:
                                                                        buttongroup(
                                                                          'Margin',
                                                                          [
                                                                            [
                                                                              'None',
                                                                              'none',
                                                                            ],
                                                                            [
                                                                              'Dense',
                                                                              'dense',
                                                                            ],
                                                                            [
                                                                              'Normal',
                                                                              'normal',
                                                                            ],
                                                                          ],
                                                                          {
                                                                            value:
                                                                              'none',
                                                                          },
                                                                        ),
                                                                    },
                                                                  },
                                                                  [],
                                                                ),
                                                                Box(
                                                                  {
                                                                    options: {
                                                                      ...boxOptions,
                                                                      innerSpacing:
                                                                        sizes(
                                                                          'Inner space',
                                                                          {
                                                                            value:
                                                                              [
                                                                                '0rem',
                                                                                '0rem',
                                                                                '0rem',
                                                                                '0rem',
                                                                              ],
                                                                          },
                                                                        ),
                                                                      position:
                                                                        buttongroup(
                                                                          'Position',
                                                                          [
                                                                            [
                                                                              'Static',
                                                                              'static',
                                                                            ],
                                                                            [
                                                                              'Relative',
                                                                              'relative',
                                                                            ],
                                                                            [
                                                                              'Absolute',
                                                                              'absolute',
                                                                            ],
                                                                            [
                                                                              'Fixed',
                                                                              'fixed',
                                                                            ],
                                                                            [
                                                                              'Sticky',
                                                                              'sticky',
                                                                            ],
                                                                          ],
                                                                          {
                                                                            value:
                                                                              'absolute',
                                                                            configuration:
                                                                              {
                                                                                dataType:
                                                                                  'string',
                                                                              },
                                                                          },
                                                                        ),
                                                                      top: size(
                                                                        'Top position',
                                                                        {
                                                                          value:
                                                                            '11px',
                                                                          configuration:
                                                                            {
                                                                              as: 'UNIT',
                                                                            },
                                                                        },
                                                                      ),
                                                                      right:
                                                                        size(
                                                                          'Right position',
                                                                          {
                                                                            value:
                                                                              '11px',
                                                                            configuration:
                                                                              {
                                                                                as: 'UNIT',
                                                                              },
                                                                          },
                                                                        ),
                                                                    },
                                                                  },
                                                                  [
                                                                    Button(
                                                                      {
                                                                        ref: {
                                                                          id: '#clearButton',
                                                                        },
                                                                        style: {
                                                                          overwrite:
                                                                            {
                                                                              borderRadius:
                                                                                [
                                                                                  '3.125rem',
                                                                                ],
                                                                              boxShadow:
                                                                                'none',
                                                                              color:
                                                                                {
                                                                                  type: 'THEME_COLOR',
                                                                                  value:
                                                                                    'white',
                                                                                },
                                                                              fontFamily:
                                                                                'Roboto',
                                                                              fontSize:
                                                                                '0.875rem',
                                                                              fontStyle:
                                                                                'none',
                                                                              fontWeight:
                                                                                '400',
                                                                              padding:
                                                                                [
                                                                                  '0.375rem',
                                                                                  '0.375rem',
                                                                                ],
                                                                              textDecoration:
                                                                                'none',
                                                                              textTransform:
                                                                                'none',
                                                                            },
                                                                        },
                                                                        options:
                                                                          {
                                                                            ...buttonOptions,
                                                                            visible:
                                                                              toggle(
                                                                                'Toggle visibility',
                                                                                {
                                                                                  value:
                                                                                    false,
                                                                                  configuration:
                                                                                    {
                                                                                      as: 'VISIBILITY',
                                                                                    },
                                                                                },
                                                                              ),
                                                                            buttonText:
                                                                              variable(
                                                                                'Button text',
                                                                                {
                                                                                  value:
                                                                                    [],
                                                                                },
                                                                              ),
                                                                            outerSpacing:
                                                                              sizes(
                                                                                'Outer space',
                                                                                {
                                                                                  value:
                                                                                    [
                                                                                      '0rem',
                                                                                      '0rem',
                                                                                      '0rem',
                                                                                      '0rem',
                                                                                    ],
                                                                                },
                                                                              ),
                                                                            icon: icon(
                                                                              'Icon',
                                                                              {
                                                                                value:
                                                                                  'Close',
                                                                              },
                                                                            ),
                                                                          },
                                                                      },
                                                                      [],
                                                                    ),
                                                                  ],
                                                                ),
                                                              ],
                                                            ),
                                                          ],
                                                        ),
                                                        Column(
                                                          {
                                                            label:
                                                              'Filter Column',
                                                            ref: {
                                                              id: '#filterColumn',
                                                            },
                                                            options: {
                                                              ...columnOptions,
                                                              visible: toggle(
                                                                'Toggle visibility',
                                                                {
                                                                  value: false,
                                                                  configuration:
                                                                    {
                                                                      as: 'VISIBILITY',
                                                                    },
                                                                },
                                                              ),
                                                              innerSpacing:
                                                                sizes(
                                                                  'Inner space',
                                                                  {
                                                                    value: [
                                                                      '0rem',
                                                                      '0rem',
                                                                      '0rem',
                                                                      '0rem',
                                                                    ],
                                                                  },
                                                                ),
                                                            },
                                                          },
                                                          [
                                                            Box(
                                                              {
                                                                options: {
                                                                  ...boxOptions,
                                                                  innerSpacing:
                                                                    sizes(
                                                                      'Inner space',
                                                                      {
                                                                        value: [
                                                                          '0rem',
                                                                          '0rem',
                                                                          '0rem',
                                                                          '0rem',
                                                                        ],
                                                                      },
                                                                    ),
                                                                  stretch:
                                                                    toggle(
                                                                      'Stretch (when in flex container)',
                                                                      {
                                                                        value:
                                                                          true,
                                                                      },
                                                                    ),
                                                                  position:
                                                                    buttongroup(
                                                                      'Position',
                                                                      [
                                                                        [
                                                                          'Static',
                                                                          'static',
                                                                        ],
                                                                        [
                                                                          'Relative',
                                                                          'relative',
                                                                        ],
                                                                        [
                                                                          'Absolute',
                                                                          'absolute',
                                                                        ],
                                                                        [
                                                                          'Fixed',
                                                                          'fixed',
                                                                        ],
                                                                        [
                                                                          'Sticky',
                                                                          'sticky',
                                                                        ],
                                                                      ],
                                                                      {
                                                                        value:
                                                                          'relative',
                                                                        configuration:
                                                                          {
                                                                            dataType:
                                                                              'string',
                                                                          },
                                                                      },
                                                                    ),
                                                                },
                                                              },
                                                              [
                                                                FilterComponent(
                                                                  {
                                                                    ref: {
                                                                      id: '#filterComp',
                                                                    },
                                                                    options: {
                                                                      ...filterComponentOptions,
                                                                      backgroundColor:
                                                                        color(
                                                                          'Background color',
                                                                          {
                                                                            value:
                                                                              ThemeColor.WHITE,
                                                                          },
                                                                        ),
                                                                    },
                                                                  },
                                                                  [],
                                                                ),
                                                                Box(
                                                                  {
                                                                    options: {
                                                                      ...boxOptions,
                                                                      alignment:
                                                                        buttongroup(
                                                                          'Alignment',
                                                                          [
                                                                            [
                                                                              'None',
                                                                              'none',
                                                                            ],
                                                                            [
                                                                              'Left',
                                                                              'flex-start',
                                                                            ],
                                                                            [
                                                                              'Center',
                                                                              'center',
                                                                            ],
                                                                            [
                                                                              'Right',
                                                                              'flex-end',
                                                                            ],
                                                                            [
                                                                              'Justified',
                                                                              'space-between',
                                                                            ],
                                                                          ],
                                                                          {
                                                                            value:
                                                                              'space-between',
                                                                            configuration:
                                                                              {
                                                                                dataType:
                                                                                  'string',
                                                                              },
                                                                          },
                                                                        ),
                                                                      innerSpacing:
                                                                        sizes(
                                                                          'Inner space',
                                                                          {
                                                                            value:
                                                                              [
                                                                                '0rem',
                                                                                '0rem',
                                                                                '0rem',
                                                                                '0rem',
                                                                              ],
                                                                          },
                                                                        ),
                                                                    },
                                                                  },
                                                                  [
                                                                    Button(
                                                                      {
                                                                        ref: {
                                                                          id: '#addFilterButton',
                                                                        },
                                                                        style: {
                                                                          name: 'Outline',
                                                                          overwrite:
                                                                            {
                                                                              textTransform:
                                                                                'none',
                                                                            },
                                                                        },
                                                                        options:
                                                                          {
                                                                            ...buttonOptions,
                                                                            buttonText:
                                                                              variable(
                                                                                'Button text',
                                                                                {
                                                                                  value:
                                                                                    [
                                                                                      'Add filter group',
                                                                                    ],
                                                                                },
                                                                              ),
                                                                          },
                                                                      },
                                                                      [],
                                                                    ),
                                                                    Box(
                                                                      {
                                                                        options:
                                                                          {
                                                                            ...boxOptions,
                                                                            innerSpacing:
                                                                              sizes(
                                                                                'Inner space',
                                                                                {
                                                                                  value:
                                                                                    [
                                                                                      '0rem',
                                                                                      '0rem',
                                                                                      '0rem',
                                                                                      '0rem',
                                                                                    ],
                                                                                },
                                                                              ),
                                                                          },
                                                                      },
                                                                      [
                                                                        Button(
                                                                          {
                                                                            ref: {
                                                                              id: '#clearFilterButton',
                                                                            },
                                                                            style:
                                                                              {
                                                                                name: 'Outline',
                                                                                overwrite:
                                                                                  {
                                                                                    textTransform:
                                                                                      'none',
                                                                                  },
                                                                              },

                                                                            options:
                                                                              {
                                                                                ...buttonOptions,
                                                                                buttonText:
                                                                                  variable(
                                                                                    'Button text',
                                                                                    {
                                                                                      value:
                                                                                        [
                                                                                          'Clear filter',
                                                                                        ],
                                                                                    },
                                                                                  ),
                                                                                outerSpacing:
                                                                                  sizes(
                                                                                    'Outer space',
                                                                                    {
                                                                                      value:
                                                                                        [
                                                                                          '0rem',
                                                                                          'M',
                                                                                          '0rem',
                                                                                          '0rem',
                                                                                        ],
                                                                                    },
                                                                                  ),
                                                                              },
                                                                          },
                                                                          [],
                                                                        ),
                                                                        Button(
                                                                          {
                                                                            ref: {
                                                                              id: '#applyButton',
                                                                            },
                                                                            style:
                                                                              {
                                                                                overwrite:
                                                                                  {
                                                                                    backgroundColor:
                                                                                      {
                                                                                        type: 'THEME_COLOR',
                                                                                        value:
                                                                                          'primary',
                                                                                      },
                                                                                    boxShadow:
                                                                                      'none',
                                                                                    color:
                                                                                      {
                                                                                        type: 'THEME_COLOR',
                                                                                        value:
                                                                                          'white',
                                                                                      },
                                                                                    fontFamily:
                                                                                      'Roboto',
                                                                                    fontSize:
                                                                                      '0.875rem',
                                                                                    fontStyle:
                                                                                      'none',
                                                                                    fontWeight:
                                                                                      '400',
                                                                                    padding:
                                                                                      [
                                                                                        '0.6875rem',
                                                                                        '1.375rem',
                                                                                      ],
                                                                                    textDecoration:
                                                                                      'none',
                                                                                    textTransform:
                                                                                      'none',
                                                                                  },
                                                                              },
                                                                            options:
                                                                              {
                                                                                ...buttonOptions,
                                                                                buttonText:
                                                                                  variable(
                                                                                    'Button text',
                                                                                    {
                                                                                      value:
                                                                                        [
                                                                                          'Apply filter',
                                                                                        ],
                                                                                    },
                                                                                  ),
                                                                              },
                                                                          },
                                                                          [],
                                                                        ),
                                                                      ],
                                                                    ),
                                                                  ],
                                                                ),
                                                              ],
                                                            ),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                    Dialog(
                                                      {
                                                        options: {
                                                          ...dialogOptions,
                                                          isVisible: toggle(
                                                            'Visible in builder',
                                                            {
                                                              value: false,
                                                              configuration: {
                                                                as: 'VISIBILITY',
                                                              },
                                                            },
                                                          ),
                                                          invisible: toggle(
                                                            'Invisible',
                                                            {
                                                              value: true,
                                                            },
                                                          ),
                                                        },
                                                        ref: {
                                                          id: '#deleteDialog',
                                                        },
                                                      },
                                                      [
                                                        Paper({}, [
                                                          Row({}, [
                                                            Column({}, [
                                                              Box(
                                                                {
                                                                  options: {
                                                                    ...boxOptions,
                                                                    alignment:
                                                                      buttongroup(
                                                                        'Alignment',
                                                                        [
                                                                          [
                                                                            'None',
                                                                            'none',
                                                                          ],
                                                                          [
                                                                            'Left',
                                                                            'flex-start',
                                                                          ],
                                                                          [
                                                                            'Center',
                                                                            'center',
                                                                          ],
                                                                          [
                                                                            'Right',
                                                                            'flex-end',
                                                                          ],
                                                                          [
                                                                            'Justified',
                                                                            'space-between',
                                                                          ],
                                                                        ],
                                                                        {
                                                                          value:
                                                                            'space-between',
                                                                          configuration:
                                                                            {
                                                                              dataType:
                                                                                'string',
                                                                            },
                                                                        },
                                                                      ),
                                                                  },
                                                                },
                                                                [
                                                                  Text(
                                                                    {
                                                                      options: {
                                                                        ...textOptions,
                                                                        content:
                                                                          variable(
                                                                            'Content',
                                                                            {
                                                                              value:
                                                                                [
                                                                                  'Delete record',
                                                                                ],
                                                                              configuration:
                                                                                {
                                                                                  as: 'MULTILINE',
                                                                                },
                                                                            },
                                                                          ),
                                                                        type: font(
                                                                          'Text style',
                                                                          {
                                                                            value:
                                                                              [
                                                                                'Title4',
                                                                              ],
                                                                          },
                                                                        ),
                                                                      },
                                                                    },
                                                                    [],
                                                                  ),
                                                                  Button({
                                                                    style: {
                                                                      overwrite:
                                                                        {
                                                                          backgroundColor:
                                                                            {
                                                                              type: 'STATIC',
                                                                              value:
                                                                                'transparent',
                                                                            },
                                                                          boxShadow:
                                                                            'none',
                                                                          color:
                                                                            {
                                                                              type: 'THEME_COLOR',
                                                                              value:
                                                                                'light',
                                                                            },
                                                                          padding:
                                                                            [
                                                                              '0rem',
                                                                              '0.6875rem',
                                                                              '0.6875rem',
                                                                              '0.6875rem',
                                                                            ],
                                                                        },
                                                                    },
                                                                    options: {
                                                                      ...buttonOptions,
                                                                      icon: icon(
                                                                        'Icon',
                                                                        {
                                                                          value:
                                                                            'Close',
                                                                        },
                                                                      ),
                                                                      buttonText:
                                                                        variable(
                                                                          'Button text',
                                                                          {
                                                                            value:
                                                                              [
                                                                                '',
                                                                              ],
                                                                          },
                                                                        ),
                                                                      outerSpacing:
                                                                        sizes(
                                                                          'Outer space',
                                                                          {
                                                                            value:
                                                                              [
                                                                                '0rem',
                                                                                'S',
                                                                                '0rem',
                                                                                '0rem',
                                                                              ],
                                                                          },
                                                                        ),
                                                                      size: option(
                                                                        'CUSTOM',
                                                                        {
                                                                          value:
                                                                            'medium',
                                                                          label:
                                                                            'Icon size',
                                                                          configuration:
                                                                            {
                                                                              as: 'BUTTONGROUP',
                                                                              dataType:
                                                                                'string',
                                                                              allowedInput:
                                                                                [
                                                                                  {
                                                                                    name: 'Small',
                                                                                    value:
                                                                                      'small',
                                                                                  },
                                                                                  {
                                                                                    name: 'Medium',
                                                                                    value:
                                                                                      'medium',
                                                                                  },
                                                                                  {
                                                                                    name: 'Large',
                                                                                    value:
                                                                                      'large',
                                                                                  },
                                                                                ],
                                                                              condition:
                                                                                hideIf(
                                                                                  'icon',
                                                                                  'EQ',
                                                                                  'none',
                                                                                ),
                                                                            },
                                                                        },
                                                                      ),
                                                                    },
                                                                    ref: {
                                                                      id: '#closeBtn',
                                                                    },
                                                                  }),
                                                                ],
                                                              ),
                                                              Row({}, [
                                                                Column({}, [
                                                                  Text(
                                                                    {
                                                                      options: {
                                                                        ...textOptions,
                                                                        content:
                                                                          variable(
                                                                            'Content',
                                                                            {
                                                                              value:
                                                                                [
                                                                                  "Are you sure you want to delete this record? You can't undo this action.",
                                                                                ],
                                                                              configuration:
                                                                                {
                                                                                  as: 'MULTILINE',
                                                                                },
                                                                            },
                                                                          ),
                                                                        type: font(
                                                                          'Text style',
                                                                          {
                                                                            value:
                                                                              [
                                                                                'Body1',
                                                                              ],
                                                                          },
                                                                        ),
                                                                      },
                                                                    },
                                                                    [],
                                                                  ),
                                                                ]),
                                                              ]),
                                                              Box(
                                                                {
                                                                  options: {
                                                                    ...boxOptions,
                                                                    alignment:
                                                                      buttongroup(
                                                                        'Alignment',
                                                                        [
                                                                          [
                                                                            'None',
                                                                            'none',
                                                                          ],
                                                                          [
                                                                            'Left',
                                                                            'flex-start',
                                                                          ],
                                                                          [
                                                                            'Center',
                                                                            'center',
                                                                          ],
                                                                          [
                                                                            'Right',
                                                                            'flex-end',
                                                                          ],
                                                                          [
                                                                            'Justified',
                                                                            'space-between',
                                                                          ],
                                                                        ],
                                                                        {
                                                                          value:
                                                                            'flex-end',
                                                                          configuration:
                                                                            {
                                                                              dataType:
                                                                                'string',
                                                                            },
                                                                        },
                                                                      ),
                                                                  },
                                                                },
                                                                [
                                                                  Button(
                                                                    {
                                                                      ref: {
                                                                        id: '#cancelButton',
                                                                      },
                                                                      options: {
                                                                        ...buttonOptions,
                                                                        buttonText:
                                                                          variable(
                                                                            'Button text',
                                                                            {
                                                                              value:
                                                                                [
                                                                                  'Cancel',
                                                                                ],
                                                                            },
                                                                          ),
                                                                        outerSpacing:
                                                                          sizes(
                                                                            'Outer space',
                                                                            {
                                                                              value:
                                                                                [
                                                                                  '0rem',
                                                                                  'M',
                                                                                  '0rem',
                                                                                  '0rem',
                                                                                ],
                                                                            },
                                                                          ),
                                                                      },
                                                                      style: {
                                                                        overwrite:
                                                                          {
                                                                            backgroundColor:
                                                                              {
                                                                                type: 'STATIC',
                                                                                value:
                                                                                  'transparent',
                                                                              },
                                                                            borderColor:
                                                                              {
                                                                                type: 'THEME_COLOR',
                                                                                value:
                                                                                  'primary',
                                                                              },
                                                                            borderRadius:
                                                                              [
                                                                                '0.25rem',
                                                                              ],
                                                                            borderStyle:
                                                                              'solid',
                                                                            borderWidth:
                                                                              [
                                                                                '0.0625rem',
                                                                              ],
                                                                            boxShadow:
                                                                              'none',
                                                                            color:
                                                                              {
                                                                                type: 'THEME_COLOR',
                                                                                value:
                                                                                  'primary',
                                                                              },
                                                                            fontFamily:
                                                                              'Roboto',
                                                                            fontSize:
                                                                              '0.875rem',
                                                                            fontStyle:
                                                                              'none',
                                                                            fontWeight:
                                                                              '400',
                                                                            padding:
                                                                              [
                                                                                '0.625rem',
                                                                                '1.3125rem',
                                                                              ],
                                                                            textDecoration:
                                                                              'none',
                                                                            textTransform:
                                                                              'none',
                                                                          },
                                                                      },
                                                                    },
                                                                    [],
                                                                  ),
                                                                  component(
                                                                    'Form',
                                                                    {
                                                                      label:
                                                                        'Delete Form',
                                                                      options:
                                                                        formOptions,
                                                                      ref: {
                                                                        id: '#deleteForm',
                                                                      },
                                                                    },
                                                                    [],
                                                                  ),
                                                                ],
                                                              ),
                                                            ]),
                                                          ]),
                                                        ]),
                                                      ],
                                                    ),
                                                    DataTable(
                                                      {
                                                        ref: {
                                                          id: '#dataTable',
                                                        },
                                                        options: {
                                                          ...dataTableOptions,
                                                          pagination: option(
                                                            'CUSTOM',
                                                            {
                                                              label:
                                                                'Pagination',
                                                              value:
                                                                'whenNeeded',
                                                              configuration: {
                                                                as: 'BUTTONGROUP',
                                                                dataType:
                                                                  'string',
                                                                dependsOn:
                                                                  'model',
                                                                allowedInput: [
                                                                  {
                                                                    name: 'Always',
                                                                    value:
                                                                      'always',
                                                                  },
                                                                  {
                                                                    name: 'When needed',
                                                                    value:
                                                                      'whenNeeded',
                                                                  },
                                                                  {
                                                                    name: 'Never',
                                                                    value:
                                                                      'never',
                                                                  },
                                                                ],
                                                              },
                                                            },
                                                          ),
                                                          take: option(
                                                            'CUSTOM',
                                                            {
                                                              value: '10',
                                                              label:
                                                                'Rows per page',
                                                              configuration: {
                                                                as: 'DROPDOWN',
                                                                dataType:
                                                                  'string',
                                                                dependsOn:
                                                                  'model',
                                                                allowedInput: [
                                                                  {
                                                                    name: '5',
                                                                    value: '5',
                                                                  },
                                                                  {
                                                                    name: '10',
                                                                    value: '10',
                                                                  },
                                                                  {
                                                                    name: '25',
                                                                    value: '25',
                                                                  },
                                                                  {
                                                                    name: '50',
                                                                    value: '50',
                                                                  },
                                                                  {
                                                                    name: '100',
                                                                    value:
                                                                      '100',
                                                                  },
                                                                ],
                                                                condition:
                                                                  hideIf(
                                                                    'autoLoadOnScroll',
                                                                    'EQ',
                                                                    true,
                                                                  ),
                                                              },
                                                            },
                                                          ),
                                                          reconfigure:
                                                            reconfigure(
                                                              'Reconfigure',
                                                              {
                                                                ref: {
                                                                  id: '#reconfigure',
                                                                },
                                                                value: {
                                                                  children,
                                                                  reconfigureWizardType:
                                                                    'ChildrenSelector',
                                                                },
                                                              },
                                                            ),
                                                          addChild: addChild(
                                                            'Add Column',
                                                            {
                                                              ref: {
                                                                id: '#addChild',
                                                              },
                                                              value: {
                                                                children,
                                                                addChildWizardType:
                                                                  'ChildSelector',
                                                              },
                                                            },
                                                          ),
                                                          background: color(
                                                            'Background',
                                                            {
                                                              value:
                                                                ThemeColor.WHITE,
                                                            },
                                                          ),
                                                          variant: option(
                                                            'CUSTOM',
                                                            {
                                                              label: 'Variant',
                                                              value: 'outlined',
                                                              configuration: {
                                                                as: 'BUTTONGROUP',
                                                                dataType:
                                                                  'string',
                                                                allowedInput: [
                                                                  {
                                                                    name: 'Flat',
                                                                    value:
                                                                      'flat',
                                                                  },
                                                                  {
                                                                    name: 'Elevation',
                                                                    value:
                                                                      'elevation',
                                                                  },
                                                                  {
                                                                    name: 'Outlined',
                                                                    value:
                                                                      'outlined',
                                                                  },
                                                                ],
                                                              },
                                                            },
                                                          ),
                                                        },
                                                      },
                                                      [],
                                                    ),
                                                  ],
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                            Box(
                              {
                                options: {
                                  ...boxOptions,
                                  width: size('Width', {
                                    value: '100%',
                                    configuration: {
                                      as: 'UNIT',
                                    },
                                  }),
                                  innerSpacing: sizes('Inner space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                  backgroundColor: color('Background color', {
                                    value: ThemeColor.LIGHT,
                                  }),
                                  backgroundColorAlpha: option('NUMBER', {
                                    label: 'Background color opacity',
                                    value: 20,
                                  }),
                                },
                                ref: { id: '#footer' },
                              },
                              [],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ],
    ),
  ],
);

const prefabStructure = [
  wrapper(
    {
      label: 'Overview + Record view',
      optionCategories: [
        {
          label: 'Page view',
          expanded: true,
          members: ['visibility', 'shownTab', 'drawerWidth'],
        },
        {
          label: 'Table',
          expanded: true,
          members: ['reconfigure', 'addChild'],
          condition: {
            type: 'SHOW',
            option: 'visibility',
            comparator: 'EQ',
            value: false,
          },
        },
        {
          label: 'Page title',
          expanded: true,
          members: ['pageTitle'],
          condition: {
            type: 'SHOW',
            option: 'visibility',
            comparator: 'EQ',
            value: false,
          },
        },
        {
          label: 'Action',
          expanded: true,
          members: ['deleteFormAction'],
          condition: {
            type: 'SHOW',
            option: 'visibility',
            comparator: 'EQ',
            value: false,
          },
        },
        {
          label: 'Tab',
          expanded: true,
          members: [
            'detailsTabTitle',
            'updateTabTitle',
            'createTabTitle',
            'reconfigureDetailViewChild',
            'addDetailChild',
            'reconfigureSubView',
            'addSubViewChild',
            'reconfigureCreateForm',
            'reconfigureUpdateForm',
          ],
          condition: {
            type: 'SHOW',
            option: 'visibility',
            comparator: 'EQ',
            value: true,
          },
        },
        {
          label: 'Action',
          expanded: true,
          members: ['createFormAction', 'updateFormAction'],
          condition: {
            type: 'SHOW',
            option: 'visibility',
            comparator: 'EQ',
            value: true,
          },
        },
      ],
      options: {
        visibility: linked({
          label: 'Page view',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'boolean',
            allowedInput: [
              { name: 'Overview', value: false },
              { name: 'Record view', value: true },
            ],
          },
          value: {
            ref: {
              componentId: '#contentContainer',
              optionId: '#contentContainerVisibility',
            },
          },
        }),
        reconfigure: linked({
          label: 'Reconfigure data table',
          value: {
            ref: {
              componentId: '#dataTable',
              optionId: '#reconfigure',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'visibility',
              comparator: 'EQ',
              value: false,
            },
          },
        }),

        addChild: linked({
          label: 'Add data table column',
          value: {
            ref: {
              componentId: '#dataTable',
              optionId: '#addChild',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'visibility',
              comparator: 'EQ',
              value: false,
            },
          },
        }),

        pageTitle: linked({
          label: 'Page title',
          value: {
            ref: {
              componentId: '#pageTitle',
              optionId: '#pageTitleContent',
            },
          },
        }),
        shownTab: linked({
          label: 'Show design tab',
          value: {
            ref: {
              componentId: '#drawerTabs',
              optionId: '#drawerTabsSelectedDesignTabIndex',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'visibility',
              comparator: 'EQ',
              value: true,
            },
          },
        }),
        deleteFormAction: linked({
          label: 'Delete action',
          value: {
            ref: {
              componentId: '#deleteForm',
              optionId: '#deleteFormAction',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'visibility',
              comparator: 'EQ',
              value: false,
            },
          },
        }),
        drawerWidth: linked({
          label: 'Sidebar width',
          value: {
            ref: {
              componentId: '#contentContainer',
              optionId: '#contentContainerDrawerWidth',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'visibility',
              comparator: 'EQ',
              value: true,
            },
          },
        }),
        createTabTitle: linked({
          label: 'Create tab title',
          value: {
            ref: {
              componentId: '#createTabTitle',
              optionId: '#createTabTitleContent',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'shownTab',
              comparator: 'EQ',
              value: 1,
            },
          },
        }),
        reconfigureCreateForm: linked({
          label: 'Reconfigure create form',
          value: {
            ref: {
              componentId: '#createForm',
              optionId: '#createFormReconfigure',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'shownTab',
              comparator: 'EQ',
              value: 1,
            },
          },
        }),
        createFormAction: linked({
          label: 'Create action',
          value: {
            ref: {
              componentId: '#createForm',
              optionId: '#createFormAction',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'shownTab',
              comparator: 'EQ',
              value: 1,
            },
          },
        }),
        reconfigureDetailViewChild: linked({
          label: 'Reconfigure detail view',
          value: {
            ref: {
              componentId: '#detailColumn',
              optionId: '#reconfigureDetail',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'shownTab',
              comparator: 'EQ',
              value: 2,
            },
          },
        }),
        addDetailChild: linked({
          label: 'Add detail view',
          value: {
            ref: {
              componentId: '#detailColumn',
              optionId: '#addDetailViewChild',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'shownTab',
              comparator: 'EQ',
              value: 2,
            },
          },
        }),
        reconfigureSubView: linked({
          label: 'Reconfigure sub view',
          value: {
            ref: {
              componentId: '#subView',
              optionId: '#reconfigureSubView',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'shownTab',
              comparator: 'EQ',
              value: 2,
            },
          },
        }),
        addSubViewChild: linked({
          label: 'Add subview item',
          value: {
            ref: {
              componentId: '#subView',
              optionId: '#addSubViewChild',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'shownTab',
              comparator: 'EQ',
              value: 2,
            },
          },
        }),
        detailsTabTitle: linked({
          label: 'Details tab title',
          value: {
            ref: {
              componentId: '#detailsTabTitle',
              optionId: '#detailsTabTitleContent',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'shownTab',
              comparator: 'EQ',
              value: 2,
            },
          },
        }),
        updateTabTitle: linked({
          label: 'Update tab title',
          value: {
            ref: {
              componentId: '#updateTabTitle',
              optionId: '#updateTabTitleContent',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'shownTab',
              comparator: 'EQ',
              value: 3,
            },
          },
        }),
        reconfigureUpdateForm: linked({
          label: 'Reconfigure update form',
          value: {
            ref: {
              componentId: '#updateForm',
              optionId: '#updateFormReconfigure',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'shownTab',
              comparator: 'EQ',
              value: 3,
            },
          },
        }),
        updateFormAction: linked({
          label: 'Update action',
          value: {
            ref: {
              componentId: '#updateForm',
              optionId: '#updateFormAction',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'shownTab',
              comparator: 'EQ',
              value: 3,
            },
          },
        }),
      },
    },
    [
      Drawer(
        {
          label: 'Backoffice',
          options: {
            ...drawerOptions,
            drawerWidth: size('Drawer Width', {
              value: '240px',
              configuration: {
                as: 'UNIT',
              },
            }),
            runTimeVisibility: option('CUSTOM', {
              label: 'Initial State (RUNTIME)',
              value: 'true',
              configuration: {
                as: 'DROPDOWN',
                allowedInput: [
                  { name: 'Visible', value: 'true' },
                  { name: 'Hidden', value: 'false' },
                ],
              },
            }),
          },
        },
        [
          DrawerBar(
            {
              label: 'Backoffice - Side menu',
              options: {
                ...drawerBarOptions,
                themeBgColor: color('Theme background color', {
                  value: ThemeColor.PRIMARY,
                }),
                innerSpacing: sizes('Inner space', {
                  value: ['0rem', '0rem', '0rem', '0rem'],
                }),
              },
              ref: { id: '#sideMenu' },
            },
            [sideMenu],
          ),
          drawerContainer,
        ],
      ),
    ],
  ),
];

const beforeCreate = ({
  components: {
    Content,
    Header,
    Field,
    Footer,
    PropertySelector,
    ModelRelationSelector,
    PropertiesSelector,
    Box: BeforeCreateBox,
    CheckBox,
    PartialSelector,
    Text: TextComp,
    Box: BoxComp,
    Button: Buttoncomp,
  },
  helpers,
  prefab: originalPrefab,
  save,
  close,
}: BeforeCreateArgs) => {
  const {
    useModelQuery,
    prepareAction,
    getPageAuthenticationProfileId,
    cloneStructure,
    setOption,
    createBlacklist,
    createUuid,
    makeBettyInput,
    makeBettyUpdateInput,
    PropertyKind,
    BettyPrefabs,
    linkOption,
    createWrapper,
  } = helpers;
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState<ModelProps>();
  const [dataTableProperties, setDataTableProperties] = React.useState<
    Properties[]
  >([]);
  const [modelProperties, setModelProperties] = React.useState<Properties[]>(
    [],
  );
  const [otherPropertiesInForms, setOtherPropertiesInForm] =
    React.useState<Boolean>(false);
  const [formProperties, setFormProperties] = React.useState<Properties[]>([]);
  const [formPropertiesValidation, setFormPropertiesValidation] =
    React.useState<Boolean>(false);
  const [modelValidation, setModelValidation] = React.useState(false);
  const [dataTablePropertiesValidation, setDataTablePropertiesValidation] =
    React.useState(false);
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });
  const [stepNumber, setStepNumber] = React.useState(1);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');
  const pageAuthenticationProfileId = getPageAuthenticationProfileId();
  const permissions: PermissionType = 'private';
  const [searchProp, setSearchProp] = React.useState<PropertyStateProps>({
    id: '',
  });

  const createFormId = createUuid();
  const updateFormId = createUuid();
  const deleteButtonId = createUuid();
  function treeSearch(
    dirName: string,
    array: PrefabReference[],
  ): PrefabComponent | undefined {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < array.length; i++) {
      const q = array[i];
      if (q.type === 'COMPONENT') {
        if (q.ref && q.ref.id === dirName) {
          return q;
        }
      }
      if (q.type !== 'PARTIAL' && q.descendants && q.descendants.length) {
        const result = treeSearch(dirName, q.descendants);
        if (result) return result;
      }
    }
    return undefined;
  }

  const enrichVarObj = (obj: any) => {
    const returnObject = {
      id: [obj.id].flat(),
      kind: obj.kind,
      label: obj.label,
      name: '',
      type: 'PROPERTY',
    };
    if (model) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const property = model.properties.find(
        (prop: any) => prop.id === returnObject.id[0],
      );
      if (property) {
        returnObject.name = `{{ ${model.name}.${property.label} }}`;
      } else {
        returnObject.name = `{{ ${model.name}.${obj.label} }}`;
      }
    }
    return returnObject;
  };

  const makeDetail = (prop: any) => {
    const noEmptyValueConditional = cloneStructure('Conditional');
    const detailWrapper = createWrapper(
      {
        label: 'Detail view item',
        options: {
          property: linkOption({
            label: 'Property',
            value: {
              ref: {
                componentId: `#detailItem${prop.id}`,
                optionId: `#detailItemProperty${prop.id}`,
              },
            },
            showInReconfigure: true,
          }),
          labelText: linkOption({
            label: 'Label Text',
            value: {
              ref: {
                componentId: `#detailItem${prop.id}`,
                optionId: `#detailItemLabel${prop.id}`,
              },
            },
          }),
        },
      },
      [],
    );
    if (noEmptyValueConditional.type === 'COMPONENT') {
      setOption(noEmptyValueConditional, 'left', (originalOption: any) => ({
        ...originalOption,
        value: [enrichVarObj({ ...prop })],
      }));
      setOption(
        noEmptyValueConditional,
        'compare',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: 'neq',
        }),
      );

      const detailComponent = cloneStructure('Box');
      if (detailComponent.type === 'COMPONENT') {
        setOption(
          detailComponent,
          'outerSpacing',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: ['0rem', '0rem', 'M', '0rem'],
          }),
        );
        setOption(
          detailComponent,
          'backgroundColor',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: 'Accent1',
          }),
        );
        setOption(
          detailComponent,
          'backgroundColorAlpha',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: '20',
          }),
        );

        if (prop.kind !== 'IMAGE' && prop.kind !== 'FILE') {
          const detailViewItemColumn = cloneStructure('Detail view child');
          if (detailViewItemColumn.type === 'COMPONENT') {
            const detailViewItem = detailViewItemColumn.descendants[0];
            if (detailViewItem.type === 'COMPONENT') {
              detailViewItem.ref = { id: `#detailItem${prop.id}` };
              setOption(detailViewItem, 'property', (opt) => ({
                ...opt,
                value: enrichVarObj({ ...prop }),
                ref: {
                  id: `#detailItemProperty${prop.id}`,
                },
              }));
              setOption(detailViewItem, 'fontWeight', (opt) => ({
                ...opt,
                value: '500',
              }));
              setOption(detailViewItem, 'labelText', (opt: any) => ({
                ...opt,
                ref: {
                  id: `#detailItemLabel${prop.id}`,
                },
              }));
            }
            detailComponent.descendants = [detailViewItem];
            noEmptyValueConditional.descendants = [detailComponent];
            detailWrapper.descendants = [noEmptyValueConditional];
            return detailWrapper;
          }
        }

        const labelText = cloneStructure('Text');
        if (labelText.type === 'COMPONENT') {
          const label = {
            ...enrichVarObj({ ...prop }),
            type: 'PROPERTY_LABEL',
          };
          setOption(labelText, 'content', (originalOption: any) => ({
            ...originalOption,
            value: [label, ':'],
          }));
          setOption(
            labelText,
            'type',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: 'Body1',
            }),
          );
          setOption(
            labelText,
            'fontWeight',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
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
              },
            }),
          );
        }

        if (prop.kind === 'IMAGE') {
          const mediaComponent = cloneStructure('Media');
          if (mediaComponent.type === 'COMPONENT') {
            setOption(
              mediaComponent,
              'type',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: 'url',
              }),
            );
            setOption(
              mediaComponent,
              'urlFileSource',
              (originalOption: any) => ({
                ...originalOption,
                value: [{ ...enrichVarObj({ ...prop }), useKey: 'url' }],
              }),
            );
            setOption(
              mediaComponent,
              'width',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: '100%',
              }),
            );
          }
          detailComponent.descendants = [labelText, mediaComponent];
          noEmptyValueConditional.descendants = [detailComponent];
          return noEmptyValueConditional;
        }

        if (prop.kind === 'FILE') {
          const fileButton = cloneStructure('Open Page');
          if (fileButton.type === 'COMPONENT') {
            fileButton.style = {
              overwrite: {
                backgroundColor: {
                  type: 'THEME_COLOR',
                  value: 'primary',
                },
                boxShadow: 'none',
                color: {
                  type: 'THEME_COLOR',
                  value: 'white',
                },
                fontFamily: 'Roboto',
                fontSize: '0.875rem',
                fontStyle: 'none',
                fontWeight: '400',
                padding: ['0.6875rem', '1.375rem'],
                textDecoration: 'none',
                textTransform: 'none',
              },
            };
            setOption(
              fileButton,
              'buttonText',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: ['View file'],
              }),
            );
            setOption(fileButton, 'linkToExternal', (originalOption: any) => ({
              ...originalOption,
              value: [
                {
                  ...enrichVarObj({ ...prop }),
                  useKey: 'url',
                },
              ],
            }));
            setOption(
              fileButton,
              'linkType',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: 'external',
              }),
            );
            setOption(
              fileButton,
              'linkTarget',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: '_blank',
              }),
            );
          }

          detailComponent.descendants = [labelText, fileButton];
          noEmptyValueConditional.descendants = [detailComponent];
          return noEmptyValueConditional;
        }

        const valueText = cloneStructure('Text');
        if (valueText.type === 'COMPONENT') {
          setOption(valueText, 'content', (originalOption: any) => ({
            ...originalOption,
            value: [enrichVarObj({ ...prop })],
          }));
        }
        detailComponent.descendants = [labelText, valueText];
        noEmptyValueConditional.descendants = [detailComponent];
      }
    }
    return noEmptyValueConditional;
  };

  useModelQuery({
    variables: { id: modelId },
    onCompleted: ({ model: dataModel }: ModelQuery) => {
      setModel(dataModel);
      setIdProperty(dataModel.properties.find(({ name }) => name === 'id'));
      setModelProperties(dataModel.properties);
    },
  });

  const searchPropDisabledKinds = createBlacklist([
    'BOOLEAN',
    'DECIMAL',
    'EMAIL',
    'EMAIL_ADDRESS',
    'ENUM',
    'FLOAT',
    'HAS_ONE',
    'IBAN',
    'INTEGER',
    'LIST',
    'PERIODIC_COUNT',
    'PHONE_NUMBER',
    'PRICE',
    'STRING',
    'TEXT',
    'URL',
  ]);

  const dataTablePropertiesDisabledKinds = createBlacklist([
    'BELONGS_TO',
    'BOOLEAN',
    'DATE',
    'DATE_TIME',
    'DECIMAL',
    'EMAIL',
    'EMAIL_ADDRESS',
    'ENUM',
    'FILE',
    'FLOAT',
    'HAS_ONE',
    'IBAN',
    'IMAGE',
    'INTEGER',
    'LIST',
    'PERIODIC_COUNT',
    'PHONE_NUMBER',
    'PRICE',
    'SERIAL',
    'STRING',
    'TEXT',
    'TIME',
    'URL',
  ]);

  const formPropertiesDisabledKinds = createBlacklist([
    'BOOLEAN',
    'DATE',
    'DATE_TIME',
    'DECIMAL',
    'EMAIL',
    'EMAIL_ADDRESS',
    'ENUM',
    'FILE',
    'FLOAT',
    'HAS_ONE',
    'IBAN',
    'IMAGE',
    'INTEGER',
    'LIST',
    'PERIODIC_COUNT',
    'PHONE_NUMBER',
    'PRICE',
    'SERIAL',
    'STRING',
    'TEXT',
    'TIME',
    'URL',
  ]);

  const stepper = {
    // eslint-disable-next-line consistent-return
    setStep: (step: number) => {
      if (step === 1) {
        return (
          <>
            <BoxComp pad={{ bottom: '15px' }}>
              <BoxComp pad={{ bottom: '15px' }}>
                <TextComp size="medium" weight="bolder">
                  Select partials
                </TextComp>
              </BoxComp>
              <BoxComp pad={{ bottom: '15px' }}>
                <TextComp color="grey700">
                  By using a partial for the side menu and footer you can easily
                  reuse the same structure without having to go through every
                  page.
                </TextComp>
              </BoxComp>
              <Field label="SIDEMENU PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(headerId: string) => {
                    setHeaderPartialId(headerId);
                  }}
                  preSelected="side menu"
                  value={headerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </BoxComp>
            <BoxComp pad={{ bottom: '15px' }}>
              <Field label="FOOTER PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(footerId: string) => {
                    setFooterPartialId(footerId);
                  }}
                  preSelected="footer"
                  value={footerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </BoxComp>
          </>
        );
      }
      if (step === 2) {
        return (
          <>
            <Field
              label="Model"
              error={
                modelValidation && (
                  <TextComp color="#e82600">
                    Selecting a model is required
                  </TextComp>
                )
              }
            >
              <ModelRelationSelector
                onChange={(value: string) => {
                  setModelValidation(false);
                  setModelId(value);
                  // if the value gets emptied also empty the properties selector values
                  if (!value) {
                    setDataTableProperties([]);
                    if (otherPropertiesInForms) setFormProperties([]);
                  }
                }}
                value={modelId}
              />
            </Field>
            <Field label="Property used for the search field">
              <PropertySelector
                modelId={modelId}
                onChange={(value: any) => {
                  setSearchProp(value);
                }}
                value={searchProp}
                disabled={!modelId}
                disabledKinds={searchPropDisabledKinds}
                showFormat={false}
              />
            </Field>
            <BeforeCreateBox pad={{ bottom: 'medium' }}>
              <CheckBox
                label={
                  <TextComp color="#262a3a;">
                    Use different properties for forms and detail view
                  </TextComp>
                }
                checked={otherPropertiesInForms}
                onChange={() => {
                  setOtherPropertiesInForm(!otherPropertiesInForms);
                }}
              />
            </BeforeCreateBox>
            <Field
              label="Properties shown in the data table"
              error={
                dataTablePropertiesValidation && (
                  <TextComp color="#e82600">
                    Selecting a property is required
                  </TextComp>
                )
              }
            >
              <PropertiesSelector
                modelId={modelId}
                value={dataTableProperties}
                disabledKinds={dataTablePropertiesDisabledKinds}
                onChange={(value: Properties[]) => {
                  setDataTableProperties(value);
                  setDataTablePropertiesValidation(false);
                }}
              />
            </Field>
          </>
        );
      }
      if (step === 3) {
        return (
          <Field
            label="Properties shown in the detail view and forms"
            error={
              formPropertiesValidation && (
                <TextComp color="#e82600">
                  Selecting a property is required
                </TextComp>
              )
            }
          >
            <PropertiesSelector
              modelId={modelId}
              value={formProperties}
              disabledKinds={formPropertiesDisabledKinds}
              onChange={(value: Properties[]) => {
                setFormProperties(value);
                setFormPropertiesValidation(false);
              }}
            />
          </Field>
        );
      }
    },
    onSave: async () => {
      const newPrefab = { ...originalPrefab };
      const fileinputStructure = (
        inputPrefab: PrefabReference,
      ): PrefabReference => {
        if (inputPrefab.type === 'COMPONENT') {
          setOption(inputPrefab, 'floatLabel', (options) => ({
            ...options,
            value: true,
          }));
        }
        return inputPrefab;
      };
      const inputStructure = (inputPrefab: PrefabReference, prop: any) => {
        if (inputPrefab.type === 'COMPONENT') {
          setOption(inputPrefab, 'floatLabel', (options) => ({
            ...options,
            value: true,
          }));
          setOption(inputPrefab, 'labelColor', (options) => ({
            ...options,
            value: 'Black',
          }));
          setOption(inputPrefab, 'label', (options: any) => ({
            ...options,
            value: [{ ...enrichVarObj(prop), type: 'PROPERTY_LABEL' }],
          }));
        }
        return inputPrefab;
      };
      if (otherPropertiesInForms && formProperties.length < 1) {
        setFormPropertiesValidation(true);
        return;
      }

      if (!modelId || !model || !idProperty) {
        setModelValidation(true);
        return;
      }
      if (!dataTableProperties || dataTableProperties.length < 1) {
        setDataTablePropertiesValidation(true);
        return;
      }

      const footerPartial = treeSearch('#footer', newPrefab.structure);
      const sideMenuPartial = treeSearch('#sideMenu', newPrefab.structure);
      if (headerPartialId && sideMenuPartial) {
        sideMenuPartial.descendants = [
          {
            ref: { id: '#sideMenuPartial' },
            type: 'PARTIAL',
            partialId: headerPartialId,
          },
        ];
        if (newPrefab.structure[0].type === 'WRAPPER') {
          newPrefab.structure[0].options.unshift({
            key: 'partial',
            label: 'Edit Partial',
            type: 'LINKED_PARTIAL',
            value: {
              ref: {
                componentId: '#sideMenuPartial',
              },
            },
          });

          const newCategories = newPrefab.structure[0].optionCategories;
          if (newCategories) {
            newCategories.splice(1, 0, {
              label: 'Side menu',
              expanded: true,
              members: ['partial'],
              condition: {
                type: 'SHOW',
                option: 'visibility',
                comparator: 'EQ',
                value: false,
              },
            });
          }
        }
      }

      if (footerPartialId && footerPartial) {
        footerPartial.descendants = [
          { type: 'PARTIAL', partialId: footerPartialId },
        ];
      }

      // set title prop
      const titleComponent = treeSearch('#pageTitle', newPrefab.structure);
      if (!titleComponent) throw new Error('No title component found');
      setOption(
        titleComponent,
        'textColor',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: 'Dark',
        }),
      );
      setOption(
        titleComponent,
        'content',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: [`${data?.model.label}s`],
        }),
      );

      // set datatable
      const dataTableComp = treeSearch('#dataTable', newPrefab.structure);
      if (!dataTableComp) throw new Error('No datatable component found');
      setOption(dataTableComp, 'model', (opts: PrefabComponentOption) => ({
        ...opts,
        value: modelId,
      }));

      const inheritFormatKinds = [
        'DATE',
        'DATE_EXPRESSION',
        'DATE_TIME',
        'DATE_TIME_EXPRESSION',
        'DECIMAL',
        'DECIMAL_EXPRESSION',
        'INTEGER',
        'INTEGER_EXPRESSION',
        'PRICE',
        'PRICE_EXPRESSION',
        'TIME',
      ];
      // eslint-disable-next-line @typescript-eslint/no-shadow
      dataTableProperties.forEach((property) => {
        let newProperty = property;
        if (property.kind && inheritFormatKinds.includes(property.kind)) {
          newProperty = {
            ...property,
            format: 'INHERIT',
          };
        }

        const dataTableColumnStructure = cloneStructure('Datatable Column');
        if (dataTableColumnStructure.type !== 'COMPONENT') {
          throw new Error(
            `expected component prefab, found ${dataTableColumnStructure.type}`,
          );
        }

        if (property.kind === 'FILE' || property.kind === 'IMAGE') {
          const modifiedProperty = {
            id: newProperty.id,
            type: 'PROPERTY',
            useKey: 'url',
          };
          setOption(
            dataTableColumnStructure,
            'property',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: modifiedProperty,
            }),
          );
        } else {
          setOption(
            dataTableColumnStructure,
            'property',
            (originalOption: PrefabComponentOption) => {
              return {
                ...originalOption,
                value: newProperty as any,
              };
            },
          );
        }
        setOption(
          dataTableColumnStructure,
          'type',
          (originalOption: PrefabComponentOption) => {
            return {
              ...originalOption,
              value: 'Title6',
            };
          },
        );
        dataTableComp.descendants.push(dataTableColumnStructure);
      });

      const detailButton = cloneStructure('Button');
      if (detailButton.type === 'COMPONENT') {
        detailButton.ref = { id: '#detailButton' };
        detailButton.style = {
          overwrite: {
            backgroundColor: {
              type: 'STATIC',
              value: 'transparent',
            },
            boxShadow: 'none',
            color: {
              type: 'THEME_COLOR',
              value: 'accent2',
            },
            fontFamily: 'Roboto',
            fontSize: '0.875rem',
            fontStyle: 'none',
            fontWeight: '400',
            padding: ['0.6875rem', '0.6875rem'],
            textDecoration: 'none',
            textTransform: 'none',
          },
        };
        setOption(
          detailButton,
          'buttonText',
          (opts: PrefabComponentOption) => ({
            ...opts,
            value: [''],
          }),
        );
        setOption(detailButton, 'icon', (opts: PrefabComponentOption) => ({
          ...opts,
          value: 'Info',
        }));
      }
      const editButton = cloneStructure('Button');
      if (editButton.type === 'COMPONENT') {
        editButton.style = {
          overwrite: {
            backgroundColor: {
              type: 'STATIC',
              value: 'transparent',
            },
            boxShadow: 'none',
            color: {
              type: 'THEME_COLOR',
              value: 'primary',
            },
            fontFamily: 'Roboto',
            fontSize: '0.875rem',
            fontStyle: 'none',
            fontWeight: '400',
            padding: ['0.6875rem', '0.6875rem'],
            textDecoration: 'none',
            textTransform: 'none',
          },
        };
        editButton.ref = { id: '#editButton' };
        setOption(editButton, 'buttonText', (opts: PrefabComponentOption) => ({
          ...opts,
          value: [''],
        }));
        setOption(editButton, 'icon', (opts: PrefabComponentOption) => ({
          ...opts,
          value: 'Edit',
        }));
      }

      const deleteButton = cloneStructure('Button');
      if (deleteButton.type === 'COMPONENT') {
        deleteButton.ref = {
          id: '#deleteButton',
        };
        deleteButton.style = {
          overwrite: {
            backgroundColor: {
              type: 'STATIC',
              value: 'transparent',
            },
            boxShadow: 'none',
            color: {
              type: 'STATIC',
              value: 'red',
            },
            fontFamily: 'Roboto',
            fontSize: '0.875rem',
            fontStyle: 'none',
            fontWeight: '400',
            padding: ['0.6875rem', '0.6875rem'],
            textDecoration: 'none',
            textTransform: 'none',
          },
        };

        setOption(
          deleteButton,
          'buttonText',
          (opts: PrefabComponentOption) => ({
            ...opts,
            value: [''],
          }),
        );
        setOption(deleteButton, 'icon', (opts: PrefabComponentOption) => ({
          ...opts,
          value: 'Delete',
        }));
      }

      const boxComp = cloneStructure('Box');
      if (boxComp.type === 'COMPONENT') {
        setOption(boxComp, 'innerSpacing', (opts: PrefabComponentOption) => ({
          ...opts,
          value: ['0rem', '0rem', '0rem', '0rem'],
        }));
        setOption(boxComp, 'alignment', (opts: PrefabComponentOption) => ({
          ...opts,
          value: 'flex-end',
        }));
        boxComp.descendants = [detailButton, editButton, deleteButton];
      }

      const buttonColumn = cloneStructure('Datatable Column');
      if (buttonColumn.type === 'COMPONENT') {
        buttonColumn.descendants = [boxComp];
      }
      dataTableComp.descendants.push(buttonColumn);
      const resolvedProperties = otherPropertiesInForms
        ? formProperties
        : modelProperties;

      // set create form
      const filteredproperties = resolvedProperties.filter(
        (prop: Properties) => {
          return (
            prop.label !== 'Created at' &&
            prop.label !== 'Updated at' &&
            prop.label !== 'Id' &&
            prop.kind !== 'PDF' &&
            prop.kind !== 'MULTI_FILE' &&
            prop.kind !== 'LOGIN_TOKEN' &&
            prop.kind !== 'MULTI_IMAGE' &&
            prop.kind !== 'BOOLEAN_EXPRESSION' &&
            prop.kind !== 'DATE_EXPRESSION' &&
            prop.kind !== 'DATE_TIME_EXPRESSION' &&
            prop.kind !== 'INTEGER_EXPRESSION' &&
            prop.kind !== 'DECIMAL_EXPRESSION' &&
            prop.kind !== 'MINUTES_EXPRESSION' &&
            prop.kind !== 'PRICE_EXPRESSION' &&
            prop.kind !== 'STRING_EXPRESSION' &&
            prop.kind !== 'TEXT_EXPRESSION' &&
            prop.kind !== 'SUM' &&
            prop.kind !== 'COUNT' &&
            prop.kind !== 'AUTO_INCREMENT' &&
            prop.kind !== 'EMAIL' &&
            prop.kind !== 'ZIPCODE'
          );
        },
      );

      const relationProperties = model.relationships.filter(
        (e) => e.kind === 'BELONGS_TO',
      );

      const createForm = treeSearch('#createForm', newPrefab.structure);
      if (!createForm) throw new Error('No create form found');
      createForm.id = createFormId;
      const createAction = await prepareAction(
        createFormId,
        idProperty,
        [
          ...filteredproperties,
          // other properties not checked then add all belongs_to's otherwise spread empty array
          ...(!otherPropertiesInForms ? relationProperties : []),
        ],
        'create',
        undefined,
        `Back office - Create ${data?.model.label}`,
        permissions,
        pageAuthenticationProfileId,
      );
      Object.values(createAction.variables).forEach(
        ([prop, inputVariable]): void => {
          const generateInputPrefabs = (): PrefabReference | undefined => {
            let imageUpload;
            let imageUploadButton;
            let fileUpload;
            let fileUploadButton;
            let input;
            switch (prop.kind) {
              case PropertyKind.BELONGS_TO:
                input = makeBettyInput(
                  BettyPrefabs.AUTO_COMPLETE,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.INTEGER:
                input = makeBettyInput(
                  BettyPrefabs.INTEGER,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.EMAIL_ADDRESS:
                input = makeBettyInput(
                  BettyPrefabs.EMAIL_ADDRESS,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.DECIMAL:
                input = makeBettyInput(
                  BettyPrefabs.DECIMAL,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.TEXT:
                input = makeBettyInput(
                  BettyPrefabs.TEXT,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.PRICE:
                input = makeBettyInput(
                  BettyPrefabs.PRICE,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.PASSWORD:
                input = makeBettyInput(
                  BettyPrefabs.PASSWORD,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.DATE:
                input = makeBettyInput(
                  BettyPrefabs.DATE,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.DATE_TIME:
                input = makeBettyInput(
                  BettyPrefabs.DATE_TIME,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.TIME:
                input = makeBettyInput(
                  BettyPrefabs.TIME,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.FILE:
                fileUpload = makeBettyInput(
                  BettyPrefabs.FILE,
                  model,
                  prop,
                  inputVariable,
                );
                if (fileUpload.type === 'COMPONENT') {
                  [fileUploadButton] = fileUpload.descendants;
                  if (fileUploadButton.type === 'COMPONENT') {
                    fileUploadButton.style = {
                      overwrite: {
                        backgroundColor: {
                          type: 'THEME_COLOR',
                          value: 'primary',
                        },
                        boxShadow: 'none',
                        color: {
                          type: 'THEME_COLOR',
                          value: 'white',
                        },
                        fontFamily: 'Roboto',
                        fontSize: '0.875rem',
                        fontStyle: 'none',
                        fontWeight: '400',
                        padding: ['0.6875rem', '1.375rem'],
                        textDecoration: 'none',
                        textTransform: 'none',
                      },
                    };
                  }
                  setOption(fileUpload, 'label', (options: any) => ({
                    ...options,
                    value: [{ ...enrichVarObj(prop), type: 'PROPERTY_LABEL' }],
                  }));
                }

                return fileinputStructure(fileUpload);
              case PropertyKind.IMAGE:
                imageUpload = makeBettyInput(
                  BettyPrefabs.IMAGE,
                  model,
                  prop,
                  inputVariable,
                );
                if (imageUpload.type === 'COMPONENT') {
                  [imageUploadButton] = imageUpload.descendants;
                  if (imageUploadButton.type === 'COMPONENT') {
                    imageUploadButton.style = {
                      overwrite: {
                        backgroundColor: {
                          type: 'THEME_COLOR',
                          value: 'primary',
                        },
                        boxShadow: 'none',
                        color: {
                          type: 'THEME_COLOR',
                          value: 'white',
                        },
                        fontFamily: 'Roboto',
                        fontSize: '0.875rem',
                        fontStyle: 'none',
                        fontWeight: '400',
                        padding: ['0.6875rem', '1.375rem'],
                        textDecoration: 'none',
                        textTransform: 'none',
                      },
                    };
                  }
                  setOption(imageUpload, 'label', (options: any) => ({
                    ...options,
                    value: [{ ...enrichVarObj(prop), type: 'PROPERTY_LABEL' }],
                  }));
                }
                return fileinputStructure(imageUpload);
              case PropertyKind.BOOLEAN:
                input = makeBettyInput(
                  BettyPrefabs.BOOLEAN,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.LIST:
                input = makeBettyInput(
                  BettyPrefabs.LIST,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              default:
                input = makeBettyInput(
                  BettyPrefabs.STRING,
                  model,
                  prop,
                  inputVariable,
                  createAction.relatedIdProperties,
                  createAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
            }
          };
          const createFormInputPrefabs = generateInputPrefabs();
          createForm.descendants.push(createFormInputPrefabs);
          if (!prop.kind) {
            // eslint-disable-next-line no-console
            console.warn('PropertyKind not found');
          }
        },
      );

      setOption(createForm, 'actionId', (opts: PrefabComponentOption) => ({
        ...opts,
        value: createAction.action.actionId,
        configuration: { disabled: true },
        ref: {
          id: '#createFormAction',
        },
      }));

      setOption(createForm, 'model', (opts: PrefabComponentOption) => ({
        ...opts,
        value: modelId,
        configuration: {
          disabled: true,
        },
      }));

      // set detail tab
      const detailColumn = treeSearch('#detailColumn', newPrefab.structure);
      if (!detailColumn) throw new Error('No detail data container found');

      const detailDatacontainer = treeSearch(
        '#detailDatacontainer',
        newPrefab.structure,
      );
      if (!detailDatacontainer)
        throw new Error('No detail data container found');
      setOption(
        detailDatacontainer,
        'model',
        (opts: PrefabComponentOption) => ({
          ...opts,
          value: modelId,
        }),
      );
      resolvedProperties.map((prop) =>
        detailColumn.descendants.push(makeDetail(prop)),
      );

      // set edit form
      const updateForm = treeSearch('#updateForm', newPrefab.structure);
      if (!updateForm) throw new Error('No edit form found');
      updateForm.id = updateFormId;
      const updateAction = await prepareAction(
        updateFormId,
        idProperty,
        [
          ...filteredproperties,
          // other properties not checked then add all belongs_to's otherwise spread empty array
          ...(!otherPropertiesInForms ? relationProperties : []),
        ],
        'update',
        undefined,
        `Back office - Update ${data?.model.label}`,
        permissions,
        pageAuthenticationProfileId,
      );
      setOption(updateForm, 'actionId', (opts: PrefabComponentOption) => ({
        ...opts,
        value: updateAction.action.actionId,
        configuration: { disabled: true },
        ref: {
          id: '#updateFormAction',
        },
      }));
      setOption(
        updateForm,
        'recordVariable',
        (opts: PrefabComponentOption) => ({
          ...opts,
          value: updateAction.recordInputVariable.id,
        }),
      );
      setOption(updateForm, 'model', (opts: PrefabComponentOption) => ({
        ...opts,
        value: modelId,
        configuration: {
          disabled: true,
        },
      }));

      Object.values(updateAction.variables).forEach(
        ([prop, inputVariable]): void => {
          const generateInputPrefabs = () => {
            let imageUpload;
            let imageUploadButton;
            let fileUpload;
            let fileUploadButton;
            let input;
            switch (prop.kind) {
              case PropertyKind.BELONGS_TO:
                input = makeBettyUpdateInput(
                  BettyPrefabs.AUTO_COMPLETE,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.INTEGER:
                input = makeBettyUpdateInput(
                  BettyPrefabs.INTEGER,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.EMAIL_ADDRESS:
                input = makeBettyUpdateInput(
                  BettyPrefabs.EMAIL_ADDRESS,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.DECIMAL:
                input = makeBettyUpdateInput(
                  BettyPrefabs.DECIMAL,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.TEXT:
                input = makeBettyUpdateInput(
                  BettyPrefabs.TEXT,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.PRICE:
                input = makeBettyUpdateInput(
                  BettyPrefabs.PRICE,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.PASSWORD:
                input = makeBettyUpdateInput(
                  BettyPrefabs.PASSWORD,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.DATE:
                input = makeBettyUpdateInput(
                  BettyPrefabs.DATE,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.DATE_TIME:
                input = makeBettyUpdateInput(
                  BettyPrefabs.DATE_TIME,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.TIME:
                input = makeBettyUpdateInput(
                  BettyPrefabs.TIME,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.FILE:
                fileUpload = makeBettyUpdateInput(
                  BettyPrefabs.FILE,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                );
                if (fileUpload.type === 'COMPONENT') {
                  [fileUploadButton] = fileUpload.descendants;
                  if (fileUploadButton.type === 'COMPONENT') {
                    fileUploadButton.style = {
                      overwrite: {
                        backgroundColor: {
                          type: 'THEME_COLOR',
                          value: 'primary',
                        },
                        boxShadow: 'none',
                        color: {
                          type: 'THEME_COLOR',
                          value: 'white',
                        },
                        fontFamily: 'Roboto',
                        fontSize: '0.875rem',
                        fontStyle: 'none',
                        fontWeight: '400',
                        padding: ['0.6875rem', '1.375rem'],
                        textDecoration: 'none',
                        textTransform: 'none',
                      },
                    };
                    setOption(fileUpload, 'label', (options: any) => ({
                      ...options,
                      value: [
                        { ...enrichVarObj(prop), type: 'PROPERTY_LABEL' },
                      ],
                    }));
                  }
                }
                return fileinputStructure(fileUpload);
              case PropertyKind.IMAGE:
                imageUpload = makeBettyUpdateInput(
                  BettyPrefabs.IMAGE,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                );
                if (imageUpload.type === 'COMPONENT') {
                  [imageUploadButton] = imageUpload.descendants;
                  if (imageUploadButton.type === 'COMPONENT') {
                    imageUploadButton.style = {
                      overwrite: {
                        backgroundColor: {
                          type: 'THEME_COLOR',
                          value: 'primary',
                        },
                        boxShadow: 'none',
                        color: {
                          type: 'THEME_COLOR',
                          value: 'white',
                        },
                        fontFamily: 'Roboto',
                        fontSize: '0.875rem',
                        fontStyle: 'none',
                        fontWeight: '400',
                        padding: ['0.6875rem', '1.375rem'],
                        textDecoration: 'none',
                        textTransform: 'none',
                      },
                    };
                    setOption(imageUpload, 'label', (options: any) => ({
                      ...options,
                      value: [
                        { ...enrichVarObj(prop), type: 'PROPERTY_LABEL' },
                      ],
                    }));
                  }
                }
                return fileinputStructure(imageUpload);
              case PropertyKind.BOOLEAN:
                input = makeBettyUpdateInput(
                  BettyPrefabs.BOOLEAN,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              case PropertyKind.LIST:
                input = makeBettyUpdateInput(
                  BettyPrefabs.LIST,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
              default:
                input = makeBettyUpdateInput(
                  BettyPrefabs.STRING,
                  model,
                  prop,
                  inputVariable,
                  updateAction.relatedIdProperties,
                  updateAction.relatedModelIds,
                );
                if (input.type === 'COMPONENT') {
                  input = inputStructure(input, prop);
                }
                return input;
            }
          };
          const updateFormInput = generateInputPrefabs();
          updateForm.descendants.push(updateFormInput);
          if (!prop.kind) {
            // eslint-disable-next-line no-console
            console.warn('PropertyKind not found');
          }
        },
      );

      // set delete action
      const deleteForm = treeSearch('#deleteForm', newPrefab.structure);
      if (!deleteForm) throw new Error('No delete form found');
      deleteForm.id = deleteButtonId;

      const result = await prepareAction(
        deleteButtonId,
        idProperty,
        undefined,
        'delete',
        undefined,
        `Back office - Delete ${data?.model.label}`,
        permissions,
        pageAuthenticationProfileId,
      );
      setOption(deleteForm, 'actionId', (opts: PrefabComponentOption) => ({
        ...opts,
        value: result.action.actionId,
        configuration: { disabled: true },
        ref: {
          id: '#deleteFormAction',
        },
      }));
      setOption(
        deleteForm,
        'recordVariable',
        (opts: PrefabComponentOption) => ({
          ...opts,
          value: result.recordInputVariable.id,
        }),
      );

      setOption(deleteForm, 'model', (opts: PrefabComponentOption) => ({
        ...opts,
        value: modelId,
        configuration: {
          disabled: true,
        },
      }));

      const deleteSubmitButton = cloneStructure('Submit Button');
      if (deleteSubmitButton.type === 'COMPONENT') {
        deleteSubmitButton.ref = { id: '#deleteSubmitButton' };
        deleteSubmitButton.style = {
          overwrite: {
            backgroundColor: {
              type: 'STATIC',
              value: 'red',
            },
            boxShadow: 'none',
            color: {
              type: 'THEME_COLOR',
              value: 'white',
            },
            fontFamily: 'Roboto',
            fontSize: '0.875rem',
            fontStyle: 'none',
            fontWeight: '400',
            padding: ['0.6875rem', '1.375rem'],
            textDecoration: 'none',
            textTransform: 'none',
          },
        };
        setOption(
          deleteSubmitButton,
          'buttonText',
          (opts: PrefabComponentOption) => ({
            ...opts,
            value: ['Delete'],
          }),
        );
      }
      deleteForm.descendants.push(deleteSubmitButton);

      const filterComp = treeSearch('#filterComp', newPrefab.structure);
      if (filterComp?.type === 'COMPONENT') {
        setOption(filterComp, 'modelId', (opts: PrefabComponentOption) => ({
          ...opts,
          value: modelId,
        }));
      }
      if (newPrefab.interactions) {
        newPrefab.interactions.push(
          {
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
              targetComponentId: '#deleteForm',
            },
            type: 'Global',
          } as PrefabInteraction,
          {
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
              targetComponentId: '#detailDatacontainer',
            },
            type: 'Global',
          } as PrefabInteraction,
          {
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
              targetComponentId: '#updateForm',
            },
            type: 'Global',
          } as PrefabInteraction,
          {
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
              targetComponentId: '#updateForm',
            },
            type: 'Global',
          } as PrefabInteraction,
        );
      }
      if (searchProp.id && searchProp.id !== '') {
        if (newPrefab.interactions) {
          newPrefab.interactions.push({
            name: 'Filter',
            sourceEvent: 'onChange',
            parameters: [
              {
                id: [...searchProp.id],
                operator: 'matches',
                parameter: 'property',
                resolveValue: false,
              },
            ],
            ref: {
              targetComponentId: '#dataTable',
              sourceComponentId: '#searchField',
            },
            type: 'Custom',
          } as PrefabInteraction);
          newPrefab.interactions.push({
            name: 'Show',
            sourceEvent: 'onChange',
            ref: {
              targetComponentId: '#clearButton',
              sourceComponentId: '#searchField',
            },
            type: 'Custom',
          } as PrefabInteraction);
          newPrefab.interactions.push({
            name: 'Clear',
            sourceEvent: 'Click',
            ref: {
              targetComponentId: '#searchField',
              sourceComponentId: '#clearButton',
            },
            type: 'Custom',
          } as PrefabInteraction);
          newPrefab.interactions.push({
            name: 'ResetFilter',
            sourceEvent: 'Click',
            ref: {
              targetComponentId: '#dataTable',
              sourceComponentId: '#clearButton',
            },
            type: 'Custom',
          } as PrefabInteraction);
          newPrefab.interactions.push({
            name: 'Hide',
            sourceEvent: 'Click',
            ref: {
              targetComponentId: '#clearButton',
              sourceComponentId: '#clearButton',
            },
            type: 'Custom',
          } as PrefabInteraction);
        }
      }
      save(newPrefab);
    },
    buttons: () => (
      <BoxComp direction="row" justify="between">
        <BoxComp direction="row" margin="2rem">
          <Buttoncomp
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
          <Buttoncomp
            label="Next"
            size="large"
            disabled={stepNumber === stepper.stepAmount}
            onClick={() => {
              const newStepnumber = stepNumber + 1;
              if (
                stepNumber === 2 &&
                otherPropertiesInForms &&
                dataTableProperties.length < 1
              ) {
                setDataTablePropertiesValidation(true);
                return;
              }
              setStepNumber(newStepnumber);
            }}
            primary
          />
        </BoxComp>
        <BoxComp>
          <Footer
            onClose={close}
            onSave={stepper.onSave}
            // ToDo: add model and properties selection requirements to canSave
            canSave={stepNumber === stepper.stepAmount}
          />
        </BoxComp>
      </BoxComp>
    ),
    progressBar: () => {
      return (
        <BoxComp
          justify="center"
          margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
        >
          <TextComp size="medium" weight="bold">{`Step: ${stepNumber + 1} / ${
            stepper.stepAmount + 1
          }`}</TextComp>
        </BoxComp>
      );
    },
    stepAmount: otherPropertiesInForms ? 3 : 2,
  };
  return (
    <>
      <Header onClose={close} title="Configure back office" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default prefab('Back office', attributes, beforeCreate, prefabStructure);
