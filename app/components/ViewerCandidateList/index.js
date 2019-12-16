/**
 *
 * ViewerCandidateList
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Box, Typography } from '@material-ui/core';
import messages from './messages';
import { generateInstanceID } from '../../common/hashGenerator';
import Data from '../../containers/Data';
import RecordDetail from '../RecordDetail';
import ViewerCandidateListActions from '../../containers/ViewerCandidateListActions';
import HighlightRow from '../HighlightRow';
import FetchDetail from '../../containers/FetchDetail';

function ViewerCandidateList() {
  const instanceID = generateInstanceID('talentsDataDefinition', true);

  return (
    <Fragment>
      <Helmet>
        <title>Candidates</title>
      </Helmet>
      <Box display="flex" flexDirection="column">
        <Box my={2}>
          <Typography align="center" gutterBottom variant="h2">
            <FormattedMessage {...messages.header} />
          </Typography>
          <ViewerCandidateListActions instanceID={instanceID} />
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
            isView
            definitionName="talentsDataDefinition"
            withSelect
            withDetailComponent={RecordDetail}
            withRowComponent={FetchDetail(
              HighlightRow,
              'accessRequestsDefinition',
              'UserID',
              true,
              true,
            )}
            withCustomFilter
          />
        </Box>
      </Box>
    </Fragment>
  );
}

ViewerCandidateList.propTypes = {};

export default ViewerCandidateList;
