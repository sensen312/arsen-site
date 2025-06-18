// JournalBookmark.js

import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import bookmarkImage from '../../assets/images/Bookmark.png';

const BookmarkContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: 'calc(2vw - 5vh)',
  top: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  justifyContent: 'left',
  zIndex: 1,
}));

const StyledBookmark = styled('div')(({ theme, color }) => ({
  backgroundImage: `url(${bookmarkImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'left',
  backgroundRepeat: 'no-repeat',
  padding: theme.spacing(0.5),
  display: 'flex',
  justifyContent: 'center',
  width: `calc(100% + 10vh)`,
  margin: theme.spacing(1),
  zIndex: 2,
  '&:hover': {
    transform: 'translateX(10px)',
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
          onClick={() => console.log(`Navigating to ${page.title}: ${page.path}`)}
        >
          <StyledBookmark aria-label={page.title}>
            <Typography
              variant="body2"
              style={{
                color: '#ebd469',
                fontWeight: 'bold',
                fontFamily: '"Permanent Marker", cursive',
              }}
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
