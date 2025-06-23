import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const BookmarkContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '15vh', 
    left: '100%', 
    marginLeft: '-10px', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 1, 
    gap: '0.5em', 
    pointerEvents: 'none', 
    '@media (max-width: 1023px)': {
        display: 'none',
    }
}));

const StyledBookmark = styled('div', {
  shouldForwardProp: (prop) => prop !== 'bookmarkColor',
})(({ theme, bookmarkColor }) => ({
  backgroundColor: bookmarkColor,
  boxShadow: '2px 3px 6px rgba(0, 0, 0, 0.35)',
  padding: '0 2.5em 0 1.2em',
  display: 'flex',
  justifyContent: 'flex-start', 
  alignItems: 'center',
  position: 'relative',

  width: '15vh',
  height: '4vh',
  minHeight: '30px',
  clipPath: 'polygon(0% 0%, 100% 0%, 85% 50%, 100% 100%, 0% 100%)',
  transition: 'transform 0.2s ease-in-out, filter 0.2s ease-in-out', 
  pointerEvents: 'auto', 
  cursor: 'pointer',
  
  '&:hover': {
    transform: 'translateX(10px)', 
    filter: 'brightness(1.15)',
    zIndex: 3, 
  },
}));

const JournalBookmark = ({ pages, isDesktop }) => {
    
    const bookmarkColors = [
        '#b55d4f', // Muted Terracotta Red
        '#4b7a8c', // Dusty Teal Blue
        '#6a8a4b', // Mossy Green
        '#c7a34c', // Old Gold
        '#824e8c', // Faded Plum
    ];

    const bookmarkedPages = pages.filter((page) => page.isBookmark);
    
    if (!isDesktop) {
        return null;
    }

    return (
        <BookmarkContainer>
            {bookmarkedPages.map((page, index) => (
                <Link
                    key={index}
                    to={page.path}
                    style={{ textDecoration: 'none' }}
                >
                    <StyledBookmark 
                        aria-label={page.title}
                        bookmarkColor={bookmarkColors[index % bookmarkColors.length]}
                    >
                        <Typography
                            sx={(theme) => ({
                                color: '#f0f0f0',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                fontWeight: 'bold',
                                fontFamily: theme.fonts.heading,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                             
                                fontSize: 'clamp(0.75rem, 1.5vh, 0.95rem)',
                            })}
                        >
                            {page.title}
                        </Typography>
                    </StyledBookmark>
                </Link>
            ))}
        </BookmarkContainer>
    );
};

export default JournalBookmark;
