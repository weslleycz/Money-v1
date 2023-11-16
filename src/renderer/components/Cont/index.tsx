import { Box } from '@mui/material';
import { useDarkMode } from '@rbnd/react-dark-mode';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Cont = ({ children }: Props) => {
  const { mode, setMode } = useDarkMode();
  return (
    <>
      <Box
        sx={{
          background: mode === 'dark' ? '#2528368c' : 'rgba(228, 241, 255, 0.34)'  ,
          padding: '1rem',
          height: '96%',
          borderRadius: '1.125rem',
        }}
      >
        {children}
      </Box>
    </>
  );
};
