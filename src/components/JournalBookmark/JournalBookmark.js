import React, { useState, useLayoutEffect } from 'react';
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
    gap: '0.5em',
    pointerEvents: 'none',
}));

const StyledDesktopBookmark = styled('div', {
    shouldForwardProp: (prop) => prop !== 'bookmarkColor' && prop !== 'isActive',
})(({ theme, bookmarkColor, isActive }) => ({
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
    zIndex: isActive ? 2 : 1,
    '&:hover': {
        transform: isActive ? 'none' : 'translateX(10px)', 
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
    gap: '0.5em',
    pointerEvents: 'none',
    bottom: '100%',
    marginTop:'20px',
}));

const StyledMobileBookmark = styled('div', {
    shouldForwardProp: (prop) => prop !== 'bookmarkColor' && prop !== 'isActive',
})(({ theme, bookmarkColor, isActive }) => ({
    backgroundColor: bookmarkColor,
    boxShadow: '2px -2px 6px rgba(0, 0, 0, 0.35)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left', // lol
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
    zIndex: isActive ? 2 : 1,
    '&:hover': {
        transform: isActive ? 'none' : 'translateY(-8px)',
        filter: 'brightness(1.15)',
        zIndex: 3,
    },
}));

const MobileBookmarkText = styled(Typography)(({ theme }) => ({
    display: 'block',
    height: '100%',
    boxSizing: 'border-box',
    padding: '1em 0.2em', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    transform: 'rotate(180deg)',

    color: '#f0f0f0',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    fontWeight: 'bold',
    fontFamily: theme.fonts.heading,
    fontSize: 'clamp(0.75rem, 1.5vh, 0.95rem)',
}));


const JournalBookmark = ({ pages, containerRef, activePath }) => {
    const [bookmarkPosition, setBookmarkPosition] = useState('right');

    useLayoutEffect(() => {
         const calculatePosition = () => {
            const isMobileView = window.innerWidth < 796;
            if (isMobileView) {
                setBookmarkPosition('top');
                return; 
            }

            if (containerRef.current) {
                const journalRect = containerRef.current.getBoundingClientRect();
                const spaceOnRight = window.innerWidth - journalRect.right;
                const spaceOnTop = journalRect.top;

                setBookmarkPosition(spaceOnRight > spaceOnTop ? 'right' : 'top');
            }
        };
        let debounceTimeout;
        const handleResize = () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(calculatePosition, 150);
        };

        window.addEventListener('resize', handleResize);
        calculatePosition();

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(debounceTimeout);
        };
    }, [containerRef]);

    const bookmarkColors = [
        '#b55d4f',
        '#4b7a8c',
        '#6a8a4b',
        '#c7a34c',
        '#824e8c',
        '#5a5a78',
    ];

    const bookmarkedPages = pages.filter((page) => page.isBookmark);

    const DesktopBookmarks = (
        <>
            <DesktopBookmarkContainer style={{ zIndex: 1 }}>
                {bookmarkedPages.map((page, index) => {
                    const isActive = page.path === activePath;
                    return (
                        <StyledLink
                            key={`desktop-bg-${index}`}
                            to={page.path}
                            aria-label={`Go to ${page.title} page`}
                            tabIndex={-1} 
                            style={{ visibility: isActive ? 'hidden' : 'visible' }}
                        >
                            <StyledDesktopBookmark
                                bookmarkColor={bookmarkColors[index % bookmarkColors.length]}
                                isActive={false} 
                            >
                                <DesktopBookmarkText>{page.title}</DesktopBookmarkText>
                            </StyledDesktopBookmark>
                        </StyledLink>
                    );
                })}
            </DesktopBookmarkContainer>
            
            <DesktopBookmarkContainer style={{ zIndex: 3 }}>
                {bookmarkedPages.map((page, index) => {
                    const isActive = page.path === activePath;
                    return (
                        <StyledLink
                            key={`desktop-fg-${index}`}
                            to={page.path}
                            aria-label={`Go to ${page.title} page`}
                            style={{ visibility: isActive ? 'visible' : 'hidden' }}
                        >
                            <StyledDesktopBookmark
                                bookmarkColor={bookmarkColors[index % bookmarkColors.length]}
                                isActive={true} 
                            >
                                <DesktopBookmarkText>{page.title}</DesktopBookmarkText>
                            </StyledDesktopBookmark>
                        </StyledLink>
                    );
                })}
            </DesktopBookmarkContainer>
        </>
    );

    const MobileBookmarks = (
         <>
            <MobileBookmarkContainer style={{ zIndex: 1 }}>
                 {bookmarkedPages.map((page, index) => {
                    const isActive = page.path === activePath;
                    return (
                        <StyledLink
                            key={`mobile-bg-${index}`}
                            to={page.path}
                            aria-label={`Go to ${page.title} page`}
                            tabIndex={-1}
                            style={{ visibility: isActive ? 'hidden' : 'visible' }}
                        >
                            <StyledMobileBookmark
                                bookmarkColor={bookmarkColors[index % bookmarkColors.length]}
                                isActive={false}
                            >
                                <MobileBookmarkText>{page.title}</MobileBookmarkText>
                            </StyledMobileBookmark>
                        </StyledLink>
                    );
                })}
            </MobileBookmarkContainer>
            
            <MobileBookmarkContainer style={{ zIndex: 3 }}>
                 {bookmarkedPages.map((page, index) => {
                    const isActive = page.path === activePath;
                    return (
                        <StyledLink
                             key={`mobile-fg-${index}`}
                            to={page.path}
                            aria-label={`Go to ${page.title} page`}
                            style={{ visibility: isActive ? 'visible' : 'hidden' }}
                        >
                            <StyledMobileBookmark
                                bookmarkColor={bookmarkColors[index % bookmarkColors.length]}
                                isActive={true}
                            >
                                <MobileBookmarkText>{page.title}</MobileBookmarkText>
                            </StyledMobileBookmark>
                        </StyledLink>
                    );
                })}
            </MobileBookmarkContainer>
        </>
    );

    return bookmarkPosition === 'right' ? DesktopBookmarks : MobileBookmarks;
};

export default JournalBookmark;