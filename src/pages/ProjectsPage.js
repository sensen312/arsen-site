import React, { useState } from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import SEO from '../components/SEO/SEO';
import MineSweeperEscape from '../components/MineSweeperEscape/MineSweeperEscape';
import { useMediaQuery, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import WritingText from '../components/WritingText/WritingText';
import TypingText from '../components/TypingText/TypingText';

const PageSpreadContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
});

const DrawnToggleWrapper = styled(Box)(({ theme }) => ({
    height: theme.page.lineHeight,
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.page.lineHeight,
    cursor: 'pointer',
    userSelect: 'none',
}));

const StyledSVG = styled('svg', {
    shouldForwardProp: (prop) => prop !== 'textEffect',
})(({ theme, textEffect }) => ({
    height: `calc(${theme.page.lineHeight} )`,
    width: 'auto',
    overflow: 'visible',
    '& .label': {
        fontFamily: theme.fonts.script,
        fontWeight: 'bold',
        transition: 'fill 0.4s ease',
    },
    '& .typing-label': {
        fontFamily: theme.fonts.body,
    },
    '& .writing-label': {
        fontSize: 'clamp(1.2rem, 3vh, 1.2rem)',
    },
    '& .track, & .knob': {
        stroke: theme.colors.ink,
        strokeWidth: '1.5',
        fill: 'transparent',
        filter: 'url(#hand-drawn-filter)',
    },
    '& .knob': {
        fill: theme.colors.ink,
        transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        transformOrigin: 'center center',
        transform: textEffect === 'typing' ? 'translateX(0px)' : 'translateX(20px)',
    }
}));

const RightPageContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isDesktop',
})(({ theme, isDesktop }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: isDesktop ?  theme.spacing(4) : theme.spacing(1),
}));

const ProjectsPage = ({ nextPage, prevPage, pageNumber }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [textEffect, setTextEffect] = useState('typing');

    const projectDescriptionMessage = "Welcome to my projects page; currently still adding to this page; In the meantime how about you play my game Minesweeper Escape!. Your avatar is stuck in mine sweeper and you have to get to the crown (with WSAD) to get out! Be careful some hidden tiles contain boms, the numbers are hints that show you how many bombs there are around that tile. Theres always a solution here so do your best to get out!";
    
    const DrawnToggle = (
        <DrawnToggleWrapper onClick={() => setTextEffect(prev => prev === 'typing' ? 'writing' : 'typing')}>
            <StyledSVG textEffect={textEffect}>
                <defs>
                    <filter id="hand-drawn-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.1 0.1" numOctaves="1" result="turbulence" />
                        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
                <text x="0" y="15" className="label typing-label" fill={textEffect === 'typing' ? theme.colors.ink : '#aaa'}>Typing</text>
                <g transform="translate(80, 0)">
                    <path className="track" d="M2,10 a8,8 0 0,1 8,-8 H30 a8,8 0 0,1 8,8 v0 a8,8 0 0,1 -8,8 H10 a8,8 0 0,1 -8,-8 z" />
                    <circle className="knob" cx="10" cy="10" r="6" />
                </g>
                <text x="135" y="15" className="label writing-label" fill={textEffect === 'writing' ? theme.colors.ink : '#aaa'}>Writing</text>
            </StyledSVG>
        </DrawnToggleWrapper>
    );

    const LeftPageContent = (
        <>
            {DrawnToggle}
            {textEffect === 'typing' ? (
                <TypingText message={projectDescriptionMessage} repeat={false} />
            ) : (
                <WritingText message={projectDescriptionMessage} repeat={false} />
            )}
        </>
    );
    
    const RightPageContent = (
        <RightPageContainer isDesktop={isDesktop}>
            <MineSweeperEscape />
        </RightPageContainer>
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
                        {LeftPageContent}
                    </JournalPage>
                    <JournalPage title="Minesweeper Escape" side="right" pageNumber={pageNumber ? pageNumber + 1 : null}>
                        {RightPageContent}
                    </JournalPage>
                </PageSpreadContainer>
            ) : (
              <PageSpreadContainer>
                <JournalPage title="Projects" side="right" pageNumber={pageNumber} showNav={true} nextPage={nextPage} prevPage={prevPage}>
                    {LeftPageContent}
                    {RightPageContent}
                  </JournalPage>
                </PageSpreadContainer>
            )}
        </>
    );
};

export default ProjectsPage;