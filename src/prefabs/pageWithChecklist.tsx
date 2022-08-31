import * as React from 'react';
import {
  prefab,
  BeforeCreateArgs,
  Icon,
  InteractionType,
  PrefabInteraction,
  PrefabComponent,
} from '@betty-blocks/component-sdk';
import { Form } from './structures/ActionJSForm';

const beforeCreate = ({
  close,
  components: { CreateFormWizard },
  prefab: originalPrefab,
  prefabs,
  save,
}: BeforeCreateArgs) => {
  return (
    <CreateFormWizard
      close={close}
      prefab={originalPrefab}
      prefabs={prefabs}
      save={save}
    />
  );
};

const interactions: PrefabInteraction[] = [
  {
    type: InteractionType.Custom,
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#alertErrorId',
      sourceComponentId: '#formId',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Show',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#alertSuccessId',
      sourceComponentId: '#formId',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#alertSuccessId',
      sourceComponentId: '#formId',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#alertErrorId',
      sourceComponentId: '#formId',
    },
  },
];

const attributes = {
  icon: Icon.FormIcon,
  interactions,
  type: 'page',
  description: 'Page with checklist',
  detail:
    'It takes a few clicks to set up your login page. Connect your model to the form and feel free to customize your image to your liking.',
  previewUrl: 'https://preview.betty.app/login',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Login.jpg',
  category: 'FORM',
  isPublicPage: true,
};

const prefabStructure: PrefabComponent[] = [Form('Update Form Beta', true)];

export default prefab('Checklist', attributes, beforeCreate, prefabStructure);
