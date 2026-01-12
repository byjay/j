import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { GameLogic } from './GameLogic';
import { Balloon3D } from './Balloon3D';
import { GunModel } from './GunModel';
import './3D_ISO_Styles.css';

const App: React.FC = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [gameState, setGameState] = useState(GameLogic.getInitialState());
    const [inputValue, setInputValue] = useState('');
    const [isShooting, setIsShooting] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const startGame = () => {
        setIsStarted(true);
        setGameState(GameLogic.getInitialState());
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleInput = (val: string) => {
        setInputValue(val);
        const newState = GameLogic.processInput(gameState, val);

        if (newState.hit) {
            // BANG! Shooting Logic
            setIsShooting(true);
            setTimeout(() => setIsShooting(false), 100); // Quick recoil reset

            setInputValue('');
            setGameState({ ...newState, hit: false });
        } else {
            setGameState(newState);
        }
    };

    // Keep focus
    useEffect(() => {
        if (isStarted && inputRef.current) inputRef.current.focus();
    }, [isStarted, gameState.currentTarget]);

    return (
        <div className="game-container">
            {/* Crosshair Overlay */}
            {isStarted && <div className="crosshair">+</div>}

            {/* 3D Scene Layer */}
            <div className="canvas-layer">
                <Canvas shadows dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />

                    <Suspense fallback={null}>
                        {isStarted && (
                            <>
                                <Balloon3D
                                    text={gameState.currentTarget}
                                    position={[0, 1, 0]}
                                    color="#ffeb3b"
                                />
                                <GunModel isShooting={isShooting} />
                            </>
                        )}
                    </Suspense>
                </Canvas>
            </div>

            {/* Background Layer */}
            <div className="spline-background">
                <iframe
                    src="https://my.spline.design/toonpinballjoaobaltieri-3nKY9m0Mk9NNJOrsA7VOlEpD/"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    style={{ pointerEvents: 'none' }}
                ></iframe>
            </div>

            {/* UI Layer */}
            <div className="ui-layer">
                {!isStarted ? (
                    <div className="overlay start-screen">
                        <div className="tutorial-card glass-panel">
                            <h1 className="3d-iso-text" style={{ fontSize: '3rem' }}>🔫 짱구 슈팅 게임</h1>

                            <div className="guide-box">
                                <p>1. 정답을 입력하면 <b>총이 발사</b>됩니다.</p>
                                <p>2. <b>'あ'</b>가 보이면 <b>'아'</b>를 쏘세요!</p>
                            </div>

                            <button onClick={startGame} className="start-btn pulse-anim">
                                MISSION START
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="status-bars 3d-iso-text">
                            <div className="score">SCORE: {gameState.score}</div>
                            <div className="lives">LIVES: {'❤️'.repeat(gameState.lives)}</div>
                        </div>

                        {/* FPS Style HUD */}
                        <div className="hud-input-container">
                            <div className="input-label-fps">TARGET LOCKED</div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                className="hud-input"
                                placeholder="TYPE TO SHOOT..."
                                onChange={(e) => handleInput(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </>
                )}
            </div>

            {gameState.isGameOver && (
                <div className="overlay end-screen">
                    <h1 className="3d-iso-text" style={{ color: '#ff5252' }}>MISSION FAILED</h1>
                    <h2>Score: {gameState.score}</h2>
                    <button onClick={() => setGameState(GameLogic.getInitialState())} className="glass-input retry-btn">
                        RETRY MISSION
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
