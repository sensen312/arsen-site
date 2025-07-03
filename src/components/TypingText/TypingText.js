import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import './typingText.css';

const typingConfig = {
    wordsPerMinute: 375,
    misspellChance: 0.15,
    misspellWordLengthThreshold: 6,
    backspaceSpeedMultiplier: 0.8,
    typingSpeedVariance: 25,
    pauseAfterCompletion: 3000,
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
    backgroundColor: highlighted ? 'rgba(30, 144, 255, 0.5)' : 'transparent',
    transition: 'background-color 0.1s ease-in-out',
}));

const TypingText = ({ message, repeat, onFinish = () => {}, fastForward = false }) => {
    const [displayedMessage, setDisplayedMessage] = useState('');
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [animationState, setAnimationState] = useState('IDLE');
    const [runId, setRunId] = useState(0);

    const onFinishRef = useRef(onFinish);
    const repeatRef = useRef(repeat);
    const fastForwardRef = useRef(fastForward);
    const isMountedRef = useRef(true);
    const previousRepeat = useRef(repeat);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        onFinishRef.current = onFinish;
        repeatRef.current = repeat;
        fastForwardRef.current = fastForward;
    }, [onFinish, repeat, fastForward]);

    useEffect(() => {
        const restartWithHighlight = async () => {
            if (!isMountedRef.current) return;
            setIsHighlighted(true);
            await new Promise(resolve => setTimeout(resolve, 600));
            if (!isMountedRef.current) return;
            setRunId(id => id + 1);
        };

        if (repeat && !previousRepeat.current && animationState === 'FINISHED') {
            restartWithHighlight();
        }
        previousRepeat.current = repeat;
    }, [repeat, animationState]);

    useEffect(() => {
        let isCancelled = false;

        const getSpeedMultiplier = () => fastForwardRef.current ? 20 : 1;

        const type = async (text) => {
            for (const char of text) {
                if (!isMountedRef.current || isCancelled) return;
                const speedMultiplier = getSpeedMultiplier();
                const baseTypingDelay = 60000 / (typingConfig.wordsPerMinute * 6);
                const delay = (baseTypingDelay + typingConfig.typingSpeedVariance * (Math.random() - 0.5)) / speedMultiplier;
                await new Promise(resolve => setTimeout(resolve, delay));
                if (!isMountedRef.current || isCancelled) return;
                setDisplayedMessage(prev => prev + char);
            }
        };

        const backspace = async (text) => {
            const speedMultiplier = getSpeedMultiplier();
            const baseTypingDelay = 60000 / (typingConfig.wordsPerMinute * 6);
            const backspaceDelay = (baseTypingDelay * typingConfig.backspaceSpeedMultiplier) / speedMultiplier;
            for (let i = 0; i < text.length; i++) {
                if (!isMountedRef.current || isCancelled) return;
                await new Promise(resolve => setTimeout(resolve, backspaceDelay));
                if (!isMountedRef.current || isCancelled) return;
                setDisplayedMessage(prev => prev.slice(0, -1));
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
            await new Promise(resolve => setTimeout(resolve, 600));
            if (!isMountedRef.current || isCancelled) return;
            setIsHighlighted(false);
            await new Promise(resolve => setTimeout(resolve, 50));
            if (!isMountedRef.current || isCancelled) return;
            setDisplayedMessage('');
        };

        const animate = async () => {
            if (!isMountedRef.current) return;
            setAnimationState('TYPING');
            setIsHighlighted(false);
            setDisplayedMessage('');
            
            const words = message.split(' ');
            for (const [index, word] of words.entries()) {
                if (!isMountedRef.current || isCancelled) return;
                if (!fastForwardRef.current && word.length > typingConfig.misspellWordLengthThreshold && Math.random() < typingConfig.misspellChance) {
                    const misspelledWord = misspell(word);
                    await type(misspelledWord);
                    await new Promise(resolve => setTimeout(resolve, 300)); 
                    if (isCancelled) return;
                    await backspace(misspelledWord);
                    await type(word + (index < words.length - 1 ? ' ' : ''));
                } else {
                    await type(word + (index < words.length - 1 ? ' ' : ''));
                }
            }

            if (!isMountedRef.current || isCancelled) return;

            if (repeatRef.current) {
                setAnimationState('PAUSED');
                await new Promise(resolve => setTimeout(resolve, typingConfig.pauseAfterCompletion));
                if (!isMountedRef.current || isCancelled) return;
                await deleteAll();
                if (!isMountedRef.current || isCancelled) return;
                setRunId(id => id + 1);
            } else {
                onFinishRef.current();
                setAnimationState('FINISHED');
            }
        };

        animate();

        return () => {
            isCancelled = true;
        };
    }, [message, runId]);

    const shouldBlink = animationState === 'PAUSED' || animationState === 'FINISHED';

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
