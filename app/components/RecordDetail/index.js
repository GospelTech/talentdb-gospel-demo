/**
 *
 * RecordDetail
 *
 */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const fieldsToExclude = ['Id', 'UserID'];

const RecordDetail = ({ row }) => (
  <Paper>
    <Table>
      <TableBody>
        {Object.keys(row)
          .filter(value => !fieldsToExclude.includes(value))
          .filter(value => typeof row[value] !== 'object')
          .map(value => (
            <TableRow key={value}>
              <TableCell align="left">{value}</TableCell>
              <TableCell align="left">{row[value] || 'N/A'}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </Paper>
);

RecordDetail.propTypes = {
  row: PropTypes.object,
};

export default RecordDetail;
