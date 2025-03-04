const suffixes: string[] = ["", "ТЫС", "МЛН", "МЛР", "ТРЛ"];

export function numberShortenCharacter(
  value: number,
  comma: number = 1
): { value: string; character: boolean; origin: number } {
  let suffixNum: number = Math.floor((`${Math.round(value)}`.length - 1) / 3);
  let shortValue: number | string = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value)?.toPrecision()
  );
  shortValue = Math.round(shortValue * (comma * 10)) / (comma * 10);
  if (shortValue == 1000) {
    shortValue = 1;
    suffixNum += Math.floor((`${shortValue}`.length - 1) / 3);
  }
  if (suffixes[suffixNum] != ``) shortValue = shortValue.toFixed(comma);
  return {
    value: `${shortValue}${
      suffixes[suffixNum] != `` ? ` ${suffixes[suffixNum]}` : ``
    }`,
    character: suffixNum > 0,
    origin: value,
  };
}
