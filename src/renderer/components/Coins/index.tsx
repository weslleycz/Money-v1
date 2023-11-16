import { useDarkMode } from '@rbnd/react-dark-mode';
import axios from 'axios';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

export const Coins = () => {

  const [eur,setEur] = useState(0)
  const [usd,setUSD] = useState(0)

  const { mode, setMode } = useDarkMode();

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL',
      );
      setEur(response.data.EURBRL.high)
      setUSD(response.data.USDBRL.high)

    })();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    min: 0.1,
    position: 'left',
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Valores de Moeda em BRL',
        color:  mode === 'dark' ? '#FEFFFE' : '#040508',
        fullSize: true,
        align: 'start',
        font: {
          size: 18,
        },
      },
    },
  };

  const labels = ['USD-BRL', 'EUR-BRL',];

  const data = {
    labels,
    datasets: [
      {
        label: 'Valores em BRL',
        fill: false,
        backgroundColor: ['#34FF48', '#00BDFA', ],
        borderColor: ['#34FF48', '#00BDFA',],
        borderWidth: 2,
        data: [usd, eur,],
      },
    ],
  };

  return (
    <>
      <Bar
       options={options} data={data} />
    </>
  );
};
