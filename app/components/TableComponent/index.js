/**
 *
 * TableComponent
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Table } from '@devexpress/dx-react-grid-material-ui';

const styles = theme => ({
  background: {
    '& tbody tr': {
      backgroundColor: theme.palette.background.paper,
    },
  },
});

function TableComponentBase({ classes, ...restProps }) {
  return <Table.Table {...restProps} className={classes.background} />;
}

const TableComponent = withStyles(styles, { name: 'TableComponent' })(
  TableComponentBase,
);

TableComponentBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default TableComponent;
