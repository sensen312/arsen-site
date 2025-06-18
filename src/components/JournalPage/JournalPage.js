import React from 'react';
import { Paper, Typography, IconButton } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

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
  width: '90%',
  paddingLeft: '5%',
  paddingRight: '4%',
  paddingBottom: theme.spacing(6),
  zIndex: 2, 
}));


const StyledTypography = styled(Typography, {
  name: 'JournalPageTitle',
})(({ theme }) => ({
  borderBottom: '1px solid #bbb',

  color: theme.palette.primary.main,
  textAlign: 'center',
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
  right: direction === 'forward' ? theme.spacing(-10) : undefined,
  left: direction === 'back' ? theme.spacing(-10) : undefined,
  bottom: theme.spacing(2),
  backgroundColor: 'none',
  color: 'white',
  boxShadow: '2px 2px 0px 1px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#e0d7c9',
    boxShadow: '2px 2px 0px 1px rgba(0, 0, 0, 0.2)',
  },
  '& svg': {
    fontSize: '3.5rem',
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
