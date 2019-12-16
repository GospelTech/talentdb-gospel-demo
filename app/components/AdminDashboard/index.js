/**
 *
 * AdminDashboard
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Box } from '@material-ui/core';
import CandidateJoinRequests from '../CandidateJoinRequests';
import AdminMetrics from '../AdminMetrics';

function AdminDashboard() {
  return (
    <Box display="flex" flexDirection="column">
      <Box
        my={2}
        width="35%"
        height="35%"
        minWidth="100%"
        flexGrow={1}
        display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }}
      >
        <AdminMetrics />
      </Box>
      <Box
        my={2}
        display="flex"
        width="60%"
        height="60%"
        minWidth="100%"
        flexGrow={1}
      >
        <CandidateJoinRequests withPending />
      </Box>
    </Box>
  );
}

AdminDashboard.propTypes = {};

export default AdminDashboard;
