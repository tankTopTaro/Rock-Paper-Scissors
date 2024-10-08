import bgTriangle from './assets/images/bg-triangle.svg'
import iconPaper from './assets/images/icon-paper.svg'
import iconRock from './assets/images/icon-rock.svg'
import iconScissors from './assets/images/icon-scissors.svg'
import imageRules from './assets/images/image-rules.svg'
import logo from './assets/images/logo.svg'
import { useEffect, useState } from 'react'
import Game from './Game'

const options = [
  { hand: 'paper', img: iconPaper },
  { hand: 'scissors', img: iconScissors },
  { hand: 'rock', img: iconRock },
]

function App() {
  /** Game States */
  const [score, setScore] = useState(0)
  const [playerHand, setPlayerHand] = useState<String | ''>('')
  const [enemyHand, setEnemyHand] = useState<String | ''>('')
  const [winText, setWinText] = useState<String | ''>('')
  const [isPlayerWinner, setIsPlayerWinner] = useState(false)
  const [isEnemyWinner, setIsEnemyWinner] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Modal Active State
  const [isActive, setIsActive] = useState(false)   

  // Modal Controllers
  const modalOpen = () => {
    setIsActive(true)
  }

  const activeClassName = isActive ? 'active' : ''

  const modalClose = () => {
    setIsActive(false)
  }

  /** Game Controllers */
  const resetGame = () => {
    setPlayerHand('')
    setEnemyHand('')
    setWinText('')
    setIsPlaying(false)
    setIsPlayerWinner(false)
    setIsEnemyWinner(false)
    document.querySelectorAll('.move-to-hand').forEach(el => {
      el.classList.remove('move-to-hand')
    })
  }

  const playerHandler = (hand: String) => {
    setPlayerHand(hand)
    setIsPlaying(true)
  } 

  const enemyAI = () => {
    const randomId = Math.floor(Math.random() * 3)
    return options[randomId].hand
  }

  const playGame = () => {
    const enemy = enemyAI()
    if (playerHand !== '') {
      setEnemyHand(enemy)
      
      const timer = setTimeout(() => {
        winner(playerHand, enemy)
      }, 700)

      return () => clearTimeout(timer)
    } else {
      return null
    }
  }

  const winner = (player: string | String, enemy: string) => {
    if (player === enemy) {
      setWinText('TIE')
      console.log(`Player TIE: ${player}, Enemy TIE: ${enemy}`)
    } else if (
      (player === 'rock' && enemy === 'scissors') ||
      (player === 'paper' && enemy === 'rock') ||
      (player === 'scissors' && enemy === 'paper')
    ) {
      console.log(`Player WIN: ${player}, Enemy LOSE: ${enemy}`)
      setWinText('YOU WIN')
      setIsPlayerWinner(true)
      setIsEnemyWinner(false)
      setScore(score + 1)
    } else {
      setWinText('YOU LOSE')
      setIsPlayerWinner(false)
      setIsEnemyWinner(true)
      setScore(score - 1)
      if (score === 0) {
        setScore(0)
      }
      console.log(`Player LOSE: ${player}, Enemy: ${enemy} WIN: `)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      playGame()
    }
  }, [isPlaying])

  return (
    <>
      <div className="header">
        <img className='bg' src={logo} alt="logo" />
        <div className="score-box">
          <div className="player-score">
            <h5>SCORE</h5>
            <span className="score">{score}</span>
          </div>
        </div>
      </div>

      <div className="play-field"> 
        {!isPlaying && (
          <div className='player-choice'>
            <img className='bg-triangle' src={bgTriangle} alt="" />
            {options.map((option) => (
              <div key={option.hand} className={`${option.hand}-wrap`} onClick={() => playerHandler(option.hand)}>
                <img src={option.img} alt={option.hand} />
              </div>
            ))}
          </div>
        )}
        {isPlaying && <Game options={options} playerHand={playerHand.toString()} enemyHand={enemyHand.toString()} winText={winText.toString()} isPlayerWinner={isPlayerWinner} isEnemyWinner={isEnemyWinner} resetGame={resetGame}/>}
      </div>

      <button className="rules-btn" onClick={modalOpen}>RULES</button>

      <div className={`modal-overlay ${activeClassName}`}>
        <div className="modal-container">
          <div className="modal-header">
            <h1>Rules</h1>
            <span className='modal-close' onClick={modalClose}>
              <i className="fa-solid fa-xmark fa-2xl"></i>
            </span>
          </div>
          <div className="modal-body">
            <img src={imageRules} alt="rules" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
