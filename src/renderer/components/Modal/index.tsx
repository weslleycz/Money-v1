import { Backdrop, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './styles.scss';
import { useDarkMode } from '@rbnd/react-dark-mode';
import { AvatarSlider } from '../AvatarSlider';

type Pros = {
  setReloader: any;
};

export const Modal = ({ setReloader }: Pros) => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('entry');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [modalOpen, setModalOpen] = useState(false);
  const { mode, setMode } = useDarkMode();

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleSave = () => {
    const id = uuidv4();
    window.electron.store.set({
      [`transactions.${id}`]: {
        id,
        title,
        value: value * 100,
        paymentMethod,
        type,
        date: new Date(),
      },
    });
    setTitle('');
    setValue('');
    setType('entry');
    setPaymentMethod('cash');
    handleClose();
    setReloader(new Date());
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleOpen}>
        Nova transação
      </Button>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            background: mode === 'dark' ? '#1F1D2B' : '#FEFFFE',
            color: mode === 'dark' ? '#FEFFFE' : '',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <DialogTitle>Adicionar Transação</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Título"
            type="text"
            color="success"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              '& label': {
                color: mode === 'dark' ? '#FEFFFE' : '',
              },
              '& input': {
                color: mode === 'dark' ? '#FEFFFE' : '',
              },
              background: mode === 'dark' ? 'rgba(0, 0, 0, 0.13)' : '',
            }}
          />
          <TextField
            margin="dense"
            id="value"
            label="Valor"
            type="number"
            fullWidth
            sx={{
              '& label': {
                color: mode === 'dark' ? '#FEFFFE' : '',
              },
              '& input': {
                color: mode === 'dark' ? '#FEFFFE' : '',
              },
              background: mode === 'dark' ? 'rgba(0, 0, 0, 0.13)' : '',
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            color="success"
          />
          <FormControl
            sx={{
              '& label': {
                color: mode === 'dark' ? '#FEFFFE' : '',
              },
              color: mode === 'dark' ? '#FEFFFE' : '',
              background: mode === 'dark' ? 'rgba(0, 0, 0, 0.13)' : '',
              marginTop: 1,
            }}
            color="success"
            fullWidth
          >
            <InputLabel>Tipo</InputLabel>
            <Select
              sx={{
                '& label': {
                  color: mode === 'dark' ? '#FEFFFE' : '',
                },
                '& input': {
                  color: mode === 'dark' ? '#FEFFFE' : '',
                },
                '&.Mui-focused': {
                  color: mode === 'dark' ? '#FEFFFE' : '',
                },
                '& .MuiSelect-icon': {
                  color: mode === 'dark' ? '#FEFFFE' : '', // Cor do ícone do Select
                },
                '&:hover fieldset': {
                  borderColor: mode === 'dark' ? '#FEFFFE' : '', // Cor da borda durante o hover
                },
              }}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="entry">Entrada</MenuItem>
              <MenuItem value="exit">Saída</MenuItem>
            </Select>
          </FormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="Método de Pagamento"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="cash"
                control={<Radio color="success" />}
                label="Dinheiro"
              />
              <FormControlLabel
                value="pix"
                control={<Radio color="success" />}
                label="Pix"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button variant="contained" onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={handleSave}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        open={modalOpen}
        sx={{
          background: 'transparent',
          backdropFilter: 'blur(5px)',
          '-webkit-backdrop-filter': 'blur(5px)',
          backgroundColor: mode ? '' : 'rgba(255, 255, 255, 0.596)',
          boxShadow: 'none',
          transform: 'translateZ(0)',
          zIndex: (theme) => theme.zIndex.drawer + 1, // Certifique-se de que a camada esteja acima do Drawer, se houver
        }}
      />
    </>
  );
};
