import { createTheme } from '@mui/material/styles';

const themeValues = {
  name: 'Classic Vellum',
  colors: {
    paper: '#f9f5ef',
    ink: '#3a312a',
    line: '#e8e0d4',
    marginLine: 'rgba(200, 100, 100, 0.4)',
    cover: {
      base: '#6d4c41',
      spine: '#4e342e',
      plate: '#f1e9dc',
      plateBorder: '#c1b2a2',
      title: '#3e2723',
      subtitle: '#5d4037',
      embossShadow: 'rgba(0, 0, 0, 0.25)',
      embossHighlight: 'rgba(255, 255, 255, 0.15)',
      embossBeige: '#c1b2a2',
    },
  },
  fonts: {
    heading: "'Merriweather', serif",
    body: "'Lora', serif",
    script: "'Dancing Script', cursive",
  },
  page: {
    lineHeight: '1.6em',
    fontSize: 'clamp(16px, 1.8vh, 18px)',
    wrapperPadding: '2.5rem', 
  },
  proportions: {
    spineWidth: '10%',
    pageMarginLineLeft: '10%',
    pageContentPaddingLeft: '10%',
  },
};

export const classicVellumTheme = createTheme(themeValues);