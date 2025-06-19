import React, { useState } from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import TypingText from '../components/TypingText/TypingText'; 
import WritingText from '../components/WritingText/WritingText';
import { styled } from '@mui/system';
import aboutPic from '../assets/images/aboutPic.jpg';
import SEO from '../components/SEO/SEO';

const PolaroidImage = styled('img')(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(15),
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '60%',
 
}));



const AboutPage = ({ nextPage, prevPage, pageNumber, isBookmark }) => {
    isBookmark = true;
    
    const [isTypingFinished, setIsTypingFinished] = useState(false);
    const [isWritingFinished, setIsWritingFinished] = useState(false);


    const message = "Greetings!, my name is Arsen Aldea. I am a recent Computer Science Graduate from the University of Florida. I have around 2 years of full stack internship experience under my belt, working at both FLVS and PerfectServe. My internships have allowed me to refine my skills in various programming languages, front-end technologies, and back-end systems, while also teaching me important skills in team work and communication.";

    const handleTypingFinish = () => {
        setIsTypingFinished(true);
    };
    const handleWritingFinish = () => {
        setIsWritingFinished(true);
    };
    return (
      <>
        <SEO 
            title="About Me | Arsen Aldea Site"
            description="Learn more about Arsen Aldea, a full-stack developer with experience at FLVS and PerfectServe. Discover his skills in React, .NET, and more on his personal site."
            name="Arsen Aldea"
            type="article"
        />
        <JournalPage title="About Me" nextPage={nextPage} prevPage={prevPage} isCover={false} pageNumber={pageNumber}>
          <WritingText message={message} repeat={true} onFinish={handleWritingFinish} />
          {/*<TypingText message={message} repeat={true} onFinish={handleTypingFinish} />*/}

          <PolaroidImage src={aboutPic} alt="About Arsen" />
        </JournalPage>
      </>
    );

  
};

export default AboutPage;
