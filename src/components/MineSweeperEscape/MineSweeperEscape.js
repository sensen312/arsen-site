import React, { useState, useEffect, useCallback } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Paper, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Styled components
const GameContainer = styled(Paper)(({ theme }) => ({
    fontFamily: '"Cinzel", serif',
    color: theme.palette.text.primary,
    backgroundColor: 'transparent', // Make the background transparent
    boxShadow: 'none', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'top',
    position: 'relative',
    paddingTop: theme.spacing(.5),
}));

// not the best syntax but
const StyledButton = styled(Button)(({ theme }) => ({
    fontFamily: '"Press Start 2P", sans-serif', // Arcade-style font
    color: '#333',
    backgroundColor: '#f8f0e3', // Match the paper background color
    fontSize: '1.2rem', // Larger font size
    fontWeight: 'bold', // Bolder text
    border: '1px solid #987652',
    borderRadius: '4px',
    boxShadow: '2px 2px 0px 1px rgba(0, 0, 0, 0.1)',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#e0d7c9', // Slightly darker color for hover effect
    },
    display: 'flex',
    justifyContent: 'center', // Center text inside the button
    alignItems: 'center', // Center text inside the button
    margin: '0 auto', // Center the button horizontally
    padding: theme.spacing(1, 4), // Add padding for better spacing
}));




const GridContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'none', 
    border: '1px solid gray',
    borderRadius: '5px',
    width: 'fit-content',
    transformOrigin: 'center center',
});

const GridRow = styled('div')({
    display: 'flex',
});

const GridCell = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '23px',
    height: '23px',
    background: 'transparent', 
    border: '1.5px solid #987652', 
    color: '#333',
    fontSize: '20px',
    textAlign: 'center',
});


const StyledGameInfoRow = styled('div')(({ theme }) => ({
    width: '100%',
    textAlign: 'center',
    lineHeight: '24px', // Ensure it matches the line height
    fontFamily: '"Cinzel", serif',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const StyledScoreTypography = styled(Typography)(({ theme }) => ({
    fontSize: '1.3rem',
    color: '#333',
    fontFamily: '"Cinzel", serif',
    textAlign: 'center',
    lineHeight: '24px',
    fontWeight: 'bold',
}));




// Main component
const MineSweeperEscape = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const gridSize = 8;
    const minePercentage = 0.2;
    const initialLives = 3;

    const [grid, setGrid] = useState([]);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [exitPosition, setExitPosition] = useState({ x: 0, y: 0 });
    const [mines, setMines] = useState([]);
    const [lives, setLives] = useState(initialLives);
    const [timer, setTimer] = useState(0);
    const [gameState, setGameState] = useState('idle'); // idle, playing, gameOver
    const [scores, setScores] = useState([]);
    const [highestScore, setHighestScore] = useState(
        parseInt(localStorage.getItem('highestScore')) || 0
    );

    useEffect(() => {
        if (gameState === 'playing') {
            const interval = setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameState]);

    const startGame = () => {
        setGameState('playing');
        setTimer(0);
        setLives(initialLives);
        setScores([]);

        // Random starting position and exit position
        const randomPosition = () => ({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        });

        let startPosition = randomPosition();
        let endPosition = randomPosition();

        // Ensure starting and ending positions are not the same
        while (
            startPosition.x === endPosition.x &&
            startPosition.y === endPosition.y
        ) {
            endPosition = randomPosition();
        }

        setPlayerPosition(startPosition);
        setExitPosition(endPosition);

        // Random mines
        const mineCount = Math.floor(gridSize * gridSize * minePercentage);
        let newMines = [];

        for (let i = 0; i < mineCount; i++) {
            let minePosition = randomPosition();

            // Ensure mine is not on starting position or exit position
            while (
                (minePosition.x === startPosition.x &&
                    minePosition.y === startPosition.y) ||
                (minePosition.x === endPosition.x && minePosition.y === endPosition.y)
            ) {
                minePosition = randomPosition();
            }

            newMines.push(minePosition);
        }

        setMines(newMines);
    };

    const saveScore = (score) => {
        const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
        savedScores.push(score);
        savedScores.sort((a, b) => a - b);
        if (savedScores.length > 5) {
            savedScores.pop();
        }
        localStorage.setItem('scores', JSON.stringify(savedScores));
    };

    const movePlayer = (direction) => {
        let newX = playerPosition.x;
        let newY = playerPosition.y;

        switch (direction) {
            case 'up':
                newY = Math.max(0, newY - 1);
                break;
            case 'down':
                newY = Math.min(gridSize - 1, newY + 1);
                break;
            case 'left':
                newX = Math.max(0, newX - 1);
                break;
            case 'right':
                newX = Math.min(gridSize - 1, newX + 1);
                break;
            default:
                return; // Return early if the direction is invalid
        }

        const newPosition = { x: newX, y: newY };

        // Check for mine collision
        const mineCollision = mines.some(
            (mine) => mine.x === newPosition.x && mine.y === newPosition.y
        );

        if (mineCollision) {
            setLives((prevLives) => {
                const updatedLives = prevLives - 1;
                if (updatedLives <= 0) {
                    setGameState('gameOver');
                    // Save score and display game over screen
                }
                return updatedLives;
            });
        }

        // Check for exit collision
        if (newPosition.x === exitPosition.x && newPosition.y === exitPosition.y) {
            setGameState('gameOver');
            // Save score and display victory screen
        }

        // Update the player position if there is no collision
        setPlayerPosition(newPosition);
    };


    if (gameState === 'gameOver') {
        saveScore(timer);
    }


    const handleKeyPress = (event) => {
        if (gameState !== 'playing') return;

        switch (event.key) {
            case 'w':
                movePlayer('up');
                break;
            case 'a':
                movePlayer('left');
                break;
            case 's':
                movePlayer('down');
                break;
            case 'd':
                movePlayer('right');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameState, handleKeyPress]);

    const renderCellContent = (x, y) => {
        if (playerPosition.x === x && playerPosition.y === y) {
            return '@';
        }
        if (exitPosition.x === x && exitPosition.y === y) {
            return 'E';
        }
        return '.';
    };

    const renderHealthBar = () => {
        return Array(lives)
            .fill('♥')
            .join(' ');
    };


    const renderGrid = () => {
        const gridContent = [];

        for (let y = 0; y < gridSize; y++) {
            const row = [];
            for (let x = 0; x < gridSize; x++) {
                row.push(
                    <GridCell key={`${x}-${y}`}>
                        {renderCellContent(x, y)}
                    </GridCell>
                );
            }
            gridContent.push(<GridRow key={y}>{row}</GridRow>);
        }

        return gridContent;
    };

    const renderTopScores = () => {
        const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
        return (
            <ol>
                {savedScores.map((score, index) => (
                    <li key={index}>{score}s</li>
                ))}
            </ol>
        );
    };

    const renderGameScreen = () => {
        if (gameState === 'playing') {
            return (
                <>
                    <StyledGameInfoRow>
                        <Typography>Timer: {timer}s</Typography>
                    </StyledGameInfoRow>
                    <StyledGameInfoRow>
                        <Typography>Lives: {renderHealthBar()}</Typography>
                    </StyledGameInfoRow>
                    <GridContainer>{renderGrid()}</GridContainer>
                </>
            );
        } else if (gameState === 'gameOver') {
            return (
                <>
                    <StyledGameInfoRow>
                        <StyledScoreTypography variant="h5">
                            {lives === 0 ? 'Defeat!' : 'Victory!'}
                        </StyledScoreTypography>
                        <StyledScoreTypography>Your score: {timer}s</StyledScoreTypography>
                        <StyledScoreTypography>Highest score: {highestScore}s</StyledScoreTypography>
                    </StyledGameInfoRow>
                    <StyledScoreTypography variant="h6">Top 5 Scores:</StyledScoreTypography>
                    {renderTopScores()}
                    <StyledButton variant="contained" onClick={startGame}>
                        {lives === 0 ? 'Try Again' : 'Play Again'}
                    </StyledButton>
                </>
            );
        }
    };
    

    return (
        <div>
            {gameState === 'idle' && (
                <StyledButton variant="contained" onClick={startGame}>
                    Start Game
                </StyledButton>
            )}
            {gameState !== 'idle' && (
                <GameContainer>
                    {renderGameScreen()}
                </GameContainer>
            )}
        </div>
    );
    
};

export default MineSweeperEscape;
