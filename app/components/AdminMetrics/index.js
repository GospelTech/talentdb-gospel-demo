/**
 *
 * AdminMetrics
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Box, Typography } from '@material-ui/core';
import { generateInstanceID } from '../../common/hashGenerator';
import Data from '../../containers/Data';

function AdminMetrics() {
  const instanceID = generateInstanceID('accessLogDefinition');
  return (
    <Fragment>
      <Box display="flex" flexDirection="column">
        <Box my={2}>
          <Typography align="center" gutterBottom variant="h2">
            Metrics
          </Typography>
        </Box>
        <Box
          display="flex"
          my={0}
          width="100%"
          height="100%"
          minWidth="100%"
          flexGrow={1}
        >
          <Data instanceID={instanceID} definitionName="accessLogDefinition" />
        </Box>
      </Box>
    </Fragment>
  );
}

AdminMetrics.propTypes = {};

export default AdminMetrics;
