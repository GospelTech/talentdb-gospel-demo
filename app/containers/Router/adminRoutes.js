import React from 'react';
import Main from '../Main';
import RouteWithLayout from '../../components/RouteWithLayout/RouteWithLayout';
import AdminPortfolioCompanies from '../../components/AdminPortfolioCompanies';
import AdminCandidatesList from '../../components/AdminCandidatesList';
import CandidateJoinRequests from '../../components/CandidateJoinRequests';

export default [
  <RouteWithLayout
    key="AdminPortfolioCompanies"
    component={AdminPortfolioCompanies}
    exact
    layout={Main}
    path="/viewer"
  />,
  <RouteWithLayout
    key="AdminCandidatesList"
    component={AdminCandidatesList}
    exact
    layout={Main}
    path="/candidates"
  />,
  <RouteWithLayout
    key="CandidateJoinRequests"
    component={CandidateJoinRequests}
    exact
    layout={Main}
    path="/candidate-accounts"
  />,
];
