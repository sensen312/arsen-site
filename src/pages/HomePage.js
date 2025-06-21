import React from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../assets/images/LOGO.png';
import backgroundImage from '../assets/images/journalBackgroundCover.jpg';
import SEO from '../components/SEO/SEO';

const StyledHomePage = styled('div')(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  color: '#000000',
  position: 'relative',
  zIndex: 1,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  
  backgroundRepeat: 'no-repeat',
  borderRadius: '12px',
  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5), 10px 10px 30px rgba(0, 0, 0, 0.5)',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  margin: '-20rem 0 0 auto',
  width: '85%',
  fontSize: `calc(5vh)`,
  color: 'black',
  textShadow: '2px 1px 1px rgba(74, 23, 23, 0.5)',
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontSize: `calc(6vh)`, 
  color: 'black',
}));

const StyledLogo = styled('img')(({ theme }) => ({
  width: `calc(35vh)`, 
  height: 'auto', 
}));

const HomePage = ({ nextPage, prevPage, pageNumber, isBookmark }) => {
    isBookmark = true;
    return (
        
        <JournalPage title="Home" nextPage={nextPage} prevPage={prevPage} isCover={true} pageNumber={pageNumber}>
            <StyledHomePage>
                <StyledTitle variant="h3">
                    Arsen's Webpages
                </StyledTitle>
                <StyledSubtitle variant="h5">
                    Journal I
                </StyledSubtitle>
                {/*<StyledLogo src={logo} alt="Logo" />*/}
            </StyledHomePage>
        </JournalPage>
    );
};

export default HomePage;