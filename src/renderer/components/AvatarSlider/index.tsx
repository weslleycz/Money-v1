import React, { useState } from 'react';
import { Avatar, Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDarkMode } from '@rbnd/react-dark-mode';
import AvatarImg1 from '../../assets/1.png';
import AvatarImg2 from '../../assets/2.png';
import AvatarImg3 from '../../assets/3.png';
import AvatarImg4 from '../../assets/4.png';
import AvatarImg5 from '../../assets/5.png';
import AvatarImg6 from '../../assets/6.png';
import AvatarImg7 from '../../assets/7.png';
import AvatarImg8 from '../../assets/8.png';
import AvatarImg9 from '../../assets/9.png';
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
import AvatarImg20 from '../../assets/20.png';

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

type Props = {
  setAvatar: any;
};

export const AvatarSlider = ({ setAvatar }: Props) => {
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const { mode, setMode } = useDarkMode();
  const handlePreviousAvatar = () => {
    const newIndex =
      currentAvatarIndex === 0
        ? avatarImages.length - 1
        : currentAvatarIndex - 1;
    setCurrentAvatarIndex(newIndex);
    setAvatar(newIndex);
  };

  const handleNextAvatar = () => {
    const newIndex =
      currentAvatarIndex === avatarImages.length - 1
        ? 0
        : currentAvatarIndex + 1;
    setCurrentAvatarIndex(newIndex);
    setAvatar(newIndex);
  };

  return (
    <Box display={'flex'}>
      <IconButton
        color="success"
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&:focus': {
            backgroundColor: 'transparent',
            outline: 'none',
          },
        }}
        onClick={handlePreviousAvatar}
      >
        <ArrowBackIosIcon />
        <i className="fa fa-chevron-left"></i>
      </IconButton>

      <Avatar
        sx={{
          width: 110,
          height: 110,
          fontSize: 75,
          bgcolor: mode === 'dark' ? '#1F1D2B' : '#39DC79',
          marginBottom: 1,
        }}
        src={avatarImages[currentAvatarIndex]}
      />

      <IconButton
        color="success"
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&:focus': {
            backgroundColor: 'transparent',
            outline: 'none',
          },
        }}
        onClick={handleNextAvatar}
      >
        <ArrowForwardIosIcon />
        <i className="fa fa-chevron-right"></i>
      </IconButton>
    </Box>
  );
};
