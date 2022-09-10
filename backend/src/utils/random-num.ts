function getRandomInt(min: number, max: number) {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) +
    Math.ceil(min)
  );
}

export default getRandomInt;
