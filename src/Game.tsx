import { FC, useEffect, useState } from "react";

// Define the shape of the 'Option' object
interface Option {
    hand: string;
    img: string;  // Assuming img is a URL or image source
  }
  
  // Define the props structure for the Game component
  interface GameProps {
    options: Option[];
    playerHand: string;  // Assuming it's a string like 'rock', 'paper', or 'scissors'
    enemyHand: string;
    winText: string;
    isPlayerWinner: Boolean;
    isEnemyWinner: Boolean;
    resetGame: Function;
  }

const Game: FC<GameProps> = ({ options, playerHand, enemyHand, winText, isPlayerWinner, isEnemyWinner, resetGame }) => {
    const [showEnemyHand, setShowEnemyHand] = useState(false)
    const playerOption = options.find((option: { hand: any }) => option.hand === playerHand)
    const enemyOption = options.find((option: { hand: any }) => option.hand === enemyHand)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowEnemyHand(true)
            
            if (isPlayerWinner) {
                document.querySelector('.winner')?.classList.add('active')
            }

            if (isEnemyWinner) {
                document.querySelector('.winner')?.classList.add('active')
            }
        }, 600)

        return () => clearTimeout(timer)
    }, [enemyHand, isPlayerWinner, isEnemyWinner])

    return (
        <div className={`play-hands`}>
            <div className="player-hand">
                <h4>YOU PICKED</h4>
                {showEnemyHand ? (
                <>
                    {isPlayerWinner && (
                        <div className="winner"></div>
                    )}
                    <div className={`${playerOption?.hand}`}>
                        <img src={playerOption?.img} alt={playerOption?.hand} />
                    </div>
                </>
                ) : (
                    <div className="loading"></div>
                )}
            </div>
            {showEnemyHand && (
                <div className="game-reset">
                    <h2>{winText}</h2>
                    <button onClick={() => resetGame()}>PLAY AGAIN</button>
                </div>
            )}
            <div className="enemy-hand">
                <h4>THE HOUSE PICKED</h4>
                {showEnemyHand ? (
                <>
                    {isEnemyWinner && (
                        <div className="winner"></div>
                    )}
                    <div className={`${enemyOption?.hand}`}>
                        <img src={enemyOption?.img} alt={enemyOption?.hand} />
                    </div>
                </>
                ) : (
                    <div className="loading"></div>
                )}
            </div>
        </div>
    )
}

export default Game