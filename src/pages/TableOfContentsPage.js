// TableOfContentsPage.js
import React from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const ContentContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

const LineItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0.5),
  fontFamily: '"Cinzel", serif',
  fontSize: '1.2rem',
}));

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
      <ContentContainer>
        {pages
          .filter((page) => page.pageNumber != null)
          .map((page, index) => (
            <LineItem key={index}>
              <span>{page.title}</span>
              <span>{page.pageNumber}</span>
            </LineItem>
          ))}
      </ContentContainer>
    </JournalPage>
  );
};

export default TableOfContentsPage;
