import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import './typingText.css';

const TypingContainer = styled('div')(({ theme }) => ({
  fontFamily: theme.fonts.body, // Using 'Lora' from theme
  color: theme.colors.ink,
  lineHeight: theme.page.lineHeight,
  fontSize: theme.page.fontSize,
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
}));

const HighlightedText = styled('span')(({ highlighted }) => ({
    background: highlighted ? 'rgba(30, 144, 255, 0.5)' : 'none',
    transition: 'background-color 0.25s',
}));

const TypingText = ({ message, repeat, onFinish = () => {} }) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const type = async (text, speed = 20) => {
      for (let char of text) {
        if (isCancelled) return;
        await new Promise(resolve =>
          setTimeout(() => {
            setDisplayedMessage(prev => prev + char);
            resolve();
          }, speed)
        );
      }
    };

    const backspace = async (text, speed = 30) => {
      for (let i = 0; i < text.length; i++) {
        if (isCancelled) return;
        await new Promise(resolve =>
          setTimeout(() => {
            setDisplayedMessage(prev => prev.slice(0, -1));
            resolve();
          }, speed)
        );
      }
    };

    const misspell = (word) => {
      if (word.length < 3) return word;
      const index = Math.floor(Math.random() * word.length);
      const char = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      return word.slice(0, index) + char + word.slice(index + 1);
    };

    const deleteAll = async () => {
      setIsHighlighted(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      if(isCancelled) return;
      setDisplayedMessage('');
      setIsHighlighted(false);
    };

    const animate = async () => {
      const words = message.split(' ');
      for (let word of words) {
        if (isCancelled) return;
        if (Math.random() < 0.1) {
          const misspelledWord = misspell(word);
          await type(misspelledWord, 20);
          await backspace(misspelledWord, 55);
        }
        await type(word + ' ', 20);
      }

      if (!isCancelled) {
        if (repeat) {
          await new Promise(resolve => setTimeout(resolve, 4000));
          if (!isCancelled) {
            await deleteAll();
            animate();
          }
        } else {
          onFinish();
        }
      }
    };

    animate();

    return () => {
      isCancelled = true;
    };
  }, [message, repeat, onFinish]);

  return (
    <TypingContainer>
      <HighlightedText highlighted={isHighlighted}>{displayedMessage}</HighlightedText>
      <span className="typing-text-cursor">|</span>
    </TypingContainer>
  );
};

export default TypingText;
