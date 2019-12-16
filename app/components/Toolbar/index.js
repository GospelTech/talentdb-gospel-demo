/**
 *
 * Toolbar
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

export const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    // marginRight: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

const Toolbar = ({ children, className, ...rest }) => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    {...rest}
  >
    {children}
  </Box>
);
Toolbar.propTypes = {};

export default memo(Toolbar);
