import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import bcrypt from "bcryptjs-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AvatarSlider } from '../../components/AvatarSlider';
import { useDarkMode } from '@rbnd/react-dark-mode';

export const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState(0);
  const navigate = useNavigate();
  const { mode, setMode } = useDarkMode();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validationSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    email: yup
      .string()
      .email('Formato de email inválido')
      .required('Email é obrigatório'),
    pin: yup
      .string()
      .min(6, 'PIN deve ter pelo menos 6 caracteres')
      .required('PIN é obrigatório'),
    confirmarPin: yup
      .string()
      .oneOf([yup.ref('pin')], 'Os PINs não coincidem')
      .required('Confirmar PIN é obrigatório'),
  });

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    pin: '',
    confirmarPin: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, {
        abortEarly: false,
      });
      window.electron.store.set('user', {
        nome:formData.nome,
        email:formData.email,
        pin:bcrypt.hashSync(formData.pin, 10),
        avatar,
      });
      navigate('/dashboard')
    } catch (error) {
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setFormErrors(errors);
    }
  };

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
      <AvatarSlider setAvatar={setAvatar} />
      <TextField
        id="outlined-basic-name"
        label="Nome"
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
        value={formData.nome}
        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        error={Boolean(formErrors.nome)}
        helperText={formErrors.nome}
      />
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
            color: mode === 'dark' ? 'white' : 'inherit',
          },
          '& label': {
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
      <TextField
        id="outlined-basic-confirm-pin"
        label="Confirme o PIN"
        variant="outlined"
        color="secondary"
        type={showConfirmPassword ? 'text' : 'password'}
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
                onClick={handleToggleConfirmPasswordVisibility}
                edge="end"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={formData.confirmarPin}
        onChange={(e) =>
          setFormData({ ...formData, confirmarPin: e.target.value })
        }
        error={Boolean(formErrors.confirmarPin)}
        helperText={formErrors.confirmarPin}
      />

      <Button
        variant="contained"
        color="success"
        sx={{ width: '300px', marginTop: 2 }}
        onClick={handleSubmit}
      >
        Registrar
      </Button>
    </Box>
  );
};
