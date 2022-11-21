import * as Core from '@material-ui/core';
import * as Lab from '@material-ui/lab';
import * as Pickers from '@material-ui/pickers';
import * as Styles from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import nlLocale from 'date-fns/locale/nl';
// import * as Slate from 'slate';
// import * as SlateReact from 'slate-react';
// import * as SlateHistory from 'slate-history';
// import * as SlateHyperscript from 'slate-hyperscript';
import { icons } from './icons';

export default {
  Core,
  Icons: icons,
  Lab,
  Pickers,
  Styles,
  DateFnsUtils,
  DateLocales: { enLocale, nlLocale },
  // Slate,
  // SlateReact,
  // SlateHistory,
  // SlateHyperscript,
};
