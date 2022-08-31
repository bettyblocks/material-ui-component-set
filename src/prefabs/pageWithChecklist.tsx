import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  option,
  text,
  sizes,
  size,
  showIf,
  PrefabReference,
  BeforeCreateArgs,
  PrefabInteraction,
  number,
} from '@betty-blocks/component-sdk';
import {
  Column,
  columnOptions,
  Row,
  rowOptions,
  DataList,
  dataListOptions,
} from './structures';

const attrs = {
  name: 'Checklist page test',
  icon: Icon.DataList,
  type: 'page',
  description:
    'Toggle the view of your content between a card view or a list view.',
  detail:
    'Display your data in different views such as a list or a card view via a toggle. This page template also contains a custom search functionality to filter your data.',
  previewUrl: 'https://preview.betty.app/card-and-list-view',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Card_And_List_View.jpg',
  category: 'LAYOUT',
};

const beforeCreate = ({
  save,
  close,
  prefab,
  components: {
    Header,
    Content,
    Field,
    Footer,
    Text,
    Box,
    ModelSelector,
    PropertySelector,
    Button,
    PartialSelector,
  },
  helpers: { useModelQuery },
}: BeforeCreateArgs) => {
  const [showValidation, setShowValidation] = React.useState(false);
  const [modelId, setModelId] = React.useState('');
  const [titleProperty, setTitleProperty] = React.useState<any>('');
  const [descriptionProperty, setDescriptionProperty] = React.useState<any>('');

  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });

  const [stepNumber, setStepNumber] = React.useState(1);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');

  const getDescendantByRef = (refValue: string, structure: any) =>
    structure.reduce((acc: string, component: PrefabReference) => {
      if (acc) return acc;
      if (
        component.type === 'COMPONENT' &&
        // eslint-disable-next-line no-prototype-builtins
        component.ref
          ? Object.values(component.ref).indexOf(refValue) > -1
          : undefined
      ) {
        return component;
      }
      if (component.type === 'PARTIAL') {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return getDescendantByRef(refValue, component.descendants);
    }, null);

  const enrichVarObj = (obj: any) => {
    const returnObject = obj;
    if (data && data.model) {
      const property = data.model.properties.find(
        (prop: any) => prop.id === obj.id[0],
      );
      if (property) {
        returnObject.name = `{{ ${data.model.name}.${property.name} }}`;
      }
    }
    return returnObject;
  };

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
                  reuse the same structure without having to go through every
                  page.
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
                onChange={(value: any) => {
                  setShowValidation(false);
                  setModelId(value);
                  setTitleProperty('');
                  setDescriptionProperty('');
                }}
                value={modelId}
              />
            </Field>
            <Field label="Title property">
              <Text size="small" color="grey700" as="div">
                This property is also being used as search property.
              </Text>
              <PropertySelector
                modelId={modelId}
                onChange={(value: string) => {
                  setTitleProperty(value);
                }}
                value={titleProperty}
                disabled={!modelId}
              />
            </Field>
            <Field label="Description property">
              <PropertySelector
                modelId={modelId}
                onChange={(value: string) => {
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
              <Box pad="medium">
                <Text color="#000000DE" truncate="true">
                  {titleProperty.id
                    ? enrichVarObj(titleProperty).name
                    : 'Title'}
                </Text>
              </Box>
              <Box
                pad={{
                  top: 'none',
                  bottom: 'medium',
                  horizontal: 'medium',
                }}
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
      );
    },
    onSave: () => {
      if (!modelId) {
        setShowValidation(true);
        return;
      }
      const newPrefab = { ...prefab };
      if (modelId) {
        const dataList = getDescendantByRef('#dataList', newPrefab.structure);
        dataList.options[0].value = modelId;
        if (titleProperty.id) {
          const titleStructure = getDescendantByRef(
            '#Title',
            newPrefab.structure,
          );
          titleStructure.options[0].value = [enrichVarObj(titleProperty)];
          if (newPrefab.interactions) {
            newPrefab.interactions.push(
              {
                name: 'Filter',
                sourceEvent: 'onChange',
                parameters: [
                  {
                    parameter: 'property',
                    operator: 'regex',
                    resolveValue: false,
                    id: [...titleProperty.id],
                  },
                ],
                ref: {
                  targetComponentId: '#dataList',
                  sourceComponentId: '#searchField',
                },
                type: 'Custom',
              } as PrefabInteraction,
              {
                name: 'Filter',
                sourceEvent: 'onChange',
                parameters: [
                  {
                    parameter: 'property',
                    operator: 'regex',
                    resolveValue: false,
                    id: [...titleProperty.id],
                  },
                ],
                ref: {
                  targetComponentId: '#dataGrid',
                  sourceComponentId: '#searchField',
                },
                type: 'Custom',
              } as PrefabInteraction,
            );
          }
        }
        if (descriptionProperty.id) {
          const descriptionStructure = getDescendantByRef(
            '#Description',
            newPrefab.structure,
          );
          descriptionStructure.options[0].value = [
            enrichVarObj(descriptionProperty),
          ];
        }

        const dataGrid = getDescendantByRef('#dataGrid', newPrefab.structure);
        dataGrid.options[0].value = modelId;

        if (titleProperty.id) {
          dataGrid.descendants[0].descendants[1].options[2].value = [
            enrichVarObj(titleProperty),
          ];
        }
        if (descriptionProperty.id) {
          dataGrid.descendants[0].descendants[2].descendants[0].descendants[0].options[0].value =
            [enrichVarObj(descriptionProperty)];
        }

        // #region Partial Selection
        const prefabFooter = getDescendantByRef('#Footer', newPrefab.structure);
        const prefabHeader = getDescendantByRef('#Header', newPrefab.structure);
        if (headerPartialId) {
          prefabHeader.descendants = [{ type: 'PARTIAL', partialId: '' }];
          prefabHeader.descendants[0].partialId = headerPartialId;
        }

        if (footerPartialId) {
          prefabFooter.descendants = [{ type: 'PARTIAL', partialId: '' }];
          prefabFooter.descendants[0].partialId = footerPartialId;
        }
        // #endregion
        save(newPrefab);
      }
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
          <Footer
            onClose={close}
            onSkip={() => {
              const newPrefab = { ...prefab };
              save(newPrefab);
            }}
            onSave={stepper.onSave}
            canSave={stepNumber === stepper.stepAmount}
          />
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
      <Header onClose={close} title="Configure list view" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default makePrefab('Card and List view', attrs, beforeCreate, [
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
          DataList(
            {
              ref: { id: '#dataGrid' },
              options: {
                ...dataListOptions,
                pagination: option('CUSTOM', {
                  label: 'Pagination',
                  value: 'whenNeeded',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    dependsOn: 'model',
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
                }),
                take: number('Rows per page (max 50)', {
                  value: '5',
                  configuration: {
                    dependsOn: 'model',
                  },
                }),
                placeholderTake: number('Placeholder rows', {
                  value: '5',
                }),
                type: option('CUSTOM', {
                  label: 'Type',
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
                }),
                width: size('Min Width', {
                  value: '250px',
                  configuration: {
                    as: 'UNIT',
                    condition: showIf('type', 'EQ', 'grid'),
                  },
                }),
                outerSpacing: sizes('Outer space', {
                  value: ['M', '0rem', 'M', '0rem'],
                }),
              },
            },
            [],
          ),
        ],
      ),
    ],
  ),
]);
