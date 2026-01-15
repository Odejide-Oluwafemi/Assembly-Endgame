import clsx from "clsx";

export default function LanguageChip({name, backgroundColor, textColor, classNames}) {
  return (
    <span
      className={classNames}
      style={{backgroundColor: backgroundColor, color: textColor}}
    >
      {name}
    </span>
  );
}
