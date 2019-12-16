/**
 *
 * RowDetail
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { SyncLoader } from 'react-spinners';
import { Typography } from '@material-ui/core';
import makeSelectRowDetailDefinition from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchDetail } from './actions';
import RecordDetail from '../../components/RecordDetail';
import Grid from '../../../node_modules/@material-ui/core/Grid/Grid';

export default (definitionName, idName, fromView = false) => {
  const RowDetail = ({ row, rowDetail, fetchDetailFn }) => {
    useInjectReducer({ key: 'rowDetail', reducer });
    useInjectSaga({ key: 'rowDetail', saga });

    const id = rowDetail[definitionName] || {};
    const obj = id[row[idName]] || {};
    const fields = obj.fields || {};

    useEffect(() => {
      if (Object.keys(fields).length === 0) {
        fetchDetailFn(definitionName, row[idName]);
      }
    }, []);

    if (obj.loading) {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '10vh' }}
        >
          <SyncLoader sizeUnit="px" size={10} color="#123abc" />
        </Grid>
      );
    }

    if (Object.keys(fields).length === 0) {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '10vh' }}
        >
          <Typography>No Data Available</Typography>
        </Grid>
      );
    }

    return <RecordDetail row={obj.fields} />;
  };

  RowDetail.propTypes = {
    fetchDetailFn: PropTypes.func,
    rowDetail: PropTypes.object,
    row: PropTypes.object,
  };

  const mapStateToProps = (_, ownProps) =>
    createStructuredSelector({
      rowDetail: makeSelectRowDetailDefinition(
        definitionName,
        ownProps.row[idName],
      ),
    });

  function mapDispatchToProps(dispatch) {
    return {
      fetchDetailFn: (definition, id) =>
        dispatch(fetchDetail(definition, id, fromView)),
    };
  }

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  return compose(withConnect)(RowDetail);
};
