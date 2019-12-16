/**
 *
 * AdminPortfolioCompaniesActions
 *
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import { destroy } from 'redux-form';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
} from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import config from 'config';
import messages from './messages';
import Toolbar, { useStyles } from '../../components/Toolbar';
import { Form } from '../Form';
import { formInfoReducer } from '../Form/reducer';
import saga from './saga';
import { dataDeleteSaga } from '../Data/saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { clearDataRecords, deleteData, getData } from '../Data/actions';
import { clearSent, selectDefintion } from '../Form/actions';
import {
  makeSelectDataDeleting,
  makeSelectDataSelectedRecords,
} from '../Data/selectors';
import { makeSelectSent } from '../Form/selectors';
import LoadingButton from '../../components/LoadingButton';
import FetchMore from '../FetchMore';
import Reload from '../Reload';
import { COMPANY_ACCOUNTS_DELETE } from './constants';

export function AdminPortfolioCompaniesActions({
  deleteDataGenericFn,
  selectedRecords,
  selectDefinitionFn,
  getDataGenericFn,
  clearDataGenericFn,
  clearSentFn,
  instanceID,
  deleting,
  sent,
}) {
  useInjectReducer({ key: 'formInfo', reducer: formInfoReducer });
  useInjectSaga({ key: 'adminPortfolioCompaniesActions', saga });
  useInjectSaga({ key: 'dataDelete', saga: dataDeleteSaga });

  const classes = useStyles();
  const deleteDataFn = deleteDataGenericFn(
    instanceID,
    config.recordDefinitions.viewersDefinition,
  );
  const clearDataFn = clearDataGenericFn(instanceID);
  const getDataFn = getDataGenericFn(instanceID);

  useEffect(() => {
    selectDefinitionFn('viewersDefinition');
  });

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    if (sent) {
      clearDataFn();
      getDataFn();
      clearSentFn();
    }
  }
  return (
    <Fragment>
      <Toolbar>
        <Box display="flex" justifyContent="flex-start">
          <Box mr={2}>
            <Button
              className={classes.importButton}
              color="primary"
              variant="contained"
              onClick={handleClickOpen}
            >
              <FormattedMessage {...messages.addNewCompany} />
            </Button>
          </Box>
          <Box mr={2}>
            <LoadingButton
              color="secondary"
              variant="contained"
              onClick={() => deleteDataFn(selectedRecords)}
              disabled={selectedRecords.length === 0 || deleting}
              condition={deleting}
            >
              <FormattedMessage {...messages.deleteSelectedCompanies} />
            </LoadingButton>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <FetchMore instanceID={instanceID} />
          <Reload instanceID={instanceID} />
        </Box>
      </Toolbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Viewer</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out this form.</DialogContentText>
          <Form />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

AdminPortfolioCompaniesActions.propTypes = {
  deleteDataGenericFn: PropTypes.func.isRequired,
  selectDefinitionFn: PropTypes.func.isRequired,
  clearSentFn: PropTypes.func.isRequired,
  getDataGenericFn: PropTypes.func.isRequired,
  clearDataGenericFn: PropTypes.func.isRequired,
  selectedRecords: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleting: PropTypes.bool.isRequired,
  sent: PropTypes.bool.isRequired,
  instanceID: PropTypes.string.isRequired,
};

const mapStateToProps = (_, ownProps) =>
  createStructuredSelector({
    selectedRecords: makeSelectDataSelectedRecords(ownProps),
    deleting: makeSelectDataDeleting(ownProps),
    sent: makeSelectSent(),
  });

function mapDispatchToProps(dispatch) {
  return {
    deleteDataGenericFn: (instanceID, definition) => selected =>
      dispatch(
        deleteData(instanceID, definition, selected, COMPANY_ACCOUNTS_DELETE),
      ),
    selectDefinitionFn: definition => dispatch(selectDefintion(definition)),
    clearSentFn: () => dispatch(clearSent()),
    clearDataGenericFn: instanceID => () =>
      dispatch(clearDataRecords(instanceID)),
    getDataGenericFn: instanceID => () => dispatch(getData(instanceID)),
    destroy: () => dispatch(destroy('form')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminPortfolioCompaniesActions);
