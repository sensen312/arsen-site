import React from 'react';
import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={(theme) => ({
      '@import': "url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Lora:wght@400;600&family=Dancing+Script:wght@700&display=swap')",
      body: {
        backgroundColor: '#212121',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontFamily: theme.fonts.body,
        boxSizing: 'border-box',
        overflowX: 'hidden', 
        overflowY: 'hidden', 
      },
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
    })}
  />
);

export default GlobalStyles;