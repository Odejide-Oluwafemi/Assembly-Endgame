export default function LetterBlock({letter, show}) {
  return(
    <span className="letter-block">
      {show && letter}
    </span>
  );
}