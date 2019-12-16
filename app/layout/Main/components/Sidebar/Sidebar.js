import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = props => {
  const { open, variant, onClose, className, group, ...rest } = props;

  const classes = useStyles();

  const conditionalPages = {
    LGADMIN: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardIcon />,
      },
      {
        title: 'Portfolio Companies',
        href: '/viewer',
        icon: <PeopleIcon />,
      },
      {
        title: 'Candidates',
        href: '/candidates',
        icon: <PeopleIcon />,
      },
      {
        title: 'Candidates Accounts',
        href: '/candidate-accounts',
        icon: <PeopleIcon />,
      },
    ],
    VIEWER: [
      {
        title: 'Company Info',
        href: '/company',
        icon: <AccountBoxIcon />,
      },
      {
        title: 'Candidates',
        href: '/candidates',
        icon: <PeopleIcon />,
      },
      {
        title: 'Approved Candidates',
        href: '/candidate-approval',
        icon: <PeopleIcon />,
      },
    ],
    CANDIDATE: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardIcon />,
      },
      {
        title: 'Account',
        href: '/account',
        icon: <AccountBoxIcon />,
      },
      {
        title: 'Employment',
        href: '/employment',
        icon: <AccountBoxIcon />,
      },
      {
        title: 'Access Requests',
        href: '/accessRequests',
        icon: <PeopleIcon />,
      },
    ],
    '': [],
  };

  const pages = [...conditionalPages[group]];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
};

export default Sidebar;
