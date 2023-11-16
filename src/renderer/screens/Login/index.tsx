import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs-react';
import { useDarkMode } from '@rbnd/react-dark-mode';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    pin: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = window.electron.store.get('user');
    if (
      user &&
      user.email === formData.email &&
      bcrypt.compareSync(formData.pin, user.pin)
    ) {
      navigate('/dashboard');
    } else {
      setFormErrors({ general: 'Credenciais inválidas. Tente novamente.' });
    }
  };

  const { mode, setMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Faça login
      </Typography>
      <TextField
        id="outlined-basic-email"
        label="Email"
        type="email"
        variant="outlined"
        color="secondary"
        sx={{
          width: '300px',
          marginTop: 2,
          '& input': {
            // Customize the input text color in dark mode
            color: mode === 'dark' ? 'white' : 'inherit',
          },
          '& label': {
            // Customize the label color in dark mode
            color: mode === 'dark' ? 'white' : 'inherit',
          },
        }}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={Boolean(formErrors.email)}
        helperText={formErrors.email}
      />
      <TextField
        id="outlined-basic-pin"
        label="PIN"
        variant="outlined"
        color="secondary"
        type={showPassword ? 'text' : 'password'}
        sx={{
          width: '300px',
          marginTop: 2,
          '& input': {
            // Customize the input text color in dark mode
            color: mode === 'dark' ? 'white' : 'inherit',
          },
          '& label': {
            // Customize the label color in dark mode
            color: mode === 'dark' ? 'white' : 'inherit',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={formData.pin}
        onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
        error={Boolean(formErrors.pin)}
        helperText={formErrors.pin}
      />
      {formErrors.general && (
        <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
          {formErrors.general}
        </Typography>
      )}
      <Button
        variant="contained"
        color="success"
        sx={{ width: '300px', marginTop: 2 }}
        onClick={handleSubmit}
      >
        Entrar
      </Button>
    </Box>
  );
};
