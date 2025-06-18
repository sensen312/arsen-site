import React from 'react';
import JournalPage from '../components/JournalPage/JournalPage';
import { styled } from '@mui/system';
import { Button, Link } from '@mui/material';

import Typography from '@mui/material/Typography';

// Styled components keep for now
const CenteredText = styled('div')(({ theme }) => ({
    textAlign: 'center',
}));

const ItalicText = styled('span')(({ theme }) => ({
    fontStyle: 'italic',
}));

const BoldItalicText = styled('span')(({ theme }) => ({
    fontWeight: 'bold',
    fontStyle: 'italic',
}));

const List = styled('ul')(({ theme }) => ({
    
}));

const ListItem = styled('li')(({ theme }) => ({

}));


const StyledIframe = styled('iframe')(({ theme }) => ({
    width: '100%', 
    height: '90%', 
    border: 'none', 
    overflow: 'hidden',
    zoom: '0.527',
    display: 'block', 
    marginLeft: 'auto',
    marginRight: 'auto'
}));

const DownloadButton = styled(Button)({
    backgroundColor: '#d3c6b2',
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
        window.open('https://docs.google.com/document/d/14Jjt8768EaA7ryL3q5vRt-kEWKaVtQD0wqObrcEGafg/pub', '_blank');
    };


    isBookmark = true;

    
    return (
        <JournalPage title="Resume" nextPage={nextPage} prevPage={prevPage} isCover={false} pageNumber={pageNumber}>
       
                <StyledIframe
                    src="https://docs.google.com/document/d/14Jjt8768EaA7ryL3q5vRt-kEWKaVtQD0wqObrcEGafg/pub?embedded=true"
                    title="Resume"
                />
           
            <DownloadButton onClick={handleDownloadResume}>Download Resume</DownloadButton>
        </JournalPage>
    );
};

export default ResumePage;