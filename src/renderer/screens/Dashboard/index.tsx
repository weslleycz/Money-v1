import { faker } from '@faker-js/faker';
import { Box, Grid } from '@mui/material';

import { useDarkMode } from '@rbnd/react-dark-mode';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AvatarUser } from '../../components/AvatarUser';
import { Card } from '../../components/Card';
import { Coins } from '../../components/Coins';
import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import { Table } from '../../components/Table';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const labels = ['February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Economia',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: '#39DC79',
      backgroundColor: '#39DC79',
    },
    {
      label: 'Saídas',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: '#F93434',
      backgroundColor: '#F93434',
    },
  ],
};

export const Dashboard = () => {
  const { mode, setMode } = useDarkMode();
  const [reloader,setReloader] = useState("")

  const options = {
    responsive: true,
    color: '#FEFFFE',
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Economizado esse mês',
        color: mode === 'dark' ? '#FEFFFE' : '#040508',
        fullSize: true,
        align: 'start',
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7.5}>
          <Grid marginBottom={2} container spacing={2}>
            <Grid item xs={8}>
              <Header text="Dashboard" />
            </Grid>
            <Grid sx={{ justifyContent: 'right', display: 'flex' }} item xs={4}>
              <Modal setReloader={setReloader} />
            </Grid>
          </Grid>
          <Box>
            <Card  reloader={reloader} />
            <Table reloader={reloader} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <AvatarUser />
          <Coins />
          <Box marginTop={'5%'}>
            <Line options={options} data={data} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
