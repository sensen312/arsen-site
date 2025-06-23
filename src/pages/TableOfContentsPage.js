import React from 'react';
import { Link } from 'react-router-dom';
import JournalPage from '../components/JournalPage/JournalPage';
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const PageSpreadContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
});

const ContentContainer = styled('div')(({theme}) => ({
    paddingTop: theme.page.lineHeight,
}));

const ClickableLineItem = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'baseline',
    fontFamily: theme.fonts.body,
    fontSize: theme.page.fontSize,
    lineHeight: theme.page.lineHeight,
    overflow: 'hidden',
    width: '100%',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
}));

const TitleSpan = styled('span')({ flexShrink: 0 });
const PageNumberSpan = styled('span')({ paddingLeft: '0.5em', flexShrink: 0 });
const Leader = styled('span')({
    flexGrow: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: '#aaa',
    marginLeft: '0.5em',
});

const TableOfContentsPage = ({ pages, nextPage, prevPage, pageNumber }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    
    const tocContent = (
        <ContentContainer>
            {pages && pages
                .filter((page) => page.isBookmark)
                .map((page, index) => (
                    <ClickableLineItem key={index} to={page.path}>
                        <TitleSpan>{page.title}</TitleSpan>
                        <Leader>....................................................................................................................................................................................</Leader>
                        <PageNumberSpan>{page.pageNumber}</PageNumberSpan>
                    </ClickableLineItem>
                ))}
        </ContentContainer>
    );

    return (
        <>
        {isDesktop ? (
            <PageSpreadContainer>
                <JournalPage title="Table of Contents" side="left" pageNumber={pageNumber}>
                    {tocContent}
                </JournalPage>
                <JournalPage title="" side="right" pageNumber={pageNumber ? pageNumber + 1 : null}>
                    {/* Blank page */}
                </JournalPage>
            </PageSpreadContainer>
        ) : (
            <JournalPage title="Table of Contents" side="right" pageNumber={pageNumber} showNav={true} nextPage={nextPage} prevPage={prevPage}>
               {tocContent}
            </JournalPage>
        )}
        </>
    );
};
export default TableOfContentsPage;