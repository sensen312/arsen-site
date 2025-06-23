import React, { useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import ProjectsPage from '../../pages/ProjectsPage';
import ResumePage from '../../pages/ResumePage';
import TableOfContentsPage from '../../pages/TableOfContentsPage';
import ContactPage from '../../pages/ContactPage';
import { styled, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import JournalBookmark from '../JournalBookmark/JournalBookmark';
import { classicVellumTheme } from '../../styles/theme';
import GlobalStyles from '../../styles/GlobalStyles';

const JournalContainer = styled('div')({
  position: 'relative',
  perspective: '2000px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
});

const JournalBody = styled('div')(({ theme, iscover }) => ({
  position: 'relative',
  height: '90vh',
  maxWidth: '95vw',
  maxHeight: 'calc(95vw * 1.25)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'width 0.5s ease-in-out',
  transformStyle: 'preserve-3d',
  zIndex: 2,

  // Default to single-page width
  width: '72vh',

  // If it's the cover on desktop, stay as a single page width.
  // If it's NOT the cover on desktop, expand to double width.
  [theme.breakpoints.up('md')]: {
    width: iscover ? '72vh' : '144vh',
  }
}));

const DesktopNavArrow = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    color: theme.colors.paper,
    backgroundColor: 'rgba(0,0,0,0.3)',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
}));


const Journal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(classicVellumTheme.breakpoints.up('md'));
  const isCover = location.pathname === '/';

  const pages = useMemo(() => {
    const pageList = [
      { path: '/', component: HomePage, title: 'Home', isBookmark: true },
      { path: '/table-of-contents', component: TableOfContentsPage, title: 'Table of Contents', isBookmark: true },
      { path: '/about', component: AboutPage, title: 'About', isBookmark: true },
      { path: '/projects', component: ProjectsPage, title: 'Projects', isBookmark: true },
      { path: '/resume', component: ResumePage, title: 'Resume', isBookmark: true },
      { path: '/contact', component: ContactPage, title: 'Contact', isBookmark: true },
    ];
    let pageNumberCounter = 1;
    return pageList.map((page, index) => ({
      ...page,
      pageNumber: index >= 1 ? pageNumberCounter++ : null
    }));
  }, []);

  const { nextPage, prevPage } = useMemo(() => {
    const currentIndex = pages.findIndex(p => p.path === location.pathname);
    if (currentIndex === -1) return { nextPage: null, prevPage: null };
    const nextPageIndex = (currentIndex + 1) % pages.length;
    const prevPageIndex = (currentIndex - 1 + pages.length) % pages.length;
    return {
        nextPage: pages[nextPageIndex].path,
        prevPage: pages[prevPageIndex].path,
    }
  }, [location.pathname, pages]);
  
  return (
    <ThemeProvider theme={classicVellumTheme}>
      <GlobalStyles />
      <JournalContainer>
        {isDesktop && prevPage && !isCover && (
            <DesktopNavArrow onClick={() => navigate(prevPage)} style={{ left: '1vw' }}>
                <ArrowBackIosNew />
            </DesktopNavArrow>
        )}
        <JournalBody iscover={isCover ? 1 : 0}>
          <Routes>
            {pages.map((page, index) => {
              const nextPageIndex = (index + 1) % pages.length;
              const prevPageIndex = (index - 1 + pages.length) % pages.length;
              return (
                <Route
                  key={page.path}
                  path={page.path}
                  element={
                    <page.component
                      nextPage={pages[nextPageIndex].path}
                      prevPage={pages[prevPageIndex].path}
                      pageNumber={page.pageNumber}
                      isBookmark={page.isBookmark}
                      pages={page.path === '/table-of-contents' ? pages : undefined}
                    />
                  }
                />
              );
            })}
          </Routes>
          <JournalBookmark pages={pages} />
        </JournalBody>
        {isDesktop && nextPage && (
             <DesktopNavArrow onClick={() => navigate(nextPage)} style={{ right: '1vw' }}>
                <ArrowForwardIos />
            </DesktopNavArrow>
        )}
      </JournalContainer>
    </ThemeProvider>
  );
};

export default Journal;