import React from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import SEO from '../components/SEO/SEO';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

const PageSpreadContainer = styled('div')({
    display: 'flex',
    width: '100%',
    height: '100%',
    boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
});

const ResumeSection = styled('div')(({ theme }) => ({}));

const SectionTitle = styled('strong')(({ theme }) => ({
    fontFamily: theme.fonts.heading,
    fontSize: '1.1em',
}));

const FlexHeader = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
});

const ItalicText = styled('span')({ fontStyle: 'italic' });
const UnderlineText = styled('span')({ textDecoration: 'underline' });

const BulletPoint = styled('li')({
    position: 'relative',
    paddingBottom: 0, 
    '&::before': {
        content: '"—"',
        position: 'absolute',
        left: '-1.5em',
    },
});

const SkillsContainer = styled('div')(({ theme }) => ({}));

const SkillsCategory = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'baseline',
    lineHeight: theme.page.lineHeight,
    fontFamily: theme.fonts.body,
}));

const SkillsLabel = styled('strong')(({ theme }) => ({
    fontFamily: theme.fonts.heading,
    minWidth: '110px',
    flexShrink: 0,
}));

const DownloadButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.colors.cover.plate,
    fontFamily: theme.fonts.heading,
    fontSize: '1rem',
    color: theme.colors.ink,
    '&:hover': { backgroundColor: theme.colors.cover.plateBorder },
    fontWeight: 'bold',
    display: 'block',
}));

const ResumePage = ({ pageNumber, isSpread }) => {
    const theme = useTheme();

    const handleDownloadResume = () => {
        window.open('https://docs.google.com/document/d/1rNOPJBW7S7UGX_stoMxKkO7skmgWWwndHnJmOKkS7J4/export?format=pdf', '_blank');
    };

    const educationAndExperienceContent = (
        <>
            <ResumeSection style={{ textAlign: 'center' }}>
                (561)-360-8035 || arsena0202@gmail.com || <a href="https://www.linkedin.com/in/arsenaldea/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </ResumeSection>
            <ResumeSection>
                <SectionTitle>Education</SectionTitle>
                <FlexHeader>
                    <span><ItalicText>University of Florida</ItalicText>, Bachelor’s in Computer Science</span>
                    <ItalicText>Graduated: Fall 2024</ItalicText>
                </FlexHeader>
            </ResumeSection>
            <ResumeSection>
                <SectionTitle>Work Experience</SectionTitle>
                <FlexHeader>
                    <span><strong><UnderlineText>Software Developer Intern</UnderlineText></strong>, <ItalicText>FLVS</ItalicText>, <ItalicText>June 2023 - May 2024</ItalicText></span>
                </FlexHeader>
                <BulletPoint>Refactored the CSS for new Student Information System. Created the global style sheet to elimimate React UI bugs and establish UI uniformity.</BulletPoint>
                <BulletPoint>Contributed to backend development by documenting and maintaining CRUD APIs, utilizing .NET Core and MongoDB.</BulletPoint>
                <BulletPoint>Developed unit tests for Node.js CRUD API operations using Jest to achieve over 90% code coverage.</BulletPoint>
                <FlexHeader>
                    <span><strong><UnderlineText>Software Developer Intern</UnderlineText></strong>, <ItalicText>PerfectServe</ItalicText></span>
                    <ItalicText>Oct 2021 - Nov 2022</ItalicText>
                </FlexHeader>
                <BulletPoint>Led the construction of a notification tracking API using .NET 5 to improve debugging for notification failures.</BulletPoint>
                <BulletPoint>Engineered challenging UI components in React & TypeScript, including a custom textbox to enhance user experience.</BulletPoint>
                <BulletPoint>Automated billing data validation with a Python/Pandas script, reducing a 20-minute manual task to just 5 minutes.</BulletPoint>
            </ResumeSection>
        </>
    );

    const projectsAndSkillsContent = (
        <>
            <ResumeSection>
                <SectionTitle>Projects</SectionTitle>
                <br/>
                <strong><ItalicText>OrigamiMaker - College Senior Project</ItalicText></strong>
                <BulletPoint>Spearheaded the modernization of a 20-year-old codebase called Treemaker, by refactoring all the legacy code to run on modern C++ compilers.</BulletPoint>
                <BulletPoint>Developed a QT wrapper to bridge the legacy backend to a new UI, allowing users to "draw" tree shapes for origami models.</BulletPoint>
                <strong><ItalicText>Minecraft Diamond Pathfinder Comparison</ItalicText></strong>
                <BulletPoint>Implemented and benchmarked Dijkstra's vs. Bellman-Ford in Java for Minecraft pathfinding, analyzing over 40,000 blocks/sec of data.</BulletPoint>
                <strong><ItalicText>Compiler for PL/0</ItalicText></strong>
                <BulletPoint>Built a complete compiler with a scanner, parser, virtual machine, and intermediate code generation.</BulletPoint>
            </ResumeSection>
            <ResumeSection>
                <SectionTitle>Technical Skills</SectionTitle>
                <SkillsContainer>
                    <SkillsCategory>
                        <SkillsLabel>Languages:</SkillsLabel>
                        <span>JavaScript, TypeScript, Java, C#, C++, HTML, CSS, Python, SQL</span>
                    </SkillsCategory>
                    <SkillsCategory>
                        <SkillsLabel>Frameworks:</SkillsLabel>
                        <span>React, VueJS, Angular, .NET, Next.js, Node.js</span>
                    </SkillsCategory>
                    <SkillsCategory>
                        <SkillsLabel>Tools:</SkillsLabel>
                        <span>MongoDB, Pandas, Bootstrap, AWS S3, Jest, QT, Git</span>
                    </SkillsCategory>
                </SkillsContainer>
            </ResumeSection>
            <Box sx={{ flexGrow: 1, minHeight: '0em' }} />
            <DownloadButton onClick={handleDownloadResume}>
                Download Full Resume
            </DownloadButton>
        </>
    );

    return (
        <>
            <SEO
                title="Resume | Arsen Aldea's Developer Site"
                description="View the professional resume of Arsen Aldea, a software developer with experience in full-stack development, C++, and various modern frameworks. Download the PDF from their site."
                name="Arsen Aldea"
                type="article"
            />
            {isSpread ? (
                <PageSpreadContainer>
                    <JournalPage title="Arsen Aldea" side="left" pageNumber={pageNumber}>
                        {educationAndExperienceContent}
                    </JournalPage>
                    <JournalPage title="Software Developer" side="right" pageNumber={pageNumber ? pageNumber + 1 : null}>
                        {projectsAndSkillsContent}
                    </JournalPage>
                </PageSpreadContainer>
            ) : (
                <JournalPage title="Resume" side="right" pageNumber={pageNumber}>
                    {educationAndExperienceContent}
                    <hr style={{margin: `${theme.page.lineHeight} 0`}}/>
                    {projectsAndSkillsContent}
                </JournalPage>
            )}
        </>
    );
};

export default ResumePage;