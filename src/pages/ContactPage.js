import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import JournalPage from '../components/JournalPage/JournalPage';
import { styled, useTheme } from '@mui/material/styles';
import { Button, Typography, useMediaQuery } from '@mui/material';
import SEO from '../components/SEO/SEO';

const PageSpreadContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
});

const FormContainer = styled('form')(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.fonts.body,
    fontSize: theme.page.fontSize,
    lineHeight: theme.page.lineHeight,
}));

const InputRow = styled('div')({
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: '0.2em',
});

const StyledLabel = styled('label')(({ theme }) => ({
    fontFamily: theme.fonts.heading,
    fontWeight: 'bold',
    color: theme.colors.ink,
    minWidth: 'auto',
    paddingRight: '1ch',
    flexShrink: 0,
}));

const StyledInput = styled('input')(({ theme }) => ({
    fontFamily: theme.fonts.body,
    color: theme.colors.ink,
    fontSize: 'inherit',
    border: 'none',
    background: 'transparent',
    width: '100%',
    '&:focus': {
        outline: 'none',
    },
    '&::placeholder': {
        color: '#b0b0b0',
        fontStyle: 'italic',
    },
}));

const StyledTextarea = styled('textarea')(({ theme }) => ({
    fontFamily: theme.fonts.body,
    color: theme.colors.ink,
    fontSize: 'inherit',
    lineHeight: 'inherit',
    border: 'none',
    background: 'transparent',
    width: '100%',
    height: 'calc(100% - 12em)',
    resize: 'none',
    '&:focus': {
        outline: 'none',
    },
    '&::placeholder': {
        color: '#b0b0b0',
        fontStyle: 'italic',
    },
}));

const SubmitButton = styled(Button)(({ theme, disabled }) => ({
    backgroundColor: disabled ? '#ccc' : theme.colors.cover.plate,
    fontFamily: theme.fonts.heading,
    fontSize: '1rem',
    color: disabled ? '#666' : theme.colors.ink,
    marginTop: theme.page.lineHeight,
    '&:hover': {
        backgroundColor: disabled ? '#ccc' : theme.colors.cover.plateBorder,
    },
    fontWeight: 'bold',
    cursor: disabled ? 'not-allowed' : 'pointer',
}));


const ContactPage = ({ pageNumber }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
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
        emailjs.sendForm('service_dqt6duo', 'template_ji147u6', form.current, 'zAd5WcmGlyUqv_ozv')
            .then(() => {
                setStatusMessage("Message sent successfully!");
                form.current.reset();
                sessionStorage.setItem('lastSubmissionTime', Date.now().toString());
                setTimeout(() => setStatusMessage(""), 5000);
            }, (error) => {
                console.error('EmailJS Error:', error.text);
                setStatusMessage("Failed to send message.");
                setTimeout(() => setStatusMessage(""), 5000);
            }).finally(() => {
                setIsSubmitting(false);
            });
    };
    
    const formContent = (
        <FormContainer ref={form} onSubmit={sendEmail}>
            <InputRow>
                <StyledLabel htmlFor="from_name">Name:</StyledLabel>
                <StyledInput type="text" name="from_name" id="from_name" required placeholder="your name..." />
            </InputRow>
            <InputRow>
                <StyledLabel htmlFor="contact_info">Email:</StyledLabel>
                <StyledInput type="email" name="contact_info" id="contact_info" required placeholder="your email..." />
            </InputRow>
            <InputRow>
                <StyledLabel htmlFor="message">Message:</StyledLabel>
            </InputRow>
            <StyledTextarea name="message" id="message" required placeholder="your message..." />
            <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
            </SubmitButton>
            {statusMessage && <Typography style={{ textAlign: 'center', marginTop: '1em' }}>{statusMessage}</Typography>}
        </FormContainer>
    );

    return (
        <>
            <SEO
                title="Contact Arsen Aldea | Portfolio Site"
                description="Get in touch with Arsen Aldea through the contact page on his personal portfolio site. Reach out for collaboration or inquiries."
                name="Arsen Aldea"
                type="profile"
            />
            {isDesktop ? (
                <PageSpreadContainer>
                    <JournalPage title="Contact" side="left" pageNumber={pageNumber}>
                       {formContent}
                    </JournalPage>
                    <JournalPage title="Notes" side="right" pageNumber={pageNumber ? pageNumber + 1 : null}>
                       <p></p>
                    </JournalPage>
                </PageSpreadContainer>
            ) : (
                <JournalPage title="Contact" side="right" pageNumber={pageNumber}>
                    {formContent}
                </JournalPage>
            )}
        </>
    );
};

export default ContactPage;
