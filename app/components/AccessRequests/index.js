/**
 *
 * AccessRequests
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useInjectReducer } from 'utils/injectReducer';
import { Box, Typography } from '@material-ui/core';
import filter from './filter';
import dataReducer from '../../containers/Data/reducer';
import CandidatePartnerViewRequests from '../../containers/CandidatePartnerViewRequests';
import Data from '../../containers/Data/index';
import RowDetail from '../../containers/RowDetail/index';
import { generateInstanceID } from '../../common/hashGenerator';

export function AccessRequests({ withFilter }) {
  useInjectReducer({ key: 'data', reducer: dataReducer });

  const instanceID = generateInstanceID(
    'accessRequestsDefinition',
    true,
    withFilter && filter,
  );

  return (
    <Box display="flex" flexDirection="column">
      <Box marginY={2}>
        <Typography align="center" gutterBottom variant="h2">
          {withFilter && 'New'} Partner View Requests
        </Typography>
        <CandidatePartnerViewRequests
          instanceID={instanceID}
          withApprove
          withRevoke
        />
      </Box>
      <Box
        my={2}
        display="flex"
        width="100%"
        height="100%"
        minWidth="100%"
        flexGrow={1}
      >
        <Data
          instanceID={instanceID}
          definitionName="accessRequestsDefinition"
          isView
          withSelect
          withDetailComponent={RowDetail(
            'viewersDefinition',
            'RequestorUserID',
          )}
          withFilter={withFilter && filter}
        />
      </Box>
    </Box>
  );
}

AccessRequests.propTypes = {
  withFilter: PropTypes.bool,
};
