import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  option,
  text,
  sizes,
  size,
  PrefabReference,
  BeforeCreateArgs,
  buttongroup,
  PrefabComponentOption,
} from '@betty-blocks/component-sdk';
import {
  Box as BoxPrefab,
  Column,
  boxOptions,
  columnOptions,
  Row,
  rowOptions,
} from './structures';

const attrs = {
  icon: Icon.NavbarIcon,
  type: 'page',
  isPublicPage: true,
  description: 'Configure a 403, 404 or 500 error page for your application.',
  detail:
    'You can choose between a 403 page for unauthorized access, a 404 page for when a page could not be found or a 500 for an internal server error.',
  previewUrl: 'https://preview.betty.app/404-styled',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Errors.jpg',
  category: 'LAYOUT',
};

const beforeCreate = ({
  save,
  close,
  prefab,
  components: {
    Header,
    Content,
    ButtonGroup,
    ButtonGroupButton,
    Footer,
    Field,
    Box,
    Text,
    EndpointSelector,
  },
  helpers: { cloneStructure, setOption },
}: BeforeCreateArgs) => {
  const [activeErrorType, setActiveErrorType] = React.useState('403');
  const [varient, setVarient] = React.useState('styled');
  const [selectedEndpoint, setSelectedEndpoint] = React.useState({
    id: '',
    pageId: '',
    params: {},
  });
  const [renderValues, setRenderValues] = React.useState({
    image:
      'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/404.svg',
    errorCode: '404',
    errorMessage: 'Page not found.',
    subMessage: "We can't seem to find that one.",
    defaultPreviewImage:
      'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_404_.jpg',
    styledPreviewImage:
      'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_404_Styled_.jpg',
  });

  React.useEffect(() => {
    switch (activeErrorType) {
      case '403':
        setRenderValues({
          image:
            'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/403.svg',
          errorCode: '403',
          errorMessage: 'Unauthorized.',
          subMessage: 'You do not have access to this page.',
          defaultPreviewImage:
            'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_403.jpg',
          styledPreviewImage:
            'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_403_Styled.jpg',
        });
        break;
      case '404':
        setRenderValues({
          image:
            'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/404.svg',
          errorCode: '404',
          errorMessage: 'Page not found.',
          subMessage: "We can't seem to find that one.",
          defaultPreviewImage:
            'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_404_.jpg',
          styledPreviewImage:
            'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_404_Styled_.jpg',
        });
        break;
      case '500':
      default:
        setRenderValues({
          image:
            'https://assets.bettyblocks.com/771d40f1fc49403e824cdca2fe025aeb_assets/files/500.svg',
          errorCode: '500',
          errorMessage: 'Internal server error',
          subMessage: 'Seems something is wrong ... Try again later',
          defaultPreviewImage:
            'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/500.jpg',
          styledPreviewImage:
            'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/500_Styled.jpg',
        });
        break;
    }
  }, [activeErrorType]);

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

  const structureDefault = (
    errorCode: string,
    errorMessage: string,
    subMessage: string,
    hasRedirectButton: boolean,
    linkToValue: string | { id: string; pageId: string; params: {} },
  ) => {
    const outerBox = cloneStructure('Box');
    const errorCodeText = cloneStructure('Text');
    if (errorCodeText.type === 'COMPONENT') {
      setOption(errorCodeText, 'content', (opt: PrefabComponentOption) => ({
        ...opt,
        value: [errorCode],
      }));
      setOption(errorCodeText, 'type', (opt: PrefabComponentOption) => ({
        ...opt,
        value: ['Title1'],
      }));
      setOption(
        errorCodeText,
        'textAlignment',
        (opt: PrefabComponentOption) => ({ ...opt, value: 'center' }),
      );
      setOption(
        errorCodeText,
        'outerSpacing',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: ['S', '0rem', '0rem', '0rem'],
        }),
      );
    }

    const errorMessageText = cloneStructure('Text');
    if (errorMessageText.type === 'COMPONENT') {
      setOption(errorMessageText, 'content', (opt: PrefabComponentOption) => ({
        ...opt,
        value: [errorMessage],
      }));
      setOption(errorMessageText, 'type', (opt: PrefabComponentOption) => ({
        ...opt,
        value: ['Title5'],
      }));
      setOption(
        errorMessageText,
        'textAlignment',
        (opt: PrefabComponentOption) => ({ ...opt, value: 'center' }),
      );
      setOption(
        errorMessageText,
        'outerSpacing',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: ['0rem', '0rem', 'L', '0rem'],
        }),
      );
    }

    const subMessageText = cloneStructure('Text');
    if (subMessageText.type === 'COMPONENT') {
      setOption(subMessageText, 'content', (opt: PrefabComponentOption) => ({
        ...opt,
        value: [subMessage],
      }));
      setOption(
        subMessageText,
        'useInnerHtml',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: false,
        }),
      );
      setOption(subMessageText, 'type', (opt: PrefabComponentOption) => ({
        ...opt,
        value: ['Body1'],
      }));
      setOption(
        subMessageText,
        'textAlignment',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: 'center',
        }),
      );
      setOption(
        subMessageText,
        'outerSpacing',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: ['S', '0rem', 'M', '0rem'],
        }),
      );
      setOption(subMessageText, 'textColor', (opt: PrefabComponentOption) => ({
        ...opt,
        value: 'Dark',
      }));
    }

    if (hasRedirectButton) {
      const redirectButton = cloneStructure('Open Page');
      if (redirectButton.type === 'COMPONENT') {
        redirectButton.style = {
          overwrite: {
            boxShadow: 'none',
            padding: ['0.6875rem', '1.375rem'],
            fontWeight: '400',
            textTransform: 'none',
          },
        };
        setOption(
          redirectButton,
          'buttonText',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: ['Go back'],
          }),
        );
        setOption(redirectButton, 'linkTo', (opt: PrefabComponentOption) => ({
          ...opt,
          value: linkToValue,
        }));
      }

      const buttonBox = cloneStructure('Box');
      if (buttonBox.type === 'COMPONENT') {
        setOption(buttonBox, 'alignment', (opt: PrefabComponentOption) => ({
          ...opt,
          value: 'center',
        }));

        buttonBox.descendants = [redirectButton];
      }
      if (outerBox.type === 'COMPONENT') {
        outerBox.descendants = [
          errorCodeText,
          errorMessageText,
          subMessageText,
          buttonBox,
        ];
      }
      return outerBox;
    }
    if (outerBox.type === 'COMPONENT') {
      outerBox.descendants = [errorCodeText, errorMessageText, subMessageText];
    }
    return outerBox;
  };

  const structureStyled = (
    errorMessage: string,
    subMessage: string,
    imageUrl: string,
    hasRedirectButton: boolean,
    linkToValue: string | { id: string; pageId: string; params: {} },
  ) => {
    const outerBox = cloneStructure('Box');
    if (outerBox.type === 'COMPONENT') {
      setOption(outerBox, 'width', (opt: PrefabComponentOption) => ({
        ...opt,
        value: '100%',
      }));
    }

    const backgroundBox = cloneStructure('Box');
    if (backgroundBox.type === 'COMPONENT') {
      setOption(backgroundBox, 'height', (opt: PrefabComponentOption) => ({
        ...opt,
        value: '30vh',
      }));
      setOption(backgroundBox, 'width', (opt: PrefabComponentOption) => ({
        ...opt,
        value: '100%',
      }));
      setOption(
        backgroundBox,
        'outerSpacing',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: ['0rem', '0rem', 'M', '0rem'],
        }),
      );
      setOption(
        backgroundBox,
        'backgroundUrl',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: [imageUrl],
        }),
      );
      setOption(
        backgroundBox,
        'backgroundSize',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: 'contain',
        }),
      );
    }

    const centerBox = cloneStructure('Box');
    if (centerBox.type === 'COMPONENT') {
      setOption(centerBox, 'width', (opt: PrefabComponentOption) => ({
        ...opt,
        value: '100%',
      }));
    }

    const errorMessageText = cloneStructure('Text');
    if (errorMessageText.type === 'COMPONENT') {
      setOption(errorMessageText, 'content', (opt: PrefabComponentOption) => ({
        ...opt,
        value: [errorMessage],
      }));
      setOption(errorMessageText, 'type', (opt: PrefabComponentOption) => ({
        ...opt,
        value: ['Title4'],
      }));
      setOption(
        errorMessageText,
        'textAlignment',
        (opt: PrefabComponentOption) => ({ ...opt, value: 'center' }),
      );
    }

    const subMessageText = cloneStructure('Text');
    if (subMessageText.type === 'COMPONENT') {
      setOption(subMessageText, 'content', (opt: PrefabComponentOption) => ({
        ...opt,
        value: [subMessage],
      }));
      setOption(
        subMessageText,
        'useInnerHtml',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: false,
        }),
      );
      setOption(subMessageText, 'type', (opt: PrefabComponentOption) => ({
        ...opt,
        value: ['Body1'],
      }));
      setOption(
        subMessageText,
        'textAlignment',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: 'center',
        }),
      );
      setOption(
        subMessageText,
        'outerSpacing',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: ['S', '0rem', '0rem', '0rem'],
        }),
      );
      setOption(subMessageText, 'textColor', (opt: PrefabComponentOption) => ({
        ...opt,
        value: 'Medium',
      }));
    }

    if (hasRedirectButton) {
      const redirectButton = cloneStructure('Open Page');
      if (redirectButton.type === 'COMPONENT') {
        redirectButton.style = {
          overwrite: {
            boxShadow: 'none',
            padding: ['0.6875rem', '1.375rem'],
            fontWeight: '400',
            textTransform: 'none',
          },
        };
        setOption(
          redirectButton,
          'buttonText',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: ['Go back'],
          }),
        );
        setOption(redirectButton, 'linkTo', (opt: PrefabComponentOption) => ({
          ...opt,
          value: linkToValue,
        }));
      }

      const buttonBox = cloneStructure('Box');
      if (buttonBox.type === 'COMPONENT') {
        setOption(buttonBox, 'alignment', (opt: PrefabComponentOption) => ({
          ...opt,
          value: 'center',
        }));
        setOption(buttonBox, 'innerSpacing', (opt: PrefabComponentOption) => ({
          ...opt,
          value: ['M', '0rem', '0rem', '0rem'],
        }));

        buttonBox.descendants = [redirectButton];
      }
      if (
        outerBox.type === 'COMPONENT' &&
        centerBox.type === 'COMPONENT' &&
        backgroundBox.type === 'COMPONENT'
      ) {
        centerBox.descendants = [errorMessageText, subMessageText, buttonBox];
        outerBox.descendants = [backgroundBox, centerBox];
      }

      return outerBox;
    }
    if (
      outerBox.type === 'COMPONENT' &&
      centerBox.type === 'COMPONENT' &&
      backgroundBox.type === 'COMPONENT'
    ) {
      centerBox.descendants = [errorMessageText, subMessageText];
      outerBox.descendants = [backgroundBox, centerBox];
    }

    return outerBox;
  };

  const renderPreview = () => {
    switch (varient) {
      case 'default':
        return (
          <Box
            pad="medium"
            background={`url(${renderValues.defaultPreviewImage})`}
            height="300px"
            justify="center"
            align="center"
          />
        );
      case 'styled':
      default:
        return (
          <Box
            pad="medium"
            background={`url(${renderValues.styledPreviewImage})`}
            height="300px"
            justify="center"
            align="center"
          />
        );
    }
  };

  const renderField = () => {
    if (activeErrorType === '500') {
      return null;
    }
    return (
      <Field label="Link to page (optional)">
        <EndpointSelector
          value={selectedEndpoint}
          onChange={(value: { id: string; pageId: string; params: {} }) =>
            setSelectedEndpoint(value)
          }
        />
      </Field>
    );
  };

  return (
    <>
      <Header onClose={close} title="Configure error page" />
      <Box
        justify="center"
        margin={{ bottom: '2rem', left: '2rem', top: '-1rem' }}
      >
        <Text size="medium" weight="bold">
          Step: 2 / 2
        </Text>
      </Box>
      <Content>
        <Box direction="row" gap="small">
          <Field label="Select error type">
            <ButtonGroup
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => {
                setActiveErrorType(value);
              }}
              value={activeErrorType}
            >
              <ButtonGroupButton label="403" value="403" name="types" />
              <ButtonGroupButton label="404" value="404" name="types" />
              <ButtonGroupButton label="500" value="500" name="types" />
            </ButtonGroup>
          </Field>
          <Field label="Select template version">
            <ButtonGroup
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => {
                setVarient(value);
              }}
              value={varient}
            >
              <ButtonGroupButton
                label="Styled"
                value="styled"
                name="varients"
              />
              <ButtonGroupButton
                label="Simple"
                value="default"
                name="varients"
              />
            </ButtonGroup>
          </Field>
        </Box>

        <Box direction="column">
          <Field
            info={
              <Text size="small" color="grey700">
                This is what the page will look like on the canvas
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
            {renderPreview()}
          </Box>
          <Box margin={{ top: '20px' }}>{renderField()}</Box>
        </Box>
      </Content>
      <Footer
        onClick={close}
        onSave={() => {
          const newPrefab = { ...prefab };
          const pageContent = getDescendantByRef(
            '#pageContent',
            newPrefab.structure,
          );

          switch (varient) {
            case 'default':
              if (activeErrorType === '403' || activeErrorType === '404') {
                const linkToValue = selectedEndpoint.id.length
                  ? selectedEndpoint
                  : '';
                const pageStructure = structureDefault(
                  renderValues.errorCode,
                  renderValues.errorMessage,
                  renderValues.subMessage,
                  true,
                  linkToValue,
                );
                pageContent.descendants.push(pageStructure);
              }
              if (activeErrorType === '500') {
                const pageStructure = structureDefault(
                  renderValues.errorCode,
                  renderValues.errorMessage,
                  renderValues.subMessage,
                  false,
                  '',
                );
                pageContent.descendants.push(pageStructure);
              }
              break;
            case 'styled':
            default:
              if (activeErrorType === '403' || activeErrorType === '404') {
                const linkToValue = selectedEndpoint.id.length
                  ? selectedEndpoint
                  : '';
                const pageStructure = structureStyled(
                  renderValues.errorMessage,
                  renderValues.subMessage,
                  renderValues.image,
                  true,
                  linkToValue,
                );
                pageContent.descendants.push(pageStructure);
              }
              if (activeErrorType === '500') {
                const pageStructure = structureStyled(
                  renderValues.errorMessage,
                  renderValues.subMessage,
                  renderValues.image,
                  false,
                  '',
                );
                pageContent.descendants.push(pageStructure);
              }
              break;
          }

          save(newPrefab);
        }}
      />
    </>
  );
};

export default makePrefab('Various error pages', attrs, beforeCreate, [
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
          BoxPrefab(
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
                height: size('Height', {
                  value: '100%',
                  configuration: {
                    as: 'UNIT',
                  },
                }),
              },
              ref: {
                id: '#pageContent',
              },
            },
            [],
          ),
        ],
      ),
    ],
  ),
]);
