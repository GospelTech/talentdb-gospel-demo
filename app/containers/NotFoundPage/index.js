/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

import { Link } from 'react-router-dom';
import { Typography, CssBaseline, Grid } from '@material-ui/core';

export default function NotFound() {
  return (
    <Fragment>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          {`We're having some trouble finding that`}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          You should go back <Link to="/">Home</Link>
        </Typography>
        <Typography variant="body1">@2019</Typography>
      </Grid>
    </Fragment>
  );
}
