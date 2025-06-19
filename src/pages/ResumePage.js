import React from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import SEO from '../components/SEO/SEO';

const ResumeContainer = styled('div')({
  lineHeight: '24px',
  width: '99%',
  height: '90%', 
  fontSize: '57%',

  '@media (min-width:600px)': {
    fontSize: '70%',
  },
  
  // Mobile-specific styles for scrolling
  '@media (max-width: 600px)': {
    overflowY: 'auto', 
    paddingRight: '10px', 

    // Custom scrollbar styling
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f8f0e3', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#987652', 
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#876541',
    },
  },
});


const FlexHeader = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
});

const ItalicText = styled('span')({
  fontStyle: 'italic',
});

const UnderlineText = styled('span')({
  textDecoration: 'underline',
});

const DownloadButton = styled(Button)({
  backgroundColor: '#d3c6b2',
  fontSize: '150%',
  color: 'black',
  '&:hover': {
      backgroundColor: '#b8a08d',
  },
  fontWeight: 'bold',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const ResumePage = ({ nextPage, prevPage, pageNumber, isBookmark }) => {
    const handleDownloadResume = () => {
        window.open('https://docs.google.com/document/d/1rNOPJBW7S7UGX_stoMxKkO7skmgWWwndHnJmOKkS7J4/export?format=pdf', '_blank');
    };

    isBookmark = true;

    return (
        <>
        <SEO 
                title="Resume | Arsen Aldea's Developer Site"
                description="View the professional resume of Arsen Aldea, a software developer with experience in full-stack development, C++, and various modern frameworks. Download the PDF from his site."
                name="Arsen Aldea"
                type="article"
            />

        <JournalPage title="Resume (Abridged)" nextPage={nextPage} prevPage={prevPage} isCover={false} pageNumber={pageNumber}>
            <ResumeContainer>
                <div style={{ textAlign: 'center' }}>
                    (561)-360-8035 || arsena0202@gmail.com || <a href="https://www.linkedin.com/in/arsenaldea/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
                
                <strong>Education:</strong>
                <FlexHeader>
                    <span><ItalicText>University of Florida</ItalicText>, Bachelor’s in Computer Science</span>
                    <ItalicText>Graduated: Fall 2024</ItalicText>
                </FlexHeader>
                <strong>Work Experience:</strong>
                <FlexHeader>
                    <span><UnderlineText>Software Developer Intern</UnderlineText>, <ItalicText>Florida Virtual School</ItalicText></span>
                    <ItalicText>June 2023 - May 2024</ItalicText>
                </FlexHeader>
                — Refactored the CSS for new Student Information System. Created the global style sheet to elimimate React UI bugs and establish UI uniformity.
                <br />
                — Contributed to backend development by documenting and maintaining CRUD APIs, utilizing .NET Core and MongoDB.
                <br />
                — Developed unit tests for Node.js CRUD API operations using Jest to achieve over 90% code coverage.
                <br />
                <FlexHeader>
                     <span><UnderlineText>Software Developer Intern</UnderlineText>, <ItalicText>PerfectServe</ItalicText></span>
                    <ItalicText>Oct 2021 - Nov 2022</ItalicText>
                </FlexHeader>
                 — Led the construction of a notification tracking API using .NET 5 to improve debugging for notification failures.
                <br />
                 — Designed and implemented dynamic front-end components using React and TypeScript.
                <br />
                 — Devised a Python script with Pandas that automated the identification of anomalies in billing data.
                <br />

                <strong>Projects:</strong>
                <br />
                <ItalicText>College Senior Project - OrigamiMaker</ItalicText>
                <br/>
                — Spearheaded the modernization of a 20-year-old codebase called Treemaker, by refactoring all the legacy code to run on modern C++ compilers.
                <br />
                — Developed a TreeModelWrapper using QT to bridge the legacy backend and the new UI.
                <br />

                <strong>Technical Skills:</strong>
                <br />
                <strong>Languages:</strong> JavaScript, TypeScript, Java, C#, C++, HTML, CSS, Python, SQL
                <br />
                <strong>Frameworks & Tools:</strong> React, Angular, VueJS, .NET, Pandas, MongoDB, Next.js, AWS S3
                <br />
                <DownloadButton onClick={handleDownloadResume}>Download Resume</DownloadButton>
            </ResumeContainer>
        </JournalPage>
        </>
    );
};

export default ResumePage;