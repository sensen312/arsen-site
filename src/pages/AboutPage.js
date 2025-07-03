import React, { useState } from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import SEO from '../components/SEO/SEO';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import aboutPic from '../assets/images/aboutPic.jpg';
import WritingText from '../components/WritingText/WritingText';
import TypingText from '../components/TypingText/TypingText';

const PageSpreadContainer = styled('div')({
    display: 'flex',
    width: '100%',
    height: '100%',
    boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
});

const DesktopPolaroidImage = styled('img')(({ theme }) => ({
    display: 'block',
    margin: 'auto',
    maxWidth: '90%',
    maxHeight: '80vh',
    border: `15px solid ${theme.colors.paper}`,
    boxShadow: '5px 5px 15px rgba(0,0,0,0.35)',
    transform: 'rotate(2deg)',
}));

const MobilePolaroidImage = styled('img')(({ theme }) => ({
    display: 'block',
    margin: '2em auto',
    maxWidth: '60%',
    border: `10px solid ${theme.colors.paper}`,
    boxShadow: '3px 3px 10px rgba(0,0,0,0.3)',
    transform: 'rotate(-3deg)',
}));

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


const AboutPage = ({ pageNumber, isSpread }) => {
    const theme = useTheme();
    const [textEffect, setTextEffect] = useState('typing');
    const [fastForward, setFastForward] = useState(false);
    const [repeatAnimation, setRepeatAnimation] = useState(false);

    const aboutMeMessage = "Greetings! My name is Arsen Aldea. I am a recent Computer Science Graduate from the University of Florida. I have around 2 years of full stack internship experience under my belt, working at both FLVS and PerfectServe. My internships have allowed me to refine my skills in various programming languages, front-end technologies, and back-end systems, all while teaching me important skills in team work and communication.";

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

    const PageContent = (
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
                <TypingText message={aboutMeMessage} repeat={repeatAnimation} fastForward={fastForward} />
            ) : (
                <WritingText message={aboutMeMessage} repeat={repeatAnimation} fastForward={fastForward} />
            )}
        </>
    );

    return (
        <>
            <SEO
                title="About Me | Arsen Aldea Site"
                description="Learn more about Arsen Aldea, a full-stack developer with experience at FLVS and PerfectServe. Discover their skills in React, .NET, and more on their personal site."
                name="Arsen Aldea"
                type="article"
            />
            {isSpread ? (
                <PageSpreadContainer>
                    <JournalPage title="About Me" side="left" pageNumber={pageNumber}>
                        {PageContent}
                    </JournalPage>
                    <JournalPage title="" side="right" pageNumber={pageNumber ? pageNumber + 1 : null}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <DesktopPolaroidImage src={aboutPic} alt="About Arsen" />
                        </Box>
                    </JournalPage>
                </PageSpreadContainer>
            ) : (
                <JournalPage title="About Me" side="right" pageNumber={pageNumber}>
                    {PageContent}
                    <MobilePolaroidImage src={aboutPic} alt="About Arsen" />
                </JournalPage>
            )}
        </>
    );
};

export default AboutPage;