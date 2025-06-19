import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { styled } from '@mui/system';
import * as opentype from 'opentype.js';
import fontWriting from '../../assets/fonts/DancingScript-VariableFont_wght.ttf';
import './writingText.css';

const WritingContainer = styled('div')({
  position: 'relative',
  width: '100%',
  padding: '0 .3rem',
  boxSizing: 'border-box',
  color: '#333',
  fontFamily: '"Cinzel", serif',
});

const QuillCursor = styled(motion.span)({
  position: 'absolute',
  top: -18,
  left: 20,
  zIndex: 0,
 
  pointerEvents: 'none',
  originX: '0',
  originY: '100%',
  rotate: -15, 
});

const WritingText = ({ message, onFinish, repeat = false }) => {
  const [font, setFont] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pathData, setPathData] = useState([]);
  const containerRef = useRef(null);
  const textControls = useAnimation();
  const quillControls = useAnimation();

  // Create stable refs for props used in the animation loop
  const onFinishRef = useRef(onFinish);
  const repeatRef = useRef(repeat);
  useEffect(() => {
    onFinishRef.current = onFinish;
    repeatRef.current = repeat;
  }, [onFinish, repeat]);

  useEffect(() => {
    const loadFont = async () => {
      try {
        const loadedFont = await opentype.load(fontWriting);
        setFont(loadedFont);
      } catch (error) {
        console.error("Font could not be loaded:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFont();
  }, []);

  useEffect(() => {
    if (!font || !message || !containerRef.current) return;

    const fontSize = 21;
    const lineHeight = 24;
    const containerWidth = containerRef.current.clientWidth;
    const generatedPaths = [];
    
    let x = 0;
    let y = fontSize + lineHeight;
    const words = message.split(' ');

    words.forEach(word => {
      const wordLength = word.length;
      const wordWithSpace = word + ' ';
      const wordWidth = font.getAdvanceWidth(wordWithSpace, fontSize);

      if (x + wordWidth > containerWidth && x > 0) {
        x = 0;
        y += lineHeight;
      }

      for (let i = 0; i < wordWithSpace.length; i++) {
        const char = wordWithSpace[i];
        if (char === ' ') {
          x += font.getAdvanceWidth(' ', fontSize) || 10;
          continue;
        }
        const path = font.getPath(char, x, y, fontSize);
        generatedPaths.push({ 
            d: path.toPathData(2), 
            wordLength: wordLength 
        });
        const advanceWidth = font.getAdvanceWidth(char, fontSize);
        const kerning = (i < word.length) ? font.getKerningValue(char, wordWithSpace[i + 1]) : 0;
        x += advanceWidth + (kerning || 0);
      }
    });
    
    setPathData(generatedPaths);
  }, [font, message, isLoading]);

  useEffect(() => {
    if (pathData.length === 0) return;
    let isCancelled = false;

    const animateWriting = async () => {
        while (!isCancelled) {
            await textControls.set({ pathLength: 0, opacity: 1 });
            quillControls.set({ opacity: 0 });
            await quillControls.start({ opacity: 1, transition: { duration: 0.5 } });

            for (let i = 0; i < pathData.length; i++) {
                if (isCancelled) break;
                
                const pathElement = document.getElementById(`path-${i}`);
                if (!pathElement) continue;

                const currentPath = pathData[i];
                const pathLength = pathElement.getTotalLength();
                
                const speedDivisor = currentPath.wordLength <= 7 ? 7000 : 1000;
                const duration = Math.max(0.02, pathLength / speedDivisor);

                quillControls.set({
                  offsetPath: `path("${currentPath.d}")`,
                  offsetRotate: "0deg"
                });

                const textAnimation = textControls.start(custom => 
                    custom === i ? { pathLength: 1, transition: { duration, ease: 'linear' } } : {}
                );
                const quillAnimation = quillControls.start({
                    offsetDistance: "100%",
                    transition: { duration, ease: 'linear' },
                });

                await Promise.all([textAnimation, quillAnimation]);
            }
            
            if (isCancelled) break;

            await quillControls.start({ opacity: 0, transition: { duration: 0.5, delay: 0.5 } });
            
            if (repeatRef.current) {
                await new Promise(resolve => setTimeout(resolve, 3000));
            } else {
                if (onFinishRef.current) {
                    onFinishRef.current();
                }
                break; 
            }
        }
    };

    const timeoutId = setTimeout(animateWriting, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [pathData, textControls, quillControls]);

  return (
    <WritingContainer ref={containerRef}>
      {isLoading ? (
        <div style={{minHeight: '100px'}}>Loading Please Wait...</div>
      ) : (
        <svg width="100%" height="100%" style={{ overflow: 'visible', minHeight: '150px' }}>
          <g>
            {pathData.map((p, index) => (
              <motion.path
                key={index}
                id={`path-${index}`}
                d={p.d}
                fill="none"
                stroke="#333"
                strokeWidth="1.2"
                custom={index}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={textControls}
              />
            ))}
          </g>
        </svg>
      )}
      <QuillCursor className="quill-cursor" animate={quillControls}>
        🪶
      </QuillCursor>
    </WritingContainer>
  );
};

export default WritingText;
