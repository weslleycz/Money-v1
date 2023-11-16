import { Box, Grid, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import { ReactNode } from 'react';
import { Menu } from '../Menu';
import { dark } from '../../theme/dark';
import { Cont } from '../Cont';
import { useDarkMode } from '@rbnd/react-dark-mode';
import { light } from '../../theme/light';
import { useLocation } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

export const ContainerMui = ({ children }: Props) => {
  const { mode, setMode } = useDarkMode();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <ThemeProvider theme={mode === 'dark' ? dark : light}>
      <Box>
        <Container
          sx={{
            background: mode === 'dark' ? '#1F1D2B' : '#FEFFFE',
            height: '97.5vh',
            borderRadius: '1.25rem',
            color: mode === 'dark' ? '#FEFFFE' : '#040508',
            marginTop: pathname === '/registration' || pathname === '/login' ?  1 : 3,
          }}
          maxWidth="xl"
        >
          {pathname === '/registration' || pathname === '/login' ? (
            <>
              <Container maxWidth="sm">{children}</Container>
            </>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Menu />
              </Grid>
              <Grid item xs={10}>
                <Cont>{children}</Cont>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};
