/*
 * AdminPortfolioCompaniesActions Messages
 *
 * This contains all the text for the AdminPortfolioCompaniesActions container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AdminPortfolioCompaniesActions';

export default defineMessages({
  addNewCompany: {
    id: `${scope}.addNewCompany`,
    defaultMessage: 'Add New Companies',
  },
  deleteSelectedCompanies: {
    id: `${scope}.deleteSelectedCompanies`,
    defaultMessage: 'Delete Selected Companies',
  },
});
