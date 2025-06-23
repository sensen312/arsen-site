import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import './typingText.css';

const typingConfig = {
  wordsPerMinute: 250, 
  misspellChance: 0.15,
  misspellWordLengthThreshold: 6,
  backspaceSpeedMultiplier: 0.8, 
  typingSpeedVariance: 25, 
  pauseAfterCompletion: 4000, 
};

const TypingContainer = styled('div')(({ theme }) => ({
  fontFamily: theme.fonts.body,
  color: theme.colors.ink,
  lineHeight: theme.page.lineHeight,
  fontSize: theme.page.fontSize,
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
}));

const TextWrapper = styled('div')({
    display: 'grid',
});

const InvisiblePlaceholder = styled('div')({
    visibility: 'hidden',
    whiteSpace: 'pre-wrap', 
    gridArea: '1 / 1 / 2 / 2',
});

const VisibleTextContainer = styled('div')({
    whiteSpace: 'pre-wrap', 
    gridArea: '1 / 1 / 2 / 2',
});

const HighlightedText = styled('span')(({ highlighted }) => ({
    background: highlighted ? 'rgba(30, 144, 255, 0.5)' : 'none',
    transition: 'background-color 0.25s',
}));

const TypingText = ({ message, repeat, onFinish = () => {} }) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [typingState, setTypingState] = useState('TYPING'); 
  
  const onFinishRef = useRef(onFinish);
  const repeatRef = useRef(repeat);

  const baseTypingDelay = 60000 / (typingConfig.wordsPerMinute * 6);

  useEffect(() => {
    onFinishRef.current = onFinish;
    repeatRef.current = repeat;
  }, [onFinish, repeat]);

  useEffect(() => {
    let isCancelled = false;

    const type = async (text) => {
      for (let char of text) {
        if (isCancelled) return;
        const delay = baseTypingDelay + typingConfig.typingSpeedVariance * (Math.random() - 0.5);
        await new Promise(resolve =>
          setTimeout(() => {
            setDisplayedMessage(prev => prev + char);
            resolve();
          }, Math.max(delay, 20)) 
        );
      }
    };

    const backspace = async (text) => {
        const backspaceDelay = baseTypingDelay * typingConfig.backspaceSpeedMultiplier;
        for (let i = 0; i < text.length; i++) {
            if (isCancelled) return;
            await new Promise(resolve =>
                setTimeout(() => {
                    setDisplayedMessage(prev => prev.slice(0, -1));
                    resolve();
                }, backspaceDelay)
            );
        }
    };

    const misspell = (word) => {
      if (word.length <= typingConfig.misspellWordLengthThreshold) return word;
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
      setTypingState('TYPING'); 
      const words = message.split(' ');
      for (const [index, word] of words.entries()) {
        if (isCancelled) return;
        if (word.length > typingConfig.misspellWordLengthThreshold && Math.random() < typingConfig.misspellChance) {
          const misspelledWord = misspell(word);
          await type(misspelledWord);
          await backspace(misspelledWord);
        }
        await type(word + (index < words.length - 1 ? ' ' : ''));
      }

      if (!isCancelled) {
        if (repeatRef.current) {
          setTypingState('PAUSED');
          await new Promise(resolve => setTimeout(resolve, typingConfig.pauseAfterCompletion));
          if (!isCancelled) {
            await deleteAll();
            await new Promise(resolve => setTimeout(resolve, 50));
            if (!isCancelled) animate();
          }
        } else {
          onFinishRef.current();
          setTypingState('FINISHED');
        }
      }
    };

    const startAnimation = setTimeout(() => {
        animate();
    }, 100);

    return () => {
      isCancelled = true;
      clearTimeout(startAnimation);
    };
  }, [message, baseTypingDelay]); 
  
  const shouldBlink = typingState === 'PAUSED' || typingState === 'FINISHED';

  return (
    <TypingContainer>
        <TextWrapper>
            <InvisiblePlaceholder>{message}</InvisiblePlaceholder>
            <VisibleTextContainer>
                <HighlightedText highlighted={isHighlighted}>{displayedMessage}</HighlightedText>
                <span className={shouldBlink ? "typing-text-cursor-blinking" : "typing-text-cursor-live"}>|</span>
            </VisibleTextContainer>
        </TextWrapper>
    </TypingContainer>
  );
};

export default TypingText;