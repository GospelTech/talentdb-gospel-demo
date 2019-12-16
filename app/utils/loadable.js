import React, { lazy, Suspense } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import Minimal from '../layout/Minimal/Minimal';
import Grid from '../../node_modules/@material-ui/core/Grid/Grid';

const loadable = importFunc => {
  const LazyComponent = lazy(importFunc);

  const fallback = (
    <Minimal>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <ClipLoader sizeUnit="px" size={150} color="#123abc" />
      </Grid>
    </Minimal>
  );

  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
