import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Badge, Box, Typography, styled } from '@mui/material';
import { useDarkMode } from '@rbnd/react-dark-mode';
import { useEffect, useState } from 'react';
import AvatarImg1 from '../../assets/1.png';
import AvatarImg10 from '../../assets/10.png';
import AvatarImg11 from '../../assets/11.png';
import AvatarImg12 from '../../assets/12.png';
import AvatarImg13 from '../../assets/13.png';
import AvatarImg14 from '../../assets/14.png';
import AvatarImg15 from '../../assets/15.png';
import AvatarImg16 from '../../assets/16.png';
import AvatarImg17 from '../../assets/17.png';
import AvatarImg18 from '../../assets/18.png';
import AvatarImg19 from '../../assets/19.png';
import AvatarImg2 from '../../assets/2.png';
import AvatarImg20 from '../../assets/20.png';
import AvatarImg3 from '../../assets/3.png';
import AvatarImg4 from '../../assets/4.png';
import AvatarImg5 from '../../assets/5.png';
import AvatarImg6 from '../../assets/6.png';
import AvatarImg7 from '../../assets/7.png';
import AvatarImg8 from '../../assets/8.png';
import AvatarImg9 from '../../assets/9.png';

const avatarImages = [
  AvatarImg1,
  AvatarImg2,
  AvatarImg3,
  AvatarImg4,
  AvatarImg5,
  AvatarImg6,
  AvatarImg7,
  AvatarImg8,
  AvatarImg9,
  AvatarImg10,
  AvatarImg11,
  AvatarImg12,
  AvatarImg13,
  AvatarImg14,
  AvatarImg15,
  AvatarImg16,
  AvatarImg17,
  AvatarImg18,
  AvatarImg19,
  AvatarImg20,
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor',
    },
  },
}));

export const AvatarUser = () => {
  const { mode, setMode } = useDarkMode();
  const [user, setUser] = useState({}) as any;
  useEffect(() => {
    setUser(window.electron.store.get('user'));
  }, []);
  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '15%' }}
      >
        <Box textAlign={'center'}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <StyledBadge
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar
                sx={{
                  width: 110,
                  height: 110,
                  fontSize: 75,
                  bgcolor: mode === 'dark' ? '#1F1D2B' : '#39DC79',
                  marginBottom: 1,
                  position: 'relative',
                }}
                src={avatarImages[user.avatar]}
              />
              <EditIcon
                sx={{
                  position: 'absolute',
                  bottom: 5,
                  right: 10,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  color: mode === 'dark' ? '#FEFFFE' :  '#FEFFFE',
                  bgcolor: mode === 'dark' ? '#39DC79' :  '#1F1D2B',
                  fontSize: 15,
                  p: 0.5,
                }}
              />
            </StyledBadge>
          </Box>
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="subtitle1"
            gutterBottom
          >
            {user.nome}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
