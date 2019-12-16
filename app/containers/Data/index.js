/**
 *
 * Data
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import LoadingOverlay from 'react-loading-overlay';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Grid,
  SearchPanel,
  TableHeaderRow,
  TableRowDetail,
  TableSelection,
  Toolbar,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import {
  RowDetailState,
  SearchState,
  SelectionState,
} from '@devexpress/dx-react-grid';
import { Box } from '@material-ui/core';
import { makeSelectData, makeSelectRecords } from './selectors';
import reducer from './reducer';

import {
  clearDataRecords,
  getData,
  selectData,
  setDefinitionName,
  setFilter,
  setPage,
} from './actions';
import { dataSaga } from './saga';
import TableComponent from '../../components/TableComponent';

export const Data = ({
  data,
  records,
  getDataGenericFn,
  clearDataGenericFn,
  selectDataGenericFn,
  setFilterGenericFn,
  setPageGenericFn,
  setDefinitionNameGenericFn,
  isView,
  withFilter,
  withCustomFilter,
  withSelect,
  withDetailComponent,
  withRowComponent,
  definitionName,
  definitions,
  instanceID,
}) => {
  useInjectReducer({ key: 'data', reducer });
  useInjectSaga({ key: 'data', saga: dataSaga });

  const type = isView ? 'viewDefinitions' : 'recordDefinitions';

  const [
    getDataFn,
    clearDataFn,
    selectDataFn,
    setFilterFn,
    setPageFn,
    setDefinitionNameFn,
  ] = [
    getDataGenericFn,
    clearDataGenericFn,
    selectDataGenericFn,
    setFilterGenericFn,
    setPageGenericFn,
    setDefinitionNameGenericFn,
  ].map(fn => fn.call(this, instanceID));

  const definition = definitions[type][definitionName].fields
    .filter(f => f.type !== 'blob' && f.meta.displayInTable)
    .sort((a, b) => Number(a.meta.order) - Number(b.meta.order))
    .map(f => ({
      name: f.name,
      title: f.meta.displayName || f.name,
    }));

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (records.length === 0 && !data.loading) {
      clearDataFn();
      if (withFilter) {
        setFilterFn(withFilter);
      } else {
        setFilterFn([]);
      }

      setDefinitionNameFn(definitionName, isView);
      getDataFn();
    }
  }, []);

  const debounce = (callback, wait) => {
    let timeout = null;
    return (...args) => {
      const next = () => callback(...args);
      clearTimeout(timeout);
      timeout = setTimeout(next, wait);
    };
  };

  const fn = debounce(value => {
    clearDataFn();
    setPageFn(0);
    setFilterFn(value);
    getDataFn();
  }, 500);

  const refHeightHandler = ref => {
    if (ref) {
      if (withCustomFilter) {
        setHeight(ref.clientHeight - 64);
      } else {
        setHeight(ref.clientHeight);
      }
    }
  };

  const virtualTableProps = {
    height,
    tableComponent: TableComponent,
    ...(withRowComponent ? { rowComponent: withRowComponent } : {}),
  };

  function HeaderRow({ children, ...restProps }) {
    return <TableHeaderRow.Row {...restProps}>{children}</TableHeaderRow.Row>;
  }

  return (
    <Box overflow="auto" flexGrow={1} ref={refHeightHandler}>
      <LoadingOverlay
        active={data.loading}
        spinner
        text="Loading your content..."
      >
        <Grid rows={records} columns={definition}>
          <SelectionState
            selection={data.selected}
            onSelectionChange={selectDataFn}
          />
          {withDetailComponent && <RowDetailState />}
          {withCustomFilter && <SearchState onValueChange={fn} />}
          <VirtualTable {...virtualTableProps} />
          <TableHeaderRow rowComponent={HeaderRow} />
          {withDetailComponent && (
            <TableRowDetail contentComponent={withDetailComponent} />
          )}
          {withSelect && (
            <TableSelection
              {...(withRowComponent ? {} : { selectByRowClick: true })}
            />
          )}
          {withCustomFilter && [
            <Toolbar key="toolBar" />,
            <SearchPanel key="searchPanel" />,
          ]}
        </Grid>
      </LoadingOverlay>
    </Box>
  );
};

Data.propTypes = {
  getDataGenericFn: PropTypes.func.isRequired,
  clearDataGenericFn: PropTypes.func.isRequired,
  selectDataGenericFn: PropTypes.func.isRequired,
  setFilterGenericFn: PropTypes.func.isRequired,
  setPageGenericFn: PropTypes.func.isRequired,
  setNextPageGenericFn: PropTypes.func,
  setDefinitionNameGenericFn: PropTypes.func.isRequired,
  isView: PropTypes.bool,
  children: PropTypes.object,
  withFilter: PropTypes.object,
  withCustomFilter: PropTypes.bool,
  withSelect: PropTypes.bool,
  withDetailComponent: PropTypes.object,
  definitionName: PropTypes.string,
  definitions: PropTypes.object,
  withRowComponent: PropTypes.object,
  instanceID: PropTypes.string.isRequired,
  data: PropTypes.object,
  records: PropTypes.array,
};

const mapStateToProps = (_, ownProps) =>
  createStructuredSelector({
    data: makeSelectData(ownProps),
    records: makeSelectRecords(ownProps),
    definitions: state => state.definitions,
  });

const mapDispatchToProps = dispatch => ({
  getDataGenericFn: instanceID => () => dispatch(getData(instanceID)),
  setPageGenericFn: instanceID => page => dispatch(setPage(instanceID, page)),
  setFilterGenericFn: instanceID => filter =>
    dispatch(setFilter(instanceID, filter)),
  selectDataGenericFn: instanceID => data =>
    dispatch(selectData(instanceID, data)),
  clearDataGenericFn: instanceID => () =>
    dispatch(clearDataRecords(instanceID)),
  setDefinitionNameGenericFn: instanceID => (definition, isView) =>
    dispatch(setDefinitionName(instanceID, definition, isView)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Data);
