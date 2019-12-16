/**
 *
 * GenericError
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import TimedLogout from '../TimedLogout';

function GenericError() {
  return (
    <TimedLogout
      seconds={30}
      message={`We're having some trouble connecting with Gospel at the moment. We'll try again shortly`}
    />
  );
}

GenericError.propTypes = {};

export default GenericError;
