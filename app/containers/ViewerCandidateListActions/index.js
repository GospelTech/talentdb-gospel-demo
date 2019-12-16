/**
 *
 * ViewerCandidateListActions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Box } from '@material-ui/core';
import makeSelectViewerCandidateListActions from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import LoadingButton from '../../components/LoadingButton';
import FetchMore from '../FetchMore';
import Reload from '../Reload';
import Toolbar from '../../components/Toolbar';
import { sendRequest } from './actions';
import { makeSelectDataSelectedLength } from '../Data/selectors';

export function ViewerCandidateListActions({
  instanceID,
  sendMoreDetailRequestFn,
  requesting,
  countSelected,
}) {
  useInjectReducer({ key: 'viewerCandidateListActions', reducer });
  useInjectSaga({ key: 'viewerCandidateListActions', saga });

  return (
    <Toolbar>
      <Box display="flex" justifyContent="flex-start">
        <LoadingButton
          color="secondary"
          variant="contained"
          disabled={countSelected === 0 || requesting}
          condition={requesting}
          onClick={() => sendMoreDetailRequestFn(instanceID)}
        >
          <FormattedMessage {...messages.requestInfo} />
        </LoadingButton>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <FetchMore instanceID={instanceID} />
        <Reload instanceID={instanceID} />
      </Box>
    </Toolbar>
  );
}

ViewerCandidateListActions.propTypes = {
  instanceID: PropTypes.string.isRequired,
  sendMoreDetailRequestFn: PropTypes.func.isRequired,
  requesting: PropTypes.bool.isRequired,
  countSelected: PropTypes.number.isRequired,
};

const mapStateToProps = (_, ownProps) =>
  createStructuredSelector({
    requesting: makeSelectViewerCandidateListActions(),
    countSelected: makeSelectDataSelectedLength(ownProps),
  });

function mapDispatchToProps(dispatch) {
  return {
    sendMoreDetailRequestFn: instanceID => dispatch(sendRequest(instanceID)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ViewerCandidateListActions);
