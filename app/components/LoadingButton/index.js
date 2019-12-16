/**
 *
 * LoadingButton
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Button from '../../../node_modules/@material-ui/core/Button/Button';
import CircularProgress from '../../../node_modules/@material-ui/core/CircularProgress/CircularProgress';
// import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  root: {},
  loading: {
    'margin-right': theme.spacing(2),
  },
}));

function LoadingButton({ condition, children, ...props }) {
  const classes = useStyles();

  return (
    <Button {...props}>
      {condition && <CircularProgress size={20} className={classes.loading} />}
      {children}
    </Button>
  );
}

LoadingButton.propTypes = {
  condition: PropTypes.bool,
};

export default memo(LoadingButton);
