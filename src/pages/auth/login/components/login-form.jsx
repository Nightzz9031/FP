/* eslint-disable new-cap */
import * as React from 'react';
import {
 TextField, Paper, Typography, Button,
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { post } from '../../../../helpers/plugins/https';

const LoginForm = () => {
  const secret = localStorage.getItem('secret');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [msg, setMsg] = React.useState('');

    const [check, setCheck] = React.useState();

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

        if (check) {
          localStorage.setItem('rememberMe', true);
        }

        return nav('/');
      }
      console.log(data);
    };

    const checkRememberMe = () => {
      const rememberMe = localStorage.getItem('rememberMe');
      console.log(secret);

      if (secret && rememberMe) {
        nav('/');
      }
    };

    React.useEffect(() => {
      checkRememberMe();
    });

    return (
      <Box sx={{
            height: '100vh',
            display: 'grid',
            placeItems: 'center',
            backgroundImage: 'url(https://images6.alphacoders.com/336/336514.jpg)',
            backgroundSize: '100%',
        }}
      >
        <Paper
          component="form"
          sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          width: 450,
          height: 300,
          p: 2,
          borderRadius: '80px',
          opacity: 0.75,
        }}
          elevation={10}
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
            <p>
              Remember me:
              <input type="checkbox" onChange={(e) => setCheck(e.target.checked)} />
            </p>

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
