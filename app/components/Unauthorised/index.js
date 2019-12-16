/**
 *
 * Unauthorised
 *
 */

import React from 'react';

import TimedLogout from '../TimedLogout';

function Unauthorised() {
  return (
    <TimedLogout
      seconds={30}
      message="You're not authorized to use this software. You'll be logged out shortly"
    />
  );
}

Unauthorised.propTypes = {};

export default Unauthorised;
