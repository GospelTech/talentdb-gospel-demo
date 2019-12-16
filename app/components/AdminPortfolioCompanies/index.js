/**
 *
 * AdminPortfolioCompanies
 *
 */

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Typography } from '@material-ui/core';
import { generateInstanceID } from '../../common/hashGenerator';
import Data from '../../containers/Data';
import AdminPortfolioCompaniesActions from '../../containers/AdminPortfolioCompaniesActions';
// import styled from 'styled-components';

function AdminPortfolioCompanies() {
  const instanceID = generateInstanceID('viewersDefinition');

  return (
    <Fragment>
      <Helmet>
        <title>Portfolio Companies</title>
        <meta name="description" content="Portfolio Companies" />
      </Helmet>
      <Box display="flex" flexDirection="column">
        <Box my={2}>
          <Typography align="center" gutterBottom variant="h2">
            Portfolio Companies
          </Typography>
          <AdminPortfolioCompaniesActions instanceID={instanceID} />
        </Box>
        <Box
          my={2}
          display="flex"
          width="100%"
          height="100%"
          minWidth="100%"
          flexGrow={1}
        >
          <Data
            instanceID={instanceID}
            definitionName="viewersDefinition"
            withSelect
          />
        </Box>
      </Box>
    </Fragment>
  );
}

AdminPortfolioCompanies.propTypes = {};

export default AdminPortfolioCompanies;
