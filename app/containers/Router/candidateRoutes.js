import React from 'react';
import RouteWithLayout from '../../components/RouteWithLayout/RouteWithLayout';
import { AccessRequests } from '../../components/AccessRequests';
import Main from '../Main';
import Account from '../Account';
import JobRelatedInfo from '../JobRelatedInfo';

export default [
  <RouteWithLayout
    key="AccessRequests"
    component={AccessRequests}
    exact
    layout={Main}
    path="/accessRequests"
  />,
  <RouteWithLayout
    key="Account"
    component={Account}
    exact
    layout={Main}
    path="/account"
  />,
  <RouteWithLayout
    key="JobRelatedInfo"
    component={JobRelatedInfo}
    exact
    layout={Main}
    path="/employment"
  />,
];
