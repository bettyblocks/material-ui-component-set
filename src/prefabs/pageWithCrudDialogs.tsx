import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  option,
  text,
  sizes,
  size,
  showIf,
  toggle,
  color,
  ThemeColor,
  PrefabReference,
  variable,
  font,
  showIfTrue,
  buttongroup,
  icon,
  hideIf,
  component,
  PrefabComponentOption,
  ValueDefault,
  number,
  PrefabInteraction,
  linked,
  wrapper,
  childSelector,
  reconfigure,
  property,
} from '@betty-blocks/component-sdk';
import {
  Box as prefabBox,
  Column,
  boxOptions,
  columnOptions,
  Grid,
  gridOptions,
  Row,
  rowOptions,
  Text as TextPrefab,
  textOptions,
  AppBar,
  appBarOptions,
  OpenPageButton,
  openPageButtonOptions,
  Text as prefabText,
  Button as prefabButton,
  buttonOptions,
  DataTable,
  DataTableColumn,
  dataTableColumnOptions,
  Dialog,
  Paper,
  dialogOptions,
  paperOptions,
  Tab,
  Tabs,
  tabsOptions,
  FormErrorAlert,
  tabOptions,
  dataTableOptions,
  Snackbar,
  Alert,
  alertOptions,
  snackbarOptions,
} from './structures';
import { options as defaults } from './structures/ActionJSForm/options';
import { PermissionType } from './types/types';

const interactions: PrefabInteraction[] = [];

const children = [
  DataTableColumn({
    options: {
      ...dataTableColumnOptions,
      property: property('Property', { value: '', showInAddChild: true }),
    },
  }),
];

const attrs = {
  name: 'CRUD with dialogs',
  icon: Icon.DataTable,
  type: 'page',
  description: 'This page contains a datatable with CRUD dialogs.',
  detail:
    'In this ready to use Data Table, it is possible to create, display (read), update and delete records. These functionalities are shown in dialogs.',
  previewUrl: 'https://preview.betty.app/crud-with-dialogs',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Crud_With_Dialogs.jpg',
  category: 'DATA',
  interactions,
};

const beforeCreate = ({
  components: {
    Header,
    Content,
    Footer,
    Field,
    Text,
    ModelSelector,
    PartialSelector,
    PropertiesSelector,
    Box,
    Button,
  },
  helpers: {
    createBlacklist,
    createUuid,
    prepareAction,
    getPageAuthenticationProfileId,
    PropertyKind,
    useModelQuery,
    cloneStructure,
    setOption,
    makeBettyInput,
    makeBettyUpdateInput,
    BettyPrefabs,
  },
  prefab,
  save,
  close,
}: any) => {
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState<any>(null);
  const [properties, setProperties] = React.useState<any>([]);
  const [modelValidation, setModelValidation] = React.useState(false);
  const [propertiesValidation, setPropertiesValidation] = React.useState(false);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');
  const [stepNumber, setStepNumber] = React.useState(1);
  const [canSave, setCanSave] = React.useState(false);
  const { data } = useModelQuery({
    variables: { id: modelId },
    onCompleted: (result: any) => {
      setModel(result.model);
    },
    skip: !modelId,
  });

  const permissions: PermissionType = 'private';
  const pageAuthenticationProfileId = getPageAuthenticationProfileId();

  const enrichVarObj = (obj: any) => {
    const returnObj = obj;
    if (data && data.model) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const property = data.model.properties.find(
        (prop: { id: string }) => prop.id === returnObj.id[0],
      );
      if (property) {
        returnObj.name = `{{ ${data.model.name}.${property.name} }}`;
      }
    }
    return returnObj;
  };

  const getDescendantByRef = (refValue: string, structure: any) =>
    structure.reduce((acc: string, components: PrefabReference) => {
      if (acc) return acc;
      if (
        components.type === 'COMPONENT' &&
        // eslint-disable-next-line no-prototype-builtins
        components.ref
          ? Object.values(components.ref).indexOf(refValue) > -1
          : undefined
      ) {
        return components;
      }
      if (components.type === 'PARTIAL') {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return getDescendantByRef(refValue, components.descendants);
    }, null);

  const inputStructure = (
    textValue: string,
    inputPrefab: PrefabReference,
  ): PrefabReference => {
    const boxPrefab = cloneStructure('Box');
    setOption(
      boxPrefab,
      'innerSpacing',
      (options: PrefabComponentOption[]) => ({
        ...options,
        value: ['M', '0rem', '0rem', '0rem'],
      }),
    );
    const textPrefab = cloneStructure('Text');
    setOption(textPrefab, 'content', (options: PrefabComponentOption[]) => ({
      ...options,
      value: [textValue],
      configuration: { as: 'MULTILINE' },
    }));
    setOption(textPrefab, 'type', (options: PrefabComponentOption[]) => ({
      ...options,
      value: ['Body1'],
    }));
    setOption(
      textPrefab,
      'outerSpacing',
      (options: PrefabComponentOption[]) => ({
        ...options,
        value: ['0rem', '0rem', 'S', '0rem'],
      }),
    );

    boxPrefab.descendants.push(textPrefab);
    boxPrefab.descendants.push(inputPrefab);
    return boxPrefab;
  };

  const disabledKinds = createBlacklist([
    'BOOLEAN',
    'DATE',
    'DATE_TIME',
    'DECIMAL',
    'EMAIL',
    'EMAIL_ADDRESS',
    'ENUM',
    'FLOAT',
    'GOOGLE DOCUMENT',
    'HAS_ONE',
    'IBAN',
    'IMAGE',
    'INTEGER',
    'LIST',
    'PASSWORD',
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
    setStep: (step: number) => {
      if (step === 1) {
        return (
          <>
            <Box pad={{ bottom: '15px' }}>
              <Box pad={{ bottom: '15px' }}>
                <Text size="medium" weight="bolder">
                  Select partials
                </Text>
              </Box>
              <Box pad={{ bottom: '15px' }}>
                <Text color="grey700">
                  By using a partial for the top menu and footer you can easily
                  reuse the same structure without having to go through page.
                </Text>
              </Box>
              <Field label="TOP MENU PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(headerId: string) => {
                    setHeaderPartialId(headerId);
                  }}
                  preSelected="Top menu"
                  value={headerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </Box>
            <Box pad={{ bottom: '15px' }}>
              <Field label="FOOTER PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(footerId: string) => {
                    setFooterPartialId(footerId);
                  }}
                  preSelected="Footer"
                  value={footerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </Box>
          </>
        );
      }
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
              onChange={(value: string) => {
                setModelValidation(false);
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
          <Field
            label="Properties used in Create, Edit and View functionalities"
            error={
              propertiesValidation && (
                <Text color="#e82600">Selecting a property is required</Text>
              )
            }
          >
            <PropertiesSelector
              modelId={modelId}
              value={properties}
              disabledKinds={disabledKinds}
              onChange={(value: any) => {
                setProperties(value);
                setCanSave(value.length > 0);
              }}
            />
          </Field>
        </>
      );
    },
    onSave: async () => {
      const newPrefab = { ...prefab };
      const formProperties = properties.filter(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (property: any) =>
          property.label !== 'Created at' &&
          property.label !== 'Updated at' &&
          property.label !== 'Id',
      );
      const propertiesLength = formProperties.length;

      if (!modelId || propertiesLength < 1) {
        setModelValidation(!modelId);
        setPropertiesValidation(propertiesLength < 1);
        return;
      }
      const idProperty = data.model.properties.find(
        (p: { name: string }) => p.name === 'id',
      );
      const titleStructure = getDescendantByRef(
        '#modelTitle',
        newPrefab.structure,
      );
      setOption(
        titleStructure,
        'content',
        (options: PrefabComponentOption) => ({
          ...options,
          value: [`${data.model.name}s`],
        }),
      );

      const dataTableStructure = getDescendantByRef(
        '#dataTable',
        newPrefab.structure,
      );

      Object.values(properties).forEach((prop: any): void => {
        const dataTableColumn = cloneStructure('Datatable Column');
        setOption(
          dataTableColumn,
          'sortable',
          (options: PrefabComponentOption) => ({
            ...options,
            value: true,
          }),
        );
        setOption(
          dataTableColumn,
          'property',
          (options: PrefabComponentOption) => ({
            ...options,
            value: prop.id,
          }),
        );
        setOption(
          dataTableStructure,
          'model',
          (options: PrefabComponentOption) => ({
            ...options,
            value: modelId,
          }),
        );
        dataTableStructure.descendants.unshift(dataTableColumn);
      });

      const createTabForm = getDescendantByRef(
        '#createTabFormId',
        newPrefab.structure,
      );
      const updateTabForm = getDescendantByRef(
        '#updateTabFormId',
        newPrefab.structure,
      );
      const editTabForm = getDescendantByRef(
        '#detailsTab',
        newPrefab.structure,
      );
      const deleteTabForm = getDescendantByRef(
        '#deleteTabFormId',
        newPrefab.structure,
      );

      createTabForm.id = createUuid();
      updateTabForm.id = createUuid();
      editTabForm.id = createUuid();
      deleteTabForm.id = createUuid();
      // #region Create tab
      const createResult = await prepareAction(
        createTabForm.id,
        idProperty,
        formProperties,
        'create',
        undefined,
        undefined,
        permissions,
        pageAuthenticationProfileId,
      );
      Object.values(createResult.variables).forEach(
        ([prop, inputVariable]): void => {
          const generateInputPrefabs = () => {
            switch (prop.kind) {
              case PropertyKind.INTEGER:
                return inputStructure(
                  prop.label,
                  makeBettyInput(
                    BettyPrefabs.INTEGER,
                    model,
                    prop,
                    inputVariable,
                  ),
                );
              case PropertyKind.EMAIL_ADDRESS:
                return inputStructure(
                  prop.label,
                  makeBettyInput(
                    BettyPrefabs.EMAIL_ADDRESS,
                    model,
                    prop,
                    inputVariable,
                  ),
                );
              case PropertyKind.DECIMAL:
                return inputStructure(
                  prop.label,
                  makeBettyInput(
                    BettyPrefabs.DECIMAL,
                    model,
                    prop,
                    inputVariable,
                  ),
                );
              case PropertyKind.TEXT:
                return inputStructure(
                  prop.label,
                  makeBettyInput(BettyPrefabs.TEXT, model, prop, inputVariable),
                );
              case PropertyKind.PRICE:
                return inputStructure(
                  prop.label,
                  makeBettyInput(
                    BettyPrefabs.PRICE,
                    model,
                    prop,
                    inputVariable,
                  ),
                );
              case PropertyKind.PASSWORD:
                return inputStructure(
                  prop.label,
                  makeBettyInput(
                    BettyPrefabs.PASSWORD,
                    model,
                    prop,
                    inputVariable,
                  ),
                );
              case PropertyKind.DATE:
                return inputStructure(
                  prop.label,
                  makeBettyInput(BettyPrefabs.DATE, model, prop, inputVariable),
                );
              case PropertyKind.DATE_TIME:
                return inputStructure(
                  prop.label,
                  makeBettyInput(
                    BettyPrefabs.DATE_TIME,
                    model,
                    prop,
                    inputVariable,
                  ),
                );
              case PropertyKind.TIME:
                return inputStructure(
                  prop.label,
                  makeBettyInput(BettyPrefabs.TIME, model, prop, inputVariable),
                );
              case PropertyKind.FILE:
                return inputStructure(
                  prop.label,
                  makeBettyInput(BettyPrefabs.FILE, model, prop, inputVariable),
                );
              case PropertyKind.IMAGE:
                return inputStructure(
                  prop.label,
                  makeBettyInput(
                    BettyPrefabs.IMAGE,
                    model,
                    prop,
                    inputVariable,
                  ),
                );
              case PropertyKind.BOOLEAN:
                return inputStructure(
                  prop.label,
                  makeBettyInput(
                    BettyPrefabs.BOOLEAN,
                    model,
                    prop,
                    inputVariable,
                  ),
                );
              case PropertyKind.LIST:
                return inputStructure(
                  prop.label,
                  makeBettyInput(BettyPrefabs.LIST, model, prop, inputVariable),
                );
              default:
                return inputStructure(
                  prop.label,
                  makeBettyInput(
                    BettyPrefabs.STRING,
                    model,
                    prop,
                    inputVariable,
                  ),
                );
            }
          };
          const createFormInputPrefabs = generateInputPrefabs();
          if (createFormInputPrefabs.type === 'COMPONENT') {
            setOption(
              createFormInputPrefabs.descendants[1],
              'margin',
              (options: PrefabComponentOption) => ({
                ...options,
                value: 'none',
              }),
            );
            setOption(
              createFormInputPrefabs.descendants[1],
              'hideLabel',
              (options: PrefabComponentOption) => ({
                ...options,
                value: true,
              }),
            );
          }
          createTabForm.descendants.push(createFormInputPrefabs);
          if (!prop.kind) {
            // eslint-disable-next-line no-console
            console.warn('PropertyKind not found');
          }
        },
      );
      newPrefab.interactions.push(
        {
          name: 'Show',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#newRecordButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Select',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#newRecordButton',
            targetComponentId: '#createTab',
          },
          type: 'Custom',
        },
        {
          name: 'Hide',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#closeCreateDialogButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Hide',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#cancelCreateDialogButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Submit',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#submitCreateDialogButton',
            targetComponentId: '#createTabFormId',
          },
          type: 'Custom',
        },
        {
          name: 'Hide',
          sourceEvent: 'OnSubmit',
          ref: {
            sourceComponentId: '#createTabFormId',
            targetComponentId: '#createAlertErrorId',
          },
          type: 'Custom',
        },
        {
          name: 'Hide',
          sourceEvent: 'onActionSuccess',
          ref: {
            sourceComponentId: '#createTabFormId',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Toggle loading state',
          sourceEvent: 'onSubmit',
          ref: {
            sourceComponentId: '#createTabFormId',
            targetComponentId: '#submitCreateDialogButton',
          },
          type: 'Custom',
        },
        {
          name: 'Toggle loading state',
          sourceEvent: 'onActionDone',
          ref: {
            sourceComponentId: '#createTabFormId',
            targetComponentId: '#submitCreateDialogButton',
          },
          type: 'Custom',
        },
        {
          name: 'Show',
          sourceEvent: 'onActionSuccess',
          ref: {
            sourceComponentId: '#createTabFormId',
            targetComponentId: '#snackbarCreated',
          },
          type: 'Custom',
        },
        {
          name: 'Refetch',
          sourceEvent: 'onActionSuccess',
          ref: {
            sourceComponentId: '#createTabFormId',
            targetComponentId: '#dataTable',
          },
          type: 'Custom',
        },
        {
          name: 'Show',
          sourceEvent: 'onActionError',
          ref: {
            sourceComponentId: '#createTabFormId',
            targetComponentId: '#createAlertErrorId',
          },
          type: 'Custom',
        },
      );
      // #endregion

      // #region Update tab
      const updateResult = await prepareAction(
        updateTabForm.id,
        idProperty,
        formProperties,
        'update',
        undefined,
        undefined,
        permissions,
        pageAuthenticationProfileId,
      );
      Object.values(updateResult.variables).forEach(
        ([prop, inputVariable]): void => {
          const generateInputPrefabs = () => {
            switch (prop.kind) {
              case PropertyKind.INTEGER:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.INTEGER,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.EMAIL_ADDRESS:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.EMAIL_ADDRESS,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.DECIMAL:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.DECIMAL,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.TEXT:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.TEXT,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.PRICE:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.PRICE,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.PASSWORD:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.PASSWORD,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.DATE:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.DATE,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.DATE_TIME:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.DATE_TIME,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.TIME:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.TIME,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.FILE:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.FILE,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.IMAGE:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.IMAGE,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.BOOLEAN:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.BOOLEAN,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              case PropertyKind.LIST:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.LIST,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
              default:
                return inputStructure(
                  prop.label,
                  makeBettyUpdateInput(
                    BettyPrefabs.STRING,
                    model,
                    prop,
                    inputVariable,
                    updateResult.IdProperties,
                  ),
                );
            }
          };
          const updateFormInputPrefabs = generateInputPrefabs(); // TODO: Make this into a function, to prevent duplicate code
          if (updateFormInputPrefabs.type === 'COMPONENT') {
            setOption(
              updateFormInputPrefabs.descendants[1],
              'margin',
              (options: PrefabComponentOption) => ({
                ...options,
                value: 'none',
              }),
            );
            setOption(
              updateFormInputPrefabs.descendants[1],
              'hideLabel',
              (options: PrefabComponentOption) => ({
                ...options,
                value: true,
              }),
            );
          }
          updateTabForm.descendants.push(updateFormInputPrefabs);
        },
      );

      newPrefab.interactions.push(
        {
          name: 'Show',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#dataTableColumnUpdateButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Select',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#dataTableColumnUpdateButton',
            targetComponentId: '#updateTab',
          },
          type: 'Custom',
        },
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
            sourceComponentId: '#dataTableColumnUpdateButton',
            targetComponentId: '#updateTabFormId',
          },
          type: 'Global',
        },
        {
          name: 'Hide',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#closeUpdateDialogButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Hide',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#cancelUpdateDialogButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Select',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#deleteUpdateDialogButton',
            targetComponentId: '#deleteTabFormId',
          },
          type: 'Custom',
        },
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
            sourceComponentId: '#deleteUpdateDialogButton',
            targetComponentId: '#deleteFormId',
          },
          type: 'Global',
        },
        {
          name: 'Submit',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#submitUpdateDialogButton',
            targetComponentId: '#updateTabFormId',
          },
          type: 'Custom',
        },
        {
          name: 'Hide',
          sourceEvent: 'OnSubmit',
          ref: {
            sourceComponentId: '#updateTabFormId',
            targetComponentId: '#updateAlertErrorId',
          },
          type: 'Custom',
        },
        {
          name: 'Hide',
          sourceEvent: 'onActionSuccess',
          ref: {
            sourceComponentId: '#updateTabFormId',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Toggle loading state',
          sourceEvent: 'onActionLoad',
          ref: {
            sourceComponentId: '#updateTabFormId',
            targetComponentId: '#submitUpdateDialogButton',
          },
          type: 'Custom',
        },
        {
          name: 'Toggle loading state',
          sourceEvent: 'onActionDone',
          ref: {
            sourceComponentId: '#updateTabFormId',
            targetComponentId: '#submitUpdateDialogButton',
          },
          type: 'Custom',
        },
        {
          name: 'Show',
          sourceEvent: 'onActionSuccess',
          ref: {
            sourceComponentId: '#updateTabFormId',
            targetComponentId: '#snackbarUpdated',
          },
          type: 'Custom',
        },
        {
          name: 'Refetch',
          sourceEvent: 'onActionSuccess',
          ref: {
            sourceComponentId: '#updateTabFormId',
            targetComponentId: '#dataTable',
          },
          type: 'Custom',
        },
        {
          name: 'Show',
          sourceEvent: 'onActionError',
          ref: {
            sourceComponentId: '#updateTabFormId',
            targetComponentId: '#updateAlertErrorId',
          },
          type: 'Custom',
        },
      );
      // #endregion

      // #region Details tab
      const editTabContent = getDescendantByRef(
        '#detailsTabContentBox',
        newPrefab.structure,
      );

      const DataTableStructure = cloneStructure('Data container');
      const modelOption = DataTableStructure.options.find(
        (o: { key: string }) => o.key === 'model',
      ) as ValueDefault;
      modelOption.value = modelId;
      DataTableStructure.ref = { id: '#detailsDataContainer' };

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const newDetailInput = (property: any) => {
        const boxStructure = cloneStructure('Box');
        setOption(
          boxStructure,
          'alignment',
          (options: PrefabComponentOption) => ({
            ...options,
            value: 'center',
          }),
        );
        setOption(
          boxStructure,
          'valignment',
          (options: PrefabComponentOption) => ({
            ...options,
            value: 'center',
          }),
        );
        setOption(
          boxStructure,
          'outerSpacing',
          (options: PrefabComponentOption) => ({
            ...options,
            value: ['0rem', 'M', 'M', 'M'],
          }),
        );
        setOption(
          boxStructure,
          'innerSpacing',
          (options: PrefabComponentOption) => ({
            ...options,
            value: ['0rem', '0rem', '0rem', '0rem'],
          }),
        );
        setOption(
          boxStructure,
          'backgroundColor',
          (options: PrefabComponentOption) => ({
            ...options,
            value: 'light',
          }),
        );
        setOption(
          boxStructure,
          'backgroundColorAlpha',
          (options: PrefabComponentOption) => ({
            ...options,
            value: 20,
          }),
        );

        const rowColumnStructure = cloneStructure('2 Columns');
        const textStructure = cloneStructure('Text');
        const textDataStructure = cloneStructure('Text');

        setOption(
          rowColumnStructure,
          'maxRowWidth',
          (options: PrefabComponentOption) => ({
            ...options,
            value: 'full',
          }),
        );
        setOption(
          rowColumnStructure.descendants[0],
          'columnWidth',
          (options: PrefabComponentOption) => ({
            ...options,
            value: 'flexible',
          }),
        );
        setOption(
          rowColumnStructure.descendants[0],
          'columnWidthTabletLandscape',
          (options: PrefabComponentOption) => ({
            ...options,
            value: 'flexible',
          }),
        );
        setOption(
          rowColumnStructure.descendants[0],
          'columnWidthTabletPortrait',
          (options: PrefabComponentOption) => ({
            ...options,
            value: 'flexible',
          }),
        );
        setOption(
          rowColumnStructure.descendants[0],
          'columnWidthMobile',
          (options: PrefabComponentOption) => ({
            ...options,
            value: 'flexible',
          }),
        );
        rowColumnStructure.descendants[0].descendants.push(textStructure);
        setOption(
          textStructure,
          'content',
          (options: PrefabComponentOption) => ({
            ...options,
            value: [property.label],
          }),
        );
        setOption(
          rowColumnStructure.descendants[0].descendants[0],
          'fontWeight',
          (options: PrefabComponentOption) => ({
            ...options,
            value: '500',
          }),
        );
        // Second Column
        setOption(
          rowColumnStructure.descendants[1],
          'columnWidth',
          (options: PrefabComponentOption) => ({
            ...options,
            value: '8',
          }),
        );
        setOption(
          rowColumnStructure.descendants[1],
          'columnWidthTabletLandscape',
          (options: PrefabComponentOption) => ({
            ...options,
            value: '8',
          }),
        );
        setOption(
          rowColumnStructure.descendants[1],
          'columnWidthTabletPortrait',
          (options: PrefabComponentOption) => ({
            ...options,
            value: '12',
          }),
        );
        setOption(
          rowColumnStructure.descendants[1],
          'columnWidthMobile',
          (options: PrefabComponentOption) => ({
            ...options,
            value: '12',
          }),
        );
        setOption(
          rowColumnStructure.descendants[1],
          'horizontalAlignment',
          (options: PrefabComponentOption) => ({
            ...options,
            value: 'flex-end',
          }),
        );
        rowColumnStructure.descendants[1].descendants.push(textDataStructure);
        setOption(
          textDataStructure,
          'content',
          (options: PrefabComponentOption) => ({
            ...options,
            value: [enrichVarObj(property)], // This currently creates a long string id... Fix this pls
          }),
        );

        boxStructure.descendants.push(rowColumnStructure);
        return boxStructure;
      };
      Object.values(properties).forEach((props: any) => {
        DataTableStructure.descendants.push(newDetailInput(props));
      });
      editTabContent.descendants.push(DataTableStructure);
      newPrefab.interactions.push(
        {
          name: 'Show',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#dataTableColumnDetailsButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Select',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#dataTableColumnDetailsButton',
            targetComponentId: '#detailsTab',
          },
          type: 'Custom',
        },
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
            sourceComponentId: '#dataTableColumnDetailsButton',
            targetComponentId: '#detailsDataContainer',
          },
          type: 'Global',
        },
        {
          name: 'Hide',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#closeDetailsDialogButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Hide',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#cancelDetailsDialogButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },

        {
          name: 'Select',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#deleteDetailsDialogButton',
            targetComponentId: '#deleteTabFormId',
          },
          type: 'Custom',
        },
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
            sourceComponentId: '#deleteDetailsDialogButton',
            targetComponentId: '#deleteFormId',
          },
          type: 'Global',
        },

        {
          name: 'Select',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#editDetailsDialogButton',
            targetComponentId: '#updateTab',
          },
          type: 'Custom',
        },
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
            sourceComponentId: '#editDetailsDialogButton',
            targetComponentId: '#updateTabFormId',
          },
          type: 'Global',
        },
      );
      // #endregion

      // #region Delete tab
      const deleteTabBox = getDescendantByRef(
        '#deleteTabContentBox',
        newPrefab.structure,
      );
      const deleteConfirmationText = cloneStructure('Text');

      setOption(
        deleteConfirmationText,
        'content',
        (options: PrefabComponentOption) => ({
          ...options,
          value: [
            `Are you sure you want to delete this record? You can't undo this action.`,
          ],
        }),
      );
      deleteTabBox.descendants.push(deleteConfirmationText);
      const deleteButtonId = createUuid();
      const deleteForm = getDescendantByRef(
        '#deleteFormId',
        newPrefab.structure,
      );
      deleteForm.id = deleteButtonId;
      const deleteResult = await prepareAction(
        deleteButtonId,
        idProperty,
        null,
        'delete',
      );

      const deleteSubmitButton = cloneStructure('Submit Button');
      deleteSubmitButton.ref = { id: '#submitDeleteDialogButton' };
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
      setOption(deleteSubmitButton, 'buttonText', (options: any) => ({
        ...options,
        value: ['Delete'],
      }));

      deleteForm.descendants.push(deleteSubmitButton);
      newPrefab.interactions.push(
        {
          name: 'Show',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#dataTableColumnDeleteButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Select',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#dataTableColumnDeleteButton',
            targetComponentId: '#deleteTabFormId',
          },
          type: 'Custom',
        },
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
            sourceComponentId: '#dataTableColumnDeleteButton',
            targetComponentId: '#deleteFormId',
          },
          type: 'Global',
        },
        {
          name: 'Hide',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#closeDeleteDialogButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Hide',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#cancelDeleteDialogButton',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Submit',
          sourceEvent: 'Click',
          ref: {
            sourceComponentId: '#submitDeleteDialogButton',
            targetComponentId: '#deleteFormId',
          },
          type: 'Custom',
        },
        {
          name: 'Hide',
          sourceEvent: 'onActionSuccess',
          ref: {
            sourceComponentId: '#deleteFormId',
            targetComponentId: '#crudDialogVisibility',
          },
          type: 'Custom',
        },
        {
          name: 'Show',
          sourceEvent: 'onActionSuccess',
          ref: {
            sourceComponentId: '#deleteFormId',
            targetComponentId: '#snackbarDeleted',
          },
          type: 'Custom',
        },
        {
          name: 'Refetch',
          sourceEvent: 'onActionSuccess',
          ref: {
            sourceComponentId: '#deleteFormId',
            targetComponentId: '#dataTable',
          },
          type: 'Custom',
        },
      );
      // #endregion

      setOption(createTabForm, 'actionId', (options: any) => ({
        ...options,
        value: createResult.action.actionId,
        configuration: { disabled: true },
      }));
      setOption(createTabForm, 'model', (options: any) => ({
        ...options,
        value: modelId,
        configuration: {
          disabled: true,
        },
      }));
      setOption(updateTabForm, 'actionId', (options: any) => ({
        ...options,
        value: updateResult.action.actionId,
        configuration: { disabled: true },
      }));
      setOption(updateTabForm, 'recordVariable', (options: any) => ({
        ...options,
        value: updateResult.recordInputVariable.id,
      }));
      setOption(updateTabForm, 'model', (options: any) => ({
        ...options,
        value: modelId,
        configuration: {
          disabled: true,
        },
      }));
      setOption(deleteForm, 'actionId', (options: any) => ({
        ...options,
        value: deleteResult.action.actionId,
        configuration: { disabled: true },
      }));
      setOption(deleteForm, 'recordVariable', (options: any) => ({
        ...options,
        value: deleteResult.recordInputVariable.id,
      }));
      setOption(deleteForm, 'model', (options: any) => ({
        ...options,
        value: modelId,
        configuration: {
          disabled: true,
        },
      }));

      // #region Partial selector
      const prefabFooter = getDescendantByRef('#Footer', newPrefab.structure);
      const prefabHeader = getDescendantByRef('#Header', newPrefab.structure);
      if (headerPartialId) {
        prefabHeader.descendants = [
          {
            ref: { id: '#headerPartial' },
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
                componentId: '#headerPartial',
              },
            },
          });
        }
      }

      if (footerPartialId) {
        prefabFooter.descendants = [
          {
            ref: { id: '#footerPartial' },
            type: 'PARTIAL',
            partialId: footerPartialId,
          },
        ];
      }

      // #endregion
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
              const newStepnumber = stepNumber + 1;
              setStepNumber(newStepnumber);
            }}
            primary
          />
        </Box>
        <Box>
          <Footer onClose={close} canSave={canSave} onSave={stepper.onSave} />
        </Box>
      </Box>
    ),
    progressBar: () => {
      return (
        <Box
          justify="center"
          margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
        >
          <Text size="medium" weight="bold">{`Step: ${stepNumber + 1} / ${
            stepper.stepAmount + 1
          }`}</Text>
        </Box>
      );
    },
    stepAmount: 2,
  };
  return (
    <>
      <Header onClose={close} title="Configure CRUD with dialogs" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default makePrefab('Crud with dialogs', attrs, beforeCreate, [
  wrapper(
    {
      label: 'CRUD with Dialogs wrapper',
      optionCategories: [
        {
          label: 'Dialog title',
          expanded: true,
          members: [
            'createDialogTitle',
            'updateDialogTitle',
            'detailsDialogTitle',
            'deleteDialogTitle',
          ],
          condition: {
            type: 'SHOW',
            option: 'dialogVisibility',
            comparator: 'EQ',
            value: true,
          },
        },
      ],
      options: {
        dialogVisibility: linked({
          label: 'Visibility',
          value: {
            ref: {
              componentId: '#crudDialogVisibility',
              optionId: '#crudVisibility',
            },
          },
          configuration: {
            as: 'BUTTONGROUP',
            allowedInput: [
              { name: 'Overview', value: false },
              { name: 'Dialog', value: true },
            ],
          },
        }),
        titleOption: linked({
          label: 'Page title',
          value: {
            ref: {
              componentId: '#modelTitle',
              optionId: '#titleOption',
            },
          },
          configuration: {
            condition: showIf('dialogVisibility', 'EQ', false),
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
            condition: showIf('dialogVisibility', 'EQ', false),
          },
        }),
        crudTabs: linked({
          label: 'CRUD dialog tabs',
          value: {
            ref: {
              componentId: '#DialogTabs',
              optionId: '#selectedTabs',
            },
          },
          configuration: {
            as: 'BUTTONGROUP',
            condition: {
              type: 'SHOW',
              option: 'dialogVisibility',
              comparator: 'EQ',
              value: true,
            },
          },
        }),
        createDialogTitle: linked({
          label: 'Create tab title',
          value: {
            ref: {
              componentId: '#createDialogTitle',
              optionId: '#createDialogTitleOption',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'crudTabs',
              comparator: 'EQ',
              value: 1,
            },
          },
        }),
        updateDialogTitle: linked({
          label: 'Update tab title',
          value: {
            ref: {
              componentId: '#updateDialogTitle',
              optionId: '#updateDialogTitleOption',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'crudTabs',
              comparator: 'EQ',
              value: 2,
            },
          },
        }),
        detailsDialogTitle: linked({
          label: 'Details tab title',
          value: {
            ref: {
              componentId: '#detailsDialogTitle',
              optionId: '#detailsDialogTitleOption',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'crudTabs',
              comparator: 'EQ',
              value: 3,
            },
          },
        }),
        deleteDialogTitle: linked({
          label: 'Delete tab title',
          value: {
            ref: {
              componentId: '#deleteDialogTitle',
              optionId: '#deleteDialogTitleOption',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'crudTabs',
              comparator: 'EQ',
              value: 4,
            },
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
                      prefabBox(
                        {
                          ref: { id: '#Header' },
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                            }),
                          },
                        },
                        [
                          Column(
                            {
                              options: {
                                ...columnOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                              },
                            },
                            [
                              prefabBox(
                                {
                                  ref: { id: '#headerPartial' },
                                  options: {
                                    ...boxOptions,
                                    innerSpacing: sizes('Inner space', {
                                      value: ['0rem', '0rem', '0rem', '0rem'],
                                    }),
                                    backgroundOptions: toggle(
                                      'Show background options',
                                      {
                                        value: true,
                                      },
                                    ),
                                    backgroundColor: color('Background color', {
                                      value: ThemeColor.PRIMARY,
                                      configuration: {
                                        condition: showIf(
                                          'backgroundOptions',
                                          'EQ',
                                          true,
                                        ),
                                      },
                                    }),
                                  },
                                },
                                [
                                  Row({}, [
                                    Column(
                                      {
                                        options: {
                                          ...columnOptions,
                                          innerSpacing: sizes('Inner space', {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                          }),
                                        },
                                      },
                                      [
                                        AppBar(
                                          {
                                            options: {
                                              ...appBarOptions,
                                              logoSource: variable('Logo', {
                                                value: [
                                                  'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                                                ],
                                              }),
                                              title: variable('Title', {
                                                value: [],
                                              }),
                                            },
                                          },
                                          [
                                            OpenPageButton(
                                              {
                                                style: {
                                                  overwrite: {
                                                    backgroundColor: {
                                                      type: 'STATIC',
                                                      value: 'transparent',
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
                                                    padding: ['0rem', '0rem'],
                                                    textDecoration: 'none',
                                                    textTransform: 'none',
                                                  },
                                                },
                                                options: {
                                                  ...openPageButtonOptions,
                                                  buttonText: variable(
                                                    'Button text',
                                                    { value: ['Menu 1'] },
                                                  ),
                                                  outerSpacing: sizes(
                                                    'Outer space',
                                                    {
                                                      value: [
                                                        '0rem',
                                                        'M',
                                                        '0rem',
                                                        'M',
                                                      ],
                                                    },
                                                  ),
                                                },
                                              },
                                              [],
                                            ),
                                            OpenPageButton(
                                              {
                                                style: {
                                                  overwrite: {
                                                    backgroundColor: {
                                                      type: 'STATIC',
                                                      value: 'transparent',
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
                                                    padding: ['0rem', '0rem'],
                                                    textDecoration: 'none',
                                                    textTransform: 'none',
                                                  },
                                                },
                                                options: {
                                                  ...openPageButtonOptions,
                                                  buttonText: variable(
                                                    'Button text',
                                                    { value: ['Menu 2'] },
                                                  ),
                                                  outerSpacing: sizes(
                                                    'Outer space',
                                                    {
                                                      value: [
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
                                          ],
                                        ),
                                      ],
                                    ),
                                  ]),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                      prefabBox(
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
                            backgroundColor: color('Background color', {
                              value: ThemeColor.LIGHT,
                              configuration: {
                                condition: showIf(
                                  'backgroundOptions',
                                  'EQ',
                                  true,
                                ),
                              },
                            }),
                            backgroundColorAlpha: option('NUMBER', {
                              label: 'Background color opacity',
                              value: 20,
                              configuration: {
                                condition: showIf(
                                  'backgroundOptions',
                                  'EQ',
                                  true,
                                ),
                              },
                            }),
                          },
                        },
                        [
                          Row({}, [
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
                                  }),
                                  columnWidthTabletLandscape: option('CUSTOM', {
                                    label: 'Column width (tablet landscape)',
                                    value: '12',
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
                                  }),
                                  columnWidthTabletPortrait: option('CUSTOM', {
                                    value: '12',
                                    label: 'Column width (tablet portrait)',
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
                                  }),
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
                                  }),
                                  innerSpacing: sizes('Inner space', {
                                    value: ['L', 'L', 'L', 'L'],
                                  }),
                                },
                              },
                              [
                                prefabBox(
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
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                  },
                                  [
                                    prefabText(
                                      {
                                        ref: { id: '#modelTitle' },
                                        options: {
                                          ...textOptions,
                                          content: variable('Content', {
                                            ref: { id: '#titleOption' },
                                            value: [],
                                            configuration: { as: 'MULTILINE' },
                                          }),
                                          useInnerHtml: toggle(
                                            'Display Rich Text',
                                            {
                                              value: false,
                                            },
                                          ),
                                          type: font('Text style', {
                                            value: ['Title4'],
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    prefabButton(
                                      {
                                        ref: { id: '#newRecordButton' },
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
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['New'],
                                          }),
                                          icon: icon('Icon', { value: 'Add' }),
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                                DataTable(
                                  {
                                    ref: { id: '#dataTable' },
                                    options: {
                                      ...dataTableOptions,
                                      take: option('CUSTOM', {
                                        value: '10',
                                        label: 'Rows per page',
                                        configuration: {
                                          as: 'DROPDOWN',
                                          dataType: 'string',
                                          dependsOn: 'model',
                                          allowedInput: [
                                            { name: '5', value: '5' },
                                            { name: '10', value: '10' },
                                            { name: '25', value: '25' },
                                            { name: '50', value: '50' },
                                            { name: '100', value: '100' },
                                          ],
                                          condition: hideIf(
                                            'autoLoadOnScroll',
                                            'EQ',
                                            true,
                                          ),
                                        },
                                      }),
                                      placeholderTake: number(
                                        'Placeholder rows',
                                        {
                                          value: '10',
                                        },
                                      ),

                                      background: color('Background', {
                                        value: ThemeColor.WHITE,
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['L', '0rem', 'L', '0rem'],
                                      }),
                                      reconfigure: reconfigure('Reconfigure', {
                                        ref: {
                                          id: '#reconfigure',
                                        },
                                        value: {
                                          children,
                                          reconfigureWizardType:
                                            'PropertiesSelector',
                                        },
                                      }),
                                    },
                                  },
                                  [
                                    DataTableColumn(
                                      {
                                        options: {
                                          ...dataTableColumnOptions,
                                          width: size('Width', {
                                            value: '200px',
                                            configuration: {
                                              as: 'UNIT',
                                            },
                                          }),
                                          outerSpacing: sizes('Outer space', {
                                            value: ['L', '0rem', 'L', '0rem'],
                                          }),
                                        },
                                      },
                                      [
                                        prefabBox(
                                          {
                                            ref: {
                                              id: '#dataTableColumnButtonBox',
                                            },
                                            options: {
                                              ...boxOptions,
                                              alignment: buttongroup(
                                                'Alignment',
                                                [
                                                  ['None', 'none'],
                                                  ['Left', 'flex-start'],
                                                  ['Center', 'center'],
                                                  ['Right', 'flex-end'],
                                                  [
                                                    'Justified',
                                                    'space-between',
                                                  ],
                                                ],
                                                {
                                                  value: 'flex-end',
                                                  configuration: {
                                                    dataType: 'string',
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
                                            prefabButton(
                                              {
                                                ref: {
                                                  id: '#dataTableColumnDetailsButton',
                                                },
                                                style: {
                                                  overwrite: {
                                                    backgroundColor: {
                                                      type: 'STATIC',
                                                      value: 'transparent',
                                                    },
                                                    boxShadow: 'none',
                                                    color: {
                                                      type: 'THEME_COLOR',
                                                      value: 'secondary',
                                                    },
                                                    fontFamily: 'Roboto',
                                                    fontSize: '0.875rem',
                                                    fontStyle: 'none',
                                                    fontWeight: '400',
                                                    padding: [
                                                      '0.6875rem',
                                                      '0.6875rem',
                                                    ],
                                                    textDecoration: 'none',
                                                    textTransform: 'none',
                                                  },
                                                },

                                                options: {
                                                  ...buttonOptions,
                                                  buttonText: variable(
                                                    'Button text',
                                                    { value: [''] },
                                                  ),
                                                  icon: icon('Icon', {
                                                    value: 'Info',
                                                  }),
                                                },
                                              },
                                              [],
                                            ),
                                            prefabButton(
                                              {
                                                ref: {
                                                  id: '#dataTableColumnUpdateButton',
                                                },
                                                style: {
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
                                                    padding: [
                                                      '0.6875rem',
                                                      '0.6875rem',
                                                    ],
                                                    textDecoration: 'none',
                                                    textTransform: 'none',
                                                  },
                                                },
                                                options: {
                                                  ...buttonOptions,
                                                  buttonText: variable(
                                                    'Button text',
                                                    { value: [''] },
                                                  ),
                                                  icon: icon('Icon', {
                                                    value: 'Edit',
                                                  }),
                                                },
                                              },
                                              [],
                                            ),
                                            prefabButton(
                                              {
                                                ref: {
                                                  id: '#dataTableColumnDeleteButton',
                                                },
                                                style: {
                                                  overwrite: {
                                                    backgroundColor: {
                                                      type: 'STATIC',
                                                      value: 'transparent',
                                                    },
                                                    boxShadow: 'none',
                                                    color: {
                                                      type: 'THEME_COLOR',
                                                      value: 'danger',
                                                    },
                                                    fontFamily: 'Roboto',
                                                    fontSize: '0.875rem',
                                                    fontStyle: 'none',
                                                    fontWeight: '400',
                                                    padding: [
                                                      '0.6875rem',
                                                      '0.6875rem',
                                                    ],
                                                    textDecoration: 'none',
                                                    textTransform: 'none',
                                                  },
                                                },
                                                options: {
                                                  ...buttonOptions,
                                                  buttonText: variable(
                                                    'Button text',
                                                    { value: [''] },
                                                  ),
                                                  icon: icon('Icon', {
                                                    value: 'Delete',
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
                                Dialog(
                                  {
                                    label: 'CRUD dialog',
                                    ref: {
                                      id: '#crudDialogVisibility',
                                    },
                                    options: {
                                      ...dialogOptions,
                                      isVisible: toggle('Visible in builder', {
                                        ref: { id: '#crudVisibility' },
                                        value: false,
                                        configuration: { as: 'VISIBILITY' },
                                      }),
                                      invisible: toggle('Invisible', {
                                        value: true,
                                      }),
                                    },
                                  },
                                  [
                                    Paper(
                                      {
                                        options: {
                                          ...paperOptions,
                                          variant: option('CUSTOM', {
                                            label: 'Variant',
                                            value: 'flat',
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
                                            Column({}, [
                                              Tabs(
                                                {
                                                  ref: { id: '#DialogTabs' },
                                                  options: {
                                                    ...tabsOptions,
                                                    selectedDesignTabIndex:
                                                      childSelector(
                                                        'Selected tab (design)',
                                                        {
                                                          ref: {
                                                            id: '#selectedTabs',
                                                          },
                                                          value: 1,
                                                        },
                                                      ),
                                                    height: size('Height', {
                                                      value: '100%',
                                                      configuration: {
                                                        as: 'UNIT',
                                                      },
                                                    }),
                                                    hideTabs: toggle(
                                                      'Hide visual tabs',
                                                      { value: true },
                                                    ),
                                                  },
                                                },
                                                [
                                                  Tab(
                                                    {
                                                      label: 'Create',
                                                      ref: { id: '#createTab' },
                                                      options: {
                                                        ...tabOptions,
                                                        label: variable(
                                                          'Tab label',
                                                          { value: ['Create'] },
                                                        ),
                                                      },
                                                    },
                                                    [
                                                      prefabBox(
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

                                                            innerSpacing: sizes(
                                                              'Inner space',
                                                              {
                                                                value: [
                                                                  'M',
                                                                  'M',
                                                                  '0rem',
                                                                  'M',
                                                                ],
                                                              },
                                                            ),
                                                          },
                                                        },
                                                        [
                                                          prefabText(
                                                            {
                                                              ref: {
                                                                id: '#createDialogTitle',
                                                              },
                                                              options: {
                                                                ...textOptions,
                                                                content:
                                                                  variable(
                                                                    'Content',
                                                                    {
                                                                      ref: {
                                                                        id: '#createDialogTitleOption',
                                                                      },
                                                                      value: [
                                                                        'Create',
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
                                                                    value: [
                                                                      'Title4',
                                                                    ],
                                                                  },
                                                                ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                          prefabButton(
                                                            {
                                                              ref: {
                                                                id: '#closeCreateDialogButton',
                                                              },
                                                              style: {
                                                                overwrite: {
                                                                  backgroundColor:
                                                                    {
                                                                      type: 'STATIC',
                                                                      value:
                                                                        'Transparent',
                                                                    },
                                                                  boxShadow:
                                                                    'none',
                                                                  color: {
                                                                    type: 'THEME_COLOR',
                                                                    value:
                                                                      'light',
                                                                  },
                                                                  padding: [
                                                                    '0rem',
                                                                  ],
                                                                },
                                                              },
                                                              options: {
                                                                ...buttonOptions,
                                                                buttonText:
                                                                  variable(
                                                                    'Button text',
                                                                    {
                                                                      value: [],
                                                                    },
                                                                  ),
                                                                icon: icon(
                                                                  'Icon',
                                                                  {
                                                                    value:
                                                                      'Close',
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
                                                            },
                                                            [],
                                                          ),
                                                        ],
                                                      ),
                                                      prefabBox(
                                                        {
                                                          ref: {
                                                            id: '#createTabContentBox',
                                                          },
                                                        },
                                                        [
                                                          component(
                                                            'Form',
                                                            {
                                                              ref: {
                                                                id: '#createTabFormId',
                                                              },
                                                              options: defaults,
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
                                                      prefabBox(
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
                                                          prefabButton(
                                                            {
                                                              ref: {
                                                                id: '#cancelCreateDialogButton',
                                                              },
                                                              style: {
                                                                name: 'outline',
                                                                overwrite: {
                                                                  fontWeight:
                                                                    '400',
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
                                                                        'Cancel',
                                                                      ],
                                                                    },
                                                                  ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                          prefabButton(
                                                            {
                                                              ref: {
                                                                id: '#submitCreateDialogButton',
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
                                                              options: {
                                                                ...buttonOptions,
                                                                buttonText:
                                                                  variable(
                                                                    'Button text',
                                                                    {
                                                                      value: [
                                                                        'Save',
                                                                      ],
                                                                    },
                                                                  ),
                                                                icon: icon(
                                                                  'Icon',
                                                                  {
                                                                    value:
                                                                      'Save',
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
                                                  Tab(
                                                    {
                                                      label: 'Update',
                                                      ref: { id: '#updateTab' },
                                                      options: {
                                                        ...tabOptions,
                                                        label: variable(
                                                          'Tab label',
                                                          { value: ['Update'] },
                                                        ),
                                                      },
                                                    },
                                                    [
                                                      prefabBox(
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

                                                            innerSpacing: sizes(
                                                              'Inner space',
                                                              {
                                                                value: [
                                                                  'M',
                                                                  'M',
                                                                  '0rem',
                                                                  'M',
                                                                ],
                                                              },
                                                            ),
                                                          },
                                                        },
                                                        [
                                                          prefabText(
                                                            {
                                                              ref: {
                                                                id: '#updateDialogTitle',
                                                              },
                                                              options: {
                                                                ...textOptions,
                                                                content:
                                                                  variable(
                                                                    'Content',
                                                                    {
                                                                      ref: {
                                                                        id: '#updateDialogTitleOption',
                                                                      },

                                                                      value: [
                                                                        'Update',
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
                                                                    value: [
                                                                      'Title4',
                                                                    ],
                                                                  },
                                                                ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                          prefabButton(
                                                            {
                                                              ref: {
                                                                id: '#closeUpdateDialogButton',
                                                              },
                                                              style: {
                                                                overwrite: {
                                                                  backgroundColor:
                                                                    {
                                                                      type: 'STATIC',
                                                                      value:
                                                                        'Transparent',
                                                                    },
                                                                  boxShadow:
                                                                    'none',
                                                                  color: {
                                                                    type: 'THEME_COLOR',
                                                                    value:
                                                                      'light',
                                                                  },
                                                                  padding: [
                                                                    '0rem',
                                                                  ],
                                                                },
                                                              },
                                                              options: {
                                                                ...buttonOptions,
                                                                buttonText:
                                                                  variable(
                                                                    'Button text',
                                                                    {
                                                                      value: [],
                                                                    },
                                                                  ),
                                                                icon: icon(
                                                                  'Icon',
                                                                  {
                                                                    value:
                                                                      'Close',
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
                                                            },
                                                            [],
                                                          ),
                                                        ],
                                                      ),
                                                      prefabBox(
                                                        {
                                                          ref: {
                                                            id: '#updateTabContentBox',
                                                          },
                                                        },
                                                        [
                                                          component(
                                                            'Form',
                                                            {
                                                              ref: {
                                                                id: '#updateTabFormId',
                                                              },
                                                              options: defaults,
                                                            },
                                                            [
                                                              FormErrorAlert({
                                                                ref: {
                                                                  id: '#updateAlertErrorId',
                                                                },
                                                              }),
                                                            ],
                                                          ),
                                                        ],
                                                      ),
                                                      prefabBox(
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
                                                          prefabButton(
                                                            {
                                                              ref: {
                                                                id: '#cancelUpdateDialogButton',
                                                              },
                                                              style: {
                                                                name: 'outline',
                                                                overwrite: {
                                                                  fontWeight:
                                                                    '400',
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
                                                                        'Cancel',
                                                                      ],
                                                                    },
                                                                  ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                          prefabBox(
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
                                                              },
                                                            },
                                                            [
                                                              prefabButton(
                                                                {
                                                                  ref: {
                                                                    id: '#deleteUpdateDialogButton',
                                                                  },
                                                                  style: {
                                                                    name: 'outline',
                                                                    overwrite: {
                                                                      borderColor:
                                                                        {
                                                                          type: 'THEME_COLOR',
                                                                          value:
                                                                            'danger',
                                                                        },
                                                                      color: {
                                                                        type: 'THEME_COLOR',
                                                                        value:
                                                                          'danger',
                                                                      },
                                                                      fontWeight:
                                                                        '400',
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
                                                                          value:
                                                                            [
                                                                              'Delete',
                                                                            ],
                                                                        },
                                                                      ),
                                                                    icon: icon(
                                                                      'Icon',
                                                                      {
                                                                        value:
                                                                          'Delete',
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
                                                              prefabButton(
                                                                {
                                                                  ref: {
                                                                    id: '#submitUpdateDialogButton',
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
                                                                  options: {
                                                                    ...buttonOptions,
                                                                    buttonText:
                                                                      variable(
                                                                        'Button text',
                                                                        {
                                                                          value:
                                                                            [
                                                                              'Save',
                                                                            ],
                                                                        },
                                                                      ),
                                                                    icon: icon(
                                                                      'Icon',
                                                                      {
                                                                        value:
                                                                          'Save',
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
                                                  Tab(
                                                    {
                                                      label: 'Details',
                                                      ref: {
                                                        id: '#detailsTab',
                                                      },
                                                      options: {
                                                        ...tabOptions,
                                                        label: variable(
                                                          'Tab label',
                                                          { value: ['Edit'] },
                                                        ),
                                                      },
                                                    },
                                                    [
                                                      prefabBox(
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

                                                            innerSpacing: sizes(
                                                              'Inner space',
                                                              {
                                                                value: [
                                                                  'M',
                                                                  'M',
                                                                  '0rem',
                                                                  'M',
                                                                ],
                                                              },
                                                            ),
                                                          },
                                                        },
                                                        [
                                                          prefabText(
                                                            {
                                                              ref: {
                                                                id: '#detailsDialogTitle',
                                                              },
                                                              options: {
                                                                ...textOptions,
                                                                content:
                                                                  variable(
                                                                    'Content',
                                                                    {
                                                                      ref: {
                                                                        id: '#detailsDialogTitleOption',
                                                                      },

                                                                      value: [
                                                                        'Details',
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
                                                                    value: [
                                                                      'Title4',
                                                                    ],
                                                                  },
                                                                ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                          prefabButton(
                                                            {
                                                              ref: {
                                                                id: '#closeDetailsDialogButton',
                                                              },
                                                              style: {
                                                                overwrite: {
                                                                  backgroundColor:
                                                                    {
                                                                      type: 'STATIC',
                                                                      value:
                                                                        'Transparent',
                                                                    },
                                                                  boxShadow:
                                                                    'none',
                                                                  color: {
                                                                    type: 'THEME_COLOR',
                                                                    value:
                                                                      'light',
                                                                  },
                                                                  padding: [
                                                                    '0rem',
                                                                  ],
                                                                },
                                                              },
                                                              options: {
                                                                ...buttonOptions,
                                                                buttonText:
                                                                  variable(
                                                                    'Button text',
                                                                    {
                                                                      value: [],
                                                                    },
                                                                  ),
                                                                icon: icon(
                                                                  'Icon',
                                                                  {
                                                                    value:
                                                                      'Close',
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
                                                            },
                                                            [],
                                                          ),
                                                        ],
                                                      ),
                                                      prefabBox(
                                                        {
                                                          ref: {
                                                            id: '#detailsTabContentBox',
                                                          },
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
                                                        [],
                                                      ),
                                                      prefabBox(
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
                                                          prefabButton(
                                                            {
                                                              ref: {
                                                                id: '#cancelDetailsDialogButton',
                                                              },
                                                              style: {
                                                                name: 'outline',
                                                                overwrite: {
                                                                  fontWeight:
                                                                    '400',
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
                                                                        'Cancel',
                                                                      ],
                                                                    },
                                                                  ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                          prefabBox(
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
                                                              },
                                                            },
                                                            [
                                                              prefabButton(
                                                                {
                                                                  ref: {
                                                                    id: '#deleteDetailsDialogButton',
                                                                  },
                                                                  style: {
                                                                    name: 'outline',
                                                                    overwrite: {
                                                                      borderColor:
                                                                        {
                                                                          type: 'THEME_COLOR',
                                                                          value:
                                                                            'danger',
                                                                        },
                                                                      color: {
                                                                        type: 'THEME_COLOR',
                                                                        value:
                                                                          'danger',
                                                                      },
                                                                      fontWeight:
                                                                        '400',
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
                                                                          value:
                                                                            [
                                                                              'Delete',
                                                                            ],
                                                                        },
                                                                      ),
                                                                    icon: icon(
                                                                      'Icon',
                                                                      {
                                                                        value:
                                                                          'Delete',
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
                                                              prefabButton(
                                                                {
                                                                  ref: {
                                                                    id: '#editDetailsDialogButton',
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
                                                                  options: {
                                                                    ...buttonOptions,
                                                                    buttonText:
                                                                      variable(
                                                                        'Button text',
                                                                        {
                                                                          value:
                                                                            [
                                                                              'Edit',
                                                                            ],
                                                                        },
                                                                      ),
                                                                    icon: icon(
                                                                      'Icon',
                                                                      {
                                                                        value:
                                                                          'Edit',
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
                                                  Tab(
                                                    {
                                                      ref: {
                                                        id: '#deleteTabFormId',
                                                      },
                                                      label: 'Delete',
                                                      options: {
                                                        ...tabOptions,
                                                        label: variable(
                                                          'Tab label',
                                                          {
                                                            value: [
                                                              'Delete tab',
                                                            ],
                                                          },
                                                        ),
                                                      },
                                                    },
                                                    [
                                                      prefabBox(
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

                                                            innerSpacing: sizes(
                                                              'Inner space',
                                                              {
                                                                value: [
                                                                  'M',
                                                                  'M',
                                                                  '0rem',
                                                                  'M',
                                                                ],
                                                              },
                                                            ),
                                                          },
                                                        },
                                                        [
                                                          prefabText(
                                                            {
                                                              ref: {
                                                                id: '#deleteDialogTitle',
                                                              },
                                                              options: {
                                                                ...textOptions,
                                                                content:
                                                                  variable(
                                                                    'Content',
                                                                    {
                                                                      ref: {
                                                                        id: '#deleteDialogTitleOption',
                                                                      },
                                                                      value: [
                                                                        'Delete',
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
                                                                    value: [
                                                                      'Title4',
                                                                    ],
                                                                  },
                                                                ),
                                                              },
                                                            },
                                                            [],
                                                          ),
                                                          prefabButton(
                                                            {
                                                              ref: {
                                                                id: '#closeDeleteDialogButton',
                                                              },
                                                              style: {
                                                                overwrite: {
                                                                  backgroundColor:
                                                                    {
                                                                      type: 'STATIC',
                                                                      value:
                                                                        'Transparent',
                                                                    },
                                                                  boxShadow:
                                                                    'none',
                                                                  color: {
                                                                    type: 'THEME_COLOR',
                                                                    value:
                                                                      'light',
                                                                  },
                                                                  padding: [
                                                                    '0rem',
                                                                  ],
                                                                },
                                                              },
                                                              options: {
                                                                ...buttonOptions,
                                                                buttonText:
                                                                  variable(
                                                                    'Button text',
                                                                    {
                                                                      value: [],
                                                                    },
                                                                  ),
                                                                icon: icon(
                                                                  'Icon',
                                                                  {
                                                                    value:
                                                                      'Close',
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
                                                            },
                                                            [],
                                                          ),
                                                        ],
                                                      ),
                                                      prefabBox(
                                                        {
                                                          ref: {
                                                            id: '#deleteTabContentBox',
                                                          },
                                                          options: {
                                                            ...boxOptions,
                                                            innerSpacing: sizes(
                                                              'Inner space',
                                                              {
                                                                value: [
                                                                  '0rem',
                                                                  'M',
                                                                  '0rem',
                                                                  'M',
                                                                ],
                                                              },
                                                            ),
                                                          },
                                                        },
                                                        [],
                                                      ),
                                                      prefabBox(
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
                                                          prefabButton(
                                                            {
                                                              ref: {
                                                                id: '#cancelDeleteDialogButton',
                                                              },
                                                              style: {
                                                                name: 'outline',
                                                                overwrite: {
                                                                  fontWeight:
                                                                    '400',
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
                                                                        'Cancel',
                                                                      ],
                                                                    },
                                                                  ),
                                                                outerSpacing:
                                                                  sizes(
                                                                    'Outer space',
                                                                    {
                                                                      value: [
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
                                                          component(
                                                            'Form',
                                                            {
                                                              ref: {
                                                                id: '#deleteFormId',
                                                              },
                                                              options: defaults,
                                                            },
                                                            [],
                                                          ),
                                                        ],
                                                      ),
                                                    ],
                                                  ),
                                                ],
                                              ),
                                            ]),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                Snackbar(
                                  {
                                    ref: { id: '#snackbarCreated' },
                                    options: {
                                      ...snackbarOptions,
                                      visible: toggle('Visible in builder', {
                                        value: false,
                                        configuration: { as: 'VISIBILITY' },
                                      }),
                                      anchorOriginVertical: option('CUSTOM', {
                                        label: 'Vertical position',
                                        value: 'top',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Top',
                                              value: 'top',
                                            },
                                            {
                                              name: 'Bottom',
                                              value: 'bottom',
                                            },
                                          ],
                                        },
                                      }),
                                    },
                                  },
                                  [
                                    Alert(
                                      {
                                        options: {
                                          ...alertOptions,
                                          bodyText: variable('Body text', {
                                            value: [
                                              'Record successfully created',
                                            ],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                          iconColor: color('Icon color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                                Snackbar(
                                  {
                                    ref: { id: '#snackbarUpdated' },
                                    options: {
                                      ...snackbarOptions,
                                      visible: toggle('Visible in builder', {
                                        value: false,
                                        configuration: { as: 'VISIBILITY' },
                                      }),
                                      anchorOriginVertical: option('CUSTOM', {
                                        label: 'Vertical position',
                                        value: 'top',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Top',
                                              value: 'top',
                                            },
                                            {
                                              name: 'Bottom',
                                              value: 'bottom',
                                            },
                                          ],
                                        },
                                      }),
                                    },
                                  },
                                  [
                                    Alert(
                                      {
                                        options: {
                                          ...alertOptions,
                                          bodyText: variable('Body text', {
                                            value: [
                                              'Record successfully updated',
                                            ],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                          iconColor: color('Icon color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                                Snackbar(
                                  {
                                    ref: { id: '#snackbarDeleted' },
                                    options: {
                                      ...snackbarOptions,
                                      visible: toggle('Visible in builder', {
                                        value: false,
                                        configuration: { as: 'VISIBILITY' },
                                      }),
                                      anchorOriginVertical: option('CUSTOM', {
                                        label: 'Vertical position',
                                        value: 'top',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Top',
                                              value: 'top',
                                            },
                                            {
                                              name: 'Bottom',
                                              value: 'bottom',
                                            },
                                          ],
                                        },
                                      }),
                                    },
                                  },
                                  [
                                    Alert(
                                      {
                                        options: {
                                          ...alertOptions,
                                          bodyText: variable('Body text', {
                                            value: [
                                              'Record successfully deleted',
                                            ],
                                          }),
                                          textColor: color('Text color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                          iconColor: color('Icon color', {
                                            value: ThemeColor.WHITE,
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ]),
                        ],
                      ),
                      prefabBox(
                        {
                          ref: { id: '#Footer' },
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
                              configuration: {
                                condition: showIf(
                                  'backgroundOptions',
                                  'EQ',
                                  true,
                                ),
                              },
                            }),
                            backgroundColorAlpha: option('NUMBER', {
                              label: 'Background color opacity',
                              value: 20,
                              configuration: {
                                condition: showIf(
                                  'backgroundOptions',
                                  'EQ',
                                  true,
                                ),
                              },
                            }),
                          },
                        },
                        [
                          prefabBox(
                            {
                              options: {
                                ...boxOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['L', 'L', 'L', 'L'],
                                }),
                              },
                            },
                            [
                              TextPrefab(
                                {
                                  options: {
                                    ...textOptions,
                                    content: variable('Content', {
                                      value: ['Powered by Bettyblocks'],
                                      configuration: { as: 'MULTILINE' },
                                    }),
                                    textAlignment: option('CUSTOM', {
                                      label: 'Text Alignment',
                                      value: 'center',
                                      configuration: {
                                        as: 'BUTTONGROUP',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: 'Left', value: 'left' },
                                          { name: 'Center', value: 'center' },
                                          { name: 'Right', value: 'right' },
                                        ],
                                      },
                                    }),
                                    type: font('Text style', {
                                      value: ['Body1'],
                                    }),
                                    styles: toggle('Styles', { value: true }),
                                    textColor: color('Text color', {
                                      value: ThemeColor.MEDIUM,
                                      configuration: {
                                        condition: showIfTrue('styles'),
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
              ),
            ],
          ),
        ],
      ),
    ],
  ),
]);
