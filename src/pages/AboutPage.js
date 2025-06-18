import React, { useState } from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import TypingText from '../components/TypingText/TypingText'; // Assuming the path is correct
import { styled } from '@mui/system';
import aboutPic from '../assets/images/aboutPic.jpg';


const PolaroidImage = styled('img')(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(7),
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '50%',
 
}));



const AboutPage = ({ nextPage, prevPage, pageNumber, isBookmark }) => {
    isBookmark = true;
    
    const [isTypingFinished, setIsTypingFinished] = useState(false);

    const message = " My name is Arsen Aldea. I am a computer science student at the University of Florida, pursuing a Bachelor's degree in Liberal Arts and Sciences. I have around 2 years of full stack internship experience under my belt, working at both FLVS and PerfectServe. My internships have allowed me to refine my skills in various programming languages, front-end technologies, and back-end systems, while also teaching me important skills in team work and communication.";

    const handleTypingFinish = () => {
        setIsTypingFinished(true);
    };


    return (
      <JournalPage title="About Me" nextPage={nextPage} prevPage={prevPage} isCover={false} pageNumber={pageNumber}>
        <TypingText message={message} repeat={true} onFinish={handleTypingFinish} />
        <PolaroidImage src={aboutPic} alt="About Arsen" />
      </JournalPage>
    );
    
};

export default AboutPage;
