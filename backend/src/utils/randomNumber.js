export function randomNumber(rate) {
  const min = 0;
  const max = 100;
  const randomNum = Math.random() * (max - min) + min;
  return randomNum < rate;
}