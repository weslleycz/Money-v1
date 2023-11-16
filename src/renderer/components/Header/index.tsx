import { Typography } from '@mui/material';

type props = {
  text: string;
};

export const Header = ({text}:props) => {
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        {text}
      </Typography>
    </>
  );
};
