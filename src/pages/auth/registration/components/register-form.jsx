import * as React from 'react';
import {
 TextField, Paper, Button, Avatar,
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { post } from '../../../../helpers/plugins/https';

const RegisterForm = () => {
    const [email, setEmail] = React.useState('');
    const [passwordOne, setPasswordOne] = React.useState('');
    const [passwordTwo, setPasswordTwo] = React.useState('');
    const [avatar, setAvatar] = React.useState('');

    const nav = useNavigate();

    // eslint-disable-next-line consistent-return
    const validateUser = async (e) => {
        e.preventDefault();
        const user = {
          email,
          password: passwordOne,
          passwordTwo,
          avatar,
        };

        const data = await post('register', user);

        if (!data.error) {
          console.log(data.message);
          localStorage.removeItem('secret');
          localStorage.removeItem('rememberMe');
          return nav('/auth/login');
        }

        console.log(data);
      };

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
          gap: 2,
          width: 600,
          height: 500,
          p: 2,
          borderRadius: '80px',
          opacity: 0.85,
        }}
          elevation={10}
          onSubmit={validateUser}
        >
          <Box sx={{ m: 'auto' }}>
            <Avatar alt="Profile avatar" src={avatar} sx={{ width: 120, height: 120 }} />
          </Box>

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
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
            />
            <TextField
              sx={{
                    width: '70%',
                }}
              variant="filled"
              label="Repeat password:"
              type="password"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
            />
            <TextField
              sx={{
                    width: '70%',
                }}
              variant="filled"
              label="Avatar URL:"
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
    );
    };

    export default RegisterForm;
