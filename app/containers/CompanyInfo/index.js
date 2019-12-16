/**
 *
 * CompanyInfo
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Card, CardHeader, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from 'react-helmet';
import makeSelectCompanyInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
import { selectDefintion } from '../Form/actions';

import { Form } from '../Form';
import formInfoReducer from '../Form/reducer';
import Notifier from '../Notifier';
import { deleteData } from '../Account/actions';
import DialogPopUp from '../../components/DialogPopUp';

const useStyles = makeStyles(() => ({
  root: {},
}));

export function CompanyInfo({ selectDefinitionFn, deleteDataFn }) {
  useInjectReducer({ key: 'companyInfo', reducer });
  useInjectReducer({ key: 'formInfo', reducer: formInfoReducer });
  useInjectSaga({ key: 'companyInfo', saga });

  const classes = useStyles();

  useEffect(() => {
    selectDefinitionFn('viewersDefinition');
  }, []);

  return (
    <div>
      <Notifier />
      <Helmet>
        <title>Company Info</title>
      </Helmet>
      <Card className={classes.root}>
        <CardHeader
          subheader="The information can be edited"
          title="Company Info"
        />
        <Divider />
        <DialogPopUp parentFn={deleteDataFn} buttonText="DELETE COMPANY DATA" />
        <Form isUpdate path="credential.companyInfo" />
      </Card>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  companyInfo: makeSelectCompanyInfo(),
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

export default compose(withConnect)(CompanyInfo);
