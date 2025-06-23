import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const BookmarkContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: '5em', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  zIndex: 1, 
  pointerEvents: 'none', 

  [theme.breakpoints.down('md')]: {
      display: 'none',
  }
}));

const StyledBookmark = styled('div')(({ theme }) => ({
  backgroundColor: '#8B0000', 
  border: `1px solid ${theme.colors.cover.spine}`,
  borderRight: 'none',
  padding: '0.5em 1.5em 0.5em 1em',
  display: 'flex',
  justifyContent: 'center',
  margin: '0.5em 0',
  position: 'relative', 
  borderRadius: '4px 0 0 4px',
  boxShadow: '-2px 2px 5px rgba(0,0,0,0.3)',
  pointerEvents: 'auto', 
  
  transform: 'translateX(calc(100% - 30px))', 
  transition: 'transform 0.3s ease-in-out', 

  '&:hover': {
    transform: 'translateX(0)',
  },
}));

const JournalBookmark = ({ pages }) => {
  const bookmarkedPages = pages.filter((page) => page.isBookmark);
  return (
    <BookmarkContainer>
      {bookmarkedPages.map((page, index) => (
        <Link key={index} to={page.path} style={{ textDecoration: 'none' }}>
          <StyledBookmark>
            <Typography variant="body2" sx={(theme) => ({
                color: theme.colors.paper,
                fontWeight: 'bold',
                fontFamily: theme.fonts.heading,
                whiteSpace: 'nowrap',
              })}>
              {page.title}
            </Typography>
          </StyledBookmark>
        </Link>
      ))}
    </BookmarkContainer>
  );
};
export default JournalBookmark;
