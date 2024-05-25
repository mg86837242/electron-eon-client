import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { AuthFooter } from '../components';
import useAuthentication from '../hooks/useAuthentication';
import loginSchema from '../schemas/loginSchema';

export default function SignInSide() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const { loginError, handleLogin } = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = data => {
    handleLogin(data.email, data.password, () =>
      navigate(from, { replace: true }),
    );
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url("src/assets/sign-in-01.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mt: 1,
              '& .MuiInputBase-root': {
                pt: '8px',
                pb: '8px',
              },
            }}
          >
            <Controller
              name='email'
              control={control}
              render={({ field: { name, value, ref, onChange, onBlur } }) => (
                <TextField
                  name={name}
                  value={value}
                  inputRef={ref}
                  onChange={e => {
                    onChange(e);
                    trigger('email');
                  }}
                  onBlur={onBlur}
                  error={!!errors.email || !!loginError}
                  helperText={errors.email?.message || loginError}
                  margin='normal'
                  required
                  fullWidth
                  id='sign-in-email'
                  label='Email Address'
                  autoComplete='email'
                  autoFocus
                  variant='filled'
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field: { name, value, ref, onChange, onBlur } }) => (
                <TextField
                  name={name}
                  value={value}
                  inputRef={ref}
                  onChange={e => {
                    onChange(e);
                    trigger('password');
                  }}
                  onBlur={onBlur}
                  error={!!errors.password || !!loginError}
                  helperText={errors.password?.message || loginError}
                  margin='normal'
                  required
                  fullWidth
                  id='sign-in-password'
                  label='Password'
                  type='password'
                  autoComplete='current-password'
                  variant='filled'
                />
              )}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid>
                <Link variant='body2' onClick={() => navigate('/signup')}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <AuthFooter sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
