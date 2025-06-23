import React from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import SEO from '../components/SEO/SEO';
import { useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

const PageSpreadContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
});

const ResumeSection = styled('div')(({ theme }) => ({
    marginBottom: `calc(${theme.page.lineHeight} * 0.5)`,
    '& strong': { fontFamily: theme.fonts.heading }
}));

const FlexHeader = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
});

const ItalicText = styled('span')({ fontStyle: 'italic' });
const UnderlineText = styled('span')({ textDecoration: 'underline' });

const DownloadButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.colors.cover.plate,
    fontFamily: theme.fonts.heading,
    fontSize: '1rem',
    color: theme.colors.ink,
    '&:hover': { backgroundColor: theme.colors.cover.plateBorder },
    fontWeight: 'bold',
    display: 'block',
    margin: `${theme.page.lineHeight} auto`,
}));

const ResumePage = ({ pageNumber }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const handleDownloadResume = () => {
        window.open('https://docs.google.com/document/d/1rNOPJBW7S7UGX_stoMxKkO7skmgWWwndHnJmOKkS7J4/export?format=pdf', '_blank');
    };

    const content1 = (
        <>
            <ResumeSection style={{ textAlign: 'center' }}>
                (561)-360-8035 || arsena0202@gmail.com || <a href="https://www.linkedin.com/in/arsenaldea/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </ResumeSection>
            <ResumeSection>
                <strong>Education:</strong>
                <FlexHeader>
                    <span><ItalicText>University of Florida</ItalicText>, Bachelor’s in Computer Science</span>
                    <ItalicText>Graduated: Fall 2024</ItalicText>
                </FlexHeader>
            </ResumeSection>
            <ResumeSection>
                <strong>Work Experience:</strong>
                <FlexHeader>
                    <span><UnderlineText>Software Developer Intern</UnderlineText>, <ItalicText>Florida Virtual School</ItalicText></span>
                    <ItalicText>June 2023 - May 2024</ItalicText>
                </FlexHeader>
                — Refactored the CSS for new Student Information System. Created the global style sheet to elimimate React UI bugs and establish UI uniformity.
                <br />
                — Contributed to backend development by documenting and maintaining CRUD APIs, utilizing .NET Core and MongoDB.
            </ResumeSection>
        </>
    );

    const content2 = (
        <>
           <ResumeSection>
                 — Developed unit tests for Node.js CRUD API operations using Jest to achieve over 90% code coverage.
            </ResumeSection>
            <ResumeSection>
                <FlexHeader>
                    <span><UnderlineText>Software Developer Intern</UnderlineText>, <ItalicText>PerfectServe</ItalicText></span>
                    <ItalicText>Oct 2021 - Nov 2022</ItalicText>
                </FlexHeader>
                — Led the construction of a notification tracking API using .NET 5 to improve debugging for notification failures.
                <br />
                — Designed and implemented dynamic front-end components using React and TypeScript.
            </ResumeSection>
            <ResumeSection>
                <strong>Projects:</strong>
                <br />
                <ItalicText>College Senior Project - OrigamiMaker</ItalicText>
                <br/>
                — Spearheaded the modernization of a 20-year-old codebase called Treemaker, by refactoring all the legacy code to run on modern C++ compilers.
            </ResumeSection>
             <DownloadButton onClick={handleDownloadResume}>Download Resume</DownloadButton>
        </>
    );

    return (
        <>
            <SEO
                title="Resume | Arsen Aldea's Developer Site"
                description="View the professional resume of Arsen Aldea, a software developer with experience in full-stack development, C++, and various modern frameworks. Download the PDF from his site."
                name="Arsen Aldea"
                type="article"
            />
            {isDesktop ? (
                <PageSpreadContainer>
                    <JournalPage title="Resume" side="left" pageNumber={pageNumber}>
                        {content1}
                    </JournalPage>
                    <JournalPage title="Continued" side="right" pageNumber={pageNumber ? pageNumber + 1 : null}>
                        {content2}
                    </JournalPage>
                </PageSpreadContainer>
            ) : (
                <JournalPage title="Resume" side="right" pageNumber={pageNumber}>
                    {content1}<br />{content2}
                </JournalPage>
            )}
        </>
    );
};
export default ResumePage;
