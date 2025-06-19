import React, { useState, useCallback } from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import TypingText from '../components/TypingText/TypingText';
import WritingText from '../components/WritingText/WritingText';

import MineSweeperEscape from '../components/MineSweeperEscape/MineSweeperEscape';

const ProjectsPage = ({ nextPage, prevPage, pageNumber, isBookmark }) => {
    const [isTypingFinished, setIsTypingFinished] = useState(false);
    const [isWritingFinished, setIsWritingFinished] = useState(false);

    const message = `Hi welcome to the start of my projects page! Currently, I am still working on expanding this section, but in the meantime how about you try my game MineSweeperEscape. Made with React, the game is a twist on the classic game of Minesweeper. The goal is simple: escape the minefield by finding the exit. Avoid any hidden mines and try to reach the exit (The Red Flag)!`;

    const handleTypingFinish = useCallback(() => {
        setIsTypingFinished(true);
    }, []);

    const handleWritingFinish = () => {
        setIsWritingFinished(true);
    };


    isBookmark = true;

    
    return (
        <JournalPage title="Projects (under construction)" nextPage={nextPage} prevPage={prevPage} isCover={false} pageNumber={pageNumber}>
            <WritingText message={message} repeat={false} onFinish={handleWritingFinish} />

        {/*<TypingText message={message} repeat={true} onFinish={handleTypingFinish} />*/}
            {isWritingFinished ? <MineSweeperEscape /> : null}
        </JournalPage>
    );
};

export default ProjectsPage;
