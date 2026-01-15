export default function KeyboardButton({letter, onClick, status, disabled}) {
  return(
    <button
      className={`keyboard-btn ${status}`}
      onClick={onClick}
      disabled={disabled}
    >
      {letter}
    </button>
  );
}