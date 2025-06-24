import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledLinkWrapper = styled(Link, {
    shouldForwardProp: (prop) => prop !== 'isDesktop',
})(({ isDesktop }) => ({
    textDecoration: 'none',
    ...(!isDesktop && {
        marginRight: '-10vh', // groups the bookmarks up
        marginTop: '-35vh',
        // position: 'absolute', just makes them overlap 
    }),
}));

const BookmarkContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isDesktop',
})(({ theme, isDesktop }) => ({
    position: 'absolute',
    zIndex: 1,
    pointerEvents: 'none',
    display: 'flex',
    ...(isDesktop
        ? {
            top: '15vh',
            left: '100%',
            marginLeft: '-10px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.5em',
        }
        : {
            left: 0,
            right: 0,
            flexDirection: 'row-reversed',
            alignItems: 'flex-start',
        }
    ),
}));

const StyledBookmark = styled('div', {
  shouldForwardProp: (prop) => prop !== 'bookmarkColor' && prop !== 'isDesktop',
})(({ theme, bookmarkColor, isDesktop }) => ({
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
    clipPath: 'polygon(0% 0%, 100% 0%, 85% 50%, 100% 100%, 0% 100%)', // makes tail of bookmark
    transition: 'transform 0.2s ease-in-out, filter 0.2s ease-in-out',
    pointerEvents: 'auto',
    cursor: 'pointer',
    ...(isDesktop
        ? {
            '&:hover': {
                transform: 'translateX(10px)',
                filter: 'brightness(1.15)',
                zIndex: 3,
            },
        }
        : {
            transform: 'rotate(-90deg)',
            transformOrigin: 'bottom center',
            '&:hover': {
                transform: 'rotate(-90deg) translateY(-10px)', 
                filter: 'brightness(1.15)',
                zIndex: 3,
            },
        }
    ),
}));

const JournalBookmark = ({ pages, isDesktop }) => {
    const bookmarkColors = [
        '#b55d4f',
        '#4b7a8c',
        '#6a8a4b',
        '#c7a34c',
        '#824e8c',
    ];

    const bookmarkedPages = pages.filter((page) => page.isBookmark);
    
    return (
        <BookmarkContainer isDesktop={isDesktop}>
            {bookmarkedPages.map((page, index) => (
                <StyledLinkWrapper
                    key={index}
                    to={page.path}
                    isDesktop={isDesktop}
                >
                    <StyledBookmark 
                        aria-label={page.title}
                        bookmarkColor={bookmarkColors[index % bookmarkColors.length]}
                        isDesktop={isDesktop}
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
                </StyledLinkWrapper>
            ))}
        </BookmarkContainer>
    );
};

export default JournalBookmark;