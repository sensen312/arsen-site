import React, { useState } from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import SEO from '../components/SEO/SEO';
import { useMediaQuery, Box } from '@mui/material';
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

const DrawnToggleWrapper = styled(Box)(({ theme }) => ({
    height: theme.page.lineHeight,
    display: 'flex',
    alignItems: 'center',
 
    cursor: 'pointer',
    userSelect: 'none',
}));

const StyledSVG = styled('svg')(({ theme }) => ({
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
    }
}));


const AboutPage = ({ nextPage, prevPage, pageNumber }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [textEffect, setTextEffect] = useState('typing');

    const aboutMeMessage = "Greetings! My name is Arsen Aldea. I am a recent Computer Science Graduate from the University of Florida. I have around 2 years of full stack internship experience under my belt, working at both FLVS and PerfectServe. My internships have allowed me to refine my skills in various programming languages, front-end technologies, and back-end systems, all while teaching me important skills in team work and communication.";

    const DrawnToggle = (
        <DrawnToggleWrapper onClick={() => setTextEffect(prev => prev === 'typing' ? 'writing' : 'typing')}>
            <StyledSVG>
                <defs>
                    <filter id="hand-drawn-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.1 0.1" numOctaves="1" result="turbulence" />
                        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
                <text x="0" y="15" className="label typing-label" fill={textEffect === 'typing' ? theme.colors.ink : '#aaa'}>Typing</text>
                <g transform="translate(80, 0)">
                    <path className="track" d="M2,10 a8,8 0 0,1 8,-8 H30 a8,8 0 0,1 8,8 v0 a8,8 0 0,1 -8,8 H10 a8,8 0 0,1 -8,-8 z" />
                    <circle className="knob" cx="10" cy="10" r="6" style={{ transform: textEffect === 'typing' ? 'translateX(0px)' : 'translateX(20px)' }}/>
                </g>
                {/* The 'writing-label' class has been added to this text element */}
                <text x="135" y="15" className="label writing-label" fill={textEffect === 'writing' ? theme.colors.ink : '#aaa'}>Writing</text>
            </StyledSVG>
        </DrawnToggleWrapper>
    );
    
    const PageContent = (
        <>
            {DrawnToggle}
            {textEffect === 'typing' ? (
                <TypingText message={aboutMeMessage} repeat={true} />
            ) : (
                <WritingText message={aboutMeMessage} repeat={true} />
            )}
        </>
    );

    return (
        <>
            <SEO
                title="About Me | Arsen Aldea Site"
                description="Learn more about Arsen Aldea, a full-stack developer with experience at FLVS and PerfectServe. Discover his skills in React, .NET, and more on his personal site."
                name="Arsen Aldea"
                type="article"
            />
            {isDesktop ? (
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
                <JournalPage title="About Me" side="right" pageNumber={pageNumber} showNav={true} nextPage={nextPage} prevPage={prevPage}>
                    {PageContent}
                    <MobilePolaroidImage src={aboutPic} alt="About Arsen" />
                </JournalPage>
            )}
        </>
    );
};

export default AboutPage;