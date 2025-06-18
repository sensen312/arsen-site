import React from 'react';
import { Link } from 'react-router-dom';
import JournalPage from '../components/JournalPage/JournalPage';
import { styled } from '@mui/system';

const ContentContainer = styled('div')({});

const ClickableLineItem = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  padding: theme.spacing(0, 4),
  fontFamily: '"Cinzel", serif',
  marginTop: "1px",
  lineHeight: '24px',
  fontSize: '23px',
  overflow: 'hidden',
  width: '100%',
  textDecoration: 'none',
  color: 'inherit',
  boxSizing: 'border-box', 
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const TitleSpan = styled('span')({
  flexShrink: 0,
});

const PageNumberSpan = styled('span')({
  paddingLeft: '0.5em',
  flexShrink: 0,
});

const Leader = styled('span')({
  flexGrow: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  color: '#666',
  marginLeft: '0.5em',
});

const TableOfContentsPage = ({ pages, nextPage, prevPage, pageNumber, isBookmark }) => {
  isBookmark = true;
  return (
    <JournalPage
      title="Table of Contents"
      nextPage={nextPage}
      prevPage={prevPage}
      pageNumber={pageNumber}
      isBookmark={isBookmark}
    >
      <br />
      <ContentContainer>
        {pages
          .filter((page) => page.pageNumber != null)
          .map((page, index) => (
            
            <ClickableLineItem key={index} to={page.path}>
              <TitleSpan>{page.title}</TitleSpan>
              <Leader>
                ..........................................................................................................................................................................................................................................
              </Leader>
              <PageNumberSpan>{page.pageNumber}</PageNumberSpan>
            </ClickableLineItem>
          ))}
      </ContentContainer>
    </JournalPage>
  );
};

export default TableOfContentsPage;