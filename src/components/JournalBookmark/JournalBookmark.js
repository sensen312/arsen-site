import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// import bookmarkImage from '../../assets/images/Bookmark.png'; 

const BookmarkContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: '-4%', // Adjust as needed
  top: '2em',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  zIndex: 1,
  '@media (max-width: 1023px)': {
      display: 'none', 
  }
}));

const StyledBookmark = styled('div')(({ theme }) => ({
  //backgroundImage: `url(${bookmarkImage})`,
  backgroundColor: theme.colors.cover.spine, // Fallback color
  border: `1px solid ${theme.colors.cover.plateBorder}`,
  borderLeft: 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'left',
  backgroundRepeat: 'no-repeat',
  padding: '0.5em 1.5em 0.5em 1em',
  display: 'flex',
  justifyContent: 'center',
  margin: '0.5em 0',
  position: 'relative', 
  borderRadius: '0 4px 4px 0',
  transition: 'transform 0.2s ease-in-out', 
  '&:hover': {
    transform: 'translateX(-10px)',
    zIndex: 3, 
  },
}));

const JournalBookmark = ({ pages }) => {
  const bookmarkedPages = pages.filter((page) => page.isBookmark);
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