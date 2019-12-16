/**
 *
 * CandidateJoinRequests
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import { Filter, Operators } from '@gospel/gospel-sdk-js';
import messages from './messages';
import Data from '../../containers/Data';
import RowDetail from '../../containers/RowDetail';
import { generateInstanceID } from '../../common/hashGenerator';
import { matchApproved, matchCandidates } from './filter';
import AdminCandidateApprovalActions from '../../containers/AdminCandidateApprovalActions';

function CandidateJoinRequests({ withPending }) {
  const filter = new Filter(Operators.withAll, [
    matchCandidates,
    ...(withPending ? [matchApproved] : []),
  ]);

  const instanceID = generateInstanceID('candidatesDefinition', true, filter);
  const values = { new: withPending ? 'New' : '' };

  return (
    <Fragment>
      <Box display="flex" flexDirection="column">
        <Box my={2}>
          <Typography align="center" gutterBottom variant="h2">
            <FormattedMessage {...messages.candidateRequests} values={values} />
          </Typography>
          <AdminCandidateApprovalActions
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
            definitionName="candidatesDefinition"
            isView
            withSelect
            withDetailComponent={RowDetail(
              'talentsDataDefinition',
              'UserID',
              true,
            )}
            withFilter={filter}
          />
        </Box>
      </Box>
    </Fragment>
  );
}

CandidateJoinRequests.propTypes = {
  withPending: PropTypes.bool,
};

export default CandidateJoinRequests;
