import React, { useState, useCallback } from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import TypingText from '../components/TypingText/TypingText';
import WritingText from '../components/WritingText/WritingText';

import MineSweeperEscape from '../components/MineSweeperEscape/MineSweeperEscape';
import SEO from '../components/SEO/SEO';


const ProjectsPage = ({ nextPage, prevPage, pageNumber, isBookmark }) => {
    const [isTypingFinished, setIsTypingFinished] = useState(false);
    const [isWritingFinished, setIsWritingFinished] = useState(false);

    const message = `Hi welcome to the start of my projects page! Currently still expanding this section, but in the meantime how about you try my game: Minesweeper escape! Move up down left and right and try and avoid bombs using the hints.`;

    const handleTypingFinish = useCallback(() => {
        setIsTypingFinished(true);
    }, []);

    const handleWritingFinish = () => {
        setIsWritingFinished(true);
    };


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
                <WritingText message={message} repeat={false} onFinish={handleWritingFinish} />
                 {/*<TypingText message={message} repeat={true} onFinish={handleTypingFinish} />*/}

                 <MineSweeperEscape />
            </JournalPage>
        </>
    );

};

export default ProjectsPage;
