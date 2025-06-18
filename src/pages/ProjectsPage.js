import React, { useState, useCallback } from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import TypingText from '../components/TypingText/TypingText';
import MineSweeperEscape from '../components/MineSweeperEscape/MineSweeperEscape';

const ProjectsPage = ({ nextPage, prevPage, pageNumber, isBookmark }) => {
    const [isTypingFinished, setIsTypingFinished] = useState(false);

    const message = `
        Hi welcome to the start of my projects page! 
        Currently, I am still working on expanding this section, but in the meantime how about you try my game MineSweeperEscape.
        Made with React, the game is a twist on the classic game of Minesweeper. 
        The goal is simple: escape the minefield by finding the exit. 
        Avoid any hidden mines and try to reach the exit (🚩)!
    `;

    const handleTypingFinish = useCallback(() => {
        setIsTypingFinished(true);
    }, []);

    isBookmark = true;

    
    return (
        <JournalPage title="Projects (under construction)" nextPage={nextPage} prevPage={prevPage} isCover={false} pageNumber={pageNumber}>
            <TypingText message={message} repeat={false} onFinish={handleTypingFinish} />
            {isTypingFinished ? <MineSweeperEscape /> : null}
        </JournalPage>
    );
};

export default ProjectsPage;
