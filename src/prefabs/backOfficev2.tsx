import * as React from 'react';
import {
  prefab as makePrefab,
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
  showIfTrue,
  hideIf,
  number,
  text,
  component,
  PrefabReference,
  PrefabComponent,
  BeforeCreateArgs,
  PrefabComponentOption,
  InteractionType,
  PrefabInteraction,
} from '@betty-blocks/component-sdk';

import {
  Box,
  boxOptions,
  Button,
  buttonOptions,
  Column,
  columnOptions,
  DataTable,
  dataTableColumnOptions,
  dataTableOptions,
  Divider,
  Drawer,
  DrawerBar,
  drawerBarOptions,
  DrawerContainer,
  drawerContainerOptions,
  drawerOptions,
  FormErrorAlert,
  FilterComponent,
  Grid,
  gridOptions,
  Media,
  mediaOptions,
  OpenPageButton,
  Row,
  rowOptions,
  Text,
  TextInput,
  textInputOptions,
  textOptions,
  openPageButtonOptions,
  filterComponentOptions,
} from './structures';
import { options as defaults } from './structures/ActionJSForm/options';
import { DataTableColumn } from './structures/DataTableColumn/index';
import {
  IdPropertyProps,
  ModelProps,
  ModelQuery,
  Properties,
  PropertyStateProps,
} from './types';

const interactions: PrefabInteraction[] = [
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#createRecord',
      sourceComponentId: '#newButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#backofficeOverview',
      sourceComponentId: '#newButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#backofficeOverview',
      sourceComponentId: '#cancelTopButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#createRecord',
      sourceComponentId: '#cancelTopButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#backofficeOverview',
      sourceComponentId: '#cancelBottomButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#createRecord',
      sourceComponentId: '#cancelBottomButton',
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
      targetComponentId: '#searchActiveButton',
      sourceComponentId: '#searchButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#searchButton',
      sourceComponentId: '#searchActiveButton',
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
      targetComponentId: '#searchColumn',
      sourceComponentId: '#searchActiveButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#searchActiveButton',
      sourceComponentId: '#searchActiveButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#backofficeOverview',
      sourceComponentId: '#backToOverview',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#createRecord',
      sourceComponentId: '#backToOverview',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#tinyDrawer',
      sourceComponentId: '#openDrawer',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#openDrawer',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#tinyDrawer',
      sourceComponentId: '#closeButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#drawerSidebar',
      sourceComponentId: '#closeButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#DataTable',
      sourceComponentId: '#refreshButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Submit',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#createForm',
      sourceComponentId: '#saveBottomButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Submit',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#createForm',
      sourceComponentId: '#saveTopButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#createAlertErrorId',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#saveTopButton',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#saveTopButton',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#saveTopButton',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#saveBottomButton',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#saveBottomButton',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#saveBottomButton',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#backofficeOverview',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#createRecord',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#DataTable',
      sourceComponentId: '#createForm',
    },
    type: InteractionType.Custom,
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
      targetComponentId: '#DataTable',
      sourceComponentId: '#filterComp',
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
  {
    name: 'Clear advanced filter',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#DataTable',
      sourceComponentId: '#clearFilterButton',
    },
    type: InteractionType.Custom,
  },
];

const attributes = {
  category: 'FORMV2',
  icon: Icon.UpdateFormIcon,
  type: 'page',
  description:
    'Show a summary of the records of a selected data model, you can easily add records too.',
  detail:
    'Show a summary of the records of a selected data model, you can easily add records too. Recommended to use in combination with the Back Office v2, record view.',
  previewUrl: 'https://preview.betty.app/back-office-v2',
  previewImage:
    'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/ae140409957240c881669db9739f9f6e',
  interactions,
};

const beforeCreate = ({
  save,
  close,
  prefab,
  components: {
    Header,
    Content,
    PropertySelector,
    PropertiesSelector,
    ModelRelationSelector,
    Footer,
    Field,
    Box: BoxComp,
    Text: TextComp,
    Button: ButtonComp,
  },
  helpers: {
    useModelQuery,
    cloneStructure,
    setOption,
    prepareAction,
    createUuid,
    PropertyKind,
    makeBettyInput,
    BettyPrefabs,
  },
}: BeforeCreateArgs) => {
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState<ModelProps>();
  const [modelValidation, setModelValidation] = React.useState(false);
  const [properties, setProperties] = React.useState<Properties[]>([]);
  const [propertiesValidation, setPropertiesValidation] = React.useState(false);
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  const [stepNumber, setStepNumber] = React.useState(1);
  const [searchProp, setSearchProp] = React.useState<PropertyStateProps>({
    id: '',
  });

  const createFormId = createUuid();

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

  useModelQuery({
    variables: { id: modelId },
    onCompleted: ({ model: dataModel }: ModelQuery) => {
      setModel(dataModel);
      setIdProperty(dataModel.properties.find(({ name }) => name === 'id'));
    },
  });

  const stepper = {
    setStep: (step: number) => {
      if (step === 1) {
        return (
          <BoxComp pad={{ bottom: '15px' }}>
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
                }}
                value={modelId}
              />
            </Field>
          </BoxComp>
        );
      }
      return (
        <>
          <BoxComp>
            <TextComp size="medium" weight="bolder">
              Set up overview
            </TextComp>
          </BoxComp>
          <BoxComp pad={{ bottom: '15px' }}>
            <TextComp color="grey700">
              within this step you will configure the overview page. Here you
              can define which properties will show in the datatable.
            </TextComp>
          </BoxComp>
          {modelId !== '' && (
            <>
              <Field label="Property used for the search field">
                <PropertySelector
                  modelId={modelId}
                  onChange={(value: any) => {
                    setSearchProp(value);
                  }}
                  value={searchProp}
                  disabled={!modelId}
                  disabledKinds={[
                    'DATE',
                    'DATE_TIME',
                    'TIME',
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
                    'IMAGE',
                    'FILE',
                    'PASSWORD',
                    'SERIAL',
                  ]}
                  showFormat={false}
                />
              </Field>
              <Field
                label="Properties used in Backoffice "
                error={
                  propertiesValidation && (
                    <TextComp color="#e82600">
                      Selecting a property is required
                    </TextComp>
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
                    'IMAGE',
                    'FILE',
                  ]}
                  onChange={(value: Properties[]) => {
                    setProperties(value);
                    setPropertiesValidation(false);
                  }}
                />
              </Field>
            </>
          )}
        </>
      );
    },
    onSave: async () => {
      const newPrefab = { ...prefab };
      const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      const formInputStructure = (
        textValue: string,
        BetaInputField: PrefabReference,
      ): PrefabReference => {
        const rowColumnStructure = cloneStructure('2 Columns');
        const textStructure = cloneStructure('Text');

        if (textStructure.type !== 'COMPONENT')
          throw new Error(
            `The Text component type is not a COMPONENT, but a ${textStructure.type}`,
          );
        setOption(textStructure, 'content', (opt: PrefabComponentOption) => ({
          ...opt,
          value: [capitalizeFirstLetter(textValue)],
        }));

        if (rowColumnStructure.type !== 'COMPONENT')
          throw new Error(
            `The Row component type is not a COMPONENT, but a ${rowColumnStructure.type}`,
          );
        if (rowColumnStructure.descendants[0].type !== 'COMPONENT')
          throw new Error(
            `there was an error with the Column component. Its type is not a COMPONENT, but a ${rowColumnStructure.descendants[0].type}`,
          );
        if (rowColumnStructure.descendants[1].type !== 'COMPONENT')
          throw new Error(
            `there was an error with the Column component. Its type is not a COMPONENT, but a ${rowColumnStructure.descendants[0].type}`,
          );

        setOption(
          rowColumnStructure,
          'maxRowWidth',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: 'Full',
          }),
        );
        // #region first column
        setOption(
          rowColumnStructure.descendants[0],
          'columnWidth',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: '3',
          }),
        );
        setOption(
          rowColumnStructure.descendants[0],
          'columnWidthTabletLandscape',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: '3',
          }),
        );
        setOption(
          rowColumnStructure.descendants[0],
          'columnWidthTabletPortrait',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: '12',
          }),
        );
        setOption(
          rowColumnStructure.descendants[0],
          'columnWidthMobile',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: '12',
          }),
        );
        setOption(
          rowColumnStructure.descendants[0],
          'verticalAlignment',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: 'center',
          }),
        );
        setOption(
          rowColumnStructure.descendants[0],
          'innerSpacing',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: ['0rem', 'M', '0rem', 'M'],
          }),
        );
        // #endregion
        // #region second column
        setOption(
          rowColumnStructure.descendants[1],
          'columnWidth',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: '9',
          }),
        );
        setOption(
          rowColumnStructure.descendants[1],
          'columnWidthTabletLandscape',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: '9',
          }),
        );
        setOption(
          rowColumnStructure.descendants[1],
          'columnWidthTabletPortrait',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: '12',
          }),
        );
        setOption(
          rowColumnStructure.descendants[1],
          'columnWidthMobile',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: '12',
          }),
        );
        setOption(
          rowColumnStructure.descendants[1],
          'innerSpacing',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: ['S', 'M', 'S', 'M'],
          }),
        );
        // #endregion

        if (BetaInputField.type !== 'COMPONENT')
          throw new Error(
            `The BetaInputField component type is not a COMPONENT, but a ${BetaInputField.type}`,
          );
        setOption(
          BetaInputField,
          'margin',
          (options: PrefabComponentOption) => ({
            ...options,
            value: 'none',
          }),
        );
        setOption(
          BetaInputField,
          'hideLabel',
          (opts: PrefabComponentOption) => ({
            ...opts,
            value: true,
          }),
        );
        const returnStructure = rowColumnStructure;
        if (
          returnStructure.descendants[0].type === 'COMPONENT' &&
          returnStructure.descendants[1].type === 'COMPONENT'
        ) {
          returnStructure.descendants[0].descendants.push(textStructure);
          returnStructure.descendants[1].descendants.push(BetaInputField);
        }
        return returnStructure;
      };

      const dataTablePrefab = treeSearch('#DataTable', newPrefab.structure);
      if (!dataTablePrefab) throw new Error('No detail data container found');
      setOption(dataTablePrefab, 'model', (opt: PrefabComponentOption) => ({
        ...opt,
        value: modelId,
        configuration: {
          disabled: true,
        },
      }));
      const dataTableDetailsColumn = dataTablePrefab?.descendants.pop();
      properties.forEach((property) => {
        let newProperty = property;
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
        if (inheritFormatKinds.includes(property.kind)) {
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

        setOption(
          dataTableColumnStructure,
          'sortable',
          (originalOption: PrefabComponentOption) => {
            return {
              ...originalOption,
              value: true,
            };
          },
        );
        if (!dataTablePrefab) {
          throw new Error(
            `We could not find a prefab with a reference of '#DataTable'`,
          );
        }
        dataTablePrefab.descendants.push(dataTableColumnStructure);
      });
      if (dataTablePrefab && dataTableDetailsColumn)
        dataTablePrefab.descendants.push(dataTableDetailsColumn);

      const filteredproperties = properties.filter(
        (prop: Properties) =>
          prop.label !== 'Created at' &&
          prop.label !== 'Updated at' &&
          prop.label !== 'Id',
      );

      if (idProperty && model) {
        const createForm = treeSearch('#createForm', newPrefab.structure);
        if (!createForm) throw new Error('No create form found');
        createForm.id = createFormId;

        const result = await prepareAction(
          createFormId,
          idProperty,
          filteredproperties,
          'create',
          undefined,
          `Back office v2 - Create ${model.label}`,
        );

        Object.values(result.variables).forEach(
          ([prop, inputVariable]): void => {
            const generateInputPrefabs = () => {
              switch (prop.kind) {
                case PropertyKind.INTEGER:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.INTEGER,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.EMAIL_ADDRESS:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.EMAIL_ADDRESS,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.DECIMAL:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.DECIMAL,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.TEXT:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.TEXT,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.PRICE:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.PRICE,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.PASSWORD:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.PASSWORD,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.DATE:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.DATE,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.DATE_TIME:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.DATE_TIME,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.TIME:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.TIME,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.FILE:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.FILE,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.BOOLEAN:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.BOOLEAN,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                case PropertyKind.LIST:
                  return formInputStructure(
                    prop.label,
                    makeBettyInput(
                      BettyPrefabs.LIST,
                      model,
                      prop,
                      inputVariable,
                    ),
                  );
                default:
                  return formInputStructure(
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
            const createFormInputs = generateInputPrefabs();

            const createFormFooter = createForm.descendants.pop();
            createForm.descendants.push(createFormInputs);
            if (createFormFooter) createForm.descendants.push(createFormFooter);
          },
        );
        setOption(createForm, 'actionId', (opt: PrefabComponentOption) => ({
          ...opt,
          value: result.action.actionId,
          configuration: { disabled: true },
        }));
        setOption(createForm, 'model', (opt: PrefabComponentOption) => ({
          ...opt,
          value: modelId,
          configuration: {
            disabled: true,
          },
        }));

        const backOfficeTitle = treeSearch(
          '#backOfficeTitle',
          newPrefab.structure,
        );
        if (!backOfficeTitle) throw new Error('No back office title found');
        setOption(backOfficeTitle, 'content', (opt: PrefabComponentOption) => ({
          ...opt,
          value: [`${model.label}s`],
        }));

        const createTitle = treeSearch('#createTitle', newPrefab.structure);
        if (!createTitle) throw new Error('No create title found');
        setOption(createTitle, 'content', (opt: PrefabComponentOption) => ({
          ...opt,
          value: [`Create ${model.label} record`],
        }));
      }

      // configure filter
      const filterComp = treeSearch('#filterComp', newPrefab.structure);
      if (modelId && filterComp?.type === 'COMPONENT') {
        setOption(filterComp, 'modelId', (opts: PrefabComponentOption) => ({
          ...opts,
          value: modelId,
        }));
      }

      // #region Configure Header Image
      // TODO: update the urlFileSource with the value of your selected image. Right now it is a partial ID
      const mediaComponent = treeSearch('#MediaImage', newPrefab.structure);
      if (mediaComponent) {
        setOption(
          mediaComponent,
          'urlFileSource',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: [
              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_B.svg',
            ],
          }),
        );
      }

      if (newPrefab.interactions) {
        if (searchProp.id && searchProp.id !== '') {
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
              targetComponentId: '#DataTable',
              sourceComponentId: '#searchField',
            },
            type: 'Custom',
          } as PrefabInteraction);
        }
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
            targetComponentId: '#DataTable',
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

      // #endregion

      save(newPrefab);
    },
    buttons: () => (
      <BoxComp direction="row" justify="between">
        <BoxComp direction="row" margin="2rem">
          <ButtonComp
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
          <ButtonComp
            label="Next"
            size="large"
            disabled={stepNumber === stepper.stepAmount || modelId === ''}
            onClick={() => {
              const newStepnumber = stepNumber + 1;
              setStepNumber(newStepnumber);
            }}
            primary
          />
        </BoxComp>
        <BoxComp>
          <Footer
            onClose={close}
            onSave={stepper.onSave}
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
    stepAmount: 2,
  };
  return (
    <>
      <Header onClose={close} title="Configure your Back office" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

const drawerSidebar = DrawerBar(
  {
    ref: { id: '#drawerSidebar' },
    options: {
      ...drawerBarOptions,
      innerSpacing: sizes('Inner space', {
        value: ['0rem', '0rem', '0rem', '0rem'],
      }),
    },
  },
  [
    Box(
      {
        label: 'Logo',
        options: {
          ...boxOptions,
          position: buttongroup(
            'Position',
            [
              ['Static', 'static'],
              ['Relative', 'relative'],
              ['Absolute', 'absolute'],
              ['Fixed', 'fixed'],
              ['Sticky', 'sticky'],
            ],
            {
              value: 'relative',
              configuration: {
                dataType: 'string',
              },
            },
          ),
          backgroundColor: color('Background color', {
            value: ThemeColor.WHITE,
          }),
        },
      },
      [
        Box(
          {
            options: {
              ...boxOptions,
              position: buttongroup(
                'Position',
                [
                  ['Static', 'static'],
                  ['Relative', 'relative'],
                  ['Absolute', 'absolute'],
                  ['Fixed', 'fixed'],
                  ['Sticky', 'sticky'],
                ],
                {
                  value: 'relative',
                  configuration: {
                    dataType: 'string',
                  },
                },
              ),
              backgroundColor: color('Background color', {
                value: ThemeColor.WHITE,
              }),
              height: size('Height', {
                value: '100%',
                configuration: {
                  as: 'UNIT',
                },
              }),
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
          },
          [
            Media(
              {
                ref: { id: '#MediaImage' },

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
                  outerSpacing: sizes('Outer space', {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                  }),
                  urlFileSource: variable('Source', {
                    value: [
                      'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_B.svg',
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
      ],
    ),

    Box(
      {
        label: 'Items wrap',
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
          position: buttongroup(
            'Position',
            [
              ['Static', 'static'],
              ['Relative', 'relative'],
              ['Absolute', 'absolute'],
              ['Fixed', 'fixed'],
              ['Sticky', 'sticky'],
            ],
            {
              value: 'relative',
              configuration: {
                dataType: 'string',
              },
            },
          ),
        },
      },
      [
        Box(
          {
            label: 'My account',
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
                  value: 'flex-start',
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
                      value: 'center',
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
                  innerSpacing: sizes('Inner space', {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                  }),
                  height: size('Height', {
                    value: '40px',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                  width: size('Width', {
                    value: '40px',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                  backgroundColor: color('Background color', {
                    value: ThemeColor.WHITE,
                  }),
                  borderRadius: size('Border radius', {
                    value: '40px',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                },
              },
              [
                Text(
                  {
                    options: {
                      ...textOptions,
                      content: variable('Content', {
                        value: ['AB'],
                        configuration: { as: 'MULTILINE' },
                      }),
                      type: font('Font', { value: ['Body2'] }),
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
                      fontWeight: option('CUSTOM', {
                        label: 'Font weight',
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
                  innerSpacing: sizes('Inner space', {
                    value: ['0rem', '0rem', '0rem', 'M'],
                  }),
                },
              },
              [
                Text(
                  {
                    options: {
                      ...textOptions,
                      content: variable('Content', {
                        value: ['My account'],
                        configuration: { as: 'MULTILINE' },
                      }),
                      textColor: color('Text color', {
                        value: ThemeColor.WHITE,
                      }),
                      type: font('Font', { value: ['Body2'] }),
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
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
              height: size('Height', {
                value: '1px',
                configuration: {
                  as: 'UNIT',
                },
              }),
              backgroundColor: color('Background color', {
                value: ThemeColor.BLACK,
              }),
              backgroundColorAlpha: option('NUMBER', {
                label: 'Background color opacity',
                value: 20,
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
                      value: 'hidden',
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
                    }),
                    columnWidthTabletLandscape: option('CUSTOM', {
                      label: 'Column width (tablet landscape)',
                      value: 'hidden',
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
                    }),
                    columnWidthTabletPortrait: option('CUSTOM', {
                      value: 'hidden',
                      label: 'Column width (tablet portrait)',
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
                    }),
                    columnWidthMobile: option('CUSTOM', {
                      value: 'hidden',
                      label: 'Column width (mobile)',
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
                    }),
                    innerSpacing: sizes('Inner space', {
                      value: ['0rem', '0rem', '0rem', '0rem'],
                    }),
                  },
                },
                [],
              ),
            ]),
          ],
        ),

        Box(
          {
            label: 'Menu Items',
            options: {
              ...boxOptions,
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
            },
          },
          [
            Box(
              {
                label: 'Selected Item',
                options: {
                  ...boxOptions,
                  innerSpacing: sizes('Inner space', {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                  }),
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
                      value: 'flex-start',
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
                  width: size('Width', {
                    value: '100%',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                  backgroundColor: color('Background color', {
                    value: ThemeColor.BLACK,
                  }),
                  backgroundColorAlpha: option('NUMBER', {
                    label: 'Background color opacity',
                    value: 20,
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
                    OpenPageButton({
                      ref: { id: '#menuButton' },
                      options: {
                        ...buttonOptions,
                        buttonText: variable('Button text', {
                          value: ['First list item'],
                        }),
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
                            value: 'white',
                          },
                          fontFamily: 'Roboto',
                          fontSize: '0.875rem',
                          fontStyle: 'none',
                          fontWeight: '400',
                          padding: ['0.6875rem', '0.6875rem'],
                          textDecoration: 'none',
                          textTransform: 'none',
                        },
                      },
                    }),
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
              value: 'flex-end',
              configuration: {
                dataType: 'string',
              },
            },
          ),
          innerSpacing: sizes('Inner space', {
            value: ['0rem', '0rem', '0rem', '0rem'],
          }),
          backgroundColor: color('Background color', {
            value: ThemeColor.PRIMARY,
          }),
        },
      },
      [
        Button(
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
            ref: { id: '#closeButton' },
            options: {
              ...buttonOptions,
              outerSpacing: sizes('Outer space', {
                value: ['M', 'M', 'L', 'M'],
              }),
              icon: icon('Icon', { value: 'ArrowBackIos' }),
              buttonText: variable('Button text', { value: [''] }),
            },
          },
          [],
        ),
      ],
    ),
  ],
);

const drawerContainer = DrawerContainer(
  {
    options: {
      ...drawerContainerOptions,
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
            value: ['0rem', '0rem', '0rem', '0rem'],
          }),
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
              value: 'flex-start',
              configuration: {
                dataType: 'string',
              },
            },
          ),
        },
      },
      [
        Box(
          {
            options: {
              ...boxOptions,
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
            },
          },
          [
            Grid(
              {
                label: 'Tiny Drawer',
                ref: { id: '#tinyDrawer' },
                options: {
                  ...gridOptions,
                  visibility: toggle('Toggle visibility', {
                    value: false,
                    configuration: {
                      as: 'VISIBILITY',
                    },
                  }),
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
                  height: size('Height', {
                    value: '100%',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                  justify: option('CUSTOM', {
                    value: 'flex-end',
                    label: 'Justify',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Start', value: 'flex-start' },
                        { name: 'Center', value: 'center' },
                        { name: 'End', value: 'flex-end' },
                        { name: 'Space between', value: 'space-between' },
                        { name: 'Space around', value: 'space-around' },
                        { name: 'Space evenly', value: 'space-evenly' },
                      ],
                      condition: showIf('type', 'EQ', 'container'),
                    },
                  }),
                  backgroundColor: color('Background color', {
                    value: ThemeColor.PRIMARY,
                  }),
                },
              },
              [
                Button(
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
                    label: 'Open drawer',
                    ref: { id: '#openDrawer' },
                    options: {
                      ...buttonOptions,
                      buttonText: variable('Button text', { value: [] }),

                      outerSpacing: sizes('Outer space', {
                        value: ['M', 'M', 'L', 'M'],
                      }),
                      icon: icon('Icon', { value: 'ArrowForwardIos' }),
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
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
              stretch: toggle('Stretch (when in flex container)', {
                value: true,
              }),
              height: size('Height', {
                value: '100vh',
                configuration: {
                  as: 'UNIT',
                },
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
            Box(
              {
                options: {
                  ...boxOptions,
                  innerSpacing: sizes('Inner space', {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                  }),
                  height: size('Height', {
                    value: '208px',
                    configuration: {
                      as: 'UNIT',
                    },
                  }),
                  backgroundUrl: variable('Background url', {
                    value: [
                      'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/87d760849fc1416ca825a5ef7632d850',
                    ],
                  }),
                  backgroundSize: buttongroup(
                    'Background size',
                    [
                      ['Initial', 'initial'],
                      ['Contain', 'contain'],
                      ['Cover', 'cover'],
                    ],
                    {
                      value: 'cover',
                      configuration: {
                        dataType: 'string',
                      },
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
                  innerSpacing: sizes('Inner space', {
                    value: ['XL', 'XL', 'XL', 'XL'],
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
                      innerSpacing: sizes('Inner space', {
                        value: ['0rem', '0rem', '0rem', '0rem'],
                      }),
                    },
                  },
                  [
                    Text(
                      {
                        ref: { id: '#backOfficeTitle' },
                        options: {
                          ...textOptions,
                          content: variable('Content', {
                            value: ['Title'],
                            configuration: { as: 'MULTILINE' },
                          }),
                          type: font('Font', { value: ['Title5'] }),
                          textColor: color('Text color', {
                            value: ThemeColor.PRIMARY,
                          }),
                        },
                      },
                      [],
                    ),
                    Box(
                      {
                        options: {
                          ...boxOptions,
                          innerSpacing: sizes('Inner space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                        },
                      },
                      [
                        Button(
                          {
                            ref: { id: '#refreshButton' },
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
                                padding: ['0.3125rem', '0rem'],
                                textDecoration: 'none',
                                textTransform: 'none',
                              },
                            },
                            options: {
                              ...buttonOptions,
                              buttonText: variable('Button text', {
                                value: ['Refresh'],
                              }),
                              icon: icon('Icon', { value: 'Refresh' }),
                              outerSpacing: sizes('Outer space', {
                                value: ['0rem', 'XL', '0rem', '0rem'],
                              }),
                            },
                          },
                          [],
                        ),
                        Button(
                          {
                            ref: {
                              id: '#filterButtonActive',
                            },
                            label: 'Active filter button',
                            style: {
                              overwrite: {
                                backgroundColor: {
                                  type: 'STATIC',
                                  value: 'white',
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
                                padding: ['0.5rem', '0.625rem'],
                                textDecoration: 'none',
                                textTransform: 'none',
                              },
                            },
                            options: {
                              ...buttonOptions,
                              visible: toggle('Toggle visibility', {
                                value: false,
                                configuration: {
                                  as: 'VISIBILITY',
                                },
                              }),
                              buttonText: variable('Button text', {
                                value: ['Filter'],
                              }),
                              icon: icon('Icon', {
                                value: 'FilterList',
                              }),
                              outerSpacing: sizes('Outer space', {
                                value: ['0rem', 'XL', '0rem', '0rem'],
                              }),
                            },
                          },
                          [],
                        ),
                        Button(
                          {
                            ref: {
                              id: '#filterButton',
                            },
                            label: 'Filter button',
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
                                padding: ['0.5rem', '0.625rem'],
                                textDecoration: 'none',
                                textTransform: 'none',
                              },
                            },
                            options: {
                              ...buttonOptions,
                              buttonText: variable('Button text', {
                                value: ['Filter'],
                              }),
                              icon: icon('Icon', {
                                value: 'FilterList',
                              }),
                              outerSpacing: sizes('Outer space', {
                                value: ['0rem', 'XL', '0rem', '0rem'],
                              }),
                            },
                          },
                          [],
                        ),
                        Button(
                          {
                            ref: { id: '#searchActiveButton' },
                            style: {
                              overwrite: {
                                backgroundColor: {
                                  type: 'STATIC',
                                  value: 'white',
                                },
                                boxShadow: 'none',
                                color: {
                                  type: 'THEME_COLOR',
                                  value: 'primary',
                                },
                                borderRadius: ['0.25rem'],
                                fontFamily: 'Roboto',
                                fontSize: '0.875rem',
                                fontStyle: 'none',
                                fontWeight: '400',
                                padding: ['0.5rem', '0.625rem'],
                                textDecoration: 'none',
                                textTransform: 'none',
                              },
                            },
                            options: {
                              ...buttonOptions,
                              buttonText: variable('Button text', {
                                value: ['Search'],
                              }),
                              icon: icon('Icon', { value: 'Search' }),
                              outerSpacing: sizes('Outer space', {
                                value: ['0rem', 'XL', '0rem', '0rem'],
                              }),
                              visible: toggle('Toggle visibility', {
                                value: false,
                                configuration: {
                                  as: 'VISIBILITY',
                                },
                              }),
                            },
                          },
                          [],
                        ),
                        Button(
                          {
                            ref: { id: '#searchButton' },
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
                                padding: ['0.3125rem', '0.625rem'],
                                textDecoration: 'none',
                                textTransform: 'none',
                              },
                            },
                            options: {
                              ...buttonOptions,
                              buttonText: variable('Button text', {
                                value: ['Search'],
                              }),
                              icon: icon('Icon', { value: 'Search' }),
                              outerSpacing: sizes('Outer space', {
                                value: ['0rem', 'XL', '0rem', '0rem'],
                              }),
                            },
                          },
                          [],
                        ),
                        Button(
                          {
                            ref: { id: '#newButton' },
                            style: {
                              overwrite: {
                                boxShadow: 'none',
                                color: {
                                  type: 'THEME_COLOR',
                                  value: 'white',
                                },
                                fontFamily: 'Roboto',
                                fontSize: '0.875rem',
                                fontStyle: 'none',
                                fontWeight: '400',
                                textDecoration: 'none',
                                textTransform: 'none',
                                padding: ['0.6875rem', '1rem'],
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
                  ],
                ),
                Column(
                  {
                    label: 'Search Column',
                    ref: { id: '#searchColumn' },
                    options: {
                      ...columnOptions,
                      visible: toggle('Toggle visibility', {
                        value: false,
                        configuration: {
                          as: 'VISIBILITY',
                        },
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
                                value: ['L', '0rem', '0rem', '0rem'],
                              }),
                              stretch: toggle(
                                'Stretch (when in flex container)',
                                {
                                  value: true,
                                },
                              ),
                            },
                          },
                          [
                            Box(
                              {
                                options: {
                                  ...boxOptions,
                                  innerSpacing: sizes('Inner space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                  stretch: toggle(
                                    'Stretch (when in flex container)',
                                    {
                                      value: true,
                                    },
                                  ),
                                  position: buttongroup(
                                    'Position',
                                    [
                                      ['Static', 'static'],
                                      ['Relative', 'relative'],
                                      ['Absolute', 'absolute'],
                                      ['Fixed', 'fixed'],
                                      ['Sticky', 'sticky'],
                                    ],
                                    {
                                      value: 'relative',
                                      configuration: {
                                        dataType: 'string',
                                      },
                                    },
                                  ),
                                },
                              },
                              [
                                TextInput(
                                  {
                                    label: 'Text field Beta',
                                    inputLabel: 'Searchfield',
                                    type: 'text',
                                    ref: { id: '#searchField' },
                                    options: {
                                      ...textInputOptions,
                                      autoComplete: toggle('Autocomplete', {
                                        value: true,
                                      }),
                                      placeholder: variable('Placeholder', {
                                        value: ['Search'],
                                      }),
                                      fullWidth: toggle('Full width', {
                                        value: true,
                                      }),
                                      styles: toggle('Styles', { value: true }),
                                      hideLabel: toggle('Hide label', {
                                        value: true,
                                        configuration: {
                                          condition: showIfTrue('styles'),
                                        },
                                      }),
                                      margin: buttongroup(
                                        'Margin',
                                        [
                                          ['None', 'none'],
                                          ['Dense', 'dense'],
                                          ['Normal', 'normal'],
                                        ],
                                        { value: 'none' },
                                      ),
                                    },
                                  },
                                  [],
                                ),
                                Box(
                                  {
                                    options: {
                                      ...boxOptions,
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                      position: buttongroup(
                                        'Position',
                                        [
                                          ['Static', 'static'],
                                          ['Relative', 'relative'],
                                          ['Absolute', 'absolute'],
                                          ['Fixed', 'fixed'],
                                          ['Sticky', 'sticky'],
                                        ],
                                        {
                                          value: 'absolute',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      top: size('Top position', {
                                        value: '11px',
                                        configuration: {
                                          as: 'UNIT',
                                        },
                                      }),
                                      right: size('Right position', {
                                        value: '11px',
                                        configuration: {
                                          as: 'UNIT',
                                        },
                                      }),
                                    },
                                  },
                                  [
                                    Button(
                                      {
                                        ref: { id: '#clearButton' },
                                        style: {
                                          overwrite: {
                                            borderRadius: ['3.125rem'],
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'white',
                                            },
                                            fontFamily: 'Roboto',
                                            fontSize: '0.875rem',
                                            fontStyle: 'none',
                                            fontWeight: '400',
                                            padding: ['0.375rem', '0.375rem'],
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                          },
                                        },
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: [],
                                          }),
                                          visible: toggle('Toggle visibility', {
                                            value: false,
                                            configuration: {
                                              as: 'VISIBILITY',
                                            },
                                          }),
                                          outerSpacing: sizes('Outer space', {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                          }),
                                          icon: icon('Icon', {
                                            value: 'Close',
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
                Column(
                  {
                    label: 'Filter Column',
                    ref: {
                      id: '#filterColumn',
                    },
                    options: {
                      ...columnOptions,
                      visible: toggle('Toggle visibility', {
                        value: false,
                        configuration: {
                          as: 'VISIBILITY',
                        },
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
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                          stretch: toggle('Stretch (when in flex container)', {
                            value: true,
                          }),
                          position: buttongroup(
                            'Position',
                            [
                              ['Static', 'static'],
                              ['Relative', 'relative'],
                              ['Absolute', 'absolute'],
                              ['Fixed', 'fixed'],
                              ['Sticky', 'sticky'],
                            ],
                            {
                              value: 'relative',
                              configuration: {
                                dataType: 'string',
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
                              backgroundColor: color('Background color', {
                                value: ThemeColor.WHITE,
                              }),
                            },
                          },
                          [],
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
                              innerSpacing: sizes('Inner space', {
                                value: ['0rem', '0rem', '0rem', '0rem'],
                              }),
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
                                  overwrite: {
                                    textTransform: 'none',
                                  },
                                },
                                options: {
                                  ...buttonOptions,
                                  buttonText: variable('Button text', {
                                    value: ['Add filter group'],
                                  }),
                                },
                              },
                              [],
                            ),
                            Box(
                              {
                                options: {
                                  ...boxOptions,
                                  innerSpacing: sizes('Inner space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                },
                              },
                              [
                                Button(
                                  {
                                    ref: {
                                      id: '#clearFilterButton',
                                    },
                                    style: {
                                      name: 'Outline',
                                      overwrite: {
                                        textTransform: 'none',
                                      },
                                    },

                                    options: {
                                      ...buttonOptions,
                                      buttonText: variable('Button text', {
                                        value: ['Clear filter'],
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', 'M', '0rem', '0rem'],
                                      }),
                                    },
                                  },
                                  [],
                                ),
                                Button(
                                  {
                                    ref: {
                                      id: '#applyButton',
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
                                    options: {
                                      ...buttonOptions,
                                      buttonText: variable('Button text', {
                                        value: ['Apply filter'],
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
                Box(
                  {
                    options: {
                      ...boxOptions,
                      innerSpacing: sizes('Inner space', {
                        value: ['L', '0rem', '0rem', '0rem'],
                      }),
                    },
                  },
                  [
                    DataTable(
                      {
                        ref: { id: '#DataTable' },
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
                              condition: hideIf('autoLoadOnScroll', 'EQ', true),
                            },
                          }),
                          placeholderTake: number('Placeholder rows', {
                            value: '5',
                          }),
                          size: option('CUSTOM', {
                            value: 'small',
                            label: 'Size',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Small', value: 'small' },
                                { name: 'Medium', value: 'medium' },
                              ],
                            },
                          }),
                          background: color('Background', {
                            value: ThemeColor.WHITE,
                          }),
                          backgroundHeader: color('Background header', {
                            value: ThemeColor.LIGHT,
                          }),
                          variant: option('CUSTOM', {
                            label: 'Variant',
                            value: 'outlined',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Flat', value: 'flat' },
                                { name: 'Elevation', value: 'elevation' },
                                { name: 'Outlined', value: 'outlined' },
                              ],
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
                                value: '80px',
                                configuration: {
                                  as: 'UNIT',
                                },
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
                                      value: 'primary',
                                    },
                                    fontFamily: 'Roboto',
                                    fontSize: '0.875rem',
                                    fontStyle: 'none',
                                    fontWeight: '400',
                                    padding: ['0.375rem', '0.375rem'],
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                  },
                                },
                                options: {
                                  ...openPageButtonOptions,
                                  buttonText: variable('Button text', {
                                    value: [],
                                  }),
                                  icon: icon('Icon', {
                                    value: 'ArrowForwardIos',
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
);

const prefabStructure = [
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
          ref: { id: '#backofficeOverview' },
          label: 'Backoffice  overview',
          options: {
            ...columnOptions,
            innerSpacing: sizes('Inner space', {
              value: ['0rem', '0rem', '0rem', '0rem'],
            }),
          },
        },
        [
          Drawer(
            {
              options: {
                ...drawerOptions,
                drawerWidth: size('Drawer Width', {
                  value: '236px',
                  configuration: {
                    as: 'UNIT',
                  },
                }),
              },
            },
            [drawerSidebar, drawerContainer],
          ),
        ],
      ),

      Column(
        {
          label: 'Create record',
          ref: { id: '#createRecord' },
          options: {
            ...columnOptions,
            visible: toggle('Toggle visibility', {
              value: false,
              configuration: {
                as: 'VISIBILITY',
              },
            }),
            columnWidth: option('CUSTOM', {
              label: 'Column width',
              value: '12',
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
            }),
            columnWidthTabletLandscape: option('CUSTOM', {
              label: 'Column width (tablet landscape)',
              value: '12',
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
            }),
            columnWidthTabletPortrait: option('CUSTOM', {
              value: '12',
              label: 'Column width (tablet portrait)',
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
            }),
            columnWidthMobile: option('CUSTOM', {
              value: '12',
              label: 'Column width (mobile)',
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
            }),
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
                direction: option('CUSTOM', {
                  value: 'row',
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
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        position: buttongroup(
                          'Position',
                          [
                            ['Static', 'static'],
                            ['Relative', 'relative'],
                            ['Absolute', 'absolute'],
                            ['Fixed', 'fixed'],
                            ['Sticky', 'sticky'],
                          ],
                          {
                            value: 'static',
                            configuration: {
                              dataType: 'string',
                            },
                          },
                        ),
                        backgroundColor: color('Background color', {
                          value: ThemeColor.WHITE,
                        }),
                      },
                    },
                    [
                      Box(
                        {
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                            }),
                            height: size('Height', {
                              value: '4px',
                              configuration: {
                                as: 'UNIT',
                              },
                            }),
                            backgroundColor: color('Background color', {
                              value: ThemeColor.PRIMARY,
                            }),
                          },
                        },
                        [],
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
                            backgroundColor: color('Background color', {
                              value: ThemeColor.WHITE,
                            }),
                          },
                        },
                        [
                          Box(
                            {
                              options: {
                                ...boxOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                              },
                            },
                            [
                              Button(
                                {
                                  ref: {
                                    id: '#backToOverview',
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
                                      padding: ['0.3125rem', '0rem'],
                                      textDecoration: 'none',
                                      textTransform: 'none',
                                    },
                                  },
                                  options: {
                                    ...buttonOptions,
                                    buttonText: variable('Button text', {
                                      value: ['Back to overview'],
                                    }),
                                    icon: icon('Icon', {
                                      value: 'ChevronLeft',
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
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                              },
                            },
                            [
                              Button(
                                {
                                  ref: { id: '#cancelTopButton' },
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
                                      padding: ['0.625rem', '0.9375rem'],
                                      textDecoration: 'none',
                                      textTransform: 'none',
                                    },
                                  },
                                  options: {
                                    ...buttonOptions,
                                    buttonText: variable('Button text', {
                                      value: ['Cancel'],
                                    }),
                                  },
                                },
                                [],
                              ),
                              Button(
                                {
                                  ref: { id: '#saveTopButton' },
                                  style: {
                                    overwrite: {
                                      boxShadow: 'none',
                                      color: {
                                        type: 'THEME_COLOR',
                                        value: 'white',
                                      },
                                      fontFamily: 'Roboto',
                                      fontSize: '0.875rem',
                                      fontStyle: 'none',
                                      fontWeight: '400',
                                      padding: ['0.6875rem', '1rem'],
                                      textDecoration: 'none',
                                      textTransform: 'none',
                                    },
                                  },
                                  options: {
                                    ...buttonOptions,
                                    buttonText: variable('Button text', {
                                      value: ['Save and create'],
                                    }),
                                    outerSpacing: sizes('Outer space', {
                                      value: ['0rem', '0rem', '0rem', 'M'],
                                    }),
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
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                            }),
                            height: size('Height', {
                              value: '1px',
                              configuration: {
                                as: 'UNIT',
                              },
                            }),
                            backgroundColor: color('Background color', {
                              value: ThemeColor.LIGHT,
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
                        backgroundColor: color('Background color', {
                          value: ThemeColor.WHITE,
                        }),
                      },
                    },
                    [
                      Row({}, [
                        Column({}, [
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
                              },
                            },
                            [
                              Column(
                                {
                                  options: {
                                    ...columnOptions,
                                    innerSpacing: sizes('Inner space', {
                                      value: ['M', 'M', '0rem', 'M'],
                                    }),
                                  },
                                },
                                [
                                  Text(
                                    {
                                      ref: { id: '#createTitle' },
                                      options: {
                                        ...textOptions,
                                        content: variable('Content', {
                                          value: ['Create client record'],
                                          configuration: { as: 'MULTILINE' },
                                        }),
                                        type: font('Font', {
                                          value: ['Title4'],
                                        }),
                                        outerSpacing: sizes('Outer space', {
                                          value: ['0rem', '0rem', 'M', '0rem'],
                                        }),
                                        textColor: color('Text color', {
                                          value: ThemeColor.PRIMARY,
                                        }),
                                        fontWeight: option('CUSTOM', {
                                          label: 'Font weight',
                                          value: '300',
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
                                      },
                                    },
                                    [],
                                  ),
                                  FormErrorAlert({
                                    ref: {
                                      id: '#createAlertErrorId',
                                    },
                                  }),
                                ],
                              ),
                            ],
                          ),
                          component(
                            'Form',
                            {
                              label: 'Create Form',
                              options: defaults,
                              ref: { id: '#createForm' },
                            },
                            [
                              Box({}, [
                                Divider({}),
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
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                  },
                                  [
                                    Button(
                                      {
                                        ref: { id: '#cancelBottomButton' },
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
                                            padding: ['0.625rem', '0.9375rem'],
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                          },
                                        },
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Cancel'],
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    Button(
                                      {
                                        ref: { id: '#saveBottomButton' },
                                        style: {
                                          overwrite: {
                                            boxShadow: 'none',
                                            color: {
                                              type: 'THEME_COLOR',
                                              value: 'white',
                                            },
                                            fontFamily: 'Roboto',
                                            fontSize: '0.875rem',
                                            fontStyle: 'none',
                                            fontWeight: '400',
                                            padding: ['0.6875rem', '1rem'],
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                          },
                                        },
                                        options: {
                                          ...buttonOptions,
                                          buttonText: variable('Button text', {
                                            value: ['Save and create'],
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                  ],
                                ),
                              ]),
                            ],
                          ),
                        ]),
                      ]),
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
];

export default makePrefab(
  'Back office v2, overview',
  attributes,
  beforeCreate,
  prefabStructure,
);
