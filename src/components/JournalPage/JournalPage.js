import React from 'react';
import { styled } from '@mui/material/styles';

const JournalPageWrapper = styled('div')(({ theme, side }) => ({
  backgroundColor: theme.colors.paper,
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.15)',
  padding: theme.page.wrapperPadding, 
  borderRadius: side === 'left' ? '8px 0 0 8px' : '0 8px 8px 0',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '1px',
    backgroundColor: theme.colors.marginLine,
    left: side === 'left' ? `calc(100% - ${theme.page.wrapperPadding})` : theme.page.wrapperPadding,
  },
}));

const PageHeader = styled('h1')(({ theme, side }) => ({
  fontFamily: theme.fonts.heading,
  color: theme.colors.ink,
  fontSize: 'clamp(1.8rem, 4vh, 2.5rem)',
  minHeight: `calc(${theme.page.lineHeight})`,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: side !== 'left' ? `calc(${theme.proportions.pageMarginLineLeft} - ${theme.page.wrapperPadding})` : '0',
  paddingRight: side === 'left' ? `calc(${theme.proportions.pageMarginLineLeft} - ${theme.page.wrapperPadding})` : '0',
}));

const PageBody = styled('div')(({ theme, side }) => ({
  flexGrow: 1,
  lineHeight: theme.page.lineHeight,
  backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent calc(${theme.page.lineHeight} - 1px), ${theme.colors.line} calc(${theme.page.lineHeight} - 1px), ${theme.colors.line} ${theme.page.lineHeight})`,
  backgroundSize: `100% ${theme.page.lineHeight}`,
  backgroundPosition: '0 -0.2em',
  paddingLeft: side !== 'left' ? `calc(${theme.proportions.pageMarginLineLeft} - ${theme.page.wrapperPadding})` : '0',
  paddingRight: side === 'left' ? `calc(${theme.proportions.pageMarginLineLeft} - ${theme.page.wrapperPadding})` : '0',
  overflowY: 'auto',
  '&::-webkit-scrollbar': { display: 'none' },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
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

const JournalPage = ({ title, children, pageNumber, side }) => {
  return (
    <JournalPageWrapper side={side}>
      <PageHeader side={side}>{title}</PageHeader>
      <PageBody side={side}>
        <PageContent>{children}</PageContent>
      </PageBody>
      {pageNumber && <PageNumber side={side}>{pageNumber}</PageNumber>}
    </JournalPageWrapper>
  );
};

export default JournalPage;
