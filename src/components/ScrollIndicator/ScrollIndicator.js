import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import './scrollIndicator.css';

// A base component for styles shared between both arrows
const ArrowContainerBase = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: '2em',
  zIndex: 10,
  color: theme.colors.ink,
  padding: '12px',
  '@media (min-width: 1024px)': {
    display: 'none',
  },
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
}));

const LeftArrowContainer = styled(ArrowContainerBase)({
  left: '-3%',
  transform: 'translateX(-50%)',
});

const RightArrowContainer = styled(ArrowContainerBase)({
  right: '-3%',
  transform: 'translateX(50%)',
});

const StyledSVG = styled('svg')(({ theme }) => ({
    width: '40px',
    height: '40px',
    filter: 'url(#hand-drawn-filter-arrow)',
}));

const ArrowIcon = (
    <StyledSVG viewBox="0 0 100 100">
        <defs>
            <filter id="hand-drawn-filter-arrow">
                <feTurbulence type="fractalNoise" baseFrequency="0.1 0.1" numOctaves="1" result="turbulence" />
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </defs>
        <path
            d="M 30,50 L 50,70 L 70,50"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            stroke="currentColor"
        />
        <path
            d="M 50,20 V 70"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            stroke="currentColor"
        />
    </StyledSVG>
);

const ScrollIndicator = ({ onClick }) => {
  return (
    <>
      <LeftArrowContainer onClick={onClick} className="bouncing-arrow" aria-label="scroll down">
        {ArrowIcon}
      </LeftArrowContainer>
      <RightArrowContainer onClick={onClick} className="bouncing-arrow" aria-label="scroll down">
        {ArrowIcon}
      </RightArrowContainer>
    </>
  );
};

export default ScrollIndicator;