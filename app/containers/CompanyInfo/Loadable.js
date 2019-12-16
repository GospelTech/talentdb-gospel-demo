/**
 *
 * Asynchronously loads the component for CompanyInfo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
