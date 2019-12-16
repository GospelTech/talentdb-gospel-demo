/**
 *
 * AccessRequests
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Filter, Match, Operators, Predicates } from '@gospel/gospel-sdk-js';
import { Typography } from '@material-ui/core';
import makeSelectAccessRequests from './selectors';
import reducer from './reducer';
import saga from './saga';
import dataReducer from '../Data/reducer';
import Notifier from '../Notifier';
import CandidateActions from '../AdminCandidateApprovalActions';
import Data from '../Data';
import RowDetail from '../RowDetail';
import { generateInstanceID } from '../../common/hashGenerator';

const match = new Match();
match.match = 'record.fields.Permitted';
match.predicate = Predicates.eq;
match.value = 'Not set';
const filter = new Filter(Operators.withAll, [match]);

export function AccessRequests({ location }) {
  useInjectReducer({ key: 'accessRequests', reducer });
  useInjectReducer({ key: 'data', reducer: dataReducer });
  useInjectSaga({ key: 'accessRequests', saga });

  const fullVersion = location.pathname !== '/dashboard';
  const instanceID = generateInstanceID(
    'accessRequestsDefinition',
    true,
    fullVersion || filter,
  );

  return (
    <div>
      <Notifier />
      {fullVersion && (
        <Helmet>
          <title>Access Requests</title>
          <meta name="description" content="Localglobe" />
        </Helmet>
      )}
      <Typography align="center" gutterBottom variant="h2">
        {!fullVersion && 'New'} Partner View Requests
      </Typography>
      <CandidateActions instanceID={instanceID} withApprove withRevoke />
      <Data
        instanceID={instanceID}
        definitionName="accessRequestsDefinition"
        isView
        withSelect
        withDetailComponent={RowDetail('viewersDefinition', 'RequestorUserID')}
        withFilter={fullVersion || filter}
      />
    </div>
  );
}

AccessRequests.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  accessRequests: makeSelectAccessRequests(),
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

export default compose(withConnect)(AccessRequests);
