import React, { useState, useCallback } from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import WritingText from '../components/WritingText/WritingText';
import MineSweeperEscape from '../components/MineSweeperEscape/MineSweeperEscape';
import SEO from '../components/SEO/SEO';
import { styled } from '@mui/system';

const ProjectsContentContainer = styled('div')({
  width: '100%',
  
  '@media (max-width: 600px)': {
    overflowY: 'auto', 
    paddingRight: '10px', 
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#F8F0E3', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#F8F0E3', 
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#F8F0E3',
    },
  },
});

const ProjectsPage = ({ nextPage, prevPage, pageNumber, isBookmark }) => {
    const [isWritingFinished, setIsWritingFinished] = useState(false);

    const message = `Project page in progress but try playing Minesweeper Escape! Move up down left and right and try and avoid bombs using the hints. Flag tiles using double click or the toggle; you cannot move on flagged tiles. The maze always has a solution so keep trying!`;

    const handleWritingFinish = useCallback(() => {
        setIsWritingFinished(true);
    }, []);

    isBookmark = true;

    return (
        <>
            <SEO 
                title="Projects | Arsen Aldea's Portfolio Site"
                description="Explore the projects of Arsen Aldea on his personal portfolio site, including an interactive Minesweeper Escape game built with React."
                name="Arsen Aldea"
                type="article"
            />
            <JournalPage title="Projects (under construction)" nextPage={nextPage} prevPage={prevPage} isCover={false} pageNumber={pageNumber}>
                <ProjectsContentContainer>
                    <WritingText message={message} repeat={false} onFinish={handleWritingFinish} />
                    <MineSweeperEscape />
                </ProjectsContentContainer>
            </JournalPage>
        </>
    );
};

export default ProjectsPage;