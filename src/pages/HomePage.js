// src/pages/HomePage.js
import React from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../assets/images/LOGO.png';

const StyledHomePage = styled('div')(({ theme }) => ({
    textAlign: 'center',
    fontFamily: '"Permanent Marker", cursive', // Suggested font that resembles handwriting
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#000000', // Setting text color to black
}));

const HomePage = () => {
    return (
        <JournalPage title="Home" nextPage="/about" isCover={true}>
            <StyledHomePage>
                <Typography variant="h3" sx={{
                    width: '80%',
                    fontSize: '5rem',
                    letterSpacing: 1.5,
                    color: 'black', // Ensuring text is black
                    textShadow: '2px 1px 1px rgba(255,255,255,0.6)', // Adding a subtle white shadow for a glowing effect
                    fontFamily: 'Permanent Marker' // Use a "handwritten" style font
                }}>
                    Arsen's Webpages
                </Typography>
                <Typography variant="h5" sx={{
                    marginBottom: 3,
                    fontSize: '3rem',
                    color: 'black',
                    fontFamily: 'Permanent Marker'
                }}>
                    Journal 1
                </Typography>
                <img src={logo} alt="Logo" style={{ width: '200px', height: '200px' }} />
            </StyledHomePage>
        </JournalPage>
    );
};

export default HomePage;
