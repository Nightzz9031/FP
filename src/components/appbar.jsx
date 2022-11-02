/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip, Button, Avatar, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar, MenuItem,
} from '@mui/material';
import { get, post } from '../helpers/plugins/https';

const ResponsiveAppBar = ({ validateSecret }) => {
  const pages = ['Favorites'];
  const nav = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [loginState, setLoginState] = React.useState(false);
  const [avatar, setAvatar] = React.useState('');
  const [settings, setSettings] = React.useState(['Logout']);

  const secret = localStorage.getItem('secret');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const profileAvatar = async () => {
    if (secret) {
    // eslint-disable-next-line @typescript-eslint/quotes, @typescript-eslint/space-infix-ops, prefer-template
    const res = await get(`getAvatar/`+secret);
    setAvatar(res.data);
    }
  };

  const settingsAction = (key) => {
    handleCloseUserMenu();

    if (loginState) {
      localStorage.removeItem('secret');
      localStorage.removeItem('rememberMe');
      setSettings(['Login', 'Register']);
      setLoginState(false);
      setAvatar('');
    } else if (!loginState && key === 'Login') {
      nav('auth/login');
    } else if (!loginState && key === 'Register') {
      nav('auth/register');
    }
  };

  const checkLoginStatus = () => {
    if (loginState) {
      setSettings(['Logout']);
      setLoginState(true);
    } else {
      setSettings(['Login', 'Register']);
      setLoginState(false);
    }
  };

  const goToFavs = () => {
    nav('/favorites');
  };

  React.useEffect(() => {
    validateSecret(secret, setLoginState);
    checkLoginStatus();
    profileAvatar();
  }, [loginState]);

  return (
    <AppBar position="static" color="success">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => nav('/favorites')}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile avatar" src={avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, i) => (
                <MenuItem key={i} onClick={(e) => settingsAction(e.target.innerHTML)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
