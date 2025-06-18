import React, { useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import ProjectsPage from '../../pages/ProjectsPage';
import ResumePage from '../../pages/ResumePage';
import TableOfContentsPage from '../../pages/TableOfContentsPage';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import JournalBookmark from '../JournalBookmark/JournalBookmark';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Cinzel", serif',
  },
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#ebd469',
    },
  },
});

const StyledJournalContainer = styled(Box, {
  name: 'JournalContainer',
})(({ theme }) => ({
  // --- This is now a pure structural container ---
  height: '90vh', 
  width: `calc(80vh * (4 / 5))`,
  margin: '0 auto',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  // --- Mobile Styles ---
  '@media (max-width: 768px)': {
    width: '100vw',
    height: `calc(80vh * (4.55 / 5))`,
    margin: '2.5vh auto', 
  },
}));


const Journal = () => {
  const location = useLocation();

  const pages = useMemo(() => {
    const pageList = [
      { path: '/', component: HomePage, title: 'Home', isBookmark: true },
      {
        path: '/table-of-contents',
        component: TableOfContentsPage,
        title: 'Table of Contents',
        isBookmark: false, 
      },
      { path: '/about', component: AboutPage, title: 'About', isBookmark: true },
      {
        path: '/projects',
        component: ProjectsPage,
        title: 'Projects',
        isBookmark: true,
      },
      { path: '/resume', component: ResumePage, title: 'Resume', isBookmark: true },
    ];

    let pageNumberCounter = 1;
    const pagesWithNumbers = pageList.map((page, index) => {
      if (index >= 2) {
        return { ...page, pageNumber: pageNumberCounter++ };
      } else {
        return { ...page, pageNumber: null };
      }
    });
    return pagesWithNumbers;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StyledJournalContainer>
        <JournalBookmark pages={pages} />
        <Routes>
          {pages.map((page, index) => {
            const nextPage = pages[(index + 1) % pages.length].path;
            const prevPage = pages[(index - 1 + pages.length) % pages.length].path;

            return (
              <Route
                key={page.path}
                path={page.path}
                element={
                  <page.component
                    nextPage={nextPage}
                    prevPage={prevPage}
                    pageNumber={page.pageNumber}
                    isBookmark={page.isBookmark}
                    pages={page.path === '/table-of-contents' ? pages : undefined}
                  />
                }
              />
            );
          })}
        </Routes>
      </StyledJournalContainer>
    </ThemeProvider>
  );
};

export default Journal;