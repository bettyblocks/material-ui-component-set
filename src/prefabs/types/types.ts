export declare enum PropertyKind {
  AUTO_INCREMENT = 'AUTO_INCREMENT',
  BELONGS_TO = 'BELONGS_TO',
  BOOLEAN = 'BOOLEAN',
  BOOLEAN_EXPRESSION = 'BOOLEAN_EXPRESSION',
  COUNT = 'COUNT',
  DATE = 'DATE',
  DATE_EXPRESSION = 'DATE_EXPRESSION',
  DATE_TIME = 'DATE_TIME',
  DATE_TIME_EXPRESSION = 'DATE_TIME_EXPRESSION',
  DECIMAL = 'DECIMAL',
  DECIMAL_EXPRESSION = 'DECIMAL_EXPRESSION',
  EMAIL = 'EMAIL',
  EMAIL_ADDRESS = 'EMAIL_ADDRESS',
  ENUM = 'ENUM',
  FILE = 'FILE',
  FLOAT = 'FLOAT',
  GOOGLE_DOCUMENT = 'GOOGLE_DOCUMENT',
  HAS_AND_BELONGS_TO_MANY = 'HAS_AND_BELONGS_TO_MANY',
  HAS_MANY = 'HAS_MANY',
  HAS_ONE = 'HAS_ONE',
  IBAN = 'IBAN',
  IMAGE = 'IMAGE',
  INTEGER = 'INTEGER',
  INTEGER_EXPRESSION = 'INTEGER_EXPRESSION',
  LIST = 'LIST',
  LOGIN_TOKEN = 'LOGIN_TOKEN',
  MINUTES = 'MINUTES',
  MINUTES_EXPRESSION = 'MINUTES_EXPRESSION',
  MULTI_FILE = 'MULTI_FILE',
  MULTI_IMAGE = 'MULTI_IMAGE',
  PASSWORD = 'PASSWORD',
  PDF = 'PDF',
  PERIODIC_COUNT = 'PERIODIC_COUNT',
  PHONE_NUMBER = 'PHONE_NUMBER',
  PRICE = 'PRICE',
  PRICE_EXPRESSION = 'PRICE_EXPRESSION',
  RICH_TEXT = 'RICH_TEXT',
  SERIAL = 'SERIAL',
  SIGNED_PDF = 'SIGNED_PDF',
  STRING = 'STRING',
  STRING_EXPRESSION = 'STRING_EXPRESSION',
  SUM = 'SUM',
  TEXT = 'TEXT',
  TEXT_EXPRESSION = 'TEXT_EXPRESSION',
  TIME = 'TIME',
  URL = 'URL',
  ZIPCODE = 'ZIPCODE',
}
interface SdkProperty {
  id: string;
  name: string;
  label: string;
  kind: PropertyKind;
}
export interface Property {
  id: string[];
  name?: string;
  label?: string;
  kind?: PropertyKind;
  format?: string;
}

export interface Properties {
  id: string;
  name: string;
  label: string;
  kind: PropertyKind;
  format: string;
}

export interface PropertyStateProps extends Omit<Property, 'id'> {
  id: string | string[];
}

export interface IdPropertyProps {
  id: string;
  name: string;
  label: string;
  kind: PropertyKind;
}

export interface RelationPropertyProps extends IdPropertyProps {
  modelId: string;
}

export interface ModelProps {
  id: string;
  label: string;
  name: string;
  helpText: string;
  properties: Properties[];
  relationships: RelationPropertyProps[];
}

export interface ModelQuery {
  model: ModelProps;
}

export interface Endpoint {
  __typename: string;
  authenticationProfileId: string;
  cache: boolean;
  cachedFullPath: string;
  contentType: string;
  debugMode: boolean;
  description?: string;
  id: string;
  online: true;
  options: {
    __typename: 'EndpointOptions';
    componentSetUrl?: string;
    runtimeTarget: string;
    showDefaultComponentSet: boolean;
  };
  page: {
    __typename: string;
    description: string;
    id: string;
    name: string;
    rootId: string;
    title: string;
    type: string;
  };
  pageId: string;
  redirectUrl: string;
  redirectUrlForLogin: string;
  requestMethod: string;
  template: string;
  url: string;
  params?: { [key: string]: any };
}

export interface AuthenticationProfile {
  default: boolean;
  id: string;
  kind: AuthenticationProfileKind;
  loginModel: string;
  name: string;
  options: AuthenticationProfileOptions;
  properties?: Array<SdkProperty>;
}
export interface AuthenticationProfileOptions {
  loginVariable: string;
  usernameProperty: string | null;
  passwordProperty: string | null;
  localeProperty: string | null;
  redirectEndpoint: string | null;
  refreshTokenTimeout: number | null;
  accessTokenTimeout: number | null;
}

export declare enum AuthenticationProfileKind {
  customAuthentication = 'customAuthentication',
  usernamePassword = 'usernamePassword',
}

export type PermissionType = 'private' | 'public' | 'inherit';
