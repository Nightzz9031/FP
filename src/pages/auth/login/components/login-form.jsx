/* eslint-disable new-cap */
import * as React from 'react';
import {
 TextField, Paper, Typography, Button,
} from '@mui/material';
import { Box } from '@mui/system';
import { post } from '../../../../helpers/plugins/https';

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const login = async (e) => {
      e.preventDefault();
      const user = {
        email,
        password,
      };

      const data = await post('login', user);
      console.log(data);
    };

    return (
      <Box sx={{
            height: '100vh',
            display: 'grid',
            placeItems: 'center',
            backgroundImage: 'url(/register-bg.png)',
            backgroundSize: '100%',
        }}
      >
        <Paper
          component="form"
          sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 450,
          height: 300,
          p: 2,
          borderRadius: '80px',
          opacity: 0.85,
        }}
          elevation={10}
          // onSubmit={console.log('========')}
        >
          <Typography component="h1" variant="h4" align="center">Login</Typography>
          <Box sx={{
                    height: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                }}
          >
            <TextField
              sx={{
                    width: '70%',
                }}
              variant="filled"
              label="E-mail:"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{
                    width: '70%',
                }}
              variant="filled"
              label="Password:"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              onClick={login}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    );
    };

    export default LoginForm;
