export function randomNumber(min = 0, max = 100, rate = null) {
  const randomNum = Math.random() * (max - min) + min;

  if (rate) return randomNum < rate;

  return randomNum;
}
