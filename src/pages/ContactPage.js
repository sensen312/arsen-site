import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import JournalPage from '../components/JournalPage/JournalPage';
import { styled } from '@mui/system';
import { Button, Typography } from '@mui/material';


const FormContainer = styled('form')({
    padding: '24px 2rem 0 2rem', 
    fontFamily: '"Cinzel", serif',
    color: '#333',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    
});

const InputRow = styled('div')({
 

});

const StyledLabel = styled('label')({
    fontFamily: '"Cinzel", serif',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '1.3rem',
    lineHeight: '24px',
    minWidth: 'auto', 
    padding: 0,
    paddingRight: '1ch',
    flexShrink: 0
});

const StyledInput = styled('input')({
    fontFamily: '"Cinzel", serif',
    color: '#333',
    fontSize: '1.3rem',
    lineHeight: '24px',
    height: '24px', 
    border: 'none',
    background: 'transparent',
    width: '100%',
    padding: 0, 
    '&:focus': {
        outline: 'none',
    },
    '::placeholder': {
        color: '#b0b0b0',
        fontStyle: 'italic',
    },
});

const StyledTextarea = styled('textarea')({
    fontFamily: '"Cinzel", serif',
    color: '#333',
    fontSize: '1.3rem',
    lineHeight: '24px',
    border: 'none',
    background: 'transparent',
    width: '100%',
    height: '50%', 
    resize: 'none',
    padding: 0,
    
    '&:focus': {
        outline: 'none',
    },
    '::placeholder': {
        color: '#b0b0b0',
        fontStyle: 'italic',
    },
});

const SubmitButton = styled(Button)(({ disabled }) => ({
    backgroundColor: disabled ? '#ccc' : '#d3c6b2',
    fontFamily: '"Cinzel", serif',
    fontSize: '1.3rem',
    color: disabled ? '#666' : 'black',
    marginTop: '24px',
    '&:hover': {
        backgroundColor: disabled ? '#ccc' : '#b8a08d',
    },
    fontWeight: 'bold',
    cursor: disabled ? 'not-allowed' : 'pointer',
}));


const ContactPage = ({ nextPage, prevPage, pageNumber }) => {
    const form = useRef();
    const [statusMessage, setStatusMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const checkLastSubmission = () => {
        const lastSubmissionTime = sessionStorage.getItem('lastSubmissionTime');
        if (lastSubmissionTime) {
            const timeSinceLast = Date.now() - parseInt(lastSubmissionTime, 10);
            if (timeSinceLast < 60000) { 
                return false;
            }
        }
        return true;
    };


    const sendEmail = (e) => {
        e.preventDefault();
        if (!checkLastSubmission()) {
            setStatusMessage("Please wait a minute before sending another message.");
            return;
        }
        setIsSubmitting(true);
        setStatusMessage("Sending...");
        emailjs.sendForm(
            'service_dqt6duo',
            'template_ji147u6',
            form.current,
            'zAd5WcmGlyUqv_ozv'
        ).then((result) => {
            setStatusMessage("Message sent successfully!");
            form.current.reset();
            sessionStorage.setItem('lastSubmissionTime', Date.now().toString());
            setTimeout(() => setStatusMessage(""), 5000);
        }, (error) => {
            console.log('EmailJS Error:', error.text);
            setStatusMessage("Failed to send message. Please check console for details.");
            setTimeout(() => setStatusMessage(""), 5000);
        }).finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <JournalPage title="Contact" nextPage={nextPage} prevPage={prevPage} pageNumber={pageNumber}>
            <FormContainer ref={form} onSubmit={sendEmail}>
                <InputRow>
                    <StyledLabel htmlFor="from_name">Name:</StyledLabel>
                    <StyledInput type="text" name="from_name" id="from_name" required placeholder="write here..." />
                </InputRow>
                <InputRow>
                    <StyledLabel htmlFor="contact_info">Contact Info:</StyledLabel>
                    <StyledInput type="text" name="contact_info" id="contact_info" required placeholder="write here..." />
                </InputRow>
                
               
                <InputRow>
                     <StyledLabel htmlFor="message">Message:</StyledLabel>
                </InputRow>
                <StyledTextarea name="message" id="message" required placeholder="write here..." />

                <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit Message"}
                </SubmitButton>
                {statusMessage && <Typography style={{ textAlign: 'center', marginTop: '24px', fontSize: '1.1rem' }}>{statusMessage}</Typography>}
            </FormContainer>
        </JournalPage>
    );
};

export default ContactPage;
