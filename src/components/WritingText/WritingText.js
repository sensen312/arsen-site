import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { styled, useTheme } from '@mui/material/styles';
import * as opentype from 'opentype.js';
import fontWriting from '../../assets/fonts/DancingScript-VariableFont_wght.ttf';
import './writingText.css';

const WritingContainer = styled('div')(({ theme }) => ({
  fontFamily: theme.fonts.body,
  color: theme.colors.ink,
  lineHeight: theme.page.lineHeight,
  fontSize: theme.page.fontSize,
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
  position: 'relative', 
}));

const TextWrapper = styled('div')({
    display: 'grid',
});

const InvisiblePlaceholder = styled('div')(({ theme }) => ({
    visibility: 'hidden',
    whiteSpace: 'pre-wrap',
    gridArea: '1 / 1 / 2 / 2',
    fontFamily: theme.fonts.script,
    fontSize: `calc(${theme.page.fontSize} * 1.2)`,
    padding: '0 .3rem',
}));

const SVGOverlay = styled('div')({
    gridArea: '1 / 1 / 2 / 2',
    position: 'relative',
    width: '100%',
    height: '100%',
});

const QuillCursor = styled(motion.span)({
  position: 'absolute',
  top: -20,
  left: 23,
  zIndex: 10,
  pointerEvents: 'none',
  originX: '0',
  originY: '100%',
  rotate: -15,
});

const WritingText = ({ message, onFinish, repeat = false }) => {
  const theme = useTheme();
  const [font, setFont] = useState(null);
  const [pathData, setPathData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const placeholderRef = useRef(null);
  const textControls = useAnimation();
  const quillControls = useAnimation();

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

  useLayoutEffect(() => {
    if (!font || !message || !placeholderRef.current) return;

    const placeholder = placeholderRef.current;
    const baseFontSize = parseFloat(window.getComputedStyle(placeholder).fontSize);
    const scriptFontSize = baseFontSize; 
    const baselineOffset = (font.ascender / font.unitsPerEm) * scriptFontSize;

    const generatedPaths = [];
    let x = 0;
    let y = baselineOffset;

    const pixelLineHeight = parseFloat(window.getComputedStyle(placeholder).lineHeight);
    const containerWidth = placeholder.clientWidth;

    const words = message.split(' ');
    words.forEach(word => {
      const wordWithSpace = word + ' ';
      const wordWidth = font.getAdvanceWidth(wordWithSpace, scriptFontSize);

      if (x + wordWidth > containerWidth && x > 0) {
        x = 0;
        y += pixelLineHeight;
      }

      for (let i = 0; i < wordWithSpace.length; i++) {
        const char = wordWithSpace[i];
        if (char === ' ') {
          x += font.getAdvanceWidth(' ', scriptFontSize);
          continue;
        }
        const path = font.getPath(char, x, y, scriptFontSize);
        generatedPaths.push({ d: path.toPathData(2) });
        const advanceWidth = font.getAdvanceWidth(char, scriptFontSize);
        const kerning = (i < word.length) ? font.getKerningValue(char, wordWithSpace[i + 1]) : 0;
        x += advanceWidth + (kerning || 0);
      }
    });

    setPathData(generatedPaths);
  }, [font, message, isLoading, theme]);

  useEffect(() => {
    if (pathData.length === 0 || isLoading) return;
    let isCancelled = false;

    const animateWriting = async () => {
      while (!isCancelled) {
        await textControls.set({ pathLength: 0, fill: "transparent", opacity: 1 });
        quillControls.set({ opacity: 0 });
        await quillControls.start({ opacity: 1, transition: { duration: 0.5 } });

        for (let i = 0; i < pathData.length; i++) {
          if (isCancelled) break;
          const pathElement = document.getElementById(`path-${i}`);
          if (!pathElement) continue;

          const pathLength = pathElement.getTotalLength();
          const duration = Math.max(0.04, pathLength / 5000);

          quillControls.set({ offsetPath: `path("${pathData[i].d}")`, offsetRotate: "0deg" });

          const textAnimation = textControls.start(custom =>
            custom === i ? {
                pathLength: 1,
                fill: theme.colors.ink,
                transition: { pathLength: { duration, ease: 'linear' }, fill: { duration: 0.1, delay: duration } }
            } : {}
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
          if (onFinishRef.current) onFinishRef.current();
          break;
        }
      }
    };

    const timeoutId = setTimeout(animateWriting, 100);
    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [pathData, isLoading, textControls, quillControls, theme.colors.ink]);


  return (
    <WritingContainer>
      <TextWrapper>
        <InvisiblePlaceholder ref={placeholderRef}>
          {message}
        </InvisiblePlaceholder>
        <SVGOverlay>
          {!isLoading && pathData.length > 0 && (
            <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
              <g>
                {pathData.map((p, index) => (
                  <motion.path
                    key={index}
                    id={`path-${index}`}
                    d={p.d}
                    stroke={theme.colors.ink}
                    strokeWidth=".6"
                    custom={index}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={textControls}
                  />
                ))}
              </g>
            </svg>
          )}
        </SVGOverlay>
      </TextWrapper>
      <QuillCursor className="quill-cursor" animate={quillControls}>
        🪶
      </QuillCursor>
    </WritingContainer>
  );
};

export default WritingText;
