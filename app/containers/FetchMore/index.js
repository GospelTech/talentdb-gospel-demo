/**
 *
 * FetchMore
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DoubleArrow } from '@material-ui/icons';
import { Box, Button } from '@material-ui/core';
import { getData, setNextPage } from '../Data/actions';
import { makeSelectData } from '../Data/selectors';

export function FetchMore({
  instanceID,
  data,
  setNextPageGenericFn,
  getDataGenericFn,
}) {
  const [getDataFn, setNextPageFn] = [
    getDataGenericFn,
    setNextPageGenericFn,
  ].map(fn => fn.call(this, instanceID));

  const fetchMore = () => {
    if (!data.loading && data.records.length > 0 && data.askMore) {
      setNextPageFn();
      getDataFn();
    }
  };

  return (
    <Box mx={2}>
      <Button
        color="primary"
        variant="contained"
        onClick={fetchMore}
        disabled={data.loading || !data.askMore}
      >
        <DoubleArrow />
      </Button>
    </Box>
  );
}

const mapStateToProps = (_, ownProps) =>
  createStructuredSelector({
    data: makeSelectData(ownProps),
  });

FetchMore.propTypes = {
  getDataGenericFn: PropTypes.func.isRequired,
  setNextPageGenericFn: PropTypes.func.isRequired,
  instanceID: PropTypes.string.isRequired,
  data: PropTypes.shape(),
};

function mapDispatchToProps(dispatch) {
  return {
    getDataGenericFn: instanceID => () => dispatch(getData(instanceID)),
    setNextPageGenericFn: instanceID => () => dispatch(setNextPage(instanceID)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FetchMore);
