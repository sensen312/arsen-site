import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import './typingText.css';
console.log('typingText.js');
// creates a perfect match for the lined paper background
const TypingContainer = styled('div')(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  color: '#333',
  lineHeight: '24px', // This should match the lined background line height
  fontSize: '1.3rem',
  background: 'transparent', // Ensuring it doesn't block the lined paper
  border: 'none', // Remove any borders
  boxShadow: 'none', // No shadows
}));

const HighlightedText = styled('span')(({ highlighted }) => ({
    background: highlighted ? 'rgba(30, 144, 255, 0.5)' : 'none', // Light blue background to simulate highlighting
    transition: 'background-color 0.25s', // Smooth transition for the highlighting
  }));

const InvisibleText = styled('div')(({ theme }) => ({
    visibility: 'hidden', // Makes the text invisible
    height: 0, // Ensures the text takes up no space
  }));
  

  const TypingText = ({ message, repeat, onFinish }) => {

  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false); // State to control text highlighting



  const placeholderText = new Array(500).join('-'); // Adjust number based on maximum expected width

  useEffect(() => {

    console.log('typingText.js useEffect');
    let isCancelled = false;
    
    

    const type = async (text, speed = 20) => {
      for (let char of text) {
        if (!isCancelled) {
          await new Promise((resolve) =>
            setTimeout(() => {
              setDisplayedMessage((prev) => prev + char);
              resolve();
            }, speed)
          );
        }
      }
    };

    const backspace = async (text, speed = 30) => {
      for (let i = 0; i < text.length; i++) {
        if (!isCancelled) {
          await new Promise((resolve) =>
            setTimeout(() => {
              setDisplayedMessage((prev) => prev.slice(0, -1));
              resolve();
            }, speed)
          );
        }
      }
    };

    const misspell = (word) => {
      if (word.length < 3) return word;
      const index = Math.floor(Math.random() * word.length);
      const char = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      return word.slice(0, index) + char + word.slice(index + 1);
    };

    const deleteAll = async () => {
        setIsHighlighted(true); // Start highlighting the text
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second while text is highlighted
        setDisplayedMessage(''); // Clear the text after highlighting
        setIsHighlighted(false); // Remove highlighting
    };

    const animate = async () => {
      

      
        const words = message.split(' ');
        for (let word of words) {
        if (Math.random() < 0.1) {
          const misspelledWord = misspell(word);
          await type(misspelledWord, 20);
          await backspace(misspelledWord, 55);
        }
        await type(word + ' ', 20);
       

       
      }
      
      
      

      if (!isCancelled) {
        if (repeat) {
            console.log('repeat');
            await new Promise((resolve) => setTimeout(resolve, 4000)); // Timeout before repeating
            await deleteAll();
            animate(); // Restart the animation if repeat is true and not cancelled
          } else {
            console.log('onFinish');
            onFinish(); // Call the onFinish callback if repeat is false
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
      <InvisibleText>{placeholderText}</InvisibleText> {/* Invisible placeholder text */}

      <HighlightedText highlighted={isHighlighted}>{displayedMessage}</HighlightedText><span className="typing-text-cursor">|</span>    </TypingContainer>
  );
};

export default TypingText;
