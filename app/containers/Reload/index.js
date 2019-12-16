/**
 *
 * Reload
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Refresh } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { getData, clearDataRecords } from '../Data/actions';
import { makeSelectData } from '../Data/selectors';
import Box from '../../../node_modules/@material-ui/core/Box/Box';

export function Reload({
  instanceID,
  data,
  setClearDataGenericFn,
  getDataGenericFn,
}) {
  const [getDataFn, setClearData] = [
    getDataGenericFn,
    setClearDataGenericFn,
  ].map(fn => fn.call(this, instanceID));

  const reload = () => {
    if (!data.loading) {
      setClearData();
      getDataFn();
    }
  };

  return (
    <Box>
      <Button
        color="primary"
        variant="contained"
        onClick={reload}
        disabled={data.loading}
      >
        <Refresh />
      </Button>
    </Box>
  );
}

const mapStateToProps = (_, ownProps) =>
  createStructuredSelector({
    data: makeSelectData(ownProps),
  });

Reload.propTypes = {
  getDataGenericFn: PropTypes.func.isRequired,
  setClearDataGenericFn: PropTypes.func.isRequired,
  instanceID: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    getDataGenericFn: instanceID => () => dispatch(getData(instanceID)),
    setClearDataGenericFn: instanceID => () =>
      dispatch(clearDataRecords(instanceID)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Reload);
