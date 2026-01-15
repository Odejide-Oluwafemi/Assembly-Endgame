import { useState, useEffect } from "react";
import { languages } from "./data/languages";
import { getFarewellText } from "./data/farewell-texts";
import { words } from "./data/words";
import "./app.css";
import Header from "./components/Header";
import LanguageChip from "./components/LanguageChip";
import LetterBlock from "./components/LetterBlock";
import KeyboardButton from "./components/KeyboardButton";
import clsx from "clsx";
import Confetti from "react-confetti";

export default function App() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // State Variables
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Dependent Variables
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const [lastFareWellText, setLastFareWellText] = useState("");

  const statusSectionClassNames = clsx("status-section", {
    won: isGameWon,
    lost: isGameLost,
    "farewell-message": !isGameOver && lastFareWellText !== "",
  });

  // Farewell Message (dynamic) Generator
  useEffect(() => {
    const lastGuessed = guessedLetters[guessedLetters.length - 1];
    const lastGuessIncorrect = lastGuessed && !currentWord.includes(lastGuessed);

    if (!lastGuessIncorrect) return;

    const wrongCount = guessedLetters.filter((l) => !currentWord.includes(l)).length;
    const lang = languages[wrongCount - 1];
    if (!lang) return;

    const newText = getFarewellText(lang.name);
    // avoid updating if message already contains the language name
    if (lastFareWellText.includes(lang.name)) return;

    setLastFareWellText(newText);
  }, [guessedLetters, currentWord, lastFareWellText]);

  // Callback Functions
  function generateWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  function startNewGame() {
    setCurrentWord(generateWord());
    setGuessedLetters([]);
    setLastFareWellText("");
  }

  // Elements
  const languageChips = languages.map((languageData, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const classNames = clsx("language-chip", isLanguageLost && "lost");

    return (
      <LanguageChip
        key={index}
        name={languageData.name}
        backgroundColor={languageData.backgroundColor}
        textColor={languageData.color}
        classNames={classNames}
      />
    );
  });

  const letterBlocks = currentWord.split("").map((letter, index) => {
    return (
      <LetterBlock
        key={index}
        letter={letter}
        show={guessedLetters.includes(letter)}
        isGameLost={isGameLost && !(guessedLetters.includes(letter))}
      />
    );
  });

  const keyboardButtons = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    const status = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <KeyboardButton
        key={letter}
        letter={letter.toUpperCase()}
        onClick={() => addGuessedLetter(letter)}
        status={status}
        disabled={isGameOver}
      />
    );
  });

  return (
    <main>
      {isGameWon && <Confetti/>}
      <Header />

      <section className={statusSectionClassNames}>
        {isGameOver && (
          <h2>{isGameWon ? "You Win!" : isGameLost ? "Game Over!" : ""}</h2>
        )}
        <p>
          {isGameWon
            ? "Well Done!"
            : isGameLost
            ? "You lose! Better start learning Assembly 😭"
            : lastFareWellText}
        </p>
      </section>

      <section className="language-list-section">{languageChips}</section>

      <section className="word-display-section">{letterBlocks}</section>

      <section className="keyboard-container">{keyboardButtons}</section>

      {isGameOver &&
        <button
          className="new-game-btn"
          onClick={startNewGame}
        >
          New Game
        </button>
      }
    </main>
  );
}

/* {isGameOver ? (
          isGameWon ? (
            <>
              <h2>You win!</h2>
              <p>Well done! 🎉</p>
            </>
          ) : (
            <>
              <h2>Game over!</h2>
              <p>You lose! Better start learning Assembly 😭</p>
            </>
          )
        ) : isLastGuessIncorrect ? (
          <p className="farewell-message">
            {fareWellText()}
          </p>
        ) : null}
       */
