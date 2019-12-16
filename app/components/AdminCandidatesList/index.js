/**
 *
 * AdminCandidatesList
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Box, Typography } from '@material-ui/core';
import messages from './messages';
import Data from '../../containers/Data';
import RowDetail from '../../containers/RowDetail';
import { generateInstanceID } from '../../common/hashGenerator';
import AdminCandidatesListActions from '../../containers/AdminCandidatesListActions';

function AdminCandidatesList() {
  const instanceID = generateInstanceID('piiDataDefinition');

  return (
    <Fragment>
      <Helmet>
        <title>Candidates</title>
        <meta name="description" content="Candidates Page" />
      </Helmet>
      <Box display="flex" flexDirection="column">
        <Box my={2}>
          <Typography align="center" gutterBottom variant="h2">
            <FormattedMessage {...messages.candidatesList} />
          </Typography>
          <AdminCandidatesListActions instanceID={instanceID} />
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
            definitionName="piiDataDefinition"
            withSelect
            withDetailComponent={RowDetail('talentsDataDefinition', 'UserID')}
            withCustomFilter
          />
        </Box>
      </Box>
    </Fragment>
  );
}

AdminCandidatesList.propTypes = {};

export default AdminCandidatesList;
