import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Box,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'images/logo.angle_(1)+(1).png';

import { black } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  text: {
    color: 'white',
    display: 'flex',
  },
  logo: {
    display: 'flex',
    height: '50px',
    margin: ' 0 auto',
  },
  'logo-img': {
    'padding-right': '10px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const theme = createMuiTheme({
  palette: {
    alternateTextColor: black,
  },
});

const signOut = () => {
  sessionStorage.clear();
  window.location.reload();
};

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <div className={classes.logo}>
            <img
              height="48px"
              alt="Logo"
              src={Logo}
              className={classes['logo-img']}
            />
            <Box fontWeight="fontWeightBold" className={classes.container}>
              <Typography variant="h3" className={classes.text}>
                TalentDB
              </Typography>
            </Box>
          </div>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <h4>{rest.user}</h4>
          <IconButton
            onClick={signOut}
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
