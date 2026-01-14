export default function LanguageChip({name, backgroundColor, textColor}) {
  return (
    <span className="language-chip" style={{backgroundColor: backgroundColor, color: textColor}}>{name}</span>
  );
}
