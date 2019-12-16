/*
 * CandidatePartnerViewRequests Messages
 *
 * This contains all the text for the CandidatePartnerViewRequests container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CandidatePartnerViewRequests';

export default defineMessages({
  approveRequest: {
    id: `${scope}.approveRequest`,
    defaultMessage: 'Approve Access',
  },
  revokeRequest: {
    id: `${scope}.revokeRequest`,
    defaultMessage: 'Revoke Access',
  },
});
