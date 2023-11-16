import PaymentsIcon from '@mui/icons-material/Payments';
import { Box, Button, Stack, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDarkMode } from '@rbnd/react-dark-mode';

export const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { mode, setMode } = useDarkMode();
  return (
    <>
      <Box>
        <Box>
          <center>
            <Stack direction="row" spacing={2} marginBottom={7} marginTop={1}>
              <Box
                sx={{
                  background: '#39DC79',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '5%',
                  borderRadius: '0.3125rem',
                }}
              >
                <PaymentsIcon sx={{ fontSize: 20, color:"#FEFFFE" }} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Money
                </Typography>
              </Box>
            </Stack>
          </center>

          <Stack spacing={2}>
            <Button
              startIcon={
                <AutoAwesomeMosaicIcon sx={{ fontSize: 20, marginLeft: -3 }} />
              }
              sx={{
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
                color: '#39DC79',
              }}
              variant={pathname === '/dashboard' ? 'contained' : 'text'}
              fullWidth
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>

            <Button
              startIcon={<SettingsIcon sx={{ fontSize: 20 }} />}
              sx={{
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
                color: '#39DC79',
              }}
              variant={pathname === '/config' ? 'contained' : 'text'}
              fullWidth
              onClick={() => navigate('/config')}
            >
              Configurações
            </Button>
          </Stack>
        </Box>
        <Box marginTop={'55vh'}>
          <Button
            startIcon={<LogoutIcon />}
            onClick={() => window.electron.ipcRenderer.exit()}
            color={mode === 'dark' ? 'primary'  : 'error'}
            sx={{
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
              color: mode === 'dark' ? '#F93434'  : '#FEFFFE',
            }}
            variant="contained"
            fullWidth
          >
            Sair
          </Button>
        </Box>
      </Box>
    </>
  );
};
