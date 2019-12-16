/**
 *
 * Router
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Redirect, Route, Switch } from 'react-router-dom';
import { selectCredential, selectGroup } from './selectors';
import RouteWithLayout from '../../components/RouteWithLayout/RouteWithLayout';
import Home from '../Home';

import { Join } from '../Join';

import NotFound from '../NotFoundPage';
import Minimal from '../../layout/Minimal/Minimal';
import Main from '../Main';
import TimedLogout from '../../components/TimedLogout';
import adminRoutes from './adminRoutes';
import candidateRoutes from './candidateRoutes';
import viewerRoutes from './viewerRoutes';

export function Router({ credentials, group }) {
  if (credentials.firstLogin) {
    return (
      <Switch>
        <RouteWithLayout component={Join} layout={Minimal} />
      </Switch>
    );
  }

  if (credentials.accountDeleted) {
    return (
      <Switch>
        <Route
          render={() => (
            <TimedLogout message="Your account has been deleted" seconds={5} />
          )}
        />
      </Switch>
    );
  }

  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      {group === 'VIEWER' && <Redirect exact from="/dashboard" to="/company" />}
      <RouteWithLayout
        key="Home"
        component={Home}
        exact
        layout={Main}
        path="/dashboard"
      />
      {group === 'LGADMIN' && adminRoutes}
      {group === 'CANDIDATE' && candidateRoutes}
      {group === 'VIEWER' && viewerRoutes}
      <RouteWithLayout
        key="NotFound"
        component={NotFound}
        exact
        layout={Minimal}
        path="/not-found"
      />
      <Redirect to="/not-found" />,
    </Switch>
  );
}

Router.propTypes = {
  credentials: PropTypes.object.isRequired,
  group: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  credentials: selectCredential,
  group: selectGroup,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Router);
