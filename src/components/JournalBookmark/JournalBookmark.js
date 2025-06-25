import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledLink = styled(Link)({
    textDecoration: 'none',
});

const DesktopBookmarkContainer = styled('div')(({ theme }) => ({
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

const StyledDesktopBookmark = styled('div', {
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

const DesktopBookmarkText = styled(Typography)(({ theme }) => ({
    color: '#f0f0f0',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    fontWeight: 'bold',
    fontFamily: theme.fonts.heading,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 'clamp(0.75rem, 1.5vh, 0.95rem)',
    
}));

const MobileBookmarkContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1, 
    gap: '0.5em',
    pointerEvents: 'none',
    bottom: '100%',
    marginTop:'20px',
    '@media (min-width: 1024px)': {
        display: 'none',
    }
}));

const StyledMobileBookmark = styled('div', {
  shouldForwardProp: (prop) => prop !== 'bookmarkColor',
})(({ theme, bookmarkColor }) => ({
    backgroundColor: bookmarkColor,
    boxShadow: '2px -2px 6px rgba(0, 0, 0, 0.35)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    position: 'relative',
    width: '4vh',
    minWidth: '35px',
    height: '12vh',
    minHeight: '90px',
    marginBottom:'-10px',
    clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 50% 25%, 0% 0%)',
    transition: 'transform 0.2s ease-in-out, filter 0.2s ease-in-out',
    pointerEvents: 'auto',
    cursor: 'pointer',
    overflow: 'hidden',
    '&:hover': {
        transform: 'translateY(-8px)',
        filter: 'brightness(1.15)',
    },
}));

const MobileBookmarkText = styled(Typography)(({ theme }) => ({
    color: '#f0f0f0',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    fontWeight: 'bold',
    fontFamily: theme.fonts.heading,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight: '100%',
    padding: '1em 0',
    boxSizing: 'border-box',
    fontSize: 'clamp(0.75rem, 1.5vh, 0.95rem)',
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    transform: 'rotate(180deg)',
}));

const JournalBookmark = ({ pages }) => {
    const bookmarkColors = [
        '#b55d4f',
        '#4b7a8c',
        '#6a8a4b',
        '#c7a34c',
        '#824e8c',
        '#5a5a78',
    ];

    const bookmarkedPages = pages.filter((page) => page.isBookmark);

    return (
        <>
            <DesktopBookmarkContainer>
                {bookmarkedPages.map((page, index) => (
                    <StyledLink
                        key={`desktop-${index}`}
                        to={page.path}
                        aria-label={`Go to ${page.title} page`}
                    >
                        <StyledDesktopBookmark
                            bookmarkColor={bookmarkColors[index % bookmarkColors.length]}
                        >
                            <DesktopBookmarkText>
                                {page.title}
                            </DesktopBookmarkText>
                        </StyledDesktopBookmark>
                    </StyledLink>
                ))}
            </DesktopBookmarkContainer>

            <MobileBookmarkContainer>
                 {bookmarkedPages.map((page, index) => (
                    <StyledLink
                        key={`mobile-${index}`}
                        to={page.path}
                        aria-label={`Go to ${page.title} page`}
                    >
                        <StyledMobileBookmark
                             bookmarkColor={bookmarkColors[index % bookmarkColors.length]}
                        >
                             <MobileBookmarkText>
                                {page.title}
                            </MobileBookmarkText>
                        </StyledMobileBookmark>
                    </StyledLink>
                ))}
            </MobileBookmarkContainer>
        </>
    );
};

export default JournalBookmark;