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
    paddingTop: theme.spacing(4.4),
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
    margin: '20% auto', // Center the button horizontally
    padding: theme.spacing(1, 2), // Add padding for better spacing
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
    cursor: 'pointer', 
    touchAction: 'manipulation' ,
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



const MineSweeperEscape = () => {
const theme = useTheme();
const navigate = useNavigate();
const gridSize = 8;
const minePercentage = 0.2;
const initialLives = 3;
const LEADERBOARD_KEY = 'minesweeper_scores'; // Using a specific key for local storage

const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
const [exitPosition, setExitPosition] = useState({ x: 0, y: 0 });
const [mines, setMines] = useState([]);
const [lives, setLives] = useState(initialLives);
const [timer, setTimer] = useState(0); // Timer now tracks centiseconds
const [gameState, setGameState] = useState('idle'); // idle, playing, gameOver
const [leaderboard, setLeaderboard] = useState([]); // Single source of truth for scores
const [explode, setExplode] = useState(false);
const [showBomb, setShowBomb] = useState(false);


// Timer effect - runs every 10ms for hundredths of a second
useEffect(() => {
    let interval = null;
    if (gameState === 'playing') {
        interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 10); // Update every 10ms for centiseconds
    }
    return () => clearInterval(interval);
}, [gameState]);


// Effect to handle game over logic (saving score, loading leaderboard)
useEffect(() => {
    if (gameState === 'gameOver') {
        // If player won (has lives left), save the score.
        if (lives > 0) {
             saveScore(timer);
        } else {
             // If player lost, just load the leaderboard without saving a new score.
            const savedScores = JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
            setLeaderboard(savedScores);
        }
    }
}, [gameState]); // This effect runs only when the game state changes to 'gameOver'


const startGame = () => {
    setGameState('playing');
    setTimer(0);
    setLives(initialLives);
    setLeaderboard([]);

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
    const savedScores = JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
    const newScores = [...savedScores, score];
    // Sort scores in ascending order (lower time is better)
    newScores.sort((a, b) => a - b);
    // Keep only the top 5 scores
    const topScores = newScores.slice(0, 5);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(topScores));
    // Update the state to reflect the change immediately on the game over screen
    setLeaderboard(topScores);
};

const movePlayer = useCallback((direction) => {
    if (gameState !== 'playing') return;

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
            return;
    }

    const newPosition = { x: newX, y: newY };
    
    // Check for exit collision - WIN CONDITION
    if (newPosition.x === exitPosition.x && newPosition.y === exitPosition.y) {
        setPlayerPosition(newPosition);
        setGameState('gameOver'); // Just set the state, the useEffect will handle saving
        return;
    }

    // Check for mine collision
    const mineIndex = mines.findIndex(
        (mine) => mine.x === newPosition.x && mine.y === newPosition.y
    );

    if (mineIndex !== -1) {
        setShowBomb(true);
        setMines(mines.filter((_, index) => index !== mineIndex));

        setTimeout(() => {
            setExplode(true);
            setTimeout(() => setExplode(false), 100);
            setShowBomb(false);
        }, 200); 
        
        setLives((prevLives) => {
            const updatedLives = prevLives - 1;
            // LOSS CONDITION
            if (updatedLives <= 0) {
                setGameState('gameOver'); // Game over, but don't save score on loss
            }
            return updatedLives;
        });
    }
    
    setPlayerPosition(newPosition);
}, [gameState, playerPosition, mines, gridSize]);

const handleCellClick = (x, y) => {
    if (gameState !== 'playing') return;

    const diffX = x - playerPosition.x;
    const diffY = y - playerPosition.y;

    if (Math.abs(diffX) + Math.abs(diffY) === 1) {
        if (diffX === 1) movePlayer('right');
        else if (diffX === -1) movePlayer('left');
        else if (diffY === 1) movePlayer('down');
        else if (diffY === -1) movePlayer('up');
    }
};

const handleKeyPress = useCallback((event) => {
    if (gameState !== 'playing') return;
    switch (event.key) {
        case 'w': case 'ArrowUp': movePlayer('up'); break;
        case 'a': case 'ArrowLeft': movePlayer('left'); break;
        case 's': case 'ArrowDown': movePlayer('down'); break;
        case 'd': case 'ArrowRight': movePlayer('right'); break;
        default: break;
    }
}, [gameState, movePlayer]);


useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
}, [handleKeyPress]);

// Helper function to format time
const formatTime = (timeInCentiseconds) => {
    return (timeInCentiseconds / 100).toFixed(2);
};

const renderCellContent = (x, y) => {
    if (playerPosition.x === x && playerPosition.y === y) {
        if (showBomb) return '💣';
        if (explode) return '💥';
        return '😊';
    }
    if (exitPosition.x === x && exitPosition.y === y) {
        return '🚩';
    }
    return '.';
};

const renderHealthBar = () => {
    return Array(lives).fill('♥').join(' ');
};

const renderGrid = () => {
    return Array.from({ length: gridSize }, (_, y) => (
        <GridRow key={y}>
            {Array.from({ length: gridSize }, (_, x) => (
                <GridCell
                    key={`${x}-${y}`}
                    onClick={() => handleCellClick(x, y)}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        handleCellClick(x, y);
                    }}
                >
                    {renderCellContent(x, y)}
                </GridCell>
            ))}
        </GridRow>
    ));
};

const renderTopScores = () => {
    if (leaderboard.length === 0) {
        return <Typography sx={{fontFamily: '"Cinzel", serif', color: '#333', textAlign: 'center'}}>No scores yet. Be the first!</Typography>;
    }

    return (
        <ol style={{ fontFamily: '"Cinzel", serif', color: '#333', paddingLeft: '40px' }}>
            {leaderboard.map((score, index) => (
                <li key={index} style={{lineHeight: '24px'}}>{formatTime(score)} seconds</li>
            ))}
        </ol>
    );
};

const renderGameScreen = () => {
    if (gameState === 'playing') {
        return (
            <>
                <StyledGameInfoRow>
                    <Typography>Timer: {formatTime(timer)}s</Typography>
                </StyledGameInfoRow>
                <StyledGameInfoRow>
                    <Typography>Lives: {renderHealthBar()}</Typography>
                </StyledGameInfoRow>
                <GridContainer>{renderGrid()}</GridContainer>
            </>
        );
    } else if (gameState === 'gameOver') {
        const bestScore = leaderboard.length > 0 ? formatTime(leaderboard[0]) : 'N/A';
        return (
            <>
                <StyledGameInfoRow>
                    <StyledScoreTypography variant="h5">
                        {lives <= 0 ? 'Defeat!' : 'Victory!'}
                    </StyledScoreTypography>
                    {lives > 0 && <StyledScoreTypography>Your score: {formatTime(timer)}s</StyledScoreTypography>}
                    <StyledScoreTypography>Best time: {bestScore}{bestScore !== 'N/A' && 's'}</StyledScoreTypography>
                </StyledGameInfoRow>
                <StyledScoreTypography variant="h6">Top 5 Times:</StyledScoreTypography>
                {renderTopScores()}
                <StyledButton variant="contained" onClick={startGame}>
                    {lives <= 0 ? 'Try Again' : 'Play Again'}
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
