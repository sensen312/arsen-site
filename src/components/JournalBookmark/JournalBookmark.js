import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';



const BookmarkContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '10vh', 
    left: '100%', 
    marginLeft: '-10px', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 1, 
    pointerEvents: 'none', 
    '@media (max-width: 1023px)': {
        display: 'none',
    }
}));

const StyledBookmark = styled('div')(({ theme }) => ({
  backgroundColor: theme.colors.cover.spine, 
  border: `1px solid ${theme.colors.cover.plateBorder}`,
  borderLeft: 'none',
  padding: '0.5em 1.5em 0.5em 1em',
  display: 'flex',
  justifyContent: 'center',
  margin: '0.5em 0',
  position: 'relative', 
  borderRadius: '0 4px 4px 0',
  transition: 'transform 0.2s ease-in-out', 
  pointerEvents: 'auto',
  '&:hover': {
    transform: 'translateX(10px)', 
    zIndex: 3, 
  },
}));

const JournalBookmark = ({ pages, isDesktop }) => {
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
                    <StyledBookmark aria-label={page.title}>
                        <Typography
                            variant="body2"
                            sx={(theme) => ({
                                color: theme.colors.paper,
                                fontWeight: 'bold',
                                fontFamily: theme.fonts.heading,
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
