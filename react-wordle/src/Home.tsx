import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import Spline from '@splinetool/react-spline'
import { StatsModal } from './components/modals/StatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import {
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
  HARD_MODE_ALERT_MESSAGE,
  DISCOURAGE_INAPP_BROWSER_TEXT,
} from './constants/strings'
import {
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  WELCOME_INFO_MODAL_MS,
  DISCOURAGE_INAPP_BROWSERS,
} from './constants/settings'
import {
  isWordInWordList,
  isWinningWord,
  findFirstUnusedReveal,
  unicodeLength,
  getCurrentSolution,
  markCurrentWordAsCompleted,
  getDailyProgress,
  getRemainingGuessesForCurrentWord,
  loadDailyState,
  incrementGuessesForCurrentWord,
} from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
} from './lib/localStorage'
import { default as GraphemeSplitter } from 'grapheme-splitter'

import './Home.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Navbar } from './components/navbar/Navbar'
import { isInAppBrowser } from './lib/browser'
import { MigrateStatsModal } from './components/modals/MigrateStatsModal'
import { WordDetailModal } from './components/modals/WordDetailModal'

function Home() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isMigrateStatsModalOpen, setIsMigrateStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isWordDetailModalOpen, setIsWordDetailModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )
  const [isRevealing, setIsRevealing] = useState(false)
  // Initialize state from daily words
  const [dailyState] = useState(() => loadDailyState())
  const [solution, setSolution] = useState(() => dailyState.words[dailyState.currentWordIndex])
  const [solutionText, setSolutionText] = useState(() => solution.text)
  useEffect(() => {
    setSolutionText(solution.text)
  }, [solution])
  const [currentWordLength, setCurrentWordLength] = useState(() => solution.length)
  const [dailyProgress, setDailyProgress] = useState(() => getDailyProgress())
  
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solutionText) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solutionText)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
      showErrorAlert(CORRECT_WORD_MESSAGE(solutionText), {
        persist: true,
      })
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())
  const { address, isConnected } = useAccount()
  const [remainingGuesses, setRemainingGuesses] = useState(10)

  // 检查钱包连接状态和剩余猜测次数
  useEffect(() => {
    if (!isConnected) {
      showErrorAlert('Please connect your wallet first', { persist: true })
      return
    }

    // 从 localStorage 获取今天的猜测次数
    const today = new Date().toISOString().split('T')[0]
    const guessesKey = `${address}-${today}-guesses`
    const usedGuesses = parseInt(localStorage.getItem(guessesKey) || '0')
    setRemainingGuesses(10 - usedGuesses)
  }, [isConnected, address])

  // 更新剩余猜测次数
  const updateRemainingGuesses = () => {
    const today = new Date().toISOString().split('T')[0]
    const guessesKey = `${address}-${today}-guesses`
    const usedGuesses = parseInt(localStorage.getItem(guessesKey) || '0')
    const newUsedGuesses = usedGuesses + 1
    localStorage.setItem(guessesKey, newUsedGuesses.toString())
    setRemainingGuesses(10 - newUsedGuesses)
  }

  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false
  )

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (!loadGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  }, [])

  useEffect(() => {
    DISCOURAGE_INAPP_BROWSERS &&
      isInAppBrowser() &&
      showErrorAlert(DISCOURAGE_INAPP_BROWSER_TEXT, {
        persist: false,
        durationMs: 7000,
      })
  }, [showErrorAlert])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHardMode = (isHard: boolean) => {
    if (guesses.length === 0 || localStorage.getItem('gameMode') === 'hard') {
      setIsHardMode(isHard)
      localStorage.setItem('gameMode', isHard ? 'hard' : 'normal')
    } else {
      showErrorAlert(HARD_MODE_ALERT_MESSAGE)
    }
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution: solutionText })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS * solution.length

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => {
          setIsWordDetailModalOpen(true)
          setTimeout(() => setIsStatsModalOpen(true), 100)
        },
      })
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsWordDetailModalOpen(true)
        setTimeout(() => setIsStatsModalOpen(true), 100)
      }, (solution.length + 1) * REVEAL_TIME_MS)
    }
  }, [isGameWon, isGameLost, showSuccessAlert])

  const onChar = (value: string) => {
    if (!isConnected) {
      showErrorAlert('Please connect your wallet first')
      return
    }
    
    const remainingGuessesForWord = getRemainingGuessesForCurrentWord()
    if (remainingGuessesForWord <= 0) {
      showErrorAlert('You have used all 6 guesses for this word')
      return
    }
    
    if (
      unicodeLength(`${currentGuess}${value}`) <= currentWordLength &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    if (!isConnected) {
      showErrorAlert('Please connect your wallet first')
      return
    }
    
    const remainingGuessesForWord = getRemainingGuessesForCurrentWord()
    if (remainingGuessesForWord <= 0) {
      showErrorAlert('You have used all 6 guesses for this word')
      return
    }
    
    if (isGameWon || isGameLost) {
      return
    }

    const guessLength = unicodeLength(currentGuess)
    if (guessLength !== currentWordLength) {
      setCurrentRowClass('jiggle')
      const message = guessLength < currentWordLength ? NOT_ENOUGH_LETTERS_MESSAGE : `Word must be ${currentWordLength} letters long`
      return showErrorAlert(message, {
        onClose: clearCurrentRowClass,
      })
    }

    // Temporarily disable word validation
    // if (!isWordInWordList(currentGuess)) {
    //   setCurrentRowClass('jiggle')
    //   return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
    //     onClose: clearCurrentRowClass,
    //   })
    // }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses)
      if (firstMissingReveal) {
        setCurrentRowClass('jiggle')
        return showErrorAlert(firstMissingReveal, {
          onClose: clearCurrentRowClass,
        })
      }
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * solution.length)

    const winningWord = isWinningWord(currentGuess)

    if (
      unicodeLength(currentGuess) === solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        incrementGuessesForCurrentWord()
        setStats(addStatsForCompletedGame(stats, guesses.length))
        const newState = markCurrentWordAsCompleted()
        const progress = getDailyProgress()
        
        if (progress.completed >= 10) {
          // All words completed, show final stats
          setIsGameWon(true)
          setTimeout(() => {
            setIsStatsModalOpen(true)
          }, REVEAL_TIME_MS * solution.length + 1)
        } else {
          // Move to next word
          const nextWord = newState.words[newState.currentWordIndex]
          setSolution(nextWord)
          setCurrentWordLength(nextWord.length)
          setDailyProgress(progress)
          setGuesses([])
          setIsGameWon(false)
        }
        return
      }

      const guessCount = incrementGuessesForCurrentWord()
      if (guessCount >= MAX_CHALLENGES) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
        const newState = markCurrentWordAsCompleted() // Mark as failed
        
        if (getDailyProgress().completed >= 10) {
          // All words attempted, show final stats
          setTimeout(() => {
            setIsWordDetailModalOpen(true)
            setTimeout(() => setIsStatsModalOpen(true), 100)
          }, REVEAL_TIME_MS * solution.length + 1)
        } else {
          // Show current word details before moving to next word
          setTimeout(() => {
            setIsWordDetailModalOpen(true)
          }, REVEAL_TIME_MS * solution.length + 1)
        }
        showErrorAlert(CORRECT_WORD_MESSAGE(solution.text), {
          persist: true,
          delayMs: REVEAL_TIME_MS * solution.length + 1,
        })
      }
    }
  }

  return (
    <div className="h-screen flex flex-col relative">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/L1yMm4bIAw49zQIR/scene.splinecode" />
      </div>
      <div className="relative z-10 flex flex-col h-full backdrop-blur-sm bg-white/30 dark:bg-black/30">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        dailyProgress={{
          completed: getDailyProgress().completed,
          total: 10,
          currentIndex: getDailyProgress().completed
        }}
      />
      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow">
          <div className="text-center mb-4 text-xl font-bold dark:text-white">
            The current word length is {currentWordLength}
          </div>
          <Grid
            solution={solutionText}
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName={currentRowClass}
            wordLength={currentWordLength}
          />
        </div>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          solution={solutionText}
          guesses={guesses}
          isRevealing={isRevealing}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          solution={solutionText}
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
          handleMigrateStatsButton={() => {
            setIsStatsModalOpen(false)
            setIsMigrateStatsModalOpen(true)
          }}
          isHardMode={isHardMode}
          isDarkMode={isDarkMode}
          isHighContrastMode={isHighContrastMode}
          numberOfGuessesMade={guesses.length}
          dailyProgress={dailyProgress}
        />
        <MigrateStatsModal
          isOpen={isMigrateStatsModalOpen}
          handleClose={() => setIsMigrateStatsModalOpen(false)}
        />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
          isHardMode={isHardMode}
          handleHardMode={handleHardMode}
          isDarkMode={isDarkMode}
          handleDarkMode={handleDarkMode}
          isHighContrastMode={isHighContrastMode}
          handleHighContrastMode={handleHighContrastMode}
        />
        <AlertContainer />
        <WordDetailModal
          isOpen={isWordDetailModalOpen}
          handleClose={() => setIsWordDetailModalOpen(false)}
          word={solution}
          showNext={isGameWon || isGameLost}
          onNext={() => {
            const nextWord = dailyState.words[dailyState.currentWordIndex]
            setSolution(nextWord)
            setCurrentWordLength(nextWord.length)
            setDailyProgress(getDailyProgress())
            setGuesses([])
            setIsGameLost(false)
          }}
        />
      </div>
      </div>
    </div>
  )
}

export default Home
