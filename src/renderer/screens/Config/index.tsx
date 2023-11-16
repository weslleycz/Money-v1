import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, Paper, Switch, Typography } from '@mui/material';
import { useDarkMode } from '@rbnd/react-dark-mode';
import { Header } from '../../components/Header';
import { AvatarSlider } from '../../components/AvatarSlider';

export const Config = () => {
  const { mode, setMode } = useDarkMode();
  const handlerThemeSelet = () => {
    window.electron.store.get('theme') === 'dark'
      ? window.electron.store.set('theme', 'light')
      : window.electron.store.set('theme', 'dark');
    setMode(window.electron.store.get('theme'));
  };

  const handlerNotificationsSelet = () => {
    window.electron.store.get('notifications')
      ? window.electron.store.set('notifications', false)
      : window.electron.store.set('notifications', true);
  };

  const handlerBlockSelet = () => {
    window.electron.store.get('block')
      ? window.electron.store.set('block', false)
      : window.electron.store.set('block', true);
  };

  return (
    <>
      <Header text="Configurações" />
      <Box p={2} marginBottom={9}>
        <Paper
          elevation={3}
          sx={{
            marginBottom: 2,
            padding: 2,
            background: mode === 'dark' ? '#1F1D2B' : '#FEFFFE',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {' '}
              <DarkModeIcon sx={{ color: '#39DC79' }} />
            </Box>
            <Box
              sx={{
                flex: 1,
                paddingLeft: 2,
                color: mode === 'dark' ? '#FEFFFE ' : '#1F1D2B',
              }}
            >
              <Typography
                sx={{ color: '#39DC79' }}
                variant="subtitle1"
                fontWeight="bold"
              >
                Modo Escuro
              </Typography>
              <Typography variant="subtitle2">
                Tema escuro para economizar bateria.
              </Typography>
            </Box>
            <Box>
              <Switch
                onClick={() => handlerThemeSelet()}
                defaultChecked={
                  window.electron.store.get('theme') === 'dark' ? true : false
                }
                color="success"
              />
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            marginBottom: 2,
            padding: 2,
            background: mode === 'dark' ? '#1F1D2B' : '#FEFFFE',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LockIcon sx={{ color: '#39DC79' }} />
            </Box>
            <Box
              sx={{
                flex: 1,
                paddingLeft: 2,
                color: mode === 'dark' ? '#FEFFFE' : '#1F1D2B',
              }}
            >
              <Typography
                sx={{ color: '#39DC79' }}
                variant="subtitle1"
                fontWeight="bold"
              >
                Bloqueio de PIN
              </Typography>
              <Typography variant="subtitle2">Proteção por PIN.</Typography>
            </Box>
            <Box>
              <Switch
                onClick={() => handlerBlockSelet()}
                defaultChecked={window.electron.store.get('block')}
                color="success"
              />
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            marginBottom: 2,
            padding: 2,
            background: mode === 'dark' ? '#1F1D2B' : '#FEFFFE',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <NotificationsIcon sx={{ color: '#39DC79' }} />
            </Box>
            <Box
              sx={{
                flex: 1,
                paddingLeft: 2,
                color: mode === 'dark' ? '#FEFFFE ' : '#1F1D2B',
              }}
            >
              <Typography
                sx={{ color: '#39DC79' }}
                variant="subtitle1"
                fontWeight="bold"
              >
                Notificações
              </Typography>
              <Typography variant="subtitle2">Alertas ativados.</Typography>
            </Box>
            <Box>
              <Switch
                onClick={() => handlerNotificationsSelet()}
                defaultChecked={window.electron.store.get('notifications')}
                color="success"
              />
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            marginBottom: '10%',
            padding: 2,
            background: mode === 'dark' ? '#1F1D2B' : '#FEFFFE',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FullscreenIcon sx={{ color: '#39DC79' }} />
            </Box>
            <Box
              sx={{
                flex: 1,
                paddingLeft: 2,
                color: mode === 'dark' ? '#FEFFFE ' : '#1F1D2B',
              }}
            >
              <Typography
                sx={{ color: '#39DC79' }}
                variant="subtitle1"
                fontWeight="bold"
              >
                Tela Cheia
              </Typography>
              <Typography variant="subtitle2">
                Ative o modo de tela cheia.
              </Typography>
            </Box>
            <Box>
              <Switch
                onClick={() => {
                  window.electron.store.get('fullscreen') === true
                    ? window.electron.store.set('fullscreen', false)
                    : window.electron.store.set('fullscreen', true);
                  window.electron.ipcRenderer.relaunch();
                }}
                defaultChecked={window.electron.store.get('fullscreen')}
                color="success"
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};
