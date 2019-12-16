/**
 *
 * CandidatePartnerViewRequests
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { Box } from '@material-ui/core';
import saga from './saga';
import Toolbar from '../../components/Toolbar';
import { approveRequests, revokeRequests } from './actions';
import { dataChangeSaga } from '../Data/saga';
import {
  makeSelectDataAltering,
  makeSelectDataSelectedLength,
} from '../Data/selectors';
import LoadingButton from '../../components/LoadingButton';
import messages from './messages';
import FetchMore from '../FetchMore';
import Reload from '../Reload';

export function CandidatePartnerViewRequests({
  withApprove,
  withRevoke,
  approveRequestsGenericFn,
  revokeRequestsGenericFn,
  altering,
  countSelected,
  instanceID,
}) {
  useInjectSaga({ key: 'candidateActions', saga });
  useInjectSaga({ key: 'dataChangeSaga', saga: dataChangeSaga });

  const [approveRequestsFn, revokeRequestsFn] = [
    approveRequestsGenericFn,
    revokeRequestsGenericFn,
  ].map(fn => fn.call(this, instanceID));

  const [button, setButton] = React.useState(0);

  return (
    <Toolbar>
      <Box display="flex" justifyContent="flex-start">
        {withApprove && (
          <Box mr={2}>
            <LoadingButton
              disabled={countSelected === 0 || altering}
              color="primary"
              variant="contained"
              onClick={() => {
                setButton(1);
                approveRequestsFn();
              }}
              condition={button === 1 && altering}
            >
              <FormattedMessage {...messages.approveRequest} />
            </LoadingButton>
          </Box>
        )}
        {withRevoke && (
          <Box mr={2}>
            <LoadingButton
              disabled={countSelected === 0 || altering}
              color="secondary"
              variant="contained"
              onClick={() => {
                setButton(2);
                revokeRequestsFn();
              }}
              condition={button === 2 && altering}
            >
              <FormattedMessage {...messages.revokeRequest} />
            </LoadingButton>
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <FetchMore instanceID={instanceID} />
        <Reload instanceID={instanceID} />
      </Box>
    </Toolbar>
  );
}

CandidatePartnerViewRequests.propTypes = {
  dispatch: PropTypes.func,
  withApprove: PropTypes.bool,
  withRevoke: PropTypes.bool,
  altering: PropTypes.bool.isRequired,
  countSelected: PropTypes.number.isRequired,
  approveRequestsGenericFn: PropTypes.func.isRequired,
  revokeRequestsGenericFn: PropTypes.func.isRequired,
  instanceID: PropTypes.string.isRequired,
};

const mapStateToProps = (_, ownProps) =>
  createStructuredSelector({
    altering: makeSelectDataAltering(ownProps),
    countSelected: makeSelectDataSelectedLength(ownProps),
  });

function mapDispatchToProps(dispatch) {
  return {
    approveRequestsGenericFn: instanceID => () =>
      dispatch(approveRequests(instanceID)),
    revokeRequestsGenericFn: instanceID => () =>
      dispatch(revokeRequests(instanceID)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CandidatePartnerViewRequests);
