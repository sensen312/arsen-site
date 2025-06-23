import React from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import SEO from '../components/SEO/SEO';
import MineSweeperEscape from '../components/MineSweeperEscape/MineSweeperEscape';
import { useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import WritingText from '../components/WritingText/WritingText';

const PageSpreadContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
});

const ProjectsPage = ({ nextPage, prevPage, pageNumber }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const content1 = (
        <WritingText
            message="Project page in progress but try playing Minesweeper Escape! Move with WASD or arrows and try and avoid bombs using the hints. Flag tiles using double click or the toggle."
            repeat={true}
        />
    );
    
    const content2 = (
        <>
            <WritingText
                message="The maze always has a solution so keep trying! Your best times are saved locally for each difficulty."
                repeat={true}
            />
            <MineSweeperEscape />
        </>
    );

    return (
        <>
            <SEO
                title="Projects | Arsen Aldea's Portfolio Site"
                description="Explore the projects of Arsen Aldea on his personal portfolio site, including an interactive Minesweeper Escape game built with React."
                name="Arsen Aldea"
                type="article"
            />
            {isDesktop ? (
                <PageSpreadContainer>
                    <JournalPage title="Projects" side="left" pageNumber={pageNumber}>
                        {content1}
                    </JournalPage>
                    <JournalPage title="Minesweeper" side="right" pageNumber={pageNumber ? pageNumber + 1 : null}>
                        {content2}
                    </JournalPage>
                </PageSpreadContainer>
            ) : (
                <JournalPage title="Projects" side="right" pageNumber={pageNumber} showNav={true} nextPage={nextPage} prevPage={prevPage}>
                    {content1}
                    {content2}
                </JournalPage>
            )}
        </>
    );
};

export default ProjectsPage;
