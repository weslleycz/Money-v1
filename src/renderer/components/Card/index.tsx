import { Box, Grid, Stack, Typography } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import PaidIcon from '@mui/icons-material/Paid';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@rbnd/react-dark-mode';

function AnimatedNumber({ finalValue }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, scale: 1, transition: { duration: 1 } });
  }, []);

  return (
    <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={controls}>
      {finalValue}
    </motion.span>
  );
}

export const Card = (reloader: any) => {
  const { mode, setMode } = useDarkMode();
  const [entradas, setEntradas] = useState(0);
  const [saida, setSaida] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const transactionsDB = window.electron.store.get('transactions');
    if (transactionsDB != undefined) {
      let entradasDB = 0;
      let saidasDB = 0;
      let totalDB = 0;
      Object.values(transactionsDB).map((transaction: any) => {
        if (transaction.type === 'exit') {
          saidasDB = saidasDB + transaction.value;
        } else {
          entradasDB = entradasDB + transaction.value;
        }
        totalDB = entradasDB - saidasDB;

        setEntradas(entradasDB);
        setSaida(saidasDB);
        setTotal(totalDB);
      });
    }
  }, [reloader]);
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            background: mode === 'dark' ? '#1F1D2B' : '#FEFFFE',
            width: '25%',
            p: 3,
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              Entradas
            </Grid>
            <Grid item xs={4}>
              <ArrowCircleUpIcon color="success" />
            </Grid>
          </Grid>
          <Typography variant="h5" gutterBottom>
            <AnimatedNumber finalValue={`R$ ${entradas/100}`} />
          </Typography>
        </Box>
        <Box
          sx={{
            background: mode === 'dark' ? '#1F1D2B' : '#FEFFFE',
            width: '25%',
            p: 3,
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              Saídas
            </Grid>
            <Grid item xs={4}>
              <ArrowCircleDownIcon color="error" />
            </Grid>
          </Grid>
          <Typography variant="h5" gutterBottom>
            <AnimatedNumber finalValue={`R$ ${saida/100}`} />
          </Typography>
        </Box>
        <Box
          sx={{
            background:
              mode === 'dark'
                ? 'linear-gradient(180deg, #32B068 20.83%, #3BF484 100%)'
                : '#3BF484',
            width: '25%',
            p: 3,
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              Total
            </Grid>
            <Grid item xs={4}>
              <PaidIcon sx={{ color: '#FEFFFE' }} />
            </Grid>
          </Grid>
          <Typography variant="h5" gutterBottom>
            <AnimatedNumber finalValue={`R$ ${total/100}`} />
          </Typography>
        </Box>
      </Stack>
    </>
  );
};
