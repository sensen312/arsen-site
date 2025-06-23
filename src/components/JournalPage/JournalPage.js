import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const JournalPageWrapper = styled('div')(({ theme, side }) => ({
  backgroundColor: theme.colors.paper,
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.15)',
  padding: '2.5em',
  borderRadius: side === 'left' ? '8px 0 0 8px' : '0 8px 8px 0',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '1px',
    backgroundColor: theme.colors.marginLine,
    left: side === 'left' ? `calc(100% - ${theme.proportions.pageMarginLineLeft})` : theme.proportions.pageMarginLineLeft,
  },
}));

const PageHeader = styled('h1')(({ theme, side }) => ({
  fontFamily: theme.fonts.heading,
  color: theme.colors.ink,
  fontSize: 'clamp(1.8rem, 4vh, 2.5rem)',
  minHeight: `calc(${theme.page.lineHeight} * 2)`,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.colors.line}`,
  marginBottom: '0.5em',
  paddingLeft: side !== 'left' ? theme.proportions.pageContentPaddingLeft : '0',
  paddingRight: side === 'left' ? theme.proportions.pageContentPaddingLeft : '0',
}));

const PageBody = styled('div')(({ theme, side }) => ({
  flexGrow: 1,
  lineHeight: theme.page.lineHeight,
  backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent calc(${theme.page.lineHeight} - 1px), ${theme.colors.line} calc(${theme.page.lineHeight} - 1px), ${theme.colors.line} ${theme.page.lineHeight})`,
  backgroundSize: `100% ${theme.page.lineHeight}`,
  backgroundPosition: '0 -0.2em',
  paddingLeft: side !== 'left' ? theme.proportions.pageContentPaddingLeft : '0',
  paddingRight: side === 'left' ? theme.proportions.pageContentPaddingLeft : '0',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none', // Invisible scrollbar
  },
  msOverflowStyle: 'none', // for IE and Edge
  scrollbarWidth: 'none', // for Firefox
}));

const PageContent = styled('div')(({ theme }) => ({
  fontFamily: theme.fonts.body,
  color: theme.colors.ink,
  fontSize: theme.page.fontSize,
  'p': { margin: 0 },
}));

const PageNumber = styled('div')(({ theme, side }) => ({
    position: 'absolute',
    bottom: '1em',
    fontFamily: theme.fonts.heading,
    color: theme.colors.ink,
    fontSize: '1rem',
    right: side !== 'left' ? '1.5em' : 'auto',
    left: side === 'left' ? '1.5em' : 'auto',
}));

const ArrowButton = styled(IconButton)(({ theme, direction }) => ({
    position: 'absolute',
    bottom: '1rem',
    color: theme.colors.cover.base,
    zIndex: 10,
    right: direction === 'forward' ? '1rem' : 'auto',
    left: direction === 'back' ? '1rem' : 'auto',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    '& svg': {
        fontSize: '3rem',
    },
}));

const JournalPage = ({ title, children, pageNumber, side, showNav, nextPage, prevPage }) => {
  const navigate = useNavigate();

  const handleNavigation = (pageDirection) => {
    const targetPage = pageDirection === 'next' ? nextPage : prevPage;
    if (targetPage) {
      navigate(targetPage);
    }
  };

  return (
    <JournalPageWrapper side={side}>
      <PageHeader side={side}>{title}</PageHeader>
      <PageBody side={side}>
        <PageContent>{children}</PageContent>
      </PageBody>
      {pageNumber && <PageNumber side={side}>{pageNumber}</PageNumber>}
      {showNav && nextPage && (
          <ArrowButton direction="forward" onClick={() => handleNavigation('next')}>
              <ArrowForward />
          </ArrowButton>
      )}
      {showNav && prevPage && (
          <ArrowButton direction="back" onClick={() => handleNavigation('prev')}>
              <ArrowBack />
          </ArrowButton>
      )}
    </JournalPageWrapper>
  );
};

export default JournalPage;