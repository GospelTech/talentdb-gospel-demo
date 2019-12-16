/**
 *
 * Account
 *
 */

import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Box,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import makeSelectAccount from './selectors';
import reducer from './reducer';
import formInfoReducer from '../Form/reducer';
import saga from './saga';
import { selectDefintion } from '../Form/actions';
import { Form } from '../Form';
import { deleteData } from './actions';
import DialogPopUp from '../../components/DialogPopUp';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  deleteButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  dialog: {
    marginTop: theme.spacing(2),
  },
  optionButton: {
    margin: '0 auto',
  },
}));

export function Account({ selectDefinitionFn, deleteDataFn }) {
  useInjectReducer({ key: 'account', reducer });
  useInjectReducer({ key: 'formInfo', reducer: formInfoReducer });
  useInjectSaga({ key: 'account', saga });

  const classes = useStyles();

  useEffect(() => {
    selectDefinitionFn('piiDataDefinition');
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Account</title>
      </Helmet>
      <Box width="100%">
        <Card className={classes.root}>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <DialogPopUp parentFn={deleteDataFn} buttonText="DELETE DATA" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Form isUpdate path="credential.candidateInfo" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Fragment>
  );
}

Account.propTypes = {
  selectDefinitionFn: PropTypes.func,
  deleteDataFn: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    selectDefinitionFn: definition => dispatch(selectDefintion(definition)),
    deleteDataFn: () => dispatch(deleteData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Account);
