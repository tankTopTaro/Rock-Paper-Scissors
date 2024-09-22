import bgPentagon from './assets/images/bg-pentagon.svg'
import bgTriangle from './assets/images/bg-triangle.svg'
import iconClose from './assets/images/icon-close.svg'
import iconLizard from './assets/images/icon-lizard.svg'
import iconPaper from './assets/images/icon-paper.svg'
import iconRock from './assets/images/icon-rock.svg'
import iconScissors from './assets/images/icon-scissors.svg'
import iconSpock from './assets/images/icon-spock.svg'
import imageRules from './assets/images/image-rules.svg'
import imageRulesBonus from './assets/images/image-rules-bonus.svg'
import logoBonus from './assets/images/logo-bonus.svg'
import logo from './assets/images/logo.svg'
import { useEffect, useState } from 'react'


function App() {
  /** Game States */
  const [score, setScore] = useState(0)
  const [playerHand, setPlayerHand] = useState<String | ''>('')
  const enemyOptions = ['rock', 'paper', 'scissors']

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
  const playerHandler = (hand: String) => {
    setPlayerHand(hand)
  } 

  const playGame = () => {
    const enemyAI = Math.floor(Math.random() * 3)
    const enemyHand = enemyOptions[enemyAI]

    winner(playerHand, enemyHand)
    setPlayerHand('')
  }

  const winner = (player: String, enemy: String) => {
    let count = score
    if (player === enemy) {
      console.log('Tie' + '\nplayer:' + player + '\nenemy:' + enemy)
    } else if (player == 'rock') {
      if (enemy == 'paper') {
        console.log('Enemy Wins' + '\nplayer:' + player + '\nenemy:' + enemy)
      } else {
        setScore((count) => count + 1)
        console.log('Player Wins' + '\nplayer:' + player + '\nenemy:' + enemy)
      }
    } else if (player == 'paper') {
      if (enemy == 'scissors') {
        console.log('Enemy Wins' + '\nplayer:' + player + '\nenemy:' + enemy)
      } else {
        setScore((count) => count + 1)
        console.log('Player Wins' + '\nplayer:' + player + '\nenemy:' + enemy)
      }
    } else if (player == 'scissors') {
      if (enemy == 'rock') {
        console.log('Enemy Wins' + '\nplayer:' + player + '\nenemy:' + enemy)
      } else {
        setScore((count) => count + 1)
        console.log('Player Wins' + '\nplayer:' + player + '\nenemy:' + enemy)
      }
    } else {
      console.log('Game Over')
    }
  }

  useEffect(() => {
    playGame()
  }, [playerHand])

  return (
    <>
      <div className="header">
        <img className='bg' src={logo} alt="logo" />

        <div className="score-box">
          <div className="player-score">
            <h5>PLAYER</h5>
            <span className="score">{score}</span>
          </div>
        </div>
      </div>

      <div className="play-field">
        <div className="player-choice">
          <div className='paper-wrap' onClick={() => playerHandler('paper')}>
            <img src={iconPaper} alt="paper" />
          </div>
          <div className='scissors-wrap' onClick={() => playerHandler('scissors')}>
            <img src={iconScissors} alt="scissors" />
          </div>
          <div className='rock-wrap' onClick={() => playerHandler('rock')}>
            <img src={iconRock} alt="rock" />
          </div>
        </div>
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
