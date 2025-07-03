import React, { useState } from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import SEO from '../components/SEO/SEO';
import MineSweeperEscape from '../components/MineSweeperEscape/MineSweeperEscape';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import WritingText from '../components/WritingText/WritingText';
import TypingText from '../components/TypingText/TypingText';

const PageSpreadContainer = styled('div')({
    display: 'flex',
    width: '100%',
    height: '100%',
    boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
});

const ControlsContainer = styled(Box)(({ theme }) => ({
    minHeight: theme.page.lineHeight,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: `calc(${theme.page.lineHeight})`,
}));

const DrawnToggleWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
});

const StyledSVG = styled('svg')(({ theme }) => ({
    height: `calc(${theme.page.lineHeight})`,
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
    }
}));

const FastForwardWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexBasis: '100%', 
}));

const FastForwardLabel = styled('span')(({ theme }) => ({
    fontFamily: theme.fonts.body,
    color: theme.colors.ink,
    marginRight: theme.spacing(1),
}));

const FastForwardButton = styled('button')(({ theme, active }) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    height: `calc(${theme.page.lineHeight} * 1.3)`,
    '& svg': {
        height: '100%',
        width: 'auto',
        '& path': {
            stroke: active ? theme.colors.ink : '#aaa',
            strokeWidth: '2',
            fill: 'none',
            filter: 'url(#hand-drawn-filter)',
            transition: 'stroke 0.4s ease',
        }
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
    marginTop: isDesktop ? theme.spacing(4) : theme.spacing(1),
}));

const ProjectsPage = ({ pageNumber, isSpread }) => {
    const theme = useTheme();
    const [textEffect, setTextEffect] = useState('typing');
    const [fastForward, setFastForward] = useState(false);
    const [repeatAnimation, setRepeatAnimation] = useState(false);

    const projectDescriptionMessage = "Welcome to my projects page; currently still adding to this page; In the meantime how about you play my game Minesweeper Escape!. Your avatar is stuck in mine sweeper and you have to get to the crown (with WSAD) to get out! Be careful some hidden tiles contain bombs, the numbers are hints that show you how many bombs there are around that tile. Theres always a solution here so do your best to get out!";

    const DrawnToggle = ({ onToggle, isChecked, leftLabel, rightLabel, type = "text" }) => (
        <DrawnToggleWrapper onClick={onToggle}>
            <StyledSVG>
                <defs>
                    <filter id="hand-drawn-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.1 0.1" numOctaves="1" result="turbulence" />
                        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
                <text x="0" y="15" className={`label ${type === 'text' ? 'typing-label' : ''}`} fill={!isChecked ? theme.colors.ink : '#aaa'}>{leftLabel}</text>
                <g transform="translate(80, 0)">
                    <path className="track" d="M2,10 a8,8 0 0,1 8,-8 H30 a8,8 0 0,1 8,8 v0 a8,8 0 0,1 -8,8 H10 a8,8 0 0,1 -8,-8 z" />
                    <circle className="knob" cx="10" cy="10" r="6" style={{ transform: !isChecked ? 'translateX(0px)' : 'translateX(20px)' }} />
                </g>
                <text x="135" y="15" className={`label ${type === 'text' ? 'writing-label' : ''}`} fill={isChecked ? theme.colors.ink : '#aaa'}>{rightLabel}</text>
            </StyledSVG>
        </DrawnToggleWrapper>
    );

    const LeftPageContent = (
        <>
            <ControlsContainer>
                <DrawnToggle
                    onToggle={() => setTextEffect(prev => prev === 'typing' ? 'writing' : 'typing')}
                    isChecked={textEffect === 'writing'}
                    leftLabel="Typing"
                    rightLabel="Writing"
                    type="text"
                />
                <DrawnToggle
                    onToggle={() => setRepeatAnimation(r => !r)}
                    isChecked={repeatAnimation}
                    leftLabel="Repeat Off"
                    rightLabel="Repeat On"
                />
                <FastForwardWrapper>
                    <FastForwardLabel>Fast Forward:</FastForwardLabel>
                    <FastForwardButton active={fastForward} onClick={() => setFastForward(ff => !ff)} aria-label="Fast Forward Animation">
                        <svg viewBox="0 0 24 24">
                            <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                        </svg>
                    </FastForwardButton>
                </FastForwardWrapper>
            </ControlsContainer>

            {textEffect === 'typing' ? (
                <TypingText message={projectDescriptionMessage} repeat={repeatAnimation} fastForward={fastForward} />
            ) : (
                <WritingText message={projectDescriptionMessage} repeat={repeatAnimation} fastForward={fastForward} />
            )}
        </>
    );

    const RightPageContent = (
        <RightPageContainer isDesktop={isSpread}>
            <MineSweeperEscape />
        </RightPageContainer>
    );

    return (
        <>
            <SEO
                title="Projects | Arsen Aldea's Portfolio Site"
                description="Explore the projects of Arsen Aldea on their personal portfolio site, including an interactive Minesweeper Escape game built with React."
                name="Arsen Aldea"
                type="article"
            />
            {isSpread ? (
                <PageSpreadContainer>
                    <JournalPage title="Projects" side="left" pageNumber={pageNumber}>
                        {LeftPageContent}
                    </JournalPage>
                    <JournalPage title="Minesweeper Escape" side="right" pageNumber={pageNumber ? pageNumber + 1 : null}>
                        {RightPageContent}
                    </JournalPage>
                </PageSpreadContainer>
            ) : (
                <JournalPage title="Projects" side="right" pageNumber={pageNumber}>
                    {LeftPageContent}
                    {RightPageContent}
                </JournalPage>
            )}
        </>
    );
};

export default ProjectsPage;