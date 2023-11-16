import PixIcon from '@mui/icons-material/Pix';
import { Box, Pagination, Paper, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { useDarkMode } from '@rbnd/react-dark-mode';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Paginator } from 'array-paginator';
import { useEffect, useState } from 'react';

export const Table = (reloader: any) => {
  const { mode, setMode } = useDarkMode();
  const [transactions, setTransactions] = useState<Paginator<unknown>>();
  const [page, setPage] = useState(1);
  useEffect(() => {
    const transactionsDB = window.electron.store.get('transactions');
    if (transactionsDB != undefined) {
      setTransactions(new Paginator(Object.values(transactionsDB), 5, 1));
    }
  }, [reloader]);

  const handlePageChange = (event: any, page: number) => {
    setPage(page);
  };

  return (
    <Box marginTop={5}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Últimas transações
      </Typography>
      <Paper
        sx={{
          background: 'transparent',
          p: 2,
          height: '300px',
          overflowY: 'auto',
        }}
      >
        <List dense sx={{ width: '100%' }}>
          {transactions?.page(page).map((transaction) => {
            return (
              <>
                {' '}
                <Divider />
                <ListItem
                  key={transaction.id}
                  secondaryAction={
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          transaction.type === 'entry' ? '#39DC79' : '#F93434',
                        fontWeight: 'bold',
                      }}
                      component="span"
                    >
                      {transaction.type === 'entry' ? '+R$' : '-R$'}{' '}
                      {transaction.value / 100}
                    </Typography>
                  }
                  disablePadding
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#39DC79' }}>
                      {transaction.paymentMethod === 'pix' ? (
                        <PixIcon />
                      ) : (
                        <PaymentsIcon />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ color: mode === 'dark' ? '#FEFFFE' : '#040508' }}
                    primary={transaction.title}
                    secondary={
                      <Typography
                        variant="caption"
                        sx={{ color: '#8A8C94' }}
                        component="span"
                      >
                        {transaction.date}
                      </Typography>
                    }
                  />
                </ListItem>
              </>
            );
          })}
        </List>
      </Paper>
      <Pagination
        variant="text"
        sx={{ marginTop: 2 }}
        onChange={handlePageChange}
        count={transactions?.totalPages}
        color="secondary"
      />
    </Box>
  );
};
