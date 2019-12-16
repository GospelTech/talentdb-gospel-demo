/* eslint-disable import/no-unresolved,no-undef */

import config from 'config';
import { Configuration, Auth, ApiConnection } from '@gospel/gospel-sdk-js';

const configuration = new Configuration(config.hostname, config.apiVersion);
configuration.loginHostname = config.hostname;
if (config.caLoginPath !== '' || typeof config.caLoginPath !== 'undefined') {
  configuration.caLoginPath = config.caLoginPath;
}

export const auth = new Auth(configuration, null, null, null);

const api = new ApiConnection(auth);

export default api;
