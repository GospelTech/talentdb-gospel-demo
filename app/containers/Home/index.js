/**
 *
 * Home
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import dataReducer from '../Data/reducer';
import Notifier from '../Notifier';
import { AccessRequests } from '../../components/AccessRequests';
import { selectGroup } from '../Router/selectors';
import AdminDashboard from '../../components/AdminDashboard';

export function Home({ group }) {
  useInjectReducer({ key: 'data', reducer: dataReducer });

  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Localglobe" />
      </Helmet>
      {group === 'CANDIDATE' && <AccessRequests withFilter />}
      {group === 'VIEWER' && <div />}
      {group === 'LGADMIN' && <AdminDashboard />}
    </Fragment>
  );
}

Home.propTypes = {
  group: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  group: selectGroup,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Home);
