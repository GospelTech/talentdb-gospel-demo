/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Fragment } from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

import { SnackbarProvider } from 'notistack';
import { RecordDefinition, ViewDefinition } from '@gospel/gospel-sdk-js';
import uuid from 'uuid/v4';
import config from 'config';
import sdk from 'gospel-sdk';
import loadable from '../../utils/loadable';
import theme from '../../theme';
import Router from '../Router';
import Notifier from '../Notifier';

const startUp = async ({ store }) => {
  let data;
  try {
    data = await sdk.getUserInfo();
  } catch (e) {
    return import('../../components/GenericError');
  }

  if (
    ['LGADMIN', 'VIEWER', 'CANDIDATE'].filter(x => data.groups.includes(x))
      .length === 0
  ) {
    return import('../../components/Unauthorised');
  }

  if (
    ((typeof config.recordDefinitions !== 'object' &&
      config.recordDefinitions !== null) ||
      Object.keys(config.recordDefinitions) === 0) &&
    ((typeof config.viewDefinitions !== 'object' &&
      config.viewDefinitions !== null) ||
      Object.keys(config.viewDefinitions) === 0)
  ) {
    console.error('Invalid configuration');
    return import('../../components/GenericError');
  }
  let recordDefKeys = Object.keys(config.recordDefinitions);

  if (!data.groups.includes('LGADMIN')) {
    recordDefKeys = recordDefKeys.filter(rd => rd !== 'accessLogDefinition');
  }

  const recordDefinitions = await Promise.all(
    recordDefKeys.map(k =>
      sdk.getRecordDefinitionByType(config.recordDefinitions[k]),
    ),
  );

  const viewKeys = Object.keys(config.viewDefinitions);
  const viewDefinitions = await Promise.all(
    viewKeys.map(k => sdk.getViewDefinitionByType(config.viewDefinitions[k])),
  );
  const mapDefinitions = Object.assign(
    {},
    ...recordDefinitions.map((d, i) => ({
      [recordDefKeys[i]]: d.toJsonObject(),
    })),
  );

  const mapViewDefinitions = Object.assign(
    {},
    ...viewDefinitions.map((d, i) => ({ [viewKeys[i]]: d.toJsonObject() })),
  );

  store.dispatch({
    type: 'STORE_DEFINITIONS_DATA',
    data: mapDefinitions,
    recordDefinitions: mapDefinitions,
    viewDefinitions: mapViewDefinitions,
  });

  if (data.groups.includes('CANDIDATE') && data.groups.length === 1) {
    // User is a "candidate". Look for his uuid and info

    let userUUID;
    try {
      const userUUIDRecord = await sdk.getRecordByTypeAndId(
        'LGGetUser',
        data.username,
        RecordDefinition.transformFromObject(
          mapDefinitions.candidatesDefinition,
        ),
      );
      userUUID = userUUIDRecord.fields.UserID;
    } catch (e) {
      const record = sdk.getNewRecord(
        new RecordDefinition(undefined, mapDefinitions.candidatesDefinition),
      );
      userUUID = `ID${uuid()}`;
      record.id = data.username;
      record.fields = {
        emailAddress: data.username,
        UserID: userUUID,
        Group: 'CANDIDATE',
      };

      // TODO: handle errors properly
      await sdk.createRecord(record);
    }
    data.userUUID = userUUID;

    try {
      const [userInfo, userSecretInfo] = await Promise.all([
        sdk.getRecordByTypeAndId(
          config.recordDefinitions.talentsDataDefinition,
          userUUID,
          RecordDefinition.transformFromObject(
            mapDefinitions.talentsDataDefinition,
          ),
        ),
        sdk.getRecordByTypeAndId(
          config.recordDefinitions.piiDataDefinition,
          userUUID,
          RecordDefinition.transformFromObject(
            mapDefinitions.piiDataDefinition,
          ),
        ),
      ]);

      store.dispatch({
        type: 'CANDIDATE_INFO',
        candidateInfo: {
          id: userInfo.id,
          ...userInfo.fields,
          ...userSecretInfo.fields,
        },
      });
    } catch (e) {
      if (e.message.includes('Record not found')) {
        store.dispatch({
          type: 'CANDIDATE_FIRST_LOGIN',
          firstLogin: true,
        });
      }
    }
  }

  if (data.groups.includes('VIEWER') && data.groups.length === 1) {
    // User is a "viewer". Look for his uuid and info

    let userUUID;
    try {
      // TODO: this can become a more generic method
      const userUUIDRecord = await sdk.getRecordByTypeAndId(
        'LGGetUser',
        data.username,
        RecordDefinition.transformFromObject(
          mapDefinitions.candidatesDefinition,
        ),
      );
      userUUID = userUUIDRecord.fields.UserID;
      data.userUUID = userUUID;

      const company = await sdk.getRecordByTypeAndId(
        'LGViewer',
        userUUID,
        ViewDefinition.transformFromObject(mapDefinitions.viewersDefinition),
      );

      store.dispatch({
        type: 'COMPANY_INFO',
        companyInfo: {
          id: company.id,
          ...company.fields,
        },
      });
    } catch (e) {
      if (!e.message.includes('Record not found')) {
        return import('../../components/GenericError');
      }
    }
  }

  store.dispatch({
    type: 'STORE_USER_INFO',
    data,
  });
  return import('./index.js');
};

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>
        <Fragment>
          <Helmet titleTemplate="%s" defaultTitle="LocalGlobe" />
          <Router />
        </Fragment>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

export const LoadableApp = store => loadable(() => startUp(store))();
