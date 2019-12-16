/*
 * DialogPopUp Messages
 *
 * This contains all the text for the DialogPopUp component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.DialogPopUp';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the DialogPopUp component!',
  },
});
