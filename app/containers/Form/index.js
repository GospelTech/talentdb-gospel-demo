/**
 *
 * Form
 *
 */

import React, { memo } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { reduxForm } from 'redux-form';
import { makeSelectData, makeSelectSending } from './selectors';
import reducer from './reducer';
import saga from './saga';
import RenderField from '../../components/RenderField';
import { postRecord } from './actions';

const lens = (obj, path) =>
  path.split('.').reduce((o, key) => (o && o[key] ? o[key] : {}), obj);

export function ReactForm({
  handleSubmit,
  pristine,
  reset,
  submitting,
  makeUpsertInfoFn,
  definition,
  title,
  subheader,
  sending,
  isUpdate,
}) {
  useInjectReducer({ key: 'formInfo', reducer });
  useInjectSaga({ key: 'form', saga });

  const upsertInfoFn = makeUpsertInfoFn(isUpdate, definition);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(upsertInfoFn)}>
      <Card>
        {title && [
          <CardHeader subheader={subheader} title={title} />,
          <Divider />,
        ]}
        <CardContent>
          <Grid container spacing={3}>
            {definition.fields
              .filter(f => f.meta.displayInTable)
              .sort((a, b) => Number(a.meta.order) - Number(b.meta.order))
              .map(v => (
                <Grid item md={6} xs={12} key={v.name}>
                  {RenderField(v)}
                </Grid>
              ))}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={submitting || sending}
          >
            Save details
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={pristine || submitting || sending}
            onClick={reset}
          >
            Clear Values
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

ReactForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  makeUpsertInfoFn: PropTypes.func,
  definition: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
  sending: PropTypes.bool,
  isUpdate: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  definition: makeSelectData(),
  sending: makeSelectSending(),
  initialValues: (state, ownProps) =>
    ownProps.path ? lens(state, ownProps.path) : {},
});

function mapDispatchToProps(dispatch) {
  return {
    makeUpsertInfoFn: (update, definition) => fields =>
      dispatch(postRecord(update, definition, fields)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const Form = compose(
  withConnect,
  memo,
  reduxForm({
    destroyOnUnmount: false,
    form: 'ReactForm',
  }),
)(ReactForm);
