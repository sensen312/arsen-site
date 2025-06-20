import React from 'react';
import { Paper, Typography, IconButton } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import zIndex from '@mui/material/styles/zIndex';

const StyledJournalPage = styled(Paper, {
  name: 'JournalPage',
})(({ theme, isCover }) => ({
  height: '100%',
  backgroundColor: isCover ? 'transparent' : '#f8f0e3',
  border: isCover ? 'none' : '1px solid #f8f0e3',
  boxShadow: isCover ? 'none' : 'inset 0 0 10px #987652',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: isCover ? 'center' : 'flex-start',
  width: '100%',
  fontSize: '1.3rem',
  zIndex: 2, 
}));


const StyledTypography = styled(Typography, {
  name: 'JournalPageTitle',
})(({ theme }) => ({
  borderBottom: '1px solid #bbb',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  textAlign: 'center',
  fontSize: '2rem',
}));

const ContentArea = styled('div', {
  name: 'JournalContentArea',
})(({ theme, isCover }) => ({
  flexGrow: 1,
  overflowY: 'hidden', 
  background: isCover
    ? 'none'
    : 'repeating-linear-gradient(#f8f0e3, #f8f0e3 23px, #000 24px)',
  width: '100%',
  color: theme.palette.primary.main,
  zIndex: 2,
}));

const ArrowButton = styled(IconButton, {
  name: 'ArrowButton',
})(({ theme, direction }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  backgroundColor: 'none',
  color: 'white',
  boxShadow: '2px 2px 0px 1px rgba(0, 0, 0, 0.1)',
  
  // Desktop styles
  right: direction === 'forward' ? theme.spacing(-10) : undefined,
  left: direction === 'back' ? theme.spacing(-10) : undefined,

  '&:hover': {
    backgroundColor: '#e0d7c9',
    boxShadow: '2px 2px 0px 1px rgba(0, 0, 0, 0.2)',
  },
  '& svg': {
    fontSize: '3.5rem',
  },

  // Mobile styles
  '@media (max-width: 768px)': {
    backgroundColor: 'none',
    color: 'white',
    zIndex: 5,
    right: direction === 'forward' ? theme.spacing(2) : undefined,
    left: direction === 'back' ? theme.spacing(2) : undefined,
    
    bottom: theme.spacing(-8),
    '& svg': {
        fontSize: '3rem', 
    },
  },
}));

const PageNumber = styled(Typography, {
  name: 'PageNumber',
})(({ theme }) => ({
  position: 'absolute',
  fontWeight: 'bold',
  right: theme.spacing(3),
  bottom: theme.spacing(0.9),
  color: theme.palette.primary.main,
  fontSize: '2rem',
  zIndex: 5,
}));

const JournalPage = ({
  title,
  children,
  nextPage,
  prevPage,
  isCover = false,
  pageNumber,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (pageDirection) => {
    const targetPage = pageDirection === 'next' ? nextPage : prevPage;
    if (targetPage) {
      navigate(targetPage);
    }
  };

  return (
    <StyledJournalPage isCover={isCover} className="journal-page">
      {!isCover && (
        <StyledTypography
          variant="h5"
          component="h2"
          className="journal-page-title"
        >
          {title}
        </StyledTypography>
      )}
      <ContentArea isCover={isCover} className="journal-content-area">
        {children}
      </ContentArea>
      {!isCover && pageNumber && (
        <PageNumber className="page-number">{pageNumber}</PageNumber>
      )}
      {nextPage && (
        <ArrowButton
          direction="forward"
          onClick={() => handleNavigation('next')}
          className="arrow-button-forward"
        >
          <ArrowForward />
        </ArrowButton>
      )}
      {prevPage && (
        <ArrowButton
          direction="back"
          onClick={() => handleNavigation('prev')}
          className="arrow-button-back"
        >
          <ArrowBack />
        </ArrowButton>
      )}
    </StyledJournalPage>
  );
};

export default JournalPage;
