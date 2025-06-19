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
      background: '#f8f0e3', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#987652', 
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#876541',
    },
  },
});

const ProjectsPage = ({ nextPage, prevPage, pageNumber, isBookmark }) => {
    const [isWritingFinished, setIsWritingFinished] = useState(false);

    const message = `Hi welcome to the start of my projects page! Currently still expanding this section, but in the meantime how about you try my game: Minesweeper escape! Move up down left and right and try and avoid bombs using the hints.`;

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