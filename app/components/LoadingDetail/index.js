/**
 *
 * LoadingDetail
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { SyncLoader } from 'react-spinners';
import { Grid, Typography } from '@material-ui/core';
import messages from './messages';
import RecordDetail from '../RecordDetail';

function LoadingDetail({ obj }) {
  const fields = obj.fields || {};

  if (obj.loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '10vh' }}
      >
        <SyncLoader sizeUnit="px" size={10} color="#123abc" />
      </Grid>
    );
  }

  if (Object.keys(fields).length === 0) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '10vh' }}
      >
        <Typography>
          <FormattedMessage {...messages.noData} />
        </Typography>
      </Grid>
    );
  }

  return <RecordDetail row={obj.fields} />;
}

LoadingDetail.propTypes = {
  obj: PropTypes.object
};

export default memo(LoadingDetail);
