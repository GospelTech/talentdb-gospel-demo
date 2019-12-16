import React from 'react';
import PropTypes from 'prop-types';
import ReactCountdownClock from 'react-countdown-clock';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Minimal from '../../layout/Minimal/Minimal';

function TimedLogout({ message, seconds }) {
  const logout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };
  return (
    <Minimal>
      <Grid
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Typography gutterBottom variant="h3" style={{ marginBottom: '50px' }}>
          {message}
        </Typography>
        <ReactCountdownClock
          seconds={seconds}
          color="#3f51b5"
          alpha={0.9}
          size={200}
          onComplete={logout}
        />
      </Grid>
    </Minimal>
  );
}

TimedLogout.propTypes = {
  message: PropTypes.string.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default TimedLogout;
