export default function LetterBlock({letter, show, isGameLost}) {
  return(
    <span className={`letter-block ${isGameLost ? "game-over-reveal" : ""}`}>
      {(show || isGameLost) && letter}
    </span>
  );
}