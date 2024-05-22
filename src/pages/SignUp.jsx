import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useMutation } from '@tanstack/react-query';

import { registerUser } from '../api';
import { AuthFooter } from '../components';
import registerSchema from '../schemas/registerSchema';
import sleep from '../utils/sleep';

export default function SignUp() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const {
    mutate,
    error: mutError,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: registerUser,
  });

  const onSubmit = async data => {
    mutate(data);

    await sleep(3_000);
    navigate('/', { replace: true });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 3,
            '& .MuiTextField-root': {
              mb: '8px',
            },
            '& .MuiInputBase-root': {
              pt: '8px',
              pb: '8px',
            },
          }}
        >
          <Grid container spacing={2} justifyContent='center'>
            <Grid xs={12} sm={6}>
              <Controller
                name='firstName'
                control={control}
                render={({ field: { name, value, ref, onChange, onBlur } }) => (
                  <TextField
                    name={name}
                    value={value}
                    inputRef={ref}
                    onChange={e => {
                      onChange(e);
                      trigger('firstName');
                    }}
                    onBlur={onBlur}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    required
                    fullWidth
                    id='register-first-name'
                    label='First Name'
                    autoComplete='given-name'
                    autoFocus
                    variant='filled'
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Controller
                name='lastName'
                control={control}
                render={({ field: { name, value, ref, onChange, onBlur } }) => (
                  <TextField
                    name={name}
                    value={value}
                    inputRef={ref}
                    onChange={e => {
                      onChange(e);
                      trigger('lastName');
                    }}
                    onBlur={onBlur}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    required
                    fullWidth
                    id='register-last-name'
                    label='Last Name'
                    autoComplete='family-name'
                    variant='filled'
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
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
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                    fullWidth
                    id='register-email'
                    label='Email Address'
                    autoComplete='email'
                    variant='filled'
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
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
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    required
                    fullWidth
                    id='register-password'
                    label='Password'
                    type='password'
                    autoComplete='new-password'
                    variant='filled'
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <FormControlLabel
                sx={{
                  mr: 0,
                  // // ??? For some reason, the following customization doesn't work, despite aligning with: https://mui.com/material-ui/customization/how-to-customize/#overriding-nested-component-styles
                  // '.MuiGrid-root > .MuiFormControlLabel-root': {
                  //   marginRight: 0,
                  // },
                }}
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
            {/* FIXME use MUI snackbar(s) here */}
            {isError && (
              <Grid xs={12} display='flex' justifyContent='center'>
                <Typography component='p' variant='body1' color='error.main'>
                  {mutError?.response?.data?.message || 'An error occurred'}
                </Typography>
              </Grid>
            )}
            {isSuccess && (
              <Grid xs={12} display='flex' justifyContent='center'>
                <Typography component='p' variant='body1' color='success.main'>
                  Registration successful!
                </Typography>
              </Grid>
            )}
          </Grid>
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            loading={isPending}
            loadingIndicator='Pending...'
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid>
              <Link
                variant='body2'
                // After redirecting to the login page, successful login will navigate the user to the landing page
                onClick={() => navigate('/login', { state: { from: '/' } })}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <AuthFooter sx={{ mt: 5 }} />
    </Container>
  );
}