/**
 *
 * CandidateApprovalTable
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Helmet } from 'react-helmet';
import { Box, Typography } from '@material-ui/core';
import makeSelectCandidateApprovalTable from './selectors';
import reducer from './reducer';
import saga from './saga';
import Data from '../Data';
import RowDetail from '../RowDetail';
import { generateInstanceID } from '../../common/hashGenerator';
import Toolbar from '../../components/Toolbar';
import FetchMore from '../FetchMore';
import Reload from '../Reload';

export function CandidateApprovalTable() {
  useInjectReducer({ key: 'candidateApprovalTable', reducer });
  useInjectSaga({ key: 'candidateApprovalTable', saga });

  const instanceID = generateInstanceID('piiDataDefinition');

  return (
    <Fragment>
      <Helmet>
        <title>Candidate Approval</title>
      </Helmet>
      <Box display="flex" flexDirection="column">
        <Box my={2}>
          <Typography align="center" gutterBottom variant="h2">
            Candidate Approval
          </Typography>
          <Toolbar>
            <Box display="flex" justifyContent="flex-start" />
            <Box display="flex" justifyContent="flex-end">
              <FetchMore instanceID={instanceID} />
              <Reload instanceID={instanceID} />
            </Box>
          </Toolbar>
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
            withDetailComponent={RowDetail(
              'talentsDataDefinition',
              'UserID',
              true,
            )}
          />
        </Box>
      </Box>
    </Fragment>
  );
}

CandidateApprovalTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  candidateApprovalTable: makeSelectCandidateApprovalTable(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CandidateApprovalTable);
