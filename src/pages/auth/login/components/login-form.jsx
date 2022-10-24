/* eslint-disable new-cap */
import * as React from 'react';
import {
 TextField, Paper, Typography, Button,
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { post } from '../../../../helpers/plugins/https';

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [msg, setMsg] = React.useState('');

    const nav = useNavigate();

    // eslint-disable-next-line consistent-return
    const login = async (e) => {
      e.preventDefault();
      const user = {
        email,
        password,
      };

      const data = await post('login', user);

      if (!data.error) {
        console.log(data.message);
        setMsg(data.message);

        localStorage.setItem('secret', data.data.secret);
        return nav('/');
      }
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
          <h1>{msg}</h1>
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
