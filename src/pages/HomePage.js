import React from 'react';
import { styled } from '@mui/material/styles';

const JournalCoverContainer = styled('div')(({ theme }) => ({
    width: '72vh',
    height: '90vh',
    maxWidth: '95vw',
    maxHeight: 'calc(95vw * 1.25)',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
}));

const JournalCover = styled('div')(({ theme }) => ({
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.cover.base,
    borderRadius: '8px 12px 12px 8px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    padding: `15% 5% 10% calc(${theme.proportions.spineWidth} + 5%)`,
    boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.4), 8px 8px 25px rgba(0, 0, 0, 0.5)',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage:
            'linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%),' +
            'linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%),' +
            'linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.03) 75%),' +
            'linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.03) 75%)',
        backgroundSize: '2px 2px',
        opacity: 0.8,
        pointerEvents: 'none',
    },
}));

const Spine = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: theme.proportions.spineWidth,
    backgroundColor: theme.colors.cover.spine,
    boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.5)',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: '15px',
        bottom: '15px',
        right: '15px', 
        borderLeft: `2px dashed rgba(255, 255, 255, 0.1)`, 
        pointerEvents: 'none',
    }
}));

const TitlePlate = styled('div')(({ theme }) => ({
    width: '100%',
    height: 'auto',
    minHeight: '38%',
    backgroundColor: theme.colors.cover.plate,
    position: 'relative',
    borderTop: `2px solid ${theme.colors.cover.embossHighlight}`,
    borderLeft: `2px solid ${theme.colors.cover.embossHighlight}`,
    borderBottom: `2px solid ${theme.colors.cover.embossShadow}`,
    borderRight: `2px solid ${theme.colors.cover.embossShadow}`,
    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.25)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '1rem',
    borderRadius: '4px',
}));

const CoverTitle = styled('h1')(({ theme }) => ({
    fontFamily: theme.fonts.heading,
    color: theme.colors.cover.title,
    fontSize: 'clamp(1.1rem, 5.8vh, 4rem)',
    fontWeight: 650,
    margin: 0,
    textShadow: `1px 1px 0px ${theme.colors.cover.embossHighlight}`,
}));

const EmbossedSubtitle = styled('h2')(({ theme }) => ({
    fontFamily: theme.fonts.script,
    color: theme.colors.cover.embossBeige,
    fontSize: 'clamp(1rem, 5.8vh, 3.2rem)',
    fontWeight: 600,
    marginTop: '1.5rem',
    opacity: 0.9,
    textShadow: `1px 1px 1px ${theme.colors.cover.embossShadow}, -1px -1px 1px ${theme.colors.cover.embossHighlight}`,
}));

const HomePage = () => {
    return (
        <JournalCoverContainer>
            <JournalCover>
                <Spine />
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <TitlePlate>
                        <CoverTitle>Arsen's Webpages</CoverTitle>
                    </TitlePlate>
                    <EmbossedSubtitle>Journal I</EmbossedSubtitle>
                </div>
            </JournalCover>
        </JournalCoverContainer>
    );
};

export default HomePage;
