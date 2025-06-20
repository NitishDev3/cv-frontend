import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../utils/validations/authValidations';
import { setUser } from '../store/slices/authSlice';
import { authService } from '../api/authService';
import type { AppDispatch, RootState } from '../store';
import Loading from '../components/Loading';
import { setToast } from '../store/slices/configSlice';

const Register = () => {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      contactNumber: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.register(data);
      if(response.success){
        navigate('/login');
        dispatch(setToast({
          open: true,
          message: 'Registration successful',
          severity: 'success'
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      dispatch(setToast({
        open: true,
        message: 'Registration failed',
        severity: 'error'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.loginWithGoogle();
      dispatch(setUser(response.user));
      dispatch(setToast({
        open: true,
        message: 'Logged in successfully',
        severity: 'success'
      }));
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
      dispatch(setToast({
        open: true,
        message: 'Google login failed',
        severity: 'error'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.loginWithFacebook();
      dispatch(setUser(response.user));
      dispatch(setToast({
        open: true,
        message: 'Logged in successfully',
        severity: 'success'
      }));
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Facebook login failed');
      dispatch(setToast({
        open: true,
        message: 'Facebook login failed',
        severity: 'error'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/dashboard');
    }
  },[isAuthenticated, navigate])

  return isAuthenticated ? <Loading /> : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Create your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 0, width: '100%' }}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="username"
                  autoFocus
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Username can only contain letters, numbers and underscores">
                          <IconButton edge="end">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="contactNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  id="contactNumber"
                  label="Contact Number (Optional)"
                  autoComplete="tel"
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber?.message}  
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Register'}
            </Button>

            <Box sx={{ textAlign: 'center', mb: 2 }}>
              Already have an account?{" "}
              <Link component={RouterLink} to="/login" variant="body2">
                Sign In
              </Link>
            </Box>

            <Divider sx={{ my: 2 }}>OR</Divider>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={handleFacebookLogin}
                disabled={isLoading}
              >
                Facebook
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;