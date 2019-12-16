import React from 'react';
import RouteWithLayout from '../../components/RouteWithLayout/RouteWithLayout';
import CompanyInfo from '../CompanyInfo';
import Main from '../Main';
import CandidateApprovalTable from '../CandidateApprovalTable';
import ViewerCandidateList from '../../components/ViewerCandidateList';

export default [
  <RouteWithLayout
    key="CompanyInfo"
    component={CompanyInfo}
    exact
    layout={Main}
    path="/company"
  />,
  <RouteWithLayout
    key="ViewerCandidateList"
    component={ViewerCandidateList}
    exact
    layout={Main}
    path="/candidates"
  />,
  <RouteWithLayout
    key="CandidateApprovalTable"
    component={CandidateApprovalTable}
    exact
    layout={Main}
    path="/candidate-approval"
  />,
];
