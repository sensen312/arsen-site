import React, { useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import ProjectsPage from '../../pages/ProjectsPage';
import ResumePage from '../../pages/ResumePage';
import TableOfContentsPage from '../../pages/TableOfContentsPage';
import ContactPage from '../../pages/ContactPage';
import { styled, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
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
  height: '100vh'
});

const JournalBody = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '72vh',
  height: '90vh',
  maxWidth: '95vw',
  maxHeight: 'calc(95vw * 1.25)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 1s',
  transformStyle: 'preserve-3d',
  zIndex: 2, 
  [theme.breakpoints.up('md')]: {
    width: '144vh',
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
  
  const isHomePage = location.pathname === '/';

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
        {prevPage && (
            <DesktopNavArrow onClick={() => navigate(prevPage)} style={{ left: '1%' }}>
                <ArrowBackIosNew />
            </DesktopNavArrow>
        )}

        {isHomePage ? (
            <HomePage nextPage={pages[1].path} />
        ) : (
            <JournalBody>
                <Routes>
                    {pages.filter(p => p.path !== '/').map((page) => {
                         const currentIndex = pages.findIndex(p => p.path === page.path);
                         const nextPageIndex = (currentIndex + 1) % pages.length;
                         const prevPageIndex = (currentIndex - 1 + pages.length) % pages.length;
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
            </JournalBody>
        )}

        <JournalBookmark pages={pages} isHomePage={isHomePage} />
        
        {nextPage && (
             <DesktopNavArrow onClick={() => navigate(nextPage)} style={{ right: '1%' }}>
                 <ArrowForwardIos />
             </DesktopNavArrow>
        )}
      </JournalContainer>
    </ThemeProvider>
  );
};

export default Journal;