/**
 *
 * DialogPopUp
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  deleteButton: {
    margin: theme.spacing(2),
  },
  dialog: {
    marginTop: theme.spacing(2),
  },
  optionButton: {
    margin: '0 auto',
  },
}));

function DialogPopUp(props) {
  const { parentFn, buttonText } = props;

  function onButtonClick() {
    parentFn();
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  return (
    <Fragment>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => handleClickOpen()}
        className={classes.deleteButton}
      >
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText className={classes.dialog}>
            Are you sure you wish to remove your details
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.optionButton}
          >
            No
          </Button>
          <Button
            className={classes.optionButton}
            color="secondary"
            variant="contained"
            onClick={() => {
              onButtonClick();
              handleClose();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

DialogPopUp.propTypes = {
  parentFn: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default DialogPopUp;
