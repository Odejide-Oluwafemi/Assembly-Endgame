import { useState } from "react";
import "./app.css";
import Header from "./components/Header";
import Status from "./components/Status";
import { languages } from "./data/languages";
import LanguageChip from "./components/LanguageChip";
import LetterBlock from "./components/LetterBlock";

export default function App() {
  const languageChips = languages.map((languageData, index) =>
    <LanguageChip
      key={index}
      name={languageData.name}
      backgroundColor={languageData.backgroundColor}
      textColor={languageData.color}
    />
  );

  const [currentWord, setCurrentWord] = useState("react")

  const letterBlocks = currentWord.split("").map((letter, index) =>
    <LetterBlock key={index} letter={letter}/>
  );

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  return(
    <main>
      <Header/>
      <Status/>
      <section className="language-list-section">
        {languageChips}
      </section>

      <section className="word-display-section">
        {letterBlocks}
      </section>

      <section className="keyboard-container">
        
      </section>
    </main>
  );
}