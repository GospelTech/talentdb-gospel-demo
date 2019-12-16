/**
 *
 * FetchDetail
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRowDetailDefinition from './selectors';
import reducer, { initialState } from './reducer';
import saga from './saga';
import { fetchDetail } from './actions';
import { makeMatchUserID } from '../../components/ViewerCandidateList/filter';

export default (
  component,
  definitionName,
  idName,
  fromView = false,
  search = false,
) => {
  const Component = component;
  const FetchDetail = ({ row, details, fetchDetailFn, ...restProps }) => {
    useInjectReducer({ key: 'fetchDetail', reducer });
    useInjectSaga({ key: 'fetchDetail', saga });

    const def = details[definitionName] || {};
    const obj = def[row[idName]] || initialState;
    const { fields, loading } = obj;
    let filter;

    useEffect(() => {
      if (
        Object.keys(obj).length === 0 &&
        Object.keys(fields).length === 0 &&
        !loading
      ) {
        if (search) {
          filter = makeMatchUserID(row[idName]);
        }

        fetchDetailFn(definitionName, row[idName], filter);
      }
    }, []);

    return <Component row={row} obj={obj} {...restProps} />;
  };

  FetchDetail.propTypes = {
    fetchDetailFn: PropTypes.func.isRequired,
    details: PropTypes.object.isRequired,
    row: PropTypes.object.isRequired,
  };

  const mapStateToProps = createStructuredSelector({
    details: makeSelectRowDetailDefinition(),
  });

  function mapDispatchToProps(dispatch) {
    return {
      fetchDetailFn: (definition, id, filter) =>
        dispatch(fetchDetail(definition, id, fromView, filter)),
    };
  }

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  return compose(
    withConnect,
    memo,
  )(FetchDetail);
};
