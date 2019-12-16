/**
 *
 * AdminCandidatesListActions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Box } from '@material-ui/core';
import messages from './messages';
import Toolbar from '../../components/Toolbar';
import LoadingButton from '../../components/LoadingButton';
import {
  makeSelectDataDeleting,
  makeSelectDataSelectedRecords,
} from '../Data/selectors';
import { deleteUsers } from './actions';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { useInjectReducer } from '../../utils/injectReducer';
import dataReducer from '../Data/reducer';
import FetchMore from '../FetchMore';
import Reload from '../Reload';

export function AdminCandidatesListActions({
  deleting,
  selectedRecords,
  deleteUsersGenericFn,
  instanceID,
}) {
  useInjectReducer({ key: 'data', reducer: dataReducer });
  useInjectSaga({ key: 'adminCandidatesListActions', saga });

  const deleteUsersFn = deleteUsersGenericFn(instanceID);

  return (
    <Toolbar>
      <Box display="flex" justifyContent="flex-start">
        <LoadingButton
          color="secondary"
          variant="contained"
          onClick={() => deleteUsersFn(selectedRecords)}
          disabled={selectedRecords.length === 0 || deleting}
          condition={deleting}
        >
          <FormattedMessage {...messages.deleteCandidates} />
        </LoadingButton>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <FetchMore instanceID={instanceID} />
        <Reload instanceID={instanceID} />
      </Box>
    </Toolbar>
  );
}

AdminCandidatesListActions.propTypes = {
  deleting: PropTypes.bool.isRequired,
  selectedRecords: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteUsersGenericFn: PropTypes.func.isRequired,
  instanceID: PropTypes.string.isRequired,
};

const mapStateToProps = (_, ownProps) =>
  createStructuredSelector({
    deleting: makeSelectDataDeleting(ownProps),
    selectedRecords: makeSelectDataSelectedRecords(ownProps),
  });

function mapDispatchToProps(dispatch) {
  return {
    deleteUsersGenericFn: instanceID => selectedIds =>
      dispatch(deleteUsers(instanceID, selectedIds)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminCandidatesListActions);
