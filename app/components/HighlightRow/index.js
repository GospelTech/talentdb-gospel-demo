/**
 *
 * HighlightRow
 *
 */

import React, { memo } from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import PropTypes from 'prop-types';
import PeopleIcon from '../../../node_modules/@material-ui/icons/People';

const getStyle = name =>
  ({
    Yes: {
      color: 'green',
    },
    No: {
      color: 'red',
    },
    'Not set': {
      color: 'orange',
    },
  }[name] || { color: 'gray' });

function HighlightRow({ row, obj, children, ...restProps }) {
  const { fields = {} } = obj;
  return (
    <Table.Row {...restProps}>
      <Table.Cell>
        <PeopleIcon style={getStyle(fields.Permitted)} />
      </Table.Cell>
      {children}
    </Table.Row>
  );
}

HighlightRow.propTypes = {
  row: PropTypes.object,
  obj: PropTypes.object,
  children: PropTypes.array,
};

export default memo(HighlightRow);
