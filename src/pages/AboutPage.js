import React from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import SEO from '../components/SEO/SEO';
import { useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import aboutPic from '../assets/images/aboutPic.jpg';
import WritingText from '../components/WritingText/WritingText';

const PageSpreadContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
});

const PolaroidImage = styled('img')(({ theme }) => ({
    display: 'block',
    margin: '2em auto',
    maxWidth: '60%',
    border: `10px solid ${theme.colors.paper}`,
    boxShadow: '3px 3px 10px rgba(0,0,0,0.3)',
    transform: 'rotate(-3deg)',
}));

const AboutPage = ({ nextPage, prevPage, pageNumber }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const content1 = (
        <WritingText 
            message="Greetings!, my name is Arsen Aldea. I am a recent Computer Science Graduate from the University of Florida. I have around 2 years of full stack internship experience under my belt, working at both FLVS and PerfectServe." 
            repeat={true}
        />
    );
    
    const content2 = (
        <>
            <WritingText 
                message="My internships have allowed me to refine my skills in various programming languages, front-end technologies, and back-end systems, while also teaching me important skills in team work and communication." 
                repeat={true}
            />
            <PolaroidImage src={aboutPic} alt="About Arsen" />
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
                        {content1}
                    </JournalPage>
                    <JournalPage title="Continued" side="right" pageNumber={pageNumber ? pageNumber + 1 : null}>
                        {content2}
                    </JournalPage>
                </PageSpreadContainer>
            ) : (
                <JournalPage title="About Me" side="right" pageNumber={pageNumber} showNav={true} nextPage={nextPage} prevPage={prevPage}>
                    {content1}
                    <br/>
                    {content2}
                </JournalPage>
            )}
        </>
    );
};

export default AboutPage;
