import * as React from 'react';
import {
 TextField, Paper, Typography, Button,
} from '@mui/material';
import { Box } from '@mui/system';
import { post } from '../../../../helpers/plugins/https';

const RegisterForm = () => {
    const [email, setEmail] = React.useState('');
    const [passwordOne, setPasswordOne] = React.useState('');
    const [passwordTwo, setPasswordTwo] = React.useState('');
    const [avatar, setAvatar] = React.useState('');

    const validateUser = async (e) => {
        e.preventDefault();
        const user = {
          email,
          password: passwordOne,
          passwordTwo,
          avatar,
        };

        const data = await post('register', user);

        console.log(data);
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const createUser = async (e) => {
        e.preventDefault();
        const user = {
          email,
          password: passwordOne,
          avatar,

        };

        const res = await post('createUser', user);

        console.log(`User added: ${res}`);
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const submitHandler = async () => {
        await validateUser();
        await createUser();
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
          width: 600,
          height: 500,
          p: 2,
          borderRadius: '80px',
          opacity: 0.85,
        }}
          elevation={10}
          onSubmit={validateUser}
        >
          <Typography component="h1" variant="h4" align="center">Register</Typography>
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