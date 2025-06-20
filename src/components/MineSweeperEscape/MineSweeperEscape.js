import React, { useState, useEffect, useCallback, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Button, Typography, Switch, FormControlLabel } from '@mui/material';


const GameContainer = styled(Paper)(({ theme }) => ({
    fontFamily: '"Cinzel", serif',
    color: '#333',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    paddingTop: theme.spacing(0),
    minHeight: '450px',
}));

const ControlsWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '10px',
});

const ToggleContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const StyledButton = styled(Button)(({ theme }) => ({
    fontFamily: '"Press Start 2P", sans-serif',
    color: '#333',
    backgroundColor: '#f8f0e3',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: '2px solid #987652',
    borderRadius: '8px',
    boxShadow: '4px 4px 0px 0px rgba(152, 118, 82, 0.7)',
    textTransform: 'none',
    transition: 'transform 0.1s, box-shadow 0.1s',
    '&:hover': {
        backgroundColor: '#e0d7c9',
    },
    '&:active': {
        transform: 'translate(4px, 4px)',
        boxShadow: 'none',
    },
    margin: '5px auto',
    padding: theme.spacing(1, 1),
}));

const DifficultySelector = styled('div')({
    display: 'flex',
    justifyContent: 'center',
});

const DifficultyButton = styled(Button)(({ theme, selected }) => ({
    fontFamily: '"Press Start 2P", sans-serif',
    margin: '0 10px',
    backgroundColor: selected ? '#b8a08d' : '#f8f0e3',
    color: '#333',
    border: '2px solid #987652',
    boxShadow: selected ? 'none' : '2px 2px 0px 1px rgba(0,0,0,0.1)',
    transform: selected ? 'translate(2px, 2px)' : 'none',
    '&:hover': {
        backgroundColor: selected ? '#b8a08d' : '#e0d7c9',
    }
}));

const GridWrapper = styled('div')({
    position: 'relative',
});

const GridContainer = styled('div')(({ gridSize }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, 30px)`,
    border: '2px solid #987652',
    borderRadius: '5px',
    backgroundColor: '#c9b89c',
    padding: '1px',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
}));


const PlayerIcon = styled('div')({
    position: 'absolute',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    pointerEvents: 'none',
    transition: 'top 0.2s ease-out, left 0.2s ease-out',
    zIndex: 10,
});

const FlagOverlay = styled('span')({
    position: 'absolute',
    fontSize: '18px',
    opacity: 0.8,
    pointerEvents: 'none',
});

const GridCell = styled('div')(({ theme, cellState }) => {
    const baseStyles = {
        position: 'relative', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30px',
        height: '30px',
        color: '#333',
        fontSize: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        cursor: 'pointer',
        touchAction: 'manipulation',
        transition: 'background-color 0.3s, color 0.3s, font-size 0.3s',
        userSelect: 'none',
    };

    const stateStyles = {
        hidden: {
            backgroundColor: '#a7987f',
            boxShadow: 'inset 2px 2px 2px rgba(255,255,255,0.3), inset -2px -2px 2px rgba(0,0,0,0.3)',
            '&:hover': { backgroundColor: '#b8a990' },
        },
        path: {
            backgroundColor: '#d4cba9',
            boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.2)',
        },
        bomb: {
            backgroundColor: '#ff8a80',
            fontSize: '24px',
        },
    };

    const numberColors = {
        1: '#1976d2', 2: '#388e3c', 3: '#d32f2f', 4: '#7b1fa2',
        5: '#ffa000', 6: '#0097a7', 7: '#689f38', 8: '#d32f2f',
    };
    
    const finalStyles = { ...baseStyles, ...stateStyles[cellState.type] };
    
    if (cellState.number > 0) {
        finalStyles.color = numberColors[cellState.number];
    }
    if (cellState.type === 'bomb') {
        finalStyles.color = '#000';
    }

    return finalStyles;
});

const StyledGameInfoRow = styled('div')({
    width: '100%',
    textAlign: 'center',
    fontFamily: '"Cinzel", serif',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: 'px',
});

const StyledScoreTypography = styled(Typography)({
    fontSize: '1.3rem',
    color: '#333',
    fontFamily: '"Cinzel", serif',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '3px',
});


const generateSolvablePath = (gridSize, start, end) => {
    const visited = new Set([`${start.x},${start.y}`]);
    const stack = [{ ...start, trail: [{...start}] }];
    const directions = [ {x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0} ];
    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    while (stack.length > 0) {
        const { x, y, trail } = stack.pop();
        if (x === end.x && y === end.y) return trail;

        const shuffledDirections = shuffle([...directions]);
        for (const dir of shuffledDirections) {
            const nx = x + dir.x;
            const ny = y + dir.y;
            if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && !visited.has(`${nx},${ny}`)) {
                visited.add(`${nx},${ny}`);
                stack.push({ x: nx, y: ny, trail: [...trail, { x: nx, y: ny }] });
            }
        }
    }
    return []; 
};

const difficultySettings = {
    Easy: { size: 5, lives: 20 },
    Medium: { size: 7, lives: 10 },
    Hard: { size: 9, lives: 5 }
};


const MineSweeperEscape = () => {
    const [difficulty, setDifficulty] = useState('Easy');
    const [isFlaggingMode, setIsFlaggingMode] = useState(false);
    
    const [grid, setGrid] = useState([]);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [exitPosition, setExitPosition] = useState({ x: 0, y: 0 });
    const [lives, setLives] = useState(difficultySettings.Easy.lives);
    const [gameState, setGameState] = useState('idle');
    const [timer, setTimer] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const [explodingCell, setExplodingCell] = useState(null);
    
    // SOLUS FIX: Ref to hold a timer to distinguish single/double clicks.
    const clickTimeout = useRef(null);
    
    const startGame = useCallback((diff) => {
        const currentDifficulty = diff || difficulty;
        const settings = difficultySettings[currentDifficulty];
        const currentGridSize = settings.size;
        
        setTimer(0);
        setLives(settings.lives);
        setExplodingCell(null);
        setIsFlaggingMode(false);

        let startPos, endPos, solutionPath;
        const minDistance = 3;

        do {
            startPos = { 
                x: Math.floor(Math.random() * currentGridSize), 
                y: Math.floor(Math.random() * currentGridSize) 
            };
            endPos = { 
                x: Math.floor(Math.random() * currentGridSize), 
                y: Math.floor(Math.random() * currentGridSize) 
            };

            const distance = Math.abs(startPos.x - endPos.x) + Math.abs(startPos.y - endPos.y);

            if (distance > minDistance && (startPos.x !== endPos.x || startPos.y !== endPos.y)) {
                solutionPath = generateSolvablePath(currentGridSize, startPos, endPos);
            } else {
                solutionPath = []; 
            }

        } while (solutionPath.length === 0);

        setPlayerPosition(startPos);
        setExitPosition(endPos);

        const solutionCoords = new Set(solutionPath.map(p => `${p.x},${p.y}`));

        let newGrid = Array.from({ length: currentGridSize }, (_, y) =>
            Array.from({ length: currentGridSize }, (_, x) => ({
                x, y, isBomb: !solutionCoords.has(`${x},${y}`), 
                isRevealed: false, adjacentBombs: 0, isFlagged: false
            }))
        );
        
        for (let y = 0; y < currentGridSize; y++) {
            for (let x = 0; x < currentGridSize; x++) {
                let bombCount = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dx === 0 && dy === 0) continue;
                        const nx = x + dx, ny = y + dy;
                        if (nx >= 0 && nx < currentGridSize && ny >= 0 && ny < currentGridSize && newGrid[ny][nx].isBomb) {
                            bombCount++;
                        }
                    }
                }
                newGrid[y][x].adjacentBombs = bombCount;
            }
        }

        newGrid[startPos.y][startPos.x].isRevealed = true;
        
        setGrid(newGrid);
        setGameState('playing');
    }, [difficulty]);

    const handleDifficultyChange = (newDifficulty) => {
        if (difficulty === newDifficulty) return;
        setDifficulty(newDifficulty);
        setGameState('idle');
        setGrid([]);
        setTimer(0);
    };
    
    useEffect(() => {
        let interval = null;
        if (gameState === 'playing') {
            interval = setInterval(() => setTimer(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [gameState]);

    useEffect(() => {
        const LEADERBOARD_KEY = `minesweeper_scores_${difficulty}`;
        const isGameOver = gameState === 'gameOverWin' || gameState === 'gameOverLoss';
        if (isGameOver) {
            const scores = JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
            if (gameState === 'gameOverWin') {
                const newScores = [...scores, timer].sort((a, b) => a - b).slice(0, 5);
                localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(newScores));
                setLeaderboard(newScores);
            } else {
                setLeaderboard(scores);
            }
        }
    }, [gameState, timer, difficulty]);

    const recalculateHints = useCallback((currentGrid, clearedBomb) => {
        const gridSize = currentGrid.length;
        const gridCopy = currentGrid.map(row => row.map(cell => ({...cell})));

        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                const nx = clearedBomb.x + dx;
                const ny = clearedBomb.y + dy;

                if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                    let newBombCount = 0;
                    for (let dy2 = -1; dy2 <= 1; dy2++) {
                        for (let dx2 = -1; dx2 <= 1; dx2++) {
                            if (dx2 === 0 && dy2 === 0) continue;
                            const nnx = nx + dx2;
                            const nny = ny + dy2;
                            if (nnx >= 0 && nnx < gridSize && nny >= 0 && nny < gridSize && gridCopy[nny][nnx].isBomb) {
                                newBombCount++;
                            }
                        }
                    }
                    gridCopy[ny][nx].adjacentBombs = newBombCount;
                }
            }
        }
        return gridCopy;
    }, []);
    
    // SOLUS FIX: Function to handle the logic for moving the player.
    const executeMove = useCallback((x, y) => {
        if (gameState !== 'playing' || explodingCell || !grid[y]?.[x]) return;

        const targetCell = grid[y][x];
        const diffX = Math.abs(x - playerPosition.x);
        const diffY = Math.abs(y - playerPosition.y);
        const isValidMove = diffX + diffY === 1;

        if (!isValidMove || targetCell.isFlagged) return;

        if (targetCell.isBomb && !targetCell.isRevealed) {
            const newLives = lives - 1;
            setLives(newLives);
            setExplodingCell({x, y});
            
            setTimeout(() => {
                let gridAfterExplosion = grid.map(row => row.map(cell => 
                    (cell.x === x && cell.y === y) ? {...cell, isBomb: false, isRevealed: true} : cell
                ));
                const finalGrid = recalculateHints(gridAfterExplosion, {x, y});
                setGrid(finalGrid);
                setPlayerPosition({ x, y });
                setExplodingCell(null);
                
                if (newLives <= 0) setGameState('gameOverLoss');
            }, 400);
            return;
        }
        
        if (!targetCell.isBomb) {
             const newGrid = grid.map(row => row.map(cell => ({...cell})));
             newGrid[y][x].isRevealed = true;
             setGrid(newGrid);
             setPlayerPosition({ x, y });
             if (x === exitPosition.x && y === exitPosition.y) {
                 setGameState('gameOverWin');
             }
        }
    }, [gameState, explodingCell, grid, playerPosition, lives, recalculateHints, exitPosition]);

    // SOLUS FIX: Function to handle flagging a tile.
    const toggleFlag = (x, y) => {
         if (gameState === 'playing' && grid[y]?.[x] && !grid[y][x].isRevealed) {
            const newGrid = grid.map(row => row.map(cell => 
                (cell.x === x && cell.y === y) ? { ...cell, isFlagged: !cell.isFlagged } : cell
            ));
            setGrid(newGrid);
        }
    };

    // SOLUS FIX: A unified handler to manage click vs. double-click.
    // This is NOT memoized with useCallback to ensure it always has the latest state.
    const handleCellInteraction = (x, y) => {
        // If a timer is running, we have a double-click.
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
            clickTimeout.current = null;
            toggleFlag(x, y); // Double-click always toggles flag.
            return;
        }

        // Otherwise, it's a single click. Set a timer.
        clickTimeout.current = setTimeout(() => {
            clickTimeout.current = null;
            if (isFlaggingMode) {
                toggleFlag(x, y); // In flag mode, single-click also toggles flag.
            } else {
                executeMove(x, y); // Default action is to move.
            }
        }, 250); // 250ms window to detect a double-click.
    };

    const handleKeyPress = useCallback((event) => {
        if (gameState !== 'playing') return;
        const {x, y} = playerPosition;
        const gridSize = grid.length;
        let nextX = x, nextY = y;

        switch (event.key) {
            case 'w': case 'ArrowUp': nextY--; break;
            case 'a': case 'ArrowLeft': nextX--; break;
            case 's': case 'ArrowDown': nextY++; break;
            case 'd': case 'ArrowRight': nextX++; break;
            default: return;
        }

        if (nextX >= 0 && nextX < gridSize && nextY >= 0 && nextY < gridSize) {
             // Keyboard input is unambiguous, so it directly executes a move or flag.
            if(isFlaggingMode) {
                toggleFlag(nextX, nextY);
            } else {
                 executeMove(nextX, nextY);
            }
        }
    }, [gameState, playerPosition, grid.length, isFlaggingMode, executeMove]);
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    const getCellDisplayInfo = (cell) => {
        const { x, y, isBomb, isRevealed, adjacentBombs, isFlagged } = cell;

        const revealedCells = grid.flat().filter(c => c.isRevealed);
        const isAdjacentToPath = revealedCells.some(rc => 
            Math.abs(x - rc.x) <= 1 && Math.abs(y - rc.y) <= 1
        );
        
        let styleType = 'hidden';
        let mainContent = null;
        let overlayContent = null;

        if (explodingCell && explodingCell.x === x && explodingCell.y === y) {
            styleType = 'bomb';
            mainContent = '💥';
        } else if (gameState === 'gameOverLoss' && isBomb && !isRevealed) {
            styleType = 'bomb';
            mainContent = '💣';
        } else if (x === exitPosition.x && y === exitPosition.y) {
            styleType = 'hidden';
            mainContent = '👑';
        } else if (isRevealed) {
            styleType = 'path';
            mainContent = adjacentBombs > 0 ? adjacentBombs : '';
        } else {
            styleType = 'hidden';
            if (isAdjacentToPath && adjacentBombs > 0) {
                mainContent = adjacentBombs;
            }
            if (isFlagged) {
                overlayContent = '🚩';
            }
        }
        
        return { styleType, mainContent, overlayContent, number: adjacentBombs };
    };
    
    const renderGrid = () => {
        if (!grid || grid.length === 0) return null;
        const currentGridSize = grid.length;
        return (
            <GridWrapper>
                <GridContainer gridSize={currentGridSize}>
                    {grid.flat().map((cell, index) => {
                        const { styleType, mainContent, overlayContent, number } = getCellDisplayInfo(cell);
                        return (
                            <GridCell
                                key={index}
                                cellState={{ type: styleType, number: number }}
                                onClick={() => handleCellInteraction(cell.x, cell.y)}
                            >
                                {mainContent}
                                {overlayContent && (
                                    <FlagOverlay>{overlayContent}</FlagOverlay>
                                )}
                            </GridCell>
                        );
                    })}
                </GridContainer>
                <PlayerIcon style={{ 
                    top: `${playerPosition.y * 30 + 5}px`, 
                    left: `${playerPosition.x * 30 + 5}px`,
                }}>
                    😊
                </PlayerIcon>
            </GridWrapper>
        );
    }

    const renderTopScores = () => {
        const LEADERBOARD_KEY = `minesweeper_scores_${difficulty}`;
        const scores = JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
        if (scores.length === 0) {
            return <Typography sx={{fontFamily: '"Cinzel", serif', color: '#333', textAlign: 'center'}}>No scores yet. Be the first!</Typography>;
        }
        return (
            <ol style={{ fontFamily: '"Cinzel", serif', color: '#333', paddingLeft: '40px', listStyleType: 'decimal' }}>
                {scores.map((score, index) => (
                    <li key={index} style={{lineHeight: '24px'}}>{score} seconds</li>
                ))}
            </ol>
        );
    };

    const renderGameOverScreen = () => {
      const isWin = gameState === 'gameOverWin';
      const bestScore = leaderboard.length > 0 ? leaderboard[0] : 'N/A';
       return (
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <StyledScoreTypography variant="h5">{isWin ? 'Escape Successful!' : 'Lost in the Maze!'}</StyledScoreTypography>
                {isWin && <StyledScoreTypography>Your time: {timer}s</StyledScoreTypography>}
                <StyledScoreTypography>Best time: {bestScore}{bestScore !== 'N/A' && 's'}</StyledScoreTypography>
                <StyledScoreTypography variant="h6">Top {difficulty} Times:</StyledScoreTypography>
                {renderTopScores()}
                 <StyledButton onClick={() => startGame(difficulty)}>
                     Play Again
                 </StyledButton>
            </div>
       );
    }

    return (
        <GameContainer>
            <DifficultySelector>
                {Object.keys(difficultySettings).map(level => (
                    <DifficultyButton 
                        key={level}
                        selected={difficulty === level}
                        onClick={() => handleDifficultyChange(level)}
                    >
                        {level}
                    </DifficultyButton>
                ))}
            </DifficultySelector>
            
            {gameState === 'idle' && (
                 <StyledButton onClick={() => startGame(difficulty)}>
                    Start Game
                 </StyledButton>
            )}

            {gameState === 'playing' && grid.length > 0 && (
                <>
                    <StyledGameInfoRow>Timer: {timer}s | ❤️ Lives: {lives}</StyledGameInfoRow>
                    {renderGrid()}
                    <ControlsWrapper>
                        <ToggleContainer>
                            <FormControlLabel
                                control={<Switch checked={isFlaggingMode} onChange={() => setIsFlaggingMode(!isFlaggingMode)} color="primary" />}
                                label="🚩 Mark Mode"
                            />
                            {isFlaggingMode && <Typography variant="caption" sx={{fontFamily: '"Press Start 2P", sans-serif', fontSize: '0.6rem'}}>Click to mark tiles</Typography>}
                        </ToggleContainer>
                    </ControlsWrapper>
                </>
            )}

            {gameState.startsWith('gameOver') && renderGameOverScreen()}

        </GameContainer>
    );
};

export default MineSweeperEscape;
