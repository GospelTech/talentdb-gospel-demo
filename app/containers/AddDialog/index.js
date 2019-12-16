/**
 *
 * AddDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddUser from './selectors';
import reducer from './reducer';
import saga from './saga';
import Dialog from '../../../node_modules/@material-ui/core/Dialog/Dialog';
import DialogTitle from '../../../node_modules/@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '../../../node_modules/@material-ui/core/DialogContent/DialogContent';
import TextField from '../../../node_modules/@material-ui/core/TextField/TextField';
import DialogActions from '../../../node_modules/@material-ui/core/DialogActions/DialogActions';
import Button from '../../../node_modules/@material-ui/core/Button/Button';
import DialogContentText from '../../../node_modules/@material-ui/core/DialogContentText/DialogContentText';
import { createUser } from './actions';
import Notifier from '../Notifier';

export function AddDialog({ addUserFn }) {
  useInjectReducer({ key: 'addUser', reducer });
  useInjectSaga({ key: 'addUser', saga });

  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Notifier />
      <Button color="primary" variant="contained">
        Add candidate
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <TextField
            value={email}
            onChange={event => setEmail(event.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => addUserFn(email)} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addUser: makeSelectAddUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    addUserFn: email => dispatch(createUser(email)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddDialog);
