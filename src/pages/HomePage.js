import React from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../assets/images/LOGO.png';

const StyledHomePage = styled('div')(({ theme }) => ({
    textAlign: 'center',
    fontFamily: '"Permanent Marker", cursive',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    color: '#000000',
}));

// Title
const StyledTitle = styled(Typography)(({ theme }) => ({
    width: '80%',
    fontSize: `calc(9vh)`,
    letterSpacing: 1.5,
    color: 'black',
    textShadow: '2px 1px 1px rgba(255, 255, 255, 0.5)',
    fontFamily: '"Permanent Marker"',
}));

// Subtitle
const StyledSubtitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    fontSize: `calc(6vh)`, 
    color: 'black',
    fontFamily: '"Permanent Marker"',
}));

const StyledLogo = styled('img')(({ theme }) => ({
    width: `calc(35vh)`, 
    height: 'auto', 
}));

const HomePage = ({ nextPage, prevPage, pageNumber, isBookmark }) => {
    console.log("In HomePage");
    console.log(`Next Page: ${nextPage}`);
    console.log(`Prev Page: ${prevPage}`);

    isBookmark = true;
    return (
        <JournalPage title="Home" nextPage={nextPage} prevPage={prevPage} isCover={true} pageNumber={pageNumber}>
            <StyledHomePage>
                <StyledTitle variant="h3">
                    Arsen's Webpages
                </StyledTitle>
                <StyledSubtitle variant="h5">
                    Journal 1
                </StyledSubtitle>
                <StyledLogo src={logo} alt="Logo" />
            </StyledHomePage>
        </JournalPage>
    );
};

export default HomePage;
