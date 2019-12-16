/**
 *
 * JobRelatedInfo
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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
import reducer from './reducer';
import saga from './saga';
import { Form } from '../Form';
import makeSelectAccount from '../Account/selectors';
import { selectDefintion } from '../Form/actions';
import formInfoReducer from '../Form/reducer';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

export function JobRelatedInfo({ selectDefinitionFn }) {
  useInjectReducer({ key: 'jobRelatedInfo', reducer });
  useInjectSaga({ key: 'jobRelatedInfo', saga });
  useInjectReducer({ key: 'formInfo', reducer: formInfoReducer });

  const classes = useStyles();

  useEffect(() => {
    selectDefinitionFn('talentsDataDefinition');
  }, []);

  return (
    <Box>
      <Helmet>
        <title>Employment</title>
      </Helmet>
      <Card className={classes.root}>
        <CardHeader
          subheader="The information can be edited"
          title="Employment"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Form isUpdate path="credential.candidateInfo" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

JobRelatedInfo.propTypes = {
  selectDefinitionFn: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    selectDefinitionFn: definition => dispatch(selectDefintion(definition)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(JobRelatedInfo);
