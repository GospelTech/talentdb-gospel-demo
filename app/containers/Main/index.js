/**
 *
 * Main
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import reducer from './reducer';
import makeSelectMain from './selectors';
import { Footer, Sidebar, Topbar } from '../../layout/Main/components';
import { DEFAULT_ACTION } from './constants';
import Notifier from '../Notifier';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    minHeight: '100%',
    width: '100%',
    minWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: `calc(100% - ${theme.spacing(2) * 2}px)`,
    minHeight: `calc(100% - ${theme.spacing(2) * 2}px)`,
    width: `calc(100% - ${theme.spacing(2) * 2}px)`,
    minWidth: `calc(100% - ${theme.spacing(2) * 2}px)`,
    margin: theme.spacing(2),
  },
}));

export function Main({ children, main, test, ...props }) {
  useInjectReducer({ key: 'main', reducer });

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Topbar
        user={main.credential.username}
        onSidebarOpen={handleSidebarOpen}
      />
      <Sidebar
        thing={main}
        group={main.credential.groups[0]}
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        <Notifier />
        <Box
          display="flex"
          width="100%"
          height="100%"
          minHeight="100%"
          minWidth="100%"
          flexGrow={1}
        >
          {children}
        </Box>
        <Footer />
      </main>
    </div>
  );
}

Main.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  main: makeSelectMain(),
});

function mapDispatchToProps(dispatch) {
  return {
    test: () => dispatch(DEFAULT_ACTION),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Main);
